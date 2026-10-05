/* Icon tab */

const ALL_ICONS = [
  "compass","type","palette","layout","sparkles","grid","cube","zap","accessibility",
  "check","x","arrow-right","arrow-up","plus","minus","search","settings","user",
  "mail","bell","folder","file","heart","star","trash","edit","copy","download","upload",
  "sun","moon","chevron-down","chevron-right","book","clock","info","alert","loader",
  "link","eye","lock","globe","filter","code","play","target","layers",
];

const IconTab = () => {
  const [q, setQ] = React.useState("");
  const filtered = ALL_ICONS.filter(n => n.includes(q.toLowerCase()));

  return (
    <div className="page">
      <PageHeader
        kicker="07 · Foundations"
        titleEn="Iconography"
        titleZh="图标系统"
        lede="One stroke width. One palette. No emoji, ever. Icons are punctuation — the sentence must read without them first."
      />

      <Section en="Anatomy" zh="图标构造">
        <div className="card" style={{ padding: 32, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 24, alignItems: "center" }}>
          <div style={{ background: "var(--surface-2)", borderRadius: "var(--r-md)", padding: 32, position: "relative" }}>
            <svg width="100%" viewBox="0 0 120 120">
              {[...Array(12)].map((_, i) => (
                <React.Fragment key={i}>
                  <line x1={i*10} y1="0" x2={i*10} y2="120" stroke="var(--border)" strokeWidth="0.3"/>
                  <line x1="0" y1={i*10} x2="120" y2={i*10} stroke="var(--border)" strokeWidth="0.3"/>
                </React.Fragment>
              ))}
              <rect x="10" y="10" width="100" height="100" rx="2" fill="none" stroke="var(--accent)" strokeDasharray="3 3" strokeWidth="0.6"/>
              <g transform="translate(30, 30) scale(2.5)">
                <circle cx="12" cy="12" r="9" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round"/>
                <path d="M15.5 8.5L13 13l-4.5 2.5L11 11z" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 24, letterSpacing: "-0.01em" }}>24 × 24 box · 20-unit safe area · 2px stroke</div>
            <ul style={{ margin: "14px 0 0", paddingLeft: 18, fontSize: 13.5, color: "var(--text-2)" }}>
              <li><code className="inline">viewBox="0 0 24 24"</code></li>
              <li><code className="inline">stroke-width: 2</code>, never filled</li>
              <li><code className="inline">stroke-linecap: round</code>, <code className="inline">stroke-linejoin: round</code></li>
              <li>Color inherits from <code className="inline">currentColor</code></li>
              <li>All paths snap to the 24-unit grid</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section en="Sizes" zh="尺寸">
        <div className="card" style={{ padding: 24, display: "flex", gap: 32, alignItems: "flex-end", flexWrap: "wrap" }}>
          {[12, 14, 16, 18, 20, 24, 32].map(s => (
            <div key={s} style={{ textAlign: "center" }}>
              <Icon name="compass" size={s} stroke="var(--text-2)"/>
              <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", marginTop: 8 }}>{s}px</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 12, fontSize: 13 }}><span className="mono" style={{ color: "var(--text-3)" }}>16–20px</span> inline with text. <span className="mono" style={{ color: "var(--text-3)" }}>24px</span> for buttons. <span className="mono" style={{ color: "var(--text-3)" }}>32px+</span> as hero glyph.</p>
      </Section>

      <Section en="States" zh="状态">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          {[
            { label: "Default",  color: "var(--text-2)" },
            { label: "Active",   color: "var(--accent)" },
            { label: "Disabled", color: "var(--text-4)" },
            { label: "Danger",   color: "var(--danger)" },
          ].map(s => (
            <div key={s.label} className="card" style={{ padding: 20, textAlign: "center" }}>
              <Icon name="settings" size={28} stroke={s.color}/>
              <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em", marginTop: 10 }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section en={`Library · ${ALL_ICONS.length} icons`} zh="图标库">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, padding: "8px 12px", border: "1px solid var(--border)", borderRadius: "var(--r-md)", background: "var(--surface)" }}>
          <Icon name="search" size={16} stroke="var(--text-3)"/>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search icons…" style={{ border: "none", outline: "none", background: "transparent", flex: 1, fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text)" }}/>
          <span className="mono" style={{ fontSize: 11, color: "var(--text-3)" }}>{filtered.length} / {ALL_ICONS.length}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 6 }}>
          {filtered.map(n => (
            <div
              key={n}
              onClick={() => navigator.clipboard?.writeText(`<Icon name="${n}" />`)}
              title={`Click to copy <Icon name="${n}" />`}
              style={{ aspectRatio: "1 / 1", border: "1px solid var(--border)", borderRadius: "var(--r-md)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", background: "var(--surface)", transition: "border-color .15s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
            >
              <Icon name={n} size={20} stroke="var(--text-2)"/>
              <div className="mono" style={{ fontSize: 10, color: "var(--text-3)" }}>{n}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section en="Rules" zh="图标硬规则">
        <DoDontRow
          doLabel={<div style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon name="check" size={16} stroke="var(--text-2)"/><span>Save draft</span></div>}
          dontLabel={<div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16 }}>✅ Save draft</div>}
        />
      </Section>
    </div>
  );
};

window.IconTab = IconTab;
