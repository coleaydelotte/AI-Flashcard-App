import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const systemInstruction = `
You are a flash card Generator. Your task is to generate concise and effective flashcards based on the given topic or content.
1. Create clear and concise flashcards.
2. Provide accurate and relevant information on the back of the flash cards.
3. Short responses are needed 1-2 sentences.
4. Avoid redundancy and unnecessary information.
5. Use bullet points or numbered lists to organize information.
6. Include key terms or definitions on the front of the flashcards.
7. Don't ask questions only state information on the back of the flashcard.
8. Keep the flashcards concise and to the point.
9. If a prompt is broad give a brief overview of the topic.
10. Ensure that each flash card focuses on a piece of information or concept.
11. Only generates 10 flashcards per request.

Output in the following format:
[
    {
        "front":"str",
        "back":"str"
    }, 
    {
        "front":"str",
        "back":"str"
    }
]
`;

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstructions: systemInstruction,
});

export async function POST(req) {
    try {
        const data = await req.text();

        if (!data.trim()) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        const prompt = systemInstruction + data;
        const result = await model.generateContent(prompt);
        const text = await result.response.text();

        if (!text.trim()) {
            return NextResponse.json({ error: "No content generated" }, { status: 500 });
        }

        const response = {
            flashcards: {
                front: data,
                back: text,
            },
        };

        // console.log("Generated content:", response);
        return new NextResponse(response);
    } catch (error) {
        console.error("Error generating content:", error);
        return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
    }
}
