/**
 * ============================================================
 *  W.VIANA — HOME PAGE VISUAL AUDIT (Browser Console)
 *  "O Edificio Digital" v2
 * ============================================================
 *
 *  Cole este script inteiro no Console do navegador (F12)
 *  com a HOME (localhost:3000/) aberta.
 *
 *  Analisa em tempo real:
 *  - Contraste WCAG de cada elemento visivel
 *  - Fonte real renderizada (computed)
 *  - Peso real vs peso declarado (font synthesis)
 *  - Tamanho em px
 *  - Line-height, Letter-spacing
 *  - Espacamento entre secoes
 *  - Hierarquia tipografica
 *  - Watermarks decorativos (ignora no score)
 * ============================================================
 */

(() => {
  "use strict";

  // ── Utilities ──

  function getComputed(el) {
    return window.getComputedStyle(el);
  }

  function parseColor(str) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = str;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return { r, g, b, a: a / 255 };
  }

  function getBgColor(el) {
    let current = el;
    while (current && current !== document.documentElement) {
      const bg = getComputed(current).backgroundColor;
      const parsed = parseColor(bg);
      if (parsed.a > 0.01) return parsed;
      current = current.parentElement;
    }
    // Fallback: read --background from root
    const rootBg = getComputed(document.documentElement).getPropertyValue("--background").trim();
    if (rootBg) {
      return parseColor(`hsl(${rootBg})`);
    }
    return { r: 247, g: 247, b: 247, a: 1 };
  }

  function getEffectiveOpacity(el) {
    let opacity = 1;
    let current = el;
    while (current && current !== document.documentElement) {
      const o = parseFloat(getComputed(current).opacity);
      opacity *= o;
      current = current.parentElement;
    }
    return opacity;
  }

  function blendOnBg(fg, bg) {
    const a = fg.a;
    return {
      r: Math.round(fg.r * a + bg.r * (1 - a)),
      g: Math.round(fg.g * a + bg.g * (1 - a)),
      b: Math.round(fg.b * a + bg.b * (1 - a)),
      a: 1,
    };
  }

  function luminance(r, g, b) {
    const [rs, gs, bs] = [r / 255, g / 255, b / 255].map((c) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  function contrastRatio(c1, c2) {
    const l1 = luminance(c1.r, c1.g, c1.b);
    const l2 = luminance(c2.r, c2.g, c2.b);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  function wcagGrade(ratio, isLarge) {
    if (isLarge) {
      if (ratio >= 4.5) return "AAA";
      if (ratio >= 3.0) return "AA";
      return "FAIL";
    }
    if (ratio >= 7.0) return "AAA";
    if (ratio >= 4.5) return "AA";
    if (ratio >= 3.0) return "AA-large-only";
    return "FAIL";
  }

  function hexStr(c) {
    return "#" + [c.r, c.g, c.b].map((v) => v.toString(16).padStart(2, "0")).join("");
  }

  function isLargeText(sizePx, weight) {
    const w = parseInt(weight) || 400;
    if (w >= 700) return sizePx >= 18.66;
    return sizePx >= 24;
  }

  function truncate(str, len = 40) {
    if (!str) return "(vazio)";
    const clean = str.replace(/\s+/g, " ").trim();
    return clean.length > len ? clean.slice(0, len) + "..." : clean;
  }

  function isWatermark(el) {
    const cs = getComputed(el);
    const opacity = getEffectiveOpacity(el);
    const sizePx = parseFloat(cs.fontSize);
    // Watermarks: very large text at very low opacity, or pointer-events:none + select:none
    if (opacity < 0.1 && sizePx > 60) return true;
    if (el.classList.contains("pointer-events-none") && el.classList.contains("select-none")) return true;
    if (el.closest(".pointer-events-none.select-none")) return true;
    // Check inline opacity
    const colorStr = cs.color;
    const match = colorStr.match(/rgba?\(\s*\d+.*?[\s,/]+\s*([\d.]+)\s*\)/);
    if (match && parseFloat(match[1]) < 0.1 && sizePx > 40) return true;
    return false;
  }

  function getSectionName(el) {
    // Try data-section attribute
    const ds = el.getAttribute("data-section");
    if (ds) return ds.charAt(0).toUpperCase() + ds.slice(1);

    // Try to identify by content/class
    const text = (el.textContent || "").trim().slice(0, 50);
    const classes = el.className || "";

    if (text.includes("W.VIANA") && el.querySelector("h1")) return "Hero";
    if (text.includes("Manifesto") || text.includes("Projetamos")) return "Statement";
    if (text.includes("projetos entregues")) return "Horizon";
    if (el.querySelector("[class*='gallery']") || el.querySelector("[class*='reveal-curtain']")) return "Gallery";
    if (classes.includes("gallery") || classes.includes("walk")) return "Gallery";

    // Check for project cards inside
    const hasProjectCards = el.querySelectorAll("img").length > 1;
    if (hasProjectCards) return "Gallery";

    return null;
  }

  // ── Collect elements ──

  const findings = [];

  function analyze(el, label) {
    const cs = getComputed(el);
    const text = el.textContent;
    const sizePx = parseFloat(cs.fontSize);
    const weight = cs.fontWeight;
    const family = cs.fontFamily;
    const lineHeight = cs.lineHeight;
    const letterSpacing = cs.letterSpacing;
    const textTransform = cs.textTransform;
    const effectiveOpacity = getEffectiveOpacity(el);
    const decorative = isWatermark(el);

    // Color & contrast — account for inherited opacity
    const fgColor = parseColor(cs.color);
    fgColor.a = fgColor.a * effectiveOpacity;
    const bgColor = getBgColor(el);
    const effectiveFg = fgColor.a < 1 ? blendOnBg(fgColor, bgColor) : fgColor;
    const ratio = contrastRatio(effectiveFg, bgColor);
    const large = isLargeText(sizePx, weight);
    const grade = wcagGrade(ratio, large);

    // Check font synthesis
    const VALID_AGRANDIR_WEIGHTS = [300, 800];
    const parsedWeight = parseInt(weight);
    const isDisplayFont =
      family.includes("__agrandirGrand") ||
      family.toLowerCase().includes("agrandir") ||
      el.matches("h1,h2,h3,h4,h5,h6");
    const hasSynthesis =
      isDisplayFont && !VALID_AGRANDIR_WEIGHTS.includes(parsedWeight);

    // Valid Aeonik weights
    const VALID_AEONIK_WEIGHTS = [300, 400, 700];
    const isBodyFont =
      family.includes("__aeonik") ||
      family.toLowerCase().includes("aeonik");
    const hasBodySynthesis =
      isBodyFont && !VALID_AEONIK_WEIGHTS.includes(parsedWeight);

    findings.push({
      label,
      text: truncate(text),
      el,
      decorative,
      font: {
        family: family.split(",")[0].trim().replace(/"/g, ""),
        size: `${sizePx}px`,
        sizePx,
        weight,
        lineHeight,
        letterSpacing,
        textTransform,
      },
      color: {
        fg: hexStr(effectiveFg),
        bg: hexStr(bgColor),
        fgOpacity: fgColor.a.toFixed(2),
        effectiveOpacity: effectiveOpacity.toFixed(2),
        contrast: ratio.toFixed(2) + ":1",
        wcag: grade,
        isLarge: large,
      },
      issues: {
        fontSynthesis: hasSynthesis || hasBodySynthesis,
        synthesisFont: hasSynthesis ? "Agrandir Grand" : hasBodySynthesis ? "Aeonik" : null,
        lowContrast: !decorative && (grade === "FAIL" || grade === "AA-large-only"),
        tinyText: sizePx < 10,
      },
    });
  }

  // ── Scan sections ──

  function scanSection(sectionEl, sectionName) {
    if (!sectionEl) {
      console.warn(`[AUDIT] Secao nao encontrada: ${sectionName}`);
      return;
    }

    const textEls = sectionEl.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, p, span, a, button, label, li"
    );

    textEls.forEach((el) => {
      const cs = getComputed(el);
      if (cs.display === "none" || cs.visibility === "hidden") return;

      // Don't skip animated elements — check them anyway but note the state
      const directText = Array.from(el.childNodes)
        .filter((n) => n.nodeType === Node.TEXT_NODE)
        .map((n) => n.textContent.trim())
        .join("");
      if (!directText && el.children.length > 0) return;
      if (!el.textContent.trim()) return;

      analyze(el, `[${sectionName}]`);
    });
  }

  // ── Measure spacing ──

  function measureSpacing() {
    console.log("\n");
    console.log(
      "%c═══ ESPACAMENTO ENTRE SECOES ═══",
      "font-weight:bold;font-size:14px;color:#8C7D6F"
    );

    const main = document.querySelector("main");
    if (!main) return;

    const children = Array.from(main.children);
    let totalVoid = 0;
    let totalContent = 0;

    children.forEach((child, i) => {
      const rect = child.getBoundingClientRect();
      const height = Math.round(rect.height);
      const isVoid = !child.textContent.trim() && height < 500;
      let name = getSectionName(child) || child.tagName.toLowerCase();
      if (isVoid) {
        name = "Void";
        totalVoid += height;
      } else {
        totalContent += height;
      }

      const icon = isVoid ? "  " : "  ";

      console.log(
        `${icon} ${String(i + 1).padStart(2, "0")}. %c${name.padEnd(12)}%c  h=${String(height).padStart(5)}px  top=${Math.round(rect.top + window.scrollY)}px`,
        "color:#8C7D6F;font-weight:bold",
        "color:inherit"
      );

    });

    const pageH = document.documentElement.scrollHeight;
    const voidPct = ((totalVoid / pageH) * 100).toFixed(1);
    console.log(`\n  Espaco vazio total: ${totalVoid}px (${voidPct}% da pagina)`);
    console.log(`  Altura total da pagina: ${pageH}px`);
  }

  // ── Font inventory ──

  function fontInventory() {
    console.log("\n");
    console.log(
      "%c═══ INVENTARIO DE FONTES RENDERIZADAS ═══",
      "font-weight:bold;font-size:14px;color:#8C7D6F"
    );

    const allText = document.querySelectorAll(
      "main h1, main h2, main h3, main h4, main h5, main h6, main p, main span, main a, " +
      "footer h1, footer h2, footer h3, footer p, footer span, footer a, " +
      "header span, header button, header a"
    );

    const fontMap = new Map();

    allText.forEach((el) => {
      const cs = getComputed(el);
      if (cs.display === "none" || !el.textContent.trim()) return;

      const family = cs.fontFamily.split(",")[0].trim().replace(/"/g, "");
      const weight = cs.fontWeight;
      const size = cs.fontSize;
      const key = `${family} | w${weight} | ${size}`;

      if (!fontMap.has(key)) {
        fontMap.set(key, { family, weight, size, count: 0, examples: [] });
      }

      const entry = fontMap.get(key);
      entry.count++;
      if (entry.examples.length < 2) {
        entry.examples.push(truncate(el.textContent, 25));
      }
    });

    const sorted = [...fontMap.values()].sort(
      (a, b) => parseFloat(b.size) - parseFloat(a.size)
    );

    console.table(
      sorted.map((f) => ({
        Fonte: f.family,
        Peso: f.weight,
        Tamanho: f.size,
        Usos: f.count,
        Exemplo: f.examples[0],
      }))
    );

    // Font synthesis check
    const AGRANDIR_WEIGHTS = ["300", "800"];
    const AEONIK_WEIGHTS = ["300", "400", "700"];

    const synthesized = sorted.filter((f) => {
      const isAgrandir = f.family.toLowerCase().includes("agrandir") || f.family.includes("__agrandirGrand");
      const isAeonik = f.family.toLowerCase().includes("aeonik") || f.family.includes("__aeonik");
      if (isAgrandir && !AGRANDIR_WEIGHTS.includes(f.weight)) return true;
      if (isAeonik && !AEONIK_WEIGHTS.includes(f.weight)) return true;
      return false;
    });

    if (synthesized.length > 0) {
      console.log("\n%c⚠ FONT SYNTHESIS DETECTADO:", "color:red;font-weight:bold");
      synthesized.forEach((f) => {
        const validWeights = f.family.toLowerCase().includes("agrandir")
          ? "300, 800"
          : "300, 400, 700";
        console.log(
          `  %c${f.family}%c weight ${f.weight} (validos: ${validWeights}). Ex: "${f.examples[0]}"`,
          "font-weight:bold", "font-weight:normal"
        );
      });
    } else {
      console.log("\n%c✅ Nenhum font synthesis detectado", "color:green;font-weight:bold");
    }
  }

  // ── Typography hierarchy ──

  function typographyHierarchy() {
    console.log("\n");
    console.log(
      "%c═══ HIERARQUIA TIPOGRAFICA ═══",
      "font-weight:bold;font-size:14px;color:#8C7D6F"
    );

    const sizes = findings
      .filter((f) => !f.decorative)
      .map((f) => ({
        size: f.font.sizePx,
        weight: f.font.weight,
        family: f.font.family,
        text: f.text,
      }));

    const uniqueSizes = [...new Map(
      sizes.map((s) => [`${s.size}|${s.weight}|${s.family}`, s])
    ).values()].sort((a, b) => b.size - a.size);

    console.log("  Escala de tamanhos (maior → menor):\n");
    uniqueSizes.forEach((s) => {
      const bar = "█".repeat(Math.max(1, Math.round(s.size / 5)));
      console.log(
        `  %c${bar}%c ${s.size}px  w${s.weight}  ${s.family.slice(0, 20)}  "${s.text.slice(0, 25)}"`,
        `color:#8C7D6F;font-size:10px`,
        "color:inherit;font-size:11px"
      );
    });

    if (uniqueSizes.length >= 2) {
      const max = uniqueSizes[0].size;
      const min = uniqueSizes[uniqueSizes.length - 1].size;
      console.log(`\n  Ratio max/min: ${(max / min).toFixed(1)}x (${max}px / ${min}px)`);
    }
  }

  // ── Print contrast report ──

  function printContrastReport() {
    console.log("\n");
    console.log(
      "%c═══ CONTRASTE & TIPOGRAFIA ═══",
      "font-weight:bold;font-size:14px;color:#8C7D6F"
    );

    let fails = 0;
    let warns = 0;
    let ok = 0;
    let decorativeCount = 0;

    const grouped = {};
    findings.forEach((f) => {
      if (!grouped[f.label]) grouped[f.label] = [];
      grouped[f.label].push(f);
    });

    for (const [section, items] of Object.entries(grouped)) {
      console.log(
        `\n%c── ${section} ──`,
        "font-weight:bold;font-size:12px;color:#8C7D6F"
      );

      items.forEach((f) => {
        const isFail = f.color.wcag === "FAIL" && !f.decorative;
        const isSynth = f.issues.fontSynthesis;
        const isTiny = f.issues.tinyText && !f.decorative;
        const hasIssue = isFail || isSynth || (f.issues.lowContrast && !f.decorative);

        if (f.decorative) {
          decorativeCount++;
        } else if (isFail) {
          fails++;
        } else if (hasIssue || isTiny) {
          warns++;
        } else {
          ok++;
        }

        let icon, style;
        if (f.decorative) {
          icon = "◇";
          style = "color:#999";
        } else if (isFail) {
          icon = "✗";
          style = "color:red";
        } else if (hasIssue) {
          icon = "!";
          style = "color:orange";
        } else {
          icon = "✓";
          style = "color:green";
        }

        const opacityNote = parseFloat(f.color.effectiveOpacity) < 0.5
          ? ` (opacity: ${f.color.effectiveOpacity})`
          : "";

        console.groupCollapsed(
          `%c ${icon} %c${f.text}%c  ${f.color.contrast} ${f.color.wcag}${f.decorative ? " [decorativo]" : ""}${opacityNote}`,
          style,
          "color:inherit;font-weight:normal",
          "color:#888;font-weight:normal"
        );

        console.log("Fonte:", f.font.family);
        console.log("Tamanho:", f.font.size);
        console.log("Peso:", f.font.weight);
        console.log("Line-height:", f.font.lineHeight);
        console.log("Letter-spacing:", f.font.letterSpacing);
        console.log("Transform:", f.font.textTransform);
        console.log("Opacity efetiva:", f.color.effectiveOpacity);
        console.log(
          "Foreground:",
          `%c██%c ${f.color.fg}`,
          `background:${f.color.fg};color:${f.color.fg}`,
          "color:inherit"
        );
        console.log(
          "Background:",
          `%c██%c ${f.color.bg}`,
          `background:${f.color.bg};color:${f.color.bg}`,
          "color:inherit"
        );
        console.log("Contraste:", f.color.contrast, f.color.isLarge ? "(large)" : "(normal)");
        console.log("WCAG:", f.color.wcag);

        if (isSynth) {
          console.log(
            `%c⚠ FONT SYNTHESIS: peso ${f.font.weight} nao existe na ${f.issues.synthesisFont}`,
            "color:red;font-weight:bold"
          );
        }

        console.groupEnd();
      });
    }

    // Summary
    console.log("\n");
    console.log(
      "%c═══ RESUMO ═══",
      "font-weight:bold;font-size:14px;color:#8C7D6F"
    );
    console.log(`  %c✓ OK: ${ok}`, "color:green;font-weight:bold");
    console.log(`  %c! WARN: ${warns}`, "color:orange;font-weight:bold");
    console.log(`  %c✗ FAIL: ${fails}`, "color:red;font-weight:bold");
    console.log(`  %c◇ Decorativo (ignorado): ${decorativeCount}`, "color:#999");
    console.log(`  Total: ${findings.length} elementos`);

    if (fails === 0 && warns === 0) {
      console.log("\n  %c🏗 Todos os elementos passam no audit.", "color:green;font-size:13px");
    }
  }

  // ── Viewport info ──

  function printViewport() {
    console.log(
      "%c═══ W.VIANA HOME AUDIT v2 ═══",
      "font-weight:bold;font-size:16px;color:#8C7D6F"
    );
    console.log(`  Viewport: ${window.innerWidth}×${window.innerHeight}px  |  DPR: ${window.devicePixelRatio}`);
    console.log(`  Pagina: ${document.documentElement.scrollHeight}px  |  URL: ${location.pathname}`);
  }

  // ══════════════════════════════════════════════════════════
  //  EXECUTE
  // ══════════════════════════════════════════════════════════

  printViewport();

  const main = document.querySelector("main");
  if (!main) {
    console.error("✗ <main> nao encontrado — voce esta na home page?");
    return;
  }

  // Smart section discovery
  const allMainChildren = Array.from(main.children);

  allMainChildren.forEach((child) => {
    // Skip empty voids
    if (!child.textContent.trim() && child.getBoundingClientRect().height < 500) return;

    // Find the best name
    let name = getSectionName(child);

    // If it's a wrapper div, check its children
    if (!name && child.tagName === "DIV") {
      const innerSection = child.querySelector("section");
      if (innerSection) name = getSectionName(innerSection);
    }

    if (!name) {
      // Try to name by position
      const rect = child.getBoundingClientRect();
      if (rect.top + window.scrollY < window.innerHeight) name = "Hero";
      else name = `Section (${child.tagName.toLowerCase()})`;
    }

    scanSection(child, name);
  });

  // Scan footer
  const footer = document.querySelector("footer");
  if (footer) scanSection(footer, "Footer");

  // Scan header
  const header = document.querySelector("header");
  if (header) scanSection(header, "Header");

  // Print all reports
  printContrastReport();
  fontInventory();
  typographyHierarchy();
  measureSpacing();

  console.log(
    "\n%c═══ AUDIT COMPLETO ═══\n",
    "font-weight:bold;font-size:14px;color:#8C7D6F"
  );
})();
