"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type PresenceMode = "wait" | "sync" | "popLayout";

type Tab = {
  id: string;
  label: string;
  title: string;
  body: string;
};

const tabs: Tab[] = [
  {
    id: "theory",
    label: "Theory",
    title: "AnimatePresence kya hai?",
    body: "Ye React ko batata hai ke hata hua element foran DOM se na nikaale, pehle exit animation chalne de.",
  },
  {
    id: "modes",
    label: "Modes",
    title: "Teen modes",
    body: "sync sab kuch ek saath chalata hai, wait purane ko pehle exit karata hai, popLayout exiting element ko layout se nikaal deta hai.",
  },
  {
    id: "keys",
    label: "Keys",
    title: "Key kyun zaroori hai?",
    body: "Key badalne par React purana element hata ke naya banata hai. AnimatePresence isi se exit animation trigger karta hai.",
  },
];

const modes: PresenceMode[] = ["wait", "sync", "popLayout"];

export default function WaitDemoPage() {
  const [activeId, setActiveId] = useState<string>(tabs[0].id);
  const [mode, setMode] = useState<PresenceMode>("wait");
  const shouldReduceMotion = useReducedMotion();

  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-6 p-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Day 1: mode=&quot;wait&quot; Demo</h1>
        <p className="text-sm text-neutral-500">
          Tabs badlo aur alag alag modes ka farq dekho.
        </p>
      </header>

      {/* Mode switcher */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="AnimatePresence mode">
        {modes.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
              mode === m ? "bg-black text-white" : "hover:bg-neutral-100"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Tab buttons */}
      <div className="flex gap-2 border-b" role="tablist" aria-label="Topics">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeId === tab.id}
            onClick={() => setActiveId(tab.id)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
              activeId === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panel area: relative zaroori hai popLayout ke liye */}
      <div className="relative min-h-40" role="tabpanel">
        <AnimatePresence mode={mode} initial={false}>
          <motion.div
            key={activeTab.id}
            initial={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 40 }
            }
            animate={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }
            }
            exit={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -40 }
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full rounded-lg border bg-white p-4 shadow-sm"
          >
            <h2 className="mb-2 font-semibold">{activeTab.title}</h2>
            <p className="text-sm text-neutral-600">{activeTab.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}