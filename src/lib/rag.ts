import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { projects, experiences, skills } from './portfolio-data';

// Helper function to get all portfolio data as a single string
export function getPortfolioContext(): string {
  let context = "Mariam Benali Portfolio Information\n\n";
  
  context += "Projects:\n";
  projects.forEach(p => {
    context += `- ${p.title} (${p.subtitle || ''}): ${p.description}. Tags: ${p.tags?.join(', ')}\n`;
  });
  
  context += "\nExperiences:\n";
  experiences.forEach(e => {
    context += `- ${e.title} at ${e.company} (${e.from} to ${e.to}). Type: ${e.type}\n`;
  });

  context += "\nSkills:\n";
  skills.forEach(s => {
    context += `- ${s.title}: ${s.desc}. ${s.tags ? 'Tags: ' + s.tags.join(', ') : ''}\n`;
  });

  return context;
}

// Setup the Chatbot Chain
export async function generateChatbotResponse(question: string): Promise<string> {
  try {
    const contextText = getPortfolioContext();

    const llm = new ChatOpenAI({
      modelName: "gpt-4o-mini", // Fast and cheap model
      temperature: 0.1, // Strict response temperature
    });

    const prompt = PromptTemplate.fromTemplate(`
You are a helpful and professional AI assistant for Mariam Benali's portfolio website.
Answer the user's question based ONLY on the following context derived from her portfolio.
If the answer cannot be found in the context, say exactly: "I don't have that information".
Keep your answers short, professional, and directly address the user's query. Do not hallucinate.

Context:
{context}

Question:
{question}

Answer:`);

    const chain = RunnableSequence.from([
      prompt,
      llm,
      new StringOutputParser(),
    ]);

    const response = await chain.invoke({
      context: contextText,
      question: question,
    });

    return response;
  } catch (error) {
    console.error("Error generating chatbot response:", error);
    
    // Fallback simple rule-based matching if LLM fails (e.g. OpenAI Rate Limit)
    const q = question.toLowerCase();
    if (q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("role")) {
      const expList = experiences.map(e => `${e.title} at ${e.company} (${e.from} to ${e.to})`).join(", ");
      return `My AI API is currently rate limited, but here is my experience data from the portfolio section: ${expList}.`;
    }
    if (q.includes("project") || q.includes("portfolio")) {
      const prjList = projects.map(p => p.title).join(", ");
      return `My AI API is currently rate limited, but here are some of my projects: ${prjList}.`;
    }
    if (q.includes("skill") || q.includes("tool") || q.includes("tech") || q.includes("know")) {
      const skillTitles = skills.map(s => s.title).join(", ");
      return `My AI API is currently rate limited, but my top skill categories include: ${skillTitles}.`;
    }

    return "I am experiencing High AI API load and rate limits. Please explore my portfolio via the navigation sections to learn more about my experiences, projects, and skills!";
  }
}
