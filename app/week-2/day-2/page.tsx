"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";

type Card = {
  id: string;
  tag: string;
  title: string;
  summary: string;
  details: string;
  color: string;
};

const cards: Card[] = [
  {
    id: "presence",
    tag: "Day 1",
    title: "AnimatePresence",
    summary: "Exit animations ka asli raaz.",
    details:
      "AnimatePresence hata hue element ko exit animation tak DOM mein rakhta hai. Unique key aur direct motion child zaroori hain.",
    color: "bg-gradient-to-br from-blue-500 to-indigo-600",
  },
  {
    id: "modes",
    tag: "Day 1",
    title: "Presence Modes",
    summary: "sync, wait aur popLayout.",
    details:
      "sync sab ek saath chalata hai, wait purane ko pehle exit karata hai, popLayout exiting element ko layout se nikaal deta hai.",
    color: "bg-gradient-to-br from-emerald-500 to-teal-600",
  },
  {
    id: "layout",
    tag: "Day 2",
    title: "layout prop",
    summary: "Size aur position auto-animate.",
    details:
      "layout prop lagane se jab bhi element ki size ya position badalti hai, Motion transform ke zariye smooth animation chala deta hai.",
    color: "bg-gradient-to-br from-orange-500 to-red-600",
  },
  {
    id: "layoutid",
    tag: "Day 2",
    title: "layoutId",
    summary: "Shared element transition.",
    details:
      "Do alag elements ko same layoutId do to Motion unke beech smooth transition banata hai. Cards se detail view ka classic pattern.",
    color: "bg-gradient-to-br from-fuchsia-500 to-purple-600",
  },
  {
    id: "gestures",
    tag: "Day 3",
    title: "Gestures",
    summary: "Hover, tap aur drag.",
    details:
      "whileHover, whileTap aur drag props se interactive components bante hain. dragConstraints element ko limit ke andar rakhta hai.",
    color: "bg-gradient-to-br from-sky-500 to-cyan-600",
  },
  {
    id: "responsive",
    tag: "Bonus",
    title: "Responsive Grid",
    summary: "Filter transitions ke saath.",
    details:
      "Tailwind ke breakpoints se grid 1, 2 aur 3 columns mein badalta hai. Filter lagane par layout prop se cards smoothly shift honge.",
    color: "bg-gradient-to-br from-rose-500 to-pink-600",
  },
];

const spring = { type: "spring", stiffness: 350, damping: 32 } as const;

export default function Day2Page() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // Jis card ne dialog khola, usko yaad rakhte hain taake band hone par focus wapas wahin aaye
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const selected = cards.find((card) => card.id === selectedId) ?? null;

  const closeDialog = () => setSelectedId(null);

  // Esc dabane par dialog band ho
  useEffect(() => {
    if (!selectedId) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedId]);

  // Scroll lock: dialog khula ho to background scroll band
  useEffect(() => {
    if (!selectedId) return;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    // Scrollbar ghayab hone par page ka content na hile
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [selectedId]);

  // Focus return: dialog band hone par focus usi card par wapas
  useEffect(() => {
    if (selectedId !== null) return;
    triggerRef.current?.focus();
  }, [selectedId]);

  return (
    // reducedMotion="user": OS setting on ho to transform/layout animations band
    <MotionConfig reducedMotion="user">
      <main className="mx-auto min-h-screen max-w-4xl p-4 sm:p-6">
        {/* inert: dialog khula ho to background focus, click aur screen reader se hat jata hai */}
        <div inert={selected !== null}>
          <header className="mb-6 space-y-1">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Day 2: Shared Layout Transition
            </h1>
            <p className="text-sm text-neutral-500">
              Kisi card par click karo. Esc ya bahar click se band karo.
            </p>
          </header>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <li key={card.id}>
                <motion.button
                  type="button"
                  layoutId={`card-${card.id}`}
                  onClick={(e) => {
                    triggerRef.current = e.currentTarget;
                    setSelectedId(card.id);
                  }}
                  transition={spring}
                  style={{ borderRadius: 16 }}
                  className={`block w-full p-5 text-left text-white shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${card.color}`}
                >
                  <motion.span
                    layoutId={`tag-${card.id}`}
                    className="block text-xs uppercase tracking-wide opacity-80"
                  >
                    {card.tag}
                  </motion.span>
                  <motion.h2
                    layoutId={`title-${card.id}`}
                    className="mt-2 text-lg font-semibold"
                  >
                    {card.title}
                  </motion.h2>
                  <p className="mt-1 text-sm opacity-90">{card.summary}</p>
                </motion.button>
              </li>
            ))}
          </ul>
        </div>

        {/* Backdrop */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDialog}
              className="fixed inset-0 z-40 bg-black/40"
            />
          )}
        </AnimatePresence>

        {/* Expanded card: grid wale card ka same layoutId */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.id}
              layoutId={`card-${selected.id}`}
              transition={spring}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`dialog-title-${selected.id}`}
              aria-describedby={`dialog-desc-${selected.id}`}
              style={{ borderRadius: 16 }}
              className={`fixed inset-0 z-50 m-auto h-fit w-[calc(100%-2rem)] max-w-md p-6 text-white shadow-2xl ${selected.color}`}
            >
              <motion.span
                layoutId={`tag-${selected.id}`}
                className="block text-xs uppercase tracking-wide opacity-80"
              >
                {selected.tag}
              </motion.span>
              <motion.h2
                id={`dialog-title-${selected.id}`}
                layoutId={`title-${selected.id}`}
                className="mt-2 text-lg font-semibold"
              >
                {selected.title}
              </motion.h2>
              <motion.p
                id={`dialog-desc-${selected.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="mt-3 text-sm leading-relaxed"
              >
                {selected.details}
              </motion.p>
              <button
                type="button"
                autoFocus
                onClick={closeDialog}
                className="mt-6 rounded-md bg-white/20 px-4 py-2 text-sm font-medium hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-white"
              >
                Band karo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}