
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { File, FileVideo, FileImage, Download, Lock, Eye, History } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type EvidenceType = 'document' | 'video' | 'image' | 'audio';

export interface EvidenceItem {
  id: string;
  title: string;
  type: EvidenceType;
  date: string;
  size: string;
  caseNumber: string;
  hash: string;
  confidential: boolean;
  tags: string[];
}

interface EvidenceCardProps {
  evidence: EvidenceItem;
  className?: string;
}

const EvidenceCard = ({ evidence, className }: EvidenceCardProps) => {
  const getFileIcon = () => {
    switch (evidence.type) {
      case 'video':
        return <FileVideo className="h-10 w-10" />;
      case 'image':
        return <FileImage className="h-10 w-10" />;
      default:
        return <File className="h-10 w-10" />;
    }
  };

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="text-muted-foreground">{getFileIcon()}</div>
            <div>
              <CardTitle className="text-base font-medium">{evidence.title}</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Added on {evidence.date} • {evidence.size}
              </p>
            </div>
          </div>
          {evidence.confidential && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Lock className="h-4 w-4 text-amber-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Confidential evidence</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1 mb-2">
          {evidence.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="bg-muted px-2 py-1.5 rounded-sm text-xs font-mono break-all">
          <span className="text-muted-foreground">Hash: </span>
          {evidence.hash.substring(0, 20)}...
        </div>
        <p className="text-xs mt-2">
          <span className="font-medium">Case:</span> {evidence.caseNumber}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between p-2 bg-secondary/50">
        <div className="flex gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <History className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Audit history</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EvidenceCard;
