/* Logo tab — finalized single-direction system.
   Wordmark is the default brand expression. Seal (吉) is the alternate mark,
   reserved for favicon / avatar / small iconic contexts. Both read from
   --accent so theme changes propagate automatically. */

/* ---------- Atomic logo components ---------- */

const Wordmark = ({ size = 72, color }) => (
  <span style={{
    fontFamily: "var(--font-wordmark)",
    fontWeight: 500,
    fontSize: size,
    lineHeight: 1,
    letterSpacing: "-0.005em",
    color: color || "var(--accent)",
    display: "inline-block",
  }}>jio</span>
);

/* Seal: 吉 in Noto Serif SC 900 on rounded square, fill = accent.
   Padding stays ~12% of side to keep the glyph optically centered. */
const Seal = ({ size = 80, fill, inkFill }) => {
  const pad = size < 20 ? size * 0.05 : size < 32 ? size * 0.075 : size * 0.117;
  const radius = Math.max(2, size * 0.04);
  const inner = size - pad * 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", flexShrink: 0 }}>
      <rect x={pad} y={pad} width={inner} height={inner} rx={radius} fill={fill || "var(--accent)"}/>
      <text
        x={size / 2}
        y={size / 2}
        fontFamily="var(--font-cn-serif)"
        fontWeight="900"
        fontSize={inner * 0.88}
        textAnchor="middle"
        dominantBaseline="central"
        fill={inkFill || "var(--bg)"}
      >吉</text>
    </svg>
  );
};

/* Full lockup: seal + hairline divider + wordmark. */
const Lockup = ({ size = 72, color, sealFill, inkFill }) => {
  const sealSize = size;
  const dividerHeight = size * 0.75;
  const gap = size * 0.25;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap }}>
      <Seal size={sealSize} fill={sealFill} inkFill={inkFill}/>
      <span style={{ width: 1, height: dividerHeight, background: "var(--border-strong)", display: "block" }}/>
      <Wordmark size={size} color={color}/>
    </div>
  );
};

/* ---------- Stage — shared card container for showcases ---------- */

const Stage = ({ label, children, minHeight = 240, dark = false, style }) => (
  <div
    style={{
      position: "relative",
      background: dark ? "var(--text)" : "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--r-lg)",
      padding: "56px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight,
      overflow: "hidden",
      ...style,
    }}
  >
    {label && (
      <span className="mono" style={{
        position: "absolute", top: 12, left: 14,
        fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
        color: dark ? "rgba(255,255,255,0.45)" : "var(--text-3)",
      }}>{label}</span>
    )}
    {children}
  </div>
);

/* ---------- Tab ---------- */

