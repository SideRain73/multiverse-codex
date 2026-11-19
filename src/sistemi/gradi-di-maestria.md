---
layout: pagina.njk
title: Gradi di Maestria
sezione: Abilità e sistemi
occhiello: Abilità e sistemi · Capitolo 13
sottotitolo: Le abilità crescono con l'esperienza sul campo, non con il livello.
permalink: /sistemi/gradi-di-maestria/
---
Sistema di progressione alternativo che slega l'avanzamento delle **abilità di caratteristica** dal livello del personaggio, legandolo all'esperienza pratica sul campo e alle attitudini naturali.

## La scala dei Gradi

Il bonus di un'abilità dipende dal [[Grado di Maestria]] raggiunto in quella specifica abilità, **sommato sempre al modificatore di caratteristica**.

<div class="tabella-scroll">

| Grado | Titolo | Bonus fisso | Descrizione |
|---|---|---|---|
| 0 | Incompetente | +0 | Nessun addestramento: solo modificatore di caratteristica |
| 1 | Principiante | Bonus Competenza | Conoscenze e pratiche di base |
| 2 | Competente | Bonus Competenza + 2 | Pratica approfondita, livello professionale medio |
| 3 | Esperto | Bonus Competenza + 4 | Tra i migliori specialisti della regione; fallimenti rari su compiti standard |
| 4 | Maestro | Bonus Competenza + 6 | Livello leggendario: imprese apparentemente impossibili |

</div>

## Accumulo dei punti dal d20

Ogni prova di abilità con **reale rischio, posta in gioco o necessità** (esclusi tiri banali o ripetuti in sicurezza) modifica il contatore di quell'abilità in base al risultato **puro** del d20 unito esclusivamente al modificatore di caratteristica che l'abilità richiede:

<div class="tabella-scroll">

| Risultato d20 | Esito | Punti |
|---|---|---|
| 1 | Fallimento critico | −2 |
| 2 – 5 | Fallimento | −1 |
| 6 – 14 | Neutro | +0 |
| 15 – 19 | Successo | +1 |
| 20 | Successo critico | +2 |

</div>

Il punteggio accumulato in un grado **non scende mai sotto 0**: una serie sfortunata non fa retrocedere di Grado.

## Soglie di avanzamento

{% riquadro "Formula" %}
**Soglia effettiva = Soglia base − (modificatore di caratteristica × 5)**
{% endriquadro %}

<div class="tabella-scroll">

| Passaggio | Soglia base | Con mod +0 | Con mod +2 | Con mod +5 | Con mod −1 |
|---|---|---|---|---|---|
| Incompetente → Principiante | 30 | 30 | 20 | 5 | 35 |
| Principiante → Competente | 40 | 40 | 30 | 15 | 45 |
| Competente → Esperto | 50 | 50 | 40 | 25 | 55 |
| Esperto → Maestro | 70 | 70 | 60 | 45 | 75 |

</div>

## Esempio

Un Ladro con DES 14 (mod +2) parte Incompetente in Rapidità di Mano. La sua soglia effettiva per Principiante è **20 punti** (30 − 10). Accumulando successi in furti e borseggi rischiosi raggiunge 20 punti: l'abilità avanza immediatamente a Principiante, il suo bonus passa da +2 (solo DES) a +2 + Bonus Competenza, e il contatore si azzera. La soglia successiva, per Competente, è **30 punti** (40 − 10).

## Regole di gestione

