// components/sections/ValueProps.tsx
export default function ValueProps() {
  const items = [
    {
      title: "Handpicked Inventory",
      desc: "Every listing is verified for quality, views, and build details.",
    },
    {
      title: "On-Ground Experts",
      desc: "From first call to closing, get white-glove, end-to-end support.",
    },
    {
      title: "Transparent Pricing",
      desc: "No surprises. Clear comparables, market intel, and fees.",
    },
  ];

  return (
    <section className="border-y border-neutral-100 bg-neutral-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid gap-6 sm:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl border border-neutral-200 bg-white p-5"
            >
              <h3 className="text-sm font-semibold">{it.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