const LogoTab = () => {
  return (
    <div className="page">
      <PageHeader
        kicker="02 · Brand"
        titleEn="Logo system"
        titleZh="标识系统"
        lede="Two pieces: a wordmark jio set in EB Garamond, and a seal mark 吉 set on a rounded square. Both read from the accent token — change the theme accent and the logo tracks it automatically. The wordmark is the default; the seal is reserved for favicon, avatar, and small iconic contexts."
      />

      {/* 01 · Primary lockup */}
      <Section en="Primary" zh="主形态">
        <p style={{ marginBottom: 20 }}>
          Default display is the wordmark alone — quiet, editorial, it sits well in running text, headers, and signatures. The lockup adds the seal for moments that need a stronger brand signal (cover pages, marketing, loading states).
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Stage label="Default · wordmark" minHeight={280}>
            <Wordmark size={128}/>
          </Stage>
          <Stage label="Lockup · wordmark + seal" minHeight={280}>
            <Lockup size={96}/>
          </Stage>
        </div>
      </Section>

      {/* 02 · Elements */}
      <Section en="Elements" zh="构成">
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 12 }}>
          <Stage label="Wordmark · EB Garamond 500" minHeight={200}>
            <Wordmark size={104}/>
          </Stage>
          <Stage label="Seal · 吉" minHeight={200}>
            <Seal size={140}/>
          </Stage>
        </div>
        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <table className="spec">
            <tbody>
              <tr><td><Copyable value="EB Garamond">Typeface</Copyable></td><td className="mono">EB Garamond · 500 · lowercase</td></tr>
              <tr><td><Copyable value="-0.005em">Tracking</Copyable></td><td className="mono">−0.005em</td></tr>
              <tr><td>Color</td><td><code className="inline">var(--accent)</code></td></tr>
              <tr><td>Min size</td><td className="mono">14px digital · 6mm print</td></tr>
            </tbody>
          </table>
          <table className="spec">
            <tbody>
              <tr><td>Character</td><td style={{ fontFamily: "var(--font-cn-serif)", fontWeight: 900, fontSize: 18 }}>吉</td></tr>
              <tr><td>Typeface</td><td className="mono">Noto Serif SC · 900</td></tr>
              <tr><td>Shape</td><td className="mono">Rounded square · radius = size ÷ 25</td></tr>
              <tr><td>Min size</td><td className="mono">16px · readable at favicon</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* 03 · Size ladder */}
      <Section en="Size ladder" zh="尺寸梯度">
        <p style={{ marginBottom: 16 }}>
          The seal stays legible down to 16px — the 吉 strokes scale with inner padding so the negative space never closes up. The wordmark floors at 14px.
        </p>
        <div className="card" style={{ padding: 24 }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--text-3)", marginBottom: 16 }}>SEAL</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 36, flexWrap: "wrap" }}>
            {[128, 64, 40, 32, 24, 16].map(s => (
              <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <Seal size={s}/>
                <span className="mono" style={{ fontSize: 10, color: "var(--text-3)" }}>{s}px{s === 16 ? " · favicon" : ""}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 24, marginTop: 12 }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--text-3)", marginBottom: 16 }}>WORDMARK</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 36, flexWrap: "wrap" }}>
            {[96, 64, 40, 24, 14].map(s => (
              <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <Wordmark size={s}/>
                <span className="mono" style={{ fontSize: 10, color: "var(--text-3)" }}>{s}px{s === 14 ? " · min" : ""}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 04 · Clear space */}
      <Section en="Clear space" zh="安全距离">
        <p style={{ marginBottom: 16 }}>
          <strong>X = seal height ÷ 4.</strong> Nothing comes within 1X on any side. In the lockup, the hairline divider equals 1X from both the seal and the wordmark.
        </p>
        <Stage label="X = seal ÷ 4" minHeight={280}>
          <svg width="520" height="200" viewBox="0 0 520 200" style={{ maxWidth: "100%", height: "auto" }}>
            {/* clear-space inner box */}
            <rect x="130" y="30" width="120" height="120" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 4" opacity="0.5"/>
            {/* clear-space outer (1X margin) */}
            <rect x="100" y="0" width="180" height="180" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 4"/>
            <text x="110" y="18" fontFamily="var(--font-mono)" fontSize="10" fill="var(--accent)">1X</text>
            {/* seal */}
            <g transform="translate(144, 44)">
              <rect width="92" height="92" rx="4" fill="var(--accent)"/>
              <text x="46" y="46" fontFamily="var(--font-cn-serif)" fontWeight="900" fontSize="80" textAnchor="middle" dominantBaseline="central" fill="var(--bg)">吉</text>
            </g>
            {/* divider */}
            <line x1="290" y1="40" x2="290" y2="140" stroke="var(--border-strong)" strokeWidth="1"/>
            {/* wordmark */}
            <text x="310" y="120" fontFamily="var(--font-wordmark)" fontWeight="500" fontSize="90" fill="var(--accent)" letterSpacing="-0.5">jio</text>
          </svg>
        </Stage>
      </Section>

      {/* 05 · Color modes */}
      <Section en="Color modes" zh="配色模式">
        <p style={{ marginBottom: 16 }}>
          <strong>Wordmark fill and seal background both bind to <code className="inline">--accent</code>.</strong> Change the accent swatcher in the sidebar and watch this page update. On dark paper, the accent naturally reads against the ink character inside the seal.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          <Stage label="Light · on paper" minHeight={200}>
            <Lockup size={64}/>
          </Stage>
          <div style={{ position: "relative", background: "var(--text)", border: "1px solid var(--text)", borderRadius: "var(--r-lg)", padding: "56px 32px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
            <span className="mono" style={{ position: "absolute", top: 12, left: 14, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Dark · on ink</span>
            <Lockup size={64} color="var(--accent)" sealFill="var(--accent)" inkFill="var(--text)"/>
          </div>
          <Stage label="Mono · single ink" minHeight={200}>
            <Lockup size={64} color="var(--text)" sealFill="var(--text)" inkFill="var(--bg)"/>
          </Stage>
        </div>
      </Section>

      {/* 06 · Applications */}
      <Section en="Applications" zh="实际应用">
        <p style={{ marginBottom: 16 }}>
          Wordmark for text contexts (headers, signatures, footers). Seal for iconic contexts (favicon, avatar, app icon). Lockup reserved for cover moments.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12 }}>
          {/* Browser tab */}
          <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", gap: 16, minHeight: 170 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--surface-2)", borderRadius: 20, padding: "8px 16px 8px 8px" }}>
              <Seal size={18}/>
              <span style={{ fontSize: 12, color: "var(--text-2)" }}>jio.app</span>
            </div>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--text-3)", textTransform: "uppercase" }}>Browser tab · 16px</span>
          </div>
          {/* App icon */}
          <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", gap: 16, minHeight: 170 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 14,
              background: "var(--accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px -4px rgba(0,0,0,0.18)"
            }}>
              <span style={{ fontFamily: "var(--font-cn-serif)", fontWeight: 900, fontSize: 48, color: "var(--bg)", lineHeight: 1 }}>吉</span>
            </div>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--text-3)", textTransform: "uppercase" }}>App icon · 14px radius</span>
          </div>
          {/* Avatar */}
          <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", gap: 16, minHeight: 170 }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "var(--accent-tint)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Seal size={40}/>
            </div>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--text-3)", textTransform: "uppercase" }}>Avatar · circular</span>
          </div>
          {/* Web header */}
          <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", gap: 16, minHeight: 170 }}>
            <Wordmark size={32}/>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--text-3)", textTransform: "uppercase" }}>Web header · wordmark</span>
          </div>
          {/* Email signature */}
          <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", gap: 16, minHeight: 170 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Seal size={24}/>
                <Wordmark size={20}/>
              </div>
              <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", marginTop: 8, letterSpacing: "0.06em" }}>a quiet workspace</div>
            </div>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--text-3)", textTransform: "uppercase" }}>Email signature</span>
          </div>
          {/* Document cover */}
          <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", gap: 16, minHeight: 170, background: "var(--surface-2)" }}>
            <Lockup size={28}/>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--text-3)", textTransform: "uppercase" }}>Cover · lockup</span>
          </div>
        </div>
      </Section>

      {/* 07 · Motion */}
      <Section en="Motion" zh="动效">
        <p style={{ marginBottom: 16 }}>
          Loading states stamp the seal down — rotate −3°, scale 1 → 1.15 → 1 over 2s, opacity 0 → 1 in the first 25%. Gives the mark a little weight and calls back to its physical origin.
        </p>
        <Stage label="Stamp · loading" minHeight={240}>
          <style>{`
            @keyframes logo-stamp {
              0% { transform: scale(1) rotate(-3deg); opacity: 0; }
              25% { transform: scale(1.15) rotate(-3deg); opacity: 1; }
              45%, 100% { transform: scale(1) rotate(-3deg); opacity: 1; }
            }
            .logo-stamp-anim { animation: logo-stamp 2s ease-out infinite; transform-origin: center; }
          `}</style>
          <div className="logo-stamp-anim">
            <Seal size={100}/>
          </div>
        </Stage>
      </Section>

      {/* 08 · Misuse */}
      <Section en="Misuse" zh="错误用法">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          {[
            { label: "Don't stretch", bad: <div style={{ transform: "scaleX(1.6)", transformOrigin: "center" }}><Seal size={60}/></div> },
            { label: "Don't recolor", bad: <Seal size={70} fill="#4E7ABF"/> },
            { label: "Don't swap character", bad: (
              <svg width="70" height="70" viewBox="0 0 70 70">
                <rect x="8" y="8" width="54" height="54" rx="3" fill="var(--accent)"/>
                <text x="35" y="35" fontFamily="var(--font-wordmark)" fontWeight="700" fontSize="42" textAnchor="middle" dominantBaseline="central" fill="var(--bg)">J</text>
              </svg>
            )},
            { label: "Don't change typeface", bad: <span style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: 48, color: "var(--accent)" }}>jio</span> },
            { label: "Don't uppercase", bad: <Wordmark size={48} /> /* shown uppercased */ },
            { label: "Don't skip divider", bad: (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <Seal size={34}/>
                <Wordmark size={34}/>
              </div>
            )},
          ].map(({ label, bad }, i) => (
            <div key={label} className="card" style={{ padding: 16, textAlign: "center", position: "relative", minHeight: 150, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <span style={{ position: "absolute", top: 10, right: 10, width: 20, height: 20, borderRadius: "50%", background: "var(--danger)", color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</span>
              <div style={{ height: 80, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.92 }}>
                {i === 4 ? <span style={{ fontFamily: "var(--font-wordmark)", fontWeight: 500, fontSize: 48, color: "var(--accent)", letterSpacing: "-0.005em" }}>JIO</span> : bad}
              </div>
              <div className="mono" style={{ fontSize: 10, color: "var(--text-2)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 09 · Spec */}
      <Section en="Spec" zh="技术规范">
        <p style={{ marginBottom: 16 }}>
          Copy any value. The token bindings mean a single change to <code className="inline">--accent</code> propagates to both wordmark fill and seal background — no hand-syncing needed.
        </p>
        <div className="card" style={{ padding: 0 }}>
          <table className="spec" style={{ margin: 0 }}>
            <tbody>
              <tr><td style={{ width: 180 }}><span className="mono" style={{ color: "var(--text-3)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>Accent token</span></td><td><code className="inline">--accent</code> — currently <Copyable value="#A07E58" style={{ display: "inline-flex", verticalAlign: "baseline" }}>#A07E58 (Fawn)</Copyable>. Both wordmark fill and seal background read from this.</td></tr>
              <tr><td><span className="mono" style={{ color: "var(--text-3)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>Wordmark</span></td><td>EB Garamond · weight 500 · lowercase · letter-spacing −0.005em · color <code className="inline">var(--accent)</code></td></tr>
              <tr><td><span className="mono" style={{ color: "var(--text-3)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>Seal character</span></td><td><span style={{ fontFamily: "var(--font-cn-serif)", fontWeight: 900, fontSize: 18 }}>吉</span> · Noto Serif SC · weight 900</td></tr>
              <tr><td><span className="mono" style={{ color: "var(--text-3)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>Seal shape</span></td><td>Rounded square · radius = size ÷ 25 · fill <code className="inline">var(--accent)</code> · inner character fill <code className="inline">var(--bg)</code></td></tr>
              <tr><td><span className="mono" style={{ color: "var(--text-3)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>Seal padding</span></td><td>≈ 12% of side on all four sides · character optically centered</td></tr>
              <tr><td><span className="mono" style={{ color: "var(--text-3)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>Clear space</span></td><td>X = seal height ÷ 4 · nothing within 1X on any side</td></tr>
              <tr><td><span className="mono" style={{ color: "var(--text-3)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>Min size</span></td><td>Seal 16px · Wordmark 14px · Lockup 20px seal</td></tr>
              <tr><td><span className="mono" style={{ color: "var(--text-3)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>Lockup</span></td><td>gap seal → divider = 1X · gap divider → wordmark = 1X · divider height = seal × 0.75 · divider color <code className="inline">var(--border-strong)</code></td></tr>
              <tr><td><span className="mono" style={{ color: "var(--text-3)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>Motion · stamp</span></td><td>rotate(−3°) · scale 1 → 1.15 → 1 · 2s · ease-out · opacity 0 → 1 in first 25%</td></tr>
              <tr><td><span className="mono" style={{ color: "var(--text-3)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>Defaults</span></td><td>Use wordmark by default. Switch to seal only when the context demands an icon (favicon, avatar, loading). Use lockup for brand-forward moments.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
};

/* Export */
window.LogoTab = LogoTab;
window.LogoWordmark = Wordmark;
window.LogoSeal = Seal;
window.LogoLockup = Lockup;