- Al raggiungimento della soglia, l'avanzamento è **immediato** e il contatore si azzera.
- Contano solo le prove con **rischio reale**: il DM ha l'ultima parola su quali tiri alimentano il contatore.
- Il sistema si applica alle **abilità**, non a tiri salvezza, tiri per colpire o competenze negli strumenti rimasti tali (vedi [Strumenti](#strumenti-che-restano-strumenti)).

## Elenco delle abilità

Il sistema conta **31 abilità**. Quelle segnate con ★ sono **nuove** rispetto alla 5e.

<div class="tabella-scroll">

| Caratteristica | Abilità |
|---|---|
| **Forza** | Atletica · ★ Forgiatura |
| **Destrezza** | Acrobazia · Furtività · Rapidità di Mano · ★ Scasso · ★ Guidare · ★ Pilotare |
| **Intelligenza** | ★ Alchimia · Arcano · ★ Cartografia · ★ Decifrare Scritture · Indagare · ★ Ingegneria · Natura · Religione · Storia · ★ Valutare |
| **Saggezza** | Addestrare Animali · ★ Cucina · Intuizione · Medicina · ★ Navigazione · Percezione · Sopravvivenza |
| **Carisma** | ★ Comandare · Inganno · Intimidire · Intrattenere · Persuasione · ★ Raccogliere Informazioni |
| **Costituzione** | *Nessuna abilità associata* — la Costituzione resta legata ai tiri salvezza e alle prove di caratteristica pure |

</div>

## Le nuove abilità

### Forgiatura (Forza)

**Copre:** forgiare, riparare e modificare armi, armature e oggetti di metallo; giudicare la qualità di un pezzo lavorato.
**Esempi:** riparare una lama scheggiata prima di uno scontro, capire se un'armatura è stata indebolita, lavorare il metallo in una fucina improvvisata.
**Confine:** stimare il **valore** di commercio di un pezzo è **Valutare**.

### Scasso (Destrezza)

**Copre:** aprire serrature, forzare lucchetti e disinnescare trappole meccaniche.
**Esempi:** aprire una porta chiusa a chiave, disattivare una lama a molla, richiudere una serratura senza lasciare segni.
**Confine:** **trovare** la trappola è Percezione o Indagare; **sfilare** oggetti e fare giochi di mano resta **Rapidità di Mano**.

### Guidare (Destrezza)

**Copre:** condurre veicoli di terra (carri, carrozze, slitte) e **cavalcare in condizioni sfavorevoli o pericolose**.
**Esempi:** tenere una carrozza in strada durante un inseguimento, spronare il cavallo sul ciglio di un burrone, attraversare un pantano in sella.
**Confine:** il **controllo ordinario** di una cavalcatura (calmarla, farle eseguire un comando, montarla in condizioni normali) resta **Addestrare Animali**.

### Pilotare (Destrezza)

**Copre:** governare **in manovra** veicoli d'acqua e d'aria.
**Esempi:** evitare uno scoglio con una barca, virare un veliero nella tempesta, tenere in rotta un'aeronave sotto attacco.
**Confine:** **sapere dove andare** e tracciare la rotta è **Navigazione**.

### Alchimia (Intelligenza)

**Copre:** preparare e identificare pozioni, acidi, fumi, reagenti e sostanze alchemiche.
**Esempi:** riconoscere una pozione dal colore e dall'odore, preparare un acido per corrodere una serratura, capire cosa c'era in una fiala vuota.
**Confine:** gli effetti di una sostanza su un corpo vivo e la cura di un avvelenamento sono **Medicina**; la natura **magica** di un reagente è **Arcano**.

### Cartografia (Intelligenza)

**Copre:** leggere, disegnare, copiare e correggere mappe e piante.
**Esempi:** ricostruire la pianta di un edificio dopo averlo attraversato, accorgersi che una mappa è sbagliata o falsificata, disegnare un percorso per altri.
**Confine:** **orientarsi sul campo** è **Navigazione**; **non perdersi** in natura è **Sopravvivenza**.

### Decifrare Scritture (Intelligenza)

**Copre:** codici, cifrari, scritture antiche o sconosciute, messaggi nascosti in un testo.
**Esempi:** rompere un cifrario, capire il senso generale di un'iscrizione in una scrittura ignota, notare un messaggio celato in una lettera.
**Confine:** **non sostituisce** la conoscenza di una lingua: permette di intuire, non di leggere correntemente. Il contesto storico di un testo è **Storia**, quello magico **Arcano**.

### Ingegneria (Intelligenza)

**Copre:** meccanismi, congegni, macchine e strutture; capire come funzionano, ripararli o sabotarli.
**Esempi:** capire dove cederà un soffitto, riparare un meccanismo inceppato, individuare il punto debole di un congegno, capire come è costruito uno speaker.
**Confine:** le trappole meccaniche da **aprire o disinnescare** sono **Scasso**; la magia che alimenta un congegno è **Arcano**.

### Valutare (Intelligenza)

**Copre:** stimare il valore e l'autenticità di merci, gemme, opere, monete e oggetti; riconoscere i falsi.
**Esempi:** capire se un gioiello è vero, stimare il valore di un bottino, accorgersi di una truffa al mercato.
**Confine:** **dedurre** chi ha fatto cosa dagli indizi è **Indagare**.

### Cucina (Saggezza)

**Copre:** preparare cibo, conservarlo e riconoscere cibo guasto o alterato.
**Esempi:** preparare un pasto decente con poco, accorgersi che un piatto ha un sapore sbagliato, conservare le provviste per un lungo viaggio.
**Confine:** **identificare** un veleno è **Alchimia** o **Medicina**; **trovare** cibo in natura è **Sopravvivenza**.

### Navigazione (Saggezza)

**Copre:** orientarsi e tracciare rotte su terra, mare o cielo, con strumenti, stelle o punti di riferimento.
**Esempi:** calcolare la posizione di una nave, scegliere la rotta più rapida, orientarsi di notte senza strade.
**Confine:** **manovrare** il veicolo è **Pilotare** o **Guidare**; leggere o disegnare una mappa è **Cartografia**.

### Comandare (Carisma)

**Copre:** dare ordini sotto pressione, coordinare un gruppo, tenere la disciplina, farsi obbedire da chi riconosce la tua autorità.
**Esempi:** organizzare dei civili in fuga, tenere unita una squadra dopo un'imboscata, far eseguire una manovra a dei soldati.
**Confine:** ottenere obbedienza con la **paura** è **Intimidire**; **convincere** qualcuno che non deve obbedirti è **Persuasione**.

### Raccogliere Informazioni (Carisma)

**Copre:** far parlare una comunità: raccogliere voci, frequentare taverne e mercati, origliare conversazioni, capire chi sa cosa.
**Esempi:** scoprire in una serata cosa si dice in un quartiere, origliare un tavolo senza farsi notare, trovare la persona giusta a cui chiedere.
**Confine:** **dedurre** dagli indizi è **Indagare**; **notare** qualcosa nell'ambiente è **Percezione**; capire se chi parla **mente** è **Intuizione**.

## Strumenti convertiti in abilità

Queste competenze negli strumenti **non esistono più come strumenti**: sono diventate abilità e seguono i Gradi di Maestria.

<div class="tabella-scroll">

| Strumento 5e | Diventa |
|---|---|
| Strumenti da fabbro | **Forgiatura** |
| Arnesi da scasso | **Scasso** |
| Veicoli terrestri | **Guidare** |
| Veicoli acquatici · Veicoli aerei | **Pilotare** |
| Scorte da alchimista | **Alchimia** |
| Strumenti da cartografo | **Cartografia** |
| Attrezzi da inventore | **Ingegneria** |
| Utensili da cuoco | **Cucina** |
| Strumenti da navigatore | **Navigazione** |

</div>

## Strumenti che restano strumenti

Restano **competenze negli strumenti** della 5e, **fuori dal sistema dei Gradi**, e si annotano nella scheda sotto «Strumenti e kit»:

- strumenti musicali;
- kit da travestimento;
- kit da falsario;
- set da gioco;
- kit da erborista;
- kit da avvelenatore;
- tutti gli strumenti da artigiano non elencati tra gli strumenti convertiti.

## Conversione dei personaggi esistenti

- Chi ha la **competenza in uno strumento convertito** parte dal **Grado 1 (Principiante)** nell'abilità corrispondente, con il contatore a 0.
- Chi ha la competenza in **due strumenti** che confluiscono nella stessa abilità (per esempio veicoli acquatici e veicoli aerei) parte comunque dal **Grado 1**.
- Tutte le altre nuove abilità partono dal **Grado 0 (Incompetente)**.

{% insviluppo "In sviluppo — Maestria di classe" %}
La conversione della **Maestria di classe** (Expertise 5e) su uno strumento convertito sarà definita in una sessione dedicata.
{% endinsviluppo %}
