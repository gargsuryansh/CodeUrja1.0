
import React from 'react';
import { Button } from "@/components/ui/button";
import StatCard from '../components/dashboard/StatCard';
import { 
  FileDigit, 
  FileVideo, 
  Users, 
  Clock, 
  PieChart, 
  BarChart, 
  Fingerprint,
  ChevronRight,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock data
  const recentActivities = [
    { id: 1, user: "Simba", action: "Uploaded", item: "Body Cam Footage", time: "10 minutes ago" },
    { id: 2, user: "Dr. Tarika", action: "Accessed", item: "DNA Analysis Report", time: "1 hour ago" },
    { id: 3, user: "Chulbul pandey", action: "Downloaded", item: "Witness Statement", time: "3 hours ago" },
    { id: 4, user: "Dr.Salunkhe", action: "Uploaded", item: "Crime Scene Photos", time: "Yesterday" },
    { id: 5, user: "Shakti Seti", action: "Modified", item: "Case #23587 Notes", time: "Yesterday" }
  ];
  
  const upcomingCases = [
    { id: 101, title: "State v. Jolly LLB", date: "Oct 15, 2023", type: "Hearing", status: "Upcoming" },
    { id: 102, title: "Evidence Review - Case #RT5522", date: "Oct 17, 2023", type: "Internal", status: "Scheduled" },
    { id: 103, title: "Supreme court - Case #BT9901", date: "Oct 22, 2023", type: "Court", status: "Pending" }
  ];
  
  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back. Here's an overview of your evidence management system.
        </p>
      </header>
      
      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Evidence Files" 
          value="1,284" 
          icon={FileDigit} 
          trend={{ value: 12, positive: true }}
          description="73 new in last 30 days"
        />
        <StatCard 
          title="Video Evidence" 
          value="426" 
          icon={FileVideo} 
          trend={{ value: 8, positive: true }}
          description="128.5 GB total size"
        />
        <StatCard 
          title="Active Users" 
          value="42" 
          icon={Users} 
          description="12 currently online"
        />
        <StatCard 
          title="Audit Log Events" 
          value="8,721" 
          icon={Clock} 
          trend={{ value: 23, positive: true }}
          description="1,245 in last 7 days"
        />
      </section>
      
      {/* Recent Activity & Upcoming Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions taken in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 pb-4 last:pb-0 last:border-0 border-b">
                  <div className="bg-muted rounded-full p-2">
                    <Fingerprint className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">{activity.action}</span> {activity.item}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Link to="/audit">
                  <Button variant="ghost" size="sm" className="w-full justify-between">
                    <span>View all activity</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Cases</CardTitle>
            <CardDescription>Scheduled court dates and reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingCases.map((c) => (
                <div key={c.id} className="border-b pb-4 last:pb-0 last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">{c.title}</p>
                    <span 
                      className={`text-xs px-2 py-1 rounded-full ${
                        c.status === 'Upcoming' 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-muted-foreground">{c.date}</p>
                    <p className="text-muted-foreground">{c.type}</p>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Link to="/cases">
                  <Button variant="ghost" size="sm" className="w-full justify-between">
                    <span>View all cases</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link to="/evidence">
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <FileDigit className="h-10 w-10 text-primary mb-3" />
                <h3 className="text-lg font-medium text-center">Upload Evidence</h3>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  Add new files to the system
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/evidence">
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Shield className="h-10 w-10 text-primary mb-3" />
                <h3 className="text-lg font-medium text-center">Verify Integrity</h3>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  Check file hash integrity
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/cases">
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <PieChart className="h-10 w-10 text-primary mb-3" />
                <h3 className="text-lg font-medium text-center">Case Management</h3>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  View and manage case files
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/audit">
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <BarChart className="h-10 w-10 text-primary mb-3" />
                <h3 className="text-lg font-medium text-center">System Reports</h3>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  View usage statistics
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
