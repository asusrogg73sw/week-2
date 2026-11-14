"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";

type Category = "All" | "Design" | "Code";

type Item = {
  id: number;
  title: string;
  description: string;
  category: Exclude<Category, "All">;
};

const ITEMS: Item[] = [
  { id: 1, title: "Color Theory", description: "Palette aur contrast ke basics", category: "Design" },
  { id: 2, title: "React Hooks", description: "useState, useEffect aur custom hooks", category: "Code" },
  { id: 3, title: "Typography", description: "Font pairing aur hierarchy", category: "Design" },
  { id: 4, title: "TypeScript Basics", description: "Types, interfaces aur generics", category: "Code" },
  { id: 5, title: "Layout Grids", description: "Grid system aur spacing scale", category: "Design" },
  { id: 6, title: "Next.js Routing", description: "App Router aur nested layouts", category: "Code" },
  { id: 7, title: "Iconography", description: "Consistent icon sets banana", category: "Design" },
  { id: 8, title: "API Fetching", description: "Server components mein data fetch", category: "Code" },
];

const FILTERS: Category[] = ["All", "Design", "Code"];

export default function Day4StaggerPage() {
  const [filter, setFilter] = useState<Category>("All");
  const reduceMotion = useReducedMotion();

  const visibleItems =
    filter === "All" ? ITEMS : ITEMS.filter((item) => item.category === filter);

  // Parent (container) variants: orchestration yahin define hoti hai
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delayChildren: 0.1,
        staggerChildren: reduceMotion ? 0 : 0.08,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: reduceMotion ? 0 : 0.04,
        staggerDirection: -1, // exit mein reverse order
      },
    },
  };

  // Child variants: parent ka "hidden/show/exit" naam inherit hota hai
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 22 },
    },
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : -12,
      transition: { duration: 0.15 },
    },
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold sm:text-3xl">Day 4: Staggered List</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Mount par aur filter change par items ek ke baad ek aate hain.
      </p>

      {/* Filter buttons */}
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter items">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              filter === f
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-300 hover:bg-neutral-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* key={filter}: filter badalne par list remount hoti hai, stagger dobara chalta hai */}
      <AnimatePresence mode="wait">
        <motion.ul
          key={filter}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="mt-8 grid gap-3"
        >
          {visibleItems.map((item) => (
            <motion.li
              key={item.id}
              variants={itemVariants}
              className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold">{item.title}</h2>
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs">
                  {item.category}
                </span>
              </div>
              <p className="mt-1 text-sm text-neutral-600">{item.description}</p>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </main>
  );
}