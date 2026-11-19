---
layout: pagina.njk
title: Scaling divino e regole canoniche
sezione: Il sistema m+nd
occhiello: Il sistema m+nd · Capitolo 4
sottotitolo: PF, danno, CA, tiri e le regole canoniche di sistema.
permalink: /sistema/scaling-divino/
---
## Principio di universalità

Le formule di questa pagina si applicano a **qualsiasi essere con livelli divini**: PG, PNG e bestie divine. Non sono limitate ai nemici.

Esiste una quarta formula di scaling (quella del [[CR]]) che si applica **esclusivamente alle creature con CR**. I PG non hanno CR, quindi non li riguarda.

## Punti Ferita

{% riquadro "Formula" %}
**PF totali = PF_base × (2 + nd² / 8)** — scaling quadratico.
{% endriquadro %}

Dove PF_base sono i [[PF]] del personaggio senza livelli divini. Moltiplicatori di esempio: 1d → ×2,125 · 2d → ×2,5 · 3d → ×3,125 · 5d → ×5,125 · 10d → ×14,5 · 20d → ×52.

## Moltiplicatore del danno

{% riquadro "Formula" %}
**[[Moltiplicatore danno]] = 2 + nd² / 16** — scaling quadratico.
{% endriquadro %}

Si applica al **totale di ogni istanza di danno in dadi e valori fissi** di un essere divino: attacchi, incantesimi mortali (trucchetti compresi) e **abilità di Divine Path**. I dadi scritti nelle abilità sono sempre dadi base, da moltiplicare. Esempi: 1d → ×2,06 · 2d → ×2,25 · 3d → ×2,56 · 5d → ×3,56 · 10d → ×8,25 · 20d → ×27.

**Cure.** Le cure in dadi e valori fissi degli incantesimi mortali di un essere divino ricevono lo stesso moltiplicatore: *Guarigione* (70) vale 179 a 3d e 1.890 a 20d.

**Cosa non si moltiplica.**

- I valori espressi in **% dei PF** (danni, cure, soglie): i PF su cui si calcolano contengono già il moltiplicatore PF.
- I **valori derivati**, cioè calcolati da un danno o da altri PF (danni trasferiti, riflessi, assorbiti; cure pari a una quota del danno inflitto), **se il valore di partenza era già scalato**. Se non lo era (per esempio la metà del colpo di un attaccante mortale), il derivato riceve il moltiplicatore di chi lo produce.
- In un effetto misto ogni componente segue la propria regola: in «4d8 + il 5% dei PF» si moltiplicano i 4d8, non il 5%.

I PF crescono più in fretta del danno: due esseri divini di pari rango combattono più a lungo di due mortali (a 20d circa il doppio). Il potere di un essere divino contro chi gli sta sotto non cambia, perché il prodotto dei due moltiplicatori è lo stesso a ogni rango.

A tier divino i danni esplodono: gli scontri tra esseri di tier divino e mortali di basso livello sono volutamente sbilanciati.

## Classe Armatura

{% riquadro "Formula" %}
**[[CA]] = CA_base + (nd × 0,30)** — scaling lineare.
{% endriquadro %}

Il bonus nd × 0,30 si arrotonda all'**intero più vicino** (0,5 per eccesso): 1d → +0 · 2d → +1 · 3d → +1 · 5d → +2 · 10d → +3 · 15d → +5 · 20d → +6.

## Tiri per Colpire, CD e Tiri Salvezza

Il [[Bd]] si somma sempre al Bonus di Competenza:

- **[[TxC]] = modificatore di Destrezza + Bonus Competenza + Bd**
- **[[CD]] = 8 + modificatore di caratteristica + Bonus Competenza + Bd**
- **[[TS]] = modificatore di caratteristica + Bonus Competenza (se competenti) + Bd**: il Bd vale su **tutti** i tiri salvezza, anche quelli senza competenza

Esempio: un personaggio 20+3d con DES +7, Bonus Competenza +6, Bd +2 ha TxC in mischia +15. Lo stesso personaggio, senza competenza nei TS su Intelligenza e con INT +1, ha TS su INT +3.

## Tiro per Colpire e Bonus al Danno

Regola canonica. Vale per **tutti**: personaggi giocanti, PNG, mostri e bestie divine.

<div class="tabella-scroll">

| Valore | Caratteristica usata |
|---|---|
| **Tiro per Colpire (TxC)** | **Destrezza** + Bonus Competenza + Bd |
| **Bonus al Danno** | **Forza** |

</div>

**La Forza non viene mai usata per il Tiro per Colpire.** La Destrezza può essere usata anche per il [[bonus al danno]] solo nei casi già previsti dalle regole standard (armi accurate, armi a distanza).

In pratica: la Destrezza dice **se colpisci**, la Forza dice **quanto fa male**.

### Eccezione — Creatura Massiccia

