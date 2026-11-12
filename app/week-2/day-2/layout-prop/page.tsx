"use client";

import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";

const spring = { type: "spring", stiffness: 400, damping: 35 } as const;

/* ---------- Part 1: Accordion ---------- */

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "layout prop kya karta hai?",
    answer:
      "Element ki size ya position badalne par Motion us change ko transform ke zariye smooth animate karta hai.",
  },
  {
    id: "faq-2",
    question: "Siblings par layout kyun lagate hain?",
    answer:
      "Jab ek item ki height badalti hai to baaki items ki position bhi badalti hai. Unpar layout na ho to wo teleport karte hain.",
  },
  {
    id: "faq-3",
    question: 'layout="position" kab use karein?',
    answer:
      "Jab sirf position animate karni ho aur size ki wajah se text ya image stretch ho rahi ho.",
  },
];

type AccordionItemProps = {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
};

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  return (
    <motion.li
      layout
      transition={spring}
      style={{ borderRadius: 12 }}
      // relative zaroori hai kyunke neeche AnimatePresence popLayout use ho raha hai
      className="relative overflow-hidden border bg-white shadow-sm"
    >
      <motion.button
        layout="position"
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium"
      >
        <span>{item.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          aria-hidden="true"
          className="text-lg leading-none"
        >
          +
        </motion.span>
      </motion.button>

      {/* popLayout: exiting content foran layout se nikal jata hai, jhatka nahi aata */}
      <AnimatePresence initial={false} mode="popLayout">
        {isOpen && (
          <motion.div
            key="content"
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full px-4 pb-4 text-sm text-neutral-600"
          >
            {item.answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

/* ---------- Part 2: Shuffle / Sort ---------- */

type Chip = {
  id: string;
  label: string;
  color: string;
};

const initialChips: Chip[] = [
  { id: "mango", label: "Mango", color: "bg-amber-500" },
  { id: "banana", label: "Banana", color: "bg-yellow-500" },
  { id: "cherry", label: "Cherry", color: "bg-red-500" },
  { id: "apple", label: "Apple", color: "bg-green-500" },
  { id: "grape", label: "Grape", color: "bg-purple-500" },
  { id: "orange", label: "Orange", color: "bg-orange-500" },
];

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* ---------- Page ---------- */

export default function LayoutPropPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [chips, setChips] = useState<Chip[]>(initialChips);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const shuffle = () => setChips((prev) => shuffleArray(prev));
  const sortAZ = () =>
    setChips((prev) => [...prev].sort((a, b) => a.label.localeCompare(b.label)));
  const reset = () => setChips(initialChips);

  return (
    <MotionConfig reducedMotion="user">
      <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-10 p-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold">Day 2: layout prop Demo</h1>
          <p className="text-sm text-neutral-500">
            Accordion kholo aur grid ko shuffle ya sort karo.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">1. Accordion (size change)</h2>
          <ul className="flex flex-col gap-2">
            {faqs.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </ul>
        </section>

        {/* FIX: accordion ke neeche wala poora section bhi layout="position" le */}
        <motion.section
          layout="position"
          transition={spring}
          className="space-y-3"
        >
          <h2 className="text-lg font-semibold">2. Shuffle / Sort (position change)</h2>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={shuffle}
              className="rounded-md bg-black px-3 py-1.5 text-sm text-white"
            >
              Shuffle
            </button>
            <button
              type="button"
              onClick={sortAZ}
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-neutral-100"
            >
              Sort A-Z
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-neutral-100"
            >
              Reset
            </button>
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {chips.map((chip) => (
              <motion.li
                key={chip.id}
                layout
                transition={spring}
                style={{ borderRadius: 12 }}
                className={`flex h-20 items-center justify-center text-sm font-semibold text-white shadow ${chip.color}`}
              >
                {chip.label}
              </motion.li>
            ))}
          </ul>
        </motion.section>
      </main>
    </MotionConfig>
  );
}