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

          {/* Gallery — full width */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden aspect-[16/10] max-h-[400px]">
              <div className="col-span-2 row-span-2 relative">
                <img src={company.images[0]} alt={company.name} className="h-full w-full object-cover" />
              </div>
              <div className="relative">
                <img src={company.images[1]} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="relative">
                <img src={company.images[2]} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">+{company.images.length - 3} foto</span>
                </div>
              </div>
            </div>
            <button className="mt-2 text-sm text-primary hover:underline">
              Vezi toate fotografiile ({company.images.length})
            </button>
          </div>

          {/* Two-column: info+body left, sidebar right */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              <CompanyHeader company={company} />
              <CompanyBody company={company} />
            </div>
            <CompanySidebar company={company} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyDetail;
