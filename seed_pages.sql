-- =====================================================================
-- MULTIVERSE CODEX — Seed completo con sottocategorie
-- Esegui in Supabase SQL Editor → New query
-- =====================================================================

-- ── Sottocategorie ─────────────────────────────────────────────────
INSERT INTO subcategories (id, "sectionId", name, icon, "order") VALUES
  ('sc_barbaro',   's4', 'Barbaro Divino',   '⚔️', 1),
  ('sc_mago',      's4', 'Mago Divino',      '🔮', 2),
  ('sc_guerriero', 's4', 'Guerriero Divino', '🛡️', 3);

-- ── Pagine ─────────────────────────────────────────────────────────

-- LORE: Mordenkainen (sezione Lore, pagina libera)
INSERT INTO pages (id, "sectionId", "subcategoryId", title, body, "order", created, updated) VALUES
(
  'p_lore_mordenkainen', 's2', null, 'Lore di Mordenkainen',
  $$<h2>Anno Zero: Entrata nel Settore A-002</h2>
<p>Dopo il fallimento della creazione di un mondo perfetto nel Settore A-001, Mordenkainen procede con il suo secondo esperimento. Il grande mago impiegò 100 anni (4 anni per lui) per capire che anche questo mondo si sarebbe rivelato un fallimento a causa delle troppe variabili che il territorio, gli esseri viventi e l'universo in sé presentano come <strong>instabilità</strong> in continua mutazione.</p>
<p>Da queste variabili ne risultano diverse forme di vita intelligenti, ognuna con caratteristiche uniche e proprie. Le razze comunemente diffuse in questo settore sono: Elfi, Halfling, Nani, Umani, Dragonidi, Gnomi, Mezzelfi, Mezzorchi, Tiefling.</p>
<hr/>
<h2>Il Motivo degli Esperimenti: L'Ascesa e la Vendetta di Mordenkainen</h2>
<p>Mordenkainen non fu mai un semplice studioso delle arti arcane. La sua intera esistenza è stata guidata da una sete di conoscenza che lo ha spinto a dominare ogni singola forma di energia esistente nel cosmo. Attraverso decenni di studi ossessivi sulla teoria e la manipolazione delle forze elementali e spirituali, il mago raggiunse un traguardo ritenuto impossibile per qualunque mortale: <strong>l'ascesa al piano esistenziale delle divinità</strong>.</p>
<p>Tuttavia, ciò che Mordenkainen sperava fosse l'apice della scoperta si trasformò in un conflitto brutale. Spaventate e indignate dal fatto che un essere inferiore avesse violato i confini del loro dominio, le divinità tentarono immediatamente di annientarlo per ristabilire l'ordine naturale.</p>
<p>Ferito nel corpo e nello spirito, ma sorretto da una volontà incrollabile, il mago riuscì a compiere un ultimo disperato atto di manipolazione della realtà. Concentrando ogni grammo del suo potere, strappò un frammento di materia dal tessuto stesso del piano esistenziale per generare una <strong>micro-dimensione a forma di bolla</strong> — un rifugio sicuro, vasto quanto una città, dove le divinità non avrebbero potuto raggiungerlo. Al centro di questo dominio sorge la sua reggia, un santuario fortificato dove il mago si è ritirato per curare le proprie ferite.</p>
<p>Consumato dal timore che il tempo fosse un nemico invincibile, Mordenkainen ha dedicato i primi secoli del suo esilio alla ricerca della perfezione biologica, ottenendo prima una rigenerazione permanente e poi il segreto dell'eterna giovinezza. Il suo obiettivo finale è ora la creazione di interi micro-universi artificiali — laboratori cosmici progettati per generare e addestrare <strong>Campioni</strong>, esseri di potenza straordinaria che un giorno comporranno l'esercito con cui tornerà a sfidare le divinità che lo hanno rinnegato.</p>
<hr/>
<h2>Settore A-001: Informe</h2>
<p>Il primo tentativo di Mordenkainen di creare dei Campioni. Il mago cercò di accelerare il processo di evoluzione del mana in modo incauto, usando non mana semplice ma <strong>mana primordiale</strong> — energia contenente tutti i sottotipi: mana, aura, Ki, miasma, energia divina, energia demoniaca, energia della natura, sigilli runici e altro.</p>
<p>Il risultato fu per lo più un fallimento. Gli esseri creati risultavano come mostruosità senza lineamento, in continua mutazione ed evoluzione (come Cthulhu, il polpo spaziale e interdimensionale). Da qui provengono alcuni dei lord del caos con cui i warlock stringono patti per accedere ai loro poteri.</p>
<hr/>
<h2>Settore A-003: Divino</h2>
<p>Il primo esperimento senza usare l'energia primordiale. Questo settore venne creato mediante <strong>energia divina</strong>, ricordando il detto: "Combattere il fuoco con un fuoco più grande." L'intenzione era creare un'arma anti-Dei tramite l'uso della divinità stessa — ma divina era solo l'energia, non la mente degli esseri viventi che lo abitano.</p>
<p>La maggior parte degli esseri credeva in un'utopia governata dalla virtù. Gli Dei venivano classificati in: <strong>Dei Minori</strong>, <strong>Dei Superiori</strong> e <strong>Dei Lucenti</strong>. Le divinità si dividono in Costellazioni (l'Olimpo, l'Eden, il Valhalla) e coloro senza seguaci sono destinati a sparire. Allo stesso modo, una nuova divinità può nascere nel momento in cui un essere vivente crede fermamente nella sua esistenza.</p>
<hr/>
<h2>Settore A-004: Murim</h2>
<p>In questo esperimento Mordenkainen usò l'<strong>energia del Ki</strong>, anche conosciuta come energia dell'anima. Presente in tutte le creature, non tutte sono proficienti nel suo utilizzo. Le creature nate con un corpo marziale o uno scheletro marziale decidono di percorrere la via del raffinamento dell'anima.</p>
<p>Gli esseri antropomorfi che intraprendono questo cammino vengono chiamati <strong>artisti marziali</strong>. Si radunano in sette marziali che insegnano arti di combattimento, accumulo del Ki, meditazione, raffinamento del corpo e preparazione di pillole che incrementano il Ki. Queste sette, molto potenti, influenzano interi regni e portano città sotto la loro ala.</p>
<hr/>
<h2>Settore A-005: Corrotto</h2>
<p>In questo settore Mordenkainen utilizzò il <strong>miasma</strong>, l'energia corrosiva che deriva dall'essenza dei cadaveri, dei veleni, delle malattie e dei corpi putrefatti. A differenza degli altri tipi di energia, il miasma si comporta come un'entità semi-autonoma, capace di diffondersi e corrompere l'ambiente circostante senza bisogno di essere guidata.</p>
<p>Le creature esposte al miasma subiscono una <strong>corruzione progressiva</strong>: i loro corpi si adattano alla presenza della morte come ambiente naturale. Le forme di vita più deboli vengono dissolte; quelle più tenaci emergono mutate, con una resistenza innaturale e un legame permanente con l'energia della morte.</p>
<p>Il settore appare come un paesaggio perennemente crepuscolare. Le piante non effettuano la fotosintesi — sono strutture fibrose simili a vene nere che assorbono nutrienti dalla decomposizione. I fiumi sono fluidi viscosi opachi. Nell'aria fluttua una nebbia grigiastra e il cielo è di un rosso cremisi, privo di azzurro poiché non esiste atmosfera che diffonda la luce solare. Il suono viaggia in modo ovattato, poiché il miasma è più denso dell'ossigeno.</p>$$,
  1, 1751328000000, 1751328000000
);

