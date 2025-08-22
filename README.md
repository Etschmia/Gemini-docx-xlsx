# Gemini Local File Chat

**Erstellt:** August 2025

## Status 22.08.2025: Funktioniert noch nicht

## Zweck der Anwendung

**Gemini Local File Chat** ist eine fortschrittliche Chat-Anwendung, die die Leistungsfähigkeit der Google Gemini API mit direktem Zugriff auf das lokale Dateisystem des Benutzers kombiniert. Der Hauptzweck dieser App ist es, den Arbeitsablauf für Benutzer zu optimieren, die von KI generierte Inhalte direkt in gut formatierten Dokumenten benötigen.

Die Hauptvorteile gegenüber der Standard-Weboberfläche von Gemini sind:

1.  **Direkte Dateierstellung:** Die App kann Antworten von Gemini analysieren und sie auf Befehl direkt als `.docx` (Microsoft Word) oder `.xlsx` (Microsoft Excel) Dateien speichern.
2.  **Nahtloser Workflow:** Dies erspart dem Benutzer das mühsame manuelle Kopieren von Texten oder Tabellen aus dem Browser, das Einfügen in einen Editor und die anschließende aufwendige Formatierung, insbesondere bei der Umwandlung von Markdown-Tabellen in Excel.
3.  **Lokale Integration:** Durch die (simulierte) Anbindung an einen lokalen Ordner fühlt sich die Interaktion wie eine native Desktop-Anwendung an.

Ein einfacher Zusatz im Prompt, wie z.B. "...und speichere das Ergebnis als Word-Datei namens 'Projektübersicht.docx'", genügt, um den Prozess auszulösen.

## Funktionsweise

Die Anwendung ist als Single-Page-Application (SPA) mit React und TypeScript aufgebaut.

1.  **Authentifizierung:** Der Prozess beginnt mit einem simulierten "Mit Google anmelden"-Bildschirm, um den Zugriff auf die Anwendung zu gewähren. Dies symbolisiert die Verknüpfung mit dem Google-Konto des Nutzers, über das die Gemini-Nutzung abgerechnet wird.
2.  **Chat-Oberfläche:** Die Hauptansicht besteht aus einer klassischen Chat-Oberfläche mit einer Seitenleiste zur Verwaltung mehrerer Konversationen und einem Hauptfenster für den aktiven Chat.
3.  **Gemini-Integration:** Jede Benutzereingabe wird an die Gemini-API gesendet. Die Anwendung nutzt einen Streaming-Endpunkt, um die Antworten des Modells Zeichen für Zeichen in Echtzeit anzuzeigen.
4.  **Befehlsanalyse:** Parallel zur Generierung der Chat-Antwort wird der ursprüngliche Prompt des Benutzers an einen separaten Gemini-Aufruf gesendet. Dieser hat die Aufgabe, die Anfrage auf Speicherbefehle zu analysieren und eine strukturierte JSON-Antwort (`{action: 'save', fileType: 'docx', fileName: '...'}`) zurückzugeben.
5.  **Dateierstellung (Client-seitig):** Wenn ein Speicherbefehl erkannt wird, werden die client-seitigen JavaScript-Bibliotheken `docx` und `xlsx` (SheetJS) verwendet, um die Datei direkt im Browser zu generieren. Anschließend wird der Download für den Benutzer automatisch ausgelöst. Für Excel-Dateien wird die KI zunächst gebeten, nur die reine Markdown-Tabelle aus ihrer vorherigen Antwort zu extrahieren, um eine saubere Konvertierung zu gewährleisten.
6.  **Dateisystem-Interaktion:** Die Auswahl eines Ordners ist derzeit simuliert, um das Konzept zu demonstrieren. In einer echten Desktop-Anwendung (z.B. mit Electron oder Tauri) würde hier ein nativer Dialog zur Ordnerauswahl erscheinen.

## Verwendete Technologien und Bibliotheken

*   **Frontend-Framework:** [React](https://react.dev/) (v18)
*   **Sprache:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **KI-Modell-Integration:** [Google Gemini API über `@google/genai`](https://www.npmjs.com/package/@google/genai)
*   **Word-Dokumentenerstellung:** [docx](https://www.npmjs.com/package/docx) (eingebunden über CDN)
*   **Excel-Dokumentenerstellung:** [SheetJS (xlsx)](https://sheetjs.com/) (eingebunden über CDN)

## Einrichtung und Start

Für eine detaillierte Anleitung zur Installation der Abhängigkeiten, zur Einrichtung des API-Schlüssels und zum Starten der Anwendung, siehe die Datei [INSTALL.md](./INSTALL.md).
