"use client";
import React, { useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";

const page = () => {
  const [formData, setFormData] = useState({});
  const onUserSelect = (field, value) => {
    console.log(field, value);
    setFormData({ ...formData, [field]: value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const getVideoScript = async () => {
    const prompt =
      "Write a script to generate " +
      formData.duration +
      " video on topic: " +
      formData.topic +
      " along with AI generated image prompt in " +
      formData.imageStyle +
      " format for each scene and give me result in JSON format with imagePrompt and contextText (scene) fields, no plain text";

    console.log(prompt);
    const { data } = await axios.post("/api/get-video-script", {
      prompt: prompt,
    });

    console.log("Data from axios:", data.result);
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
        >
          Create Short Video
        </Button>
      </div>
    </div>
  );
};

export default page;