-- REGOLE DI GIOCO: Scala Divina (pagina libera)
INSERT INTO pages (id, "sectionId", "subcategoryId", title, body, "order", created, updated) VALUES
(
  'p_regole_scala_divina', 's7', null, 'Scala di Ascensione Divina (m+nd)',
  $$<p>Il livello divino viene trattato come la <strong>parte immaginaria di un numero complesso</strong>: separa nettamente la "materia" (il livello mortale) dall'"essenza" (il livello divino). Il livello mortale rappresenta ciò che il personaggio <em>sa fare</em>, mentre il livello divino rappresenta quanto la sua volontà può <em>piegare la realtà</em>.</p>
<p>Nel sistema <strong>m + nd</strong>: <strong>m</strong> indica il numero di Livelli Materiali, <strong>n</strong> indica il numero di Livelli Divini, e <strong>d</strong> ha la stessa funzione che "i" ha per i numeri complessi.</p>
<h2>Requisiti per l'Ascensione</h2>
<ul>
<li>Avere almeno un singolo essere vivente che creda ciecamente in loro</li>
<li>Avere almeno una struttura sacra: edicola, mausoleo, chiesa, statua, presepe o tabernacolo</li>
<li>Essere almeno al livello materiale 15</li>
</ul>
<hr/>
<h2>Il Bonus Divino (Bd)</h2>
<table>
<thead><tr><th>Livello Divino</th><th>Bonus Divino</th><th>Grado di Divinità</th><th>Caratteristica Massima</th></tr></thead>
<tbody>
<tr><td>1d – 5d</td><td>+1</td><td>Quasi-Divinità (Eroe Asceso)</td><td>22</td></tr>
<tr><td>6d – 10d</td><td>+2</td><td>Divinità Minore (Demiurgo)</td><td>26</td></tr>
<tr><td>11d – 15d</td><td>+3</td><td>Divinità Intermedia</td><td>30</td></tr>
<tr><td>16d – 20d</td><td>+5</td><td>Divinità Maggiore</td><td>40</td></tr>
</tbody>
</table>
<hr/>
<h2>I Pilastri del Potere Divino</h2>
<h3>1d – 5d: Il Risveglio dell'Essenza</h3>
<ul>
<li><strong>Corpo Atemporale:</strong> Non necessita più di cibo, acqua o sonno. L'invecchiamento si ferma.</li>
<li><strong>Scintilla Vitale:</strong> Ottiene la Rigenerazione (5–10 PF per turno).</li>
</ul>
<h3>6d – 10d: Il Potere del Demiurgo</h3>
<ul>
<li><strong>Autorità Planare:</strong> Può cambiare clima, gravità e leggi fisiche nella propria dimensione come azione bonus.</li>
<li><strong>Creazione di Vita (Campioni):</strong> Il dio può infondere parte del suo nd in creature create da lui.</li>
<li><strong>Percezione Onnipresente:</strong> Può vedere e sentire ciò che accade entro chilometri dalla sua reggia.</li>
</ul>
<h3>11d – 15d: L'Intervento Diretto</h3>
<ul>
<li><strong>Avatar:</strong> Può proiettare una copia di se stesso su altri piani esistenziali.</li>
<li><strong>Annullamento Mortale:</strong> Gli incantesimi di livello 5 o inferiore di creature non divine falliscono automaticamente contro di lui.</li>
<li><strong>Manipolazione della Trama:</strong> Può lanciare incantesimi di 9° livello usando slot di livello inferiore.</li>
</ul>
<h3>16d – 20d: L'Assoluto</h3>
<ul>
<li><strong>Immortalità Concettuale:</strong> Non può essere ucciso a meno che il suo concetto non venga cancellato dall'universo.</li>
<li><strong>Riscrittura:</strong> Una volta al giorno può alterare permanentemente la storia o la geografia di un piano.</li>
</ul>
<hr/>
<h2>Risorsa: L'Essenza Divina (Ed)</h2>
<p><strong>Punti Essenza:</strong> pari a Livello Base (m) + Livello Divino (n).</p>
<ul>
<li><strong>1 punto:</strong> Successo automatico in un tiro salvezza fallito.</li>
<li><strong>3 punti:</strong> Agire fuori dal proprio turno di iniziativa.</li>
<li><strong>5 punti:</strong> Impedire a una divinità di grado pari o inferiore di teletrasportarsi.</li>
</ul>
<hr/>
<h2>Esempio: Mordenkainen (20 + 8d)</h2>
<ul>
<li>Livello Effettivo: 20 + 8d — Divinità Minore</li>
<li>Bonus ai Tiri: +6 (Competenza) + 2 (Divino) = +8</li>
<li>Ha già creato la sua bolla (5d) e sta perfezionando i Campioni (8d). La sua crescita è basata sulla logica, non sulla fede.</li>
</ul>$$,
  1, 1751328000000, 1751328000000
);