Una [[creatura massiccia|creatura]] con **Forza pari o superiore a 26** usa il **migliore** tra il modificatore di Forza e quello di Destrezza per il Tiro per Colpire. Un attacco portato da una creatura di quella stazza copre un'area invece di un singolo punto: la precisione diventa irrilevante quando l'arto che colpisce è più largo del bersaglio.

### CD degli effetti secondari

<div class="tabella-scroll">

| Tipo di effetto | Caratteristica della CD |
|---|---|
| Spinte, cadute prone, impatti, travolgimenti | **Forza** |
| Prese, agganci, avvinghiamenti, effetti di precisione | **Destrezza** |

</div>

La tabella vale per gli **effetti secondari degli attacchi**: la spinta, la caduta prona o la presa che un colpo aggiunge al proprio danno. La **CD principale di un'abilità di Divine Path** usa la caratteristica della classe indicata nella sua pagina, anche quando l'effetto è un'onda d'urto o un impatto.

## Magia degli incantatori divini

Regola canonica. Un personaggio con **livelli divini** applica il **Bonus Divino** a **tutta** la propria magia, non solo alle abilità divine: sia alla **CD** sia al **tiro per colpire** dei propri **incantesimi mortali**.

- **CD unificata:** 8 + modificatore della caratteristica da incantatore + Bonus di Competenza + Bd
- **Tiro per colpire con incantesimi:** modificatore della caratteristica da incantatore + Bonus di Competenza + Bd

**Deroga esplicita al Manuale del Giocatore.** Le regole PHB (8 + caratteristica + competenza per la CD; caratteristica + competenza per il TxC) restano valide per i mortali puri (nd = 0). Dal rango 1d in poi, la divinità permea **tutta** la magia dell'individuo: non esiste una separazione fra «i suoi poteri divini» e «i suoi incantesimi», perché è la stessa entità a lanciarli.

**Conseguenza:** per un incantatore divino, CD delle abilità divine e CD degli incantesimi sono **sempre lo stesso numero**.

**Moltiplicatore danno sugli incantesimi.** Il moltiplicatore danno (2 + nd²/16) si applica **anche ai danni degli incantesimi mortali** di un personaggio con livelli divini, trucchetti compresi, sul **totale** di ogni istanza (dadi più modificatori fissi). Esempio: un incantatore 4d (×3) con *Dito della Morte* infligge (7d8 + 30) × 3. Le cure seguono la stessa regola (vedi sopra).

## Cumulo di Vantaggio e Svantaggio

{% riquadro "Deroga alla 5e" %}
Questa regola **sostituisce quella del manuale base**. In D&D 5e vantaggio e svantaggio **non si sommano**: dieci fonti di vantaggio valgono come una, e una sola fonte di svantaggio le annulla tutte. **Nel sistema m+nd non è così.**
{% endriquadro %}

### Il Grado di Vantaggio (GV)

Ogni **fonte distinta** di vantaggio vale **+1 [[GV]]**. Ogni fonte distinta di svantaggio vale **−1 GV**. Si sommano, e si annullano **una a una**.

<div class="tabella-scroll">

| GV | Come tiri |
|---|---|
| **0** | 1d20 normale |
| **+1** | 2d20, tieni il **migliore** *(equivale al vantaggio standard 5e)* |
| **+2** | 3d20, tieni il **migliore** |
| **+3** | 4d20, tieni il **migliore** |
| **−1** | 2d20, tieni il **peggiore** *(equivale allo svantaggio standard 5e)* |
| **−2** | 3d20, tieni il **peggiore** |
| **−3** | 4d20, tieni il **peggiore** |

</div>

Con GV pari a ±N tiri **(N+1)d20**. Il **tetto è ±3**: oltre quel punto i gradi in eccesso non aggiungono dadi, ma restano contati e possono essere annullati da gradi di segno opposto.

### Le quattro regole pratiche

1. **Conta le fonti, non gli effetti.** Due abilità diverse che ti danno vantaggio valgono **+2 GV**. La stessa abilità che si applica due volte vale **+1 GV**.
2. **Si annullano uno a uno.** Hai +2 GV e prendi uno svantaggio? Resti a **+1 GV**, non a zero. È la differenza principale rispetto alla 5e.
3. **Le condizioni valgono un grado.** Ogni volta che una regola dice *«hai vantaggio»* o *«hai svantaggio»*, stai ricevendo **un grado**, non un interruttore acceso o spento.
4. **Vale per tutti.** Anche i mostri accumulano gradi. Se il gruppo ne acceca uno mentre è prono e circondato, quei gradi si sommano davvero.

### Cosa aspettarsi

<div class="tabella-scroll">

| GV | Media del tiro | Probabilità di 20 naturale |
|---|---|---|
| **0** | 10,5 | 5,0% |
| **+1** | 13,8 | 9,8% |
| **+2** | 15,5 | 14,3% |
| **+3** | 16,5 | 18,6% |

