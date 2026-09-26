# Prüfung

Geprüft am 24. September 2026 in der lokalen Browser-Vorschau.

- Layoutbreiten 320, 390, 768 und 1440 Pixel ohne horizontales Überlaufen.
- Startseite, Automobile, Zweiräder, Referenzen, Über uns, Ankaufformular und Rechtstext-Platzhalter.
- Mobile Navigation, Ankerlinks, Galerien, Bildwechsel und Schließen.
- Pflichtfelder, ungültiges Baujahr und Fokus auf dem ersten fehlerhaften Feld.
- Mehrfach-Bildauswahl mit Vorschauen, Entfernen eines Bildes.
- Wechsel zur Datenschutzerklärung und zurück erhält Fahrzeugangaben und Bildauswahl.
- Deaktivierter Echtversand zeigt ausdrücklich eine Vorschau-Bestätigung ohne Versandbehauptung.
- Lokaler Testempfänger: Ladezustand verhindert doppelten Versand, HTTP-Fehler erhält Angaben, bestätigter Eingang zeigt Erfolgsansicht.
- WebMCP: Werkzeug registriert, gültige Fahrzeugart öffnet Formular, ungültige Fahrzeugart wird abgelehnt.
- Alle Bilder und Schriften lokal; JavaScript-Syntax und lokale Verweise werden durch `node scripts/check.mjs` geprüft.

Die QA-Empfänger unter `/__qa/` existieren nur im lokalen Vorschau-Server. Sie speichern keine Daten und sind kein Teil des veröffentlichten Verzeichnisses `dist`. Ein tatsächlicher Versand an Thiel Classics wurde mangels Empfänger nicht durchgeführt.
