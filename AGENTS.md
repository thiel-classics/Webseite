# Aktives Projekt: Thiel Classics

Dieser Ordner ist die portable Übergabe des maßgeblichen Website-Repositories, Stand 2. Oktober 2026. Er enthält den aktuellen Arbeitsstand einschließlich nicht committeter Änderungen. Auf dem Mac direkt in diesem geöffneten Ordner arbeiten. Alte absolute Windows-Pfade in Unterlagen nicht als Arbeitsziel verwenden.

## Vor jeder Änderung

- Zuerst `KONTEXT-FUER-CODEX.md`, vorhandene Anweisungen, `git status` und relevante Diffs lesen. Bestehende Änderungen des Nutzers erhalten.
- Den Arbeitsordner bei Werkzeugaufrufen ausdrücklich auf dieses Projekt setzen.
- Nicht auf einen älteren Commit zurücksetzen und nicht aus einer früheren Kopie oder GitHub ungeprüft überschreiben.
- Nur die konkret beauftragten Bereiche ändern. Keine zusätzlichen Designoptimierungen, Refactorings oder neuen Abhängigkeiten ohne passenden Auftrag.
- Neue Wünsche des Nutzers haben Vorrang vor historischen Entscheidungen.

## Technik und Prüfung

- Die echten Website-Dateien stehen in `dist`: statisches HTML, CSS und JavaScript ohne Build-Abhängigkeiten. `dist` wird direkt bearbeitet und nicht durch einen Build ersetzt.
- Vorschau: `node scripts/serve.mjs`; lokale Adresse `http://127.0.0.1:4173/`.
- Prüfung nach Änderungen: `node scripts/check.mjs`.
- Nach visuellen oder interaktiven Änderungen zusätzlich die betroffenen Ansichten in passenden Desktop-/Mobilgrößen prüfen. Keine echten Formularanfragen als unbeabsichtigten Test versenden.
- Der Einstieg `index.html` und `.nojekyll` in der Repository-Wurzel gehören zum früheren GitHub-Pages-Test. Die Inhalte bleiben in `dist`. Nicht ungefragt an der Veröffentlichungsstruktur arbeiten.
- Navigation und Footer stehen in allen HTML-Seiten. Gemeinsame Änderungen konsistent halten; einen lokal begrenzten Auftrag nicht auf weitere Seiten ausweiten.

## Verbindlicher aktueller Gestaltungsstand

- Klassisch, ruhig, hochwertig; bestehende Farben, lokale Schriften, Bilder und Markenwirkung erhalten.
- Der Header hat einen dezenten Glasrahmen. Er ist absichtlich normal im Dokumentfluss, weder sticky noch fixed. Logo nicht verschieben oder skalieren, sofern nicht ausdrücklich beauftragt.
- Der größere Bilderring auf der Startseite ist fertig. Keine Bedienleiste darunter: kein Scrollhinweis, kein Pausebutton, keine runden Pfeiltasten und keine zugehörige Trennlinie. Das ist eine ausdrückliche Nutzerentscheidung.
- Scrollrotation, Stillstand ohne Scrollen, Maus-/Touchziehen, Bilddialog, Tastaturbedienung und reduzierte Bewegung erhalten.
- Auf „Über uns“ das entfernte Porträt, die Namenszeile, den persönlichen Ich-Text und den entfernten Dreispalten-Abschnitt nicht ungefragt wieder einbauen.
- Keine Fahrzeugverfügbarkeit, Firmengeschichte oder technischen Fahrzeugdaten erfinden. Musterbestand bleibt als Muster gekennzeichnet, bis echte Daten bestätigt sind.

## Git, Versand und Hosting

- Nutzer möchte Änderungen selbst prüfen und committen/pushen. Kein automatischer Commit, Push oder Deployment ohne neue ausdrückliche Anweisung.
- Remote: `https://github.com/thiel-classics/Webseite.git`. Ein Remote ist keine Erlaubnis zum Push.
- Fokus liegt auf Website-Bearbeitung. Hostinger ist als späteres Hosting, IONOS als Domainanbieter genannt; nichts davon eigenständig konfigurieren.
- Formular: externer FormSubmit-Endpunkt, keine SMTP-Zugangsdaten im Frontend. Aktivierung/Zustellung sind nicht durch lokale Tests bestätigt.
- Rechtstexte enthalten weiterhin Entwurfs-/Platzhalterstellen. Frühere Mustertexte und bekannte Betreiberdaten sind Kontext, kein Auftrag zum automatischen Einbau oder eine Rechtssicherheitsgarantie.

## Referenzen

Die vom Nutzer eingebrachten Vercel Web Design Guidelines und Web Interface Guidelines berücksichtigen, soweit sie zur Aufgabe passen. Die Links und die verwendeten Grundsätze sind in `KONTEXT-FUER-CODEX.md` dokumentiert. Nicht ungefragt Tools, Plugins oder Frameworks installieren. Aktuelle Nutzerwünsche, etwa die entfernte Bedienleiste, gehen allgemeinen Empfehlungen vor.

Ältere `README.md`, `VERIFICATION.md` und `START-IN-VS-CODE.md` enthalten teils überholte Beschreibungen. Für den exportierten Stand zuerst den aktuellen Code und `KONTEXT-FUER-CODEX.md` heranziehen.
