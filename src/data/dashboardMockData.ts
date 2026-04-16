export const mockUser = {
  firstName: "Maria",
  lastName: "Popescu",
  email: "maria.popescu@email.com",
  phone: "0722 123 456",
  plan: "Profesional" as const,
  avatarInitials: "MP",
  unreadNotifications: 3,
};

export const mockStats = {
  viewsThisMonth: 2847,
  leadsThisMonth: 142,
  activeListings: 3,
  newReviews: 8,
};

export const mockListings = [
  {
    id: "1",
    name: "Beauty Salon Elegance",
    category: "Salon de infrumusetare",
    city: "Bucuresti",
    plan: "Profesional" as const,
    status: "activ" as const,
    expiryDate: "2026-08-15",
    viewsThisMonth: 1420,
    thumbnail: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Nail Art Studio",
    category: "Manichiura & Pedichiura",
    city: "Cluj-Napoca",
    plan: "Intro" as const,
    status: "activ" as const,
    expiryDate: "2026-06-01",
    viewsThisMonth: 890,
    thumbnail: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Spa & Wellness Center",
    category: "Spa",
    city: "Timisoara",
    plan: "Gratuit" as const,
    status: "in_asteptare" as const,
    expiryDate: "2026-12-01",
    viewsThisMonth: 537,
    thumbnail: "/placeholder.svg",
  },
];

export const mockReviews = [
  {
    id: "1",
    listingName: "Beauty Salon Elegance",
    reviewerName: "Ana Ionescu",
    reviewerInitials: "AI",
    stars: 5,
    date: "2026-04-12",
    text: "Servicii excelente! Personal foarte profesionist si amabil. Recomand cu incredere!",
    replied: false,
  },
  {
    id: "2",
    listingName: "Nail Art Studio",
    reviewerName: "Elena Mihai",
    reviewerInitials: "EM",
    stars: 4,
    date: "2026-04-10",
    text: "Foarte multumita de manichiura. Singurul minus e timpul de asteptare.",
    replied: true,
    replyText: "Multumim pentru feedback! Lucram la optimizarea programarilor.",
  },
  {
    id: "3",
    listingName: "Beauty Salon Elegance",
    reviewerName: "Ioana Popa",
    reviewerInitials: "IP",
    stars: 5,
    date: "2026-04-08",
    text: "Cel mai bun salon din zona! Coafura a rezistat perfect toata ziua.",
    replied: false,
  },
];

export const mockMessages = [
  {
    id: "1",
    listingName: "Beauty Salon Elegance",
    senderName: "Diana Radu",
    senderEmail: "diana.radu@email.com",
    preview: "Buna ziua, as dori sa fac o programare pentru vineri...",
    fullMessage: "Buna ziua, as dori sa fac o programare pentru vineri la ora 14:00 pentru o sedinta de coafura si machiaj. Este posibil? Multumesc!",
    date: "2026-04-14",
    read: false,
  },
  {
    id: "2",
    listingName: "Nail Art Studio",
    senderName: "Andreea Stan",
    senderEmail: "andreea.stan@email.com",
    preview: "Oferiti si servicii de gel pe unghii naturale?",
    fullMessage: "Buna! Oferiti si servicii de gel pe unghii naturale? Cat costa si cat dureaza o sedinta? Multumesc anticipat.",
    date: "2026-04-13",
    read: false,
  },
  {
    id: "3",
    listingName: "Beauty Salon Elegance",
    senderName: "Cristina Vasile",
    senderEmail: "cristina.v@email.com",
    preview: "Multumesc pentru serviciile de ieri, totul a fost...",
    fullMessage: "Multumesc pentru serviciile de ieri, totul a fost perfect! Voi reveni cu siguranta.",
    date: "2026-04-11",
    read: true,
  },
];

