import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockReviews } from "@/data/dashboardMockData";

const DashboardReviews = () => {
  const [filter, setFilter] = useState("toate");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const totalReviews = mockReviews.length;
  const avgRating = (mockReviews.reduce((a, r) => a + r.stars, 0) / totalReviews).toFixed(1);
  const thisMonth = mockReviews.filter((r) => r.date.startsWith("2026-04")).length;
  const replyRate = Math.round((mockReviews.filter((r) => r.replied).length / totalReviews) * 100);

  const filtered = mockReviews.filter((r) => {
    if (filter === "cu_raspuns") return r.replied;
    if (filter === "fara_raspuns") return !r.replied;
    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Recenzii primite</h1>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Rating mediu", value: avgRating, icon: Star },
          { label: "Total recenzii", value: totalReviews.toString(), icon: MessageSquare },
          { label: "Luna aceasta", value: thisMonth.toString(), icon: Star },
          { label: "Rata raspuns", value: `${replyRate}%`, icon: MessageSquare },
        ].map((s) => (
          <Card key={s.label} className="border-border/50">
            <CardContent className="p-4">
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="toate">Toate</SelectItem>
          <SelectItem value="cu_raspuns">Cu raspuns</SelectItem>
          <SelectItem value="fara_raspuns">Fara raspuns</SelectItem>
        </SelectContent>
      </Select>

      {/* Reviews */}
      <div className="space-y-3">
        {filtered.map((r) => (
          <Card key={r.id} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground shrink-0">
                  {r.reviewerInitials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-sm font-medium text-foreground">{r.reviewerName}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < r.stars ? "text-amber-400 fill-amber-400" : "text-muted"}`} />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{r.listingName}</p>
                  <p className="text-sm text-foreground/80 mb-3">{r.text}</p>

                  {r.replied && r.replyText && (
                    <div className="ml-4 pl-4 border-l-2 border-primary/20 mb-3">
                      <p className="text-xs font-medium text-primary mb-0.5">Raspunsul tau</p>
                      <p className="text-sm text-muted-foreground">{r.replyText}</p>
                    </div>
                  )}

                  {!r.replied && replyingTo !== r.id && (
                    <Button variant="outline" size="sm" className="text-xs h-7" onClick={() => setReplyingTo(r.id)}>
                      Raspunde
                    </Button>
                  )}

                  {replyingTo === r.id && (
                    <div className="space-y-2">
                      <Textarea placeholder="Scrie raspunsul tau..." rows={3} className="text-sm" />
                      <div className="flex gap-2">
                        <Button size="sm" className="text-xs h-7">Trimite raspunsul</Button>
                        <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => setReplyingTo(null)}>Anuleaza</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardReviews;
