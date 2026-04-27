/* Forms tab */

const FormsTab = () => {
  const [plan, setPlan] = React.useState("studio");
  const [agree, setAgree] = React.useState(true);
  const [notif, setNotif] = React.useState(true);
  const [freq, setFreq] = React.useState("Weekly");

  return (
    <div className="page">
      <PageHeader
        kicker="09 · UI"
        titleEn="Forms"
        titleZh="表单"
        lede="Forms are where the user gives us the most. We owe them clarity — labels above, errors inline, progress visible, no traps."
      />

      <Section en="Anatomy" zh="结构">
        <div className="card" style={{ padding: 28, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 32 }}>
          <div>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--accent)" }}>STEP 01 · 03</div>
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 26, letterSpacing: "-0.01em", marginTop: 6 }}>Set up your workspace.</div>
            <p style={{ fontSize: 13.5, color: "var(--text-2)", marginTop: 8 }}>Only four fields. We'll remember the rest.</p>
            <div style={{ height: 3, background: "var(--border)", borderRadius: 2, marginTop: 20, overflow: "hidden" }}>
              <div style={{ width: "33%", height: "100%", background: "var(--accent)" }}/>
            </div>
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            <Input label="Workspace name" placeholder="Quiet Studio" defaultValue="Quiet Studio"/>
            <Input label="Subdomain" suffix=".jiojio.co" defaultValue="quiet-studio"/>
            <div>
              <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.1em", color: "var(--text-3)", marginBottom: 6, textTransform: "uppercase" }}>Timezone</div>
              <Dropdown/>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
              <Btn variant="ghost">Back</Btn>
              <Btn variant="primary" icon="arrow-right">Continue</Btn>
            </div>
          </div>
        </div>
      </Section>

      <Section en="Radio · Plan picker" zh="单选">
        <div className="card" style={{ padding: 24 }}>
          <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.1em", color: "var(--text-3)", marginBottom: 14, textTransform: "uppercase" }}>Choose a plan</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {[
              { id: "solo",   name: "Solo",   price: "$0",  desc: "Just you." },
              { id: "studio", name: "Studio", price: "$18", desc: "Up to 5 people." },
              { id: "scale",  name: "Scale",  price: "$48", desc: "Unlimited seats." },
            ].map(p => (
              <label key={p.id} style={{
                padding: 16, borderRadius: "var(--r-md)",
                border: `1px solid ${plan === p.id ? "var(--accent)" : "var(--border)"}`,
                background: plan === p.id ? "var(--accent-tint)" : "var(--surface)",
                cursor: "pointer", display: "flex", flexDirection: "column", gap: 4,
              }}>
                <input type="radio" checked={plan === p.id} onChange={() => setPlan(p.id)} style={{ position: "absolute", opacity: 0 }}/>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${plan === p.id ? "var(--accent)" : "var(--border-strong)"}`, background: plan === p.id ? "var(--accent)" : "transparent", boxShadow: plan === p.id ? "inset 0 0 0 2px var(--accent-tint)" : "none" }}/>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                </div>
                <div className="mono" style={{ fontSize: 18, color: plan === p.id ? "var(--accent)" : "var(--text)", fontWeight: 500, marginTop: 4 }}>{p.price}</div>
                <div style={{ fontSize: 12, color: "var(--text-3)" }}>{p.desc}</div>
              </label>
            ))}
          </div>
        </div>
      </Section>

      <Section en="Checkbox & Toggle" zh="多选与开关">
        <div className="card" style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div>
            <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.1em", color: "var(--text-3)", marginBottom: 12, textTransform: "uppercase" }}>Checkbox</div>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }} onClick={() => setAgree(!agree)}>
              <div style={{
                width: 18, height: 18, borderRadius: 4,
                border: `1.5px solid ${agree ? "var(--accent)" : "var(--border-strong)"}`,
                background: agree ? "var(--accent)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all .15s", flexShrink: 0, marginTop: 1,
              }}>
                {agree && <Icon name="check" size={12} stroke="#fff"/>}
              </div>
              <div>
                <div style={{ fontSize: 14 }}>Send me the weekly digest.</div>
                <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>Once a week, Friday mornings. No marketing.</div>
              </div>
            </label>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.1em", color: "var(--text-3)", marginBottom: 12, textTransform: "uppercase" }}>Toggle</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 14 }}>Desktop notifications</div>
                <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>Only for @ mentions.</div>
              </div>
              <button onClick={() => setNotif(!notif)} style={{
                width: 40, height: 22, borderRadius: 11,
                background: notif ? "var(--accent)" : "var(--border-strong)",
                border: "none", padding: 2, cursor: "pointer",
                display: "flex", alignItems: "center",
                transition: "background .15s",
              }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", transform: notif ? "translateX(18px)" : "translateX(0)", transition: "transform .18s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}/>
              </button>
            </div>
          </div>
        </div>
      </Section>

      <Section en="Validation · soft vs hard" zh="校验:软提示 / 硬提示">
        <DoDontRow
          doLabel={
            <div>
              <Input label="Password" icon="lock" defaultValue="abc" error="At least 8 characters."/>
              <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 8 }}>Button stays enabled. We help, not block.</div>
            </div>
          }
          dontLabel={
            <div>
              <Input label="Password" icon="lock" defaultValue="abc"/>
              <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end" }}>
                <Btn variant="primary" disabled>Continue</Btn>
              </div>
              <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 8 }}>Disabled button = guess why.</div>
            </div>
          }
        />
      </Section>
    </div>
  );
};

window.FormsTab = FormsTab;
