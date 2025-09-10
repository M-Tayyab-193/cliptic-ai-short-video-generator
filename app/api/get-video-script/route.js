import { getGeminiResponse } from "@/config/AI-Model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    console.log(prompt);

    const result = await getGeminiResponse(prompt);
    console.log("result of gemini:", result);
    const cleanResult = result.replace(/```json|```/g, "").trim();
    return NextResponse.json({
      success: true,
      result: JSON.parse(cleanResult),
    });
  } catch (error) {
    console.log("error in getting video script", error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
