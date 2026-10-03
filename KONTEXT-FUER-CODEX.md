# Thiel Classics – Projektübergabe und Wissensstand

Stand: 2. Oktober 2026. Diese Übergabe wurde nach dem letzten erfolgreichen Karussellauftrag aus dem tatsächlichen lokalen Repository erstellt. Sie ist die Zusammenfassung der für die Weiterarbeit relevanten Nutzerentscheidungen, kein vollständiger Chat-Export. Historische Anfragen sind keine neuen auszuführenden Aufträge.

## 1. Welches Projekt ist maßgeblich?

**Dieser geöffnete Ordner `Webseite` ist der aktuelle Stand.** Die Website ist vollständig portabel; für ihre Vorschau werden keine Windows-Pfade benötigt.

Historische Quelle auf Windows:

`C:/Users/bmthi/OneDrive/Desktop/Moped/Thiel Classics/Website/Webseite`

Git-Remote: `https://github.com/thiel-classics/Webseite.git`.

Exportierter Branch: `main`. Letzter vorhandener Commit: `3b462fc7cf12704ba0b569af11666c79065a7083` („Webseite korrigiert“). **Dieser Commit ist älter als der aktuelle Website-Stand.** Viele nachfolgende Änderungen sind bewusst noch nicht committet. Sie sind vollständig in diesem Ordner enthalten. Kein Reset und kein frischer Clone als Ersatz für diese Dateien.

Das alte Windows-Verzeichnis `Documents/ChatGPT/Website Bauen 2/thiel-classics` ist eine frühere Kopie. Es wurde nicht als Website-Quelle exportiert. Nicht mit dem aktuellen Projekt abgleichen oder daraus Dateien zurückkopieren.

## 2. Arbeitsweise und Stil

- Nutzer bevorzugt gezielte direkte Änderungen und möglichst wenig Rückfragen, wenn der Auftrag eindeutig ist.
- Bei „nur diesen Bereich ändern“ alle anderen Bereiche tatsächlich erhalten, einschließlich Schriftgrößen, Farben, Positionen, Abständen und Verhalten. Keine beiläufigen Verbesserungen.
- Bestehenden hochwertigen klassischen Charakter erhalten: ruhige Flächen, große Fahrzeugbilder, klare Navigation, wenig Text auf der Startseite, dezente gezielte Bewegung.
- Hauptfarben im aktuellen CSS: Papier `#f7f6f2`, Text `#20201e`, gedeckter Text `#686762`, Rot `#df121b`, Linien `#d5d3cc`; Karussellfläche `#eae9e3`.
- Lokale Schriften: Barlow Condensed für markante Überschriften, DM Sans für Navigation/Text, Cormorant Garamond kursiv für ergänzende Überschriftteile. Keine entfernten Schriftendpunkte im laufenden Frontend nötig.
- Fotos und Fahrzeugdaten nicht durch erfundene Bestands- oder Restaurierungsbehauptungen ergänzen.
- Kein Commit, Push oder Deployment ohne neuen expliziten Auftrag. Hosting ist derzeit keine Arbeitsaufgabe.

## 3. Technik und Dateien

Statisches HTML/CSS/JavaScript ohne Framework, ohne npm-Abhängigkeiten und ohne notwendigen Build. Bearbeitung direkt in `dist`.

