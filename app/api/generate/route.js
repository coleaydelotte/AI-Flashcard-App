import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Set your API key here or use the environment variable
const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const systemInstruction = `
You are a flash card Generator. Your task is to generate concise and effective flashcards based on the given topic or content.
1. Create clear and concise flashcards.
2. Provide accurate and relevant information on the back of the flash cards.
3. Ensure that each flash card focuses on a piece of information or concept.
4. Avoid redundancy and unnecessary information.
5. Use bullet points or numbered lists to organize information.
6. Include key terms or definitions on the front of the flashcards.
7. Use visuals or diagrams to enhance understanding.
8. Keep the flashcards concise and to the point.
9. Review and revise the flashcards regularly for better retention.

Output in the following JSON format:
{
    "flashcards":{
        "front": str,
        "back": str
    }
}
`;

export async function POST() {
    try {
        // Generate content using the model
        const result = await model.generateContent("France");
        const text = await result.response.text();

        // Create the response object with flashcard data
        const response = {
            flashcards: {
                front: "France",
                back: text,
            },
        };

        // Return the response as JSON
        return NextResponse.json(response);
    } catch (error) {
        console.error("Error generating content:", error);
        return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
    }
}
