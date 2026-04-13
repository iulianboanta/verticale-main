import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/ghidbeauty/Navbar";
import Footer from "@/components/ghidbeauty/Footer";
import CompanyStickyBar from "@/components/ghidbeauty/company/CompanyStickyBar";
import CompanyBreadcrumb from "@/components/ghidbeauty/company/CompanyBreadcrumb";
import CompanyHeader from "@/components/ghidbeauty/company/CompanyHeader";
import CompanyBody from "@/components/ghidbeauty/company/CompanyBody";
import CompanySidebar from "@/components/ghidbeauty/company/CompanySidebar";
import { companyData } from "@/data/companyMockData";

const CompanyDetail = () => {
  const { slug } = useParams();
  const company = companyData; // mock — would fetch by slug

  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const onScroll = () => setShowStickyBar(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar variant="solid" />
      <CompanyStickyBar company={company} visible={showStickyBar} />

      <main className="flex-1 pt-16">
        <div className="container py-6">
          <CompanyBreadcrumb category={company.category} city={company.city} name={company.name} />
          <CompanyHeader company={company} />

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
            <CompanyBody company={company} />
            <CompanySidebar company={company} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyDetail;
