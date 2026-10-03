# Thiel Classics

Statische Website ohne Build-Abhängigkeiten. Die vollständigen HTML-Seiten und alle lokal eingebundenen Schriften/Bilder liegen in `dist`.

## Lokal arbeiten

- Vorschau: `node scripts/serve.mjs`, dann `http://127.0.0.1:4173/` öffnen.
- Prüfung: `node scripts/check.mjs`.
- Falls der Port belegt ist: in PowerShell `$env:PORT=4174` setzen, dann die Vorschau starten.

## Seiten

- `dist/index.html`: ruhige Startseite, scrollgesteuerter Bilderring, Automobile/Zweiräder-Einstiege.
- `dist/ueber-uns.html`: Begeisterung, Geschichte, Haltung, Qualität und persönliche Beratung.
- `dist/zweiraeder.html`: Zweiräder, Suche, Verkauf, Restauration und freigegebener Kreidler-Zustandsvergleich.
- `dist/automobile.html`: Automobile, Beratung, Vermittlung und Fotogalerien.
- `dist/bestand.html`: filterbare Fahrzeugkarten, Kontaktlinks und Milchglas-Detailfenster. Zunächst gekennzeichnete Beispiele; Pflege in [BESTAND-PFLEGEN.md](BESTAND-PFLEGEN.md).
- `dist/ankauf.html`: Anfrageformular mit optionalen Fahrzeugbildern.
- `dist/impressum.html` und `dist/datenschutz.html`: eigene rechtliche Seiten, fehlende Betreiberangaben als Platzhalter markiert.

Jede Seite hat vollständigen Inhalt und echte relative HTML-Links. Navigation funktioniert auch ohne JavaScript und unter einem Unterverzeichnis. `aria-current="page"` kennzeichnet die aktive Seite. Gemeinsame Navigation und Footer stehen direkt in den HTML-Dateien; bei Änderungen überall anpassen. Der Prüflauf kontrolliert ihre Konsistenz. Frühere Abschnittslinks werden auf die passende neue Seite weitergeleitet.

`dist/styles.css` und `dist/app.js` sind gemeinsam. Es gibt kein Framework und keinen erforderlichen Build-Schritt. Der vorhandene Einstieg im Repository-Hauptordner bleibt bestehen.

## Bilderring

Die Fotokarten werden als flacher, räumlicher Ring angeordnet. Scrollstrecke steuert den Winkel: schnelleres Scrollen erzeugt schnellere Rotation, Stillstand stoppt sie sofort. Kein Autoplay und keine permanente Animationsschleife. Passive Scroll-Listener, Resize-/IntersectionObserver und maximal ein requestAnimationFrame je Eingabe bündeln die Arbeit; außerhalb des sichtbaren Bereichs dreht der Ring nicht. Es werden nur CSS-Transforms aktualisiert.

Touch-/Mausziehen sowie Pfeilbuttons und Tastatur sind alternative Bedienelemente. Scrollbewegung lässt sich pausieren. `prefers-reduced-motion` schaltet sie automatisch ab; manuelles Weiterschalten bleibt möglich. Alle Fotos sind auch in der Bildansicht zugänglich. Ohne JavaScript bleibt eine horizontal scrollbar dargestellte Bilderreihe.

Die neuen Aufnahmen heißen `porsche-weiss` und `porsche-silber`, jeweils mit 640/1440-WebP-Varianten. Originalaufnahmen bleiben unverändert. Die zwei Kreidler-Bilder sind vom Nutzer freigegebene KI-Visualisierungen und werden entsprechend gekennzeichnet. Fahrzeugbilder sind keine Behauptung eines aktuellen Verkaufsbestands. Es wurden keine Gründungsjahre, Referenzzahlen oder persönlichen Biografien erfunden.

## E-Mail-Anfragen

Empfänger: **thieltrading@web.de**. Versand über FormSubmit als nativer `multipart/form-data`-POST mit Spamschutz; keine SMTP-Zugangsdaten, keine eigene Datenbank, kein erforderliches Dashboard. Die Einrichtung und Grenzen stehen in [FORMULAR-EINRICHTEN.md](FORMULAR-EINRICHTEN.md).

Die Website speichert keine Formularangaben dauerhaft. FormSubmit hält Textanfragen laut Dokumentation 30 Tage vor; die E-Mail verbleibt im Empfängerpostfach. Die vorhandenen rechtlichen Platzhalter müssen zum tatsächlichen Betrieb vervollständigt werden.

## Prüfung

`node scripts/check.mjs` prüft sämtliche Seiten, Hauptnavigation, aktive Seiten, lokale Links und Anker, Bildquellen, Galeriebilder, Schriftdateien, IDs, Metadaten, JavaScript-Syntax, reduzierte Bewegung sowie die Formular-Konfiguration. Der Prüflauf sendet keine Anfrage und bestätigt keinen E-Mail-Eingang.

Zusätzlich im Browser prüfen: Navigation/Zurück/Neuladen, mobile Ansichten, Bilderring (Scrollen, Stillstand, Pause, Pfeile), Bilddialog, Zustandsregler, Formularfehler, Dateiannahme/Entfernung/Größenlimit. Den echten Versand nach der Empfängeraktivierung manuell prüfen.

Berücksichtigt: [Vercel Web Design Guidelines Skill](https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md) und [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md), insbesondere semantische Links, Tastatur-/Touchalternativen, Fokus, Formularbeschriftungen, reduzierte Bewegung und Bildabmessungen.
