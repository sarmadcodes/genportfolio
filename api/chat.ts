import { GoogleGenAI } from "@google/genai";

// 1. Key is accessed securely here, in the Vercel environment
const apiKey = process.env.API_KEY; 
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// System instruction context for the AI twin
const systemInstruction = `
    You are the AI Digital Twin of Aziz Mughal, the CEO of Desk Work Solution (DWS).
    Your tone is professional, technical yet accessible, and helpful.
    // [Insert the full system instruction from your original file here]
`;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    if (!ai) {
        return res.status(503).json({ error: "AI Assistant is offline (API Key missing)." });
    }

    try {
        const userMessage = req.body.message;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userMessage,
            config: {
                systemInstruction: systemInstruction,
            }
        });

        // 2. Return the result safely to the frontend
        res.status(200).json({ responseText: response.text });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Internal server error connecting to AI." });
    }
}
