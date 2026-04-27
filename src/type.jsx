/* Typography tab — deep dive.
   Full ramp with size/leading/tracking, CN+EN mixing rules,
   OpenType features in use, variable-weight axis, vertical rhythm,
   and copy-paste CSS recipes. */

/* The full ramp — every entry has px/leading/tracking/use case */
const TYPE_RAMP = [
  { token: "display-xl",  px: 72, lh: 1.05, ls: "-0.02em",  weight: 300, family: "serif", use: "Hero / cover only", sample: "Make it feel settled." },
  { token: "display-l",   px: 56, lh: 1.08, ls: "-0.018em", weight: 300, family: "serif", use: "Page title", sample: "A quiet instrument." },
  { token: "display-m",   px: 40, lh: 1.12, ls: "-0.015em", weight: 300, family: "serif", use: "Section opener", sample: "How taste scales." },
  { token: "display-s",   px: 28, lh: 1.18, ls: "-0.012em", weight: 300, family: "serif", use: "Sub-section break", sample: "The shape of focus." },
  { token: "heading-l",   px: 22, lh: 1.3,  ls: "-0.005em", weight: 600, family: "sans",  use: "Card / panel title", sample: "Component anatomy" },
  { token: "heading-m",   px: 18, lh: 1.35, ls: "-0.003em", weight: 600, family: "sans",  use: "Block heading", sample: "Form section" },
  { token: "heading-s",   px: 15, lh: 1.4,  ls: "0",        weight: 600, family: "sans",  use: "Inline heading", sample: "Compact title" },
  { token: "body-l",      px: 17, lh: 1.55, ls: "0",        weight: 400, family: "sans",  use: "Long-form reading", sample: "Body text at 17px sits well for documentation. The line-height stays at 1.55 to keep paragraphs breathing." },
  { token: "body",        px: 15, lh: 1.55, ls: "0",        weight: 400, family: "sans",  use: "Default UI body", sample: "Body text sits at 15px. This is the default reading size across the product." },
  { token: "body-s",      px: 13, lh: 1.5,  ls: "0",        weight: 400, family: "sans",  use: "Help / meta", sample: "Smaller body for help text and table cells." },
  { token: "label",       px: 12, lh: 1.4,  ls: "0.06em",   weight: 600, family: "sans",  use: "Form labels (caps)", sample: "FORM LABEL · 表单标签" },
  { token: "caption",     px: 11.5, lh: 1.45, ls: "0",      weight: 500, family: "sans",  use: "Secondary meta", sample: "Last edited 2 minutes ago" },
  { token: "data-l",      px: 28, lh: 1.1,  ls: "-0.01em",  weight: 500, family: "mono",  use: "KPI / total", sample: "¥ 1,248.00" },
  { token: "data",        px: 15, lh: 1.4,  ls: "0",        weight: 500, family: "mono",  use: "Inline numbers", sample: "3.14159 · 98.7% · 142,389" },
  { token: "code",        px: 13, lh: 1.55, ls: "0",        weight: 400, family: "mono",  use: "Code blocks", sample: "const fawn = oklch(72% 0.05 75)" },
  { token: "micro",       px: 10, lh: 1.4,  ls: "0.12em",   weight: 500, family: "mono",  use: "Eyebrows / kickers", sample: "SECTION · 0.12EM" },
];

const _famVar = f => `var(--font-${f})`;
const _famName = f => ({ serif: "Source Serif 4", sans: "DM Sans", mono: "JetBrains Mono" }[f]);

