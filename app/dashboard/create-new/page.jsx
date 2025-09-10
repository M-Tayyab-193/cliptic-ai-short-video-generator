"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
const page = () => {
  const [formData, setFormData] = useState([]);
  const onUserSelection = (field, value) => {
    console.log(field, value);
  };
  return (
    <div className="md:px-20">
      <h2 className="text-center text-primary font-bold text-4xl">
        Create New
      </h2>

      <div className="mt-10 p-10 shadow-md">
        // Select Topic
        <SelectTopic onUserSelection={onUserSelection} />
        // Select Style
        <SelectStyle />
      </div>
    </div>
  );
};

export default page;
