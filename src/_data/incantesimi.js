// Legge fonti/INCANTESIMI_HOMEBREW_50.md e ne ricava un oggetto per incantesimo.
// Per aggiornare gli incantesimi basta sostituire quel file con la nuova versione.
import { readFileSync } from "node:fs";

const slug = (s) => String(s)
  .normalize("NFD").replace(/[̀-ͯ]/g, "")
  .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const CAMPI = {
  "Livello e Scuola": "livelloScuola",
  "Tempo di Lancio": "tempo",
  "Gittata": "gittata",
  "Componenti": "componenti",
  "Durata": "durata",
  "Classi": "classi",
};

function categoriaTempo(t) {
  const s = t.toLowerCase();
  if (s.startsWith("1 azione bonus")) return "Azione bonus";
  if (s.startsWith("1 azione")) return "Azione";
  if (s.startsWith("1 reazione")) return "Reazione";
  return "Più di un'azione";
}

function categoriaGittata(g) {
  const s = g.toLowerCase();
  if (s.startsWith("incantatore")) return { tipo: "incantatore", metri: 0 };
  if (s.startsWith("contatto")) return { tipo: "contatto", metri: 0 };
  const km = s.match(/([\d.,]+)\s*(chilometr|km)/);
  if (km) return { tipo: "distanza", metri: parseFloat(km[1].replace(",", ".")) * 1000 };
  const m = s.match(/([\d.,]+)\s*metri/);
  return { tipo: "distanza", metri: m ? parseFloat(m[1].replace(",", ".")) : 0 };
}

export default function () {
  const testo = readFileSync("fonti/INCANTESIMI_HOMEBREW_50.md", "utf8").replace(/\r\n/g, "\n");
  const righe = testo.split("\n");
  const lista = [];
  let livello = null, corrente = null;

  const chiudi = () => {
    if (!corrente) return;
    corrente.corpo = corrente.corpo.join("\n")
      .replace(/\n-{3,}\s*$/s, "")
      .replace(/⚠️\s*/g, "")
      .replace(/📎\s*/g, "")
      .trim();
    lista.push(corrente);
    corrente = null;
  };

  for (const r of righe) {
    const capitolo = r.match(/^# (TRUCCHETTI|INCANTESIMI DI (\d)° LIVELLO)/);
    if (capitolo) { chiudi(); livello = capitolo[2] ? Number(capitolo[2]) : 0; continue; }
    if (/^## APPENDICE|^## CHANGELOG/.test(r)) { chiudi(); livello = null; continue; }
    const titolo = r.match(/^## (\d+)\. (.+)$/);
    if (titolo && livello !== null) {
      chiudi();
      corrente = { numero: Number(titolo[1]), nome: titolo[2].trim(), livello, corpo: [] };
      continue;
    }
    if (!corrente) continue;
    const campo = r.match(/^\*\*([^*]+):\*\*\s*(.+)$/);
    if (campo && CAMPI[campo[1]] && corrente.corpo.length === 0) {
      corrente[CAMPI[campo[1]]] = campo[2].trim();
      continue;
    }
    if (corrente.corpo.length === 0 && r.trim() === "") continue;
    corrente.corpo.push(r);
  }
  chiudi();

  return lista.map((s) => {
    const ls = (s.livelloScuola || "").replace(/\*/g, "");
    const tra = ls.match(/\(([^)]+)\)/);
    const scuola = (tra ? tra[1] : ls.replace(/^Trucchetto di /i, "")).trim();
    const rituale = /rituale/i.test(ls) || /rituale/i.test(s.tempo || "");
    const classi = (s.classi || "").split(/,\s*/).map((c) => c.replace(/\(.*?\)/g, "").trim()).filter(Boolean);
    const comp = (s.componenti || "").replace(/\(.*\)/, "");
    const g = categoriaGittata(s.gittata || "");
    return {
      ...s,
      slug: slug(s.nome),
      livelloTesto: s.livello === 0 ? "Trucchetto" : `${s.livello}° livello`,
      scuola,
      rituale,
      classiLista: classi,
      tempoCat: categoriaTempo(s.tempo || ""),
      comp: { v: /\bV\b/.test(comp), s: /\bS\b/.test(comp), m: /\bM\b/.test(comp) },
      gittataTipo: g.tipo,
      gittataMetri: g.metri,
    };
  });
}
