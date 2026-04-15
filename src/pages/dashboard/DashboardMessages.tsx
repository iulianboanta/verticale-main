import { useState } from "react";
import { Mail, MailOpen, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockMessages } from "@/data/dashboardMockData";

const DashboardMessages = () => {
  const [filter, setFilter] = useState("toate");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const unreadCount = mockMessages.filter((m) => !m.read).length;
  const thisMonth = mockMessages.filter((m) => m.date.startsWith("2026-04")).length;
  const selected = mockMessages.find((m) => m.id === selectedId);

  const filtered = mockMessages.filter((m) => {
    if (filter === "necitite") return !m.read;
    if (filter === "citite") return m.read;
    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Mesaje primite</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total mesaje", value: mockMessages.length },
          { label: "Necitite", value: unreadCount },
          { label: "Luna aceasta", value: thisMonth },
        ].map((s) => (
          <Card key={s.label} className="border-border/50">
            <CardContent className="p-4">
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="toate">Toate</SelectItem>
          <SelectItem value="necitite">Necitite</SelectItem>
          <SelectItem value="citite">Citite</SelectItem>
        </SelectContent>
      </Select>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4">
        {/* Message list */}
        <div className="space-y-2">
          {filtered.map((m) => (
            <Card
              key={m.id}
              className={`border-border/50 cursor-pointer hover:bg-muted/30 transition-colors ${
                !m.read ? "border-l-[3px] border-l-primary" : ""
              } ${selectedId === m.id ? "ring-1 ring-primary" : ""}`}
              onClick={() => setSelectedId(m.id)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                {!m.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-foreground">{m.senderName}</span>
                    <Badge variant="secondary" className="text-[10px]">{m.listingName}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{m.preview}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{m.date}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detail panel */}
        {selected && (
          <Card className="border-border/50 h-fit sticky top-20">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Detalii mesaj</h3>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSelectedId(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">De la</p>
                  <p className="text-sm font-medium text-foreground">{selected.senderName}</p>
                  <p className="text-xs text-muted-foreground">{selected.senderEmail}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Listing</p>
                  <p className="text-sm text-foreground">{selected.listingName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Data</p>
                  <p className="text-sm text-foreground">{selected.date}</p>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-foreground leading-relaxed">{selected.fullMessage}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="text-xs flex-1">
                    <Mail className="w-3.5 h-3.5 mr-1" /> Raspunde prin email
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <MailOpen className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardMessages;
