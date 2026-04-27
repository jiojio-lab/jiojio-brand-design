/* App shell v2 — Fawn as canonical accent */

const TABS = [
  { key: "brand",     label: "Brand",      sub: "品牌", group: "Brand",       Comp: () => window.BrandTab(),    num: "01" },
  { key: "logo",      label: "Logo",       sub: "标识", group: "Brand",       Comp: () => window.LogoTab(),     num: "02" },
  { key: "tokens",    label: "Tokens",     sub: "令牌", group: "Foundations", Comp: () => window.TokensTab(),   num: "03" },
  { key: "color",     label: "Color",      sub: "色彩", group: "Foundations", Comp: () => window.ColorTab(),    num: "04" },
  { key: "type",      label: "Typography", sub: "字体", group: "Foundations", Comp: () => window.TypeTab(),     num: "05" },
  { key: "layout",    label: "Layout",     sub: "布局", group: "Foundations", Comp: () => window.LayoutTab(),   num: "06" },
  { key: "icon",      label: "Icons",      sub: "图标", group: "Foundations", Comp: () => window.IconTab(),     num: "07" },
  { key: "components",label: "Components", sub: "组件", group: "UI",          Comp: () => window.ComponentsTab(),num: "08" },
  { key: "states",    label: "States",     sub: "状态", group: "UI",          Comp: () => window.StatesTab(),   num: "09" },
  { key: "forms",     label: "Forms",      sub: "表单", group: "UI",          Comp: () => window.FormsTab(),    num: "10" },
  { key: "motion",    label: "Motion",     sub: "动效", group: "UX",          Comp: () => window.MotionTab(),   num: "11" },
  { key: "a11y",      label: "Accessibility", sub: "无障碍", group: "UX",     Comp: () => window.A11yTab(),     num: "12" },
];

const NavIcon = ({ k }) => {
  const map = { brand: "compass", logo: "sparkles", tokens: "layers", color: "palette", type: "type", layout: "layout", icon: "grid", components: "cube", states: "layers", forms: "file", motion: "zap", a11y: "accessibility" };
  return <Icon name={map[k] || "file"} size={14} stroke="currentColor"/>;
};

/* v2 · Fawn canonical. Fawn sits first; the other 23 stay available as tints/tweak options. */
const ACCENTS = [
  { name: "Fawn",       value: "#A07E58", tint: "#E6DACB" },   /* 鹿皮 · v2 canonical */
  { name: "Terracotta", value: "#D97757", tint: "#F5E6DF" },
  { name: "Clay",       value: "#B86B4A", tint: "#EFDFD6" },
  { name: "Rust",       value: "#A8553A", tint: "#EBD8D0" },
  { name: "Amber",      value: "#B8832F", tint: "#EFE4CA" },
  { name: "Ochre",      value: "#B5923C", tint: "#EEE6C9" },
  { name: "Sand",       value: "#BC9870", tint: "#EEE5D5" },
  { name: "Bronze",     value: "#8C6A3C", tint: "#DED2BF" },
  { name: "Olive",      value: "#808950", tint: "#DFE2D1" },
  { name: "Moss",       value: "#6B7F4A", tint: "#D9DFCA" },
  { name: "Sage",       value: "#7D9270", tint: "#DEE4D7" },
  { name: "Pine",       value: "#426B4E", tint: "#CFDCD1" },
  { name: "Teal",       value: "#3C6E6E", tint: "#CFDBDB" },
  { name: "Duck",       value: "#4E7B85", tint: "#D3DEE0" },
  { name: "Steel",      value: "#5B7291", tint: "#D6DDE3" },
  { name: "Denim",      value: "#4A6591", tint: "#D2D8E2" },
  { name: "Iris",       value: "#6A6095", tint: "#DADAE6" },
  { name: "Plum",       value: "#7A4F7A", tint: "#DFD2DF" },
  { name: "Mauve",      value: "#9B6E7C", tint: "#E6D8DC" },
  { name: "Rose",       value: "#B46A75", tint: "#ECD8DB" },
  { name: "Coral",      value: "#C97063", tint: "#F0DCD5" },
  { name: "Peach",      value: "#D4896A", tint: "#F2E2D5" },
  { name: "Graphite",   value: "#4A4A48", tint: "#D4D3CE" },
  { name: "Charcoal",   value: "#2E2E2C", tint: "#CFCEC9" },
];

