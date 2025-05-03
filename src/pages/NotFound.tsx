import { useLocation, Link } from "react-router-dom"; // Import Link
import { useEffect } from "react";
import { Button } from "@/components/ui/button"; // Import Button
import Navbar from "@/components/Navbar"; // Import Navbar
import Footer from "@/components/Footer"; // Import Footer
import { AlertTriangle } from "lucide-react"; // Import Icon

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "404 Not Found - AdaptiDemo Labs"; // Set title
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background"> {/* Use theme background */}
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16 px-4"> {/* Center content */}
        <div className="text-center max-w-md">
           <AlertTriangle className="mx-auto h-16 w-16 text-destructive mb-6" /> {/* Use theme color */}
           <h1 className="text-5xl font-bold text-foreground mb-4">404</h1> {/* Use theme color */}
           <p className="text-xl text-muted-foreground mb-8"> {/* Use theme color */}
             Oops! The page you're looking for doesn't seem to exist.
           </p>
           <Button asChild> {/* Style link as button */}
             <Link to="/">Return to Home</Link>
           </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
