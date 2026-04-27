/* Components tab — buttons, cards, badges, tabs, dropdowns, modals, toasts, tables */

/* ---- Buttons ---- */
const Btn = ({ variant = "primary", size = "md", children, icon, disabled, onClick }) => {
  const sizes = {
    sm: { padding: "6px 12px", fontSize: 12.5, radius: 8, iconSize: 14 },
    md: { padding: "9px 16px", fontSize: 13.5, radius: 10, iconSize: 16 },
    lg: { padding: "12px 20px", fontSize: 15, radius: 12, iconSize: 18 },
  }[size];
  const variants = {
    primary:   { bg: "var(--accent)", fg: "#fff", bd: "var(--accent)" },
    secondary: { bg: "var(--bg)", fg: "var(--text)", bd: "var(--border)" },
    ghost:     { bg: "transparent", fg: "var(--text-2)", bd: "transparent" },
    danger:    { bg: "var(--danger)", fg: "#fff", bd: "var(--danger)" },
  }[variant];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: sizes.padding,
        fontSize: sizes.fontSize, fontFamily: "var(--font-sans)", fontWeight: 600,
        background: variants.bg, color: variants.fg,
        border: `1px solid ${variants.bd}`,
        borderRadius: sizes.radius,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "filter .15s, background .15s, border-color .15s",
        lineHeight: 1.2,
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.filter = "brightness(0.96)"; }}
      onMouseLeave={e => e.currentTarget.style.filter = "none"}
    >
      {icon && <Icon name={icon} size={sizes.iconSize} stroke="currentColor"/>}
      {children}
    </button>
  );
};

/* ---- Input ---- */
const Input = ({ placeholder, icon, suffix, defaultValue, error, label }) => {
  const [v, setV] = React.useState(defaultValue || "");
  const [focused, setFocused] = React.useState(false);
  const borderColor = error ? "var(--danger)" : focused ? "var(--accent)" : "var(--border)";
  return (
    <div>
      {label && <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.1em", color: "var(--text-3)", marginBottom: 6, textTransform: "uppercase" }}>{label}</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", border: `1px solid ${borderColor}`, borderRadius: "var(--r-md)", background: "var(--surface)", transition: "border-color .15s" }}>
        {icon && <Icon name={icon} size={16} stroke="var(--text-3)"/>}
        <input
          value={v}
          placeholder={placeholder}
          onChange={e => setV(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ border: "none", outline: "none", background: "transparent", flex: 1, fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text)" }}
        />
        {suffix && <span className="mono" style={{ fontSize: 12, color: "var(--text-3)" }}>{suffix}</span>}
      </div>
      {error && <div style={{ fontSize: 12, color: "var(--danger)", marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}><Icon name="alert" size={12} stroke="var(--danger)"/>{error}</div>}
    </div>
  );
};

/* ---- Badge ---- */
const Badge = ({ tone = "neutral", children }) => {
  const tones = {
    neutral: { bg: "var(--surface-2)", fg: "var(--text-2)" },
    accent:  { bg: "var(--accent-tint)", fg: "var(--accent)" },
    info:    { bg: "var(--info-tint)", fg: "var(--info)" },
    success: { bg: "var(--success-tint)", fg: "var(--success)" },
    danger:  { bg: "var(--danger-tint)", fg: "var(--danger)" },
    warn:    { bg: "var(--warn-tint)", fg: "var(--warn)" },
  }[tone];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, background: tones.bg, color: tones.fg, letterSpacing: "0.02em" }}>{children}</span>
  );
};

/* ---- Toast ---- */
const Toast = ({ tone = "neutral", icon, title, body }) => {
  const tones = {
    neutral: "var(--text-2)",
    success: "var(--success)",
    danger:  "var(--danger)",
    warn:    "var(--warn)",
    info:    "var(--info)",
  }[tone];
  return (
    <div className="card" style={{ padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start", boxShadow: "var(--sh-md)" }}>
      <div style={{ width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
        <Icon name={icon} size={16} stroke={tones}/>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600 }}>{title}</div>
        {body && <div style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 2 }}>{body}</div>}
      </div>
      <Icon name="x" size={14} stroke="var(--text-3)" style={{ cursor: "pointer", marginTop: 3 }}/>
    </div>
  );
};

/* ---- Tabs ---- */
const Tabs = ({ items, value, onChange }) => (
  <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--border)" }}>
    {items.map(i => (
      <button
        key={i}
        onClick={() => onChange(i)}
        style={{
          padding: "10px 14px",
          fontSize: 13, fontWeight: 600,
          background: "transparent",
          border: "none",
          borderBottom: `2px solid ${value === i ? "var(--accent)" : "transparent"}`,
          color: value === i ? "var(--text)" : "var(--text-2)",
          opacity: value === i ? 1 : 0.6,
          cursor: "pointer",
          marginBottom: -1,
          fontFamily: "var(--font-sans)",
        }}
      >{i}</button>
    ))}
  </div>
);

