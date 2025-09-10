"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const SelectTopic = ({ onUserSelect }) => {
  const OPTIONS = [
    "Custom Prompt",
    "Random AI Story",
    "Scary Story",
    "Historical Story",
    "Bed time Story",
    "Motivational Story",
    "Fun Facts",
  ];

  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div>
      <h2 className="font-bold text-xl text-primary">Content</h2>
      <p className="text-gray-500 mt-2">What is the topic of your video ?</p>

      <Select
        onValueChange={(value) => {
          setSelectedOption(value);
          value != "Custom Prompt" && onUserSelect("topic", value);
        }}
        value={selectedOption}
      >
        <SelectTrigger className="w-full mt-3 p-6 text-lg cursor-pointer">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedOption === "Custom Prompt" && (
        <Textarea
          onChange={(e) => onUserSelect("topic", e.target.value)}
          className="mt-4"
          placeholder="Write your prompt on which you want to generate a video"
        />
      )}
    </div>
  );
};

export default SelectTopic;
