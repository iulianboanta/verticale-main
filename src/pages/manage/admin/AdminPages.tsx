import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight, ChevronDown, Pencil, Trash2, Plus, X, Info } from "lucide-react";
import StatusPill from "@/components/manage/StatusPill";
import { listingCategoriesTree, services, facilities, counties, manageBanners, platformSettings, CategoryNode } from "@/data/manageMockData";

export const ListingCategories = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ "cat-1": true });
  const [selected, setSelected] = useState<CategoryNode | null>(listingCategoriesTree[0]);
  const [tags, setTags] = useState<string[]>(["saloane", "frumusete"]);
  const [tagInput, setTagInput] = useState("");

  const renderNode = (n: CategoryNode, depth = 0) => {
    const hasChildren = !!n.children?.length;
    const isOpen = expanded[n.id];
    return (
      <li key={n.id}>
        <div className={`flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted/50 ${selected?.id === n.id ? "bg-primary/5" : ""}`} style={{ paddingLeft: 8 + depth * 16 }}>
          {hasChildren ? (
            <button onClick={() => setExpanded((s) => ({ ...s, [n.id]: !s[n.id] }))} className="p-0.5">
              {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          ) : <span className="w-[20px]" />}
          <button className="flex-1 text-left text-sm" onClick={() => setSelected(n)}>{n.name}</button>
          <span className="text-xs text-muted-foreground">{n.listingsCount}</span>
          <Button size="icon" variant="ghost" onClick={() => setSelected(n)}><Pencil size={12} /></Button>
          <Button size="icon" variant="ghost" className="text-red-700"><Trash2 size={12} /></Button>
        </div>
        {hasChildren && isOpen && <ul>{n.children!.map((c) => renderNode(c, depth + 1))}</ul>}
      </li>
    );
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput("");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Categorii listing</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold">Arbore categorii</h2>
            <Button size="sm" onClick={() => setSelected(null)}><Plus size={14} /> Adaugă principală</Button>
          </div>
          <ul>{listingCategoriesTree.map((n) => renderNode(n))}</ul>
        </Card>
        <Card className="p-4 space-y-3">
          <h2 className="font-semibold">{selected ? "Editează categorie" : "Categorie nouă"}</h2>
          <div><Label>Denumire *</Label><Input defaultValue={selected?.name} className="mt-1" /></div>
          <div><Label>Slug *</Label><Input defaultValue={selected?.slug} className="mt-1 font-mono" /></div>
          <div><Label>Categorie părinte</Label>
            <Select defaultValue={selected?.parentId ?? "none"}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">— Top-level —</SelectItem>
                {listingCategoriesTree.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div><Label>Imagine / icon</Label><Input type="file" className="mt-1" /></div>
          <div><Label>Sort order</Label><Input type="number" defaultValue={1} className="mt-1" /></div>
          <div className="flex items-center justify-between"><Label>Activă</Label><Switch defaultChecked={selected?.active} /></div>
          <div>
            <Label>Taxonomy tags</Label>
            <div className="text-xs text-muted-foreground mb-1">Adaugă cuvinte cheie pentru search SEO, separate prin Enter</div>
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 bg-muted text-xs px-2 py-0.5 rounded-full">
                  {t}<button onClick={() => setTags(tags.filter((x) => x !== t))}><X size={10} /></button>
                </span>
              ))}
            </div>
            <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} placeholder="Tag și Enter..." />
          </div>
          <Button>Salvează</Button>
        </Card>
      </div>
    </div>
  );
};

