import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Pencil, Lock, Trash2, KeyRound, UserPlus } from "lucide-react";
import StatusPill from "@/components/manage/StatusPill";
import { manageUsers, ManageUser } from "@/data/manageMockData";

const UserModal = ({ user, open, onClose }: { user?: ManageUser; open: boolean; onClose: () => void }) => (
  <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
    <DialogContent>
      <DialogHeader><DialogTitle>{user ? "Editează utilizator" : "Adaugă utilizator"}</DialogTitle></DialogHeader>
      <div className="space-y-3">
        <div><Label>Nume</Label><Input defaultValue={user?.name} className="mt-1" /></div>
        <div><Label>Email</Label><Input defaultValue={user?.email} type="email" className="mt-1" /></div>
        <div><Label>Rol</Label>
          <Select defaultValue={user?.role ?? "Content Manager"}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Content Manager">Content Manager</SelectItem>
              <SelectItem value="Owner">Owner</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {user && (
          <>
            <div className="flex items-center justify-between"><Label>Cont activ</Label><Switch defaultChecked={user.status === "active"} /></div>
            <Button variant="outline" className="w-full"><KeyRound size={14} /> Resetează parolă</Button>
          </>
        )}
      </div>
      <DialogFooter>
        <Button variant="ghost" onClick={onClose}>Anulează</Button>
        <Button onClick={onClose}>Salvează</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const AllUsers = () => {
  const [editing, setEditing] = useState<ManageUser | undefined>();
  const [adding, setAdding] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-semibold">Utilizatori</h1><p className="text-sm text-muted-foreground">Gestionează conturile utilizatorilor.</p></div>
        <Button onClick={() => setAdding(true)}><UserPlus size={14} /> Adaugă utilizator</Button>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nume</TableHead><TableHead>Email</TableHead><TableHead>Rol</TableHead>
                <TableHead>Listinguri</TableHead><TableHead>Înregistrat</TableHead><TableHead>Ultima conectare</TableHead>
                <TableHead>Status</TableHead><TableHead className="text-right">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {manageUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell className="text-sm">{u.email}</TableCell>
                  <TableCell><StatusPill variant={u.role === "Admin" ? "info" : u.role === "Content Manager" ? "warning" : "muted"}>{u.role}</StatusPill></TableCell>
                  <TableCell>{u.listingsCount}</TableCell>
                  <TableCell className="text-xs">{u.registeredAt}</TableCell>
                  <TableCell className="text-xs">{u.lastLogin}</TableCell>
                  <TableCell><StatusPill variant={u.status === "active" ? "success" : "danger"}>{u.status === "active" ? "Activ" : "Blocat"}</StatusPill></TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => setEditing(u)}><Pencil size={14} /></Button>
                      <Button size="icon" variant="ghost"><Lock size={14} /></Button>
                      <Button size="icon" variant="ghost" className="text-red-700"><Trash2 size={14} /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      <UserModal user={editing} open={!!editing} onClose={() => setEditing(undefined)} />
      <UserModal open={adding} onClose={() => setAdding(false)} />
    </div>
  );
};

export const NewUser = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Adaugă utilizator</h1>
      <Card className="p-5 max-w-xl space-y-3">
        <div><Label>Nume complet</Label><Input className="mt-1" /></div>
        <div><Label>Email</Label><Input type="email" className="mt-1" /></div>
        <div><Label>Rol</Label>
          <Select defaultValue="Content Manager">
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Content Manager">Content Manager</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div><Label>Parolă temporară</Label><Input type="password" className="mt-1" /></div>
        <Button>Creează cont</Button>
      </Card>
    </div>
  );
};
