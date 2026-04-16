import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/ghidbeauty/Navbar";
import Footer from "@/components/ghidbeauty/Footer";
import StepAuth from "@/components/ghidbeauty/add-company/StepAuth";
import StepPlans from "@/components/ghidbeauty/add-company/StepPlans";
import StepForm from "@/components/ghidbeauty/add-company/StepForm";
import SuccessState from "@/components/ghidbeauty/add-company/SuccessState";
import type { Plan } from "@/components/ghidbeauty/add-company/StepPlans";

const AddCompany = () => {
  const [searchParams] = useSearchParams();
  const initialStep = searchParams.get("step") === "plans" ? 2 : 1;
  const [step, setStep] = useState<1 | 2 | 3 | 4>(initialStep as 1 | 2 | 3 | 4);
  const [selectedPlan, setSelectedPlan] = useState<Plan>("gratuit");

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setStep(3);
    window.scrollTo(0, 0);
  };

  const goToStep = (s: 1 | 2 | 3 | 4) => {
    setStep(s);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar variant="solid" />
      <main className="flex-1 pt-16">
        {step === 1 && <StepAuth onNext={() => goToStep(2)} />}
        {step === 2 && <StepPlans onSelect={handlePlanSelect} />}
        {step === 3 && (
          <StepForm
            plan={selectedPlan}
            onBack={() => goToStep(2)}
            onSuccess={() => goToStep(4)}
          />
        )}
        {step === 4 && <SuccessState />}
      </main>
      <Footer />
    </div>
  );
};

export default AddCompany;
