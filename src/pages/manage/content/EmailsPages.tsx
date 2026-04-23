import { useState } from "react";
import { Eye, EyeOff, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import RichTextEditor from "@/components/manage/RichTextEditor";

type EmailTemplate = {
  key: string;
  title: string;
  description: string;
  subject: string;
  body: string;
  active: boolean;
};

const publicTemplatesSeed: EmailTemplate[] = [
  {
    key: "welcome",
    title: "Bun venit",
    description: "Trimis după înregistrarea contului",
    subject: "Bine ai venit pe GhidBeauty, {nume}!",
    body: `<p>Salut <strong>{nume}</strong>,</p><p>Ne bucurăm că faci parte din comunitatea <strong>GhidBeauty</strong> — locul în care saloanele de top și clienții pasionați de beauty se întâlnesc.</p><p>De aici poți:</p><ul><li>Descoperi cele mai bune saloane din zona ta</li><li>Salva favoritele și lăsa recenzii</li><li>Adăuga propria afacere și atrage clienți noi</li></ul><p>Cu drag,<br/>Echipa GhidBeauty ✨</p>`,
    active: true,
  },
  {
    key: "verify",
    title: "Confirmare cont",
    description: "Verificare adresă de email",
    subject: "Confirmă adresa ta de email",
    body: `<p>Salut <strong>{nume}</strong>,</p><p>Mai e un singur pas: confirmă-ți adresa de email apăsând butonul de mai jos.</p><p><a href="{link_confirmare}">Confirmă emailul meu</a></p><p>Linkul expiră în 24 de ore. Dacă nu ai creat tu acest cont, ignoră acest mesaj.</p><p>Echipa GhidBeauty</p>`,
    active: true,
  },
  {
    key: "reset",
    title: "Resetare parolă",
    description: "Cerere de schimbare parolă",
    subject: "Resetează-ți parola GhidBeauty",
    body: `<p>Salut <strong>{nume}</strong>,</p><p>Am primit o cerere de resetare a parolei pentru contul tău. Apasă linkul de mai jos pentru a seta o parolă nouă:</p><p><a href="{link_reset}">Resetează parola</a></p><p>Linkul este valabil 1 oră. Dacă nu ai cerut tu resetarea, poți ignora în siguranță acest mesaj.</p><p>Echipa GhidBeauty</p>`,
    active: true,
  },
  {
    key: "listing-published",
    title: "Listing publicat",
    description: "Confirmare că anunțul este live",
    subject: `🎉 Listingul „{listing}" este acum live!`,
    body: `<p>Felicitări <strong>{nume}</strong>,</p><p>Listingul tău <strong>{listing}</strong> a fost publicat cu succes și este vizibil pentru clienți.</p><p><a href="{link_listing}">Vezi listingul tău</a></p><p>Sfat: completează toate detaliile, adaugă poze de calitate și răspunde rapid la mesaje pentru a obține mai multe rezervări.</p><p>Mult succes!<br/>Echipa GhidBeauty</p>`,
    active: true,
  },
  {
    key: "listing-approved",
    title: "Listing aprobat",
    description: "Moderare cu succes",
    subject: `✅ Listingul „{listing}" a fost aprobat`,
    body: `<p>Salut <strong>{nume}</strong>,</p><p>Vești bune — listingul tău <strong>{listing}</strong> a trecut de moderare și este acum vizibil pe GhidBeauty.</p><p><a href="{link_listing}">Deschide listingul</a></p><p>Mulțumim că păstrezi standardele înalte ale platformei!</p><p>Echipa GhidBeauty</p>`,
    active: true,
  },
  {
    key: "listing-rejected",
    title: "Listing respins",
    description: "Moderare cu motiv",
    subject: `Listingul „{listing}" necesită modificări`,
    body: `<p>Salut <strong>{nume}</strong>,</p><p>Din păcate, listingul tău <strong>{listing}</strong> nu a putut fi aprobat în această formă.</p><p><strong>Motiv:</strong> {motiv}</p><p>Te rugăm să faci modificările necesare și să-l trimiți din nou spre aprobare. Suntem aici dacă ai nevoie de ajutor.</p><p>Echipa GhidBeauty</p>`,
    active: true,
  },
  {
    key: "new-review",
    title: "Recenzie nouă primită",
    description: "Către proprietarul listingului",
    subject: `⭐ Ai primit o recenzie nouă pentru „{listing}"`,
    body: `<p>Salut <strong>{nume}</strong>,</p><p><strong>{autor_recenzie}</strong> tocmai a lăsat o recenzie de <strong>{rating} stele</strong> pentru listingul tău <strong>{listing}</strong>.</p><blockquote>{text_recenzie}</blockquote><p><a href="{link_recenzie}">Răspunde la recenzie</a></p><p>Recenziile bune cresc încrederea — un mulțumesc personalizat face minuni!</p><p>Echipa GhidBeauty</p>`,
    active: true,
  },
  {
    key: "contact-reply",
    title: "Confirmare mesaj contact",
    description: "Către expeditorul formularului",
    subject: "Am primit mesajul tău",
    body: `<p>Salut <strong>{nume}</strong>,</p><p>Mulțumim că ne-ai scris! Am primit mesajul tău și îți vom răspunde în maxim <strong>24 de ore</strong> lucrătoare.</p><p><strong>Subiect:</strong> {subiect}</p><p>Echipa GhidBeauty</p>`,
    active: true,
  },
  {
    key: "order-confirmation",
    title: "Confirmare comandă & proformă",
    description: "După plasarea comenzii",
    subject: "Comanda #{numar_comanda} — Proformă atașată",
    body: `<p>Salut <strong>{nume}</strong>,</p><p>Am înregistrat comanda ta <strong>#{numar_comanda}</strong> pentru abonamentul <strong>{plan}</strong>.</p><p><strong>Total:</strong> {suma} lei</p><p>În atașament găsești factura proformă. Pentru plată prin transfer bancar, folosește datele din proformă; pentru plată cu cardul, urmează linkul:</p><p><a href="{link_plata}">Achită online</a></p><p>Echipa GhidBeauty</p>`,
    active: true,
  },
  {
    key: "payment-confirmed",
    title: "Confirmare plată achitată",
    description: "Abonament activat",
    subject: "✅ Plata pentru comanda #{numar_comanda} a fost confirmată",
    body: `<p>Salut <strong>{nume}</strong>,</p><p>Plata ta a fost confirmată cu succes! Abonamentul <strong>{plan}</strong> este acum activ până la <strong>{data_expirare}</strong>.</p><p>Factura fiscală este atașată acestui email.</p><p><a href="{link_dashboard}">Mergi la Dashboard</a></p><p>Mulțumim pentru încredere!<br/>Echipa GhidBeauty</p>`,
    active: true,
  },
  {
    key: "subscription-expiring",
    title: "Abonament expiră în curând",
    description: "Notificare cu 30 / 7 zile înainte",
    subject: "⏰ Abonamentul tău expiră în {zile_ramase} zile",
    body: `<p>Salut <strong>{nume}</strong>,</p><p>Abonamentul tău <strong>{plan}</strong> pentru listingul <strong>{listing}</strong> expiră pe <strong>{data_expirare}</strong> ({zile_ramase} zile rămase).</p><p>Pentru a evita întreruperea vizibilității, reînnoiește acum:</p><p><a href="{link_reinnoire}">Reînnoiește abonamentul</a></p><p>Echipa GhidBeauty</p>`,
    active: true,
  },
  {
    key: "subscription-expired",
    title: "Abonament expirat",
    description: "Cu CTA reînnoire",
    subject: "Abonamentul tău a expirat — reactivează listingul",
    body: `<p>Salut <strong>{nume}</strong>,</p><p>Abonamentul <strong>{plan}</strong> pentru <strong>{listing}</strong> a expirat. Listingul tău a fost retrogradat la planul Gratuit și nu mai beneficiază de promovare.</p><p><a href="{link_reinnoire}">Reactivează abonamentul</a></p><p>Te așteptăm înapoi!<br/>Echipa GhidBeauty</p>`,
    active: true,
  },
];

const adminTemplatesSeed: EmailTemplate[] = [
  {
    key: "admin-new-listing",
    title: "Listing nou trimis spre aprobare",
    description: "Către admin / moderatori",
    subject: "[Mod] Listing nou: {listing}",
    body: `<p>Listing nou trimis spre aprobare.</p><p><strong>Nume:</strong> {listing}<br/><strong>Categorie:</strong> {categorie}<br/><strong>Județ:</strong> {judet}<br/><strong>Proprietar:</strong> {nume} ({email})<br/><strong>Trimis la:</strong> {data}</p><p><a href="{link_moderare}">Deschide în panou</a></p>`,
    active: true,
  },
  {
    key: "admin-new-review",
    title: "Recenzie nouă în așteptare",
    description: "Necesită moderare",
    subject: "[Mod] Recenzie nouă pentru {listing} — {rating}★",
    body: `<p>Recenzie nouă în coadă de moderare.</p><p><strong>Listing:</strong> {listing}<br/><strong>Autor:</strong> {autor_recenzie} ({email})<br/><strong>Rating:</strong> {rating}/5</p><blockquote>{text_recenzie}</blockquote><p><a href="{link_moderare}">Moderează</a></p>`,
    active: true,
  },
  {
    key: "admin-contact",
    title: "Mesaj nou prin formular contact",
    description: "Notificare admin",
    subject: "[Contact] {subiect}",
    body: `<p>Mesaj nou primit prin formular.</p><p><strong>De la:</strong> {nume} &lt;{email}&gt;<br/><strong>Telefon:</strong> {telefon}<br/><strong>Subiect:</strong> {subiect}</p><p><strong>Mesaj:</strong></p><blockquote>{mesaj}</blockquote>`,
    active: true,
  },
  {
    key: "admin-new-order",
    title: "Comandă nouă plasată",
    description: "Necesită validare plată (transfer)",
    subject: "[Comandă] #{numar_comanda} — {plan} — {suma} lei",
    body: `<p>Comandă nouă plasată.</p><p><strong>Număr:</strong> {numar_comanda}<br/><strong>Plan:</strong> {plan}<br/><strong>Sumă:</strong> {suma} lei<br/><strong>Metodă plată:</strong> {metoda_plata}<br/><strong>Client:</strong> {nume} ({email})<br/><strong>Listing:</strong> {listing}</p><p><a href="{link_comanda}">Vezi comanda</a></p>`,
    active: true,
  },
  {
    key: "admin-payment-confirmed",
    title: "Plată confirmată",
    description: "Comandă achitată",
    subject: "[Plată OK] #{numar_comanda} — {suma} lei",
    body: `<p>Plata pentru comanda <strong>#{numar_comanda}</strong> a fost confirmată ({metoda_plata}).</p><p>Sumă: {suma} lei<br/>Client: {nume}<br/>Plan activat: {plan} — expiră la {data_expirare}</p>`,
    active: true,
  },
  {
    key: "admin-report",
    title: "Raport / sesizare nouă",
    description: "Listing raportat de utilizator",
    subject: "[Raport] {listing} — {motiv}",
    body: `<p>Sesizare nouă primită.</p><p><strong>Listing raportat:</strong> {listing}<br/><strong>Motiv:</strong> {motiv}<br/><strong>Raportat de:</strong> {nume} ({email})<br/><strong>Detalii:</strong> {detalii}</p><p><a href="{link_raport}">Verifică raportul</a></p>`,
    active: true,
  },
  {
    key: "admin-new-user",
    title: "Utilizator nou înregistrat",
    description: "Notificare admin",
    subject: "[User] Cont nou: {nume}",
    body: `<p>Cont nou înregistrat pe platformă.</p><p><strong>Nume:</strong> {nume}<br/><strong>Email:</strong> {email}<br/><strong>Tip cont:</strong> {tip_cont}<br/><strong>Data:</strong> {data}</p>`,
    active: true,
  },
  {
    key: "admin-error",
    title: "Eroare integrare",
    description: "Alertă tehnică",
    subject: "[Alert] Eroare integrare: {serviciu}",
    body: `<p>S-a detectat o eroare la o integrare externă.</p><p><strong>Serviciu:</strong> {serviciu}<br/><strong>Cod eroare:</strong> {cod}<br/><strong>Mesaj:</strong> {mesaj}<br/><strong>Timestamp:</strong> {data}</p><p>Verificați logurile pentru detalii suplimentare.</p>`,
    active: true,
  },
];

const TemplateCard = ({
  tpl,
  onChange,
}: {
  tpl: EmailTemplate;
  onChange: (next: EmailTemplate) => void;
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-base">{tpl.title}</CardTitle>
            <CardDescription>{tpl.description}</CardDescription>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Label htmlFor={`active-${tpl.key}`} className="text-sm text-muted-foreground cursor-pointer">
              {tpl.active ? "Activ" : "Inactiv"}
            </Label>
            <Switch
              id={`active-${tpl.key}`}
              checked={tpl.active}
              onCheckedChange={(v) => onChange({ ...tpl, active: v })}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className={`space-y-4 ${tpl.active ? "" : "opacity-60"}`}>
        <div className="space-y-2">
          <Label htmlFor={`subject-${tpl.key}`}>Subiect</Label>
          <Input
            id={`subject-${tpl.key}`}
            value={tpl.subject}
            onChange={(e) => onChange({ ...tpl, subject: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Conținut email</Label>
          <RichTextEditor
            value={tpl.body}
            onChange={(html) => onChange({ ...tpl, body: html })}
            placeholder="Scrie conținutul emailului..."
          />
        </div>
        <div className="flex justify-end">
          <Button type="button">Salvează șablonul</Button>
        </div>
      </CardContent>
    </Card>
  );
};

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
        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        tabIndex={-1}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
};

const EmailsPages = () => {
  const [publicTemplates, setPublicTemplates] = useState<EmailTemplate[]>(publicTemplatesSeed);
  const [adminTemplates, setAdminTemplates] = useState<EmailTemplate[]>(adminTemplatesSeed);

  // Settings state
  const [senderName, setSenderName] = useState("GhidBeauty");
  const [senderEmail, setSenderEmail] = useState("noreply@ghidbeauty.ro");
  const [replyTo, setReplyTo] = useState("contact@ghidbeauty.ro");
  const [adminEmail, setAdminEmail] = useState("admin@ghidbeauty.ro");
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpSecurity, setSmtpSecurity] = useState("tls");
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPass, setSmtpPass] = useState("");
  const [footer, setFooter] = useState(
    "GhidBeauty SRL · Str. Exemplu nr. 1, București · contact@ghidbeauty.ro\nPrimești acest email pentru că ai un cont pe ghidbeauty.ro."
  );
  const [testEmail, setTestEmail] = useState("");

  const updatePublic = (idx: number, next: EmailTemplate) =>
    setPublicTemplates((arr) => arr.map((t, i) => (i === idx ? next : t)));
  const updateAdmin = (idx: number, next: EmailTemplate) =>
    setAdminTemplates((arr) => arr.map((t, i) => (i === idx ? next : t)));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Emails</h1>
        <p className="text-muted-foreground">
          Gestionează șabloanele de email și setările de trimitere
        </p>
      </div>

      <Tabs defaultValue="public" className="space-y-6">
        <TabsList>
          <TabsTrigger value="public">Public</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="public" className="space-y-4">
          {publicTemplates.map((tpl, i) => (
            <TemplateCard key={tpl.key} tpl={tpl} onChange={(next) => updatePublic(i, next)} />
          ))}
        </TabsContent>

        <TabsContent value="admin" className="space-y-4">
          {adminTemplates.map((tpl, i) => (
            <TemplateCard key={tpl.key} tpl={tpl} onChange={(next) => updateAdmin(i, next)} />
          ))}
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurare trimitere emailuri</CardTitle>
              <CardDescription>
                Setări SMTP și identitatea expeditorului. Aceste valori se folosesc pentru toate emailurile platformei.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Identity */}
              <section className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Identitate expeditor
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sender-name">Nume expeditor</Label>
                    <Input id="sender-name" value={senderName} onChange={(e) => setSenderName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender-email">Email expeditor</Label>
                    <Input
                      id="sender-email"
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reply-to">Email Reply-To</Label>
                    <Input
                      id="reply-to"
                      type="email"
                      value={replyTo}
                      onChange={(e) => setReplyTo(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email administrator</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="Destinatarul notificărilor admin"
                    />
                  </div>
                </div>
              </section>

              <Separator />

              {/* SMTP */}
              <section className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Server SMTP
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="smtp-host">Host SMTP</Label>
                    <Input
                      id="smtp-host"
                      value={smtpHost}
                      onChange={(e) => setSmtpHost(e.target.value)}
                      placeholder="smtp.exemplu.ro"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">Port</Label>
                    <Input
                      id="smtp-port"
                      type="number"
                      value={smtpPort}
                      onChange={(e) => setSmtpPort(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-security">Securitate</Label>
                    <Select value={smtpSecurity} onValueChange={setSmtpSecurity}>
                      <SelectTrigger id="smtp-security">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Niciuna</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                        <SelectItem value="tls">TLS</SelectItem>
                        <SelectItem value="starttls">STARTTLS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-user">Utilizator SMTP</Label>
                    <Input id="smtp-user" value={smtpUser} onChange={(e) => setSmtpUser(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-pass">Parolă SMTP</Label>
                    <PasswordInput id="smtp-pass" value={smtpPass} onChange={setSmtpPass} />
                  </div>
                </div>
              </section>

              <Separator />

              {/* Footer & test */}
              <section className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Footer & test
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="footer">Footer global email</Label>
                  <Textarea
                    id="footer"
                    value={footer}
                    onChange={(e) => setFooter(e.target.value)}
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Afișat la finalul fiecărui email trimis de platformă.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="test-email">Trimite email de test către</Label>
                    <Input
                      id="test-email"
                      type="email"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      placeholder="email@exemplu.ro"
                    />
                  </div>
                  <Button type="button" variant="outline" className="gap-2">
                    <Send size={16} />
                    Trimite test
                  </Button>
                </div>
              </section>

              <div className="flex justify-end pt-2">
                <Button type="button">Salvează setările</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailsPages;
