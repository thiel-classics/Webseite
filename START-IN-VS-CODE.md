# Thiel Classics in VS Code und auf GitHub

Die Website ist ein vollständiges Projekt aus HTML, CSS, JavaScript, Bildern und lokalen Schriften. Du kannst sie unabhängig von Codex bearbeiten und hosten. Der Moped-Schieberegler ist bereits zwischen Abschnitt 03 und 04 eingebaut, mit der Überschrift „Jeder Zustand. Zurück auf die Straße.“.

## 1. Projekt öffnen

In VS Code **Datei → Ordner öffnen** wählen und den Ordner `thiel-classics` öffnen. Alternativ **Datei → Arbeitsbereich aus Datei öffnen** und `Thiel-Classics.code-workspace` auswählen. Öffne den vollständigen Projektordner, damit Bilder, Schriften und Hilfsdateien zusammenbleiben.

Für einen anderen Rechner: `Thiel-Classics-VS-Code.zip` vollständig in einen eigenen Ordner entpacken und diesen öffnen. Das Archiv enthält keine Git-Historie und keine Sites-Kontoverknüpfung. Die Website selbst ist identisch.

## 2. Lokal ansehen

Wenn nötig, die aktuelle LTS-Version von [Node.js](https://nodejs.org/) installieren und VS Code anschließend neu starten. Git wird für den Upload zu GitHub benötigt; es ist über [git-scm.com](https://git-scm.com/downloads) erhältlich. Die in Codex mitgelieferten Programme sind nicht automatisch auch im normalen VS-Code-Terminal verfügbar.

In VS Code **Terminal → Neues Terminal** öffnen und im Projektordner ausführen:

```powershell
node scripts/serve.mjs
```

Im Browser `http://127.0.0.1:4173` öffnen. Änderungen speichern und die Browserseite neu laden. Den Server mit `Strg+C` im Terminal beenden. Wenn Port 4173 schon belegt ist, läuft möglicherweise noch die Codex-Vorschau; diese kann weiterverwendet werden.

Mit dem vorbereiteten Arbeitsbereich geht es auch über **Terminal → Aufgabe ausführen → Website: Vorschau starten**. Es werden keine npm-Pakete benötigt.

## 3. Dateien bearbeiten

| Datei | Inhalt |
| --- | --- |
| `dist/index.html` | Texte, Abschnitte und Formular |
| `dist/styles.css` | Farben, Schriften, Abstände und mobile Darstellung |
| `dist/app.js` | Navigation, Galerien, Moped-Schieberegler und Formularlogik |
| `dist/config.js` | Einstellungen für den späteren Formularversand |
| `dist/assets/` | Alle Bilder, Schriften und Schriftlizenzen |

`dist` enthält hier die direkt bearbeitbaren Website-Dateien. Es gibt keinen vorgeschalteten Build, der sie neu erzeugt. Zum Prüfen der Dateien:

```powershell
node scripts/check.mjs
```

## 4. Auf GitHub hochladen

1. Den Projektordner in VS Code geöffnet lassen.
2. Unter **Quellcodeverwaltung** gegebenenfalls **Repository initialisieren** wählen. Im vorhandenen Arbeitsordner ist Git schon initialisiert; bei einer entpackten ZIP noch nicht.
3. Alle gewünschten Änderungen vormerken und einen Commit erstellen, zum Beispiel „Thiel Classics Website“. Falls Git nach Name und E-Mail fragt, die eigene Commit-Identität einrichten.
4. `Strg+Umschalt+P` drücken und **Publish to GitHub** auswählen.
5. Mit dem eigenen GitHub-Konto anmelden, zum Beispiel `thiel-classics` als Namen wählen und zunächst ein **privates Repository** erstellen.

Danach reichen bei Änderungen: Speichern → Commit → Push. Wenn du bereits ein GitHub-Repository erstellt hast, dessen URL als Remote hinzufügen, statt ein zweites anzulegen.

[Offizielle VS-Code-Anleitung](https://code.visualstudio.com/docs/sourcecontrol/repos-remotes)

## 5. Hosting mit eigener Domain

Empfehlung für diese Unternehmenswebsite: **GitHub für den Quellcode + Cloudflare Pages für die Auslieferung der Website**. GitHub Pages beschränkt die Verwendung als kostenloses Hosting für Onlinegeschäfte und Seiten, die vorwiegend geschäftliche Transaktionen ermöglichen. Deshalb ist es für diese Ankaufseite nicht die erste Empfehlung.

In Cloudflare unter **Workers & Pages → Create application → Pages → Import an existing Git repository** das GitHub-Repository verbinden. Die Einrichtung erfordert dein eigenes Konto und deine Freigabe für den Repository-Zugriff.

| Einstellung | Wert |
| --- | --- |
| Framework | None / kein Framework |
| Production branch | `main` bzw. der Hauptbranch des Repositories |
| Root directory | leer, wenn dieser Projektordner die Repository-Wurzel ist |
| Build command | `exit 0` |
| Build output directory | `dist` |

Nach der ersten Bereitstellung in **Custom domains → Set up a domain** die eigene Domain hinzufügen und den dort angegebenen DNS-Schritten folgen. Für die Hauptdomain ohne `www` muss die Domain als Zone im selben Cloudflare-Konto liegen und Cloudflare-Nameserver verwenden. Bei einer Subdomain kann stattdessen ein CNAME beim bestehenden DNS-Anbieter verwendet werden. Bestehende E-Mail-DNS-Einträge müssen beim Umzug erhalten bleiben. Die konkrete Einrichtung hängt von deiner Domain und dem Anbieter ab.

Nach der Verbindung veröffentlicht Cloudflare neue Pushes auf den Produktionsbranch automatisch.

- [Cloudflare: statisches HTML aus GitHub veröffentlichen](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
- [Cloudflare: eigene Domain verbinden](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [GitHub Pages: Nutzungsgrenzen](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)

## Vor dem öffentlichen Start

Das Ankaufformular ist eine funktionsfähige Oberfläche mit Eingabeprüfung und Bildvorschau, versendet aber noch keine Angebote. Dafür muss ein tatsächlicher Formular-Empfänger eingerichtet werden. Auch die Unternehmensangaben, Impressum und Datenschutzerklärung enthalten noch Platzhalter. Die notwendigen Anschlussdetails stehen in `README.md`.

Es wurde mit dieser Vorbereitung noch kein GitHub-Repository erstellt und keine Domain verbunden.
