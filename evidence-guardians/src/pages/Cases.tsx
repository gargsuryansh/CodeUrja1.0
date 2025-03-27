
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Filter, FolderPlus, ChevronRight, FileDigit, FileVideo, FileImage, AlertCircle, CheckCircle, Clock } from 'lucide-react';

// Mock case data
const mockCases = [
  {
    id: "case-001",
    number: "CS-2023-0456",
    title: "Robbery - State Bank of India",
    status: "Active",
    dateCreated: "2023-10-01",
    evidenceCount: 14,
    assignedTo: "Bajirao Singham",
    priority: "High"
  },
  {
    id: "case-002",
    number: "CS-2023-0452",
    title: "Assault - Chanakyapuri square",
    status: "Active",
    dateCreated: "2023-09-25",
    evidenceCount: 8,
    assignedTo: "Det. James Wilson",
    priority: "Medium"
  },
  {
    id: "case-003",
    number: "CS-2023-0450",
    title: "Breaking & Entering - Sudama nagar",
    status: "Under Review",
    dateCreated: "2023-09-23",
    evidenceCount: 6,
    assignedTo: "Det. Daya",
    priority: "Medium"
  },
  {
    id: "case-004",
    number: "CS-2023-0445",
    title: "Theft - Vijay nagar",
    status: "Closed",
    dateCreated: "2023-09-20",
    evidenceCount: 10,
    assignedTo: "Det. Daya",
    priority: "Low"
  },
  {
    id: "case-005",
    number: "CS-2023-0442",
    title: "Vandalism - Cersent water park",
    status: "Active",
    dateCreated: "2023-09-18",
    evidenceCount: 5,
    assignedTo: "Officer Chulbul Pandey",
    priority: "Low"
  },
  {
    id: "case-006",
    number: "CS-2023-0438",
    title: "Missing Person - Iqbal Kadri",  
    status: "Urgent",
    dateCreated: "2023-09-15",
    evidenceCount: 12,
    assignedTo: "inspector Veer suryavanshi", 
    priority: "Critical"
  }
];

// Mock evidence for a specific case
const mockCaseEvidence = [
  {
    id: "evi-001",
    title: "Body Camera Footage - Inspecter Chulbul Pandey",
    type: "video",
    dateAdded: "2023-10-01",
    addedBy: "Inspector Chulbul Pandey",  
    size: "1.2 GB",
    confidential: true
  },
  {
    id: "evi-002",
    title: "Witness Statement - Iqbal Kadri",
    type: "document",
    dateAdded: "2023-09-28",
    addedBy: "Det. Daya",
    size: "1.5 MB",
    confidential: false
  },
  {
    id: "evi-003",
    title: "Crime Scene Photos - Banganga",
    type: "image",
    dateAdded: "2023-09-27",
    addedBy: "Dr. Salunkhe",
    size: "45.8 MB",
    confidential: true
  }
];

const Cases = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  
  // Filter cases based on search query
  const filteredCases = mockCases.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusBadge = (status: string) => {
    let classes;
    let icon;
    
    switch (status.toLowerCase()) {
      case 'active':
        classes = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
        icon = <CheckCircle className="h-3 w-3 mr-1" />;
        break;
      case 'under review':
        classes = "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
        icon = <Clock className="h-3 w-3 mr-1" />;
        break;
      case 'closed':
        classes = "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
        icon = null;
        break;
      case 'urgent':
        classes = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
        icon = <AlertCircle className="h-3 w-3 mr-1" />;
        break;
      default:
        classes = "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
        icon = null;
    }
    
    return (
      <Badge variant="outline" className={`flex items-center gap-1 font-normal ${classes}`}>
        {icon}
        {status}
      </Badge>
    );
  };
  
  const getPriorityBadge = (priority: string) => {
    let classes;
    
    switch (priority.toLowerCase()) {
      case 'critical':
        classes = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
        break;
      case 'high':
        classes = "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
        break;
      case 'medium':
        classes = "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
        break;
      case 'low':
        classes = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
        break;
      default:
        classes = "bg-gray-100 text-gray-800";
    }
    
    return (
      <Badge variant="outline" className={`font-normal ${classes}`}>
        {priority}
      </Badge>
    );
  };
  
  const getEvidenceTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'document':
        return <FileDigit className="h-4 w-4 text-muted-foreground" />;
      case 'video':
        return <FileVideo className="h-4 w-4 text-muted-foreground" />;
      case 'image':
        return <FileImage className="h-4 w-4 text-muted-foreground" />;
      default:
        return <FileDigit className="h-4 w-4 text-muted-foreground" />;
    }
  };
  
  const handleCaseClick = (caseId: string) => {
    setSelectedCase(caseId === selectedCase ? null : caseId);
  };
  
  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Case Management</h1>
        <p className="text-muted-foreground">
          Manage investigation cases and associated evidence.
        </p>
      </header>
      
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search cases by title, number, or assigned detective..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <FolderPlus className="h-4 w-4 mr-2" />
              New Case
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Case</DialogTitle>
              <DialogDescription>
                Enter the details for the new case. All fields are required.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="case-number" className="text-sm font-medium">
                  Case Number
                </label>
                <Input id="case-number" placeholder="e.g., CS-2023-0457" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="case-title" className="text-sm font-medium">
                  Case Title
                </label>
                <Input id="case-title" placeholder="Enter case title" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="case-description" className="text-sm font-medium">
                  Description
                </label>
                <Input id="case-description" placeholder="Brief case description" />
              </div>
              <Button className="w-full mt-2">Create Case</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case Number</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Priority</TableHead>
              <TableHead className="hidden md:table-cell">Date Created</TableHead>
              <TableHead className="hidden md:table-cell">Assigned To</TableHead>
              <TableHead className="text-right">Evidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCases.map(c => (
              <React.Fragment key={c.id}>
                <TableRow 
                  className="cursor-pointer"
                  onClick={() => handleCaseClick(c.id)}
                >
                  <TableCell className="font-medium">{c.number}</TableCell>
                  <TableCell>{c.title}</TableCell>
                  <TableCell>{getStatusBadge(c.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">{getPriorityBadge(c.priority)}</TableCell>
                  <TableCell className="hidden md:table-cell">{c.dateCreated}</TableCell>
                  <TableCell className="hidden md:table-cell">{c.assignedTo}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary">{c.evidenceCount}</Badge>
                  </TableCell>
                </TableRow>
                
                {selectedCase === c.id && (
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={7} className="p-0">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-medium">Case Evidence</h3>
                          <Button variant="outline" size="sm">
                            <FolderPlus className="h-4 w-4 mr-2" />
                            Add Evidence
                          </Button>
                        </div>
                        
                        <div className="rounded overflow-hidden border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead className="hidden md:table-cell">Added By</TableHead>
                                <TableHead className="hidden md:table-cell">Date Added</TableHead>
                                <TableHead className="hidden md:table-cell">Size</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {mockCaseEvidence.map(evidence => (
                                <TableRow key={evidence.id}>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      {getEvidenceTypeIcon(evidence.type)}
                                      <span className="capitalize">{evidence.type}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {evidence.title}
                                    {evidence.confidential && (
                                      <Badge className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                                        Confidential
                                      </Badge>
                                    )}
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">{evidence.addedBy}</TableCell>
                                  <TableCell className="hidden md:table-cell">{evidence.dateAdded}</TableCell>
                                  <TableCell className="hidden md:table-cell">{evidence.size}</TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">
                                      View <ChevronRight className="ml-1 h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Cases;
