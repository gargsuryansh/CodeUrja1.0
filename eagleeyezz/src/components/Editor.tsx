
import React, { useRef, useEffect, useState } from "react";
import { useEditor } from "@/hooks/useEditor";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Play, Loader2, Users, Wifi } from "lucide-react";
import { languages } from "@/utils/languages";
import { mockUsers } from "@/utils/mockData";
import OutputPanel from "./OutputPanel";
import CollaboratorsPanel from "./CollaboratorsPanel";

// This is a mock implementation - in a real app we'd use the actual Monaco Editor
// but for this prototype we'll simulate it with a styled textarea
const Editor: React.FC = () => {
  const { 
    code, 
    setCode, 
    language, 
    runCode, 
    running, 
    output,
    recentEdit,
    collaborators,
    sessionId
  } = useEditor();
  const { theme } = useTheme();
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [editorHeight, setEditorHeight] = useState<number>(600);
  const [outputHeight, setOutputHeight] = useState<number>(200);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [lastEditTime, setLastEditTime] = useState<number>(Date.now());

  // Handle editor resize
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newOutputHeight = Math.max(100, Math.min(400, window.innerHeight - e.clientY));
      setOutputHeight(newOutputHeight);
      setEditorHeight(window.innerHeight - 64 - newOutputHeight - 40); // 64px for navbar, 40px for padding
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Set initial sizes based on window height
  useEffect(() => {
    const updateSizes = () => {
      const totalHeight = window.innerHeight - 64; // 64px for navbar
      setOutputHeight(200);
      setEditorHeight(totalHeight - 200 - 40); // 40px for padding
    };
    
    updateSizes();
    window.addEventListener('resize', updateSizes);
    
    return () => {
      window.removeEventListener('resize', updateSizes);
    };
  }, []);

  // Update lastEditTime when code changes
  useEffect(() => {
    setLastEditTime(Date.now());
  }, [code]);

  // Handle code changes
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  // Is in collaboration mode
  const isCollabSession = window.location.search.includes('session=');

  return (
    <div className="flex flex-col w-full h-[calc(100vh-64px)] px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Main.{language.extension}</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center px-3 py-1 rounded-full bg-muted text-xs">
            <Wifi className="h-3 w-3 mr-1 text-green-500 animate-pulse" />
            <span className="text-primary font-medium">
              Live Collaboration Active (Session: {sessionId.substring(0, 8)})
            </span>
          </div>
          <CollaboratorsPanel users={collaborators} />
          <Button 
            onClick={runCode} 
            disabled={running}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            {running ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Run Code
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="relative flex-grow flex flex-col overflow-hidden">
        {/* Editor Section */}
        <div 
          className="editor-container relative shadow-md"
          style={{ height: `${editorHeight}px` }}
        >
          <textarea
            ref={editorRef}
            value={code}
            onChange={handleCodeChange}
            className="w-full h-full p-4 font-mono text-sm resize-none outline-none bg-editor-bg text-foreground"
            spellCheck="false"
            placeholder="Type code here - changes will sync in real-time with collaborators"
          />
          
          {/* Collaboration indicator badge */}
          {isCollabSession && (
            <div className="absolute top-2 right-2 bg-green-500/10 text-green-500 px-2 py-1 rounded-full text-xs flex items-center">
              <Wifi className="h-3 w-3 mr-1 animate-pulse" />
              Live Sync Active
            </div>
          )}
          
          {/* Simulate code highlight where another user is editing */}
          {recentEdit && (
            <div 
              className="absolute left-0 animate-pulse-subtle code-line-highlight pointer-events-none"
              style={{ 
                top: `${(recentEdit.line * 20) - 20}px`, // Assuming 20px line height
                width: '100%',
                height: '20px',
              }}
            >
              <div 
                className="absolute top-0 left-0 h-full w-1" 
                style={{ 
                  backgroundColor: mockUsers.find(u => u.id === recentEdit.userId)?.color || '#3B82F6'
                }}
              />
            </div>
          )}
        </div>
        
        {/* Resize Handle */}
        <div 
          className="resize-handle-vertical" 
          onMouseDown={handleMouseDown}
        />
        
        {/* Output Panel */}
        <OutputPanel height={outputHeight} output={output} />
      </div>
    </div>
  );
};

export default Editor;
