export const Pillars = () => {
  const pillars = [
    { title: 'Personal coaching', desc: 'A dedicated coach who helps you build sustainable habits around food, movement, and stress.' },
    { title: 'Clinical care', desc: 'Licensed providers review your health, answer your questions, and adjust your plan as you progress.' },
    { title: 'Whole-person support', desc: 'Nutrition, sleep, mindset, and (when appropriate) prescription options — all coordinated in one place.' },
  ];

  return (
    <section className="py-16" style={{ background: '#ffffff' }}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.18em] mb-4" style={{ color: '#2d4a1e' }}>
            What you get
          </p>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight" style={{ fontWeight: 300, color: '#0f1f12' }}>
            More than a prescription — <em style={{ color: '#1a3a1e' }}>a complete plan.</em>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border/30 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-xl mb-2" style={{ fontWeight: 400, color: '#0f1f12' }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#2d4a2a' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
