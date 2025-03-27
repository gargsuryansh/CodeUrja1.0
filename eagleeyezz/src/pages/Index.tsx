
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Editor from "@/components/Editor";
import { ThemeProvider } from "@/hooks/useTheme";
import { EditorProvider } from "@/hooks/useEditor";
import CollaboratorsPanel from "@/components/CollaboratorsPanel";
import { useEditor } from "@/hooks/useEditor";
import { toast } from "sonner";
import { Users } from "lucide-react";

const IndexContent = () => {
  const { collaborators, sessionId } = useEditor();
  
  // Show a toast when a collaborative session starts
  useEffect(() => {
    if (sessionId && window.location.search.includes('session=')) {
      toast.success("Connected to collaborative session", {
        description: "All code changes and executions will be synced in real-time",
        duration: 5000
      });
    }
  }, [sessionId]);
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <div className="flex flex-col flex-1">
        <div className="max-w-[1400px] w-full mx-auto px-4 py-2">
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Active collaborators:</span>
              <CollaboratorsPanel users={collaborators} />
            </div>
          </div>
        </div>
        <Editor />
      </div>
    </div>
  );
};

const Index: React.FC = () => {
  // Extract session ID from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session');
    
    if (sessionId) {
      localStorage.setItem('collab-session-id', sessionId);
      // Add session ID to browser history so it's preserved on refresh
      if (!window.location.search.includes('session=')) {
        const newUrl = `${window.location.pathname}?session=${sessionId}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
      }
    }
  }, []);
  
  return (
    <ThemeProvider>
      <EditorProvider>
        <IndexContent />
      </EditorProvider>
    </ThemeProvider>
  );
};

export default Index;
