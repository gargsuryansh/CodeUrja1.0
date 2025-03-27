
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EvidenceCard, { EvidenceItem } from '../components/evidence/EvidenceCard';
import EvidenceUpload from '../components/evidence/EvidenceUpload';
import HashVerifier from '../components/evidence/HashVerifier';
import { 
  Search, 
  Filter, 
  FileUp, 
  ShieldCheck, 
  FolderPlus,
  ChevronDown,
  ListFilter
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock evidence data
const mockEvidence: EvidenceItem[] = [
  {
    id: "evi-001",
    title: "Body Camera Footage - Inspecter Chulbul Pandey",
    type: "video",
    date: "2023-10-01",
    size: "1.2 GB",
    caseNumber: "CS-2023-0456",
    hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    confidential: true,
    tags: ["video", "body-cam", "incident"]
  },
  {
    id: "evi-002",
    title: "Witness Statement - Iqbal Kadri",
    type: "document",
    date: "2023-09-28",
    size: "1.5 MB",
    caseNumber: "CS-2023-0456",
    hash: "a1e0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b123",
    confidential: false,
    tags: ["document", "statement", "witness"]
  },
  {
    id: "evi-003",
    title: "Crime Scene Photos - banganga",
    type: "image",
    date: "2023-09-27",
    size: "45.8 MB",
    caseNumber: "CS-2023-0456",
    hash: "b2d0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b456",
    confidential: true,
    tags: ["photos", "crime-scene"]
  },
  {
    id: "evi-004",
    title: "Forensic Analysis Report",
    type: "document",
    date: "2023-09-25",
    size: "3.2 MB",
    caseNumber: "CS-2023-0452",
    hash: "c3e0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b789",
    confidential: false,
    tags: ["report", "forensic", "analysis"]
  },
  {
    id: "evi-005",
    title: "100 Dail Call Recording",
    type: "audio",
    date: "2023-09-23",
    size: "8.7 MB",
    caseNumber: "CS-2023-0450",
    hash: "d4f0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b012",
    confidential: false,
    tags: ["audio", "911", "emergency"]
  },
  {
    id: "evi-006",
    title: "Surveillance Footage - Bank ATM",
    type: "video",
    date: "2023-09-20",
    size: "650 MB",
    caseNumber: "CS-2023-0445",
    hash: "e5g0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b345",
    confidential: true,
    tags: ["video", "surveillance", "bank"]
  }
];

const Evidence = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('browse');
  
  // Filter evidence based on search query
  const filteredEvidence = mockEvidence.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Digital Evidence Management</h1>
        <p className="text-muted-foreground">
          Upload, browse, and verify digital evidence files.
        </p>
      </header>
      
      <Tabs defaultValue="browse" className="mb-6" onValueChange={setSelectedTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="browse">Browse Evidence</TabsTrigger>
            <TabsTrigger value="upload">Upload Evidence</TabsTrigger>
            <TabsTrigger value="verify">Verify Integrity</TabsTrigger>
          </TabsList>
          
          {selectedTab === 'browse' && (
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
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
          )}
        </div>
        
        <TabsContent value="browse">
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search evidence by title, case number, or tags..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <ListFilter className="h-4 w-4 mr-2" />
                    <span>Filter</span>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      All Evidence
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Documents Only
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Images Only
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Videos Only
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Audio Only
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {filteredEvidence.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvidence.map(evidence => (
                <EvidenceCard key={evidence.id} evidence={evidence} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Search className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">No evidence found</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  We couldn't find any evidence matching your search criteria. Try adjusting your search terms or uploading new evidence.
                </p>
                <Button 
                  className="mt-6" 
                  onClick={() => setSelectedTab('upload')}
                >
                  <FileUp className="mr-2 h-4 w-4" /> Upload New Evidence
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="upload">
          <div className="flex justify-center">
            <EvidenceUpload />
          </div>
        </TabsContent>
        
        <TabsContent value="verify">
          <div className="flex justify-center">
            <HashVerifier />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Evidence;
