
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import AuditLog, { AuditEntry } from '../components/audit/AuditLog';
import { Search, Download, Calendar, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock audit log data
const mockAuditEntries: AuditEntry[] = [
  {
    id: "audit-001",
    user: { name: "simba", role: "inspector" },
    action: "upload",
    resourceId: "Body Camera Footage - Case CS-2023-0456",
    resourceType: "Video File",
    timestamp: "2023-10-05 14:32:45",
    reason: "Initial evidence collection"
  },
  {
    id: "audit-002",
    user: { name: "Chulbul pandey", role: "inspector" },
    action: "view",
    resourceId: "Witness Statement - Iqbal kadri - Case CS-2023-0456",
    resourceType: "Document",
    timestamp: "2023-10-05 15:10:22",
    reason: "Case review"
  },
  {
    id: "audit-003",
    user: { name: "Dr.Salunkhe", role: "Forensic Technician" },
    action: "download",
    resourceId: "Crime Scene Photos - Case CS-2023-0456",
    resourceType: "Image Files",
    timestamp: "2023-10-05 16:45:33",
    reason: "Forensic analysis"
  },
  {
    id: "audit-004",
    user: { name: "Veer suryavanshi", role: "Inspector" },
    action: "access",
    resourceId: "Case CS-2023-0456",
    resourceType: "Case File",
    timestamp: "2023-10-05 17:20:15",
    reason: "Supervisory review"
  },
  {
    id: "audit-005",
    user: { name: "daya", role: "Detective" },
    action: "modify",
    resourceId: "Case Notes - CS-2023-0456",
    resourceType: "Document",
    timestamp: "2023-10-06 09:15:02",
    reason: "Update with new findings"
  },
  {
    id: "audit-006",
    user: { name: "freddy", role: "Admin Staff" },
    action: "view",
    resourceId: "Evidence Log - CS-2023-0456",
    resourceType: "System File",
    timestamp: "2023-10-06 10:30:18",
    reason: "Regular audit"
  },
  {
    id: "audit-007",
    user: { name: " Meera desh pandey", role: "IG" },
    action: "upload",
    resourceId: "Additional Witness Statement - Case CS-2023-0456",
    resourceType: "Document",
    timestamp: "2023-10-06 11:45:09",
    reason: "Follow-up investigation"
  },
  {
    id: "audit-008",
    user: { name: "K.D pathak", role: "District Attorney Office" },
    action: "download",
    resourceId: "Complete Case File - CS-2023-0456",
    resourceType: "Multiple Files",
    timestamp: "2023-10-06 14:05:30",
    reason: "Case preparation for court"
  }
];

const Audit = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  
  // Filter audit entries based on search query and action filter
  const filteredEntries = mockAuditEntries.filter(entry => {
    const matchesSearch = 
      entry.user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      entry.resourceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.resourceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.reason && entry.reason.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesAction = actionFilter === 'all' || entry.action === actionFilter;
    
    return matchesSearch && matchesAction;
  });
  
  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Audit Trail</h1>
        <p className="text-muted-foreground">
          Comprehensive logs of all activities within the evidence management system.
        </p>
      </header>
      
      <Tabs defaultValue="logs" className="mb-6">
        <TabsList>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="logs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by user, resource, or reason..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
              <Select 
                value={actionFilter} 
                onValueChange={value => setActionFilter(value)}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="view">View</SelectItem>
                  <SelectItem value="download">Download</SelectItem>
                  <SelectItem value="upload">Upload</SelectItem>
                  <SelectItem value="modify">Modify</SelectItem>
                  <SelectItem value="access">Access</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
              
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <AuditLog entries={filteredEntries} />
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Access Report</CardTitle>
                <CardDescription>
                  Overview of system access by user role and department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-6">
                  {/* This would be a chart component in a real implementation */}
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      Chart visualization would be displayed here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Evidence Access Frequency</CardTitle>
                <CardDescription>
                  Most frequently accessed evidence files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-6">
                  {/* This would be a chart component in a real implementation */}
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      Chart visualization would be displayed here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>
                  System activity over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-6">
                  {/* This would be a chart component in a real implementation */}
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      Chart visualization would be displayed here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Activity Comparison</CardTitle>
                <CardDescription>
                  Compare activity levels between users or departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-6">
                  {/* This would be a chart component in a real implementation */}
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      Chart visualization would be displayed here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Audit;
