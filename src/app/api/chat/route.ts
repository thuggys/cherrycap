import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(req) {
  const { message } = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: "You are an AI assistant for a web development agency called CherryCapitalWeb. Your name is 'Cherry'. You are friendly, helpful, and knowledgeable about web development. Your goal is to help potential customers understand the services offered by CherryCapitalWeb and to answer their questions. You should be able to provide information about the company, its services, and the benefits of working with them. You should also be able to answer general questions about web development. Do not break character.",
      },
      {
        role: "model",
        parts: "Hello! My name is Cherry, and I'm the AI assistant for CherryCapitalWeb. I'm here to help you with any questions you may have about our web development services. How can I help you today?",
      },
    ],
  });

  const result = await chat.sendMessage(message);
  const response = await result.response;
  const text = response.text();

  return new Response(JSON.stringify({ text }), {
    headers: { "Content-Type": "application/json" },
  });
}
