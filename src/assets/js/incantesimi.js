/* Filtri dell'elenco incantesimi: tutto nel browser, nessun server. */
(function () {
  "use strict";
  const form = document.querySelector("[data-filtri]");
  const voci = [...document.querySelectorAll(".voce-incantesimo")];
  const conteggio = document.querySelector("[data-conteggio]");
  const nessuno = document.querySelector("[data-nessuno]");
  if (!form) return;

  const valore = (nome) => {
    const el = form.querySelector(`[data-f="${nome}"]`);
    if (!el) return "";
    return el.type === "checkbox" ? el.checked : el.value.trim();
  };

  const applica = () => {
    const nome = String(valore("nome")).toLowerCase();
    const livello = valore("livello");
    const classe = valore("classe");
    const scuola = valore("scuola");
    const tempo = valore("tempo");
    const gittata = valore("gittata");
    const comp = { v: valore("comp-v"), s: valore("comp-s"), m: valore("comp-m") };
    const rituale = valore("rituale");
    let visibili = 0;

    voci.forEach((li) => {
      const d = li.dataset;
      let ok = true;
      if (nome && !d.nome.includes(nome)) ok = false;
      if (ok && livello !== "" && d.livello !== livello) ok = false;
      if (ok && classe && !d.classi.split("|").includes(classe)) ok = false;
      if (ok && scuola && d.scuola !== scuola) ok = false;
      if (ok && tempo && d.tempo !== tempo) ok = false;
      if (ok && gittata) {
        if (gittata === "incantatore" || gittata === "contatto") ok = d.gittataTipo === gittata;
        else ok = d.gittataTipo === "distanza" && Number(d.gittataMetri) >= Number(gittata);
      }
      if (ok) for (const k of ["v", "s", "m"]) if (comp[k] && d[k] !== comp[k]) ok = false;
      if (ok && rituale && d.rituale !== "si") ok = false;
      li.hidden = !ok;
      if (ok) visibili++;
    });

    conteggio.textContent = visibili === 1 ? "1 incantesimo" : `${visibili} incantesimi`;
    nessuno.hidden = visibili !== 0;
    try { sessionStorage.setItem("codex-filtri-incantesimi", JSON.stringify(stato())); } catch (e) {}
  };

  const stato = () => {
    const s = {};
    form.querySelectorAll("[data-f]").forEach((el) => { s[el.dataset.f] = el.type === "checkbox" ? el.checked : el.value; });
    return s;
  };

  // Ripristina i filtri della sessione (utile tornando indietro da un incantesimo)
  try {
    const salvato = JSON.parse(sessionStorage.getItem("codex-filtri-incantesimi") || "null");
    if (salvato) form.querySelectorAll("[data-f]").forEach((el) => {
      if (!(el.dataset.f in salvato)) return;
      if (el.type === "checkbox") el.checked = !!salvato[el.dataset.f];
      else el.value = salvato[el.dataset.f];
    });
  } catch (e) {}

  form.addEventListener("input", applica);
  form.addEventListener("change", applica);
  form.addEventListener("reset", () => setTimeout(applica, 0));
  form.addEventListener("submit", (e) => e.preventDefault());
  applica();
})();
