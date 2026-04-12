import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ctaRegister from "@/assets/cta-register.jpg";
import ctaUpgrade from "@/assets/cta-upgrade.jpg";

interface Props {
  variant: "register" | "upgrade";
}

const content = {
  register: {
    title: "Ai un salon sau studio de beauty?",
    subtitle: "Înscrie-te gratuit în director și fii descoperit de mii de clienți potențiali.",
    cta: "Înscrie-te acum",
    image: ctaRegister,
  },
  upgrade: {
    title: "Vrei mai multă vizibilitate?",
    subtitle: "Treci la planul Premium și apari primul în rezultatele de căutare.",
    cta: "Upgrade la Premium",
    image: ctaUpgrade,
  },
};

const CtaBanner = ({ variant }: Props) => {
  const c = content[variant];
  return (
    <section className="py-4">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl h-48 md:h-56">
          <img
            src={c.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            width={1200}
            height={512}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-12 max-w-lg">
            <h2 className="text-xl font-bold text-primary-foreground md:text-2xl">{c.title}</h2>
            <p className="mt-1 text-sm text-primary-foreground/90">{c.subtitle}</p>
            <Button
              size="sm"
              className="mt-4 w-fit bg-card text-primary hover:bg-card/90 rounded-full px-6 font-semibold"
            >
              {c.cta}
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
