/* Motion tab */

const MotionTab = () => {
  const [key, setKey] = React.useState(0);
  const replay = () => setKey(k => k + 1);

  const easings = [
    { name: "standard", value: "cubic-bezier(0.2, 0, 0.1, 1)", use: "Default — almost everything." },
    { name: "enter",    value: "cubic-bezier(0, 0, 0.1, 1)",   use: "Things appearing." },
    { name: "exit",     value: "cubic-bezier(0.3, 0, 1, 1)",   use: "Things leaving." },
    { name: "emphasis", value: "cubic-bezier(0.3, 1.4, 0.6, 1)", use: "Rare — a 'yes' celebration." },
  ];
  const durations = [
    { name: "instant", ms: 0,   use: "Hover color, cursor" },
    { name: "fast",    ms: 120, use: "Button press, toggle" },
    { name: "base",    ms: 200, use: "Tabs, tooltips, dropdowns" },
    { name: "slow",    ms: 320, use: "Modals, page transitions" },
    { name: "molasses",ms: 600, use: "Only for celebratory moments" },
  ];

  return (
    <div className="page">
      <PageHeader
        kicker="11 · UX"
        titleEn="Motion"
        titleZh="动效"
        lede="Motion explains cause and effect. It's a verb, not a decoration. If a user can describe what happened without words, the motion worked."
      />

      <Section en="Principles" zh="原则">
        {[
          ["Motion is a verb", "动效是动词", "Every transition should tell the user what changed and where it went."],
          ["Under 320ms", "都在 320ms 以内", "Longer feels slow. Shorter feels abrupt. There are exactly two exceptions."],
          ["One easing by default", "默认只用一种曲线", "cubic-bezier(0.2, 0, 0.1, 1) — calm, confident, no bounce."],
          ["Respect prefers-reduced-motion", "尊重减弱动效偏好", "Replace motion with a 0.1s opacity fade when the user opts out."],
        ].map(([en, zh, body]) => (
          <div key={en} className="card" style={{ padding: 20, marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 22, letterSpacing: "-0.01em" }}>{en}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--text-3)" }}>{zh}</div>
            </div>
            <p style={{ fontSize: 13.5, marginTop: 6, marginBottom: 0 }}>{body}</p>
          </div>
        ))}
      </Section>

      <Section en="Duration" zh="时长">
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="spec">
            <thead><tr><th>Token</th><th>ms</th><th>Use</th></tr></thead>
            <tbody>{durations.map(d => (
              <tr key={d.name}><td className="mono">dur-{d.name}</td><td className="mono">{d.ms}ms</td><td>{d.use}</td></tr>
            ))}</tbody>
          </table>
        </div>
      </Section>

      <Section en="Easing" zh="缓动">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
          {easings.map(e => (
            <div key={e.name} className="card" style={{ padding: 16 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--accent)" }}>EASE-{e.name.toUpperCase()}</div>
              <div style={{ height: 80, marginTop: 10, position: "relative", background: "var(--surface-2)", borderRadius: 8, overflow: "hidden" }}>
                <div key={key} style={{
                  position: "absolute", top: "50%", marginTop: -8,
                  width: 16, height: 16, borderRadius: "50%", background: "var(--accent)",
                  animation: `slide 1.4s ${e.value} infinite alternate`,
                }}/>
              </div>
              <div className="mono" style={{ fontSize: 10.5, color: "var(--text-3)", marginTop: 10 }}>{e.value}</div>
              <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 4 }}>{e.use}</div>
            </div>
          ))}
        </div>
        <style>{`@keyframes slide { from { left: 8px; } to { left: calc(100% - 24px); } }`}</style>
      </Section>

      <Section en="Patterns · replay" zh="常见模式">
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <Btn variant="secondary" icon="play" onClick={replay}>Replay all</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          <div className="card" style={{ padding: 24, textAlign: "center" }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em", marginBottom: 16 }}>FADE + RISE</div>
            <div key={key} style={{ fontSize: 22, fontFamily: "var(--font-serif)", fontWeight: 300, animation: "fadeRise 400ms cubic-bezier(0.2,0,0.1,1) both" }}>Hello.</div>
          </div>
          <div className="card" style={{ padding: 24, textAlign: "center" }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em", marginBottom: 16 }}>SCALE IN · modal</div>
            <div key={key} style={{ width: 100, height: 60, margin: "0 auto", background: "var(--accent)", borderRadius: 10, animation: "scaleIn 320ms cubic-bezier(0.2,0,0.1,1) both" }}/>
          </div>
          <div className="card" style={{ padding: 24, textAlign: "center" }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em", marginBottom: 16 }}>SHAKE · error</div>
            <div key={key} style={{ width: 160, height: 36, margin: "0 auto", background: "var(--danger-tint)", border: "1px solid var(--danger)", borderRadius: 10, animation: "shake 300ms cubic-bezier(0.3,0,1,1)" }}/>
          </div>
          <div className="card" style={{ padding: 24, textAlign: "center" }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em", marginBottom: 16 }}>CHECK DRAW · success</div>
            <svg key={key} width="48" height="48" viewBox="0 0 48 48" style={{ margin: "0 auto", display: "block" }}>
              <circle cx="24" cy="24" r="20" fill="none" stroke="var(--success)" strokeWidth="2" strokeDasharray="126" strokeDashoffset="126" style={{ animation: "dash 500ms cubic-bezier(0.2,0,0.1,1) forwards" }}/>
              <path d="M14 24 l7 7 l13 -14" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40" strokeDashoffset="40" style={{ animation: "dash 400ms 300ms cubic-bezier(0.2,0,0.1,1) forwards" }}/>
            </svg>
          </div>
        </div>
        <style>{`
          @keyframes fadeRise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
          @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
          @keyframes shake { 0%{transform:none} 25%{transform:translateX(-6px)} 50%{transform:translateX(6px)} 75%{transform:translateX(-4px)} 100%{transform:none} }
          @keyframes dash { to { stroke-dashoffset: 0; } }
        `}</style>
      </Section>

      <Section en="Don't" zh="别做">
        <DoDontRow
          doLabel={<div style={{ fontSize: 13 }}>Fade + rise 6px over 200ms. The user notices the change, not the motion.</div>}
          dontLabel={<div style={{ fontSize: 13 }}>Bounce, flip, or spring a UI element. Spring physics on every button is a sugar rush.</div>}
        />
      </Section>
    </div>
  );
};

window.MotionTab = MotionTab;
