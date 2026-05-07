import { generateChatbotResponse } from "./src/lib/rag";

async function test() {
  console.log("Testing RAG Chatbot response...");
  const res = await generateChatbotResponse("What projects has she worked on?");
  console.log("Response:", res);
}

test().catch(console.error);
