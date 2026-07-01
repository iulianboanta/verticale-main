import type { DespreGhidBeautyContent } from "@/lib/staticPagesContent";
import type { VerticalKey } from "@/config/verticals";
import { funerareDespreContent } from "@/lib/funerareContent";

import heroVet from "@/assets/despre-noi/hero-veterinari.jpg";
import clientiVet from "@/assets/despre-noi/clienti-veterinari.jpg";
import proVet from "@/assets/despre-noi/profesionisti-veterinari.jpg";
import reteaVet from "@/assets/despre-noi/retea-veterinari.jpg";

import heroTra from "@/assets/despre-noi/hero-tractari.jpg";
import clientiTra from "@/assets/despre-noi/clienti-tractari.jpg";
import proTra from "@/assets/despre-noi/profesionisti-tractari.jpg";
import reteaTra from "@/assets/despre-noi/retea-tractari.jpg";

import heroGra from "@/assets/despre-noi/hero-gradinite.jpg";
import clientiGra from "@/assets/despre-noi/clienti-gradinite.jpg";
import proGra from "@/assets/despre-noi/profesionisti-gradinite.jpg";
import reteaGra from "@/assets/despre-noi/retea-gradinite.jpg";

import heroUsi from "@/assets/despre-noi/hero-usi.jpg";
import clientiUsi from "@/assets/despre-noi/clienti-usi.jpg";
import proUsi from "@/assets/despre-noi/profesionisti-usi.jpg";
import reteaUsi from "@/assets/despre-noi/retea-usi.jpg";

import heroCur from "@/assets/despre-noi/hero-curatenie.jpg";
import clientiCur from "@/assets/despre-noi/clienti-curatenie.jpg";
import proCur from "@/assets/despre-noi/profesionisti-curatenie.jpg";
import reteaCur from "@/assets/despre-noi/retea-curatenie.jpg";

import heroFun from "@/assets/despre-noi/hero-funerare.jpg";
import clientiFun from "@/assets/despre-noi/familii-funerare.jpg";
import proFun from "@/assets/despre-noi/profesionisti-funerare.jpg";
import reteaFun from "@/assets/despre-noi/retea-funerare.jpg";

export interface DespreImageSet {
  hero: string;
  clienti: string;
  profesionisti: string;
  retea: string;
}

const veterinariContent: DespreGhidBeautyContent = {
  seo: {
    title: "Despre noi — GhidVeterinari",
    metaDescription:
      "GhidVeterinari.ro este directorul cabinetelor și clinicilor veterinare din România — grijă profesionistă pentru prietenii tăi blănoși.",
    slug: "/despre-noi",
  },
  hero: {
    eyebrow: "Despre GhidVeterinari",
    title: "Grijă și încredere pentru animalele tale",
    subtitle:
      "Conectăm proprietarii de animale cu cabinete veterinare, clinici de urgență, saloane de toaletaj și farmacii veterinare — profesioniști verificați, aproape de tine.",
    ctaSearch: "Caută un veterinar",
    ctaRegister: "Înscrie-ți cabinetul",
  },
  stats: [
    { value: "3.500+", label: "Cabinete listate" },
    { value: "42", label: "Județe acoperite" },
    { value: "24/7", label: "Urgențe disponibile" },
    { value: "180K+", label: "Animale îngrijite anual" },
  ],
  about: {
    title: "Ce este GhidVeterinari?",
    paragraph1:
      "GhidVeterinari.ro este platforma dedicată sănătății animalelor de companie din România. De la controale de rutină la urgențe, aici găsești medici veterinari, clinici specializate, saloane de toaletaj și pet shops.",
    paragraph2:
      "Credem că fiecare animal merită îngrijire de calitate. De aceea am construit un director unde informația este clară, actualizată și accesibilă în orice moment.",
  },
  forClients: {
    eyebrow: "Pentru proprietari",
    title: "Găsești rapid ajutorul potrivit pentru animalul tău",
    paragraph:
      "Nu mai pierzi timp căutând un cabinet deschis într-o urgență. Pe GhidVeterinari filtrezi după oraș, specialitate și disponibilitate — și găsești imediat medicul potrivit.",
    benefits: [
      { title: "Urgențe 24/7", text: "Cabinete cu program non-stop, marcate clar pe hartă." },
      { title: "Recenzii reale", text: "Feedback de la alți proprietari, verificat de echipa noastră." },
      { title: "Aproape de tine", text: "Filtre pe localitate și distanță — găsești primul veterinar liber." },
      { title: "Specializări", text: "De la exotice la chirurgie — alegi cabinetul potrivit nevoii." },
    ],
  },
  forPros: {
    eyebrow: "Pentru veterinari",
    title: "Fii găsit de proprietarii care caută un medic de încredere",
    paragraph:
      "Cabinetele profesioniste merită să fie vizibile. GhidVeterinari îți oferă un profil complet cu specializări, program, contact și recenzii — într-un loc pe care proprietarii îl folosesc zilnic.",
    benefits: [
      { title: "Vizibilitate locală", text: "Apari în topul căutărilor din orașul și zona ta." },
      { title: "Profil complet", text: "Specialități, echipă, dotări, program — totul într-un singur loc." },
      { title: "Programări online", text: "Primești cereri de programare direct din profil." },
      { title: "Comunitate", text: "Rețea de colegi și clienți care îți recomandă serviciile." },
    ],
    cta: "Înscrie-ți cabinetul gratuit",
  },
  mission: {
    title: "Misiunea noastră",
    paragraph1:
      "Vrem ca fiecare animal de companie din România să aibă acces rapid la îngrijire veterinară de calitate — indiferent de oraș sau oră.",
    paragraph2:
      "De la marile clinici din capitală la cabinetele din sate, ne dorim ca fiecare medic bun să fie ușor de găsit, iar fiecare proprietar să primească ajutorul potrivit la timp.",
  },
  finalCta: {
    title: "Sănătatea animalului tău începe aici",
    subtitle:
      "Fie că ai nevoie de un veterinar acum, fie că ești medic care vrea să ajungă la mai mulți proprietari, GhidVeterinari este alături de tine.",
    ctaExplore: "Caută un veterinar",
    ctaRegister: "Înscrie-ți cabinetul",
  },
};

