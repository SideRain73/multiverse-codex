---
layout: pagina.njk
title: Maestro di Battaglia Divino
sezione: Classi Divine
occhiello: Classe Divina · Divine Path
sottotitolo: Apoteosi della Lama · Progressione divina 1d–20d
stampabile: true
permalink: /classi-divine/maestro-di-battaglia-divino/
---
<dl class="scheda">
<div><dt>Base mortale</dt><dd><a href="https://www.dndbeyond.com/classes/fighter">Guerriero</a></dd></div>
<div><dt>Caratteristica della classe</dt><dd><strong>DES</strong></dd></div>
<div><dt>Risorsa di path</dt><dd><strong>Punti Maestria</strong> (PM)</dd></div>
<div><dt>CD delle abilità</dt><dd><strong>8 + mod DES + Bonus di Competenza + [[Bd]]</strong></dd></div>
</dl>

{% riquadro "Regola d'Oro" %}
I Punti Maestria sono una [[risorsa di path]]: non si sovrappongono mai ai [[QP]].
{% endriquadro %}

{% vaialrango %}

## Risorsa: Punti Maestria

<div class="tabella-scroll">

| Aspetto | Valore |
|---|---|
| Base a 1d | 5 |
| Aumento | +1 per livello divino |
| Massimo a 20d | 24 |
| Recupero | Tutti con un riposo lungo · metà (per eccesso) con un riposo breve |
| In combattimento | +1 quando metti a segno un critico o quando una *Parata Divina* riesce, al massimo +1 per round, mai oltre il pool |

</div>

## Tabella 1d → 20d

<div class="tabella-scroll progressione" data-pagefind-ignore>

