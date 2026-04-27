/* Tokens tab — 3-layer architecture: primitive → semantic → component.
   Shows the cascade, lets you inspect any token's resolution,
   exports W3C Design Tokens JSON and plain CSS variables. */

/* ============================================================ */
/* TOKEN DEFINITIONS — source of truth for the whole system      */
/* ============================================================ */

const PRIMITIVE_TOKENS = {
  color: {
    /* Neutral warm scale — tuned to sit with Fawn */
    neutral: {
      50:  { light: "#FAF8F2", dark: "#2D271C" },
      100: { light: "#F3F1E9", dark: "#362F24" },
      200: { light: "#E0DDD1", dark: "#3E372B" },
      300: { light: "#C2BFB2", dark: "#483F33" },
      400: { light: "#9B978B", dark: "#554C40" },
      500: { light: "#7F7B70", dark: "#7F7869" },
      600: { light: "#6B675C", dark: "#B0A898" },
      700: { light: "#4A4740", dark: "#D5CEBE" },
      800: { light: "#2D2B26", dark: "#E8E2D3" },
      900: { light: "#16140F", dark: "#F3EEE2" },
    },
    /* Fawn scale — the canonical accent. Depth to be deepened in Color tab. */
    fawn: {
      50:  "#F5EFE4",
      100: "#E6DACB",
      200: "#D3BFA0",
      300: "#BFA27A",
      400: "#A07E58",  /* ← canonical accent */
      500: "#8E6D4A",
      600: "#7A5E3E",  /* ← fawn-deep */
      700: "#5E4730",
      800: "#463425",
      900: "#2C2017",
    },
    /* Semantic palettes */
    info:    { base: "#6A9BCC", tint: "#E0EDF7", ink: "#2C4E73" },
    success: { base: "#788C5D", tint: "#E8EDDF", ink: "#3A4830" },
    danger:  { base: "#C4453C", tint: "#FCEEED", ink: "#6E201B" },
    warn:    { base: "#C7923E", tint: "#FDF3E3", ink: "#6E4D1A" },
  },
  radius: {
    none: "0px",
    sm:   "6px",
    md:   "10px",
    lg:   "16px",
    pill: "9999px",
  },
  shadow: {
    xs: { light: "0 1px 2px rgba(20,20,19,0.04)",  dark: "0 1px 2px rgba(0,0,0,0.3)" },
    sm: { light: "0 2px 8px rgba(20,20,19,0.06)",  dark: "0 2px 8px rgba(0,0,0,0.4)" },
    md: { light: "0 4px 16px rgba(20,20,19,0.12)", dark: "0 4px 16px rgba(0,0,0,0.5)" },
  },
  font: {
    sans:     `"DM Sans", "Noto Sans SC", ui-sans-serif, system-ui, sans-serif`,
    serif:    `"Source Serif 4", "Noto Serif SC", Georgia, serif`,
    mono:     `"JetBrains Mono", ui-monospace, Menlo, monospace`,
    wordmark: `"EB Garamond", "Source Serif 4", Georgia, serif`,
    "cn-serif": `"Noto Serif SC", serif`,
  },
  size: {
    /* Type scale — full ramp to be explored in Typography tab */
    xs: "11px", sm: "12.5px", base: "15px", md: "17px", lg: "22px",
    xl: "28px", "2xl": "34px", "3xl": "42px", "4xl": "52px", "5xl": "64px",
  },
  space: {
    /* 4pt scale */
    0: "0px", 1: "4px", 2: "8px", 3: "12px", 4: "16px",
    5: "20px", 6: "24px", 8: "32px", 10: "40px", 12: "48px", 16: "64px",
  },
};

