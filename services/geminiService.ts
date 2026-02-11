
import { GoogleGenAI, Type } from "@google/genai";

// Inicialização segura conforme diretrizes
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

/**
 * Gera um insight pastoral baseado no contexto de um atendimento.
 */
export const generatePastoralInsight = async (context: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Você é um assistente de capelania hospitalar. Analise o seguinte resumo de atendimento e sugira uma abordagem espiritual ou palavra de conforto personalizada: "${context}"`,
      config: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 500,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Erro Gemini:", error);
    return "Não foi possível gerar um insight no momento. Verifique sua conexão.";
  }
};

/**
 * Resume o impacto humano de uma lista de atividades para relatórios executivos.
 */
export const summarizeImpact = async (activities: any[]) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise estas atividades de capelania e resuma o impacto humano e espiritual em um parágrafo inspirador para o relatório da diretoria: ${JSON.stringify(activities)}`,
      config: {
        temperature: 0.5,
      }
    });
    return response.text;
  } catch (error) {
    return "Erro ao resumir impacto.";
  }
};
