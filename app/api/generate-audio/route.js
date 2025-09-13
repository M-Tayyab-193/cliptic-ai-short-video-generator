import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
const fs = require("fs");
const util = require("util");
import { storage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.CLOUD_TEXT_TO_SPEECH_API_KEY,
});

function getVoiceSettings(text) {
  const lower = text.toLowerCase();

  // Scary vibes
  if (/(ghost|haunted|scary|dark|fear|monster|horror)/.test(lower)) {
    return {
      pitch: -4,
      rate: 0.85,
      gender: "MALE",
      voiceName: "en-US-Wavenet-D",
    };
  }

  // Motivational vibes
  if (/(success|dream|believe|achieve|future|goal|power)/.test(lower)) {
    return {
      pitch: 4,
      rate: 1.15,
      gender: "MALE",
      voiceName: "en-US-Wavenet-C",
    };
  }

  // Bedtime vibes
  if (/(sleep|night|bedtime|dream|calm|peace|rest)/.test(lower)) {
    return {
      pitch: 3,
      rate: 0.9,
      gender: "FEMALE",
      voiceName: "en-US-Wavenet-F",
    };
  }

  // Historical vibes
  if (/(history|ancient|king|battle|past|century|empire)/.test(lower)) {
    return {
      pitch: 0,
      rate: 0.95,
      gender: "MALE",
      voiceName: "en-GB-Wavenet-B",
    };
  }

  // Fun/curious vibes
  if (/(fun|fact|did you know|interesting|wow|amazing)/.test(lower)) {
    return {
      pitch: 5,
      rate: 1.2,
      gender: "FEMALE",
      voiceName: "en-US-Wavenet-G",
    };
  }

  // Default fallback
  return {
    pitch: 0,
    rate: 1.0,
    gender: "FEMALE",
    voiceName: "en-US-Wavenet-F",
  };
}

function getVoiceSettingsByTopic(topic, text) {
  switch (topic) {
    case "Scary Story":
      return {
        pitch: -6, // deeper
        rate: 0.75, // slower
        gender: "MALE",
        voiceName: "en-US-Wavenet-D", // deep male voice
        effectsProfileId: ["headphone-class-device"], // optional: enhances eerie effect
      };
    case "Historical Story":
      return {
        pitch: 0,
        rate: 0.95,
        gender: "MALE",
        voiceName: "en-GB-Wavenet-B",
      };
    case "Bed time Story":
      return {
        pitch: 3,
        rate: 0.9,
        gender: "FEMALE",
        voiceName: "en-US-Wavenet-F",
      };
    case "Motivational Story":
      return {
        pitch: 4,
        rate: 1.15,
        gender: "MALE",
        voiceName: "en-US-Wavenet-C",
      };
    case "Fun Facts":
      return {
        pitch: 5,
        rate: 1.2,
        gender: "FEMALE",
        voiceName: "en-US-Wavenet-G",
      };
    case "Random AI Story":
      return {
        pitch: 1,
        rate: 1.0,
        gender: "FEMALE",
        voiceName: "en-US-Wavenet-E",
      };

    default:
      return getVoiceSettings(text);
  }
}

export async function POST(req) {
  try {
    const { text, topic, id } = await req.json();
    const storageRef = ref(
      storage,
      "cliptic-ai-video-gen-files/" + id + ".mp3"
    );
    const settings = getVoiceSettingsByTopic(topic, text);

    const request = {
      input: { text },
      voice: {
        languageCode: "en-US",
        ssmlGender: settings.gender,
        name: settings.voiceName,
      },
      audioConfig: {
        audioEncoding: "MP3",
        pitch: settings.pitch,
        speakingRate: settings.rate,
      },
    };

    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile("output.mp3", response.audioContent, "binary");

    console.log("Audio content written to file: output.mp3");

    const audioBuffer = Buffer.from(response?.audioContent, "binary");
    await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });
    const downloadURL = await getDownloadURL(storageRef);
    console.log("File available at", downloadURL);

    return NextResponse.json({
      success: true,
      message: "Audio generated successfully",
      result: {
        downloadURL,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