const tractariContent: DespreGhidBeautyContent = {
  seo: {
    title: "Despre noi — GhidTractări",
    metaDescription:
      "GhidTractări.ro — directorul serviciilor de tractări auto și asistență rutieră din România. Ajutor rapid, non-stop, oriunde ai nevoie.",
    slug: "/despre-noi",
  },
  hero: {
    eyebrow: "Despre GhidTractări",
    title: "Ajutor rapid când mașina ta cedează",
    subtitle:
      "Tractări auto, asistență rutieră, depanări și transport vehicule — profesioniști verificați, disponibili non-stop pe toate drumurile României.",
    ctaSearch: "Caută tractare",
    ctaRegister: "Înscrie-ți firma",
  },
  stats: [
    { value: "2.400+", label: "Firme de tractări" },
    { value: "42", label: "Județe acoperite" },
    { value: "24/7", label: "Intervenție non-stop" },
    { value: "15 min", label: "Timp mediu de răspuns" },
  ],
  about: {
    title: "Ce este GhidTractări?",
    paragraph1:
      "GhidTractări.ro este platforma prin care șoferii găsesc rapid firme de tractare, depanare și asistență rutieră în orice colț al României — pe autostrăzi, drumuri naționale sau în oraș.",
    paragraph2:
      "Într-o pană sau un accident, fiecare minut contează. De aceea am construit un director simplu, cu filtrare pe locație și tip de intervenție, unde poți suna direct în câteva secunde.",
  },
  forClients: {
    eyebrow: "Pentru șoferi",
    title: "Nu mai cauți la nervi cine te tractează",
    paragraph:
      "În loc să suni la 10 numere, deschizi GhidTractări, alegi locația și tipul de intervenție și găsești imediat firma disponibilă cea mai apropiată.",
    benefits: [
      { title: "Răspuns rapid", text: "Firme cu timp mediu de intervenție de sub 30 de minute." },
      { title: "Tarife transparente", text: "Prețuri orientative afișate — fără surprize la fața locului." },
      { title: "Acoperire națională", text: "Autostradă, drum național sau oraș — găsești pe oricine, oriunde." },
      { title: "Servicii complete", text: "Tractare, boot-service, transport, depanare baterie — totul într-un loc." },
    ],
  },
  forPros: {
    eyebrow: "Pentru firme",
    title: "Șoferii care au nevoie de tine te găsesc primii",
    paragraph:
      "Dacă oferi servicii de tractare sau asistență rutieră, GhidTractări îți aduce cereri calificate exact când și unde ai capacitate. Un profil bine făcut înseamnă mai multe intervenții.",
    benefits: [
      { title: "Cereri locale", text: "Primești apeluri de la șoferi din zona ta de acoperire." },
      { title: "Profil profesional", text: "Flotă, tarife, zone acoperite, contact 24/7 — clar afișate." },
      { title: "Fără intermediari", text: "Clientul te sună direct pe tine, fără comisioane." },
      { title: "Credibilitate", text: "Recenzii și verificare oferă încredere din primul apel." },
    ],
    cta: "Înscrie-ți firma gratuit",
  },
  mission: {
    title: "Misiunea noastră",
    paragraph1:
      "Vrem ca niciun șofer să nu rămână blocat pe marginea drumului fără să știe pe cine să sune. Fiecare oraș, fiecare autostradă, fiecare oră — un profesionist disponibil.",
    paragraph2:
      "De la firmele mari cu flote de zeci de platforme, la operatorii independenți din județ, ne dorim ca oferta de asistență rutieră din România să fie ușor de găsit și de contactat.",
  },
  finalCta: {
    title: "Ajutor pe drum, la un click distanță",
    subtitle:
      "Fie că ai nevoie acum de o tractare, fie că oferi servicii de asistență rutieră, GhidTractări te conectează rapid.",
    ctaExplore: "Caută tractare acum",
    ctaRegister: "Înscrie-ți firma",
  },
};

