import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import CompanyDetail from "./pages/CompanyDetail.tsx";
import SearchResults from "./pages/SearchResults.tsx";
import SearchMapView from "./pages/SearchMapView.tsx";
import Contact from "./pages/Contact.tsx";
import AddCompany from "./pages/AddCompany.tsx";
import ConfirmareFree from "./pages/ConfirmareFree.tsx";
import Checkout from "./pages/Checkout.tsx";
import ConfirmarePlata from "./pages/ConfirmarePlata.tsx";
import ArticlesLanding from "./pages/ArticlesLanding.tsx";
import ArticleDetail from "./pages/ArticleDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import FAQ from "./pages/FAQ.tsx";
import TermeniConditii from "./pages/TermeniConditii.tsx";
import Autentificare from "./pages/Autentificare.tsx";
import DespreCompanie from "./pages/DespreCompanie.tsx";
import DespreNoi from "./pages/DespreNoi.tsx";
import DashboardLayout from "./components/ghidbeauty/dashboard/DashboardLayout.tsx";
import DashboardOverview from "./pages/dashboard/DashboardOverview.tsx";
import DashboardListings from "./pages/dashboard/DashboardListings.tsx";
import DashboardReviews from "./pages/dashboard/DashboardReviews.tsx";
import DashboardMessages from "./pages/dashboard/DashboardMessages.tsx";
import DashboardStats from "./pages/dashboard/DashboardStats.tsx";
import DashboardOffers from "./pages/dashboard/DashboardOffers.tsx";
import DashboardPromotions from "./pages/dashboard/DashboardPromotions.tsx";
import DashboardProfile from "./pages/dashboard/DashboardProfile.tsx";
import DashboardSecurity from "./pages/dashboard/DashboardSecurity.tsx";
import DashboardSubscriptions from "./pages/dashboard/DashboardSubscriptions.tsx";
import DashboardNotifications from "./pages/dashboard/DashboardNotifications.tsx";
import DashboardFavorites from "./pages/dashboard/DashboardFavorites.tsx";
import DashboardSavedSearches from "./pages/dashboard/DashboardSavedSearches.tsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const queryClient = new QueryClient();

const DashboardRoute = ({ children }: { children: React.ReactNode }) => (
  <DashboardLayout>{children}</DashboardLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/companie/:slug" element={<CompanyDetail />} />
          <Route path="/cautare" element={<SearchResults />} />
          <Route path="/cautare/harta" element={<SearchMapView />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/adauga-companie" element={<AddCompany />} />
          <Route path="/adauga-companie/confirmare" element={<ConfirmareFree />} />
          <Route path="/adauga-companie/checkout" element={<Checkout />} />
          <Route path="/adauga-companie/confirmare-plata" element={<ConfirmarePlata />} />
          <Route path="/informatii" element={<ArticlesLanding />} />
          <Route path="/informatii/:slug" element={<ArticleDetail />} />
          <Route path="/politica-de-confidentialitate" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/termeni" element={<TermeniConditii />} />
          <Route path="/autentificare" element={<Autentificare />} />
          <Route path="/cine-suntem-noi" element={<DespreCompanie />} />
          <Route path="/despre-noi" element={<DespreNoi />} />

          {/* Dashboard routes */}
          <Route path="/dashboard" element={<DashboardRoute><DashboardOverview /></DashboardRoute>} />
          <Route path="/dashboard/listinguri" element={<DashboardRoute><DashboardListings /></DashboardRoute>} />
          <Route path="/dashboard/recenzii" element={<DashboardRoute><DashboardReviews /></DashboardRoute>} />
          <Route path="/dashboard/mesaje" element={<DashboardRoute><DashboardMessages /></DashboardRoute>} />
          <Route path="/dashboard/statistici" element={<DashboardRoute><DashboardStats /></DashboardRoute>} />
          <Route path="/dashboard/oferte" element={<DashboardRoute><DashboardOffers /></DashboardRoute>} />
          <Route path="/dashboard/promotii" element={<DashboardRoute><DashboardPromotions /></DashboardRoute>} />
          <Route path="/dashboard/profil" element={<DashboardRoute><DashboardProfile /></DashboardRoute>} />
          <Route path="/dashboard/securitate" element={<DashboardRoute><DashboardSecurity /></DashboardRoute>} />
          <Route path="/dashboard/abonamente" element={<DashboardRoute><DashboardSubscriptions /></DashboardRoute>} />
          <Route path="/dashboard/notificari" element={<DashboardRoute><DashboardNotifications /></DashboardRoute>} />
          <Route path="/dashboard/favorite" element={<DashboardRoute><DashboardFavorites /></DashboardRoute>} />
          <Route path="/dashboard/cautari-salvate" element={<DashboardRoute><DashboardSavedSearches /></DashboardRoute>} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
