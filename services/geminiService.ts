import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RiskLevel } from '../types';

let genAI: GoogleGenAI | null = null;

try {
  // Initialize ONLY if the key is present. The component using this will handle the missing key UI.
  if (process.env.API_KEY) {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
} catch (error) {
  console.error("Failed to initialize Gemini Client", error);
}

export const analyzeSatelliteImage = async (
  regionName: string,
  ndvi: number,
  lst: number,
  coordinates: string
): Promise<string> => {
  if (!genAI) throw new Error("API Key missing");

  const model = "gemini-2.5-flash";
  const prompt = `
    Act as ASTRASENSE, an AI-powered environmental risk detection system.
    Analyze the following satellite telemetry for the region: ${regionName} (${coordinates}).
    
    Telemetry Data:
    - NDVI (Vegetation Index): ${ndvi} (Range: -1 to 1. Higher is healthier)
    - LST (Land Surface Temp): ${lst}°C
    
    Provide a concise technical risk assessment report. 
    1. Identify potential hazards (Drought, Flood, Vegetation Stress).
    2. Assign a risk level (Low, Moderate, High, Critical).
    3. Recommend immediate actions for local agencies.
    
    Keep it professional, scientific, and under 200 words. Format as Markdown.
  `;

  try {
    const response: GenerateContentResponse = await genAI.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text || "Analysis failed.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Unable to generate analysis at this time due to connectivity issues.";
  }
};

export const chatWithAstrasense = async (history: string[], message: string): Promise<string> => {
  if (!genAI) throw new Error("API Key missing");

  // We simply append the new message to a constructed prompt context for stateless simplicity in this demo,
  // or use the chat API. Let's use the chat API for better context.
  
  try {
    const chat = genAI.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: "You are ASTRASENSE, an advanced AI for environmental hazard detection. You help users understand satellite data, risk predictions (Flood, Drought), and climate resilience. You are helpful, technical yet accessible.",
      },
    });

    // In a real app, we would hydrate 'history' into the chat history object.
    // For this simple demo, we'll just send the message directly as a single turn or rely on the instance if we kept it alive.
    // To keep it simple and robust for this snippet:
    
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I didn't catch that.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "System offline. Please try again.";
  }
};