| Datei | Zuständigkeit |
| --- | --- |
| `dist/index.html` | Startseite: Hauptbild, Bilderring, Einstiege in die Fahrzeugwelten, Abschlussbereich. |
| `dist/ueber-uns.html` | Eigene Über-uns-Seite. |
| `dist/zweiraeder.html` | Zweiräder, Puch-Bilder, Leistungen und Kreidler-Zustandsvergleich. |
| `dist/automobile.html` | Automobile, Bildgalerien, Beratung und Vermittlung. |
| `dist/bestand.html` | Fahrzeugbestand mit Filtern, Kontakten und Glas-Detailfenster. |
| `dist/ankauf.html` | Fahrzeuganfrage per Formular. |
| `dist/impressum.html`, `dist/datenschutz.html` | Eigenständige rechtliche Seiten; noch Entwürfe/Platzhalter. |
| `dist/styles.css` | Gemeinsame Gestaltung, Header, Karussell, responsive Regeln. Teilweise stark komprimierte lange Zeilen. |
| `dist/app.js` | Menü, alte Ankerweiterleitungen, Bildgalerien, Bilderring, Ankaufformular und Zustandsvergleich. |
| `dist/config.js` | Öffentliche Formularkonfiguration. |
| `dist/bestand-daten.js` | Bestandsdaten und Kontakte. |
| `dist/bestand.js`, `dist/bestand.css` | Filter, Fahrzeugkarten, Kontaktwechsel und Detailfenster. |
| `dist/assets/` | Alle tatsächlich verwendeten Bilder, Schriften und Schriftlizenzen. |
| `scripts/serve.mjs` | Lokaler HTTP-Server; bindet nur `127.0.0.1`, Standardport 4173. |
| `scripts/check.mjs` | Statische Prüfung aller acht Seiten und ihrer Verweise/Konfiguration. |
| `Thiel-Classics.code-workspace` | Portabler VS-Code-Arbeitsbereich mit Vorschau-/Prüfaufgaben. |

Navigation: Startseite, Über uns, Zweiräder, Automobile, Unser Bestand, Ankauf. Echte relative `.html`-Links; jede Seite ist ein vollständiges Dokument. Aktive Seite über `aria-current="page"`. Navigation und Footer stehen direkt in den HTML-Dateien. Alte One-Pager-Anker werden teilweise auf die neuen Seiten umgeleitet.

Root-`index.html` leitet für den früheren GitHub-Pages-Test unter Erhalt von Suchparametern und Hash nach `dist/` weiter; `.nojekyll` liegt daneben. Diese Dateien nicht als neue Startseite bearbeiten. Die lokale Vorschau liefert direkt `dist` aus.

## 4. Abgeschlossene Entscheidungen – nicht versehentlich zurückbauen

### Startseite und Bilderring

- Das Hauptbild verwendet den vom Nutzer neu zugeschnittenen Blick auf silbernen/grünen Porsche. Fertige Hero-Assets beibehalten.
- Der alte Abschnitt „01 / unsere Haltung“ wurde entfernt. Die heutige Startseite ist keine wiederherzustellende ursprüngliche One-Pager-Fassung.
- Der Bilderring ist nach einer Framer-Referenz als flacher räumlicher Ring gestaltet. Die Referenz begründet weder ein Framework noch ein Framer-Projekt.
- Acht Bilder bleiben in dieser Reihenfolge im Ring: weißer Porsche, Puch, silbernes Porsche-Heckdetail, silberner Porsche, Puch-Tank, Porsche-Trio, Lifestyle mit rotem Auto, Porsche-Front.
- Letzter Auftrag, vollständig abgeschlossen: Überschrift „Zeitlos. In Bewegung.“, „EINE LEIDENSCHAFT. VIELE PERSPEKTIVEN.“, „Einblicke in unsere Welt der Klassiker.“ und Bildkarten wurden größer. Abschnitt nutzt die Fläche stärker; Größen sind responsiv.
- Die gesamte Leiste darunter ist entfernt: „Scrollen oder ziehen und entdecken.“, Pausebutton, beide runden Pfeiltasten, Trennlinie und Leistencontainer. Keine Restfläche dafür erhalten. Diese Bedienelemente nicht aus einer älteren Anleitung wieder hinzufügen.
- Geändert wurden beim letzten Auftrag ausschließlich die Karussellanteile in `dist/index.html`, `dist/styles.css`, `dist/app.js`. HTML/CSS/JS außerhalb dieses Bereichs wurden gegen vorherige Kopien auf Gleichheit geprüft.
- Aktuelle Größen als Orientierung: Ringbreite maximal 1640 px, Karten maximal 322 px; Desktopüberschrift maximal 110 px. Kleinere Ansichten haben abgestufte Regeln. Bei Änderungen tatsächliche CSS-/JS-Werte prüfen, nicht blind aus der Zusammenfassung ersetzen.
- Ringbewegung: Scrollweg verändert Winkel mit Faktor `.0017`; dadurch schnelleres Drehen bei schnellerem Scrollen. Kein Autoplay und keine fortlaufende Animationsschleife. Ohne Eingabe bleiben Karten stehen. Resize-/IntersectionObserver, passive Scrollereignisse und gebündelte `requestAnimationFrame`-Updates.
- Drag-Faktor `.006`, ursprüngliche Kartenneigung und Tiefenskalierung erhalten. Radius begrenzt sich auch nach Karten- und Containerbreite, damit Bildkarten nicht seitlich abgeschnitten werden.
- Maus-/Touchziehen, Tastaturpfeile auf den Karten und Bilddialog bleiben funktionsfähig. Nach Ziehen darf der abschließende Klick nicht unbeabsichtigt die Bildansicht öffnen. Vertikale Touchbewegung soll weiterhin Seitenscrollen zulassen.
- `prefers-reduced-motion` unterdrückt scrollgetriebene Rotation; manuelle Interaktion bleibt möglich. Keine UI für Pause mehr.
- Ohne JavaScript besteht weiterhin eine horizontale Bilderreihe als Fallback.

