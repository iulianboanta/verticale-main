import Navbar from "@/components/ghidbeauty/Navbar";
import Footer from "@/components/ghidbeauty/Footer";
import StepAuth from "@/components/ghidbeauty/add-company/StepAuth";
import { useNavigate } from "react-router-dom";

const Autentificare = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar variant="solid" />
      <main className="flex-1 pt-16">
        <StepAuth onNext={() => navigate("/dashboard")} />
      </main>
      <Footer />
    </div>
  );
};

export default Autentificare;
