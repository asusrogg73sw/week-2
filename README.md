# Motion Week 2: AnimatePresence, Layout Animations & Gestures

This repository contains practical implementations and demos exploring **Motion** (formerly Framer Motion) in a Next.js App Router environment: exit animations, layout animations, shared layout transitions, gestures, and a responsive filter grid.

## 🚀 What's Covered in This Project

1. **Animated Todo List (Day 1):**
   - Used `AnimatePresence` so removed items play an `exit` animation before leaving the DOM.
   - Compared `mode="popLayout"` and `mode="sync"` with a live mode switcher.
   - Used stable, unique `key` values (never the array index).

2. **Tabs with `mode="wait"` (Day 1 Extra):**
   - Compared `wait`, `sync` and `popLayout` on a single-child `AnimatePresence`.
   - Panel changes by `key`, so the old panel exits before the new one enters in `wait` mode.

3. **Shared Layout Transition (Day 2):**
   - Card grid where a clicked card expands into a dialog using `layoutId`.
   - Heading and tag animate along with the card through their own `layoutId`.
   - Closes with Esc, backdrop click or the close button.

4. **Accordion Layout Animation (Size Change):**
   - Implemented smooth expansion and collapsing using the `layout` prop.
   - Handled text stretching with `layout="position"` and spring physics (`stiffness: 400, damping: 35`).
   - Used `AnimatePresence` with `mode="popLayout"` to prevent layout jumps during exit animations.

5. **Sibling Layout Synchronization:**
   - Applied `layout="position"` to the section below the accordion so the whole page flows smoothly without jumping when an item opens or closes.

6. **Grid Shuffle & Sort (Position Change):**
   - Built a dynamic item grid supporting **Shuffle**, **Sort A-Z**, and **Reset** actions.
   - Each `motion.li` has the `layout` prop so items glide to their new grid positions.

7. **Gestures (Day 3):**
   - Button with `whileHover` and `whileTap`.
   - Draggable card with `dragConstraints` (ref based), switchable `dragElastic` values and axis lock.

8. **Responsive Filter Grid (Weekly Objective):**
   - Tailwind grid that changes from 1 to 2 to 3 columns.
   - Filtering uses `AnimatePresence mode="popLayout"` with `layout`, and the active filter pill slides with `layoutId`.

---

## 🧭 Routes

| Route | Demo |
|---|---|
| `/` | Home page linking all demos |
| `/week-2/day-1` | Animated todo list |
| `/week-2/day-1/wait` | `mode="wait"` tabs demo |
| `/week-2/day-2` | `layoutId` card grid and dialog |
| `/week-2/day-2/layout-prop` | Accordion and shuffle/sort grid |
| `/week-2/day-3` | Gesture demos |
| `/week-2/filter-grid` | Responsive filter grid |

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16.4.6 (App Router, Client Components)
- **UI:** React 19.3.0
- **Library:** `motion/react` (Motion ^14.11.1)
- **Styling:** Tailwind CSS 4.3.3
- **Language:** TypeScript

---

## ♿ Accessibility

- Reduced motion is respected with `MotionConfig reducedMotion="user"` (and `useReducedMotion` on the Day 1 pages).
- Toggle buttons use `aria-pressed` and `aria-expanded` where relevant.

## ⚠️ Known Limitations

- The Day 2 dialog has `role="dialog"` but no focus trap, focus return or scroll lock yet.
- The draggable card cannot be moved with the keyboard (a Reset button is provided).
- Responsive polish across all pages is still in progress.

---

## 📦 Getting Started Locally

Requirements: Node.js 20.9 or newer.

1. Clone the repository:
   ```bash
   git clone https://github.com/asusrogg73sw/week-2.git
   cd week-2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

## 🗂️ Project Structure

```text
app/
  page.tsx                     Home page
  week-2/
    day-1/
      page.tsx                 Animated todo list
      wait/page.tsx            mode="wait" tabs demo
    day-2/
      page.tsx                 layoutId card grid
      layout-prop/page.tsx     layout prop demo
    day-3/page.tsx             Gesture demos
    filter-grid/page.tsx       Responsive filter grid
```