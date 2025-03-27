
import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useEditor } from "@/hooks/useEditor";
import { Moon, Sun, Save, Share2, Code2, LogInIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import ShareDialog from "./ShareDialog";
import { toast } from "sonner";
import logo from '../assets/logo1.jpg'
 import { Link } from "react-router-dom";
const Navbar: React.FC = () => {
  const { projectName } = useEditor();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  
  const handleSave = () => {
    toast.success("Project saved successfully");
  };
  
  return (
    <nav className="w-full h-16 border-b glass-panel z-10 px-4">
      <div className="h-full flex items-center justify-between max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2">
          {/* <Code2 className="w-6 h-6 text-primary" /> */}
          <img src={logo}alt="" className="h-14 w-44 rounded-md" />
          {/* <h1 className="text-xl font-medium">CodeJunction</h1> */}
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/chat">
          
            <button
                className="px-4 py-2 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
                Start Chat
            </button>
        

</Link>
          <LanguageSelector />
          
          <Separator orientation="vertical" className="h-8" />
          
          <div className="flex items-center gap-2">
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground"
              onClick={handleSave}
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setShareDialogOpen(true)}
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
          
          <Separator orientation="vertical" className="h-8" />
          
          <ThemeToggle />
        </div>
      </div>
      
      <ShareDialog 
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
      />
    </nav>
  );
};

export default Navbar;
