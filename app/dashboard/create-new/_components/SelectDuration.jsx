"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectDuration = ({ onUserSelect }) => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="mt-8">
      <h2 className="font-bold text-xl text-primary">Duration</h2>
      <p className="text-gray-500 mt-1">Select the duration of your video</p>

      <Select
        onValueChange={(value) => {
          setSelectedOption(value);
          onUserSelect("duration", value);
        }}
        value={selectedOption}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg cursor-pointer">
          <SelectValue placeholder="Select Duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="30 seconds">30 seconds</SelectItem>
          <SelectItem value="60 seconds">60 seconds</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectDuration;
