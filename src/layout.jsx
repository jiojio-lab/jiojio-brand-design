/* Spacing, Radius, Shadow, Grid */

const LayoutTab = () => {
  const space = [
    { name: "xs",   px: 4  },
    { name: "sm",   px: 8  },
    { name: "md",   px: 12 },
    { name: "base", px: 16 },
    { name: "lg",   px: 20 },
    { name: "xl",   px: 28 },
    { name: "2xl",  px: 40 },
    { name: "3xl",  px: 56 },
    { name: "4xl",  px: 80 },
  ];
  const radii = [
    { name: "sm",   value: "6px",    use: "Badge, tag" },
    { name: "md",   value: "10px",   use: "Card, input, button" },
    { name: "lg",   value: "16px",   use: "Large panels, modals" },
    { name: "pill", value: "9999px", use: "Pill, avatar" },
  ];
  const shadows = [
    { name: "xs", value: "0 1px 2px rgba(20,20,19,0.04)", use: "Rest state cards" },
    { name: "sm", value: "0 2px 8px rgba(20,20,19,0.06)", use: "Hover, menus" },
    { name: "md", value: "0 4px 16px rgba(20,20,19,0.12)", use: "Modals, floating toolbars" },
  ];
  const bps = [
    { name: "sm", v: "< 640",  use: "Phone"       },
    { name: "md", v: "640–900", use: "Tablet"     },
    { name: "lg", v: "900–1280", use: "Laptop"    },
    { name: "xl", v: "≥ 1280",  use: "Desktop wide"},
  ];

  return (
    <div className="page">
      <PageHeader
        kicker="05 · UI"
        titleEn="Spacing, Radius, Shadow & Grid"
        titleZh="空间、圆角、阴影、栅格"
        lede="The rhythm of the product. A 4-pixel base, four radii, three elevations, four breakpoints. Fewer choices make stronger designs."
      />

      <Section en="Spacing · base 4px" zh="间距:以 4 为底">
        <div className="card" style={{ padding: 24 }}>
          {space.map(s => (
            <div key={s.name} style={{ display: "grid", gridTemplateColumns: "80px 60px 1fr", alignItems: "center", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
              <div className="mono" style={{ fontSize: 12, color: "var(--text)" }}>space-{s.name}</div>
              <div className="mono" style={{ fontSize: 12, color: "var(--text-3)" }}>{s.px}px</div>
              <div style={{ height: 10, width: s.px, background: "var(--accent)", borderRadius: 2 }}/>
            </div>
          ))}
        </div>
      </Section>

      <Section en="Radius" zh="圆角">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {radii.map(r => (
            <div key={r.name} className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ height: 100, background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 72, height: 72, background: "var(--accent)", borderRadius: r.value }}/>
              </div>
              <div style={{ padding: 14, borderTop: "1px solid var(--border)" }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>r-{r.name}</div>
                <div className="mono" style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>{r.value}</div>
                <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 4 }}>{r.use}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section en="Shadow · three elevations only" zh="阴影:仅三级">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {shadows.map(sh => (
            <div key={sh.name} style={{ padding: 24, background: "var(--bg)", borderRadius: "var(--r-md)" }}>
              <div style={{ height: 100, background: "var(--surface)", borderRadius: "var(--r-md)", boxShadow: sh.value, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>
                sh-{sh.name}
              </div>
              <div className="mono" style={{ fontSize: 11, color: "var(--text-3)", marginTop: 12 }}>{sh.value}</div>
              <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 4 }}>{sh.use}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section en="Grid · 12 columns" zh="12 列栅格">
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 8, minHeight: 180 }}>
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{ background: "var(--accent-tint)", borderRadius: 4 }}/>
            ))}
          </div>
          <div className="mono" style={{ fontSize: 11, color: "var(--text-3)", marginTop: 14, display: "flex", justifyContent: "space-between" }}>
            <span>gutter 16–24px</span>
            <span>max-content 1180px</span>
            <span>page padding 56 / 24</span>
          </div>
        </div>
      </Section>

      <Section en="Breakpoints" zh="断点">
        <table className="spec">
          <thead><tr><th>Name</th><th>Range (px)</th><th>Device</th></tr></thead>
          <tbody>
            {bps.map(b => (
              <tr key={b.name}><td className="mono">bp-{b.name}</td><td className="mono">{b.v}</td><td>{b.use}</td></tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section en="Layout principle · no-scroll" zh="不滚动原则">
        <div className="card" style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 24, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 24, letterSpacing: "-0.01em" }}>One screen, one decision.</div>
            <p style={{ fontSize: 13.5, marginTop: 10 }}>Within a single step of a flow, the user should not need to scroll vertically. If the content doesn't fit, the step is doing too much — split it.</p>
            <p style={{ fontSize: 13.5 }}>Numbers align to the bottom (<code className="inline">align-items: flex-end</code>) so the reader's eye lands on the decimal, not the label.</p>
          </div>
          <div style={{ background: "var(--surface-2)", padding: 20, borderRadius: "var(--r-md)", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12 }}>
            {[["Used","68"],["Left","32"],["Total","100"]].map(([k,v]) => (
              <div key={k} style={{ flex: 1 }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.12em" }}>{k.toUpperCase()}</div>
                <div className="mono" style={{ fontSize: 28, fontWeight: 500, color: k === "Used" ? "var(--accent)" : "var(--text)" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

window.LayoutTab = LayoutTab;
