
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, File, Upload, Edit, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AuditEntry {
  id: string;
  user: {
    name: string;
    role: string;
  };
  action: 'view' | 'download' | 'upload' | 'modify' | 'access';
  resourceId: string;
  resourceType: string;
  timestamp: string;
  reason?: string;
}

interface AuditLogProps {
  entries: AuditEntry[];
  className?: string;
}

const AuditLog = ({ entries, className }: AuditLogProps) => {
  const getActionIcon = (action: AuditEntry['action']) => {
    switch (action) {
      case 'view':
        return <Eye className="h-4 w-4" />;
      case 'download':
        return <Download className="h-4 w-4" />;
      case 'upload':
        return <Upload className="h-4 w-4" />;
      case 'modify':
        return <Edit className="h-4 w-4" />;
      case 'access':
        return <Info className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };
  
  const getActionColor = (action: AuditEntry['action']) => {
    switch (action) {
      case 'view':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-400';
      case 'download':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-800/30 dark:text-amber-400';
      case 'upload':
        return 'bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-400';
      case 'modify':
        return 'bg-red-100 text-red-700 dark:bg-red-800/30 dark:text-red-400';
      case 'access':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-800/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-400';
    }
  };

  return (
    <div className={cn("rounded-md border", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Resource</TableHead>
            <TableHead>Reason</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id} className="group animate-fade-in">
              <TableCell className="font-mono text-xs">
                {entry.timestamp}
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{entry.user.name}</div>
                  <div className="text-xs text-muted-foreground">{entry.user.role}</div>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={cn("flex items-center gap-1 font-normal", getActionColor(entry.action))}
                >
                  {getActionIcon(entry.action)}
                  <span className="capitalize">{entry.action}</span>
                </Badge>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium truncate max-w-[150px] md:max-w-xs">
                    {entry.resourceId}
                  </div>
                  <div className="text-xs text-muted-foreground">{entry.resourceType}</div>
                </div>
              </TableCell>
              <TableCell className="text-sm max-w-[200px] truncate">
                {entry.reason || "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AuditLog;
