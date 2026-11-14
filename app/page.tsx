import Link from "next/link";

type DayLink = {
  href: string;
  title: string;
  description: string;
  ready: boolean;
};

const days: DayLink[] = [
  {
    href: "/week-2/day-1",
    title: "Day 1: AnimatePresence",
    description: "Exit animations, mode popLayout vs sync, animated todo list.",
    ready: true,
  },
  {
    href: "/week-2/day-1/wait",
    title: "Day 1 Extra: mode wait",
    description: "Tabs ke saath wait, sync aur popLayout ka comparison.",
    ready: true,
  },
  {
    href: "/week-2/day-2",
    title: "Day 2: Layout Animations & layoutId",
    description: "Card grid jo click par expand hota hai (shared layout transition).",
    ready: true,
  },
  {
    href: "/week-2/day-2/layout-prop",
    title: "Day 2 Extra: layout prop",
    description: "Accordion aur shuffle/sort grid.",
    ready: true,
  },
  {
    href: "/week-2/day-3",
    title: "Day 3: Gestures",
    description: "whileHover, whileTap, drag with constraints.",
    ready: true,
  },
  {
    href: "/week-2/day-4",
    title: "Day 4: Staggered Lists & Variants",
    description: "staggerChildren, delayChildren, when beforeChildren, filter par re-stagger.",
    ready: true,
  },
  {
    href: "/week-2/day-5",
    title: "Day 5: Tailwind Responsive Polish",
    description: "375px se 1440px tak responsive layout.",
    ready: false,
  },
  {
    href: "/week-2/filter-grid",
    title: "Day 6: Filter Grid",
    description: "Responsive grid with filter transitions.",
    ready: true,
  },
  {
    href: "/week-2/animated-card-grid",
    title: "Day 7: Weekly Project",
    description: "animated-card-grid: filter, layout, hover/tap gestures.",
    ready: false,
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 p-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Week 2: Motion Deep Dive</h1>
        <p className="text-neutral-500">
          AnimatePresence, Layout Animations aur Gestures ki practice.
        </p>
      </header>

      <ul className="flex flex-col gap-3">
        {days.map((day) => (
          <li key={day.href}>
            {day.ready ? (
              <Link
                href={day.href}
                className="block rounded-lg border p-4 transition-colors hover:bg-neutral-100"
              >
                <h2 className="font-semibold">{day.title}</h2>
                <p className="text-sm text-neutral-500">{day.description}</p>
              </Link>
            ) : (
              <div
                aria-disabled="true"
                className="rounded-lg border border-dashed p-4 opacity-50"
              >
                <h2 className="font-semibold">{day.title}</h2>
                <p className="text-sm text-neutral-500">
                  {day.description} (jald aa raha hai)
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}