const AccentSwatcher = ({ value, onChange, onLock }) => {
  const locked = value === ACCENTS[0].value;
  return (
    <div style={{ padding: 12, borderRadius: "var(--r-md)", background: "var(--surface-2)", border: "1px solid var(--border)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--text-3)" }}>ACCENT · FAWN LOCKED</span>
        <span className="mono" style={{ fontSize: 10, color: "var(--accent)", letterSpacing: "0.06em" }}>{ACCENTS.find(a => a.value === value)?.name || "CUSTOM"}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 4 }}>
        {ACCENTS.map((a, i) => (
          <button key={a.value} title={a.name + (i === 0 ? " · canonical" : "")}
            onClick={() => onChange(a)}
            style={{
              aspectRatio: "1 / 1",
              background: a.value,
              border: value === a.value ? "2px solid var(--text)" : "1px solid rgba(0,0,0,0.08)",
              borderRadius: 4,
              cursor: "pointer",
              padding: 0,
              outline: "none",
              boxShadow: value === a.value ? "0 0 0 2px var(--bg)" : "none",
              transform: value === a.value ? "scale(1.08)" : "scale(1)",
              transition: "transform .12s, box-shadow .12s",
              position: "relative",
            }}
          >
            {i === 0 && (
              <span style={{ position: "absolute", top: -4, right: -4, width: 8, height: 8, borderRadius: "50%", background: "var(--text)", border: "1.5px solid var(--bg)" }}/>
            )}
          </button>
        ))}
      </div>
      <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>{value}</span>
        {!locked ? (
          <button onClick={onLock} style={{ background: "transparent", border: "1px solid var(--border)", borderRadius: "var(--r-pill)", padding: "2px 8px", fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--text-2)", letterSpacing: "0.08em", cursor: "pointer" }}>
            RESET TO FAWN
          </button>
        ) : (
          <span style={{ color: "var(--accent)" }}>● canonical</span>
        )}
      </div>
    </div>
  );
};

/* hex mix helper — used for dark-mode tint derivation */
const mixHex = (a, b, t) => {
  const p = h => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
  const [ar,ag,ab] = p(a), [br,bg,bb] = p(b);
  const m = (x,y) => Math.round(x*(1-t) + y*t).toString(16).padStart(2,"0");
  return `#${m(ar,br)}${m(ag,bg)}${m(ab,bb)}`;
};

/* 6 dark papers — warm-tuned to sit with Fawn. Bark is canonical for v2.
   Each one bundles the full surface stack so chrome stays coherent. */
const DARK_PAPERS = [
  { name: "Bark",    sub: "树皮",     bg: "#2D271C", surface: "#362F24", surface2: "#3E372B", border: "#483F33", borderStrong: "#554C40" }, /* v2 canonical */
  { name: "Umber",   sub: "葫袒",     bg: "#262219", surface: "#2F2B22", surface2: "#37332A", border: "#413D33", borderStrong: "#4E4A40" },
  { name: "Taupe",   sub: "灰褐",     bg: "#332D24", surface: "#3C352B", surface2: "#453E33", border: "#4F473C", borderStrong: "#5B5349" },
  { name: "Graphite",sub: "石墨",     bg: "#1F1D18", surface: "#27251F", surface2: "#2F2D26", border: "#38352D", borderStrong: "#45423A" },
  { name: "Ink",     sub: "深黑",     bg: "#16140F", surface: "#1E1C16", surface2: "#26241D", border: "#2F2C24", borderStrong: "#3C382E" },
  { name: "Slate",   sub: "暗灰",     bg: "#1A1A1A", surface: "#232323", surface2: "#2B2B2B", border: "#353535", borderStrong: "#424242" },
];

const DarkPaperPicker = ({ value, onChange }) => {
  return (
    <div style={{ padding: 12, borderRadius: "var(--r-md)", background: "var(--surface-2)", border: "1px solid var(--border)", marginTop: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--text-3)" }}>DARK PAPER</span>
        <span className="mono" style={{ fontSize: 10, color: "var(--accent)", letterSpacing: "0.06em" }}>{DARK_PAPERS.find(p => p.bg === value)?.name || "CUSTOM"}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4 }}>
        {DARK_PAPERS.map(p => (
          <button key={p.bg} title={`${p.name} · ${p.sub} · ${p.bg}`}
            onClick={() => onChange(p)}
            style={{
              aspectRatio: "1 / 1",
              background: p.bg,
              border: value === p.bg ? "2px solid var(--accent)" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: 4, cursor: "pointer", padding: 0, outline: "none",
              boxShadow: value === p.bg ? "0 0 0 2px var(--bg)" : "none",
              transform: value === p.bg ? "scale(1.08)" : "scale(1)",
              transition: "transform .12s, box-shadow .12s",
            }}
          />
        ))}
      </div>
      <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", marginTop: 10, display: "flex", justifyContent: "space-between" }}>
        <span>{value}</span>
        <span>{DARK_PAPERS.length} papers</span>
      </div>
    </div>
  );
};

