import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
const Header = () => {
  return (
    <div className="py-3 px-5 flex items-center justify-between shadow-md">
      <div className="flex gap-3 items-center">
        <Image src="/logo.svg" alt="Logo" width={30} height={30} />
        <h2 className="text-xl font-bold">Cliptic - Short Vid Gen</h2>
      </div>
      <div className="flex gap-4 items-center">
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