export const SubcategoriesPage = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Subcategorii</h1>
      <Button><Plus size={14} /> Adaugă subcategorie</Button>
    </div>
    <Card>
      <Table>
        <TableHeader>
          <TableRow><TableHead>Nume</TableHead><TableHead>Slug</TableHead><TableHead>Părinte</TableHead><TableHead>Listinguri</TableHead><TableHead className="text-right">Acțiuni</TableHead></TableRow>
        </TableHeader>
        <TableBody>
          {listingCategoriesTree.flatMap((c) => c.children ?? []).map((s) => (
            <TableRow key={s.id}>
              <TableCell className="font-medium">{s.name}</TableCell>
              <TableCell className="font-mono text-sm">{s.slug}</TableCell>
              <TableCell>{listingCategoriesTree.find((c) => c.id === s.parentId)?.name}</TableCell>
              <TableCell>{s.listingsCount}</TableCell>
              <TableCell><div className="flex justify-end gap-1"><Button size="icon" variant="ghost"><Pencil size={14} /></Button><Button size="icon" variant="ghost" className="text-red-700"><Trash2 size={14} /></Button></div></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  </div>
);

export const ServicesFacilities = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-semibold">Servicii & Facilități</h1>
    <Tabs defaultValue="services">
      <TabsList><TabsTrigger value="services">Servicii</TabsTrigger><TabsTrigger value="facilities">Facilități</TabsTrigger></TabsList>
      <TabsContent value="services" className="space-y-3">
        <div className="flex justify-end"><Button size="sm"><Plus size={14} /> Adaugă serviciu</Button></div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow><TableHead>Nume</TableHead><TableHead>Categorie</TableHead><TableHead>Slug</TableHead><TableHead>Listinguri</TableHead><TableHead className="text-right">Acțiuni</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {services.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.category}</TableCell>
                  <TableCell className="font-mono text-sm">{s.slug}</TableCell>
                  <TableCell>{s.listingsUsing}</TableCell>
                  <TableCell><div className="flex justify-end gap-1"><Button size="icon" variant="ghost"><Pencil size={14} /></Button><Button size="icon" variant="ghost" className="text-red-700"><Trash2 size={14} /></Button></div></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </TabsContent>
      <TabsContent value="facilities" className="space-y-3">
        <div className="flex justify-end"><Button size="sm"><Plus size={14} /> Adaugă facilitate</Button></div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow><TableHead>Nume</TableHead><TableHead>Icon</TableHead><TableHead>Listinguri</TableHead><TableHead className="text-right">Acțiuni</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {facilities.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium">{f.name}</TableCell>
                  <TableCell className="font-mono text-xs">{f.icon}</TableCell>
                  <TableCell>{f.listingsUsing}</TableCell>
                  <TableCell><div className="flex justify-end gap-1"><Button size="icon" variant="ghost"><Pencil size={14} /></Button><Button size="icon" variant="ghost" className="text-red-700"><Trash2 size={14} /></Button></div></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
);

export const CountiesPage = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-semibold">Zone & Județe</h1>
    <Card className="p-4 bg-blue-50 border-blue-200">
      <div className="flex gap-2 items-start">
        <Info size={16} className="text-blue-700 mt-0.5 shrink-0" />
        <p className="text-sm text-blue-800">Lista de județe este importată din SIRUTA și nu poate fi modificată. Listingurile pot servi unul sau mai multe județe — coloana "Cu zone servite" arată numărul de listinguri care au județul în zona lor de acoperire.</p>
      </div>
    </Card>
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Județ</TableHead><TableHead>Cod SIRUTA</TableHead><TableHead>Listinguri</TableHead><TableHead>Cu zone servite</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {counties.map((c) => (
              <TableRow key={c.code}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell className="font-mono text-sm">{c.code}</TableCell>
                <TableCell>{c.listingsCount}</TableCell>
                <TableCell>{c.servedListingsCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  </div>
);

export const BannersPage = () => {
  const [editing, setEditing] = useState<typeof manageBanners[0] | null>(null);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Bannere publicitare</h1>
      <Card>
        <Table>
          <TableHeader>
            <TableRow><TableHead>Slot</TableHead><TableHead>Dimensiuni</TableHead><TableHead>Status</TableHead><TableHead>Advertiser</TableHead><TableHead>Valid</TableHead><TableHead className="text-right">Acțiuni</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {manageBanners.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-medium">{b.slot}</TableCell>
                <TableCell className="text-sm font-mono">{b.dimensions}</TableCell>
                <TableCell><StatusPill variant={b.status === "sold" ? "success" : "muted"}>{b.status === "sold" ? "Vândut" : "Disponibil"}</StatusPill></TableCell>
                <TableCell className="text-sm">{b.advertiser ?? "—"}</TableCell>
                <TableCell className="text-xs">{b.validFrom ? `${b.validFrom} → ${b.validUntil}` : "—"}</TableCell>
                <TableCell><div className="flex justify-end gap-1"><Button size="sm" variant="outline" onClick={() => setEditing(b)}>Editează</Button></div></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Editează banner</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Advertiser</Label><Input defaultValue={editing?.advertiser} className="mt-1" /></div>
            <div><Label>Imagine</Label><Input type="file" className="mt-1" /></div>
            <div><Label>URL destinație</Label><Input defaultValue={editing?.url} className="mt-1" /></div>
            <div className="grid grid-cols-2 gap-2">
              <div><Label>Valid de la</Label><Input type="date" defaultValue={editing?.validFrom} className="mt-1" /></div>
              <div><Label>Valid până la</Label><Input type="date" defaultValue={editing?.validUntil} className="mt-1" /></div>
            </div>
            <div className="flex items-center justify-between"><Label>Activ</Label><Switch defaultChecked={editing?.active} /></div>
          </div>
          <DialogFooter><Button variant="ghost" onClick={() => setEditing(null)}>Anulează</Button><Button onClick={() => setEditing(null)}>Salvează</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const SettingsPage = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-semibold">Setări platformă</h1>
    <div className="grid lg:grid-cols-2 gap-4">
      <Card className="p-5 space-y-3">
        <h3 className="font-semibold">General</h3>
        <div><Label>Nume site</Label><Input defaultValue={platformSettings.general.siteName} className="mt-1" /></div>
        <div><Label>Email contact</Label><Input defaultValue={platformSettings.general.contactEmail} className="mt-1" /></div>
        <div><Label>Adresă</Label><Input defaultValue={platformSettings.general.address} className="mt-1" /></div>
      </Card>
      <Card className="p-5 space-y-3">
        <h3 className="font-semibold">SEO</h3>
        <div><Label>Meta title (default)</Label><Input defaultValue={platformSettings.seo.metaTitle} className="mt-1" /></div>
        <div><Label>Meta description</Label><Textarea defaultValue={platformSettings.seo.metaDescription} rows={2} className="mt-1" /></div>
      </Card>
      <Card className="p-5 space-y-3">
        <h3 className="font-semibold">Email SMTP</h3>
        <div><Label>Host</Label><Input defaultValue={platformSettings.email.host} className="mt-1" /></div>
        <div className="grid grid-cols-2 gap-2">
          <div><Label>Port</Label><Input type="number" defaultValue={platformSettings.email.port} className="mt-1" /></div>
          <div><Label>Utilizator</Label><Input defaultValue={platformSettings.email.user} className="mt-1" /></div>
        </div>
        <div><Label>Parolă</Label><Input type="password" defaultValue={platformSettings.email.pass} className="mt-1" /></div>
      </Card>
      <Card className="p-5 space-y-3">
        <h3 className="font-semibold">Plăți (transfer bancar)</h3>
        <div><Label>IBAN</Label><Input defaultValue={platformSettings.payments.iban} className="mt-1 font-mono" /></div>
        <div><Label>Bancă</Label><Input defaultValue={platformSettings.payments.bank} className="mt-1" /></div>
        <div><Label>Beneficiar</Label><Input defaultValue={platformSettings.payments.beneficiary} className="mt-1" /></div>
      </Card>
      <Card className="p-5 space-y-3 lg:col-span-2">
        <h3 className="font-semibold">Mentenanță</h3>
        <div className="flex items-center justify-between"><Label>Mod mentenanță activ</Label><Switch defaultChecked={platformSettings.maintenance.enabled} /></div>
        <div><Label>Mesaj afișat</Label><Textarea defaultValue={platformSettings.maintenance.message} rows={2} className="mt-1" /></div>
      </Card>
    </div>
    <Button>Salvează setările</Button>
  </div>
);