export const mockChartData = [
  { date: "1 Apr", views: 85, phone: 4, whatsapp: 2, forms: 1, website: 3 },
  { date: "2 Apr", views: 92, phone: 5, whatsapp: 3, forms: 2, website: 4 },
  { date: "3 Apr", views: 78, phone: 3, whatsapp: 1, forms: 1, website: 2 },
  { date: "4 Apr", views: 110, phone: 6, whatsapp: 4, forms: 3, website: 5 },
  { date: "5 Apr", views: 125, phone: 7, whatsapp: 3, forms: 2, website: 6 },
  { date: "6 Apr", views: 145, phone: 8, whatsapp: 5, forms: 4, website: 7 },
  { date: "7 Apr", views: 98, phone: 4, whatsapp: 2, forms: 1, website: 3 },
  { date: "8 Apr", views: 102, phone: 5, whatsapp: 3, forms: 2, website: 4 },
  { date: "9 Apr", views: 88, phone: 3, whatsapp: 2, forms: 1, website: 3 },
  { date: "10 Apr", views: 130, phone: 6, whatsapp: 4, forms: 3, website: 5 },
  { date: "11 Apr", views: 115, phone: 5, whatsapp: 3, forms: 2, website: 4 },
  { date: "12 Apr", views: 140, phone: 7, whatsapp: 4, forms: 3, website: 6 },
  { date: "13 Apr", views: 108, phone: 4, whatsapp: 2, forms: 2, website: 3 },
  { date: "14 Apr", views: 95, phone: 5, whatsapp: 3, forms: 1, website: 4 },
];

export const mockOffers = [
  {
    id: "1",
    title: "20% reducere la prima vizita",
    description: "Valabil pentru toate serviciile de coafura si machiaj",
    code: "WELCOME20",
    validFrom: "2026-04-01",
    validUntil: "2026-05-31",
    status: "activa" as const,
    active: true,
  },
  {
    id: "2",
    title: "Pachet nunta - 15% discount",
    description: "Include coafura, machiaj si proba gratuita",
    code: "NUNTA15",
    validFrom: "2026-06-01",
    validUntil: "2026-09-30",
    status: "programata" as const,
    active: true,
  },
];

export const mockInvoices = [
  { id: "GB-2026-001", date: "2026-01-15", plan: "Profesional", amount: 199, vat: 37.81, total: 236.81, status: "platit" as const },
  { id: "GB-2026-002", date: "2026-02-15", plan: "Profesional", amount: 199, vat: 37.81, total: 236.81, status: "platit" as const },
  { id: "GB-2026-003", date: "2026-03-15", plan: "Profesional", amount: 199, vat: 37.81, total: 236.81, status: "platit" as const },
  { id: "GB-2026-004", date: "2026-04-15", plan: "Profesional", amount: 199, vat: 37.81, total: 236.81, status: "in_asteptare" as const },
];

export const mockFavorites = [
  {
    id: "1",
    name: "Glamour Beauty Studio",
    category: "Salon de infrumusetare",
    city: "Bucuresti",
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Natural Nails & Spa",
    category: "Manichiura & Pedichiura",
    city: "Iasi",
    rating: 4.6,
    reviewCount: 87,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
  },
];

export const mockSavedSearches = [
  { id: "1", query: "Salon coafura", location: "Bucuresti, Sector 1", filters: "Rating 4+, Deschis acum", date: "2026-04-10" },
  { id: "2", query: "Manichiura gel", location: "Cluj-Napoca", filters: "Pret mic-mare", date: "2026-04-05" },
];

export const mockNotificationSettings = [
  { id: "recenzie_noua", label: "Recenzie noua primita", email: true, inApp: true },
  { id: "mesaj_nou", label: "Mesaj nou primit", email: true, inApp: true },
  { id: "plan_30_zile", label: "Plan expira in 30 zile", email: true, inApp: false },
  { id: "plan_7_zile", label: "Plan expira in 7 zile", email: true, inApp: true },
  { id: "plan_expirat", label: "Plan expirat", email: true, inApp: true },
  { id: "listing_aprobat", label: "Listing aprobat", email: true, inApp: true },
  { id: "listing_respins", label: "Listing respins", email: true, inApp: true },
  { id: "oferta_expirata", label: "Oferta expirata", email: false, inApp: true },
];
