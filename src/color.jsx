/* Color tab — deep dive.
   Fawn 50-900 perceptually-uniform scale (OKLCH-tuned), semantic families
   sharing the same lightness rhythm, WCAG matrix, light/dark pairing,
   and usage rules with do/don't examples. */

/* ---------- Math ---------- */
const _hex2rgb = h => h.replace("#","").match(/.{2}/g).map(x => parseInt(x,16)/255);
const _lum = h => {
  const [r,g,b] = _hex2rgb(h).map(v => v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4));
  return 0.2126*r + 0.7152*g + 0.0722*b;
};
const _ratio = (a, b) => {
  const L1 = _lum(a), L2 = _lum(b);
  return (Math.max(L1,L2)+0.05) / (Math.min(L1,L2)+0.05);
};

/* ---------- The Fawn ramp — perceptually tuned ----------
   Built around the canonical accent #A07E58 (step 400). Stepwise OKLCH lightness
   targets ~ 96, 92, 84, 72, 60, 50, 42, 34, 26, 18 with shared chroma + hue. */
const FAWN = {
  50:  "#F7F1E5",
  100: "#EDE2CC",
  200: "#DCC9A6",
  300: "#C2A77E",
  400: "#A07E58", /* canonical */
  500: "#8C6A48",
  600: "#735639",
  700: "#5A442C",
  800: "#3F2F1E",
  900: "#241B11",
};

/* Neutrals — warm, share Fawn's hue cast so chrome reads as one paper */
const NEUTRAL = {
  50:  "#FAF8F2",
  100: "#F3F0E7",
  200: "#E0DCD0",
  300: "#C2BCAB",
  400: "#9B9587",
  500: "#7F7A6E",
  600: "#5C584E",
  700: "#403D36",
  800: "#26241F",
  900: "#16140F",
};

/* Semantic families at matched lightness rhythm.
   Each family has 50/100/400/700/900 — enough for surface, tint, base, ink, deep. */
const SEMANTIC = {
  info:    { 50: "#EAF2FB", 100: "#D2E3F4", 400: "#5A8AC0", 700: "#2C4E73", 900: "#162A41" },
  success: { 50: "#EEF1E5", 100: "#DDE3C7", 400: "#788C5D", 700: "#3A4830", 900: "#1F2818" },
  warn:    { 50: "#FBF1DD", 100: "#F4E0B5", 400: "#C7923E", 700: "#6E4D1A", 900: "#3D2A0F" },
  danger:  { 50: "#FBE9E6", 100: "#F4CDC8", 400: "#C4453C", 700: "#6E201B", 900: "#3D110D" },
};

/* Light/dark token pairs — each row is one semantic role */
const PAIRS = [
  { token: "bg",            light: NEUTRAL[50],  dark: "#2D271C", role: "Page background", note: "Light: warm paper. Dark: Bark." },
  { token: "surface",       light: "#FFFFFF",    dark: "#362F24", role: "Cards & panels",  note: "Always one tier brighter than bg." },
  { token: "surface-2",     light: NEUTRAL[100], dark: "#3E372B", role: "Inset surfaces",  note: "Code blocks, table headers." },
  { token: "border",        light: NEUTRAL[200], dark: "#483F33", role: "Hairlines",       note: "Visible but quiet." },
  { token: "text",          light: NEUTRAL[900], dark: "#F3EEE2", role: "Primary text",    note: "Highest contrast pair." },
  { token: "text-2",        light: NEUTRAL[600], dark: "#B0A898", role: "Secondary text",  note: "Captions, meta." },
  { token: "text-3",        light: NEUTRAL[400], dark: "#7F7869", role: "Tertiary text",   note: "Hints, decorative." },
  { token: "accent",        light: FAWN[400],    dark: FAWN[400], role: "Brand accent",    note: "Same hue both modes." },
  { token: "accent-tint",   light: FAWN[100],    dark: "derived", role: "Accent wash",     note: "Dark: mixed at runtime." },
];

/* ---------- Shared swatch ---------- */
const Chip = ({ value, label, sub, w = "100%", h = 64 }) => {
  const [copied, setCopied] = React.useState(false);
  return (
    <div onClick={() => { navigator.clipboard?.writeText(value); setCopied(true); setTimeout(()=>setCopied(false), 900); }}
      style={{ cursor: "pointer", width: w }}>
      <div style={{ height: h, background: value, borderRadius: 6, border: "1px solid rgba(0,0,0,0.06)" }}/>
      {label && <div style={{ fontSize: 11.5, marginTop: 6, color: "var(--text-2)" }}>{label}</div>}
      <div className="mono" style={{ fontSize: 10, color: copied ? "var(--success)" : "var(--text-3)", marginTop: 2 }}>
        {copied ? "COPIED" : value}
      </div>
      {sub && <div style={{ fontSize: 10.5, color: "var(--text-3)", marginTop: 1 }}>{sub}</div>}
    </div>
  );
};