| nd | Bd | Punti Maestria | Car. Max | Abilità del rango | Tipo | Costo | Requisiti |
|---|---|---|---|---|---|---|---|
| [1d](#rango-1d) | +2 | 5 | 21 | **APC** · Parata Divina | Reazione | Bd PM | lv base 15+ |
| [2d](#rango-2d) | +2 | 6 | 22 | Tecnica del Flusso | Passiva | — | lv base 15+ |
| [3d](#rango-3d) | +2 | 7 | 23 | Lama Vorticosa | Attiva | 4 PM | lv base 15+ |
| [4d](#rango-4d) | +2 | 8 | 24 | **APC** · Tecniche di Precisione | Sul colpo | 1–2 PM | lv base 15+ |
| [5d](#rango-5d) | +2 | 9 | 25 | Riflessi Precognitivi · Ferita Divina | Passiva / Attiva | 5 PM | lv base 15+ |
| [6d](#rango-6d) | +3 | 10 | 26 | Ultima Guardia | Passiva | — | lv base 20 |
| [7d](#rango-7d) | +3 | 11 | 27 | Spaccatura dei Cieli | Attiva | 6 PM | lv base 20 |
| [8d](#rango-8d) | +3 | 12 | 28 | **APC** · Dottrina della Lama | Passiva | — | lv base 20 |
| [9d](#rango-9d) | +3 | 13 | 29 | Rifiuto della Morte | Passiva | — | lv base 20 |
| [10d](#rango-10d) | +3 | 14 | 30 | Eco della Lama | Passiva | — | lv base 20 |
| [11d](#rango-11d) | +4 | 15 | 31 | Temporalità Spezzata | Attiva | 7 PM | lv base 20 |
| [12d](#rango-12d) | +4 | 16 | 32 | **APC** · Colpo Dichiarato | Passiva | — | lv base 20 |
| [13d](#rango-13d) | +4 | 17 | 33 | Vortice di Lame | Attiva | 6 PM | lv base 20 |
| [14d](#rango-14d) | +4 | 18 | 34 | Inevitabilità | Passiva | — | lv base 20 |
| [15d](#rango-15d) | +4 | 19 | 35 | Cataclisma Marziale | Attiva | 9 PM | lv base 20 |
| [16d](#rango-16d) | +6 | 20 | 36 | **APC** · Incarnazione della Vittoria | Passiva | — | lv base 20 |
| [17d](#rango-17d) | +6 | 21 | 37 | Laceratore di Realtà | Attiva | 9 PM | lv base 20 |
| [18d](#rango-18d) | +6 | 22 | 38 | Fendente Triplice | Passiva | — | lv base 20 |
| [19d](#rango-19d) | +6 | 23 | 39 | Riscrittura del Duello | Attiva | 10 PM | lv base 20 |
| [20d](#rango-20d) | +6 | 24 | 40 | **APC** · Apoteosi della Spada | Attiva | 11 PM | lv base 20 |

</div>

**PM** = Punti Maestria. A 5d il costo si riferisce a *Ferita Divina*; la *Parata Divina* costa PM pari al Bd del Rango Corrente (2 · 3 · 4 · 6).
{.nota-tabella}

## Regole del path

**CD delle abilità.** Sempre **8 + mod DES + Bonus di Competenza + Bd**. Nessuna CD fissa in tutta la classe. Le [CD degli effetti secondari](/sistema/scaling-divino/#cd-degli-effetti-secondari) (spinte su FOR, prese su DES) valgono solo per gli effetti secondari degli attacchi.

**Moltiplicatore danno.** Tutti i dadi e i valori fissi di danno di questa classe sono **dadi base**. Si applica sempre il [[moltiplicatore danno]] di sistema, sul totale di ogni istanza.

**Il critico del Maestro.**

<div class="tabella-scroll">

| Passo | Regola |
|---|---|
| **Quando è critico** | Con un 20 naturale (col [[GV]] esce più spesso) o con una fonte di critico automatico della classe (*Colpo Dichiarato*). Le fonti automatiche decidono solo **se** il colpo è critico, mai quanto vale |
| **Quanto vale** | Dadi dell'arma **×2**; **×3** dal 16d (*Incarnazione della Vittoria*). Ogni istanza usa un solo gradino, il più alto |
| **Cosa si moltiplica** | Il gradino vale sui **dadi dell'arma**. I dadi extra delle abilità fanno sempre **×2** sul critico. I bonus fissi non si moltiplicano mai |
| **In che ordine** | dadi × gradino → + bonus fissi → × moltiplicatore di sistema sul totale → effetti secondari del critico |

</div>

**Legge della Lama.** (a) Gli attacchi concessi da un'abilità del Maestro non si replicano, non si ripetono e non si estendono con un'altra abilità del Maestro. (b) Ogni istanza di danno usa un solo gradino critico. (c) I danni extra delle abilità si sommano fra loro, non si moltiplicano. Il moltiplicatore di sistema non è un'abilità di classe e resta fuori dalla legge.

**Una sola attiva d'azione per turno.** In ogni tuo turno puoi usare al massimo **una** abilità attiva che richiede un'azione. Con *Azione Impetuosa* la seconda azione dello stesso turno è un'azione Attacco. Le reazioni (*Parata Divina*) e le *Tecniche di Precisione*, che si aggiungono a un colpo, non rientrano nel limite.

**«Per tuo turno».** *Impatto della Cascata*, *Eco della Lama* e *Colpo Dichiarato* valgono una volta per **tuo** turno, non nei turni delle altre creature.

**Cicli.** Le abilità usano round, riposo breve, riposo lungo e giorno. Nessuna abilità della classe usa «per combattimento».

**Origine mortale.** Dove un'abilità dice che un effetto di [[origine mortale]] non la ferma, la contrasta solo un effetto di origine divina di **[[Rango Massimo]] superiore** al tuo.

## Fascia 1d–5d · Eroe Asceso

{% abilita "1d", "APC — Aumento Punteggio Caratteristica", "rango-1d", "Passiva · Nessun costo" %}
Aumenti di 2 punti un punteggio a tua scelta, oppure di 1 punto due punteggi diversi, entro le [[Caratteristiche Massime]] del Rango Corrente. I punti che il tetto non ti consente di applicare si accantonano e li applichi in un rango successivo, appena il tetto lo permette. Gli [[APC divini|APC]] si ottengono a **1d, 4d, 8d, 12d, 16d, 20d**: sei in totale, +12 punti.
{% endabilita %}

{% abilita "1d", "Parata Divina", "parata-divina", "Reazione · Bd Punti Maestria (2 · 3 · 4 · 6)" %}
Vedi la lama arrivare prima che parta. La sposti di un dito, e il colpo che doveva aprirti va a vuoto.
{.narrativa}

Quando una creatura ti colpisce con un attacco che richiede un tiro per colpire, puoi usare la reazione e spendere **Bd PM**: l'attacco **manca**, senza tiro. Non infligge danni né effetti.

Se l'attaccante è nella tua portata, fai subito un attacco in mischia contro di lui, come parte della stessa reazione.

Una parata riuscita ti fa recuperare 1 PM (vedi [Risorsa](#risorsa-punti-maestria)).

Da 5d, con *Riflessi Precognitivi*, puoi usarla anche quando l'attacco è diretto a un alleato entro 1,5 m da te.
{% endabilita %}

{% abilita "2d", "Tecnica del Flusso", "rango-2d", "Passiva · Nessun costo" %}
Ti muovi come acqua fra le rocce. Chi provi a fermarti si ritrova a stringere il vuoto.
{.narrativa}

- Ottieni **+9 m** di movimento.
- Attraversi lo spazio di qualsiasi creatura senza che conti come terreno difficile, ma non puoi terminare il movimento nel suo spazio.
- Ogni creatura ostile di cui attraversi lo spazio **non può usare reazioni** fino all'inizio del suo prossimo turno.

**Impatto della Cascata.** Una volta per tuo turno, se ti sei mosso di almeno 6 m in linea retta, il tuo prossimo colpo in mischia di quel turno infligge **+3d8** danni e il bersaglio non può usare reazioni fino all'inizio del suo prossimo turno.
{% endabilita %}

{% abilita "3d", "Lama Vorticosa", "rango-3d", "Attiva · Azione · 4 Punti Maestria · 1 volta per riposo breve" %}
La tua lama diventa un turbine. Chi è vicino viene risucchiato dentro, chi è dentro viene colpito da ogni lato.
{.narrativa}

Prima degli attacchi, ogni creatura ostile entro **9 m** da te fa un **[[TS]] su DES** contro la tua [[CD]]. Se fallisce, la trascini fino a **6 m** verso di te, in uno spazio libero.

Poi fai **6 attacchi in mischia**, divisi come vuoi fra le creature nella tua portata. Ogni attacco infligge **+3d8** danni.

Per la Legge della Lama questi attacchi non attivano *Eco della Lama* e non ricevono *Fendente Triplice*.
{% endabilita %}

{% abilita "4d", "APC — Aumento Punteggio Caratteristica", "rango-4d", "Passiva · Nessun costo" %}
Come al 1d: +2 a un punteggio o +1 a due punteggi diversi, entro le Caratteristiche Massime del Rango Corrente.
{% endabilita %}

{% abilita "4d", "Tecniche di Precisione", "tecniche-di-precisione", "Sul colpo · 1–2 Punti Maestria · Una tecnica per turno (due dall'8d)" %}
Non colpisci dove fa più male. Colpisci dove serve.
{.narrativa}

Quando colpisci una creatura con un attacco in mischia, puoi spendere PM per aggiungere al colpo **una** tecnica. Non c'è TS: l'effetto è nel colpo stesso. Dura fino all'**inizio** del tuo prossimo turno (fino al **termine**, dall'8d).

<div class="tabella-scroll">

| Tecnica | Costo | Effetto |
|---|---|---|
| **Disarmare** | 1 PM | Il bersaglio lascia cadere un oggetto che impugna, a tua scelta. L'oggetto cade a 3 m da lui, dove decidi tu |
| **Inchiodare** | 1 PM | La velocità del bersaglio diventa 0; non può teletrasportarsi né essere spostato da altri |
| **Aprire la Guardia** | 1 PM | Gli attacchi dei tuoi alleati contro il bersaglio hanno vantaggio |
| **Recidere** | 2 PM | Il bersaglio perde la concentrazione su un incantesimo o un effetto |

</div>

Le tecniche non sono attive d'azione: non rientrano nel limite di una attiva per turno.
{% endabilita %}

{% abilita "5d", "Riflessi Precognitivi", "rango-5d", "Passiva · Nessun costo" %}
Vedi l'intenzione un istante prima del gesto. Non ti sorprendono, non ti sfuggono, e ciò che colpirebbe chi ti sta accanto lo vedi arrivare.
{.narrativa}

- **+1 permanente a Destrezza.**
- Aggiungi il **Bd** ai TS su DES.
- Non puoi essere sorpreso e hai vantaggio ai tiri di iniziativa.
- Conosci la posizione di ogni creatura entro **18 m**, anche invisibile, salvo creature di Rango Massimo superiore al tuo.
- **Vedi il colpo arrivare:** puoi usare *Parata Divina* anche quando l'attacco è diretto a un alleato entro 1,5 m da te.

{% riquadro "Eccezione dichiarata" %}
L'incremento permanente di +1 a Destrezza di questa abilità è una [[eccezione dichiarata|deroga voluta]] al principio per cui ogni progressione di caratteristica passa dagli APC. Non è un refuso né una progressione fuori tabella: con questa eccezione il Maestro arriva a **+13 punti** totali.
{% endriquadro %}
{% endabilita %}

{% abilita "5d", "Ferita Divina", "ferita-divina", "Attiva · Azione · 5 Punti Maestria" %}
Un solo colpo, e la creatura che lo riceve smette di essere protetta da qualsiasi cosa: dalla sua pelle, dalla sua magia, dalla sua natura.
{.narrativa}

Fai un attacco in mischia che **colpisce automaticamente** e infligge **+12d10** danni. Questo colpo **non può mai essere critico**.

Fino al termine del tuo prossimo turno:

- le resistenze e le immunità ai danni del bersaglio sono **sospese per chiunque** lo attacchi;
- gli attacchi dei tuoi alleati contro di lui hanno **vantaggio**.

I PF massimi del bersaglio si riducono di quanto danno gli ha inflitto questo colpo, fino al suo prossimo riposo lungo.
{% endabilita %}

## Fascia 6d–10d · Divinità Minore

{% abilita "6d", "Ultima Guardia", "rango-6d", "Passiva · 1 volta per riposo lungo" %}
Quando la battaglia sembra perduta, il tuo corpo smette di cedere. Ogni colpo ti arriva a metà, e tu hai un respiro in più per rispondere.
{.narrativa}

Quando scendi sotto il **40%** dei tuoi PF massimi, per **5 round**:

- hai **resistenza a tutti i danni**;
- sei immune alle condizioni intralciato e paralizzato.

Al tuo primo turno dopo l'attivazione ottieni **un'azione aggiuntiva**.
{% endabilita %}

{% abilita "7d", "Spaccatura dei Cieli", "rango-7d", "Attiva · Azione · 6 Punti Maestria · 1 volta per riposo breve" %}
Abbassi la lama come se tagliassi il cielo. Il colpo arriva a terra e la terra si apre: una faglia corre davanti a te per un chilometro, e non si richiude.
{.narrativa}

**La Faglia.** Fendi il terreno in linea retta: una faglia lunga fino a **1 km** e larga **9 m**, che parte da te nella direzione che scegli.

Ogni creatura ostile sulla linea fa un **TS su DES** contro la tua CD:

- **Fallimento:** **30d8** danni da forza, e la sua velocità diventa 0 fino al termine del suo prossimo turno, presa nella frattura;
- **Successo:** metà danni, nessun altro effetto.

La faglia è **permanente**: un crepaccio profondo fino a 30 m. Le strutture non magiche sulla linea crollano. Si colma solo con mezzi divini o con anni di lavoro.
{% endabilita %}

{% abilita "8d", "APC — Aumento Punteggio Caratteristica", "rango-8d", "Passiva · Nessun costo" %}
Come al 1d: +2 a un punteggio o +1 a due punteggi diversi, entro le Caratteristiche Massime del Rango Corrente.
{% endabilita %}

{% abilita "8d", "Dottrina della Lama", "dottrina-della-lama", "Passiva · Nessun costo" %}
Le tue tecniche non sono più gesti isolati. Sono una scuola, e ogni colpo ne insegna un'altra.
{.narrativa}

Le tue *Tecniche di Precisione* migliorano:

- puoi usarne **due per turno**, su colpi diversi;
- durano fino al **termine** del tuo prossimo turno;
- si aggiunge una tecnica nuova:

<div class="tabella-scroll">

| Tecnica | Costo | Effetto |
|---|---|---|
| **Silenziare** | 2 PM | Il bersaglio non può lanciare incantesimi |

</div>
{% endabilita %}

{% abilita "9d", "Rifiuto della Morte", "rango-9d", "Passiva · 1 volta per riposo lungo" %}
La morte arriva, e tu non la lasci entrare. Non ancora: prima finisci quello che hai cominciato.
{.narrativa}

Quando scendi a 0 PF in combattimento, resti a **1 PF**. Non puoi scendere sotto 1 PF fino all'**inizio del tuo secondo turno** dopo l'attivazione: giochi il tuo turno normalmente e la protezione resta attiva anche durante i turni delle altre creature che seguono.

- Se in qualunque momento di questa finestra, anche con una reazione o un attacco d'opportunità, infliggi a una creatura ostile danni pari ad almeno il **10% dei suoi PF massimi**, o la riduci a 0 PF, recuperi il **10%** dei tuoi PF massimi.
- Altrimenti, alla fine della finestra scendi a 0 PF e sei morente come in 5e.
{% endabilita %}

{% abilita "10d", "Eco della Lama", "rango-10d", "Passiva · Nessun costo" %}
Ogni tuo colpo lascia un'eco, e l'eco colpisce di nuovo.
{.narrativa}

Una volta per tuo turno, quando colpisci con un attacco in mischia, fai un **attacco aggiuntivo** con lo stesso profilo, contro la stessa creatura o un'altra entro **9 m** da te.

Per la Legge della Lama l'eco non si attiva sugli attacchi concessi dalle attive del Maestro.
{% endabilita %}

## Fascia 11d–15d · Divinità Intermedia

{% abilita "11d", "Temporalità Spezzata", "rango-11d", "Attiva · Azione · 7 Punti Maestria · 1 volta per riposo breve" %}
Per un istante il tempo va avanti per tutti tranne che per te.
{.narrativa}

Subito dopo il turno di una creatura a tua scelta ottieni **un turno completo**, con azione, movimento e azione bonus. In quel turno non puoi usare attive d'azione.
{% endabilita %}

{% abilita "12d", "APC — Aumento Punteggio Caratteristica", "rango-12d", "Passiva · Nessun costo" %}
Come al 1d: +2 a un punteggio o +1 a due punteggi diversi, entro le Caratteristiche Massime del Rango Corrente.
{% endabilita %}

{% abilita "12d", "Colpo Dichiarato", "colpo-dichiarato", "Passiva · Nessun costo" %}
Non esistono colpi sfortunati. Solo colpi che hai già deciso.
{.narrativa}

Una volta per tuo turno, dopo aver visto che un tuo attacco in mischia ha colpito e prima di tirare il danno, puoi dichiarare che quel colpo è **critico**.

Una creatura che subisce un tuo critico ha **svantaggio ai TS** fino al termine del tuo prossimo turno. Conta come una sola fonte di svantaggio, anche con più critici.
{% endabilita %}

{% abilita "13d", "Vortice di Lame", "rango-13d", "Attiva · Azione · 6 Punti Maestria · Dura 1 minuto" %}
Le lame ti girano attorno e non smettono. Chi si avvicina viene ferito, e ciò che arriva da lontano non passa.
{.narrativa}

**Corona di Lame.** Per 1 minuto un vortice di lame ti segue, entro **9 m** da te.

- Ogni creatura ostile che entra nell'area per la prima volta in un turno, o vi inizia il turno, fa un **TS su DES** contro la tua CD:
  - **Fallimento:** **10d8** danni da taglio, e la sua velocità diventa 0 fino all'inizio del suo prossimo turno;
  - **Successo:** metà danni, nessun altro effetto.
- Ogni creatura subisce questo effetto al massimo una volta per turno.
- Nessun proiettile e nessun incantesimo a distanza di origine mortale attraversa il vortice, in nessuna delle due direzioni.

Il vortice finisce prima se sei incapacitato.
{% endabilita %}

{% abilita "14d", "Inevitabilità", "rango-14d", "Passiva · Nessun costo" %}
Ciò che la tua lama ha deciso, accade.
{.narrativa}

I tuoi attacchi in mischia non possono essere annullati né ridotti da reazioni, incantesimi o effetti di origine mortale: niente *Scudo*, niente parate, niente riduzioni del danno.

Contro le difese di origine divina vale se il **Rango Massimo** del difensore è **inferiore** al tuo.
{% endabilita %}

{% abilita "15d", "Cataclisma Marziale", "rango-15d", "Attiva · Azione · 9 Punti Maestria" %}
Pianti la lama nel suolo. Il continente risponde.
{.narrativa}

**Sisma.** Entro **1 km** da te ogni creatura ostile fa un **TS su DES** contro la tua CD:

- **Fallimento:** **15d10** danni, e la sua velocità diventa 0 fino al termine del tuo prossimo turno;
- **Successo:** metà danni, nessun altro effetto.

Le strutture non magiche entro l'area crollano. Il territorio resta **rimodellato in modo permanente**: rilievi spaccati, valli aperte, fiumi deviati. Nessun mezzo mortale lo ripara.
{% endabilita %}

## Fascia 16d–20d · Divinità Maggiore

{% abilita "16d", "APC — Aumento Punteggio Caratteristica", "rango-16d", "Passiva · Nessun costo" %}
Come al 1d: +2 a un punteggio o +1 a due punteggi diversi, entro le Caratteristiche Massime del Rango Corrente.
{% endabilita %}

{% abilita "16d", "Incarnazione della Vittoria", "incarnazione-della-vittoria", "Passiva · Nessun costo" %}
La vittoria abita il tuo corpo. Quando colpisci a fondo, l'avversario perde ogni risposta.
{.narrativa}

- I tuoi critici moltiplicano i dadi dell'arma **×3** invece di ×2. I dadi extra delle abilità restano ×2.
- Quando metti a segno un critico contro una creatura, quella creatura **non può usare reazioni** fino al termine del tuo prossimo turno.
{% endabilita %}

{% abilita "17d", "Laceratore di Realtà", "rango-17d", "Attiva · Azione · 9 Punti Maestria" %}
La lama non taglia la carne. Taglia ciò che la creatura è.
{.narrativa}

**Recisione.** Fai un attacco in mischia che infligge **+20d8** danni. Se colpisci, **recidi una proprietà** del bersaglio a tua scelta:

- un'immunità o una resistenza a un tipo di danno o a una condizione;
- la capacità di volare, di teletrasportarsi o di rigenerarsi;
- un incantesimo o un effetto attivo su di lui;
- **una Resistenza Leggendaria.**

La perdita è **permanente** se il Rango Massimo del bersaglio è inferiore al tuo. Contro un pari o un superiore dura fino al suo prossimo riposo lungo.
{% endabilita %}

{% abilita "18d", "Fendente Triplice", "rango-18d", "Passiva · Nessun costo" %}
Un colpo solo, e cadono in tre.
{.narrativa}

Ogni attacco in mischia che effettui con l'azione Attacco colpisce fino a **3 bersagli diversi** entro la tua portata. Tiri una sola volta per colpire e confronti il risultato con la CA di ciascun bersaglio; il danno si tira una volta e si applica a ogni bersaglio colpito. Contro un solo bersaglio l'abilità non aggiunge attacchi né danni.

Inoltre, puoi usare un'azione bonus per muoverti di nuovo.
{% endabilita %}

{% abilita "19d", "Riscrittura del Duello", "rango-19d", "Attiva · Azione · 10 Punti Maestria · 1 volta al giorno" %}
Torni indietro di qualche istante, solo nel punto in cui la tua lama ha incontrato un'altra, e scegli come è andata.
{.narrativa}

Scegli un evento degli ultimi **5 round** che coinvolge te: un tuo attacco o un attacco contro di te, un tuo TS o un TS imposto da te. Ne cambi **completamente** l'esito: un colpo a segno diventa un mancato, un mancato diventa un colpo a segno, un TS fallito diventa riuscito e viceversa.

Non serve alcun tiro.
{% endabilita %}

{% abilita "20d", "APC — Aumento Punteggio Caratteristica", "rango-20d", "Passiva · Nessun costo" %}
Come al 1d: +2 a un punteggio o +1 a due punteggi diversi, entro le Caratteristiche Massime del Rango Corrente. È il sesto e ultimo APC divino.
{% endabilita %}

{% abilita "20d", "Apoteosi della Spada", "apoteosi-della-spada", "Attiva · Azione · 11 Punti Maestria · 1 volta per riposo lungo · Dura 1 minuto" %}
Indichi un avversario. Da quel momento, fra voi due valgono solo le leggi della spada.
{.narrativa}

**Il Duello Assoluto.** Scegli una creatura che vedi entro **30 m**. Per 1 minuto fra voi due valgono tre leggi:

1. **Nessuna fuga.** Non può allontanarsi da te oltre 9 m, teletrasportarsi, cambiare piano né essere sottratta o protetta da altri.
2. **Nessun altro bersaglio.** Non può infliggere danni, condizioni o effetti a creature diverse da te. I tuoi alleati possono continuare ad attaccarla.
3. **Nessuna guarigione.** I suoi PF non possono essere ripristinati. I tuoi attacchi in mischia contro di lei infliggono **+2d8** danni.

Le leggi si possono contrastare solo con un effetto di origine divina di Rango Massimo superiore al tuo. Il duello finisce prima se la creatura muore o se tu scendi a 0 PF.
{% endabilita %}

## Note

**APC (Aumento Punteggio Caratteristica).** Sei occorrenze: 1d, 4d, 8d, 12d, 16d, 20d. Ognuna dà +2 a un punteggio o +1 a due punteggi diversi, entro le Caratteristiche Massime del Rango Corrente; i punti che il tetto non consente di applicare si accantonano. Totale **+12 punti**, più il +1 a Destrezza di *Riflessi Precognitivi*.

**Requisiti.** Livello mortale 15+ per il primo livello divino; dal 6d serve il livello mortale 20.