const TypeTab = () => {
  const ZH = "中文混排时,行高加 0.1,字符间距收紧到 0.02em。";
  const EN = "English copy uses tighter leading and the body sans family.";

  return (
    <div className="page">
      <PageHeader
        kicker="05 · Foundations"
        titleEn="Typography"
        titleZh="字体系统"
        lede="Three faces with one job each. Source Serif 4 carries tone. DM Sans carries voice. JetBrains Mono carries every number. The ramp is sized so any two adjacent steps feel like a clear hierarchy without ever shouting."
      />

      {/* 01 · Three faces */}
      <Section en="Families" zh="三种字体">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            { name: "Source Serif 4", role: "Display",   family: "serif", sample: "Focus", weight: 300, size: 56, use: "Page titles ≥ 22px. Quiet, literary. Weight 300 only.", fallback: "Songti SC, serif" },
            { name: "DM Sans",        role: "Interface", family: "sans",  sample: "Aa 漢", weight: 500, size: 42, use: "Body, buttons, labels, navigation. Weights 400 / 500 / 600.", fallback: "Noto Sans SC, sans-serif" },
            { name: "JetBrains Mono", role: "Data",      family: "mono",  sample: "1,248.00", weight: 500, size: 32, use: "Numbers, ratios, code, eyebrows. Tabular figures on.", fallback: "Menlo, monospace" },
          ].map(f => (
            <div key={f.name} className="card" style={{ padding: 20 }}>
              <div style={{ fontFamily: _famVar(f.family), fontSize: f.size, fontWeight: f.weight, letterSpacing: "-0.01em", color: "var(--text)", lineHeight: 1.05, minHeight: 64 }}>{f.sample}</div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--accent)", marginTop: 18 }}>{f.role}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{f.name}</div>
              <p style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 6, marginBottom: 6 }}>{f.use}</p>
              <div className="mono" style={{ fontSize: 10.5, color: "var(--text-3)" }}>fallback: {f.fallback}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* 02 · Full ramp */}
      <Section en="Ramp — 16 steps" zh="完整字号阶梯">
        <p style={{ marginBottom: 16 }}>
          Each row lists size, leading, tracking and weight. Use the token name in code; never reach for a raw px value. Adjacent steps differ by a perceptual ratio of ~1.18 — close enough to feel calibrated, far enough to read as different levels.
        </p>
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="spec" style={{ margin: 0 }}>
            <thead>
              <tr><th style={{ width: 130 }}>Token</th><th style={{ width: 60 }}>Size</th><th style={{ width: 55 }}>Leading</th><th style={{ width: 80 }}>Tracking</th><th style={{ width: 60 }}>Weight</th><th style={{ width: 80 }}>Family</th><th>Sample</th></tr>
            </thead>
            <tbody>
              {TYPE_RAMP.map(r => (
                <tr key={r.token}>
                  <td><Copyable value={`--type-${r.token}`}>--type-{r.token}</Copyable></td>
                  <td className="mono">{r.px}px</td>
                  <td className="mono">{r.lh}</td>
                  <td className="mono" style={{ fontSize: 11 }}>{r.ls}</td>
                  <td className="mono">{r.weight}</td>
                  <td className="mono" style={{ fontSize: 11 }}>{r.family}</td>
                  <td>
                    <div style={{ fontFamily: _famVar(r.family), fontSize: Math.min(r.px, 28), fontWeight: r.weight, lineHeight: r.lh, letterSpacing: r.ls, color: "var(--text)" }}>
                      {r.sample}
                    </div>
                    <div style={{ fontSize: 10.5, color: "var(--text-3)", marginTop: 4 }}>{r.use}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 03 · CN + EN mixing rules */}
      <Section en="Chinese + English mixing" zh="中英混排">
        <p style={{ marginBottom: 16 }}>
          When CJK and Latin characters share a line, three things must hold: leading widens, tracking tightens, and a thin space sits between scripts. Don't fake it with manual spaces — use the rules below in CSS so it works everywhere.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div className="card" style={{ padding: 20 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--success)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Do · 建议</div>
            <div style={{ fontSize: 17, lineHeight: 1.7, color: "var(--text)" }}>
              这是一段<span style={{ margin: "0 0.125em" }}>mixed</span>排版示例:CJK 用 1.7 行高,Latin 用<span style={{ margin: "0 0.125em" }}>1.5</span>。两者之间留<span style={{ margin: "0 0.125em" }}>0.125em</span>的空隙。
            </div>
            <ul style={{ fontSize: 12, color: "var(--text-2)", marginTop: 12, marginBottom: 0, paddingLeft: 16 }}>
              <li>Line-height 1.65–1.75 for CJK-heavy paragraphs</li>
              <li>0.125em gap between scripts via auto-inserted span or <code className="inline">word-spacing</code></li>
              <li><code className="inline">font-feature-settings: "halt"</code> for tighter Chinese punctuation</li>
              <li>Quote marks: 「」for CJK, "" for Latin — never mix</li>
            </ul>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--danger)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Don't · 不要</div>
            <div style={{ fontSize: 17, lineHeight: 1.4, color: "var(--text)", letterSpacing: "0.05em" }}>
              这是一段mixed排版示例:CJK 和Latin之间没有空隙,行高也太挤。
            </div>
            <ul style={{ fontSize: 12, color: "var(--text-2)", marginTop: 12, marginBottom: 0, paddingLeft: 16 }}>
              <li>1.4 行高让中文挤成一团</li>
              <li>中英之间没有空隙,&quot;mixed&quot; 看起来像中文的延续</li>
              <li>Latin tracking 加宽反而让英文更难读</li>
              <li>用半角逗号代替全角,标点节奏被打断</li>
            </ul>
          </div>
        </div>

        <div className="card" style={{ marginTop: 14, padding: 0, overflow: "hidden" }}>
          <table className="spec" style={{ margin: 0 }}>
            <thead><tr><th>Context</th><th>CJK leading</th><th>Latin leading</th><th>Inter-script gap</th><th>Punctuation</th></tr></thead>
            <tbody>
              <tr><td>Display ≥ 28px</td><td className="mono">1.25</td><td className="mono">1.1</td><td className="mono">0.1em</td><td>Compressed (halt)</td></tr>
              <tr><td>Body 13–17px</td><td className="mono">1.7</td><td className="mono">1.55</td><td className="mono">0.125em</td><td>Compressed (halt)</td></tr>
              <tr><td>Caption ≤ 12px</td><td className="mono">1.6</td><td className="mono">1.45</td><td className="mono">0.1em</td><td>Default</td></tr>
              <tr><td>Tabular data</td><td className="mono">1.4</td><td className="mono">1.4</td><td className="mono">0.1em</td><td>tnum on</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* 04 · OpenType features */}
      <Section en="OpenType features" zh="OpenType 特性">
        <p style={{ marginBottom: 16 }}>
          We don't ship the default font. We ship the font with these features always on. They're the difference between a designer's typography and a developer's.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {[
            {
              tag: "tnum",
              name: "Tabular numerals",
              zh: "等宽数字",
              demo: (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, fontFamily: "var(--font-mono)", fontSize: 18 }}>
                  <div>
                    <div style={{ fontFeatureSettings: "'tnum' 0", color: "var(--text-3)" }}>1,234.56<br/>9,876.54</div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", marginTop: 6 }}>OFF · jagged</div>
                  </div>
                  <div>
                    <div style={{ fontFeatureSettings: "'tnum' 1", color: "var(--text)" }}>1,234.56<br/>9,876.54</div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--success)", marginTop: 6 }}>ON · aligned</div>
                  </div>
                </div>
              ),
              use: "All numeric values, tables, totals, KPIs."
            },
            {
              tag: "kern",
              name: "Kerning",
              zh: "字距调整",
              demo: (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, fontSize: 36, fontFamily: "var(--font-serif)", fontWeight: 300 }}>
                  <div>
                    <div style={{ fontKerning: "none", color: "var(--text-3)" }}>To Wave</div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", marginTop: 6 }}>OFF</div>
                  </div>
                  <div>
                    <div style={{ fontKerning: "normal", color: "var(--text)" }}>To Wave</div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--success)", marginTop: 6 }}>ON</div>
                  </div>
                </div>
              ),
              use: "Always on. Never disable."
            },
            {
              tag: "ss01",
              name: "Stylistic alt — single-storey a",
              zh: "异体字 a",
              demo: (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, fontSize: 36, fontFamily: "var(--font-sans)", fontWeight: 500 }}>
                  <div>
                    <div style={{ color: "var(--text-3)" }}>aa</div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", marginTop: 6 }}>DEFAULT</div>
                  </div>
                  <div>
                    <div style={{ fontFeatureSettings: "'ss01' 1", color: "var(--text)" }}>aa</div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--success)", marginTop: 6 }}>ss01</div>
                  </div>
                </div>
              ),
              use: "Optional. Decorative one-line headlines only."
            },
            {
              tag: "halt",
              name: "Half-width punctuation",
              zh: "半角标点",
              demo: (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, fontSize: 17, lineHeight: 1.5 }}>
                  <div>
                    <div style={{ color: "var(--text-3)" }}>这是,中文。标点。</div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", marginTop: 6 }}>FULL · spaced</div>
                  </div>
                  <div>
                    <div style={{ fontFeatureSettings: "'halt' 1", color: "var(--text)" }}>这是,中文。标点。</div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--success)", marginTop: 6 }}>halt · tight</div>
                  </div>
                </div>
              ),
              use: "All Chinese body copy. Tightens punctuation to half-width."
            },
          ].map(f => (
            <div key={f.tag} className="card" style={{ padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{f.name}</div>
                  <div style={{ fontSize: 11.5, color: "var(--text-3)" }}>{f.zh}</div>
                </div>
                <Copyable value={f.tag}>
                  <span className="mono" style={{ fontSize: 11, padding: "2px 6px", background: "var(--surface-2)", borderRadius: 4 }}>{f.tag}</span>
                </Copyable>
              </div>
              <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "16px 0", margin: "0 0 12px" }}>
                {f.demo}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-2)" }}>{f.use}</div>
            </div>
          ))}
        </div>

        <pre style={{ marginTop: 14, padding: 18, background: "var(--surface-2)", borderRadius: 10, fontSize: 12.5, fontFamily: "var(--font-mono)", lineHeight: 1.55, color: "var(--text)", border: "1px solid var(--border)", overflow: "auto" }}>{`/* Always on, everywhere */
:root {
  font-feature-settings: "kern" 1, "liga" 1;
}

/* Numbers */
.mono, [data-numeric] {
  font-feature-settings: "tnum" 1, "lnum" 1, "zero" 1;
}

/* Chinese-heavy paragraphs */
[lang="zh"], .zh {
  font-feature-settings: "halt" 1, "kern" 1;
  line-height: 1.7;
}`}</pre>
      </Section>

      {/* 05 · Pairing in practice */}
      <Section en="Pairing — in practice" zh="实战配对">
        <div className="card" style={{ padding: 32 }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--accent)" }}>REPORT · 2026</div>
          <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 44, letterSpacing: "-0.018em", lineHeight: 1.08, marginTop: 8, textWrap: "balance", maxWidth: "18ch" }}>
            How independent taste scales.
          </div>
          <p style={{ fontSize: 16, color: "var(--text-2)", marginTop: 14, maxWidth: "52ch", textWrap: "pretty", lineHeight: 1.55 }}>
            The serif sets tone. The sans carries argument. The mono holds the numbers steady. None of them step on each other — and that's the whole trick.
          </p>
          <div style={{ display: "flex", gap: 36, marginTop: 26, flexWrap: "wrap", paddingTop: 20, borderTop: "1px solid var(--border)" }}>
            {[["Users","142,389"],["Retention","87.4%"],["NPS","64"],["MAU","58.2K"]].map(([k,v]) => (
              <div key={k}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--text-3)", textTransform: "uppercase" }}>{k}</div>
                <div className="mono" style={{ fontSize: 28, fontWeight: 500, color: "var(--accent)", marginTop: 4, fontFeatureSettings: "'tnum' 1" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 06 · Vertical rhythm */}
      <Section en="Vertical rhythm" zh="纵向节奏">
        <p style={{ marginBottom: 16 }}>
          Every paragraph spacing is a multiple of 4px. Headings get more space above than below — they belong to the content that follows, not the content that came before.
        </p>
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="spec" style={{ margin: 0 }}>
            <thead><tr><th>Element</th><th>Margin top</th><th>Margin bottom</th><th>Rule</th></tr></thead>
            <tbody>
              <tr><td>Display</td><td className="mono">0</td><td className="mono">24px</td><td>First on page; no top margin needed.</td></tr>
              <tr><td>Heading L → body</td><td className="mono">40px</td><td className="mono">12px</td><td>Big break above, tight below.</td></tr>
              <tr><td>Heading M → body</td><td className="mono">32px</td><td className="mono">8px</td><td>—</td></tr>
              <tr><td>Body → body</td><td className="mono">0</td><td className="mono">12px</td><td>Constant flow.</td></tr>
              <tr><td>Body → list</td><td className="mono">0</td><td className="mono">8px</td><td>Lists hug their lead-in.</td></tr>
              <tr><td>Section → section</td><td className="mono">56px</td><td className="mono">0</td><td>Strong break.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* 07 · Hard rules */}
      <Section en="Rules" zh="排版硬规则">
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
          {[
            ["Max 3 weights per surface", "300 · 500 · 600 is the default set."],
            ["text-wrap: pretty for body", "balance for display headings ≥ 28px."],
            ["Tracking by size", "−0.02em for display, 0 for body, +0.06em for mono caps."],
            ["Line length 50–75ch", "Wider than 75ch loses the eye's line."],
            ["Never mix serif + italic + color", "One emphasis per sentence."],
            ["Numbers always mono with tnum", "Aligned columns, every time."],
            ["No font scaling on hover", "Hover changes color, never size."],
            ["Quote marks match script", "「」for 中文 · \u201C\u201D for English."],
          ].map(([h, b]) => (
            <li key={h} className="card" style={{ padding: 16 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>{h}</div>
              <div style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 4 }}>{b}</div>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
};

window.TypeTab = TypeTab;
window.TYPE_RAMP = TYPE_RAMP;