const ScaleRow = ({ name, scale, accent }) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
      <h3 className="sub" style={{ margin: 0 }}>{name}</h3>
      <span className="mono" style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.08em" }}>{Object.keys(scale).length} STEPS</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${Object.keys(scale).length}, 1fr)`, gap: 4 }}>
      {Object.entries(scale).map(([k, v]) => (
        <div key={k} style={{ position: "relative" }}>
          <Chip value={v} label={k} h={56}/>
          {accent && k === "400" && (
            <span style={{ position: "absolute", top: -6, right: -2, width: 10, height: 10, borderRadius: "50%", background: "var(--text)", border: "2px solid var(--bg)" }}/>
          )}
        </div>
      ))}
    </div>
  </div>
);

const ColorTab = () => {
  /* Build the contrast matrix programmatically */
  const matrixRows = [
    { fg: NEUTRAL[900], bg: NEUTRAL[50],  label: "text on bg" },
    { fg: NEUTRAL[600], bg: NEUTRAL[50],  label: "text-2 on bg" },
    { fg: NEUTRAL[400], bg: NEUTRAL[50],  label: "text-3 on bg" },
    { fg: NEUTRAL[900], bg: "#FFFFFF",    label: "text on surface" },
    { fg: FAWN[400],    bg: NEUTRAL[50],  label: "accent on bg" },
    { fg: FAWN[700],    bg: FAWN[100],    label: "accent-700 on tint" },
    { fg: "#FFFFFF",    bg: FAWN[400],    label: "white on accent" },
    { fg: NEUTRAL[50],  bg: NEUTRAL[900], label: "bg on text (inv.)" },
    { fg: "#F3EEE2",    bg: "#2D271C",    label: "text on Bark (dark)" },
    { fg: FAWN[400],    bg: "#2D271C",    label: "accent on Bark (dark)" },
    { fg: SEMANTIC.info[700],    bg: SEMANTIC.info[100],    label: "info-ink on tint" },
    { fg: SEMANTIC.success[700], bg: SEMANTIC.success[100], label: "success-ink on tint" },
    { fg: SEMANTIC.warn[700],    bg: SEMANTIC.warn[100],    label: "warn-ink on tint" },
    { fg: SEMANTIC.danger[700],  bg: SEMANTIC.danger[100],  label: "danger-ink on tint" },
  ];

  return (
    <div className="page">
      <PageHeader
        kicker="04 · Foundations"
        titleEn="Color"
        titleZh="色彩系统"
        lede="Three rules. Fawn carries every interaction. Ink carries every fact. Everything else is neutral. Scales are perceptually tuned — equal visual steps, predictable contrast, designed to swap between light Paper and dark Bark without losing rhythm."
      />

      {/* 01 · Semantic rule */}
      <Section en="Semantic rule" zh="语义规则">
        <div className="card" style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: FAWN[400], marginBottom: 12 }}/>
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 22, letterSpacing: "-0.01em" }}>Fawn = output / interaction</div>
            <div style={{ fontSize: 13, color: "var(--text-3)", marginTop: 2 }}>鹿色 · 输出值与交互态</div>
            <p style={{ fontSize: 13.5, marginTop: 10, marginBottom: 0 }}>Primary buttons, selected states, focus rings, computed totals, things that say "this is yours to act on."</p>
          </div>
          <div>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: NEUTRAL[900], marginBottom: 12 }}/>
            <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 22, letterSpacing: "-0.01em" }}>Ink = input / fact</div>
            <div style={{ fontSize: 13, color: "var(--text-3)", marginTop: 2 }}>墨色 · 输入与已知事实</div>
            <p style={{ fontSize: 13.5, marginTop: 10, marginBottom: 0 }}>Body copy, labels, values the user typed in, anything settled and not asking for attention.</p>
          </div>
        </div>
      </Section>

      {/* 02 · Fawn ramp */}
      <Section en="Fawn — 10-step scale" zh="鹿色阶梯">
        <p style={{ marginBottom: 16 }}>
          Tuned in OKLCH so each step feels like an equal jump. Step 400 is the canonical accent. Step 100 is the tint background. Step 700 is the text color when set on tint. Every component reaches into this scale, never inventing intermediate values.
        </p>
        <ScaleRow name="Fawn" scale={FAWN} accent/>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 12 }}>
          <div className="card" style={{ padding: 14 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>50–200 · BACKGROUND</div>
            <p style={{ fontSize: 12.5, margin: "6px 0 0" }}>Tints, washes, hover surfaces. Light enough that any text on top stays legible.</p>
          </div>
          <div className="card" style={{ padding: 14 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>300–500 · INTERACTION</div>
            <p style={{ fontSize: 12.5, margin: "6px 0 0" }}>Buttons, focus rings, links. 400 is canonical. 500 is hover, 600 is pressed.</p>
          </div>
          <div className="card" style={{ padding: 14 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>600–900 · TEXT</div>
            <p style={{ fontSize: 12.5, margin: "6px 0 0" }}>Use when you need an accent-toned text on a tint background. 700 sits on 100; 800 on 50.</p>
          </div>
        </div>
      </Section>

      {/* 03 · Neutrals */}
      <Section en="Neutral — warm paper" zh="中性色">
        <p style={{ marginBottom: 16 }}>
          Hue-cast warm so light surfaces share Fawn's family — never icy. Dark mode rebinds these via the dark-paper picker.
        </p>
        <ScaleRow name="Neutral" scale={NEUTRAL}/>
      </Section>

      {/* 04 · Semantic families */}
      <Section en="Semantic families" zh="语义色族">
        <p style={{ marginBottom: 16 }}>
          Info / Success / Warn / Danger share Fawn's lightness rhythm — same 50/100/400/700/900 stops at matched OKLCH lightness. They sit together at equal optical weight; no single one shouts.
        </p>
        {Object.entries(SEMANTIC).map(([k, scale]) => (
          <ScaleRow key={k} name={k.charAt(0).toUpperCase() + k.slice(1)} scale={scale}/>
        ))}
      </Section>

      {/* 05 · Light/dark pairing */}
      <Section en="Light / dark pairing" zh="明暗对应">
        <p style={{ marginBottom: 16 }}>
          Every semantic token resolves to a primitive in both modes. Most pairs flip across the neutral scale; <code className="inline">accent</code> stays put because the same Fawn reads correctly on both Paper and Bark.
        </p>
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="spec" style={{ margin: 0 }}>
            <thead><tr><th>Token</th><th>Light</th><th>Dark</th><th>Role</th></tr></thead>
            <tbody>
              {PAIRS.map(p => (
                <tr key={p.token}>
                  <td><Copyable value={`--${p.token}`}>--{p.token}</Copyable></td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 24, height: 24, borderRadius: 4, background: p.light, border: "1px solid rgba(0,0,0,0.08)" }}/>
                      <span className="mono" style={{ fontSize: 11 }}>{p.light}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {p.dark === "derived" ? (
                        <span className="mono" style={{ fontSize: 11, color: "var(--text-3)" }}>derived (runtime)</span>
                      ) : (
                        <>
                          <span style={{ width: 24, height: 24, borderRadius: 4, background: p.dark, border: "1px solid rgba(255,255,255,0.1)" }}/>
                          <span className="mono" style={{ fontSize: 11 }}>{p.dark}</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td><div style={{ fontSize: 13 }}>{p.role}</div><div style={{ fontSize: 11.5, color: "var(--text-3)" }}>{p.note}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 06 · Contrast matrix */}
      <Section en="Contrast — WCAG 2.2" zh="对比度矩阵">
        <p style={{ marginBottom: 16 }}>
          Body text needs ≥ 4.5:1 (AA) or ≥ 7:1 (AAA). Large text (18px bold or 24px+) needs ≥ 3:1. UI components and graphics need ≥ 3:1. Every pair below is measured.
        </p>
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="spec" style={{ margin: 0 }}>
            <thead><tr><th>Pair</th><th>Ratio</th><th>AA · text</th><th>AA · large</th><th>AAA · text</th><th>Sample</th></tr></thead>
            <tbody>
              {matrixRows.map(p => {
                const r = _ratio(p.bg, p.fg);
                const aa = r >= 4.5, aaLarge = r >= 3, aaa = r >= 7;
                const dot = ok => ok
                  ? <Icon name="check" size={14} stroke="var(--success)"/>
                  : <Icon name="x" size={14} stroke="var(--danger)"/>;
                return (
                  <tr key={p.label}>
                    <td>
                      <div style={{ fontSize: 13 }}>{p.label}</div>
                      <div className="mono" style={{ fontSize: 10.5, color: "var(--text-3)" }}>{p.fg} / {p.bg}</div>
                    </td>
                    <td className="mono">{r.toFixed(2)}:1</td>
                    <td>{dot(aa)}</td>
                    <td>{dot(aaLarge)}</td>
                    <td>{aaa ? <Icon name="check" size={14} stroke="var(--success)"/> : <span className="mono" style={{ color: "var(--text-3)" }}>—</span>}</td>
                    <td style={{ background: p.bg, color: p.fg, fontWeight: 500, padding: "8px 12px" }}>The quick brown fox</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 07 · Usage */}
      <Section en="Usage" zh="使用规则">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="card" style={{ padding: 18 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--success)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Do · 建议</div>
            <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 4 }}>Total · 总计</div>
            <div className="mono" style={{ fontSize: 28, color: FAWN[400], fontWeight: 500 }}>¥ 1,248.00</div>
            <p style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 10, marginBottom: 0 }}>One Fawn — the number the user is about to confirm.</p>
          </div>
          <div className="card" style={{ padding: 18 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--danger)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Don't · 不要</div>
            <div style={{ fontSize: 12, color: FAWN[400], marginBottom: 4 }}>Total · 总计</div>
            <div className="mono" style={{ fontSize: 28, color: FAWN[400], fontWeight: 500 }}>¥ 1,248.00</div>
            <p style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 10, marginBottom: 0 }}>Two Fawns — the label competes with the value.</p>
          </div>
          <div className="card" style={{ padding: 18 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--success)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Do · 建议</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ padding: "8px 16px", border: "none", borderRadius: 8, background: FAWN[400], color: "#fff", fontWeight: 500, fontSize: 13 }}>Confirm</button>
              <button style={{ padding: "8px 16px", border: "1px solid "+NEUTRAL[200], borderRadius: 8, background: "transparent", color: NEUTRAL[700], fontWeight: 500, fontSize: 13 }}>Cancel</button>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 10, marginBottom: 0 }}>Primary action gets the only Fawn on screen.</p>
          </div>
          <div className="card" style={{ padding: 18 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--danger)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Don't · 不要</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ padding: "8px 16px", border: "none", borderRadius: 8, background: FAWN[400], color: "#fff", fontWeight: 500, fontSize: 13 }}>Confirm</button>
              <button style={{ padding: "8px 16px", border: "none", borderRadius: 8, background: SEMANTIC.danger[400], color: "#fff", fontWeight: 500, fontSize: 13 }}>Delete</button>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 10, marginBottom: 0 }}>Two strong colors fight; demote one to ghost.</p>
          </div>
        </div>
      </Section>

      {/* 08 · Quick reference */}
      <Section en="Quick reference" zh="速查表">
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="spec" style={{ margin: 0 }}>
            <thead><tr><th>If you need</th><th>Use</th><th>Token</th></tr></thead>
            <tbody>
              <tr><td>Primary action background</td><td><span style={{ display: "inline-block", width: 14, height: 14, background: FAWN[400], borderRadius: 3, verticalAlign: "middle", marginRight: 6 }}/>Fawn 400</td><td className="mono" style={{ fontSize: 11 }}>--accent</td></tr>
              <tr><td>Hover background for primary</td><td>Fawn 500</td><td className="mono" style={{ fontSize: 11 }}>--accent-hover</td></tr>
              <tr><td>Selected row / focus tint</td><td>Fawn 100</td><td className="mono" style={{ fontSize: 11 }}>--accent-tint</td></tr>
              <tr><td>Body text</td><td>Neutral 900</td><td className="mono" style={{ fontSize: 11 }}>--text</td></tr>
              <tr><td>Caption / meta</td><td>Neutral 600</td><td className="mono" style={{ fontSize: 11 }}>--text-2</td></tr>
              <tr><td>Disabled label</td><td>Neutral 400</td><td className="mono" style={{ fontSize: 11 }}>--text-3</td></tr>
              <tr><td>Error message</td><td>Danger 700 on Danger 100</td><td className="mono" style={{ fontSize: 11 }}>--danger / --danger-tint</td></tr>
              <tr><td>Success toast</td><td>Success 700 on Success 100</td><td className="mono" style={{ fontSize: 11 }}>--success / --success-tint</td></tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
};

window.ColorTab = ColorTab;
window.FAWN_SCALE = FAWN;
window.NEUTRAL_SCALE = NEUTRAL;
window.SEMANTIC_SCALES = SEMANTIC;
