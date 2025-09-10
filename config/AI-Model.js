import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

const model = "gemini-2.5-flash";

export async function getGeminiResponse(prompt) {
  const contents = [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ];
  const response = await ai.models.generateContent({
    model,
    contents,
    responseMimeType: "application/json",
  });
  return response.text;
}
