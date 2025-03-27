
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-primary/10 rounded-full">
            <FileQuestion className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to the dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="w-full sm:w-auto">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
