import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const { audioURL } = await req.json();

    const client = new AssemblyAI({
      apiKey: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY,
    });

    const audioFile = audioURL;

    const params = {
      audio: audioFile,
      speech_model: "universal",
    };

    const transcript = await client.transcripts.transcribe(params);

    console.log(transcript.words);
    return NextResponse.json({
      success: true,
      message: "Audio transcribed successfully",
      result: transcript.words,
    });
  } catch (error) {
    console.error("Error transcribing audio:", error);
  }
}
