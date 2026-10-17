"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { signIn } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [name, setName] = useState("Alex Rivera");
  const [email, setEmail] = useState("alex@example.com");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(signIn({ name, email }));
    router.push("/");
  }

  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[var(--accent)]/15 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface-elevated)] p-8 shadow-glass backdrop-blur-md"
      >
        <div className="flex items-center gap-2.5 pb-4 border-b border-[var(--line)]/50">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-[var(--accent)] to-teal-400 text-sm font-black text-white shadow-sm shadow-[var(--accent)]/30">
            P
          </span>
          <span className="text-lg font-bold tracking-tight">Pulseboard</span>
        </div>
        <h1 className="mt-5 text-2xl font-bold tracking-tight">Sign in</h1>
        <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">
          Mock authentication session. Your preferences and saved items will be personalized to this profile.
        </p>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <label className="block text-sm font-medium">
            Name
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2.5 text-sm outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 shadow-xs"
            />
          </label>
          <label className="block text-sm font-medium">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2.5 text-sm outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 shadow-xs"
            />
          </label>
          <Button type="submit" variant="primary" className="w-full shadow-sm hover:shadow-md active:scale-95 transition-all">
            Continue
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
