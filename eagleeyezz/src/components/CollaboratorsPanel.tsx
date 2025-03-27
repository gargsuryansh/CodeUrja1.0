
import React from "react";
import { User } from "@/utils/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CollaboratorsPanelProps {
  users: User[];
}

const CollaboratorsPanel: React.FC<CollaboratorsPanelProps> = ({ users }) => {
  const activeUsers = users.filter(user => user.active);
  
  return (
    <div className="flex items-center -space-x-2">
      {activeUsers.map((user) => (
        <TooltipProvider key={user.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="user-avatar border-2 border-background hover:z-10 transition-all">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{user.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      
      {activeUsers.length > 0 && (
        <div className="ml-2 text-sm text-muted-foreground">
          {activeUsers.length} active
        </div>
      )}
    </div>
  );
};

export default CollaboratorsPanel;
