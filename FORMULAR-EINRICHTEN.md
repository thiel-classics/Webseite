# Ankauf per E-Mail einrichten

Der Code ist auf **thieltrading@web.de** vorbereitet. Als kleine externe Versandlösung wird **FormSubmit** verwendet. Ein statischer Browser kann E-Mails mit Anhängen nicht selbst zuverlässig zustellen. Der Dienst übernimmt diese Aufgabe, ohne dass SMTP-Passwörter im Website-Code stehen.

## Einmalig aktivieren

1. Die Website über eine HTTP-/HTTPS-Adresse öffnen (lokal über `node scripts/serve.mjs`, nicht per Doppelklick als `file://`).
2. Auf der Ankauf-Seite eine eindeutig als Test bezeichnete Anfrage ohne vertrauliche Daten absenden. Ggf. die Sicherheitsabfrage bei FormSubmit abschließen.
3. Im Postfach **thieltrading@web.de** die Aktivierungsmail von FormSubmit öffnen und den Bestätigungslink selbst anklicken; ggf. Spamordner prüfen.
4. Danach eine neue Testanfrage mit einem kleinen Bild absenden und prüfen, ob alle Angaben und der Anhang im Postfach ankommen. Die erste Anfrage zur Aktivierung nicht als zugestellt voraussetzen.

Keine Registrierung und kein Dashboard erforderlich. Die Aktivierung im Postfach und der tatsächliche E-Mail-Eingang können nicht durch den lokalen Prüflauf bestätigt werden. Es wurde keine Testmail automatisch versendet.

## Technischer Ablauf

- `dist/ankauf.html`: `action="https://formsubmit.co/thieltrading@web.de"`, `method="POST"`, `enctype="multipart/form-data"`.
- `dist/config.js`: derselbe Endpunkt; enthält ausschließlich öffentliche Konfiguration.
- `dist/app.js`: Formularprüfung, Bildvorschauen und Limitprüfung. Der Browser sendet das gültige Formular anschließend direkt an FormSubmit. Die Antwort-/Sicherheitsseite des Dienstes bestätigt den Versand; die Website behauptet nicht vorab eine Zustellung.
- `_subject` benennt die Anfrage, `_template=table` bereitet sie als Tabelle auf. `email` ermöglicht Antworten an den Anfragenden. `_honey` ergänzt den standardmäßig aktiven Spamschutz. Keine automatische Antwortmail.
- Bis zu **6 Bilder, zusammen 9 MB** (JPEG, PNG, WebP). FormSubmit erlaubt laut Dokumentation maximal 10 MB für alle Dateien zusammen. Die Reserve vermeidet Grenzfälle. Mit JavaScript werden Dateien als separate Felder `attachment`, `attachment2`, … übertragen. Ohne JavaScript bleiben native HTML-Prüfung und der direkte Versand verfügbar; für mehrere Bilder und die lokale Größenprüfung wird JavaScript benötigt. Der Dienst muss seine Limits unabhängig vom Browser durchsetzen.
- Eingaben/Bildvorschauen werden ausschließlich vorübergehend im Browser gehalten. Keine Nutzung von localStorage/sessionStorage oder einer Website-Datenbank. Bei Navigation mit ungesendeten Änderungen warnt der Browser; Datenschutz öffnet in einem neuen Tab. Nach Fehlern beim Dienst über „Zurück“ die Angaben prüfen; eine vollständige Wiederherstellung nach Neuladen ist nicht garantiert.

## Noch zu ergänzen

- Empfänger über die Aktivierungsmail bestätigen und Live-Test mit Bild durchführen.
- Echte Unternehmens- und Kontaktdaten in `dist/impressum.html` ergänzen.
- `dist/datenschutz.html` ist weiterhin ein klar gekennzeichneter Entwurf. Verantwortliche Stelle, Hosting, Rechtsgrundlagen, Dienstleister/Verträge, Fristen und Betroffenenrechte zum tatsächlichen Betrieb vervollständigen. FormSubmit archiviert Textanfragen laut Dokumentation 30 Tage; hochgeladene Dateien sind nicht in diesem Archiv. Das Empfängerpostfach speichert eingegangene E-Mails separat. Der Dienst ist deshalb kein Versprechen, dass Daten nirgendwo gespeichert werden.

Optional kann nach Aktivierung der vom Anbieter mitgeteilte zufällige Formular-Token statt der Empfängeradresse im Endpunkt eingesetzt werden. Dafür **sowohl** `ankauf.html` als auch `config.js` ändern und die entsprechende Prüfung in `scripts/check.mjs` aktualisieren. Niemals SMTP-Zugangsdaten eintragen.

## Quellen (geprüft am 28.09.2026)

- [Einrichtung und Aktivierung](https://formsubmit.co/)
- [Anhänge, Spamschutz und 30-Tage-Archiv](https://formsubmit.co/documentation)
- [Datenschutzhinweise des Dienstes](https://formsubmit.co/privacy.pdf)
