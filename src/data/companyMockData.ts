import listingSalon from "@/assets/listing-salon.jpg";
import listingSpa from "@/assets/listing-spa.jpg";
import listingNails from "@/assets/listing-nails.jpg";

export const companyData = {
  slug: "salon-lumiere",
  name: "Salon Lumiere",
  category: "Coafură",
  city: "Cluj-Napoca",
  county: "Cluj",
  plan: "profesional" as const,
  rating: 4.8,
  reviewCount: 142,
  views: 2840,
  memberSince: "2023-03-15",
  verified: true,
  phone: "+40 744 123 456",
  website: "https://salonlumiere.ro",
  facebook: "https://facebook.com/salonlumiere",
  instagram: "https://instagram.com/salonlumiere",
  address: "Str. Eroilor nr. 24, Cluj-Napoca, Cluj",
  description:
    "Salon Lumiere este un salon premium de coafură și înfrumusețare din inima Clujului. Cu o echipă de 8 profesioniști experimentați, oferim servicii complete de hairstyling, coloristică, tratamente capilare și makeup. Suntem dedicați excelenței și folosim exclusiv produse profesionale de top. Fiecare client beneficiază de o consultație personalizată pentru a obține look-ul perfect.",
  images: [listingSalon, listingSpa, listingNails, listingSalon, listingSpa, listingNails, listingSalon, listingSpa, listingNails, listingSalon],
  schedule: [
    { day: "Luni", hours: "09:00 – 20:00" },
    { day: "Marți", hours: "09:00 – 20:00" },
    { day: "Miercuri", hours: "09:00 – 20:00" },
    { day: "Joi", hours: "09:00 – 20:00" },
    { day: "Vineri", hours: "09:00 – 20:00" },
    { day: "Sâmbătă", hours: "10:00 – 18:00" },
    { day: "Duminică", hours: "Închis" },
  ],
  services: [
    "Tuns damă", "Tuns bărbați", "Vopsit", "Balayage", "Ombré",
    "Coafat ocazii", "Tratament keratină", "Extensii păr",
    "Makeup", "Manichiură", "Pedichiură", "Epilare",
  ],
  facilities: [
    { name: "Parcare", available: true },
    { name: "Plată card", available: true },
    { name: "WiFi", available: true },
    { name: "Rezervări online", available: true },
    { name: "Aer condiționat", available: true },
    { name: "Acces dizabilități", available: false },
  ],
  promotions: [
    { title: "20% reducere la prima vizită", description: "Valabil pentru servicii de coafură", code: "FIRST20" },
    { title: "Pachet Mireasă -15%", description: "Include coafură + makeup + proba", code: "BRIDE15" },
  ],
  locations: [
    { name: "Salon Lumiere – Centru", address: "Str. Eroilor nr. 24, Cluj-Napoca" },
    { name: "Salon Lumiere – Mărăști", address: "Str. Aurel Vlaicu nr. 10, Cluj-Napoca" },
  ],
  documents: [
    { name: "Lista completă de prețuri 2025.pdf", size: "1.2 MB" },
    { name: "Ofertă pachete nunți.pdf", size: "850 KB" },
  ],
  ratingDistribution: { 5: 98, 4: 28, 3: 10, 2: 4, 1: 2 },
  reviews: [
    {
      id: "rev1",
      author: "Maria P.",
      initials: "MP",
      rating: 5,
      date: "2025-05-28",
      text: "Servicii excelente! Am fost foarte mulțumită de rezultat. Echipa este foarte prietenoasă și profesionistă.",
      reply: { author: "Salon Lumiere", text: "Mulțumim frumos, Maria! Ne bucurăm că ai fost mulțumită. Te așteptăm cu drag!" },
    },
    {
      id: "rev2",
      author: "Andrei C.",
      initials: "AC",
      rating: 4,
      date: "2025-05-20",
      text: "Foarte bun salonul, atmosferă plăcută. Singura mică observație ar fi timpul de așteptare, dar rezultatul a meritat.",
      reply: null,
    },
    {
      id: "rev3",
      author: "Elena D.",
      initials: "ED",
      rating: 5,
      date: "2025-05-15",
      text: "Cel mai bun salon din Cluj! Vin aici de 2 ani și nu am fost niciodată dezamăgită. Recomand cu încredere!",
      reply: { author: "Salon Lumiere", text: "Mulțumim pentru fidelitate, Elena! 💜" },
    },
  ],
  legal: {
    companyName: "Salon Lumiere S.R.L.",
    cui: "RO12345678",
    regCom: "J12/1234/2023",
  },
  similarListings: [
    { id: "s1", name: "Beauty Bar Cluj", category: "Coafură", city: "Cluj-Napoca", county: "Cluj", rating: 4.6, reviewCount: 78, plan: "intro" as const, image: listingSalon },
    { id: "s2", name: "Studio Elegance", category: "Coafură", city: "Cluj-Napoca", county: "Cluj", rating: 4.5, reviewCount: 52, plan: "gratuit" as const, image: listingSpa },
    { id: "s3", name: "Hair & Style", category: "Coafură", city: "Cluj-Napoca", county: "Cluj", rating: 4.7, reviewCount: 91, plan: "profesional" as const, image: listingNails },
  ],
};
