import axios from "axios";
import { NextResponse } from "next/server";
import FormData from "form-data";
import { cloudinary } from "@/config/cloudinary";
export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const form = new FormData();
    form.append("prompt", prompt);

    const response = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      form,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
          ...form.getHeaders(),
        },
        responseType: "arraybuffer", // Get binary data
      }
    );

    // Convert binary image to base64 data URL
    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    const uploadResponse = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      { folder: "cliptic-ai-video-gen-files" }
    );
    const imageUrl = uploadResponse.secure_url;

    return NextResponse.json({
      success: true,
      imageUrl,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
