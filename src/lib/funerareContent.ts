import type { DespreGhidBeautyContent } from "@/lib/staticPagesContent";

/**
 * Content overrides for the "Despre noi" page when the active vertical
 * is `funerare`. Keeps the same shape as DespreGhidBeautyContent so the
 * existing layout/components stay untouched.
 */
export const funerareDespreContent: DespreGhidBeautyContent = {
  seo: {
    title: "Despre noi — GhidFunerare",
    metaDescription:
      "GhidFunerare.ro este directorul caselor funerare și al serviciilor conexe din România — sprijin discret, profesionist și disponibil 24/7.",
    slug: "/despre-noi",
  },
  hero: {
    eyebrow: "Despre GhidFunerare",
    title: "Sprijin discret în momentele dificile",
    subtitle:
      "GhidFunerare.ro conectează familiile cu case funerare, capele, florării, transport și pietre funerare — profesioniști de încredere, disponibili oricând.",
    ctaSearch: "Caută o casă funerară",
    ctaRegister: "Înscrie-ți serviciul",
  },
  stats: [
    { value: "1.800+", label: "Case funerare listate" },
    { value: "42", label: "Județe acoperite" },
    { value: "24/7", label: "Disponibilitate" },
    { value: "60K+", label: "Familii sprijinite anual" },
  ],
  about: {
    title: "Ce este GhidFunerare?",
    paragraph1:
      "GhidFunerare.ro este directorul național dedicat serviciilor funerare din România. Aici găsești case funerare, capele, servicii de transport, florării, pietrari și toți profesioniștii care pot ajuta o familie să treacă cu demnitate prin pierderea unei persoane dragi.",
    paragraph2:
      "Înțelegem că în astfel de momente timpul, claritatea și încrederea contează cel mai mult. De aceea am construit o platformă simplă, sobră și actualizată — unde informația este la îndemână, fără căutări obositoare.",
  },
  forClients: {
    eyebrow: "Pentru familii",
    title: "Sprijin clar, atunci când ai cea mai mare nevoie",
    paragraph:
      "Nu trebuie să cauți în grabă, pe telefon, la o oră dificilă. Pe GhidFunerare găsești rapid casa funerară potrivită, cu informații verificate de contact, servicii oferite, program și recenzii reale.",
    benefits: [
      { title: "Disponibili 24/7", text: "Servicii funerare care răspund non-stop, în orașul tău și în împrejurimi." },
      { title: "Informații verificate", text: "Datele de contact, adresele și serviciile sunt actualizate periodic." },
      { title: "Aproape de tine", text: "Filtrează după localitate sau județ și găsește prima soluție potrivită." },
      { title: "Transparență", text: "Recenzii și descrieri clare ale serviciilor — alegi în cunoștință de cauză." },
    ],
  },
  forPros: {
    eyebrow: "Pentru profesioniști",
    title: "Fii prezent acolo unde familiile caută sprijin",
    paragraph:
      "Casele funerare, florăriile, serviciile de transport și pietrarii care lucrează cu demnitate și seriozitate merită vizibilitate. GhidFunerare îți oferă un profil complet, accesibil și de încredere.",
    benefits: [
      { title: "Vizibilitate locală", text: "Apari în căutările familiilor din zona ta, exact când au nevoie." },
      { title: "Profil complet", text: "Servicii oferite, program, contact, fotografii și recenzii — într-un singur loc." },
      { title: "Credibilitate", text: "Un profil sobru și profesional transmite încredere în momente sensibile." },
      { title: "Cereri calificate", text: "Primești solicitări de la familii care caută exact ce oferi tu." },
    ],
    cta: "Înscrie-ți serviciul gratuit",
  },
  mission: {
    title: "Misiunea noastră",
    paragraph1:
      "Credem că fiecare familie merită sprijin clar, demn și apropiat în momentele de pierdere — indiferent de oraș sau circumstanțe. Misiunea GhidFunerare este să facă mai ușor accesul la servicii funerare profesioniste, oriunde în România.",
    paragraph2:
      "De la marile orașe până în comune mici, ne dorim ca fiecare casă funerară, florărie sau pietrar de încredere să fie ușor de găsit — iar fiecare familie să primească ajutorul potrivit, la timp.",
  },
  finalCta: {
    title: "Aici găsești ajutor de încredere",
    subtitle:
      "Fie că ai nevoie acum de o casă funerară, fie că ești profesionist care vrea să ajute mai multe familii, GhidFunerare este alături de tine.",
    ctaExplore: "Caută servicii funerare",
    ctaRegister: "Înscrie-ți serviciul",
  },
};
