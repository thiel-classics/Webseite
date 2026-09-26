# Thiel Classics

Für die Weiterarbeit in VS Code, den Upload zu GitHub und Hosting mit eigener Domain: [Schritt-für-Schritt-Anleitung](START-IN-VS-CODE.md). Der vorbereitete Arbeitsbereich heißt `Thiel-Classics.code-workspace`.

Responsive Website mit bereitgestellten Fahrzeugbildern, einem freigegebenen interaktiven KI-Bildvergleich, lokal eingebundenen Schriften und ohne zusätzliche Bibliotheken.

## Vorschau

`node scripts/serve.mjs` startet die Website unter http://127.0.0.1:4173.

Die veröffentlichbaren Dateien liegen in `dist`. Die Navigation verwendet direkt verlinkbare Anker; das Fahrzeugangebot und rechtliche Seiten werden als eigene Ansichten angezeigt. Das Formular bleibt beim Wechsel zur Datenschutzerklärung erhalten. Ein Neuladen verwirft Eingaben und ausgewählte Bilder; es werden keine persönlichen Daten in localStorage gespeichert.

## Vor öffentlicher Freigabe ergänzen

- Vollständiger Unternehmensname, Rechtsform, verantwortliche Person, Anschrift, E-Mail, Telefonnummer und gegebenenfalls Register-/Steuerangaben.
- Geprüfte Datenschutzerklärung zur tatsächlichen Hosting- und Formularverarbeitung. Aktuelle Texte sind deutlich gekennzeichnete Platzhalter, keine Rechtsberatung oder fertige Rechtstexte.
- Bestätigte Fahrzeugdaten, Verfügbarkeit und tatsächliche Referenzgeschichten. Die Fotobeispiele behaupten keinen Verkauf oder Bestand.
- Eigener Empfänger für Fahrzeugangebote und Bilder. Der Versand ist absichtlich deaktiviert; die Vorschau prüft Eingaben und zeigt ausdrücklich, dass nichts gesendet wurde.

## Formular anschließen

In `dist/config.js` `formEndpoint` auf den eigenen HTTPS-Endpunkt setzen und `legalReady` erst nach Einbau der echten Datenschutzerklärung auf `true` setzen. Die rechtlichen Texte stehen in `dist/app.js` unter `legalContent`; den Text zur deaktivierten Vorschau dabei aktualisieren.

Der Endpunkt nimmt `multipart/form-data` mit folgenden Feldern an: `vehicleType`, `manufacturer`, `model`, `year`, `mileage`, `location`, `condition`, `price`, `description`, `firstName`, `lastName`, `email`, `phone`, `consent` und wiederholtem `photos`-Feld. Bilder sind optional, höchstens 10 Dateien, je 10 MB, JPEG/PNG/WebP. Ein erfolgreicher HTTP-Status und JSON `{"ok":true}` bestätigen den tatsächlichen Eingang und schalten die Erfolgsansicht frei. Andere Antworten, Netzwerkfehler und Zeitüberschreitungen zeigen einen Fehler bei erhaltenen Eingaben. Es sind keine Zugangsdaten im Frontend vorgesehen.

Der Empfänger muss dieselben Eingaben serverseitig prüfen, Dateityp und Größe anhand der Inhalte prüfen, Missbrauch begrenzen und die tatsächliche Speicherung/Zustellung bestätigen. Bei einem anderen Ursprung ist eine passende CORS-Freigabe für den Website-Ursprung erforderlich. Nutzerdaten oder geheime Schlüssel gehören nicht in `config.js`.

## Inhalte und Gestaltung

- `dist/index.html`: Inhalte, Navigation, Formular, Metadaten.
- `dist/styles.css`: Gestaltung, mobile Ansichten, reduzierte Bewegung.
- `dist/app.js`: Ansichten, Galerien, Formularprüfung, Bildauswahl, optionales WebMCP.
- `dist/assets`: optimierte Originalbilder und lokal gespeicherte Schriften.
- `scripts/prepare_assets.py`: reproduzierbare Bildoptimierung. Originaldateien werden nicht verändert. Das Logo wird nur um weiße Außenränder beschnitten.

Die Schriften Barlow Condensed, DM Sans und Cormorant Garamond stammen aus Google Fonts und werden lokal ausgeliefert. Der Abschnitt „Jeder Zustand. Zurück auf die Straße.“ zwischen 03 und 04 verwendet zwei vom Nutzer freigegebene KI-Bearbeitungen seines Kreidler-Fotos. Sie zeigen mögliche Fahrzeugzustände und sind als KI-Visualisierung gekennzeichnet. Alle übrigen Fahrzeugbilder sind bereitgestellte Originalaufnahmen.
