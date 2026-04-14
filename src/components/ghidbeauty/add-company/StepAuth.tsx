import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const StepAuth = ({ onNext }: { onNext: () => void }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [regFirst, setRegFirst] = useState("");
  const [regLast, setRegLast] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[440px] bg-card border border-border/50 rounded-2xl p-8 sm:p-10 shadow-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-xl">🦋</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">GhidBeauty.ro</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Înscrie-ți afacerea în cel mai mare director beauty din România
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-6">
          {/* Login */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Intră în cont</h2>
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Email</Label>
                <Input
                  type="email"
                  placeholder="email@exemplu.ro"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Parolă</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button className="w-full" onClick={onNext}>
                Intră în cont
              </Button>
              <button className="text-xs text-primary hover:underline w-full text-center">
                Ai uitat parola?
              </button>
            </div>
          </div>

          {/* Separator */}
          <div className="hidden sm:flex flex-col items-center">
            <Separator orientation="vertical" className="flex-1" />
            <span className="text-xs text-muted-foreground py-2">sau</span>
            <Separator orientation="vertical" className="flex-1" />
          </div>
          <div className="sm:hidden flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">sau</span>
            <Separator className="flex-1" />
          </div>

          {/* Register */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Creează cont</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Prenume</Label>
                  <Input
                    placeholder="Ion"
                    value={regFirst}
                    onChange={(e) => setRegFirst(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Nume</Label>
                  <Input
                    placeholder="Popescu"
                    value={regLast}
                    onChange={(e) => setRegLast(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs">Email</Label>
                <Input
                  type="email"
                  placeholder="email@exemplu.ro"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Parolă</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={regPass}
                  onChange={(e) => setRegPass(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Confirmă parola</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={regConfirm}
                  onChange={(e) => setRegConfirm(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button variant="outline" className="w-full bg-foreground text-background hover:bg-foreground/90" onClick={onNext}>
                Creează cont gratuit
              </Button>
            </div>
          </div>
        </div>

        {/* Terms */}
        <p className="text-[11px] text-muted-foreground text-center mt-6 leading-relaxed">
          Continuând, ești de acord cu{" "}
          <a href="#" className="text-primary hover:underline">Termenii și condițiile</a>{" "}
          și{" "}
          <a href="#" className="text-primary hover:underline">Politica de confidențialitate</a>.
        </p>
      </div>
    </div>
  );
};

export default StepAuth;