-- ABILITÀ: Sistema del Tutorial (pagina libera)
INSERT INTO pages (id, "sectionId", "subcategoryId", title, body, "order", created, updated) VALUES
(
  'p_abilita_tutorial', 's5', null, 'Sistema del Tutorial — Divinità & Abilità',
  $$<p>Sistema creato per la campagna D&amp;D 5e ispirata a <em>The Tutorial Is Too Difficult</em>. Tutte le meccaniche si integrano con il regolamento base senza sostituirlo.</p>
<hr/>
<h2>Poteri della Fede — Divinità Originali</h2>
<p><em>Consigliato: 1 utilizzo per Riposo Breve o Lungo.</em></p>
<h3>Dio della Lentezza — Percezione Accelerata</h3>
<p><strong>Reazione · 1 utilizzo per Riposo Breve</strong><br/>Quando vieni colpito da un attacco, aggiungi il bonus di Competenza alla CA contro quel colpo. Se l'attacco manca, puoi effettuare un attacco in mischia immediato come parte della reazione.</p>
<h3>Dio del Duello — Aura del Duellante</h3>
<p><strong>Azione Bonus · 1 utilizzo per Riposo Breve</strong><br/>Scegli un nemico entro 9m. Per 1 minuto: lui ha svantaggio contro chiunque non sia te, tu infliggi +1d6 danni extra contro di lui. L'effetto svanisce se un tuo alleato lo attacca.</p>
<h3>Dio del Sacrificio — Rigenerazione Martire</h3>
<p><strong>Reazione · 1 utilizzo per Riposo Breve</strong><br/>Se scendi sotto il 50% degli HP, recuperi HP pari al tuo livello all'inizio di ogni turno per 3 round. Durante l'effetto hai svantaggio ai TS contro Paura.</p>
<h3>Dio della Gentilezza — Scudo della Gentilezza</h3>
<p><strong>Azione · 1 utilizzo per Riposo Breve</strong><br/>Una creatura entro 9m guadagna 2d8 + Mod. Carisma HP temporanei e viene rimossa una condizione di Spaventato o Charme.</p>
<hr/>
<h2>Nuove Divinità — Grazie e Autorità</h2>
<h3>Nyxar, il Senza Volto — Inganno · Oscurità · Segreti</h3>
<p><em>Nyxar non vuole adoratori — vuole testimoni. Chi stringe un patto con lui smette di esistere per il mondo.</em></p>
<p><strong>Grazia — Passo nel Nulla</strong> (Azione Bonus · 1/Riposo Breve): Diventi invisibile fino all'inizio del tuo prossimo turno. Non richiede concentrazione e non si rompe se attacchi.</p>
<p><strong>Autorità — Marchio dell'Assenza</strong> (Permanente): Il tuo nome viene dimenticato da chiunque non ti conosca già. Immune alle magie di localizzazione. Come reazione 1/Riposo Lungo: diventi un'ombra bidimensionale per 1 minuto.</p>
<h3>Khareth, la Senza Tregua — Guerra · Conquista · Sopravvivenza</h3>
<p><em>Khareth non venera i forti — li consuma. Ogni battaglia è un tributo.</em></p>
<p><strong>Grazia — Furia Residua</strong> (Passiva): Quando porti un nemico a 0 HP, recuperi HP pari al bonus di Competenza. Una volta per turno.</p>
<p><strong>Autorità — Corpo della Conquista</strong> (1/Riposo Lungo): Per 1 minuto: +2 ai tiri per colpire, ignori la resistenza ai danni fisici, puoi tornare a 1 HP una volta. Alla fine guadagni 2 livelli di Affaticamento.</p>
<h3>Varek il Radicato — Natura · Istinto · Predazione</h3>
<p><strong>Grazia — Senso della Preda</strong> (Passiva): Percepisci creature viventi entro 9m anche invisibili. Non funziona contro non-morti o costrutti.</p>
<p><strong>Autorità — Forma della Bestia Primordiale</strong> (1/Riposo Lungo): Per 10 minuti ti trasformi in una bestia adatta all'ambiente. Mantieni intelligenza e abilità mentali. Vantaggio agli attacchi naturali, danni extra pari al modificatore Saggezza.</p>
<h3>Lireth la Doppia Faccia — Caos · Fortuna · Paradosso</h3>
<p><strong>Grazia — Tocco della Fortuna Cieca</strong> (Reazione · 1/Riposo Breve): Quando fallisci un tiro, puoi ritirarlo. Devi usare il secondo risultato.</p>
<p><strong>Autorità — Decreto del Caos</strong> (1/Riposo Lungo): Lancia 1d6: 1=4d10 danni ai nemici entro 6m; 2=Scambio posizione; 3=Recupera tutti gli usi; 4=Nemico Stordito; 5=3d6 danni psichici + vantaggio fino a fine incontro; 6=DM sceglie.</p>
<hr/>
<h2>Tecniche di Combattimento</h2>
<ul>
<li><strong>Passo Lampeggiante</strong> (Azione Bonus): Spostamento istantaneo di 4,5m senza attacchi di opportunità.</li>
<li><strong>Vento Tagliente</strong> (Azione): Tiro per colpire in mischia contro bersaglio a 9m. Infligge danni come tipo Forza.</li>
<li><strong>Grido del Conquistatore</strong> (Azione): Nemici entro 6m — TS Saggezza (CD 8+Comp+For) o Spaventati 1 turno.</li>
<li><strong>Resistenza al Dolore</strong> (Passiva): Riduci i danni fisici subiti di un ammontare pari al modificatore Costituzione (minimo 1).</li>
</ul>
<hr/>
<h2>Titoli del Tutorial — Beconomy</h2>
<table>
<thead><tr><th>Titolo</th><th>Bonus</th><th>Come Ottenerlo</th></tr></thead>
<tbody>
<tr><td>Pioniere dell'Inferno</td><td>+1 all'Iniziativa</td><td>Entrare per primi nella stanza di un Boss</td></tr>
<tr><td>Colui che ha Visto il Limite</td><td>+2 ai TS contro Morte</td><td>Sopravvivere a un incontro con 1 solo HP</td></tr>
<tr><td>Sterminatore di Masse</td><td>Vantaggio contro gruppi 3+ nemici</td><td>Uccidere 10+ nemici in un singolo scontro</td></tr>
<tr><td>Sfidante Solitario</td><td>+2 a Intuizione e Percezione</td><td>Risolvere un piano intero senza alleati</td></tr>
</tbody>
</table>$$,
  1, 1751328000000, 1751328000000
);

