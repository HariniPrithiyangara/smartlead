import { GoogleGenAI } from '@google/genai';
import { env } from '../config/env';
import { ILead } from '../interfaces/ILead';

export const generateLeadFollowUpService = async (lead: ILead) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const prompt = `
    You are an expert, professional sales representative. 
    Write a short, engaging, and professional follow-up email (or message) for the following lead:
    
    Name: ${lead.name}
    Company: ${lead.company || 'their company'}
    Source: ${lead.source}
    Current Status: ${lead.status}
    Notes/Context: ${lead.notes || 'None'}
    
    Guidelines:
    - Keep it under 4-5 sentences.
    - Be polite, concise, and focused on value.
    - Do not include subject lines, just the message body.
    - Since they came from ${lead.source}, briefly mention that as context.
    - End with a simple, low-friction call to action (e.g., a quick 10 min call).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error('AI Generation Error:', error);
    throw new Error('Failed to generate AI follow-up');
  }
};
