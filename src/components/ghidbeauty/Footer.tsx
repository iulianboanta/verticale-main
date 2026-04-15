import logoWhite from "@/assets/ghidbeauty-logo-white.png";

const Footer = () => (
  <footer id="contact" className="bg-foreground text-background">
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-1">
          <img src={logoWhite} alt="GhidBeauty.ro" className="h-8" />
          <p className="mt-3 text-sm opacity-70 leading-relaxed">
            Directorul #1 de beauty din România. Conectăm clienții cu
            profesioniștii din industria frumuseții.
          </p>
        </div>

        {/* Col 1 */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Despre noi</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><a href="#" className="hover:opacity-100 transition-opacity">Despre GhidBeauty</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Cum funcționează</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Termeni și condiții</a></li>
            <li><a href="/politica-de-confidentialitate" className="hover:opacity-100 transition-opacity">Politica de confidențialitate</a></li>
          </ul>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Linkuri utile</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><a href="#" className="hover:opacity-100 transition-opacity">Înscrie-ți afacerea</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Planuri și prețuri</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Blog</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">FAQ</a></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li>contact@ghidbeauty.ro</li>
            <li>+40 700 000 000</li>
            <li>București, România</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="border-t border-background/10">
      <div className="container flex flex-col items-center justify-between gap-2 py-4 text-xs opacity-50 sm:flex-row">
        <span>© {new Date().getFullYear()} GhidBeauty.ro. Toate drepturile rezervate.</span>
        <span>Realizat cu 💜 în România</span>
      </div>
    </div>
  </footer>
);

export default Footer;
