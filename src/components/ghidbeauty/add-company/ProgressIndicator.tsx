import { Check } from "lucide-react";

const steps = [
  { number: 1, label: "Autentificare" },
  { number: 2, label: "Alege planul" },
  { number: 3, label: "Completează formularul" },
];

const ProgressIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex items-center justify-center gap-0 mb-10">
    {steps.map((step, i) => {
      const done = step.number < currentStep;
      const active = step.number === currentStep;
      return (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                done
                  ? "bg-primary text-primary-foreground"
                  : active
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {done ? <Check className="w-4 h-4" /> : step.number}
            </div>
            <span
              className={`text-xs whitespace-nowrap ${active ? "font-semibold text-foreground" : "text-muted-foreground"}`}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 ${
                step.number < currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </div>
      );
    })}
  </div>
);

export default ProgressIndicator;
