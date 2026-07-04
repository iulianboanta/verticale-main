import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/ghidbeauty-logo.png";
import logoWhiteOriginal from "@/assets/ghidbeauty-logo-white.png";
import logoWhiteSolid from "@/assets/logo_beauty_white.png";
import vetLogo from "@/assets/ghidveterinari-logo.svg";
import vetLogoDark from "@/assets/ghidveterinari-logo-dark.svg";
import { useVertical } from "@/lib/vertical";

const navLinks = [
  { label: "Despre noi", href: "/despre-noi" },
  { label: "Articole", href: "/informatii" },
  { label: "Contact", href: "/contact" },
  { label: "Admin", href: "/manage" },
];

const Navbar = ({ variant = "transparent" }: { variant?: "transparent" | "solid" }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { vertical } = useVertical();
  const isBeauty = vertical.key === "beauty";
  const isVet = vertical.key === "veterinari";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-card shadow-md"
          : variant === "solid"
            ? "bg-primary"
            : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          {isBeauty ? (
            <img
              src={scrolled ? logo : variant === "solid" ? logoWhiteSolid : logoWhiteOriginal}
              alt={vertical.brand}
              className="h-12 transition-all duration-300"
            />
          ) : isVet ? (
            <img
              src={scrolled ? vetLogo : vetLogoDark}
              alt={vertical.brand}
              className="h-10 md:h-11 transition-all duration-300"
            />
          ) : (
            <span
              className={`text-xl font-semibold tracking-tight transition-colors ${
                scrolled ? "text-foreground" : "text-white"
              }`}
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              {vertical.brand}
            </span>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) =>
            l.href.startsWith("/") ? (
              <Link
                key={l.label}
                to={l.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-muted-foreground hover:text-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-muted-foreground hover:text-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            )
          )}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/autentificare">
            <Button
              variant="outline"
              size="sm"
              className={
                scrolled
                  ? "hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  : "border-white/40 text-white bg-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary"
              }
            >
              Autentificare
            </Button>
          </Link>
          <Link to="/adauga-companie">
            <Button
              size="sm"
              className={
                scrolled
                  ? "hover:bg-primary-foreground hover:text-primary hover:ring-2 hover:ring-primary transition-all"
                  : "bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:ring-2 hover:ring-primary transition-all"
              }
            >
              Adaugă companie
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden ${scrolled ? "text-foreground" : "text-white"}`}
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
            {navLinks.map((l) =>
              l.href.startsWith("/") ? (
                <Link
                  key={l.label}
                  to={l.href}
                  className="py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  className="py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </a>
              )
            )}
          </nav>
          <div className="flex gap-3 px-4 pt-3">
            <Link to="/autentificare" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                Autentificare
              </Button>
            </Link>
            <Link to="/adauga-companie" className="flex-1">
              <Button size="sm" className="w-full hover:bg-primary-foreground hover:text-primary hover:ring-2 hover:ring-primary transition-all">
                Adaugă companie
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
