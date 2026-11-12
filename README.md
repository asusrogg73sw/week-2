# Motion Week 2: Layout Animations & Framer Motion Demo

This repository contains practical implementations and demos exploring layout animations using **Motion** (formerly Framer Motion) in a Next.js App Router environment.

## 🚀 What's Covered in This Project

1. **Accordion Layout Animation (Size Change):**
   - Implemented smooth expansion and collapsing using the `layout` prop.
   - Handled text wrapping and container resizing seamlessly with spring physics (`stiffness: 400, damping: 35`).
   - Used `AnimatePresence` with `mode="popLayout"` to prevent layout jumps during exit animations.

2. **Sibling Layout Synchronization:**
   - Applied `layout="position"` to adjacent sibling elements (like the lower section container) to ensure the entire page flows smoothly without sudden jumping or teleportation when an accordion opens or closes.

3. **Grid Shuffle & Sort (Position Change):**
   - Built a dynamic item grid supporting **Shuffle**, **Sort A-Z**, and **Reset** actions.
   - Utilized individual `motion.li` elements with the `layout` prop so elements automatically animate to their new grid positions when reordered.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router, Client Components)
- **Library:** `motion/react` (Framer Motion)
- **Styling:** Tailwind CSS
- **Language:** TypeScript

---

## 📦 Getting Started Locally

1. Clone the repository:
   ```bash
   git clone [https://github.com/asusrogg73sw/week-2.git](https://github.com/asusrogg73sw/week-2.git)