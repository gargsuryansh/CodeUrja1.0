
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Language, getDefaultLanguage, getLanguageById } from "@/utils/languages";
import { mockOutput, simulateEdit, CodeEdit, User, mockUsers } from "@/utils/mockData";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

// Unique key for localStorage
const STORAGE_KEY = "code-collab-storage";
const COLLAB_SESSION_KEY = "collab-session-id";
const COLLAB_USER_KEY = "collab-user-id";
const COLLAB_LAST_RUN_KEY = "collab-last-run";

// Generate a unique session ID if not already set
const getSessionId = () => {
  let sessionId = localStorage.getItem(COLLAB_SESSION_KEY);
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem(COLLAB_SESSION_KEY, sessionId);
  }
  return sessionId;
};

// Generate or get a unique user ID
const getUserId = () => {
  let userId = localStorage.getItem(COLLAB_USER_KEY);
  if (!userId) {
    userId = "user" + Math.floor(Math.random() * 10000);
    localStorage.setItem(COLLAB_USER_KEY, userId);
  }
  return userId;
};

interface EditorContextType {
  code: string;
  setCode: (code: string) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  output: string;
  setOutput: (output: string) => void;
  runCode: () => void;
  running: boolean;
  collaborators: User[];
  recentEdit: CodeEdit | null;
  projectName: string;
  setProjectName: (name: string) => void;
  sessionId: string;
  userId: string;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const defaultLanguage = getDefaultLanguage();
  const [code, setCodeState] = useState<string>(defaultLanguage.example);
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [output, setOutput] = useState<string>("");
  const [running, setRunning] = useState<boolean>(false);
  const [collaborators, setCollaborators] = useState<User[]>(mockUsers);
  const [recentEdit, setRecentEdit] = useState<CodeEdit | null>(null);
  const [projectName, setProjectName] = useState<string>("Untitled Project");
  const [sessionId] = useState<string>(getSessionId());
  const [userId] = useState<string>(getUserId());
  
  // Function to sync code changes
  const setCode = (newCode: string) => {
    setCodeState(newCode);
    syncCodeChange(newCode, language.id, userId);
  };
  