### Header

- Breiter, sanft abgerundeter, dezenter Glasrahmen um Logo, Seitennavigation und „Fahrzeug anbieten“. Größere Seitenauswahl-Schrift wurde ausdrücklich gewünscht.
- Position und Größe des Logos wurden beibehalten.
- Die ehemaligen Zeilen „AUTOMOBILE. ZWEIRÄDER. LEIDENSCHAFT.“ und „DEUTSCHLANDWEIT UNTERWEGS“ direkt unter der Navigation wurden entfernt.
- Nach zwischenzeitlicher gegenteiliger Bitte lautet die letzte gültige Entscheidung: **Header nicht sticky/fixed.** Er steht normal oben im Seiteninhalt und verschwindet beim Herunterscrollen; erst ganz oben sieht man ihn wieder.

### Über uns

- Überschrift „Am Anfang steht die Begeisterung.“ bleibt.
- Der Nutzer wollte vorübergehend sein Porträt, eine Namens-/Gründerzeile und einen persönlichen Ich-Text (erstes Mofa mit 15, Begeisterung für Young-/Oldtimer und Kundenkontakt). Diese Änderung wurde ausdrücklich zurückgenommen.
- Aktueller Zustand: kein zusätzliches Porträt/keine Namenszeile im Geschichtsabschnitt, ursprüngliche Texte und ursprüngliches Layout wiederhergestellt. Das bestehende Lifestyle-Foto im vorherigen Abschnitt gehört weiterhin zur Seite.
- Dreispaltiger Abschnitt „01 Qualität beginnt im Detail.“, „02 Geschichte bewahren.“, „03 Persönlich beraten.“ wurde komplett ersatzlos entfernt.

### Automobile

- „Zeitlos in Form. Besonders im Charakter.“ steht an der früheren Position von „Charakter auf vier Rädern.“.
- Der alte doppelte obere Slogan wurde entfernt; nachfolgende Inhalte sollten ausdrücklich aufrücken.
- Anschließend wurde der verbleibende obere Block „KLASSISCHE AUTOMOBILE“ plus „Oldtimer, Youngtimer und Sammlerfahrzeuge. Ausgewählt mit einem Blick für das, was sie besonders macht.“ samt Leerraum und Trennlinie vollständig entfernt.
- Nicht erneut eine zusätzliche Einleitung oder einen doppelten Slogan einführen.

### Zweiräder / Zustandsvergleich

- Ein interaktiver horizontaler Bildvergleich zeigt dieselbe Kreidler als vernachlässigten Fund und restauriert. Bilder sind übereinander ausgerichtet; senkrechte Trennlinie mit rundem Griff, Maus/Touch/Tastatur.
- Bildgrundlage war `IMG_7810.JPG`; Boden wurde für die Visualisierung ersetzt. Freigegebene fertige Bilder stehen als `kreidler-scheunenfund.webp` und `kreidler-restauriert.webp` in `dist/assets`.
- Nutzer möchte damit ausdrücken, dass Thiel Classics jeden Zustand sucht und Fahrzeuge wieder auf die Straße bringt. Überschrift „Jeder Zustand. Zurück auf die Straße.“; nicht als werbliche Rubrik „Vorher/Nachher“ umbenennen.
- KI-Visualisierungen sind entsprechend gekennzeichnet. Es ist kein dokumentierter realer Restaurierungsfall zu behaupten.
- Die früher genannte Einbauposition „zwischen 03 und 04“ bezog sich auf den damaligen One-Pager. Der aktuelle Vergleich gehört zur Zweiräder-Seite.