</div>

**Il vero guadagno è il critico.** Il secondo e il terzo grado alzano la media molto meno del primo — c'è un rendimento decrescente. Ciò che continua a crescere quasi in linea retta è la **probabilità di critico**, che a +3 GV è più che tripla rispetto al normale. Accumulare vantaggi non serve tanto a colpire: serve a **colpire forte**.

## Vantaggio contro la neutralizzazione

Una creatura con **livelli divini** ha **vantaggio (+1 GV)** ai tiri salvezza contro gli **[[incantesimo neutralizzante|incantesimi neutralizzanti]]**, se chi lancia **non ha un Rango Massimo superiore** al suo (un mortale ha Rango 0). Non vale contro le abilità di Divine Path. Vale anche per i mostri e i PNG divini contro gli incantesimi dei PG.

**Lista chiusa:** *Esilio* · *Spostamento Planare* (su creatura non consenziente) · *Blocca Persone* · *Blocca Mostri* · *Dominare Bestie* · *Dominare Persone* · *Dominare Mostri* · *Danza Irresistibile di Otto* · *Debilitare la Mente* · *Labirinto* (prova per uscirne) · *Metamorfosi* · *Metamorfosi Pura* · *Carne in Pietra* · *Imprigionamento*.

Il DM può aggiungere alla lista, in un secondo momento, altri incantesimi con lo stesso effetto (neutralizzare o controllare il bersaglio con un solo TS).

## Caratteristiche: mortali ascesi e divinità nate

Il cap progressivo 21→40 (vedi [Caratteristiche Massime](/sistema/ascensione-divina/#caratteristiche-massime-stat-cap)) regola solo la **parte divina** dei punteggi di un **mortale asceso**; la parte mortale segue il tetto mortale di 20. Le creature di natura divina nata non vi sono soggette: i loro punteggi biologici di base precedono l'ascensione. I PNG non hanno tetto.

## Moltiplicatori per fascia

<div class="tabella-scroll">

| Grado di Divinità | Range nd | Mult. danno | Mult. PF |
|---|---|---|---|
| Mortale | lv 1–20 | ×1 – ×2 | ×1 – ×2 |
| Eroe Asceso | 1d – 5d | ×2,06 – ×3,56 | ×2,13 – ×5,13 |
| Divinità Minore | 6d – 10d | ×4,25 – ×8,25 | ×6,5 – ×14,5 |
| Divinità Intermedia | 11d – 15d | ×9,56 – ×16,06 | ×17,13 – ×30,13 |
| Divinità Maggiore | 16d – 20d | ×18 – ×27 | ×34 – ×52 |

</div>

## Arrotondamento

Regola canonica. Ogni formula e ogni calcolo del sistema m+nd si arrotonda all'**intero più vicino**: da ,0 a ,4 per difetto, da ,5 a ,9 per eccesso. Vale per danni moltiplicati, PF, cure, percentuali, metà e terzi di un valore, anche nei testi delle abilità scritti prima di questa regola. **Deroga alla 5e**, che arrotonda per difetto.

## Origine degli effetti

Regola canonica.

<div class="tabella-scroll">

| Origine | Cosa comprende |
|---|---|
| **Divina** | Ogni effetto che viene da un Divine Path, da un'entità divina in quanto tale o da un **essere divino** (Rango ≥ 1d), compresi i suoi incantesimi mortali: l'origine è chi lancia, non la scuola dell'incantesimo |
| **Mortale** | Ogni effetto lanciato o prodotto da un mortale (0d): incantesimi, oggetti, capacità |

</div>

Esempio: lo *Scudo* di un Mago a 20d è di origine divina; lo stesso *Scudo* lanciato da un Mago mortale è di origine mortale. Le abilità che parlano di «effetti di origine mortale» si leggono con questa tabella.

## Unità di tempo

Le unità di tempo di **calendario** (ore, giorni, settimane) sono **ammesse** nelle abilità e nelle meccaniche, in alternativa ai cicli di gioco (round, incontro, giornata d'avventura, riposo lungo). Nessuna delle due misure ha precedenza: si usa quella che serve alla fantasia dell'effetto. Di norma: **calendario** per gli eventi cosmici e di lungo periodo, **cicli di gioco** per la meccanica di combattimento.

<div class="tabella-scroll">

| Ciclo | Definizione |
|---|---|
| **[[Incontro]]** | Lo **scontro intero**, dall'iniziativa alla fine del combattimento. «Per combattimento» è un sinonimo. Una durata «per 1 incontro» copre tutto lo scontro; un uso «1 per incontro» si ricarica alla fine dello scontro |
| **[[Giornata d'avventura]]** | Fino al **riposo lungo** successivo |

</div>
