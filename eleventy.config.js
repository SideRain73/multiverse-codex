import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import markdownItAttrs from "markdown-it-attrs";
import { readFileSync } from "node:fs";

const glossario = JSON.parse(readFileSync("src/_data/glossario.json", "utf8"));

// Indice dei termini del glossario: chiave in minuscolo → id della voce
const indiceTermini = new Map();
for (const sezione of glossario.sezioni) {
  for (const voce of sezione.voci) {
    for (const chiave of [voce.termine, ...(voce.alias || [])]) {
      indiceTermini.set(chiave.toLowerCase(), voce.id);
    }
  }
}

const slug = (s) => String(s)
  .normalize("NFD").replace(/[̀-ͯ]/g, "")
  .toLowerCase().replace(/<[^>]+>/g, "")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const escapeHtml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  let libreriaMd = null;
  eleventyConfig.amendLibrary("md", (md) => {
    md.set({ html: true, typographer: false });
    md.use(markdownItAttrs, { allowedAttributes: ["id", "class"] });
    // ID automatici sui titoli (per l'indice della pagina e i link condivisibili)
    md.core.ruler.push("id_titoli", (state) => {
      const usati = new Set();
      const t = state.tokens;
      for (let i = 0; i < t.length; i++) {
        if (t[i].type !== "heading_open" || t[i].attrGet("id")) continue;
        const testo = (t[i + 1].children || []).map((c) => c.content).join("");
        const base = slug(testo) || "sezione";
        let id = base, n = 2;
        while (usati.has(id)) id = `${base}-${n++}`;
        usati.add(id);
        t[i].attrSet("id", id);
      }
    });
    libreriaMd = md;
  });
  eleventyConfig.addFilter("renderMd", (s) => (libreriaMd ? libreriaMd.renderInline(String(s)) : s));
  eleventyConfig.addFilter("renderMdBlock", (s) => (libreriaMd ? libreriaMd.render(String(s)) : s));

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // [[Termine]] o [[Termine|testo mostrato]] → link al glossario con anteprima
  eleventyConfig.addPreprocessor("glossario", "md", (data, content) => {
    return content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (intero, termine, testo) => {
      const id = indiceTermini.get(termine.trim().toLowerCase());
      if (!id) {
        console.warn(`[glossario] termine non trovato: "${termine}" in ${data.page.inputPath}`);
        return testo || termine;
      }
      return `<a class="gloss" href="/riferimento/glossario/#${id}" data-gloss="${id}">${escapeHtml(testo || termine)}</a>`;
    });
  });

  // Riquadro di un'abilità di classe
  eleventyConfig.addPairedShortcode("abilita", (contenuto, rango, nome, id, meta) => {
    const attrId = id ? ` id="${id}"` : "";
    return `\n<article class="abilita">\n<header class="abilita-testa"><span class="abilita-rango">${rango}</span><h3${attrId}>${nome}</h3></header>\n<p class="abilita-meta">${meta}</p>\n\n${contenuto.trim()}\n\n</article>\n`;
  });

  // Riquadro "In sviluppo"
  eleventyConfig.addPairedShortcode("insviluppo", (contenuto, titolo) => {
    return `\n<aside class="riquadro riquadro-sviluppo">\n<p class="riquadro-titolo">${titolo || "In sviluppo"}</p>\n\n${contenuto.trim()}\n\n</aside>\n`;
  });

  // Riquadro di regola (es. Regola d'Oro)
  eleventyConfig.addPairedShortcode("riquadro", (contenuto, titolo) => {
    return `\n<aside class="riquadro">\n<p class="riquadro-titolo">${titolo}</p>\n\n${contenuto.trim()}\n\n</aside>\n`;
  });

  // Barra "Vai al rango": 20 ranghi divisi nelle 4 fasce
  eleventyConfig.addShortcode("vaialrango", (prefisso = "rango-") => {
    const fasce = ["Eroe Asceso", "Divinità Minore", "Divinità Intermedia", "Divinità Maggiore"];
    const blocchi = fasce.map((nome, g) => {
      const link = [1, 2, 3, 4, 5].map((k) => {
        const n = g * 5 + k;
        return `<a href="#${prefisso}${n}d">${n}d</a>`;
      }).join("");
      return `<div class="fascia"><p class="fascia-nome">${nome}</p><div class="ranghi">${link}</div></div>`;
    }).join("\n");
    return `\n\n<section class="vai-al-rango" aria-labelledby="vai-al-rango" data-pagefind-ignore>\n<h2 id="vai-al-rango">Vai al rango</h2>\n<p class="nota">Scegli un livello divino per leggere le abilità che sblocca.</p>\n<div class="fasce">\n${blocchi}\n</div>\n</section>\n\n`;
  });

  // Glossario ridotto per le anteprime: id → { t: termine, d: definizione in testo semplice }
  eleventyConfig.addFilter("glossarioMini", (g) => {
    const out = {};
    for (const s of g.sezioni) for (const v of s.voci) {
      out[v.id] = { t: v.termine, d: v.def.replace(/\*\*|\*/g, ""), dev: !!v.dev };
    }
    return out;
  });

  eleventyConfig.addFilter("haPagina", (url, tutte) => tutte.some((p) => p.url === url));
  eleventyConfig.addFilter("testoSemplice", (s) => String(s).replace(/\*\*|__|\*/g, ""));

  // Link esterni: classe "ext" per l'icona ↗ e rel di sicurezza
  eleventyConfig.addTransform("linkEsterni", function (contenuto) {
    if (!(this.page.outputPath || "").endsWith(".html")) return contenuto;
    return contenuto.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a class="ext" rel="noopener" href="$1"');
  });

  // Notazione del sistema (1d, nd, m+nd…) nei titoli: Cinzel e il maiuscoletto
  // la trasformerebbero in "1D", "ND". La avvolgo in uno span con le minuscole.
  const NOTAZIONE = /(?<![\p{L}\d_])(m\+nd|nd_max|nd_cur|\d{1,2}d|nd)(?![\p{L}\d_])/gu;
  const avvolgi = (interno) => interno.split(/(<[^>]+>)/).map((pezzo) =>
    pezzo.startsWith("<") ? pezzo : pezzo.replace(NOTAZIONE, '<span class="notazione">$1</span>')
  ).join("");
  eleventyConfig.addTransform("notazione", function (contenuto) {
    if (!(this.page.outputPath || "").endsWith(".html")) return contenuto;
    return contenuto
      .replace(/<(h[1-4])([^>]*)>([\s\S]*?)<\/\1>/g, (m, tag, attr, interno) => `<${tag}${attr}>${avvolgi(interno)}</${tag}>`)
      .replace(/<p class="(occhiello|menu-cap-titolo|menu-num|fascia-nome|riquadro-titolo)"([^>]*)>([\s\S]*?)<\/p>/g,
        (m, cls, attr, interno) => `<p class="${cls}"${attr}>${avvolgi(interno)}</p>`);
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    pathPrefix: "/multiverse-codex/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
