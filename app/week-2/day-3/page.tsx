"use client";

import { useRef, useState } from "react";
import { MotionConfig, motion } from "motion/react";

type DragAxis = "both" | "x" | "y";

const elasticOptions = [0, 0.2, 0.6] as const;
const axisOptions: DragAxis[] = ["both", "x", "y"];

const spring = { type: "spring", stiffness: 400, damping: 17 } as const;

export default function Day3Page() {
  // Part 1: button
  const [taps, setTaps] = useState(0);

  // Part 2: draggable card
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [elastic, setElastic] = useState<number>(0.2);
  const [axis, setAxis] = useState<DragAxis>("both");
  const [isDragging, setIsDragging] = useState(false);
  const [resetCount, setResetCount] = useState(0);

  return (
    <MotionConfig reducedMotion="user">
      <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-10 p-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold">Day 3: Gestures</h1>
          <p className="text-sm text-neutral-500">
            Button par hover aur click karo, phir card ko drag karo.
          </p>
        </header>

        {/* ---------- Part 1: whileHover + whileTap ---------- */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">1. whileHover + whileTap</h2>

          <div className="flex items-center gap-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={spring}
              onClick={() => setTaps((count) => count + 1)}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Mujhe dabao
            </motion.button>

            <p className="text-sm text-neutral-600" aria-live="polite">
              Taps: <span className="font-semibold">{taps}</span>
            </p>
          </div>

          <p className="text-xs text-neutral-500">
            Note: touch devices par hover trigger nahi hota, sirf tap chalta hai.
          </p>
        </section>

        {/* ---------- Part 2: drag + constraints + elastic ---------- */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">2. drag + dragConstraints</h2>

          {/* dragElastic selector */}
          <div className="space-y-1">
            <p className="text-sm font-medium">dragElastic</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="dragElastic value">
              {elasticOptions.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setElastic(value)}
                  aria-pressed={elastic === value}
                  className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                    elastic === value ? "bg-black text-white" : "hover:bg-neutral-100"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* drag axis selector */}
          <div className="space-y-1">
            <p className="text-sm font-medium">drag axis</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Drag axis">
              {axisOptions.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAxis(value)}
                  aria-pressed={axis === value}
                  className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                    axis === value ? "bg-black text-white" : "hover:bg-neutral-100"
                  }`}
                >
                  {value}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setResetCount((count) => count + 1)}
                className="rounded-md border px-3 py-1.5 text-sm hover:bg-neutral-100"
              >
                Reset position
              </button>
            </div>
          </div>

          {/* Constraints area: card is dabbe ke andar rahega */}
          <div
            ref={constraintsRef}
            className="relative flex h-72 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed bg-neutral-50"
          >
            <motion.div
              key={resetCount}
              drag={axis === "both" ? true : axis}
              dragConstraints={constraintsRef}
              dragElastic={elastic}
              whileDrag={{ scale: 1.08, boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              style={{ borderRadius: 16 }}
              aria-label="Draggable card"
              className="w-40 cursor-grab touch-none select-none bg-gradient-to-br from-fuchsia-500 to-purple-600 p-4 text-white shadow-lg active:cursor-grabbing"
            >
              <p className="text-xs uppercase tracking-wide opacity-80">Draggable</p>
              <p className="mt-1 font-semibold">Mujhe khicho</p>
              <p className="mt-2 text-xs opacity-90">
                {isDragging ? "Dragging..." : "Chhor diya"}
              </p>
            </motion.div>
          </div>

          <p className="text-xs text-neutral-500">
            Drag mouse aur touch se chalta hai. Keyboard users ke liye abhi sirf Reset button hai.
          </p>
        </section>
      </main>
    </MotionConfig>
  );
}