"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
const page = () => {
  const [videoList, setVideoList] = useState([]);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl text-primary">Dashboard</h2>

        <Link href="/dashboard/create-new">
          <Button className="cursor-pointer">Create a New Video</Button>
        </Link>
      </div>

      {videoList.length === 0 && (
        <div>
          <EmptyState />
        </div>
      )}
    </div>
  );
};

export default page;
