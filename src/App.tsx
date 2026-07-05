import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { VerticalProvider } from "@/lib/vertical";
import VerticalSwitcher from "@/components/VerticalSwitcher";
import VetHeroVariantSwitcher from "@/components/dev/VetHeroVariantSwitcher";
import VetLogoVariantSwitcher from "@/components/dev/VetLogoVariantSwitcher";
import { VetHeroVariantProvider } from "@/lib/veterinariHeroVariant";
import { VetLogoVariantProvider } from "@/lib/veterinariLogoVariant";
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
import DashboardEditListing from "./pages/dashboard/DashboardEditListing.tsx";

// Admin (manage) panel
import AdminProtected from "./components/manage/AdminProtected";
import AdminLayout from "./components/manage/AdminLayout";
import ManageLogin from "./pages/manage/Login";
import ManageDashboard from "./pages/manage/Dashboard";
import { AllListings } from "./pages/manage/listings/ListingsPages";
import ManageEditListing from "./pages/manage/listings/EditListing";
import { AllOrders } from "./pages/manage/orders/OrdersPages";
import OrderDetail from "./pages/manage/orders/OrderDetail";
import { AllUsers, NewUser } from "./pages/manage/users/UsersPages";
import { PendingReviews, AllReviews } from "./pages/manage/reviews/ReviewsPages";
import { ArticlesList, EditArticle, ArticleCategoriesPage } from "./pages/manage/articles/ArticlesPages";
import { ListingCategories, ServicesFacilities, CountiesPage, BannersPage, SettingsPage } from "./pages/manage/admin/AdminPages";
import ServicesKeys from "./pages/manage/admin/ServicesKeys";
import StaticPages from "./pages/manage/admin/StaticPages";
import EmailsPages from "./pages/manage/content/EmailsPages";
import { PlatformStats, ListingsReport, RevenueReport } from "./pages/manage/reports/ReportsPages";

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
    <VerticalProvider>
      <VetHeroVariantProvider>
      <VetLogoVariantProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <VerticalSwitcher />
        <VetHeroVariantSwitcher />
        <VetLogoVariantSwitcher />
        <BrowserRouter>
          <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/companie/:slug" element={<CompanyDetail />} />
          <Route path="/cautare" element={<SearchResults mode="query" />} />
          <Route path="/cautare/harta" element={<SearchMapView />} />
          <Route path="/judet/:judet" element={<SearchResults mode="county" />} />
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
          <Route path="/dashboard/listinguri/:id/editeaza" element={<DashboardRoute><DashboardEditListing /></DashboardRoute>} />
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

          {/* Admin (manage) panel — must be before catch-all dynamic routes */}
          <Route path="/manage/login" element={<ManageLogin />} />
          <Route path="/manage" element={<AdminProtected><AdminLayout><ManageDashboard /></AdminLayout></AdminProtected>} />
          <Route path="/manage/listings" element={<AdminProtected><AdminLayout><AllListings /></AdminLayout></AdminProtected>} />
          <Route path="/manage/listings/new/edit" element={<AdminProtected><AdminLayout><ManageEditListing /></AdminLayout></AdminProtected>} />
          <Route path="/manage/listings/:id/edit" element={<AdminProtected><AdminLayout><ManageEditListing /></AdminLayout></AdminProtected>} />
          <Route path="/manage/orders" element={<AdminProtected><AdminLayout><AllOrders /></AdminLayout></AdminProtected>} />
          <Route path="/manage/orders/:id" element={<AdminProtected><AdminLayout><OrderDetail /></AdminLayout></AdminProtected>} />
          <Route path="/manage/users" element={<AdminProtected><AdminLayout><AllUsers /></AdminLayout></AdminProtected>} />
          <Route path="/manage/users/new" element={<AdminProtected><AdminLayout><NewUser /></AdminLayout></AdminProtected>} />
          <Route path="/manage/reviews" element={<AdminProtected><AdminLayout><AllReviews /></AdminLayout></AdminProtected>} />
          <Route path="/manage/reviews/pending" element={<AdminProtected><AdminLayout><PendingReviews /></AdminLayout></AdminProtected>} />
          <Route path="/manage/articles" element={<AdminProtected><AdminLayout><ArticlesList /></AdminLayout></AdminProtected>} />
          <Route path="/manage/articles/categories" element={<AdminProtected><AdminLayout><ArticleCategoriesPage /></AdminLayout></AdminProtected>} />
          <Route path="/manage/articles/:id/edit" element={<AdminProtected><AdminLayout><EditArticle /></AdminLayout></AdminProtected>} />
          <Route path="/manage/content/emails" element={<AdminProtected><AdminLayout><EmailsPages /></AdminLayout></AdminProtected>} />
          <Route path="/manage/admin/categories" element={<AdminProtected><AdminLayout><ListingCategories /></AdminLayout></AdminProtected>} />
          <Route path="/manage/admin/services" element={<AdminProtected><AdminLayout><ServicesFacilities /></AdminLayout></AdminProtected>} />
          <Route path="/manage/admin/counties" element={<AdminProtected><AdminLayout><CountiesPage /></AdminLayout></AdminProtected>} />
          <Route path="/manage/admin/banners" element={<AdminProtected><AdminLayout><BannersPage /></AdminLayout></AdminProtected>} />
          <Route path="/manage/admin/services-keys" element={<AdminProtected><AdminLayout><ServicesKeys /></AdminLayout></AdminProtected>} />
          <Route path="/manage/admin/static-pages" element={<AdminProtected><AdminLayout><StaticPages /></AdminLayout></AdminProtected>} />
          <Route path="/manage/admin/settings" element={<AdminProtected><AdminLayout><SettingsPage /></AdminLayout></AdminProtected>} />
          <Route path="/manage/reports/stats" element={<AdminProtected><AdminLayout><PlatformStats /></AdminLayout></AdminProtected>} />
          <Route path="/manage/reports/listings" element={<AdminProtected><AdminLayout><ListingsReport /></AdminLayout></AdminProtected>} />
          <Route path="/manage/reports/revenue" element={<AdminProtected><AdminLayout><RevenueReport /></AdminLayout></AdminProtected>} />

          {/* Static SEO routes for category & county indexing — keep LAST so they don't shadow explicit routes */}
          <Route path="/:cat" element={<SearchResults mode="category" />} />
          {/* /:cat/:sub resolves to either cat-sub or cat-county inside the page based on slug lookup */}
          <Route path="/:cat/:sub" element={<SearchResults mode="cat-sub" />} />
          <Route path="/:cat/:sub/:judet" element={<SearchResults mode="cat-sub-county" />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
      </VetHeroVariantProvider>
    </VerticalProvider>
  </QueryClientProvider>
);

export default App;
