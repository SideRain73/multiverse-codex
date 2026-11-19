/* =====================================================================
   CODEX DEL MULTIVERSO — comportamenti della pagina
   Tema, dimensione del testo, menu, indice della pagina,
   anteprime del glossario, ricerca (Pagefind), versione stampabile.
   ===================================================================== */
(function () {
  "use strict";
  const html = document.documentElement;
  const BASE = html.dataset.base || "/";

  const salva = (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} };

  /* ---------- Tema ---------- */
  const scuroDiSistema = () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.querySelectorAll("[data-tema]").forEach((b) => {
    b.addEventListener("click", () => {
      const attuale = html.dataset.theme || (scuroDiSistema() ? "scuro" : "chiaro");
      const nuovo = attuale === "scuro" ? "chiaro" : "scuro";
      html.dataset.theme = nuovo;
      salva("codex-tema", nuovo);
    });
  });

  /* ---------- Dimensione del testo (3 livelli: 0, 1, 2) ---------- */
  const aggiornaTesto = () => {
    const l = Number(html.dataset.size ?? 1);
    document.querySelectorAll("[data-testo]").forEach((b) => {
      const d = Number(b.dataset.testo);
      b.disabled = (d < 0 && l <= 0) || (d > 0 && l >= 2);
    });
  };
  document.querySelectorAll("[data-testo]").forEach((b) => {
    b.addEventListener("click", () => {
      const l = Math.min(2, Math.max(0, Number(html.dataset.size ?? 1) + Number(b.dataset.testo)));
      if (l === 1) { delete html.dataset.size; salva("codex-testo", null); }
      else { html.dataset.size = String(l); salva("codex-testo", String(l)); }
      aggiornaTesto();
    });
  });
  aggiornaTesto();

  /* ---------- Menu laterale ---------- */
  const menu = document.getElementById("menu");
  const sfondo = document.querySelector("[data-sfondo-menu]");
  const apri = document.querySelector("[data-apri-menu]");
  const apriMenu = () => {
    menu.hidden = false; sfondo.hidden = false; apri.setAttribute("aria-expanded", "true");
    (menu.querySelector("[aria-current]") || menu.querySelector("button")).focus();
  };
  const chiudiMenu = () => {
    menu.hidden = true; sfondo.hidden = true; apri.setAttribute("aria-expanded", "false"); apri.focus();
  };
  if (menu && apri) {
    apri.addEventListener("click", apriMenu);
    sfondo.addEventListener("click", chiudiMenu);
    menu.querySelector("[data-chiudi-menu]").addEventListener("click", chiudiMenu);
  }

  /* ---------- Indice "In questa pagina" ---------- */
  const indice = document.querySelector("[data-indice]");
  const prosa = document.querySelector(".prosa");
  if (indice && prosa) {
    const titoli = [...prosa.querySelectorAll("h2[id]")];
    if (titoli.length === 0) {
      indice.closest(".indice-pagina").querySelector("details").hidden = true;
    }
    titoli.forEach((h) => {
      const a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;
      indice.appendChild(a);
    });
    const box = document.querySelector("[data-indice-box]");
    const desktop = window.matchMedia("(min-width: 961px)");
    const adatta = () => { if (box) box.open = desktop.matches; };
    adatta();
    desktop.addEventListener("change", adatta);
    if (box) box.querySelector("summary").addEventListener("click", (e) => { if (desktop.matches) e.preventDefault(); });
    indice.addEventListener("click", (e) => { if (e.target.closest("a") && !desktop.matches && box) box.open = false; });

    if ("IntersectionObserver" in window && titoli.length) {
      const link = new Map([...indice.querySelectorAll("a")].map((a) => [a.hash.slice(1), a]));
      const osserva = new IntersectionObserver((voci) => {
        voci.forEach((v) => {
          if (v.isIntersecting) {
            link.forEach((a) => a.classList.remove("attivo"));
            const a = link.get(v.target.id);
            if (a) a.classList.add("attivo");
          }
        });
      }, { rootMargin: "-20% 0px -70% 0px" });
      titoli.forEach((h) => osserva.observe(h));
    }
  }

  /* ---------- Anteprime del glossario ---------- */
  let glossario = {};
  try { glossario = JSON.parse(document.getElementById("dati-glossario").textContent); } catch (e) {}
  let anteprima = null, origine = null;
  const chiudiAnteprima = () => { if (anteprima) { anteprima.remove(); anteprima = null; origine = null; } };
  const mostraAnteprima = (a) => {
    const voce = glossario[a.dataset.gloss];
    if (!voce) return;
    chiudiAnteprima();
    origine = a;
    anteprima = document.createElement("div");
    anteprima.className = "anteprima-gloss";
    anteprima.setAttribute("role", "tooltip");
    anteprima.id = "anteprima-gloss";
    const t = document.createElement("strong"); t.textContent = voce.t;
    const d = document.createElement("span"); d.textContent = voce.d + (voce.dev ? " (In sviluppo)" : "");
    const l = document.createElement("a"); l.href = a.href; l.textContent = "Apri nel Glossario";
    anteprima.append(t, d, document.createElement("br"), l);
    document.body.appendChild(anteprima);
    const r = a.getBoundingClientRect();
    const larghezza = anteprima.offsetWidth;
    let x = window.scrollX + r.left;
    x = Math.min(x, window.scrollX + document.documentElement.clientWidth - larghezza - 12);
    x = Math.max(window.scrollX + 12, x);
    anteprima.style.left = x + "px";
    anteprima.style.top = (window.scrollY + r.bottom + 8) + "px";
    a.setAttribute("aria-describedby", "anteprima-gloss");
  };
  const tocco = window.matchMedia("(hover: none)");
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a.gloss");
    if (a && glossario[a.dataset.gloss]) {
      // Primo tocco: anteprima. Secondo tocco sullo stesso termine: apre il Glossario.
      if (origine !== a) { e.preventDefault(); mostraAnteprima(a); }
      return;
    }
    if (anteprima && !e.target.closest(".anteprima-gloss")) chiudiAnteprima();
  });
  document.addEventListener("mouseover", (e) => {
    if (tocco.matches) return;
    const a = e.target.closest("a.gloss");
    if (a && a !== origine) mostraAnteprima(a);
  });
  document.addEventListener("focusin", (e) => {
    const a = e.target.closest && e.target.closest("a.gloss");
    if (a && a !== origine) mostraAnteprima(a);
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") chiudiAnteprima(); });

  /* ---------- Ricerca (Pagefind) ---------- */
  let pagefind = null;
  const caricaPagefind = async () => {
    if (pagefind) return pagefind;
    pagefind = await import(BASE + "pagefind/pagefind.js");
    await pagefind.options({ excerptLength: 22 });
    pagefind.init();
    return pagefind;
  };
  const sicuro = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  document.querySelectorAll(".ricerca").forEach((box) => {
    const input = box.querySelector("[data-cerca]");
    const pannello = box.querySelector("[data-risultati]");
    let timer = null, giro = 0;

    const nascondi = () => { pannello.hidden = true; };
    const cerca = async () => {
      const q = input.value.trim();
      const mio = ++giro;
      if (q.length < 2) { nascondi(); return; }
      let pf;
      try { pf = await caricaPagefind(); }
      catch (e) { pannello.innerHTML = '<p class="ricerca-vuota">La ricerca sarà disponibile sul sito pubblicato.</p>'; pannello.hidden = false; return; }
      const r = await pf.search(q);
      if (mio !== giro) return;
      const dati = await Promise.all(r.results.slice(0, 6).map((x) => x.data()));
      if (mio !== giro) return;
      if (!dati.length) {
        pannello.innerHTML = `<p class="ricerca-vuota">Nessun risultato per «${sicuro(q)}».</p>`;
        pannello.hidden = false;
        return;
      }
      const voci = [];
      dati.forEach((d) => {
        const titoloPagina = d.meta.title || "";
        const sotto = (d.sub_results || []).filter((s) => s.title && s.title !== titoloPagina).slice(0, 2);
        if (sotto.length) {
          sotto.forEach((s) => voci.push({ url: s.url, percorso: titoloPagina, titolo: s.title, estratto: s.excerpt }));
        } else {
          voci.push({ url: d.url, percorso: "", titolo: titoloPagina, estratto: d.excerpt });
        }
      });
      pannello.innerHTML = voci.slice(0, 8).map((v) =>
        `<a class="risultato" href="${v.url}">` +
        (v.percorso ? `<span class="risultato-percorso">${sicuro(v.percorso)}</span>` : "") +
        `<span class="risultato-titolo">${sicuro(v.titolo)}</span>` +
        `<span class="risultato-estratto">${v.estratto}</span></a>`
      ).join("");
      pannello.hidden = false;
    };

    input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(cerca, 160); });
    input.addEventListener("focus", () => { if (input.value.trim().length >= 2) cerca(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { nascondi(); input.blur(); }
      if (e.key === "ArrowDown") { const primo = pannello.querySelector(".risultato"); if (primo) { e.preventDefault(); primo.focus(); } }
    });
    pannello.addEventListener("keydown", (e) => {
      const tutti = [...pannello.querySelectorAll(".risultato")];
      const i = tutti.indexOf(document.activeElement);
      if (e.key === "ArrowDown" && i < tutti.length - 1) { e.preventDefault(); tutti[i + 1].focus(); }
      if (e.key === "ArrowUp") { e.preventDefault(); (i > 0 ? tutti[i - 1] : input).focus(); }
      if (e.key === "Escape") { nascondi(); input.focus(); }
    });
    document.addEventListener("click", (e) => { if (!box.contains(e.target)) nascondi(); });
  });

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      const campo = document.querySelector("[data-cerca]");
      if (campo) { e.preventDefault(); campo.focus(); campo.select(); }
    }
  });

  /* ---------- Versione stampabile ---------- */
  document.querySelectorAll("[data-stampa]").forEach((b) => b.addEventListener("click", () => window.print()));
})();
