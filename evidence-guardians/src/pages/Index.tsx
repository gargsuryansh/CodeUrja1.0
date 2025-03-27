
import { Button } from "@/components/ui/button";
import { Shield, FileDigit, Lock, BarChart, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Shield className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Evidence Guardians</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Secure, tamper-proof digital evidence management for law enforcement and legal professionals.
        </p>
        {!user && (
          <div className="mt-8">
            <Link to="/auth">
              <Button size="lg" className="mr-4">
                Sign In
              </Button>
            </Link>
            <Link to="/auth?tab=signup">
              <Button variant="outline" size="lg">
                Create Account
              </Button>
            </Link>
          </div>
        )}
        {user && (
          <div className="mt-8">
            <Link to="/dashboard">
              <Button size="lg">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        )}
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
          <FileDigit className="h-12 w-12 text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Secure Storage</h2>
          <p className="text-muted-foreground">
            Military-grade encryption and blockchain verification ensures your digital evidence remains tamper-proof.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
          <Lock className="h-12 w-12 text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Chain of Custody</h2>
          <p className="text-muted-foreground">
            Comprehensive audit trails document every interaction with evidence from collection to courtroom.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
          <BarChart className="h-12 w-12 text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Advanced Analytics</h2>
          <p className="text-muted-foreground">
            Powerful reporting tools help identify patterns and connections across cases and evidence.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 rounded-full p-4 mb-4">
              <Database className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">1. Upload</h3>
            <p className="text-muted-foreground">
              Securely upload digital evidence files directly to our encrypted storage system.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 rounded-full p-4 mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">2. Verify</h3>
            <p className="text-muted-foreground">
              Each file is automatically hashed and verified to ensure integrity.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 rounded-full p-4 mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">3. Manage</h3>
            <p className="text-muted-foreground">
              Organize, search, and access your evidence while maintaining complete chain of custody.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join the growing number of agencies and legal professionals who trust Evidence Guardians with their digital evidence management.
        </p>
        {!user && (
          <Link to="/auth">
            <Button size="lg">
              Sign Up Now
            </Button>
          </Link>
        )}
        {user && (
          <Link to="/dashboard">
            <Button size="lg">
              Go to Dashboard
            </Button>
          </Link>
        )}
      </section>
    </div>
  );
};

export default Index;
