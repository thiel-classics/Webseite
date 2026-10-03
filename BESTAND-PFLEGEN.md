# Unser Bestand pflegen

Die Seite `dist/bestand.html` präsentiert Fahrzeuge und vermittelt Kontakt. Es gibt keinen Warenkorb, keine Zahlung und keine Buchung. Die drei ersten Fahrzeuge sind ausdrücklich **Beispiele, keine bestätigten Verkaufsangebote**. Die Hinweise erscheinen auf der Seite, auf den Karten und im Detailfenster.

## Fahrzeuge austauschen

Alle Fahrzeugdaten stehen in **`dist/bestand-daten.js`**, im Array `window.THIEL_INVENTORY.vehicles`. Ein Objekt entspricht einer Karte samt Detailansicht. Nach Speichern und Neuladen sind Änderungen sichtbar; ein Build ist nicht nötig.

- `id`: eindeutiger, unveränderlicher Schlüssel ohne Leerzeichen, z. B. `puch-x30-1980`.
- `category`: exakt `automobile` oder `zweiraeder` (für den Filter).
- `name`: vollständige Fahrzeugbezeichnung.
- `example`: für Muster `true`. Erst nach Prüfung aller Fahrzeugdaten und Bilder auf `false` setzen.
- `availability`: Status eines echten Angebots, z. B. `Zum Verkauf` oder `Reserviert`. Verkaufte Fahrzeuge aus dem Array entfernen, wenn sie nicht mehr angezeigt werden sollen.
- `facts`: Eckdaten als `{ label: 'Baujahr', value: '…' }`. Die Karten bleiben mit etwa drei kurzen Angaben ruhig; z. B. Baujahr, Zustand, Besonderheit. Keine unbekannten Werte erfinden.
- `teaser`: ein bis zwei kurze Sätze für die Karte.
- `description`: Array aus Absätzen mit der tatsächlichen Fahrzeugbeschreibung. Die Beispieltexte und deren Vorbehalte durch bestätigte Angaben ersetzen.
- `images`: eine oder mehrere Aufnahmen **dieses konkreten Fahrzeugs**. Erstes Bild = Hauptbild. Aktuelle Galerieaufnahmen sind illustrative Beispiele; Zuordnung prüfen.

Pro Bild angeben: `src` (große Datei), `thumb` (kleinere Vorschau), `alt` (Beschreibung), `width` und `height` (echte Abmessungen der großen Datei), optional `position` für den Ausschnitt der Karte, z. B. `50% 60%`. Dateien nach `dist/assets` kopieren und relative Pfade verwenden, z. B. `./assets/mein-fahrzeug-1440.webp`. Das Detailfenster zeigt stets das gesamte Foto ohne Zuschnitt. Für optimale Ladezeiten lokale WebP-Bilder und kleine Vorschaudateien verwenden.

Ein Objekt kopieren, um ein Fahrzeug hinzuzufügen; durch Löschen des Objekts wird es entfernt. Leere Kategorien erhalten automatisch einen Hinweis. Sind keine Beispiele mehr enthalten, verschwindet der allgemeine Vorschauhinweis.

## Kontakt

Die zentrale Kontaktkonfiguration steht oben in `dist/bestand-daten.js`: E-Mail `thieltrading@web.de`, angezeigte Telefonnummer `+49 173 4209980`, Telefonziel `+491734209980`. Die statischen allgemeinen Kontaktlinks und der Hinweis ohne JavaScript stehen zusätzlich in `dist/bestand.html`.

„Jetzt kontaktieren“ blendet die zwei Links direkt im reservierten Kartenbereich ein. `mailto:` öffnet das lokale E-Mail-Programm und enthält den Fahrzeugnamen im Betreff; `tel:` öffnet eine verfügbare Telefon-App. Die Bestandsseite versendet selbst keine E-Mail, speichert keine Anfrage und benötigt keine Zugangsdaten. Das bestehende Ankauf-Formular bleibt unabhängig davon.

## Technik und Prüfung

- `dist/bestand.js`: Filter, Karten, Kontaktwechsel und native `<dialog>`-Detailansicht. Hintergrund während des Dialogs inaktiv; Fokus kehrt zum Auslöser zurück. Schließen per Kreuz, Escape oder Hintergrundklick.
- `dist/bestand.css`: Papier-/Milchglasfläche und abgedunkelter, unscharfer Hintergrund; deckende Ersatzdarstellung ohne Blur-Unterstützung. Responsive Galerie, Thumbnail- und Pfeilbedienung, Pfeiltasten, reduzierte Bewegung und stabiler Kontaktbereich.
- Alle acht HTML-Seiten enthalten den Navigationspunkt „Unser Bestand“ als echten Link auf `./bestand.html`.
- `node scripts/check.mjs` prüft auch die neue Seite, Datenschema, eindeutige Fahrzeug-IDs, Kategorien und Bilddateien. Es werden keine Nachrichten versendet.

Vorschau: `node scripts/serve.mjs`, dann `http://127.0.0.1:4173/bestand.html`.
