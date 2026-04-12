import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Acasă", href: "#" },
  { label: "Categorii", href: "#categorii" },
  { label: "Județe", href: "#judete" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-300 bg-card ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">Ghid</span>
          <span className="text-xl font-bold text-foreground">Beauty</span>
          <span className="text-xs text-muted-foreground">.ro</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm">
            Autentificare
          </Button>
          <Button size="sm">Înregistrare</Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Meniu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-card pb-4">
          <nav className="flex flex-col gap-1 px-4 pt-2">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-3 px-4 pt-3">
            <Button variant="outline" size="sm" className="flex-1">
              Autentificare
            </Button>
            <Button size="sm" className="flex-1">
              Înregistrare
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