/* Semantic tokens — each maps to a primitive. Dark-mode is a separate mapping. */
const SEMANTIC_TOKENS = [
  { token: "bg",              light: "color.neutral.50",   dark: "color.neutral.50",  role: "Page background" },
  { token: "surface",         light: "color.white",        dark: "color.neutral.100", role: "Raised surfaces" },
  { token: "surface-2",       light: "color.neutral.100",  dark: "color.neutral.200", role: "Nested / inset surfaces" },
  { token: "border",          light: "color.neutral.200",  dark: "color.neutral.200", role: "Default divider" },
  { token: "border-strong",   light: "color.neutral.300",  dark: "color.neutral.300", role: "Emphasized divider" },
  { token: "text",            light: "color.neutral.900",  dark: "color.neutral.900", role: "Primary text" },
  { token: "text-2",          light: "color.neutral.600",  dark: "color.neutral.600", role: "Secondary text" },
  { token: "text-3",          light: "color.neutral.400",  dark: "color.neutral.500", role: "Tertiary / meta" },
  { token: "text-4",          light: "color.neutral.300",  dark: "color.neutral.400", role: "Disabled / hint" },
  { token: "accent",          light: "color.fawn.400",     dark: "color.fawn.400",    role: "Brand accent" },
  { token: "accent-tint",     light: "color.fawn.100",     dark: "derived",           role: "Accent background wash" },
  { token: "accent-on-dark",  light: "color.fawn.400",     dark: "color.fawn.400",    role: "Logo accent on dark paper" },
  { token: "info",            light: "color.info.base",    dark: "color.info.base",   role: "Informational" },
  { token: "info-tint",       light: "color.info.tint",    dark: "derived",           role: "Info background wash" },
  { token: "success",         light: "color.success.base", dark: "color.success.base",role: "Success" },
  { token: "success-tint",    light: "color.success.tint", dark: "derived",           role: "Success background" },
  { token: "danger",          light: "color.danger.base",  dark: "color.danger.base", role: "Destructive / error" },
  { token: "danger-tint",     light: "color.danger.tint",  dark: "derived",           role: "Danger background" },
  { token: "warn",            light: "color.warn.base",    dark: "color.warn.base",   role: "Warning" },
  { token: "warn-tint",       light: "color.warn.tint",    dark: "derived",           role: "Warning background" },
  { token: "r-sm",            light: "radius.sm",          dark: "radius.sm",         role: "Small radius — chips, tags" },
  { token: "r-md",            light: "radius.md",          dark: "radius.md",         role: "Medium — inputs, buttons" },
  { token: "r-lg",            light: "radius.lg",          dark: "radius.lg",         role: "Large — cards, panels" },
  { token: "r-pill",          light: "radius.pill",        dark: "radius.pill",       role: "Pill — badges" },
  { token: "sh-xs",           light: "shadow.xs",          dark: "shadow.xs",         role: "Hairline elevation" },
  { token: "sh-sm",           light: "shadow.sm",          dark: "shadow.sm",         role: "Card elevation" },
  { token: "sh-md",           light: "shadow.md",          dark: "shadow.md",         role: "Overlay / modal" },
  { token: "font-sans",       light: "font.sans",          dark: "font.sans",         role: "Body / UI" },
  { token: "font-serif",      light: "font.serif",         dark: "font.serif",        role: "Editorial / display" },
  { token: "font-mono",       light: "font.mono",          dark: "font.mono",         role: "Code / meta / numerics" },
  { token: "font-wordmark",   light: "font.wordmark",      dark: "font.wordmark",     role: "Logo wordmark only" },
  { token: "font-cn-serif",   light: "font.cn-serif",      dark: "font.cn-serif",     role: "CJK serif (logo seal)" },
];

/* Component tokens — flat list of (component, key, ref) rows.
   Keys with dots are displayed as-is; references point into the semantic layer. */
const COMPONENT_TOKENS_REAL = [
  { component: "button.primary", tokens: [
    { key: "bg",           ref: "accent" },
    { key: "bg-hover",     ref: "fawn.500" },
    { key: "bg-pressed",   ref: "fawn.600" },
    { key: "text",         ref: "bg" },
    { key: "radius",       ref: "r-md" },
    { key: "shadow",       ref: "sh-xs" },
  ]},
  { component: "button.ghost", tokens: [
    { key: "bg",           ref: "transparent" },
    { key: "bg-hover",     ref: "surface-2" },
    { key: "border",       ref: "border" },
    { key: "border-hover", ref: "border-strong" },
    { key: "text",         ref: "text" },
    { key: "radius",       ref: "r-md" },
  ]},
  { component: "card", tokens: [
    { key: "bg",           ref: "surface" },
    { key: "border",       ref: "border" },
    { key: "radius",       ref: "r-lg" },
    { key: "shadow",       ref: "sh-xs" },
    { key: "padding",      ref: "space.5" },
  ]},
  { component: "input", tokens: [
    { key: "bg",           ref: "surface" },
    { key: "border",       ref: "border" },
    { key: "border-focus", ref: "accent" },
    { key: "text",         ref: "text" },
    { key: "placeholder",  ref: "text-3" },
    { key: "radius",       ref: "r-md" },
  ]},
  { component: "badge", tokens: [
    { key: "bg",           ref: "accent-tint" },
    { key: "text",         ref: "fawn.700" },
    { key: "radius",       ref: "r-pill" },
    { key: "font",         ref: "font-mono" },
  ]},
  { component: "logo.wordmark", tokens: [
    { key: "color",        ref: "accent" },
    { key: "font",         ref: "font-wordmark" },
    { key: "weight",       ref: "500 (literal)" },
  ]},
  { component: "logo.seal", tokens: [
    { key: "bg",           ref: "accent" },
    { key: "ink",          ref: "bg" },
    { key: "font",         ref: "font-cn-serif" },
    { key: "radius",       ref: "size × 0.04" },
  ]},
];

