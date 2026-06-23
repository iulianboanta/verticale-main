import logoWhite from "@/assets/ghidbeauty-logo-white.png";
import { useVertical } from "@/lib/vertical";

const Footer = () => {
  const { vertical } = useVertical();
  const isBeauty = vertical.key === "beauty";

  const handleEmail = () => {
    window.location.href = `mailto:${vertical.email}`;
  };
  const handlePhone = () => {
    window.location.href = `tel:${vertical.phone}`;
  };

  const phoneFormatted = vertical.phone.replace(
    /(\d{3})(\d{3})(\d{2})(\d{2})/,
    "$1.$2.$3.$4"
  );

  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
          {isBeauty ? (
            <img src={logoWhite} alt={vertical.brand} className="h-8" />
          ) : vertical.logoWhite ? (
            <img src={vertical.logoWhite} alt={vertical.brand} className="h-8" />
          ) : (
            <span
              className="text-xl font-semibold"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              {vertical.brand}
            </span>
          )}
            <p className="mt-3 text-sm opacity-70 leading-relaxed">
              {vertical.footerDescription}
            </p>
          </div>

          {/* Col 1 */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Despre noi</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="/despre-noi" className="hover:opacity-100 transition-opacity">Despre {vertical.brand}</a></li>
              <li><a href="/cine-suntem-noi" className="hover:opacity-100 transition-opacity">Despre Companie</a></li>
              <li><a href="/termeni" className="hover:opacity-100 transition-opacity">Termeni și condiții</a></li>
              <li><a href="/politica-de-confidentialitate" className="hover:opacity-100 transition-opacity">Politica de confidențialitate</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Linkuri utile</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="/adauga-companie" className="hover:opacity-100 transition-opacity">Înscrie-ți afacerea</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Planuri și prețuri</a></li>
              <li><a href="/faq" className="hover:opacity-100 transition-opacity">FAQ</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>
                <span className="cursor-pointer hover:opacity-100" onClick={handleEmail}>
                  {vertical.email}
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:opacity-100" onClick={handlePhone}>
                  {phoneFormatted}
                </span>
              </li>
              <li>București, România</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-4 text-xs opacity-50 sm:flex-row">
          <span>© {new Date().getFullYear()} Directories Management Systems. Toate drepturile rezervate.</span>
          <span>Realizat cu grijă în România</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
