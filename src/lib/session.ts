import { create } from "zustand";
import { MEMBERS } from "@/lib/hive";

const KEY = "eventhive-session";
export const DEMO_PASSWORD = "eventhive";

export type Account = {
  id: string;
  name: string;
  role: string;
  handle: string;
};

export const ACCOUNTS: Account[] = MEMBERS.map((member) => ({
  id: member.id,
  name: member.name,
  role: member.role,
  handle: member.name.split(" ")[0].toLowerCase(),
}));

type SessionState = {
  userId: string | null;
  booted: boolean;
  boot: () => void;
  signIn: (handle: string, password: string) => string | null;
  signOut: () => void;
};

export const useSession = create<SessionState>((set) => ({
  userId: null,
  booted: false,
  boot: () => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw && ACCOUNTS.some((account) => account.id === raw)) {
        set({ userId: raw, booted: true });
        return;
      }
    } catch {
      /* stay signed out */
    }
    set({ userId: null, booted: true });
  },
  signIn: (handle, password) => {
    if (password !== DEMO_PASSWORD) return "Wrong password. Use eventhive.";
    const account = ACCOUNTS.find((item) => item.handle === handle.trim().toLowerCase());
    if (!account) return "No account with that name.";
    localStorage.setItem(KEY, account.id);
    set({ userId: account.id });
    return null;
  },
  signOut: () => {
    localStorage.removeItem(KEY);
    set({ userId: null });
  },
}));