/* ============================================================ */
/* HELPERS                                                        */
/* ============================================================ */

/* Resolve a primitive path like "color.neutral.900" → actual value */
const resolvePrimitive = (path, mode = "light") => {
  const parts = path.split(".");
  let cur = PRIMITIVE_TOKENS;
  for (const p of parts) { cur = cur?.[p]; if (cur === undefined) return null; }
  if (typeof cur === "object" && cur[mode] !== undefined) return cur[mode];
  return cur;
};

/* Is a value a color hex? */
const isColor = v => typeof v === "string" && /^#[0-9a-f]{3,8}$/i.test(v);

/* W3C Design Tokens JSON — build on demand */
const buildW3CTokens = () => {
  const json = { $schema: "https://design-tokens.github.io/community-group/format/" };
  /* Primitive */
  json.primitive = {};
  /* color.neutral */
  json.primitive.color = { neutral: {}, fawn: {}, info: {}, success: {}, danger: {}, warn: {} };
  Object.entries(PRIMITIVE_TOKENS.color.neutral).forEach(([k, v]) => {
    json.primitive.color.neutral[k] = { $value: v.light, $type: "color", $extensions: { mode: { dark: v.dark } } };
  });
  Object.entries(PRIMITIVE_TOKENS.color.fawn).forEach(([k, v]) => {
    json.primitive.color.fawn[k] = { $value: v, $type: "color" };
  });
  ["info", "success", "danger", "warn"].forEach(k => {
    Object.entries(PRIMITIVE_TOKENS.color[k]).forEach(([kk, vv]) => {
      json.primitive.color[k][kk] = { $value: vv, $type: "color" };
    });
  });
  /* radius, shadow, font, size, space */
  json.primitive.radius = {};
  Object.entries(PRIMITIVE_TOKENS.radius).forEach(([k, v]) => {
    json.primitive.radius[k] = { $value: v, $type: "dimension" };
  });
  json.primitive.shadow = {};
  Object.entries(PRIMITIVE_TOKENS.shadow).forEach(([k, v]) => {
    json.primitive.shadow[k] = { $value: v.light, $type: "shadow", $extensions: { mode: { dark: v.dark } } };
  });
  json.primitive.font = {};
  Object.entries(PRIMITIVE_TOKENS.font).forEach(([k, v]) => {
    json.primitive.font[k] = { $value: v, $type: "fontFamily" };
  });
  json.primitive.size = {};
  Object.entries(PRIMITIVE_TOKENS.size).forEach(([k, v]) => {
    json.primitive.size[k] = { $value: v, $type: "dimension" };
  });
  json.primitive.space = {};
  Object.entries(PRIMITIVE_TOKENS.space).forEach(([k, v]) => {
    json.primitive.space[k] = { $value: v, $type: "dimension" };
  });

  /* Semantic */
  json.semantic = {};
  SEMANTIC_TOKENS.forEach(s => {
    json.semantic[s.token] = {
      $value: `{primitive.${s.light}}`,
      $description: s.role,
      $extensions: { mode: { dark: `{primitive.${s.dark}}` } },
    };
  });

  /* Component */
  json.component = {};
  COMPONENT_TOKENS_REAL.forEach(c => {
    json.component[c.component] = {};
    c.tokens.forEach(t => {
      json.component[c.component][t.key] = { $value: `{semantic.${t.ref}}` };
    });
  });

  return json;
};

