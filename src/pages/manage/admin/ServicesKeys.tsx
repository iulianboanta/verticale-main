import { useState } from "react";
import { MapPin, ShieldCheck, BarChart3, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PasswordInput = ({
  id,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
        aria-label={show ? "Ascunde" : "Afișează"}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
};

const ServicesKeys = () => {
  const [mapsKey, setMapsKey] = useState("");

  const [recaptchaSite, setRecaptchaSite] = useState("");
  const [recaptchaSecret, setRecaptchaSecret] = useState("");
  const [recaptchaVersion, setRecaptchaVersion] = useState("v3");

  const [gaMeasurementId, setGaMeasurementId] = useState("");
  const [gaApiSecret, setGaApiSecret] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Servicii</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configurează cheile pentru integrări externe
        </p>
      </div>

      {/* Google Maps */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <MapPin size={18} />
            </div>
            <div>
              <CardTitle>Google Maps</CardTitle>
              <CardDescription>
                Folosit pentru afișarea hărților și autocomplete adrese.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="maps-key">Google Maps API Key</Label>
            <PasswordInput
              id="maps-key"
              value={mapsKey}
              onChange={setMapsKey}
              placeholder="AIzaSy..."
            />
          </div>
          <div className="flex justify-end">
            <Button type="button">Salvează cheia</Button>
          </div>
        </CardContent>
      </Card>

      {/* Google reCAPTCHA */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <ShieldCheck size={18} />
            </div>
            <div>
              <CardTitle>Google reCAPTCHA</CardTitle>
              <CardDescription>
                Protejează formularele publice împotriva spam-ului.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="recaptcha-site">Site Key</Label>
              <Input
                id="recaptcha-site"
                value={recaptchaSite}
                onChange={(e) => setRecaptchaSite(e.target.value)}
                placeholder="6Lc..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recaptcha-secret">Secret Key</Label>
              <PasswordInput
                id="recaptcha-secret"
                value={recaptchaSecret}
                onChange={setRecaptchaSecret}
                placeholder="6Lc..."
              />
            </div>
          </div>
          <div className="space-y-2 md:max-w-xs">
            <Label htmlFor="recaptcha-version">Versiune</Label>
            <Select value={recaptchaVersion} onValueChange={setRecaptchaVersion}>
              <SelectTrigger id="recaptcha-version">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="v2-checkbox">v2 Checkbox</SelectItem>
                <SelectItem value="v2-invisible">v2 Invisible</SelectItem>
                <SelectItem value="v3">v3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button type="button">Salvează cheile</Button>
          </div>
        </CardContent>
      </Card>

      {/* Google Analytics */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <BarChart3 size={18} />
            </div>
            <div>
              <CardTitle>Google Analytics</CardTitle>
              <CardDescription>
                Tracking trafic și evenimente pentru întreg site-ul.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ga-id">Measurement ID</Label>
              <Input
                id="ga-id"
                value={gaMeasurementId}
                onChange={(e) => setGaMeasurementId(e.target.value)}
                placeholder="G-XXXXXXXXXX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ga-secret">
                API Secret <span className="text-muted-foreground">(opțional)</span>
              </Label>
              <PasswordInput
                id="ga-secret"
                value={gaApiSecret}
                onChange={setGaApiSecret}
                placeholder="Pentru Measurement Protocol"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="button">Salvează configurarea</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesKeys;