const gradiniteContent: DespreGhidBeautyContent = {
  seo: {
    title: "Despre noi — GhidGrădinițe",
    metaDescription:
      "GhidGrădinițe.ro — directorul grădinițelor, creșelor și programelor after-school din România. Găsește locul potrivit pentru copilul tău.",
    slug: "/despre-noi",
  },
  hero: {
    eyebrow: "Despre GhidGrădinițe",
    title: "Cel mai bun loc pentru copilul tău",
    subtitle:
      "Grădinițe private și de stat, creșe, after-school și programe educaționale — un director complet care te ajută să alegi în cunoștință de cauză.",
    ctaSearch: "Caută o grădiniță",
    ctaRegister: "Înscrie-ți grădinița",
  },
  stats: [
    { value: "4.200+", label: "Grădinițe și creșe" },
    { value: "42", label: "Județe acoperite" },
    { value: "12.000+", label: "Recenzii ale părinților" },
    { value: "100%", label: "Informații verificate" },
  ],
  about: {
    title: "Ce este GhidGrădinițe?",
    paragraph1:
      "GhidGrădinițe.ro este platforma dedicată părinților care caută cea mai potrivită grădiniță, creșă sau program educațional pentru copilul lor. Găsești opțiuni private și de stat, cu detalii despre program, curriculum și facilități.",
    paragraph2:
      "Știm cât de greu este să alegi. De aceea am adunat într-un singur loc toate informațiile de care ai nevoie: taxe, program prelungit, mese, program de weekend, activități opționale — totul, transparent.",
  },
  forClients: {
    eyebrow: "Pentru părinți",
    title: "Alegi cu încredere, fără nopți nedormite",
    paragraph:
      "Compară grădinițe după curriculum, taxe, program și distanța de acasă. Citește recenzii reale de la alți părinți și ia decizia potrivită pentru familia ta.",
    benefits: [
      { title: "Comparare rapidă", text: "Vezi taxe, program și dotări una lângă alta, fără să te pierzi." },
      { title: "Recenzii de la părinți", text: "Feedback real, moderat, de la familii cu copii înscriși." },
      { title: "Aproape de casă", text: "Filtre pe sector, cartier sau distanță de la adresa ta." },
      { title: "Zile porți deschise", text: "Programează vizite direct din platformă." },
    ],
  },
  forPros: {
    eyebrow: "Pentru grădinițe",
    title: "Părinții care te caută te găsesc imediat",
    paragraph:
      "Un profil complet și actualizat te ajută să atragi familiile potrivite. GhidGrădinițe îți oferă vizibilitate în orașul tău și un canal direct de comunicare cu părinții.",
    benefits: [
      { title: "Vizibilitate locală", text: "Apari în căutările părinților din zona ta." },
      { title: "Profil detaliat", text: "Curriculum, echipă, program, fotografii, tur virtual — totul afișat." },
      { title: "Cereri de înscriere", text: "Primești solicitări direct în profil, gata de gestionat." },
      { title: "Comunitate", text: "Fii recomandată de părinți fericiți în comunitatea locală." },
    ],
    cta: "Înscrie-ți grădinița gratuit",
  },
  mission: {
    title: "Misiunea noastră",
    paragraph1:
      "Credem că fiecare copil merită să înceapă educația într-un loc potrivit — iar fiecare părinte merită să găsească acel loc fără stres și fără informații lipsă.",
    paragraph2:
      "De la creșe la programe alternative, ne dorim ca oferta educațională timpurie din România să fie transparentă, ușor de comparat și de aproape.",
  },
  finalCta: {
    title: "Primul pas educațional începe aici",
    subtitle:
      "Fie că ești părinte în căutarea grădiniței perfecte, fie că administrezi una, GhidGrădinițe este locul unde vă întâlniți.",
    ctaExplore: "Caută grădinițe",
    ctaRegister: "Înscrie-ți grădinița",
  },
};

