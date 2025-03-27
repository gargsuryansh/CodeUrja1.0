
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy, Info, Code, Play } from "lucide-react";
import { toast } from "sonner";
import { useEditor } from "@/hooks/useEditor";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ open, onOpenChange }) => {
  const [copied, setCopied] = useState(false);
  const { sessionId } = useEditor();
  
  // Generate the shareable link with session ID
  const shareableLink = `${window.location.origin}?session=${sessionId}`;
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      toast.success("Link copied to clipboard");
      
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Live Collaboration</DialogTitle>
          <DialogDescription>
            Share this link to collaborate in real-time on this project.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 mt-4">
          <div className="grid flex-1 gap-2">
            <Input
              value={shareableLink}
              readOnly
              className="w-full"
            />
          </div>
          <Button 
            size="icon" 
            onClick={copyToClipboard}
            variant="outline"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="mt-6 space-y-4">
          <h4 className="text-sm font-medium">Live Collaboration Features:</h4>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-start gap-2">
              <Code className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Live Code Editing</p>
                <p className="text-xs text-muted-foreground">
                  Any code changes made by you or collaborators are instantly visible to everyone
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Play className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Shared Code Execution</p>
                <p className="text-xs text-muted-foreground">
                  When anyone runs the code, the output is synchronized across all connected devices
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Alert className="mt-4 bg-muted">
          <Info className="h-4 w-4" />
          <AlertTitle>How it works</AlertTitle>
          <AlertDescription>
            When someone opens this link, they'll instantly join your coding session. All changes made by 
            any participant are immediately synced to everyone's screens. Code execution is also shared in real-time.
          </AlertDescription>
        </Alert>
        
        <DialogFooter className="mt-4">
          <p className="text-sm text-muted-foreground">
            Anyone with this link can view, edit and run your code in real-time.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
