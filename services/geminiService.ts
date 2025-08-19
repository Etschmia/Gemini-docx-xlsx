
import { GoogleGenAI, Type } from "@google/genai";
import { FileAction } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getChatStream = async function* (prompt: string) {
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
  });
  const result = await chat.sendMessageStream({ message: prompt });
  for await (const chunk of result) {
    yield chunk.text;
  }
};

const getTextResponse = async (prompt: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text;
};

const generateTitle = async (prompt: string, response: string): Promise<string> => {
    const titlePrompt = `Erstelle einen kurzen, prägnanten Titel (maximal 5 Wörter) für die folgende Konversation. Antworte nur mit dem Titel.\n\nUSER: ${prompt}\nMODEL: ${response.substring(0, 200)}...`;
    const title = await getTextResponse(titlePrompt);
    return title.replace(/["']/g, ""); // Remove quotes from title
};

const analyzeForFileAction = async (prompt: string): Promise<FileAction> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analysiere die folgende Benutzeranfrage, um festzustellen, ob eine Datei gespeichert werden soll. Der Dateiname sollte aus dem Kontext abgeleitet und mit der passenden Erweiterung (.docx für Word, .xlsx für Excel) versehen werden. Wenn keine Speicheranweisung vorhanden ist, setze die Aktion auf "none".\n\nAnfrage: "${prompt}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            action: {
              type: Type.STRING,
              enum: ['save', 'none'],
              description: 'Die auszuführende Aktion.',
            },
            fileType: {
              type: Type.STRING,
              enum: ['docx', 'xlsx', 'none'],
              description: 'Der Dateityp zum Speichern.',
            },
            fileName: {
              type: Type.STRING,
              description: 'Der abgeleitete Dateiname mit Erweiterung.',
            },
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const parsedAction = JSON.parse(jsonText);

    if (parsedAction.action === 'save' && parsedAction.fileType !== 'none' && parsedAction.fileName) {
        return parsedAction;
    }

    return { action: 'none', fileType: 'none', fileName: '' };

  } catch (error) {
    console.error("Error analyzing prompt for file action:", error);
    return { action: 'none', fileType: 'none', fileName: '' };
  }
};

export const geminiService = {
  getChatStream,
  generateTitle,
  analyzeForFileAction,
  getTextResponse
};
