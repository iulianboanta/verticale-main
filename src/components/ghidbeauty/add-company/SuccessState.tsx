import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SuccessState = () => (
  <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
    <div className="text-center max-w-md">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center animate-in zoom-in-50 duration-500">
        <CheckCircle className="w-10 h-10 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Listing trimis spre aprobare!</h1>
      <p className="text-muted-foreground mb-8">
        Vei primi un email de confirmare în maxim 24 de ore.
      </p>
      <Button asChild>
        <Link to="/">Înapoi la homepage</Link>
      </Button>
    </div>
  </div>
);

export default SuccessState;
