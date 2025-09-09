import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const EmptyState = () => {
  return (
    <div className="p-5 py-14 flex flex-col items-center justify-center border-2 mx-4 my-10 gap-6">
      <h2>You don't have created any short videos yet.</h2>
      <Link href="/dashboard/create-new">
        <Button className="cursor-pointer">Create a New Video</Button>
      </Link>
    </div>
  );
};

export default EmptyState;
