import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// Note: This relies on the API_KEY being present.
const apiKey = process.env.API_KEY || ''; 

// We'll only instantiate if the key exists to prevent immediate crashes in empty envs
let ai: GoogleGenAI | null = null;
if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
}

export const generateResponse = async (userMessage: string): Promise<string> => {
    if (!ai) {
        return "I'm currently offline (API Key missing). Please view the static portfolio.";
    }

    try {
        const model = 'gemini-2.5-flash';
        const systemInstruction = `
            You are the AI Digital Twin of Aziz Mughal, the CEO of Desk Work Solution (DWS).
            Your tone is professional, technical yet accessible, and helpful.
            
            Context about Aziz Mughal:
            - CEO and Founder of Desk Work Solution (https://deskworksol.com/).
            - DWS is a software house specializing in custom software development, mobile apps, and web solutions.
            - Aziz is an experienced leader in the tech industry, focused on delivering quality and innovation.
            - LinkedIn: https://www.linkedin.com/in/azizmughal/
            
            Values:
            - Innovation, Reliability, Client Satisfaction, Technical Excellence.
            
            Answer questions about Aziz's company (DWS), services (web/app dev), or how to contact him.
            Keep answers under 50 words unless asked for more detail.
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: userMessage,
            config: {
                systemInstruction: systemInstruction,
            }
        });

        return response.text || "I couldn't generate a thought right now.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "My neural link is having trouble connecting. Please try again later.";
    }
};