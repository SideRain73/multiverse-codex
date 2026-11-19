// Legge le schede degli oggetti in fonti/oggetti/ e toglie le parti per il DM:
// precisazioni per il DM, valutazioni di potenza e note di bilanciamento.
// Per aggiornare un oggetto basta sostituire il suo file in fonti/oggetti/.
import { readFileSync, readdirSync } from "node:fs";

const slug = (s) => String(s)
  .normalize("NFD").replace(/[̀-ͯ]/g, "")
  .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const RARITA = {
  "Pipa_dell_allucinazione_iridescente.md": "Molto raro",
  "Sandevistan_Motore_della_Distorsione_Temporale.md": "Molto raro",
  "Maschera_delle_Identita_Incompiute.md": "Molto raro",
  "Mantello_dei_Mille_Silenzi.md": "Molto raro",
  "Viola_delle_Emozioni_Recise.md": "Molto raro",
  "Bastone_del_Furore_del_Focolare_Divino.md": "Leggendario",
  "Anelli_della_Gravita_Discordante.md": "Leggendario",
};

const SEZIONI_DM = /Precisazioni per il|Note per il Dungeon|Valutazione|Nota di bilanciamento|Nota per il DM/i;
const RIGHE_DM = /Potenza stimata|Valutazione indicativa|^\*?\*?Sistema:|^\*Nota per il DM|Obiettivo di potenza/i;

function pulisci(testo) {
  const righe = testo.replace(/\r\n/g, "\n").split("\n");
  const titolo = (righe.find((r) => r.startsWith("# ")) || "").replace(/^# /, "").trim();
  const out = [];
  let tipo = "";
  let salta = 0; // livello del titolo della sezione esclusa (0 = nessuna)
  let primaSezione = true;

  for (const r of righe) {
    if (r.startsWith("# ")) continue;
    const h = r.match(/^(#{2,6}) (.+)$/);
    if (h) {
      const livello = h[1].length;
      if (salta && livello <= salta) salta = 0;
      if (!salta && SEZIONI_DM.test(h[2])) { salta = livello; continue; }
      primaSezione = false;
    }
    if (salta) continue;
    if (RIGHE_DM.test(r.trim())) continue;
    // Riga del tipo (prima della prima sezione): diventa il sottotitolo
    if (primaSezione && !tipo && /(oggetto meraviglioso|bastone|arma|anello)/i.test(r) && /(raro|leggendario|non comune|comune)/i.test(r)) {
      tipo = r.replace(/[*_]/g, "").trim();
      continue;
    }
    out.push(r);
  }

  let corpo = out.join("\n")
    .replace(/(\n\s*-{3,}\s*)+$/s, "")
    .replace(/^\s*(-{3,}\s*\n)+/s, "")
    .trim();
  return { titolo, tipo, corpo };
}

export default function () {
  return readdirSync("fonti/oggetti")
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { titolo, tipo, corpo } = pulisci(readFileSync(`fonti/oggetti/${file}`, "utf8"));
      return { file, titolo, tipo, corpo, rarita: RARITA[file] || "Da classificare", slug: slug(titolo) };
    })
    .sort((a, b) => a.titolo.localeCompare(b.titolo, "it"));
}
