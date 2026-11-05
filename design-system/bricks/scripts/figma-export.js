// BRICKS: export the Figma variables and text styles that feed the token pipeline.
// Run inside the Figma file (figma-console-mcp `figma_execute`, or a dev-console plugin).
// It RETURNS one object: { primitives, semantic, textStyles }. Save the three parts as:
//   snapshot/figma-primitives.json   = result.primitives
//   snapshot/figma-semantic.json     = result.semantic
//   snapshot/figma-text-styles.txt   = result.textStyles.join('\n') + '\n'
// Then: node scripts/import-figma-snapshot.mjs && node scripts/build-tokens.mjs
(async () => {
  const hex = (c) => {
    const h = (n) => Math.round(n * 255).toString(16).padStart(2, '0');
    const a = c.a ?? 1;
    return '#' + h(c.r) + h(c.g) + h(c.b) + (a < 1 ? h(a) : '');
  };
  const cols = await figma.variables.getLocalVariableCollectionsAsync();
  const byName = Object.fromEntries(cols.map((c) => [c.name, c]));
  const prim = byName['Primitives'];
  const sem = byName['BRICKS DS'];
  if (!prim || !sem) throw new Error('Expected collections "Primitives" and "BRICKS DS"');
  const all = await figma.variables.getLocalVariablesAsync();
  const byId = Object.fromEntries(all.map((v) => [v.id, v]));

  // ---- primitives: name -> hex | string | number ----
  const primitives = {};
  for (const id of prim.variableIds) {
    const v = byId[id];
    const val = v.valuesByMode[prim.modes[0].modeId];
    primitives[v.name] = v.resolvedType === 'COLOR' ? hex(val) : val;
  }

  // ---- semantic: per mode, alias target without the color/<brand>/ prefix, or =#hex8 for direct colours ----
  const modes = sem.modes.map((m) => m.name);
  const rows = {};
  for (const id of sem.variableIds) {
    const v = byId[id];
    if (v.resolvedType !== 'COLOR') continue; // font/* variables are exported through the primitives
    rows[v.name] = sem.modes
      .map((m) => {
        const val = v.valuesByMode[m.modeId];
        if (val && val.type === 'VARIABLE_ALIAS') {
          const t = byId[val.id];
          return t.name.replace(/^color\/[^/]+\//, '');
        }
        return '=' + hex(val);
      })
      .join(',');
  }

  // ---- text styles: name|role|@styleRole or fixed weight|size|lineHeight|letterSpacing|case|decoration ----
  const r2 = (n) => String(Math.round(n * 100) / 100);
  const styles = await figma.getLocalTextStylesAsync();
  const textStyles = [];
  for (const s of styles) {
    const bv = s.boundVariables || {};
    const famVar = bv.fontFamily && byId[bv.fontFamily.id];
    const stVar = bv.fontStyle && byId[bv.fontStyle.id];
    const role = famVar ? famVar.name.split('/').pop() : 'unbound';
    const weight = stVar ? '@' + stVar.name.split('/').pop() : s.fontName.style;
    const lh = s.lineHeight.unit === 'AUTO' ? 'auto' : s.lineHeight.unit === 'PERCENT' ? r2(s.lineHeight.value) + '%' : r2(s.lineHeight.value);
    const ls = s.letterSpacing.unit === 'PERCENT' ? r2(s.letterSpacing.value) + '%' : r2(s.letterSpacing.value);
    const tc = s.textCase === 'UPPER' ? 'UPPER' : s.textCase === 'ORIGINAL' ? '' : s.textCase;
    const dec = s.textDecoration === 'NONE' ? '' : s.textDecoration;
    textStyles.push([s.name, role, weight, s.fontSize, lh, ls, tc, dec].join('|'));
  }
  return { primitives, semantic: { modes, rows }, textStyles };
})();
