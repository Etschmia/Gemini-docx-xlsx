# Installation und Einrichtung

Diese Anleitung beschreibt, wie Sie die "Gemini Local File Chat"-Anwendung auf Ihrem lokalen System einrichten und ausführen.

## Voraussetzungen

Stellen Sie sicher, dass die folgenden Anwendungen auf Ihrem System installiert sind:

*   [Node.js](https://nodejs.org/) (Version 18.x oder höher empfohlen)
*   [npm](https://www.npmjs.com/) (wird normalerweise mit Node.js installiert)
*   Ein Code-Editor Ihrer Wahl (z.B. [Visual Studio Code](https://code.visualstudio.com/))

## Schritt 1: Code herunterladen

Laden Sie den Quellcode herunter und entpacken Sie ihn in einen Ordner Ihrer Wahl.

## Schritt 2: Abhängigkeiten installieren

Öffnen Sie ein Terminal oder eine Kommandozeile, navigieren Sie in das Hauptverzeichnis des Projekts (den Ordner, in den Sie die Dateien entpackt haben) und führen Sie den folgenden Befehl aus, um alle erforderlichen Pakete zu installieren:

```bash
npm install
```

## Schritt 3: API-Schlüssel einrichten

Diese Anwendung benötigt einen Google Gemini API-Schlüssel, um zu funktionieren.

1.  Erstellen Sie eine neue Datei im Hauptverzeichnis des Projekts und nennen Sie sie `.env`.
2.  Öffnen Sie die `.env`-Datei und fügen Sie Ihren API-Schlüssel im folgenden Format hinzu:

    ```
    API_KEY=IHR_GOOGLE_GEMINI_API_SCHLUESSEL
    ```

    Ersetzen Sie `IHR_GOOGLE_GEMINI_API_SCHLUESSEL` durch Ihren tatsächlichen API-Schlüssel von [Google AI Studio](https://aistudio.google.com/app/apikey).

**Wichtig:** Die Anwendung ist so konfiguriert, dass sie den API-Schlüssel ausschließlich aus dieser Umgebungsvariable liest. Es gibt keine Möglichkeit, den Schlüssel über die Benutzeroberfläche einzugeben.

## Schritt 4: Anwendung starten

Nachdem die Installation und Konfiguration abgeschlossen sind, können Sie den lokalen Entwicklungsserver starten. Führen Sie dazu den folgenden Befehl im Terminal aus:

```bash
npm start
```

Dieser Befehl startet die Anwendung und sollte sie in Ihrem Standard-Webbrowser öffnen. Falls nicht, öffnen Sie manuell die Adresse, die im Terminal angezeigt wird (normalerweise `http://localhost:3000`).

Sie können die Anwendung nun verwenden. Melden Sie sich mit Ihrem Google-Konto an, um mit dem Chatten zu beginnen.
