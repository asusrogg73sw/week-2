"use client";

import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";

type Category = "presence" | "layout" | "gestures";
type Filter = "all" | Category;

type Topic = {
  id: string;
  title: string;
  description: string;
  category: Category;
};

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "presence", label: "Presence" },
  { id: "layout", label: "Layout" },
  { id: "gestures", label: "Gestures" },
];

const topics: Topic[] = [
  {
    id: "animate-presence",
    title: "AnimatePresence",
    description: "Hata hue element ko exit animation tak DOM mein rakhta hai.",
    category: "presence",
  },
  {
    id: "presence-modes",
    title: "Presence Modes",
    description: "sync, wait aur popLayout ka farq aur use cases.",
    category: "presence",
  },
  {
    id: "exit-animations",
    title: "Exit Animations",
    description: "exit prop se element ke ghayab hone ki animation likhna.",
    category: "presence",
  },
  {
    id: "layout-prop",
    title: "layout prop",
    description: "Size aur position ki tabdeeli auto-animate hoti hai.",
    category: "layout",
  },
  {
    id: "layout-id",
    title: "layoutId",
    description: "Do alag elements ke beech shared transition banata hai.",
    category: "layout",
  },
  {
    id: "layout-position",
    title: 'layout="position"',
    description: "Sirf position animate hoti hai, text stretch nahi hoti.",
    category: "layout",
  },
  {
    id: "while-hover",
    title: "whileHover",
    description: "Pointer ke upar aane par animation chalata hai.",
    category: "gestures",
  },
  {
    id: "while-tap",
    title: "whileTap",
    description: "Press karte waqt feedback animation deta hai.",
    category: "gestures",
  },
  {
    id: "drag",
    title: "drag",
    description: "dragConstraints aur dragElastic ke saath element khichna.",
    category: "gestures",
  },
];

const badgeStyles: Record<Category, string> = {
  presence: "bg-blue-100 text-blue-700",
  layout: "bg-orange-100 text-orange-700",
  gestures: "bg-purple-100 text-purple-700",
};

const spring = { type: "spring", stiffness: 400, damping: 35 } as const;

export default function FilterGridPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const visibleTopics =
    activeFilter === "all"
      ? topics
      : topics.filter((topic) => topic.category === activeFilter);

  return (
    <MotionConfig reducedMotion="user">
      <main className="mx-auto min-h-screen max-w-5xl p-4 sm:p-6">
        <header className="mb-6 space-y-1">
          <h1 className="text-2xl font-bold sm:text-3xl">Bonus: Filter Grid</h1>
          <p className="text-sm text-neutral-500">
            Filter chuno aur cards ko smoothly aate jate dekho.
          </p>
        </header>

        {/* Filter buttons: active pill layoutId se slide karta hai */}
        <div
          className="mb-4 flex flex-wrap gap-2"
          role="group"
          aria-label="Topic filters"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                aria-pressed={isActive}
                className="relative rounded-full border px-4 py-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {isActive && (
                  <motion.span
                    layoutId="active-filter-pill"
                    transition={spring}
                    style={{ borderRadius: 9999 }}
                    className="absolute inset-0 bg-black"
                  />
                )}
                <span
                  className={`relative ${
                    isActive ? "text-white" : "text-neutral-700"
                  }`}
                >
                  {filter.label}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mb-4 text-sm text-neutral-500" aria-live="polite">
          {visibleTopics.length} topics dikh rahe hain
        </p>

        {/* relative zaroori hai popLayout ke liye */}
        <ul className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleTopics.map((topic) => (
              <motion.li
                key={topic.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={spring}
                style={{ borderRadius: 16 }}
                className="border bg-white p-4 shadow-sm"
              >
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeStyles[topic.category]}`}
                >
                  {topic.category}
                </span>
                <h2 className="mt-3 font-semibold">{topic.title}</h2>
                <p className="mt-1 text-sm text-neutral-600">
                  {topic.description}
                </p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </main>
    </MotionConfig>
  );
}