const usiContent: DespreGhidBeautyContent = {
  seo: {
    title: "Despre noi — GhidUși",
    metaDescription:
      "GhidUși.ro — directorul producătorilor, distribuitorilor și montatorilor de uși din România. Soluții pentru orice proiect.",
    slug: "/despre-noi",
  },
  hero: {
    eyebrow: "Despre GhidUși",
    title: "Uși pe măsura casei tale",
    subtitle:
      "Uși de interior și exterior, tâmplărie PVC și lemn, uși metalice, automatizări și montaj — direct de la specialiștii verificați din toată țara.",
    ctaSearch: "Caută un specialist",
    ctaRegister: "Înscrie-ți firma",
  },
  stats: [
    { value: "1.900+", label: "Firme listate" },
    { value: "42", label: "Județe acoperite" },
    { value: "50.000+", label: "Proiecte finalizate anual" },
    { value: "10 ani", label: "Garanție medie oferită" },
  ],
  about: {
    title: "Ce este GhidUși?",
    paragraph1:
      "GhidUși.ro este directorul specializat în tot ce înseamnă uși și tâmplărie: producători, distribuitori, showroom-uri, montatori profesioniști și servicii de automatizare pentru locuințe și spații comerciale.",
    paragraph2:
      "Alegerea unei uși potrivite ține de estetică, siguranță și durată. De aceea am adunat într-un singur loc firme verificate, cu portofolii reale și oferte transparente.",
  },
  forClients: {
    eyebrow: "Pentru clienți",
    title: "Găsești ușa potrivită și pe cine să o monteze",
    paragraph:
      "De la ușa de intrare metalică până la tâmplăria PVC pentru întreaga casă, alegi soluția potrivită bugetului și proiectului tău — și găsești echipa care o montează corect.",
    benefits: [
      { title: "Portofolii reale", text: "Vezi proiecte anterioare înainte să ceri o ofertă." },
      { title: "Oferte comparate", text: "Cere ofertă la mai multe firme direct din profilul lor." },
      { title: "Montaj profesionist", text: "Echipe specializate, cu garanție pe manoperă." },
      { title: "Consultanță", text: "Alegi ușa potrivită cu ajutorul specialiștilor listați." },
    ],
  },
  forPros: {
    eyebrow: "Pentru firme",
    title: "Ești găsit când clientul chiar are un proiect",
    paragraph:
      "GhidUși aduce cereri de la clienți care sunt deja în faza de decizie — nu doar curioși. Un profil bun cu portofoliu real convertește vizitatorii în comenzi.",
    benefits: [
      { title: "Lead-uri calificate", text: "Solicitări de ofertă de la clienți cu proiect concret." },
      { title: "Portofoliu vizibil", text: "Galerie foto, tipuri de uși, materiale, prețuri orientative." },
      { title: "Acoperire națională", text: "Alegi județele și orașele în care lucrezi." },
      { title: "Recenzii", text: "Construiești reputație publică vizibilă tuturor clienților." },
    ],
    cta: "Înscrie-ți firma gratuit",
  },
  mission: {
    title: "Misiunea noastră",
    paragraph1:
      "Vrem ca alegerea și montajul unei uși să fie o experiență clară, sigură și fără compromisuri — pentru client și pentru firma care execută lucrarea.",
    paragraph2:
      "De la producători mari la meșteri locali, ne dorim ca toată piața de uși și tâmplărie din România să fie transparentă, comparabilă și de încredere.",
  },
  finalCta: {
    title: "De la ideea de proiect la montaj",
    subtitle:
      "Fie că ești client cu un proiect, fie că ești firmă cu experiență, GhidUși te conectează cu partea potrivită.",
    ctaExplore: "Caută specialiști",
    ctaRegister: "Înscrie-ți firma",
  },
};

