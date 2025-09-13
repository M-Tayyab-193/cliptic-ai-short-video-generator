"use client";
import React, { useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "./_components/Loader";
import { v4 as uuidv4 } from "uuid";
const page = () => {
  const [formData, setFormData] = useState({});
  const [isCreating, setIsCreating] = useState({
    status: false,
    message: "",
  });
  const [videoScript, setVideoScript] = useState([]);
  const [audioURL, setAudioURL] = useState("");
  const [captions, setCaptions] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const onUserSelect = (field, value) => {
    console.log(field, value);
    setFormData({ ...formData, [field]: value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    if (videoScript.length > 0) {
      console.log("Video Script:", videoScript);
      generateAudioFile();
    }
  }, [videoScript]);

  useEffect(() => {
    if (audioURL) {
      console.log("Audio URL:", audioURL);
      generateCaptions();
    }
  }, [audioURL]);

  useEffect(() => {
    if (captions.length > 0) {
      console.log("Captions:", captions);
      generateImages();
    }
  }, [captions]);

  useEffect(() => {
    if (imageURLs.length > 0) {
      console.log("Image URLs:", imageURLs);
    }
  }, [imageURLs]);

  const getVideoScript = async () => {
    setIsCreating({ status: true, message: "Generating video script..." });
    if (!formData.topic || !formData.duration || !formData.imageStyle) {
      toast.error("Please select all the fields");
      setIsCreating({ status: false, message: "" });
      return;
    }
    const prompt =
      "Write a script to generate " +
      formData.duration +
      " video on " +
      formData.topic +
      " along with AI generated image prompt in " +
      formData.imageStyle +
      " format for each scene and give me result in JSON format with only imagePrompt and contextText (scene) fields for each scene, no plain text and make sure to give result in max - 1000 characters";

    console.log(prompt);
    const { data } = await axios.post("/api/get-video-script", {
      prompt: prompt,
    });
    if (data.success) {
      setVideoScript(data.result);
    }
  };

  const generateAudioFile = async () => {
    setIsCreating({ status: true, message: "Generating audio file..." });
    let script = "";
    const id = uuidv4();
    videoScript.forEach((scene) => {
      script += scene.contextText + " ";
    });

    console.log("Full Script:", script);
    const { data } = await axios.post("/api/generate-audio", {
      text: script,
      id,
    });
    if (data.success) {
      console.log("Audio generated successfully");
      setAudioURL(data.result.downloadURL);
      setIsCreating({ status: false, message: "" });
    }
  };

  const generateCaptions = async () => {
    setIsCreating({ status: true, message: "Generating captions..." });
    const { data } = await axios.post("/api/generate-captions", {
      audioURL: audioURL,
    });
    if (data.success) {
      console.log("Captions generated successfully", data.result);
      setIsCreating({ status: false, message: "" });
      setCaptions(data.result);
    }
  };

  const generateImages = async () => {
    setIsCreating({ status: true, message: "Generating images..." });
    try {
      const imagePromises = videoScript.map((scene) =>
        axios.post("/api/generate-image", { prompt: scene.imagePrompt })
      );
      const responses = await Promise.all(imagePromises);
      const urls = responses
        .filter((res) => res.data.success)
        .map((res) => res.data.imageUrl);
      setImageURLs(urls);
      setIsCreating({ status: false, message: "" });
      console.log("Images generated successfully");
    } catch (error) {
      setIsCreating({ status: false, message: "Error generating images" });
      console.error(error);
    }
  };
  return (
    <div className="md:px-20">
      <h2 className="text-center text-primary font-bold text-4xl">
        Create New
      </h2>

      <div className="mt-8 p-10 shadow-md w-full">
        {/* Select Topic */}
        <SelectTopic onUserSelect={onUserSelect} />
        {/* Select Style */}
        <SelectStyle onUserSelect={onUserSelect} />
        {/* Select Duration */}
        <SelectDuration onUserSelect={onUserSelect} />
        {/* Create Button */}
        <Button
          className="mt-8 w-full font-semibold text-[15px] cursor-pointer"
          onClick={getVideoScript}
          disabled={isCreating.status}
        >
          {isCreating.status ? isCreating.message : "Create Short Video"}
        </Button>
      </div>
      <Loader loading={isCreating} />
    </div>
  );
};

export default page;
