/* Accessibility tab */

const A11yTab = () => (
  <div className="page">
    <PageHeader
      kicker="11 · UX"
      titleEn="Accessibility"
      titleZh="无障碍"
      lede="Accessibility is the floor, not the ceiling. A product that works with a keyboard, at 200% zoom, with a screen reader, is just a better product for everyone."
    />

    <Section en="Contrast" zh="对比度">
      <p>WCAG 2.2 AA minimum for body text is 4.5:1. See the <a className="in" href="#color">Color tab</a> for verified pairs. {"The accent color "}<code className="inline">{(window.PALETTE && window.PALETTE.accent) || "#D97757"}</code> is <strong>never</strong> used for body text on paper — reserve it for 14px+ UI and always verify.</p>
    </Section>

    <Section en="Keyboard" zh="键盘操作">
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="spec">
          <thead><tr><th>Key</th><th>Behaviour</th></tr></thead>
          <tbody>
            {[
              ["Tab", "Moves focus forward through interactive elements, in visual order."],
              ["Shift + Tab", "Moves focus backward."],
              ["Enter / Space", "Activates the focused button, link, or toggle."],
              ["Esc", "Closes the topmost dismissible layer (dropdown, modal, tooltip)."],
              ["Arrow keys", "Moves within a composite widget (tabs, segmented, radio group, menu)."],
              ["Cmd/Ctrl + K", "Opens global search. Reserve for this purpose only."],
            ].map(([k, b]) => (
              <tr key={k}><td className="mono">{k}</td><td>{b}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>

    <Section en="Focus ring" zh="焦点环">
      <div className="card" style={{ padding: 24, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
        <button style={{
          padding: "9px 16px", background: "var(--accent)", color: "#fff",
          border: "1px solid var(--accent)", borderRadius: "var(--r-md)",
          fontSize: 13.5, fontWeight: 600, cursor: "pointer",
          boxShadow: "0 0 0 3px var(--accent-tint)",
          outline: "none", fontFamily: "var(--font-sans)",
        }}>Focused button</button>
        <div className="mono" style={{ fontSize: 12, color: "var(--text-3)" }}>
          box-shadow: 0 0 0 3px var(--accent-tint);
        </div>
      </div>
      <p style={{ marginTop: 12 }}>Always visible on <code className="inline">:focus-visible</code>. Never set <code className="inline">outline: none</code> without a replacement ring. The ring is <code className="inline">accent-tint</code> so it reads clearly on any background without overpowering.</p>
    </Section>

    <Section en="Screen reader" zh="屏幕阅读器">
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
        <li>Icon-only buttons need <code className="inline">aria-label</code>. Always.</li>
        <li>Decorative SVGs get <code className="inline">aria-hidden="true"</code>.</li>
        <li>Live regions (<code className="inline">aria-live="polite"</code>) announce toasts and inline saves.</li>
        <li>Form fields use <code className="inline">&lt;label&gt;</code> with <code className="inline">htmlFor</code> — never just <code className="inline">placeholder</code>.</li>
        <li>Errors use <code className="inline">aria-invalid="true"</code> and <code className="inline">aria-describedby</code> pointing to the message.</li>
      </ul>
    </Section>

    <Section en="Reduced motion" zh="减弱动效">
      <div className="card" style={{ padding: 20 }}>
        <pre className="mono" style={{ fontSize: 12, margin: 0, overflowX: "auto", color: "var(--text)" }}>{`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.1s !important;
  }
}`}</pre>
      </div>
    </Section>

    <Section en="Touch targets" zh="触控目标">
      <p>Minimum <span className="mono" style={{ color: "var(--accent)" }}>44 × 44px</span> on touch devices. Small icons get padding to hit this, even if the visual glyph is 20px.</p>
    </Section>
  </div>
);

window.A11yTab = A11yTab;