-- OGGETTI MAGICI: Martello di Dedalo (pagina libera)
INSERT INTO pages (id, "sectionId", "subcategoryId", title, body, "order", created, updated) VALUES
(
  'p_oggetti_martello', 's9', null, 'Martello di Dedalo (v2)',
  $$<p><em>Oggetto Divino Consumabile — Manufatto | Cariche: 3/3</em></p>
<p style="color:#b0a080;font-style:italic">"Questo martello, forgiato con bronzo celestiale e intriso dell'ingegno del leggendario architetto Dedalo, vibra di un'energia creativa instabile. Non è fatto per distruggere, ma per costringere la realtà a piegarsi, fondendo due forme distinte in un'unica perfezione — o in un tragico errore."</p>
<hr/>
<h2>Proprietà: Fusione Divina</h2>
<p>Il Martello di Dedalo possiede <strong>3 cariche</strong>. Quando viene consumata una carica, l'utilizzatore può colpire contemporaneamente due oggetti (armi, armature, oggetti magici o attrezzi) posti su un'incudine o una superficie piana.</p>
<p>Al momento dell'impatto, i due oggetti si dissolvono in una luce accecante per poi riapparire fusi in un <strong>singolo oggetto unico</strong>. Il nuovo oggetto mantiene le proprietà estetiche e funzionali di entrambi, ma la qualità della fusione dipende dal fato.</p>
<hr/>
<h2>La Prova del Fato (Tiro 1d4)</h2>
<table>
<thead><tr><th>Risultato d4</th><th>Esito</th><th>Effetto Meccanico</th></tr></thead>
<tbody>
<tr><td>1</td><td>Fusione Difettosa</td><td>I bonus numerici diminuiscono di 1, oppure l'oggetto acquisisce una proprietà negativa minore.</td></tr>
<tr><td>2–3</td><td>Fusione Perfetta</td><td>I due oggetti si uniscono mantenendo intatti tutti i loro effetti originali in un unico slot oggetto.</td></tr>
<tr><td>4</td><td>Fusione Celestiale</td><td>Le caratteristiche dell'oggetto risultante aumentano a discrezione del DM.</td></tr>
</tbody>
</table>
<hr/>
<h2>Limitazioni</h2>
<ul>
<li>Una volta esaurite le 3 cariche, il martello si sbriciola in polvere dorata.</li>
<li>Gli oggetti fusi non possono essere separati nuovamente, nemmeno con <em>Desiderio</em>.</li>
<li>Se si tenta di fondere un oggetto già fuso, il tiro d4 viene effettuato con Svantaggio.</li>
</ul>$$,
  1, 1751328000000, 1751328000000
);

