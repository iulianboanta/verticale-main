import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRobotsMeta } from "@/hooks/use-robots-meta";

const sectionLabels: Record<string, string> = {
  listinguri: "Listingurile mele",
  recenzii: "Recenzii",
  mesaje: "Mesaje",
  statistici: "Statistici",
  oferte: "Oferte",
  promotii: "Promoții",
  profil: "Profilul meu",
  securitate: "Securitate",
  abonamente: "Abonamente",
  notificari: "Notificări",
  favorite: "Favorite",
  "cautari-salvate": "Căutări salvate",
};

const DashboardBreadcrumb = () => {
  const { pathname } = useLocation();
  // SEO: never index dashboard
  useRobotsMeta("noindex, nofollow");

  // /dashboard or /dashboard/[section] or /dashboard/[section]/[...]
  const parts = pathname.split("/").filter(Boolean);
  // parts[0] === "dashboard"
  const section = parts[1];
  const sectionLabel = section ? sectionLabels[section] ?? section : null;

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Acasă</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {sectionLabel ? (
            <BreadcrumbLink asChild>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {sectionLabel && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{sectionLabel}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DashboardBreadcrumb;