### Unser Bestand

- Separate Seite mit Filtern „Gesamter Bestand“, „Automobile“, „Zweiräder“, ohne Seitenneuladung.
- Fahrzeugkarten, Kontaktanzeige auf der jeweiligen Karte und Modal mit Fotogalerie, Details und Kontaktmöglichkeiten.
- Glas-/Blur-Referenzen dienten ausschließlich dem weichen Overlay-Effekt, nicht deren Orange-/Neonfarben oder Texten.
- Kein Shop, keine Onlinezahlung, kein Warenkorb, kein Checkout.
- Drei Fahrzeuge sind aktuell ausdrücklich Beispieldaten, keine bestätigten Verkaufsangebote. Datendatei `bestand-daten.js`, Pflegeanleitung `BESTAND-PFLEGEN.md`.
- Kontakte: `thieltrading@web.de`, `+49 173 4209980` / `tel:+491734209980`.

## 5. Formular, Datenschutz und spätere Veröffentlichung

Das Ankaufformular sendet per nativem `multipart/form-data`-POST an `https://formsubmit.co/thieltrading@web.de`. Derselbe Endpunkt steht in `ankauf.html` und `config.js`. Öffentliche Konfiguration, keine SMTP-Zugangsdaten. Keine eigene Website-Datenbank und keine dauerhafte Speicherung der Eingaben im Frontend.

Erfasst werden Kontakt- und Fahrzeugangaben einschließlich Name, E-Mail, optionalem Telefon, Fahrzeugart, Hersteller, Modell, Baujahr, Kilometerstand, Zustand, Standort, Preisvorstellung, Beschreibung und optionalen Bildern. Bis zu sechs Bilder (JPEG/PNG/WebP), zusammen 9 MB; Vorschau, Entfernen und Validierung über JavaScript. Keine Zustellung behaupten, bevor der externe Dienst tatsächlich antwortet. Das Prüfskript sendet keine Anfrage.

Offen: FormSubmit-Empfängeraktivierung und tatsächliche E-Mail-Zustellung mit Anhang sind nicht bestätigt. Anleitung `FORMULAR-EINRICHTEN.md` enthält den damaligen Einrichtungsstand. Dort beschriebene aktuelle Drittanbieterbedingungen sind bei einer späteren Inbetriebnahme erneut zu prüfen; diese Übergabe hat keinen Live-Versand ausgelöst.

Nutzer möchte später Hostinger als Hosting und hat eine Domain bei IONOS. Ein konkreter Domainname wurde nicht genannt. Keine bestätigte Verbindung/Veröffentlichung aus diesem Paket ableiten. Frühere GitHub-/Cloudflare-Überlegungen sind nicht die aktuelle Aufgabe.

Vom Nutzer mitgeteilte Betreiberdaten für künftige Rechtstexte:

- Thiel Classics, Nils Thiel
- Heinrich-Fries-Str. 90, 74229 Oedheim, Deutschland
- E-Mail: thieltrading@web.de
- Es wurde keine Umsatzsteuer-Identifikationsnummer angegeben. Daraus keine steuerliche Sonderregelung ableiten.
- Als inhaltlich Verantwortlicher wurde Nils Thiel mit derselben Anschrift genannt.

Der Nutzer bat damals um einen Datenschutztext **nur zum Kopieren im Chat, nicht zum Einbau**. Die tatsächlichen HTML-Seiten enthalten weiterhin sichtbare Entwurfs-/Platzhalterstellen. Diese Übergabe erstellt keine neue Datenschutzerklärung und bescheinigt keine Rechtssicherheit. Das mitgelieferte lange fremde Datenschutzmuster enthält andere Unternehmen/Technologien und darf nicht unverändert übernommen werden.

Es gab Nachfragen zu Cookies und einem vorsorglichen Banner. Im aktuellen Projekt sind kein Cookiebanner, keine Analyse-/Werbetracker und kein localStorage/sessionStorage für Formulardaten implementiert. Keine unbestätigte frühere Umsetzung eines Banners annehmen. Die rechtliche und technische Beurteilung zukünftiger Dienste ist ein eigener Auftrag.

