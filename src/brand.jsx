/* Brand tab — story, personality, voice, principles */

const BrandTab = () => {
  const principles = [
    { en: "Obsessive", zh: "强迫症", body: "We notice the 1px. A misaligned edge is a crack in trust. Nothing ships until it feels settled." },
    { en: "Independent taste", zh: "独立审美", body: "We don't follow trends. We study first principles, then decide for ourselves. Taste is a position, not a mood." },
    { en: "Subtract, then subtract", zh: "做减法,再做减法", body: "Remove the ornament. Remove the second CTA. Remove the explanation. Clarity is earned by what we cut." },
    { en: "Focus is the gift", zh: "让用户更 Focus", body: "Every pixel either earns attention or steals it. We design so people can think about their thing, not ours." },
  ];

  const voice = [
    { a: "Plain", b: "Clever",      side: "a", note: "Clarity over cleverness. A pun can wait." },
    { a: "Warm",  b: "Corporate",   side: "a", note: "Write like a thoughtful friend, not a committee." },
    { a: "Certain", b: "Hedgy",     side: "a", note: "State the default. Offer the edge case in parens." },
    { a: "Specific", b: "Generic",  side: "a", note: '\"Save draft every 3s\" beats \"Works automatically.\"' },
    { a: "Quiet",   b: "Loud",      side: "a", note: "No exclamation marks. Ever. Let the product be the emphasis." },
  ];

  return (
    <div className="page">
      <PageHeader
        kicker="01 · Brand"
        titleEn="A quiet instrument for focused minds."
        titleZh="为专注的心,造一件安静的工具。"
        lede="jiojio is a brand with a compass, not a flag. We don't need to be seen — we need to be trusted. This section defines who we are, how we speak, and what we refuse to do."
      />

      <Section en="Mission" zh="我们为什么存在">
        <div className="card" style={{ padding: 32 }}>
          <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 30, lineHeight: 1.25, letterSpacing: "-0.01em", color: "var(--text)", maxWidth: "24ch", textWrap: "balance" }}>
            Remove the noise between a person and the thing they're trying to do.
          </div>
          <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontStyle: "italic", fontSize: 20, lineHeight: 1.4, color: "var(--text-2)", marginTop: 16, maxWidth: "26ch" }}>
            让人与他想做的事之间,只剩下那件事。
          </div>
        </div>
      </Section>

      <Section en="Principles" zh="四条硬原则">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          {principles.map((p, i) => (
            <div key={p.en} className="card" style={{ padding: 20 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--accent)" }}>0{i+1}</div>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 22, letterSpacing: "-0.01em", marginTop: 8 }}>{p.en}</div>
              <div style={{ fontSize: 13, color: "var(--text-3)", marginTop: 2 }}>{p.zh}</div>
              <p style={{ fontSize: 13.5, marginTop: 10, marginBottom: 0 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section en="Voice · Position on every axis" zh="语气:五个刻度">
        <p>Pick the left side by default. The right side costs attention we haven't earned.</p>
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--r-lg)", background: "var(--surface)", overflow: "hidden" }}>
          {voice.map((v, i) => (
            <div key={v.a} style={{ display: "grid", gridTemplateColumns: "1fr 200px 1fr 2fr", alignItems: "center", padding: "14px 18px", borderBottom: i < voice.length-1 ? "1px solid var(--border)" : "none", gap: 16 }}>
              <div style={{ textAlign: "right", fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 20, letterSpacing: "-0.01em", color: "var(--text)" }}>{v.a}</div>
              <div style={{ position: "relative", height: 2, background: "var(--border)", borderRadius: 2 }}>
                <div style={{ position: "absolute", top: -4, left: v.side === "a" ? 8 : "calc(100% - 18px)", width: 10, height: 10, borderRadius: "50%", background: "var(--accent)" }}/>
              </div>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 20, letterSpacing: "-0.01em", color: "var(--text-4)", textDecoration: "line-through", textDecorationColor: "var(--text-4)" }}>{v.b}</div>
              <div style={{ fontSize: 12.5, color: "var(--text-2)" }}>{v.note}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section en="Copy in practice" zh="文案实战">
        <DoDontRow
          doLabel={
            <div>
              <div className="mono" style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 8 }}>EMPTY STATE</div>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 22, letterSpacing: "-0.01em", marginBottom: 4 }}>Nothing here yet.</div>
              <div style={{ fontSize: 13.5, color: "var(--text-2)" }}>Start by importing a file — or create one from scratch.</div>
            </div>
          }
          dontLabel={
            <div>
              <div className="mono" style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 8 }}>EMPTY STATE</div>
              <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>🚀 Let's get started!!</div>
              <div style={{ fontSize: 13.5, color: "var(--text-2)" }}>Oops, looks like there's nothing here. No worries — click the big button below to unlock your productivity journey!</div>
            </div>
          }
        />
        <DoDontRow
          doLabel={<div className="mono" style={{ fontSize: 13 }}>Couldn't save. Check your connection and try again.</div>}
          dontLabel={<div className="mono" style={{ fontSize: 13 }}>Error 1047b: Request failed due to unknown network condition. Please try again later.</div>}
        />
      </Section>

      <Section en="Non-negotiables" zh="永远不做的事">
        <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
          {[
            ["No emoji in product surfaces.", "产品内不出现 emoji。"],
            ["No exclamation marks in UI copy.", "UI 文案不使用感叹号。"],
            ["No gradients on logo or typography.", "Logo 和正文排版不使用渐变。"],
            ["No drop shadow larger than 16px blur.", "投影模糊半径不超过 16px。"],
            ["No more than three type weights per surface.", "同一界面字重不超过三种。"],
            ["Never disable a button. Warn in red instead.", "永不禁用按钮,用红色提示代替。"],
          ].map(([en, zh]) => (
            <li key={en} style={{ display: "grid", gridTemplateColumns: "24px 1fr", padding: "12px 0", borderBottom: "1px solid var(--border)", alignItems: "start" }}>
              <Icon name="x" size={14} stroke="var(--danger)" style={{ marginTop: 4 }}/>
              <div>
                <div style={{ color: "var(--text)", fontSize: 14 }}>{en}</div>
                <div style={{ color: "var(--text-3)", fontSize: 13 }}>{zh}</div>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
};

window.BrandTab = BrandTab;
