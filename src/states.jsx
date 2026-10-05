/* States — empty, error, loading */

const StateCard = ({ title, children, width = 1 }) => (
  <div className="card" style={{ padding: 0, overflow: "hidden", gridColumn: `span ${width}` }}>
    <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--border)", background: "var(--surface-2)" }}>
      <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--text-3)", textTransform: "uppercase" }}>{title}</div>
    </div>
    <div style={{ padding: 28, minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
      {children}
    </div>
  </div>
);

const Skeleton = ({ w = "100%", h = 12, style }) => (
  <div style={{
    width: w, height: h,
    borderRadius: 4,
    background: "linear-gradient(90deg, var(--surface-2) 0%, var(--border) 50%, var(--surface-2) 100%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.6s linear infinite",
    ...style,
  }}/>
);

const StatesTab = () => {
  React.useEffect(() => {
    const id = "shimmer-kf";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = "@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } } @keyframes spin { to { transform: rotate(360deg); } }";
      document.head.appendChild(s);
    }
  }, []);

  return (
    <div className="page">
      <PageHeader
        kicker="09 · UI"
        titleEn="States"
        titleZh="状态"
        lede="Empty, loading, error. Three states the default case hides. A product that handles them with care is a product that respects the user's time."
      />

      <Section en="Empty" zh="空状态">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <StateCard title="First-run empty">
            <div style={{ textAlign: "center", maxWidth: 320 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--accent-tint)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <Icon name="folder" size={24} stroke="var(--accent)"/>
              </div>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 22, letterSpacing: "-0.01em" }}>No projects yet.</div>
              <p style={{ fontSize: 13, marginTop: 8, marginBottom: 16 }}>Start with an empty canvas, or import a file from your computer.</p>
              <div style={{ display: "inline-flex", gap: 8 }}>
                <Btn variant="primary" icon="plus">New project</Btn>
                <Btn variant="secondary" icon="upload">Import</Btn>
              </div>
            </div>
          </StateCard>
          <StateCard title="Search no-results">
            <div style={{ textAlign: "center", maxWidth: 320 }}>
              <Icon name="search" size={28} stroke="var(--text-3)"/>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 22, letterSpacing: "-0.01em", marginTop: 14 }}>Nothing matches <span className="mono" style={{ color: "var(--text)" }}>"quite strudio"</span>.</div>
              <p style={{ fontSize: 13, marginTop: 8 }}>Try fewer words, or <a className="in" href="#">clear filters</a>.</p>
            </div>
          </StateCard>
        </div>
      </Section>

      <Section en="Loading" zh="加载中">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <StateCard title="Skeleton">
            <div style={{ width: "100%", maxWidth: 360 }}>
              <Skeleton w="40%" h={10} style={{ marginBottom: 12 }}/>
              <Skeleton h={16} style={{ marginBottom: 10 }}/>
              <Skeleton w="86%" style={{ marginBottom: 8 }}/>
              <Skeleton w="72%" style={{ marginBottom: 18 }}/>
              <div style={{ display: "flex", gap: 8 }}>
                <Skeleton w={60} h={24} style={{ borderRadius: 12 }}/>
                <Skeleton w={80} h={24} style={{ borderRadius: 12 }}/>
              </div>
            </div>
          </StateCard>
          <StateCard title="Spinner · inline">
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}/>
                <span style={{ fontSize: 13, color: "var(--text-2)" }}>Syncing…</span>
              </div>
              <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", marginTop: 10, letterSpacing: "0.08em" }}>12 OF 42 FILES</div>
            </div>
          </StateCard>
        </div>
      </Section>

      <Section en="Error" zh="错误">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <StateCard title="Inline, non-blocking">
            <div style={{ width: "100%", maxWidth: 360 }}>
              <div style={{ padding: "12px 14px", background: "var(--danger-tint)", borderRadius: "var(--r-md)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Icon name="alert" size={16} stroke="var(--danger)" style={{ marginTop: 1 }}/>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--danger)" }}>Couldn't save.</div>
                  <div style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 2 }}>Check your connection — we'll retry in <span className="mono">5s</span>.</div>
                </div>
              </div>
            </div>
          </StateCard>
          <StateCard title="Full-page error">
            <div style={{ textAlign: "center", maxWidth: 320 }}>
              <Icon name="alert" size={28} stroke="var(--danger)"/>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 22, letterSpacing: "-0.01em", marginTop: 14 }}>Something broke on our side.</div>
              <p style={{ fontSize: 13, marginTop: 6 }}>We've been paged. <a className="in" href="#">Try again</a> or <a className="in" href="#">contact us</a>.</p>
              <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", marginTop: 12, letterSpacing: "0.08em" }}>REF · 2026-04-24-14:02:08-A1</div>
            </div>
          </StateCard>
        </div>
        <p style={{ marginTop: 14, fontSize: 13 }}>Never lecture the user. State what happened, why it matters, what we're doing. Keep it under two sentences.</p>
      </Section>

      <Section en="Copywriting for states" zh="状态文案">
        <DoDontRow
          doLabel={<div className="mono" style={{ fontSize: 13 }}>Couldn't save. Check your connection and try again.</div>}
          dontLabel={<div className="mono" style={{ fontSize: 13 }}>Uh oh! Something went terribly wrong. Please try again later, or contact our support team.</div>}
        />
      </Section>
    </div>
  );
};

window.StatesTab = StatesTab;
