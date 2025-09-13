import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
const fs = require("fs");
const util = require("util");

const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.CLOUD_TEXT_TO_SPEECH_API_KEY,
});

export async function POST(req) {
  try {
    const { text, id } = await req.json();

    const request = {
      input: { text: text },

      voice: { languageCode: "en-US", ssmlGender: "FEMALE" },

      audioConfig: { audioEncoding: "MP3" },
    };

    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile("output.mp3", response.audioContent, "binary");
    console.log("Audio content written to file: output.mp3");

    return NextResponse.json({
      success: true,
      message: "Audio generated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