/* ---- Segmented ---- */
const Segmented = ({ items, value, onChange }) => (
  <div style={{ display: "inline-flex", padding: 3, background: "var(--surface-2)", borderRadius: "var(--r-pill)" }}>
    {items.map(i => (
      <button
        key={i}
        onClick={() => onChange(i)}
        style={{
          padding: "5px 12px", fontSize: 12.5, fontWeight: 600,
          background: value === i ? "var(--surface)" : "transparent",
          border: "none", borderRadius: "var(--r-pill)",
          color: value === i ? "var(--text)" : "var(--text-2)",
          boxShadow: value === i ? "var(--sh-xs)" : "none",
          cursor: "pointer", fontFamily: "var(--font-sans)",
        }}
      >{i}</button>
    ))}
  </div>
);

/* ---- Modal preview (static) ---- */
const ModalPreview = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Btn variant="secondary" icon="eye" onClick={() => setOpen(true)}>Open modal preview</Btn>
      {open && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(20,20,19,0.32)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(2px)" }} onClick={() => setOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{ width: 480, background: "var(--surface)", borderRadius: "var(--r-lg)", padding: 24, boxShadow: "var(--sh-md)", border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--text-3)" }}>CONFIRM</div>
                <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 24, letterSpacing: "-0.01em", marginTop: 4 }}>Delete this project?</div>
              </div>
              <Icon name="x" size={16} stroke="var(--text-3)" style={{ cursor: "pointer" }} onClick={() => setOpen(false)}/>
            </div>
            <p style={{ marginTop: 12, fontSize: 13.5 }}>This will remove <span className="mono" style={{ color: "var(--text)" }}>03-onboarding-flow</span> and 14 drafts inside. It can't be undone.</p>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 20 }}>
              <Btn variant="ghost" onClick={() => setOpen(false)}>Cancel</Btn>
              <Btn variant="danger" icon="trash">Delete project</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---- Dropdown ---- */
