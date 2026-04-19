import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, ArrowLeft, X } from "lucide-react";
import StatusPill from "@/components/manage/StatusPill";
import RichTextEditor from "@/components/manage/RichTextEditor";
import { manageArticles, articleCategories, ArticleStatus } from "@/data/manageMockData";

const statusVariant: Record<ArticleStatus, "success" | "muted" | "warning"> = { published: "success", draft: "muted", scheduled: "warning" };
const statusLabel: Record<ArticleStatus, string> = { published: "Publicat", draft: "Draft", scheduled: "Programat" };

export const ArticlesList = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Articole</h1>
      <Button asChild><Link to="/manage/articles/new/edit"><Plus size={14} /> Adaugă articol nou</Link></Button>
    </div>
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titlu</TableHead><TableHead>Categorie</TableHead><TableHead>Autor</TableHead>
              <TableHead>Status</TableHead><TableHead>Publicat</TableHead><TableHead>Vizualizări</TableHead>
              <TableHead className="text-right">Acțiuni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {manageArticles.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">{a.title}</TableCell>
                <TableCell className="text-sm">{a.category}</TableCell>
                <TableCell className="text-sm">{a.author}</TableCell>
                <TableCell><StatusPill variant={statusVariant[a.status]}>{statusLabel[a.status]}</StatusPill></TableCell>
                <TableCell className="text-xs">{a.publishedAt}</TableCell>
                <TableCell>{a.views}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button asChild size="icon" variant="ghost"><Link to={`/manage/articles/${a.id}/edit`}><Pencil size={14} /></Link></Button>
                    <Button size="icon" variant="ghost" className="text-red-700"><Trash2 size={14} /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  </div>
);

export const EditArticle = () => {
  const { id } = useParams();
  const article = manageArticles.find((a) => a.id === id);
  const [body, setBody] = useState(article ? "<p>Conținutul articolului...</p>" : "");
  const [tags, setTags] = useState<string[]>(["beauty", "tutorial"]);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput("");
  };

  return (
    <div className="space-y-4">
      <Button asChild variant="ghost" size="sm"><Link to="/manage/articles"><ArrowLeft size={14} /> Înapoi</Link></Button>
      <h1 className="text-2xl font-semibold">{article ? `Editează: ${article.title}` : "Articol nou"}</h1>

      <div className="grid lg:grid-cols-[1fr_280px] gap-4">
        <div className="space-y-4">
          <Card className="p-4">
            <Label>Titlu</Label>
            <Input defaultValue={article?.title} placeholder="Titlul articolului..." className="mt-1 text-lg" />
          </Card>
          <RichTextEditor value={body} onChange={setBody} />
        </div>

        <div className="space-y-4">
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-sm">Publicare</h3>
            <div><Label>Status</Label>
              <Select defaultValue={article?.status ?? "draft"}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Publicat</SelectItem>
                  <SelectItem value="scheduled">Programat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Dată publicare</Label><Input type="date" className="mt-1" /></div>
            <div><Label>Categorie</Label>
              <Select defaultValue={articleCategories[0].id}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {articleCategories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-1 mt-1 mb-2">
                {tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 bg-muted text-xs px-2 py-0.5 rounded-full">
                    {t}<button onClick={() => setTags(tags.filter((x) => x !== t))}><X size={10} /></button>
                  </span>
                ))}
              </div>
              <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                placeholder="Tag și Enter..." />
            </div>
          </Card>

          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-sm">Imagine cover</h3>
            <Input type="file" />
            <div className="aspect-video bg-muted rounded" />
          </Card>

          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-sm">SEO & Excerpt</h3>
            <div><Label>Excerpt</Label><Textarea rows={2} className="mt-1" /></div>
            <div><Label>Meta title</Label><Input className="mt-1" /></div>
            <div><Label>Meta description</Label><Textarea rows={2} className="mt-1" /></div>
          </Card>

          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-sm">Sponsorizat</h3>
            <div className="flex items-center justify-between"><Label>Articol sponsorizat</Label><Switch /></div>
            <div><Label>Listing asociat</Label><Input placeholder="Caută companie..." className="mt-1" /></div>
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">Salvează draft</Button>
            <Button className="flex-1">Publică</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ArticleCategoriesPage = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Categorii articole</h1>
      <Button><Plus size={14} /> Adaugă categorie</Button>
    </div>
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nume</TableHead><TableHead>Slug</TableHead><TableHead>Articole</TableHead>
              <TableHead>Culoare</TableHead><TableHead className="text-right">Acțiuni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articleCategories.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell className="text-sm font-mono">{c.slug}</TableCell>
                <TableCell>{c.articleCount}</TableCell>
                <TableCell><input type="color" defaultValue={c.color} className="h-7 w-12 rounded cursor-pointer" /></TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button size="icon" variant="ghost"><Pencil size={14} /></Button>
                    <Button size="icon" variant="ghost" className="text-red-700"><Trash2 size={14} /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  </div>
);
