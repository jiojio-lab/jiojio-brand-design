/* Shared primitives and icon library */

const Icon = ({ name, size = 18, stroke = "currentColor", style, ...rest }) => {
  const s = size;
  const common = {
    width: s, height: s, viewBox: "0 0 24 24",
    fill: "none", stroke, strokeWidth: 2,
    strokeLinecap: "round", strokeLinejoin: "round",
    style: { display: "inline-block", verticalAlign: "middle", ...style },
    ...rest,
  };
  const P = (children) => <svg {...common}>{children}</svg>;
  switch (name) {
    case "compass":    return P(<><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5L13 13l-4.5 2.5L11 11z"/></>);
    case "type":       return P(<><path d="M4 7V5h16v2"/><path d="M9 20h6"/><path d="M12 5v15"/></>);
    case "palette":    return P(<><path d="M12 3a9 9 0 0 0 0 18c1.5 0 2-1 2-2s-.5-2 0-2.5 2 0 3 0a4 4 0 0 0 4-4 9 9 0 0 0-9-9.5z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7" r="1"/><circle cx="17.5" cy="11" r="1"/></>);
    case "layout":     return P(<><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></>);
    case "sparkles":   return P(<><path d="M12 3l1.8 4.5L18 9l-4.2 1.5L12 15l-1.8-4.5L6 9l4.2-1.5z"/><path d="M19 15l.7 1.8L21.5 17.5 19.7 18.2 19 20l-.7-1.8L16.5 17.5l1.8-.7z"/></>);
    case "grid":       return P(<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>);
    case "cube":       return P(<><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5"/><path d="M12 12v9"/><path d="M12 12L4 7.5"/></>);
    case "zap":        return P(<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>);
    case "accessibility":return P(<><circle cx="12" cy="5" r="1.5"/><path d="M5 9l7 1 7-1"/><path d="M12 10v5"/><path d="M8 21l4-6 4 6"/></>);
    case "check":      return P(<path d="M4 12l5 5L20 6"/>);
    case "x":          return P(<><path d="M6 6l12 12"/><path d="M18 6L6 18"/></>);
    case "arrow-right":return P(<><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>);
    case "arrow-up":   return P(<><path d="M12 19V5"/><path d="M6 11l6-6 6 6"/></>);
    case "plus":       return P(<><path d="M12 5v14"/><path d="M5 12h14"/></>);
    case "minus":      return P(<path d="M5 12h14"/>);
    case "search":     return P(<><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></>);
    case "settings":   return P(<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></>);
    case "user":       return P(<><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>);
    case "mail":       return P(<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></>);
    case "bell":       return P(<><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 20a2 2 0 0 0 4 0"/></>);
    case "folder":     return P(<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>);
    case "file":       return P(<><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></>);
    case "heart":      return P(<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>);
    case "star":       return P(<path d="M12 3l2.9 5.9 6.5 1-4.7 4.6 1.1 6.5L12 18l-5.8 3 1.1-6.5L2.6 9.9l6.5-1z"/>);
    case "trash":      return P(<><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></>);
    case "edit":       return P(<><path d="M4 20h4l10-10-4-4L4 16z"/><path d="M14 6l4 4"/></>);
    case "copy":       return P(<><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></>);
    case "download":   return P(<><path d="M12 3v12"/><path d="M6 12l6 6 6-6"/><path d="M4 21h16"/></>);
    case "upload":     return P(<><path d="M12 21V9"/><path d="M6 12l6-6 6 6"/><path d="M4 3h16"/></>);
    case "sun":        return P(<><circle cx="12" cy="12" r="4"/><path d="M12 3v2"/><path d="M12 19v2"/><path d="M3 12h2"/><path d="M19 12h2"/><path d="M5.6 5.6l1.4 1.4"/><path d="M17 17l1.4 1.4"/><path d="M5.6 18.4L7 17"/><path d="M17 7l1.4-1.4"/></>);
    case "moon":       return P(<path d="M20 14.5A8 8 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>);
    case "chevron-down":return P(<path d="M6 9l6 6 6-6"/>);
    case "chevron-right":return P(<path d="M9 6l6 6-6 6"/>);
    case "book":       return P(<><path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 0-2 2z"/><path d="M4 5v14"/></>);
    case "clock":      return P(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>);
    case "info":       return P(<><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/></>);
    case "alert":      return P(<><path d="M12 3L2 20h20z"/><path d="M12 10v4"/><path d="M12 17h.01"/></>);
    case "loader":     return P(<><path d="M12 3v3"/><path d="M12 18v3"/><path d="M5.6 5.6l2.1 2.1"/><path d="M16.3 16.3l2.1 2.1"/><path d="M3 12h3"/><path d="M18 12h3"/><path d="M5.6 18.4l2.1-2.1"/><path d="M16.3 7.7l2.1-2.1"/></>);
    case "link":       return P(<><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></>);
    case "eye":        return P(<><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>);
    case "lock":       return P(<><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 1 1 8 0v4"/></>);
    case "globe":      return P(<><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></>);
    case "filter":     return P(<path d="M3 5h18l-7 8v6l-4-2v-4z"/>);
    case "code":       return P(<><path d="M8 6l-6 6 6 6"/><path d="M16 6l6 6-6 6"/></>);
    case "play":       return P(<path d="M6 4l14 8-14 8z"/>);
    case "target":     return P(<><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>);
    case "layers":     return P(<><path d="M12 3L3 8l9 5 9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 18l9 5 9-5"/></>);
    default: return null;
  }
};

/* PageHeader — used on top of every tab */
const PageHeader = ({ kicker, titleEn, titleZh, lede }) => (
  <header>
    <div className="kicker">{kicker}</div>
    <h1 className="page-title">
      {titleEn}
      {titleZh && <span style={{ display: "block", fontSize: "0.46em", color: "var(--text-3)", marginTop: 4, fontFamily: "var(--font-sans)", fontWeight: 400, letterSpacing: 0 }}>{titleZh}</span>}
    </h1>
    {lede && <p className="page-lede">{lede}</p>}
  </header>
);

/* Section heading bilingual */
const Section = ({ en, zh, children, id }) => (
  <section id={id} style={{ marginTop: 56 }}>
    <h2 className="section">
      {en}
      {zh && <span className="en">— {zh}</span>}
    </h2>
    <div style={{ marginTop: 18 }}>{children}</div>
  </section>
);

/* Simple copy-on-click chip */
const Copyable = ({ value, children, style }) => {
  const [copied, setCopied] = React.useState(false);
  return (
    <span
      onClick={() => {
        navigator.clipboard?.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 900);
      }}
      style={{ cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 11.5, color: copied ? "var(--success)" : "var(--text-2)", transition: "color .2s", ...style }}
      title="Click to copy"
    >
      {copied ? "COPIED" : children ?? value}
    </span>
  );
};

/* Do/Don't pair */
const DoDontRow = ({ doLabel, dontLabel, children }) => (
  <div className="dd">
    <div className="col do">
      <div className="head"><Icon name="check" size={12} stroke="var(--success)" style={{ marginRight: 6 }} />Do · 建议</div>
      <div>{doLabel}</div>
    </div>
    <div className="col dont">
      <div className="head"><Icon name="x" size={12} stroke="var(--danger)" style={{ marginRight: 6 }} />Don't · 不要</div>
      <div>{dontLabel}</div>
    </div>
  </div>
);

Object.assign(window, { Icon, PageHeader, Section, Copyable, DoDontRow });
