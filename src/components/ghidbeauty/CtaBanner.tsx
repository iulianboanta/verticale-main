import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Props {
  variant: "register" | "upgrade";
}

const content = {
  register: {
    title: "Ai un salon sau studio de beauty?",
    subtitle: "Înscrie-te gratuit în director și fii descoperit de mii de clienți potențiali.",
    cta: "Înscrie-te acum",
  },
  upgrade: {
    title: "Vrei mai multă vizibilitate?",
    subtitle: "Treci la planul Premium și apari primul în rezultatele de căutare.",
    cta: "Upgrade la Premium",
  },
};

const CtaBanner = ({ variant }: Props) => {
  const c = content[variant];
  return (
    <section className="py-6">
      <div className="container">
        <div className="rounded-2xl bg-gradient-to-r from-primary to-primary-dark px-6 py-10 text-center text-primary-foreground md:px-16 md:py-14">
          <h2 className="text-2xl font-bold md:text-3xl">{c.title}</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm opacity-90">{c.subtitle}</p>
          <Button
            size="lg"
            className="mt-6 bg-card text-primary hover:bg-card/90 rounded-full px-8 font-semibold"
          >
            {c.cta}
            <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
