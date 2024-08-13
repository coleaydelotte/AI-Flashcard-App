import { NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

const model = genAI.getModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You are a bot that helps generate flashcard content for a user`
});