/* CSS output — pure custom-property export */
const buildCssExport = () => {
  const lines = [":root {"];
  /* Primitive — color */
  lines.push("  /* —— primitive · color —— */");
  Object.entries(PRIMITIVE_TOKENS.color.neutral).forEach(([k, v]) => lines.push(`  --p-neutral-${k}: ${v.light};`));
  Object.entries(PRIMITIVE_TOKENS.color.fawn).forEach(([k, v]) => lines.push(`  --p-fawn-${k}: ${v};`));
  ["info", "success", "danger", "warn"].forEach(k => {
    Object.entries(PRIMITIVE_TOKENS.color[k]).forEach(([kk, vv]) => lines.push(`  --p-${k}-${kk}: ${vv};`));
  });
  lines.push("  /* —— primitive · radius —— */");
  Object.entries(PRIMITIVE_TOKENS.radius).forEach(([k, v]) => lines.push(`  --p-radius-${k}: ${v};`));
  lines.push("  /* —— primitive · shadow —— */");
  Object.entries(PRIMITIVE_TOKENS.shadow).forEach(([k, v]) => lines.push(`  --p-shadow-${k}: ${v.light};`));
  lines.push("  /* —— primitive · font —— */");
  Object.entries(PRIMITIVE_TOKENS.font).forEach(([k, v]) => lines.push(`  --p-font-${k}: ${v};`));
  lines.push("  /* —— primitive · size —— */");
  Object.entries(PRIMITIVE_TOKENS.size).forEach(([k, v]) => lines.push(`  --p-size-${k}: ${v};`));
  lines.push("  /* —— primitive · space —— */");
  Object.entries(PRIMITIVE_TOKENS.space).forEach(([k, v]) => lines.push(`  --p-space-${k}: ${v};`));

  /* Semantic */
  lines.push("");
  lines.push("  /* —— semantic —— */");
  SEMANTIC_TOKENS.forEach(s => {
    const ref = s.light.includes(".") ? `var(--p-${s.light.replace(/\./g, "-")})` : s.light;
    lines.push(`  --${s.token}: ${ref};`);
  });
  lines.push("}");

  /* Dark mode */
  lines.push("");
  lines.push(`[data-theme="dark"] {`);
  Object.entries(PRIMITIVE_TOKENS.color.neutral).forEach(([k, v]) => lines.push(`  --p-neutral-${k}: ${v.dark};`));
  Object.entries(PRIMITIVE_TOKENS.shadow).forEach(([k, v]) => lines.push(`  --p-shadow-${k}: ${v.dark};`));
  lines.push("}");
  return lines.join("\n");
};

/* ============================================================ */
/* UI                                                             */
/* ============================================================ */

const TokenSwatch = ({ value, size = 44 }) => {
  if (isColor(value)) {
    return <span style={{ width: size, height: size, background: value, borderRadius: 6, border: "1px solid rgba(0,0,0,0.08)", display: "inline-block", flexShrink: 0 }}/>;
  }
  return <span className="mono" style={{ fontSize: 10, color: "var(--text-3)", padding: "4px 8px", background: "var(--surface-2)", borderRadius: 4, whiteSpace: "nowrap", maxWidth: size * 3, overflow: "hidden", textOverflow: "ellipsis" }}>{String(value).slice(0, 28)}</span>;
};

const LayerBadge = ({ n, label, color }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "4px 10px 4px 4px", background: "var(--surface-2)", borderRadius: "var(--r-pill)", border: "1px solid var(--border)" }}>
    <span className="mono" style={{
      width: 22, height: 22, borderRadius: "50%", background: color, color: "var(--bg)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 11, fontWeight: 600,
    }}>{n}</span>
    <span className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-2)" }}>{label}</span>
  </div>
);