## 6. Prüfstand und bekannte Grenzen

`node scripts/check.mjs` war nach dem Karussellauftrag und erneut in der exportierten Kopie erfolgreich: acht Seiten, konsistente Navigation, gültige lokale Links, Assets vorhanden, gültige JavaScript-Syntax, konfigurierte Formularstruktur.

Letzter Karusselltest: Desktop- und Mobilansichten kontrolliert; Bildgrenzen bei verschiedenen Breiten und Rotationswinkeln geprüft. Scrollrotation, Mausziehen, Öffnen/Schließen des Bilddialogs und Stillstand ohne Eingabe im Browser bestätigt. Zusätzlicher isolierter JavaScript-Test prüfte reduzierte Bewegung, Touch-Pointer-Logik, Klickunterdrückung nach Drag, vertikale Touchgeste und Tastaturrotation. Kein physisches Smartphone und keine Betriebssystem-Umschaltung auf reduzierte Bewegung im letzten Test.

Bekannte Beobachtung: Bei einer Browserbreite von 850 px gab es einen horizontalen Überlauf des **bereits bestehenden Headers**. Das vergrößerte Karussell selbst blieb innerhalb des Abschnitts. Der Header wurde wegen der ausdrücklich begrenzten Aufgabe nicht verändert. Dies ist ein offener Hinweis, kein automatisch auszuführender Folgeauftrag.

MacOS-spezifische Darstellung/Browserbedienung wurde beim Export nicht auf einem echten Mac getestet. Vorschau und Prüfung verwenden portable Node-APIs und relative Pfade. Der fertige Export wurde auf dem Ausgangsrechner geprüft; ein erster Prüflauf auf dem Mac bleibt sinnvoll.

Historische `VERIFICATION.md` beschreibt frühere Tests, nicht in jeder Zeile den aktuellen Zustand. Insbesondere sieben Seiten und Pause-/Pfeilbuttons sind überholt.

## 7. Mitgelieferte Arbeitsmaterialien und Skill-Referenzen

Neben `Webseite` liegt `Arbeitsmaterial` mit Originalfotos, Logo, Designreferenzen und historischen Anforderungen. Aktive Assets stehen vollständig in `dist/assets`. Die Originalfotos sind zusätzliche Bearbeitungsreserven; sie müssen nicht bei jedem Start erzeugt werden. Der ursprüngliche Assets-Generator enthält noch Windows-Pfade und lädt Schriften herunter: nicht als Build ausführen und damit aktuelle Ausschnitte/Assets überschreiben.

Vom Nutzer über einen Freund eingebrachte Referenzen:

- Vercel Web Design Guidelines Skill: https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md
- Web Interface Guidelines: https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md

Die damals verwendete genaue Version ist nicht dokumentiert. Die ursprünglichen Links sind als Referenz erhalten; das Paket behauptet keine installierte Mac-Skill-Version. Bei erneuter Anwendung den jeweiligen Skill lesen. Bisher berücksichtigte Grundsätze: semantische Links/Buttons, Labels und verständliche Formularfehler, sichtbarer Tastaturfokus, Touch-Alternativen, reduzierte Bewegung, Bildabmessungen, lokale Fonts und gezielte performante Animation. Diese Richtlinien sind keine Layoutbibliothek und kein Auftrag, die Website neu zu gestalten.

Die Screenshotreferenzen sind nur für ihre jeweils genannten Zwecke zu verwenden. Das aktuelle Karussellergebnis liegt als `../Arbeitsmaterial/Referenzen/karussell-aktueller-stand.png` bei.

## 8. Einstieg in die nächste Sitzung

1. Projektkontext und `AGENTS.md` lesen.
2. `git status` und relevante Diffs prüfen; die vielen vorhandenen Änderungen sind der beabsichtigte aktuelle Arbeitsstand.
3. `node scripts/check.mjs` ausführen.
4. Lokale Vorschau starten/prüfen und den Link bereitstellen.
5. Auf den nächsten konkreten Änderungswunsch des Nutzers eingehen. Keine alten Aufgaben automatisch wiederholen und offene Hinweise nicht ungefragt bearbeiten.