const Dropdown = () => {
  const [open, setOpen] = React.useState(false);
  const [val, setVal] = React.useState("Weekly");
  const opts = ["Daily", "Weekly", "Monthly", "Never"];
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button onClick={() => setOpen(!open)} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 12px", border: "1px solid var(--border)", borderRadius: "var(--r-md)", background: "var(--surface)", fontSize: 13, color: "var(--text)", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
        {val}
        <Icon name="chevron-down" size={14} stroke="var(--text-3)"/>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, minWidth: 140, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-md)", boxShadow: "var(--sh-sm)", overflow: "hidden", zIndex: 10 }}>
          {opts.map(o => (
            <div key={o} onClick={() => { setVal(o); setOpen(false); }} style={{ padding: "8px 12px", fontSize: 13, cursor: "pointer", color: val === o ? "var(--accent)" : "var(--text)", background: val === o ? "var(--accent-tint)" : "transparent", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {o}
              {val === o && <Icon name="check" size={14} stroke="var(--accent)"/>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ComponentsTab = () => {
  const [tab, setTab] = React.useState("Active");
  const [seg, setSeg] = React.useState("Day");
  return (
    <div className="page">
      <PageHeader
        kicker="07 · UI"
        titleEn="Components"
        titleZh="组件库"
        lede="The working vocabulary of the product. Every component here is live — hover, click, type. What you see is what ships."
      />

      <Section en="Button" zh="按钮">
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <Btn variant="primary" icon="plus">New project</Btn>
            <Btn variant="secondary" icon="download">Export</Btn>
            <Btn variant="ghost" icon="edit">Edit</Btn>
            <Btn variant="danger" icon="trash">Delete</Btn>
          </div>
          <hr className="hr"/>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <Btn variant="primary" size="sm">Small</Btn>
            <Btn variant="primary" size="md">Medium</Btn>
            <Btn variant="primary" size="lg">Large</Btn>
          </div>
        </div>
        <DoDontRow
          doLabel={<div style={{ fontSize: 13.5 }}>Keep primary to one per surface. It's the one thing you want the user to do.</div>}
          dontLabel={<div style={{ fontSize: 13.5 }}>Never disable a button. If something is missing, show a red warning and let them try.</div>}
        />
      </Section>

      <Section en="Input" zh="输入">
        <div className="card" style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Input label="Email" icon="mail" placeholder="you@jiojio.co"/>
          <Input label="Workspace" icon="folder" defaultValue="quiet-studio" suffix=".jiojio.co"/>
          <Input label="Amount" icon="zap" defaultValue="128" suffix="USD"/>
          <Input label="Password" icon="lock" defaultValue="12345" error="At least 8 characters."/>
        </div>
      </Section>

      <Section en="Badge" zh="标签">
        <div className="card" style={{ padding: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Badge>Draft</Badge>
          <Badge tone="accent">Active</Badge>
          <Badge tone="info">Recommended</Badge>
          <Badge tone="success">Completed</Badge>
          <Badge tone="warn">Over budget</Badge>
          <Badge tone="danger">Insufficient</Badge>
        </div>
      </Section>

      <Section en="Tabs & Segmented" zh="标签页与分段">
        <div className="card" style={{ padding: 24 }}>
          <Tabs items={["Active","Archived","Shared","Trash"]} value={tab} onChange={setTab}/>
          <div style={{ padding: "20px 0 0", fontSize: 13, color: "var(--text-2)" }}>Showing: <span className="mono" style={{ color: "var(--accent)" }}>{tab}</span></div>
          <hr className="hr"/>
          <Segmented items={["Day","Week","Month","Year"]} value={seg} onChange={setSeg}/>
        </div>
      </Section>

      <Section en="Dropdown" zh="下拉菜单">
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "var(--text-2)" }}>Sync frequency</span>
            <Dropdown/>
          </div>
        </div>
      </Section>

      <Section en="Toast · Notifications" zh="提示">
        <div style={{ display: "grid", gap: 10, maxWidth: 520 }}>
          <Toast tone="success" icon="check" title="Saved to library" body="2 minutes ago · by you"/>
          <Toast tone="danger"  icon="alert" title="Couldn't connect" body="Check your network and try again."/>
          <Toast tone="info"    icon="info"  title="Draft auto-saves every 3s"/>
          <Toast tone="warn"    icon="alert" title="Your plan is nearly full" body="14 of 15 projects used."/>
        </div>
      </Section>

      <Section en="Card · Selected vs default" zh="卡片">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            { title: "Solo",  price: "$0", desc: "For one person, starting out." },
            { title: "Studio", price: "$18", desc: "For small teams and freelancers.", selected: true },
            { title: "Scale",  price: "$48", desc: "For organisations that ship a lot." },
          ].map(p => (
            <div key={p.title} className="card" style={{ padding: 20, border: `1px solid ${p.selected ? "var(--accent)" : "var(--border)"}`, boxShadow: p.selected ? "var(--sh-sm)" : "var(--sh-xs)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 22, letterSpacing: "-0.01em" }}>{p.title}</div>
                {p.selected && <Badge tone="accent">Current</Badge>}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 12 }}>
                <span className="mono" style={{ fontSize: 28, color: p.selected ? "var(--accent)" : "var(--text)", fontWeight: 500 }}>{p.price}</span>
                <span style={{ fontSize: 12, color: "var(--text-3)" }}>/mo</span>
              </div>
              <p style={{ fontSize: 12.5, marginTop: 10, marginBottom: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section en="Modal · Destructive confirm" zh="弹窗">
        <div className="card" style={{ padding: 24 }}>
          <ModalPreview/>
          <p style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 10, marginBottom: 0 }}>Modals are for decisions, not information. If the user only needs to read it, use a toast or inline panel.</p>
        </div>
      </Section>

      <Section en="Table" zh="表格">
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="spec">
            <thead>
              <tr><th>Project</th><th>Owner</th><th>Status</th><th style={{ textAlign: "right" }}>Budget</th><th style={{ textAlign: "right" }}>Used</th></tr>
            </thead>
            <tbody>
              {[
                { p: "Quiet Studio · Website", o: "Yumi", s: "active",    b: "12,000", u: "8,420", tone: "accent" },
                { p: "Brand refresh v2",       o: "Sasha", s: "shipped",   b: "4,800",  u: "4,800", tone: "success" },
                { p: "Onboarding flow",        o: "Wen",   s: "over",      b: "6,000",  u: "7,120", tone: "danger" },
                { p: "Q2 planning notes",      o: "Tuo",   s: "draft",     b: "—",      u: "—",     tone: "neutral" },
              ].map(r => (
                <tr key={r.p}>
                  <td>{r.p}</td>
                  <td>{r.o}</td>
                  <td><Badge tone={r.tone}>{r.s}</Badge></td>
                  <td className="mono" style={{ textAlign: "right" }}>{r.b}</td>
                  <td className="mono" style={{ textAlign: "right", color: r.tone === "danger" ? "var(--danger)" : "var(--text)" }}>{r.u}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
};

/* expose button etc. for reuse in forms / states tabs */
Object.assign(window, { ComponentsTab, Btn, Input, Badge, Toast, Tabs, Segmented, Dropdown });