const TokensTab = () => {
  const [exportFormat, setExportFormat] = React.useState("json");
  const [exportText, setExportText] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (exportFormat === "json") setExportText(JSON.stringify(buildW3CTokens(), null, 2));
    else setExportText(buildCssExport());
  }, [exportFormat]);

  const onCopy = () => {
    navigator.clipboard?.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  const onDownload = () => {
    const blob = new Blob([exportText], { type: exportFormat === "json" ? "application/json" : "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jio-tokens.${exportFormat === "json" ? "json" : "css"}`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  };

  return (
    <div className="page">
      <PageHeader
        kicker="03 · Foundations"
        titleEn="Tokens"
        titleZh="设计令牌"
        lede="Three layers, one direction of reference. Primitive values are raw — hex codes, pixel sizes. Semantic tokens give those values a role (accent, surface, text). Component tokens describe contracts (button.primary.bg, card.shadow). Components never reference primitives directly — that's the whole point."
      />

      {/* 01 · Architecture diagram */}
      <Section en="Architecture" zh="架构">
        <div className="card" style={{ padding: 32, background: "var(--surface)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", gap: 12, alignItems: "center" }}>
            {/* Primitive */}
            <div style={{ padding: 20, border: "1px solid var(--border)", borderRadius: "var(--r-md)", background: "var(--bg)" }}>
              <LayerBadge n="1" label="Primitive" color="var(--text)"/>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 24, margin: "12px 0 8px" }}>Raw values</div>
              <p style={{ fontSize: 13, margin: 0 }}>Colors, sizes, radii, shadow recipes. No meaning attached — just facts about what exists.</p>
              <div className="mono" style={{ fontSize: 11, color: "var(--text-3)", marginTop: 12 }}>
                <div>color.fawn.400</div>
                <div>radius.md</div>
                <div>shadow.sm</div>
              </div>
            </div>
            <Icon name="arrow-right" size={18} stroke="var(--text-3)"/>
            {/* Semantic */}
            <div style={{ padding: 20, border: "1px solid var(--accent)", borderRadius: "var(--r-md)", background: "var(--accent-tint)" }}>
              <LayerBadge n="2" label="Semantic" color="var(--accent)"/>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 24, margin: "12px 0 8px" }}>Roles</div>
              <p style={{ fontSize: 13, margin: 0, color: "var(--text-2)" }}>What does this value <em>mean</em> in the system? Themes swap here — primitives stay.</p>
              <div className="mono" style={{ fontSize: 11, color: "var(--text-2)", marginTop: 12 }}>
                <div>accent</div>
                <div>r-md</div>
                <div>sh-sm</div>
              </div>
            </div>
            <Icon name="arrow-right" size={18} stroke="var(--text-3)"/>
            {/* Component */}
            <div style={{ padding: 20, border: "1px solid var(--border)", borderRadius: "var(--r-md)", background: "var(--surface)" }}>
              <LayerBadge n="3" label="Component" color="var(--text)"/>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 24, margin: "12px 0 8px" }}>Contracts</div>
              <p style={{ fontSize: 13, margin: 0 }}>Promises from design to code. Change the semantic layer, every component that binds to it updates.</p>
              <div className="mono" style={{ fontSize: 11, color: "var(--text-3)", marginTop: 12 }}>
                <div>button.primary.bg</div>
                <div>card.radius</div>
                <div>logo.wordmark.color</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 24, padding: 16, background: "var(--surface-2)", borderRadius: "var(--r-md)", fontSize: 13, color: "var(--text-2)" }}>
            <strong style={{ color: "var(--text)" }}>Rule.</strong> References flow one way only: component → semantic → primitive. A component that reaches past its layer (e.g. a button using <code className="inline">fawn.400</code> directly) breaks the whole system's ability to re-theme.
          </div>
        </div>
      </Section>

      {/* 02 · Primitive viewer */}
      <Section en="Primitive layer" zh="原子层">
        <p style={{ marginBottom: 16 }}>Raw values. No token in the upper layers invents a new hex — they all come from here.</p>

        {/* Fawn scale */}
        <h3 className="sub">Color · fawn</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 4, marginBottom: 20 }}>
          {Object.entries(PRIMITIVE_TOKENS.color.fawn).map(([k, v]) => (
            <div key={k} style={{ textAlign: "center" }}>
              <div style={{ height: 56, background: v, borderRadius: 6, border: "1px solid rgba(0,0,0,0.06)" }}/>
              <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", marginTop: 6 }}>{k}</div>
              <Copyable value={v} style={{ fontSize: 10 }}>{v}</Copyable>
            </div>
          ))}
        </div>

        {/* Neutral scale */}
        <h3 className="sub">Color · neutral</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 4, marginBottom: 20 }}>
          {Object.entries(PRIMITIVE_TOKENS.color.neutral).map(([k, v]) => (
            <div key={k} style={{ textAlign: "center" }}>
              <div style={{ height: 56, background: v.light, borderRadius: 6, border: "1px solid rgba(0,0,0,0.06)" }}/>
              <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", marginTop: 6 }}>{k}</div>
              <Copyable value={v.light} style={{ fontSize: 10 }}>{v.light}</Copyable>
            </div>
          ))}
        </div>

        {/* Semantic colors */}
        <h3 className="sub">Color · semantic families</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
          {["info", "success", "danger", "warn"].map(name => (
            <div key={name} className="card" style={{ padding: 12 }}>
              <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{name}</div>
              <div style={{ display: "flex", gap: 4 }}>
                {["base", "tint", "ink"].map(k => (
                  <div key={k} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ height: 40, background: PRIMITIVE_TOKENS.color[name][k], borderRadius: 4, border: "1px solid rgba(0,0,0,0.06)" }}/>
                    <div className="mono" style={{ fontSize: 9, color: "var(--text-3)", marginTop: 4 }}>{k}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Radius */}
        <h3 className="sub">Radius</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 20 }}>
          {Object.entries(PRIMITIVE_TOKENS.radius).map(([k, v]) => (
            <div key={k} className="card" style={{ padding: 16, textAlign: "center" }}>
              <div style={{ width: 56, height: 56, margin: "0 auto", background: "var(--accent-tint)", border: "1px solid var(--accent)", borderRadius: v === "9999px" ? "9999px" : v }}/>
              <div className="mono" style={{ fontSize: 10, color: "var(--text-3)", marginTop: 8 }}>{k}</div>
              <Copyable value={v} style={{ fontSize: 10 }}>{v}</Copyable>
            </div>
          ))}
        </div>

        {/* Space */}
        <h3 className="sub">Space · 4pt scale</h3>
        <div className="card" style={{ padding: 20 }}>
          {Object.entries(PRIMITIVE_TOKENS.space).map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 14, padding: "6px 0" }}>
              <span className="mono" style={{ fontSize: 11, color: "var(--text-3)", width: 40 }}>{k}</span>
              <span style={{ height: 10, width: v === "0px" ? 1 : v, background: "var(--accent)", borderRadius: 2 }}/>
              <span className="mono" style={{ fontSize: 11, color: "var(--text-2)", marginLeft: 12 }}>{v}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 03 · Semantic layer */}
      <Section en="Semantic layer" zh="语义层">
        <p style={{ marginBottom: 16 }}>
          Every token below resolves to a primitive. Dark mode rebinds — in most cases by flipping the neutral scale. "derived" means the tint is computed at runtime from the selected dark paper (see Color tab).
        </p>
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="spec" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>Semantic token</th>
                <th>Light → primitive</th>
                <th>Dark → primitive</th>
                <th>Preview</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {SEMANTIC_TOKENS.map(s => {
                const preview = resolvePrimitive(s.light, "light");
                return (
                  <tr key={s.token}>
                    <td><Copyable value={`--${s.token}`}>--{s.token}</Copyable></td>
                    <td className="mono" style={{ fontSize: 11, color: "var(--text-2)" }}>{s.light}</td>
                    <td className="mono" style={{ fontSize: 11, color: "var(--text-3)" }}>{s.dark}</td>
                    <td><TokenSwatch value={preview || "—"} size={36}/></td>
                    <td style={{ color: "var(--text-2)", fontSize: 13 }}>{s.role}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 04 · Component layer */}
      <Section en="Component layer" zh="组件层">
        <p style={{ marginBottom: 16 }}>
          Component tokens are the contract between design and engineering. Every component's appearance is fully described by its tokens — no magic numbers, no hex codes inside component code.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 12 }}>
          {COMPONENT_TOKENS_REAL.map(c => (
            <div key={c.component} className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", background: "var(--surface-2)" }}>
                <Copyable value={c.component} style={{ fontSize: 12, color: "var(--text)", fontWeight: 500 }}>{c.component}</Copyable>
              </div>
              <div style={{ padding: "4px 16px 12px" }}>
                {c.tokens.map(t => (
                  <div key={t.key} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--border)" }}>
                    <span className="mono" style={{ fontSize: 11, color: "var(--text-2)" }}>{t.key}</span>
                    <span className="mono" style={{ fontSize: 11, color: "var(--text-3)" }}>→ {t.ref}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 05 · Export */}
      <Section en="Export" zh="导出">
        <p style={{ marginBottom: 16 }}>
          Ship tokens to any downstream tool. JSON follows the <a className="in" href="https://design-tokens.github.io/community-group/format/" target="_blank" rel="noopener">W3C Design Tokens Community Group</a> spec — drop into Style Dictionary, Tokens Studio for Figma, or your own pipeline. CSS is the direct <code className="inline">:root</code> export with dark-mode block.
        </p>

        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button onClick={() => setExportFormat("json")} style={{
            padding: "8px 16px", borderRadius: "var(--r-pill)",
            border: "1px solid " + (exportFormat === "json" ? "var(--accent)" : "var(--border)"),
            background: exportFormat === "json" ? "var(--accent)" : "transparent",
            color: exportFormat === "json" ? "var(--bg)" : "var(--text-2)",
            fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.08em",
            cursor: "pointer",
          }}>W3C JSON</button>
          <button onClick={() => setExportFormat("css")} style={{
            padding: "8px 16px", borderRadius: "var(--r-pill)",
            border: "1px solid " + (exportFormat === "css" ? "var(--accent)" : "var(--border)"),
            background: exportFormat === "css" ? "var(--accent)" : "transparent",
            color: exportFormat === "css" ? "var(--bg)" : "var(--text-2)",
            fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.08em",
            cursor: "pointer",
          }}>CSS VARS</button>
          <div style={{ flex: 1 }}/>
          <button onClick={onCopy} style={{
            padding: "8px 16px", borderRadius: "var(--r-pill)",
            border: "1px solid var(--border)", background: "transparent",
            color: copied ? "var(--success)" : "var(--text-2)",
            fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.08em",
            cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 6,
          }}>
            <Icon name={copied ? "check" : "copy"} size={12} stroke="currentColor"/>
            {copied ? "COPIED" : "COPY"}
          </button>
          <button onClick={onDownload} style={{
            padding: "8px 16px", borderRadius: "var(--r-pill)",
            border: "1px solid var(--text)", background: "var(--text)",
            color: "var(--bg)",
            fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.08em",
            cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 6,
          }}>
            <Icon name="download" size={12} stroke="currentColor"/>
            DOWNLOAD
          </button>
        </div>

        <pre style={{
          margin: 0,
          padding: 20,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-md)",
          fontSize: 12,
          fontFamily: "var(--font-mono)",
          lineHeight: 1.55,
          color: "var(--text-2)",
          overflow: "auto",
          maxHeight: 480,
        }}>{exportText}</pre>

        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="card" style={{ padding: 16 }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.08em", color: "var(--text-3)", textTransform: "uppercase", marginBottom: 6 }}>Pipeline</div>
            <p style={{ fontSize: 13, margin: 0 }}>W3C JSON → Style Dictionary → platform outputs (iOS swift, Android XML, Web CSS, Flutter Dart). One source, many surfaces.</p>
          </div>
          <div className="card" style={{ padding: 16 }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.08em", color: "var(--text-3)", textTransform: "uppercase", marginBottom: 6 }}>Figma</div>
            <p style={{ fontSize: 13, margin: 0 }}>Tokens Studio plugin imports this JSON directly. Variables land in Figma as-is — same names, same grouping.</p>
          </div>
        </div>
      </Section>

      {/* 06 · Governance */}
      <Section en="Governance" zh="治理">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="card" style={{ padding: 20 }}>
            <h3 className="sub" style={{ marginTop: 0 }}>Adding tokens</h3>
            <p style={{ fontSize: 13 }}>New primitives require a written reason. Semantic tokens are preferred — try to find an existing primitive that fits before inventing a new one. Component tokens are unlimited, as long as they reference semantic tokens.</p>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <h3 className="sub" style={{ marginTop: 0 }}>Deprecation</h3>
            <p style={{ fontSize: 13 }}>Tokens are deprecated with a <code className="inline">$deprecated</code> flag and a replacement path. Consumers get one minor version of overlap before removal. Never rename — always add + deprecate.</p>
          </div>
        </div>
      </Section>
    </div>
  );
};

window.TokensTab = TokensTab;
