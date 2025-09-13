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
  const [isCreating, setIsCreating] = useState(false);
  const [videoScript, setVideoScript] = useState([]);
  const [audioURL, setAudioURL] = useState("");

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
    audioURL && console.log("Audio URL:", audioURL);
  }, [audioURL]);

  const getVideoScript = async () => {
    setIsCreating(true);
    if (!formData.topic || !formData.duration || !formData.imageStyle) {
      toast.error("Please select all the fields");
      setIsCreating(false);
      return;
    }
    const prompt =
      "Write a script to generate " +
      formData.duration +
      " video on " +
      formData.topic +
      " along with AI generated image prompt in " +
      formData.imageStyle +
      " format for each scene and give me result in JSON format with only imagePrompt and contextText (scene) fields for each scene, no plain text";

    console.log(prompt);
    const { data } = await axios.post("/api/get-video-script", {
      prompt: prompt,
    });
    if (data.success) {
      setVideoScript(data.result);
    }
  };

  const generateAudioFile = async () => {
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
      setIsCreating(false);
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
          disabled={isCreating}
        >
          {isCreating ? "Creating..." : "Create Short Video"}
        </Button>
      </div>
      <Loader loading={isCreating} />
    </div>
  );
};

export default page;