-- CLASSI DIVINE / BARBARO DIVINO: Berserker Divino (dentro sottocategoria)
INSERT INTO pages (id, "sectionId", "subcategoryId", title, body, "order", created, updated) VALUES
(
  'p_classi_berserker', 's4', 'sc_barbaro', 'Berserker Divino — Sentiero della Furia Primordiale',
  $$<p><strong>Classe Base:</strong> Barbarian | <strong>Sottoclasse:</strong> Path of the Berserker | <strong>Risorsa Primaria:</strong> Punti Furia</p>
<p>I <strong>Punti Furia</strong> sono la risorsa locale del path Berserker. Non si sovrappongono mai alla <strong>Quintessenza (QP)</strong>, che è la risorsa cosmologica universale che determina il Rango Divino (1d–20d). Questi sono due pool completamente indipendenti.</p>
<hr/>
<h2>Risorsa: Punti Furia</h2>
<table>
<thead><tr><th>Aspetto</th><th>Valore</th></tr></thead>
<tbody>
<tr><td>Base a 1d</td><td>5</td></tr>
<tr><td>Aumento per livello</td><td>+1 per livello divino</td></tr>
<tr><td>Massimo a 20d</td><td>24</td></tr>
<tr><td>Rigenerazione</td><td>+1 per critico inflitto, +1 per danno subito</td></tr>
</tbody>
</table>
<hr/>
<h2>Tabella di Progressione (1d–20d)</h2>
<table>
<thead><tr><th>Livello</th><th>Bonus Divino</th><th>Punti Furia</th><th>Stat Cap</th><th>Abilità Principale</th><th>Tipo</th><th>Costo</th></tr></thead>
<tbody>
<tr><td>1d</td><td>+2</td><td>5</td><td>21</td><td>Furia Primordiale, Aumento Caratteristiche</td><td>Passiva</td><td>—</td></tr>
<tr><td>2d</td><td>+2</td><td>6</td><td>22</td><td>Corpo Temprato</td><td>Passiva</td><td>—</td></tr>
<tr><td>3d</td><td>+2</td><td>7</td><td>23</td><td>Attacco Selvaggio, Resilienza Divina</td><td>Attiva</td><td>3</td></tr>
<tr><td>4d</td><td>+2</td><td>8</td><td>24</td><td>Aumento Caratteristiche</td><td>Passiva</td><td>—</td></tr>
<tr><td>5d</td><td>+2</td><td>9</td><td>25</td><td>Urlo Cosmico</td><td>Attiva</td><td>4</td></tr>
<tr><td>6d</td><td>+3</td><td>10</td><td>26</td><td>Maestria della Battaglia</td><td>Passiva</td><td>—</td></tr>
<tr><td>7d</td><td>+3</td><td>11</td><td>27</td><td>Visione della Preda</td><td>Attiva</td><td>2</td></tr>
<tr><td>8d</td><td>+3</td><td>12</td><td>28</td><td>Aumento Caratteristiche</td><td>Passiva</td><td>—</td></tr>
<tr><td>9d</td><td>+3</td><td>13</td><td>29</td><td>Trascendenza Mortale</td><td>Passiva</td><td>—</td></tr>
<tr><td>10d</td><td>+3</td><td>14</td><td>30</td><td>Onda d'Urto</td><td>Attiva</td><td>4</td></tr>
<tr><td>11d</td><td>+4</td><td>15</td><td>31</td><td>Avatar della Furia</td><td>Attiva</td><td>6</td></tr>
<tr><td>12d</td><td>+4</td><td>16</td><td>32</td><td>Aumento Caratteristiche</td><td>Passiva</td><td>—</td></tr>
<tr><td>13d</td><td>+4</td><td>17</td><td>33</td><td>Resistenza Cosmica, Incatenamento Mentale</td><td>Misto</td><td>5</td></tr>
<tr><td>14d</td><td>+4</td><td>18</td><td>34</td><td>Sussurri di Eternità</td><td>Passiva</td><td>—</td></tr>
<tr><td>15d</td><td>+4</td><td>19</td><td>35</td><td>Distruzione Perpetua</td><td>Attiva</td><td>5</td></tr>
<tr><td>16d</td><td>+6</td><td>20</td><td>36</td><td>Aumento Caratteristiche</td><td>Passiva</td><td>—</td></tr>
<tr><td>17d</td><td>+6</td><td>21</td><td>37</td><td>Immortalità Concettuale, Riscrittura della Battaglia</td><td>Misto</td><td>7</td></tr>
<tr><td>18d</td><td>+6</td><td>22</td><td>38</td><td>Apocalisse Personale</td><td>Attiva</td><td>6</td></tr>
<tr><td>19d</td><td>+6</td><td>23</td><td>39</td><td>Consunzione Divina</td><td>Passiva</td><td>—</td></tr>
<tr><td>20d</td><td>+6</td><td>24</td><td>40</td><td>Aumento Caratteristiche, Devastazione Finale</td><td>Attiva</td><td>10</td></tr>
</tbody>
</table>
<hr/>
<h2>Abilità Dettagliate</h2>
<h3>1d — Furia Primordiale (Passiva)</h3>
<p>Vantaggio su tutti i tiri Forza; +1 danno su tutti gli attacchi corpo a corpo.</p>
<h3>2d — Corpo Temprato (Passiva)</h3>
<p>Resistenza al danno non magico (dimezza il danno subito).</p>
<h3>3d — Attacco Selvaggio (Attiva · 3 PF · Azione)</h3>
<p>Doppio degli attacchi + 1d4 attacchi extra. Fino al prossimo turno: nemici hanno vantaggio per colpirti.</p>
<h3>3d — Resilienza Divina (Passiva)</h3>
<p>All'inizio di ogni turno in combattimento: guarisci 2d4 + mod. CON PF.</p>
<h3>5d — Urlo Cosmico (Attiva · 4 PF · Azione)</h3>
<p>Nemici entro 25m: svantaggio ai TS per 1d4 turni. Nemici entro 10m: TS Saggezza (CD 8+mCa+mCo) o Paralizzati di paura per 1 turno.</p>
<h3>10d — Onda d'Urto (Attiva · 4 PF · Azione)</h3>
<p>Nemici entro 5m: 10d8 + mod. Forza danni (TS Forza CD 16 per dimezzare). Soggetti spinti 5m; se colpiscono un ostacolo subiscono 4d8 danni extra.</p>
<h3>20d — Devastazione Finale (Attiva · 10 PF · Azione · 1/Riposo Lungo)</h3>
<p>Sfera 20m di raggio: 24d8 danni (TS Costituzione CD 18 per dimezzare). Chi fallisce: 1d4 livelli Esaurimento + Paralisi 2 turni. Tutte le strutture nell'area vengono distrutte.</p>
<hr/>
<h2>Note di Design</h2>
<ul>
<li>Ratio abilità: 8 Passive / 12 Attive (40% / 60%)</li>
<li>Tier 1d–5d: divine_minor | Tier 6d–15d: divine_intermediate | Tier 16d–20d: divine_greater</li>
<li>Le core mechanics sono identiche in tutti i settori. Solo il flavor narrativo varia per A-002, A-004, A-005.</li>
</ul>$$,
  1, 1751328000000, 1751328000000
);
