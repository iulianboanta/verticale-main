export type AdminUser = { name: string; email: string; role: "Super Admin" | "Content Manager" };

const KEY = "ghidbeauty_admin_user";

export function login(email: string, _password: string): AdminUser {
  const user: AdminUser = {
    name: email.split("@")[0] || "Admin",
    email,
    role: "Super Admin",
  };
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem(KEY);
}

export function getAdminUser(): AdminUser | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AdminUser) : null;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return getAdminUser() !== null;
}
