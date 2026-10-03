# Prüfung der Mehrseiten-Website

Stand: 28. September 2026. Geprüft wurde das maßgebliche Zielrepository.

## Automatische Prüfung

node scripts/check.mjs: erfolgreich. Sieben vollständige HTML-Seiten, konsistente Hauptnavigation, aktive Seitenmarkierungen, lokale Links/Anker, Bilddateien und Galerien, Schriften, IDs, Metadaten, JavaScript-Syntax und Formular-Konfiguration werden geprüft.

## Browserprüfung

- Die fünf Hauptseiten bei 320, 768 und 1024 Pixel Breite geprüft: keine horizontalen Überläufe. Zusätzlich Smartphone-Ansicht mit 390 Pixeln visuell geprüft.
- Mobiles Menü per Tastatur geöffnet; echter Seitenwechsel zur Über-uns-Seite bestätigt.
- Bilderring: Scrollbewegung, Pause, manuelle Pfeile, Stillstand nach Scrollende und Bilddialog geprüft. Kein Autoplay. Galeriewechsel und Fokusrückgabe nach dem Schließen funktionieren.
- Kreidler-Zustandsvergleich: Tastatur-Endpunkte Home/End geprüft (0/100 Prozent); freigegebene Bildpaare erhalten.
- Formular: Fahrzeugart aus URL, Pflichtfelder, E-Mail-Format, Baujahrgrenze, Fokus auf erstes Fehlerfeld, Bildvorschauen und Entfernen geprüft.
- Zu große Dateien (über 9 MB), beschädigte Bilder, nicht unterstützte Dateitypen und mehr als sechs Bilder werden abgefangen.
- Der vollständige native Multipart-POST mit allen benannten Feldern und sechs getrennten Anhängen wurde an einem ausschließlich lokalen, nicht speichernden QA-Empfänger bestätigt. Kein Formular-Test wurde an FormSubmit geschickt, keine E-Mail automatisch versendet.
- Nach Rückkehr vom lokalen Versand: Textangaben erhalten, Senden wieder möglich, vom Browser erhaltene Datei wieder als Vorschau angezeigt. Datenschutz-Link öffnet einen separaten Tab.

## Grenzen und Einrichtung

- Der tatsächliche Versand über FormSubmit einschließlich Empfängeraktivierung, Sicherheitsabfrage und E-Mail-Eingang ist noch vom Betreiber zu prüfen. Anleitung: FORMULAR-EINRICHTEN.md.
- Browser können Formulare bei Neuladen verwerfen. Es wird keine zusätzliche dauerhafte Speicherung eingeführt.
- Reduzierte Bewegung ist in CSS und JavaScript berücksichtigt; eine Betriebssystem-Umschaltung wurde nicht vorgenommen. Touch-Darstellung wurde geprüft, ein physisches Smartphone stand für einen Gerätetest nicht zur Verfügung.
- Unternehmensangaben und vollständige Datenschutzinformationen bleiben sichtbar markierte Ergänzungsstellen. Verfügbarkeit der Fotobeispiele wird nicht als zugesichert dargestellt.

Gestaltungsprüfung nach den Vercel Web Interface Guidelines: native Seitenlinks, konsistente Navigation, Formular-Labels, inline Fehler, sichtbarer Fokus, Maus-/Tastaturalternativen, Bildabmessungen, lokale Schriften und reduzierte Bewegung berücksichtigt.

Keine Commits, kein Push und kein Deployment durchgeführt.
