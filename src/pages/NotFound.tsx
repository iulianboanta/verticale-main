import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Search, Home, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ghidbeauty/Navbar";
import Footer from "@/components/ghidbeauty/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="text-center">
          {/* Decorative icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-primary/10" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary/20">
                <Sparkles className="h-10 w-10 text-primary" />
              </div>
            </div>
          </div>

          {/* 404 Code */}
          <h1 className="mb-2 text-8xl font-bold tracking-tight text-primary/30">
            404
          </h1>
          
          {/* Title */}
          <h2 className="mb-4 text-2xl font-semibold text-foreground sm:text-3xl">
            Pagina nu a fost găsită
          </h2>
          
          {/* Description */}
          <p className="mx-auto mb-8 max-w-md text-muted-foreground">
            Ne pare rău, dar pagina pe care căutați nu există sau a fost mutată. 
            Verificați URL-ul sau navigați înapoi la pagina principală.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link to="/">
                <Home className="h-4 w-4" />
                Pagina principală
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/cautare">
                <Search className="h-4 w-4" />
                Căutare saloane
              </Link>
            </Button>
          </div>

          {/* Back link */}
          <button 
            onClick={() => window.history.back()}
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Înapoi la pagina anterioară
          </button>

          {/* Helpful links section */}
          <div className="mt-12 border-t pt-8">
            <p className="mb-4 text-sm font-medium text-foreground">
              Linkuri utile
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
                Acasă
              </Link>
              <span className="text-border">|</span>
              <Link to="/cautare" className="text-muted-foreground transition-colors hover:text-primary">
                Caută saloane
              </Link>
              <span className="text-border">|</span>
              <Link to="/informatii" className="text-muted-foreground transition-colors hover:text-primary">
                Articole
              </Link>
              <span className="text-border">|</span>
              <Link to="/contact" className="text-muted-foreground transition-colors hover:text-primary">
                Contact
              </Link>
              <span className="text-border">|</span>
              <Link to="/adauga-companie" className="text-muted-foreground transition-colors hover:text-primary">
                Adaugă companie
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