  // Function to sync language changes
  const handleLanguageChange = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
    syncCodeChange(code, newLanguage.id, userId);
    toast.info(`Switched to ${newLanguage.name}`);
  }, [code, userId]);
  
  // Sync code changes to localStorage and to other connected clients
  const syncCodeChange = (newCode: string, languageId: string, currentUserId: string) => {
    // Store the data with session ID for multi-device sync
    const data = {
      code: newCode,
      languageId,
      timestamp: Date.now(),
      userId: currentUserId,
      sessionId: sessionId,
      type: "code-change"
    };
    
    // Save to localStorage with session ID
    localStorage.setItem(`${STORAGE_KEY}-${sessionId}`, JSON.stringify(data));
    
    // Use the BroadcastChannel API for same-device sync
    const bc = new BroadcastChannel(`collab-channel-${sessionId}`);
    bc.postMessage(data);
    bc.close();
    
    // For cross-device sync, we'll use localStorage polling 
    localStorage.setItem(`collab-last-update-${sessionId}`, JSON.stringify({
      timestamp: Date.now(),
      action: "code-change"
    }));
  };

  // Sync code execution across all connected clients
  const syncCodeExecution = (outputResult: string) => {
    const data = {
      output: outputResult,
      timestamp: Date.now(),
      userId: userId,
      sessionId: sessionId,
      type: "code-execution"
    };

    // Save execution data to localStorage
    localStorage.setItem(`${COLLAB_LAST_RUN_KEY}-${sessionId}`, JSON.stringify(data));

    // Broadcast to other tabs/windows
    const bc = new BroadcastChannel(`collab-channel-${sessionId}`);
    bc.postMessage(data);
    bc.close();
  };
  
  // Initialize from localStorage if available
  useEffect(() => {
    const savedState = localStorage.getItem(`${STORAGE_KEY}-${sessionId}`);
    if (savedState) {
      try {
        const { code: savedCode, languageId } = JSON.parse(savedState);
        if (savedCode) {
          setCodeState(savedCode);
        }
        if (languageId) {
          const savedLanguage = getLanguageById(languageId);
          if (savedLanguage) {
            setLanguageState(savedLanguage);
          }
        }
      } catch (error) {
        console.error("Error parsing saved editor state:", error);
      }
    }

    // Check for last execution results
    const lastRunData = localStorage.getItem(`${COLLAB_LAST_RUN_KEY}-${sessionId}`);
    if (lastRunData) {
      try {
        const { output: savedOutput } = JSON.parse(lastRunData);
        if (savedOutput && savedOutput !== output) {
          setOutput(savedOutput);
        }
      } catch (error) {
        console.error("Error parsing last run data:", error);
      }
    }
    
    // Start polling for changes from other devices
    const pollForChanges = setInterval(() => {
      try {
        const lastUpdate = localStorage.getItem(`collab-last-update-${sessionId}`);
        if (lastUpdate) {
          const { timestamp } = JSON.parse(lastUpdate);
          if (timestamp > Date.now() - 2000) { // Check for very recent changes
            const savedState = localStorage.getItem(`${STORAGE_KEY}-${sessionId}`);
            if (savedState) {
              const { code: savedCode, languageId, userId: changeUserId } = JSON.parse(savedState);
              
              // Only update if it's from another user
              if (changeUserId !== userId) {
                setCodeState(savedCode);
                
                const savedLanguage = getLanguageById(languageId);
                if (savedLanguage && savedLanguage.id !== language.id) {
                  setLanguageState(savedLanguage);
                  toast.info(`Language changed to ${savedLanguage.name} by a collaborator`);
                }
                
                toast.info("Code updated by a collaborator");
                
                // Add edit highlight
                setRecentEdit({
                  userId: changeUserId,
                  line: Math.floor(savedCode.split('\n').length / 2), // Approximation
                  column: 1,
                  timestamp: Date.now()
                });
                
                // Clear edit indicator after 2 seconds
                setTimeout(() => {
                  setRecentEdit(null);
                }, 2000);
              }
            }
          }
        }

        // Check for new code execution results
        const lastRunData = localStorage.getItem(`${COLLAB_LAST_RUN_KEY}-${sessionId}`);
        if (lastRunData) {
          try {
            const { output: savedOutput, timestamp, userId: runUserId } = JSON.parse(lastRunData);
            if (
              savedOutput && 
              runUserId !== userId && 
              timestamp > Date.now() - 5000 && // Only sync recent executions
              savedOutput !== output
            ) {
              setOutput(savedOutput);
              toast.info("Code was executed by a collaborator");
            }
          } catch (error) {
            console.error("Error checking last run data:", error);
          }
        }
      } catch (error) {
        console.error("Error polling for changes:", error);
      }
    }, 1000); // Poll every second
    
    return () => clearInterval(pollForChanges);
  }, [sessionId, userId, language.id, output]);
  
  // Listen for code changes from other tabs/windows on same device
  useEffect(() => {
    const bc = new BroadcastChannel(`collab-channel-${sessionId}`);
    
    bc.onmessage = (event) => {
      const { type, userId: messageUserId } = event.data;
      
      // Don't update if it's from the current user
      if (messageUserId === userId) return;
      
      if (type === "code-change") {
        const { code: newCode, languageId } = event.data;
        
        // Update code and language if changed by another user
        setCodeState(newCode);
        
        const newLanguage = getLanguageById(languageId);
        if (newLanguage && newLanguage.id !== language.id) {
          setLanguageState(newLanguage);
          toast.info(`Language changed to ${newLanguage.name} by a collaborator`);
        }
        
        // Show toast notification
        toast.info("Code updated by a collaborator");
        
        // Add edit highlight
        setRecentEdit({
          userId: messageUserId,
          line: Math.floor(newCode.split('\n').length / 2), // Approximation
          column: 1,
          timestamp: Date.now()
        });
        
        // Clear edit indicator after 2 seconds
        setTimeout(() => {
          setRecentEdit(null);
        }, 2000);
      } else if (type === "code-execution") {
        const { output: newOutput } = event.data;
        if (newOutput && newOutput !== output) {
          setOutput(newOutput);
          toast.info("Code was executed by a collaborator");
        }
      }
    };
    
    return () => {
      bc.close();
    };
  }, [sessionId, userId, language.id, output]);
  
  // Function to run the code
  const runCode = useCallback(() => {
    setRunning(true);
    setOutput("Running...");
    
    // Simulate code execution with delay
    setTimeout(() => {
      const result = mockOutput(language.id);
      setOutput(result);
      setRunning(false);
      
      // Sync execution results to all collaborators
      syncCodeExecution(result);
      
      toast.success("Code executed successfully");
    }, 1000);
  }, [language.id, userId, sessionId]);
  
  // Initialize output when component mounts
  useEffect(() => {
    setOutput("// Code output will appear here when you run your code");
  }, []);

  return (
    <EditorContext.Provider
      value={{
        code,
        setCode,
        language,
        setLanguage: handleLanguageChange,
        output,
        setOutput,
        runCode,
        running,
        collaborators,
        recentEdit,
        projectName,
        setProjectName,
        sessionId,
        userId
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("useEditor must be used within a EditorProvider");
  }
  return context;
}
