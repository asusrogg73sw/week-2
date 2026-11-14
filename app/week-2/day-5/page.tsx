const CARDS = [
  { id: 1, title: "Color Theory", tag: "Design" },
  { id: 2, title: "React Hooks", tag: "Code" },
  { id: 3, title: "Typography", tag: "Design" },
  { id: 4, title: "TypeScript", tag: "Code" },
  { id: 5, title: "Layout Grids", tag: "Design" },
  { id: 6, title: "Next.js Routing", tag: "Code" },
  { id: 7, title: "Iconography", tag: "Design" },
  { id: 8, title: "API Fetching", tag: "Code" },
];

// Container query demo: card apne parent ki width dekh kar layout badalta hai
function InfoCard({ title }: { title: string }) {
  return (
    <div className="@container">
      <article className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-3 shadow-sm @md:flex-row @md:items-center @md:gap-4 @md:p-4">
        <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-indigo-400 to-fuchsia-400 @md:w-40 @md:shrink-0" />
        <div className="min-w-0">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-neutral-600">
            Narrow container mein stacked, wide container mein side-by-side.
          </p>
        </div>
      </article>
    </div>
  );
}

export default function Day5ResponsivePage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl space-y-12 px-4 py-8 sm:px-6 lg:px-8">
      {/* 1. Fluid typography */}
      <header className="space-y-2">
        <h1 className="text-[clamp(1.75rem,5vw,3rem)] font-bold leading-tight">
          Day 5: Responsive Polish
        </h1>
        <p className="max-w-prose text-sm text-neutral-500 sm:text-base">
          375px se 1440px tak. Browser ko resize karke dekho ke har section kaise badalta hai.
        </p>
      </header>

      {/* 2. Flex: 1D layout (navbar) */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold sm:text-xl">Flex: navbar (1D)</h2>
        <nav
          aria-label="Demo navbar"
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white p-3"
        >
          <span className="font-bold">Logo</span>
          <ul className="flex flex-wrap gap-2 text-sm sm:gap-4">
            <li>Home</li>
            <li>Work</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
          <button
            type="button"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm text-white"
          >
            Get started
          </button>
        </nav>
      </section>

      {/* 3. Grid: 2D layout. Mobile par 2 columns, phir 3, phir 4 */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold sm:text-xl">
          Grid: cards (2D) — 2 / 3 / 4 columns
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {CARDS.map((card) => (
            <li
              key={card.id}
              className="min-w-0 rounded-xl border border-neutral-200 bg-white p-3 shadow-sm sm:p-4"
            >
              <div className="aspect-video rounded-lg bg-gradient-to-br from-sky-300 to-emerald-300" />
              <h3 className="mt-3 truncate text-sm font-semibold sm:text-base">
                {card.title}
              </h3>
              <span className="mt-1 inline-block rounded-full bg-neutral-100 px-2 py-0.5 text-xs">
                {card.tag}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Container queries */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold sm:text-xl">
          Container queries: same component, alag parent width
        </h2>
        <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
          <div>
            <p className="mb-2 text-xs text-neutral-500">Narrow parent (16rem)</p>
            <InfoCard title="Sidebar card" />
          </div>
          <div>
            <p className="mb-2 text-xs text-neutral-500">Wide parent</p>
            <InfoCard title="Main area card" />
          </div>
        </div>
      </section>
    </main>
  );
}