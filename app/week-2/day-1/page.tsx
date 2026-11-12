"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Todo = {
  id: number;
  text: string;
};

type PresenceMode = "popLayout" | "sync";

const initialTodos: Todo[] = [
  { id: 1, text: "AnimatePresence ki theory parhna" },
  { id: 2, text: "Todo list banana" },
  { id: 3, text: "popLayout try karna" },
];

export default function TodoDay1Page() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<PresenceMode>("popLayout");
  const nextId = useRef(initialTodos.length + 1);
  const shouldReduceMotion = useReducedMotion();

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const newTodo: Todo = { id: nextId.current++, text };
    setTodos((prev) => [newTodo, ...prev]);
    setInput("");
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-6 p-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Day 1: AnimatePresence Todo List</h1>
        <p className="text-sm text-neutral-500">
          Item add karo, phir delete karke exit animation dekho.
        </p>
      </header>

      {/* Mode switcher: dono modes ka farq khud dekhne ke liye */}
      <div className="flex gap-2" role="group" aria-label="AnimatePresence mode">
        {(["popLayout", "sync"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
              mode === m ? "bg-black text-white" : "hover:bg-neutral-100"
            }`}
          >
            mode=&quot;{m}&quot;
          </button>
        ))}
      </div>

      <form onSubmit={addTodo} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Naya todo likho..."
          aria-label="Naya todo"
          className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        />
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      {/* relative zaroori hai popLayout ke liye */}
      <ul className="relative flex flex-col gap-2">
        <AnimatePresence mode={mode} initial={false}>
          {todos.map((todo) => (
            <motion.li
              key={todo.id}
              layout={!shouldReduceMotion}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -16, scale: 0.95 }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: 80, scale: 0.9 }
              }
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className="flex items-center justify-between rounded-lg border bg-white px-4 py-3 shadow-sm"
            >
              <span className="text-sm">{todo.text}</span>
              <button
                type="button"
                onClick={() => removeTodo(todo.id)}
                aria-label={`${todo.text} delete karo`}
                className="rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {todos.length === 0 && (
        <p className="text-center text-sm text-neutral-500">
          Koi todo nahi. Naya add karo!
        </p>
      )}
    </main>
  );
}