const curatenieContent: DespreGhidBeautyContent = {
  seo: {
    title: "Despre noi — GhidCurățenie",
    metaDescription:
      "GhidCurățenie.ro — directorul firmelor profesioniste de curățenie din România. Locuințe, birouri, scări de bloc, post-construcție.",
    slug: "/despre-noi",
  },
  hero: {
    eyebrow: "Despre GhidCurățenie",
    title: "Servicii de curățenie impecabile, aproape de tine",
    subtitle:
      "Firme verificate pentru curățenie rezidențială, birouri, scări de bloc, post-construcție și industrială — profesionalism și rezultate garantate.",
    ctaSearch: "Caută o firmă",
    ctaRegister: "Înscrie-ți firma",
  },
  stats: [
    { value: "2.800+", label: "Firme de curățenie" },
    { value: "42", label: "Județe acoperite" },
    { value: "95%", label: "Clienți mulțumiți" },
    { value: "24h", label: "Confirmare rezervare" },
  ],
  about: {
    title: "Ce este GhidCurățenie?",
    paragraph1:
      "GhidCurățenie.ro este directorul dedicat serviciilor profesioniste de curățenie din România — de la curățenia generală a apartamentului până la spații mari de birouri și mentenanță periodică.",
    paragraph2:
      "Am creat platforma pentru ca fiecare client să găsească echipa potrivită nevoii sale — cu tarife clare, servicii bine descrise și recenzii reale, fără să sune zeci de firme.",
  },
  forClients: {
    eyebrow: "Pentru clienți",
    title: "Găsești echipa potrivită pentru orice spațiu",
    paragraph:
      "Casă, birou, scară de bloc sau curățenie post-renovare — filtrezi după tipul serviciului, buget și disponibilitate și primești ofertă în câteva ore.",
    benefits: [
      { title: "Tarife transparente", text: "Preț pe metru pătrat sau pe intervenție, afișat clar." },
      { title: "Echipe verificate", text: "Firme cu asigurare, angajați instruiți și materiale profesionale." },
      { title: "Rezervare rapidă", text: "Cereri de ofertă direct din profil, cu confirmare în 24h." },
      { title: "Recenzii reale", text: "Feedback de la clienți anteriori, moderat de echipa noastră." },
    ],
  },
  forPros: {
    eyebrow: "Pentru firme",
    title: "Clienții care caută curățenie te găsesc primii",
    paragraph:
      "Un profil complet pe GhidCurățenie îți aduce cereri constante de la clienți din zona ta — rezidențiali sau corporate. Fără comisioane, fără intermediari.",
    benefits: [
      { title: "Cereri calificate", text: "Clienți care știu ce vor și sunt gata să comande." },
      { title: "Profil profesional", text: "Servicii, tarife, zone acoperite, echipă, echipamente — vizibile clar." },
      { title: "Zone de acoperire", text: "Alegi orașele și cartierele în care lucrezi." },
      { title: "Comunitate de recenzii", text: "Clienți mulțumiți îți construiesc reputația online." },
    ],
    cta: "Înscrie-ți firma gratuit",
  },
  mission: {
    title: "Misiunea noastră",
    paragraph1:
      "Vrem ca fiecare client să găsească rapid o echipă de curățenie de încredere, iar fiecare firmă serioasă să fie ușor de contactat de clienții potriviți.",
    paragraph2:
      "De la marile firme cu contracte corporate, la echipele locale specializate pe apartamente, ne dorim ca piața de curățenie din România să fie transparentă și profesională.",
  },
  finalCta: {
    title: "Spațiul tău merită curat, corect",
    subtitle:
      "Fie că ai nevoie de o curățenie punctuală sau de un contract periodic, fie că ești firmă care caută clienți, GhidCurățenie este locul potrivit.",
    ctaExplore: "Caută firme",
    ctaRegister: "Înscrie-ți firma",
  },
};

export const verticalDespreContent: Partial<Record<VerticalKey, DespreGhidBeautyContent>> = {
  funerare: funerareDespreContent,
  veterinari: veterinariContent,
  tractari: tractariContent,
  gradinite: gradiniteContent,
  usi: usiContent,
  curatenie: curatenieContent,
};

export const verticalDespreImages: Partial<Record<VerticalKey, DespreImageSet>> = {
  funerare: { hero: heroFun, clienti: clientiFun, profesionisti: proFun, retea: reteaFun },
  veterinari: { hero: heroVet, clienti: clientiVet, profesionisti: proVet, retea: reteaVet },
  tractari: { hero: heroTra, clienti: clientiTra, profesionisti: proTra, retea: reteaTra },
  gradinite: { hero: heroGra, clienti: clientiGra, profesionisti: proGra, retea: reteaGra },
  usi: { hero: heroUsi, clienti: clientiUsi, profesionisti: proUsi, retea: reteaUsi },
  curatenie: { hero: heroCur, clienti: clientiCur, profesionisti: proCur, retea: reteaCur },
};
