import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/adminAuth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@ghidbeauty.ro");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Completează emailul și parola");
      return;
    }
    login(email, password);
    navigate("/manage");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-[400px] p-6">
        <Link to="/" className="block text-center mb-2">
          <span className="text-xl font-semibold">GhidBeauty.ro</span>
        </Link>
        <p className="text-center text-sm text-muted-foreground mb-6">Panou Administrare</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password">Parolă</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <Button type="submit" className="w-full">Intră în panou</Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