const App = () => {
  const [active, setActive] = React.useState(() => {
    const h = window.location.hash.replace("#", "");
    return TABS.find(t => t.key === h)?.key || "brand";
  });
  const [theme, setTheme] = React.useState(() => document.documentElement.getAttribute("data-theme") || "light");
  const [accent, setAccent] = React.useState(() => {
    try { const s = JSON.parse(localStorage.getItem("jiojio-v2-accent")); if (s && s.value) return s; } catch(e) {}
    return ACCENTS[0]; /* Fawn */
  });

  const [darkPaper, setDarkPaper] = React.useState(() => {
    try { const s = JSON.parse(localStorage.getItem("jiojio-v2-dark-paper-v2")); if (s && s.bg) return s; } catch(e) {}
    return DARK_PAPERS[0]; /* Bark */
  });

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  /* When dark mode is on, push the selected dark paper's full surface stack.
     When light mode is on, clear those overrides so the CSS :root rule takes over. */
  React.useEffect(() => {
    const root = document.documentElement.style;
    const keys = ["--bg", "--surface", "--surface-2", "--border", "--border-strong"];
    if (theme === "dark") {
      root.setProperty("--bg", darkPaper.bg);
      root.setProperty("--surface", darkPaper.surface);
      root.setProperty("--surface-2", darkPaper.surface2);
      root.setProperty("--border", darkPaper.border);
      root.setProperty("--border-strong", darkPaper.borderStrong);
    } else {
      keys.forEach(k => root.removeProperty(k));
    }
    try { localStorage.setItem("jiojio-v2-dark-paper-v2", JSON.stringify(darkPaper)); } catch(e) {}
  }, [theme, darkPaper]);

  React.useEffect(() => {
    document.documentElement.style.setProperty("--accent", accent.value);
    /* Dark mode needs a much darker tint — the light tint would be searingly bright on a dark surface.
       Derive from the CURRENT dark paper so the tint harmonizes with the chosen background. */
    const darkTint = mixHex(accent.value, darkPaper.bg, 0.78); /* 22% accent, 78% dark bg */
    document.documentElement.style.setProperty("--accent-tint", theme === "dark" ? darkTint : accent.tint);
    try { localStorage.setItem("jiojio-v2-accent", JSON.stringify(accent)); } catch(e) {}
  }, [accent, theme, darkPaper]);

  React.useEffect(() => { window.location.hash = active; }, [active]);

  /* v2-specific palette overrides for downstream tabs to reference */
  React.useEffect(() => {
    window.PALETTE = {
      accent: "#A07E58",
      accentName: "Fawn",
      accentNameZh: "鹿皮",
      inkName: "Ink",
      inkNameZh: "墨色",
      text: "#16140F",
      bg: "#FAF8F2",
      version: "v2",
    };
  }, []);

  const groups = ["Brand", "Foundations", "UI", "UX"];
  const Active = TABS.find(t => t.key === active);

  /* v2 logo signature — the finalized jio wordmark.
     User directive: wordmark is the default brand expression. Seal is reserved for
     small/iconic contexts (favicon, avatar, loading). Inherits --accent so it
     tracks the swatcher in real time. */
  const LogoSig = () => (
    <span style={{
      fontFamily: "var(--font-wordmark)",
      fontWeight: 500,
      fontSize: 30,
      lineHeight: 1,
      letterSpacing: "-0.005em",
      color: "var(--accent)",
      display: "inline-block",
    }}>jio</span>
  );

  return (
    <div className="app">
      <aside className="sidebar" style={{ display: "flex", flexDirection: "column" }}>
        <a className="brand-mark" href="#brand" onClick={() => setActive("brand")}>
          <LogoSig/>
          <span className="tag" style={{ marginLeft: "auto" }}>v2.0 · FAWN</span>
        </a>

        {groups.map(g => (
          <div key={g} className="nav-group">
            <div className="label">{g}</div>
            <div className="nav">
              {TABS.filter(t => t.group === g).map(t => (
                <a key={t.key} className={active === t.key ? "active" : ""} onClick={() => setActive(t.key)}>
                  <NavIcon k={t.key}/>
                  <span>{t.label}</span>
                  <span style={{ fontSize: 11, color: "var(--text-3)", marginLeft: 4 }}>{t.sub}</span>
                  <span className="num">{t.num}</span>
                </a>
              ))}
            </div>
          </div>
        ))}

        <div style={{ marginTop: "auto", paddingTop: 16 }}>
          <AccentSwatcher value={accent.value} onChange={setAccent} onLock={() => setAccent(ACCENTS[0])}/>
          {theme === "dark" && <DarkPaperPicker value={darkPaper.bg} onChange={setDarkPaper}/>}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
            <button className="theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              <Icon name={theme === "light" ? "moon" : "sun"} size={12}/>
              {theme === "light" ? "DARK" : "LIGHT"}
            </button>
            <span className="mono" style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.08em" }}>APR 2026</span>
          </div>
          <div className="sidebar-footer" style={{ marginTop: 14 }}>
            <div className="row"><span>Version</span><span>2.0.0</span></div>
            <div className="row"><span>Accent</span><span style={{ color: "var(--accent)" }}>Fawn · #A07E58</span></div>
            <div className="row"><span>Paper</span><span>{theme === "dark" ? `${darkPaper.name} · ${darkPaper.bg}` : "#FAF8F2"}</span></div>
          </div>
        </div>
      </aside>

      <main>
        <div className="content" key={active}>
          {Active && <Active.Comp/>}
        </div>
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
