import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

//System instruction to tell Gemini the role it will be playing in the project.
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
`;
// Output in the following JSON format:
// {
//     "flashcards":{
//         "front": str,
//         "back": str
//     }
// }
// `;

//Passing Gemini instructions and establishing connection to the model.
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstructions: systemInstruction,
});

export async function POST() {
    try {
	//Base prompt for testing
        const result = await model.generateContent("French Revolution");
        const text = await result.response.text();
	//formatting response  to return in JSON.
        const response = {
            flashcards: {
                front: "French Revolution",
                back: text,
            },
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error generating content:", error);
        return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
    }
}
