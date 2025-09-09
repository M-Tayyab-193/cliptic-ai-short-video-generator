"use client";
import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from "lucide-react";

const Header = () => {
  const router = useRouter();

  return (
    <div className="py-3 px-5 flex items-center justify-between shadow-md">
      <div className="flex gap-3 items-center">
        <Image src="/logo.svg" alt="Logo" width={30} height={30} />
        <h2 className="text-xl font-bold">Cliptic - Short Vid Gen</h2>
      </div>
      <div className="flex gap-4 items-center">
        <Button className="hidden md:block">Dashboard</Button>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Action
              label="Dashboard"
              labelIcon={<PanelsTopLeft />}
              onClick={() => router.push("/dashboard")}
            />
          </UserButton.MenuItems>

          <UserButton.MenuItems>
            <UserButton.Action
              label="Create New"
              labelIcon={<FileVideo />}
              onClick={() => router.push("/create-new")}
            />
          </UserButton.MenuItems>

          <UserButton.MenuItems>
            <UserButton.Action
              label="Upgrade"
              labelIcon={<ShieldPlus />}
              onClick={() => router.push("/upgrade")}
            />
          </UserButton.MenuItems>
          <UserButton.MenuItems>
            <UserButton.Action
              label="Account"
              labelIcon={<CircleUser />}
              onClick={() => router.push("/account")}
            />
          </UserButton.MenuItems>
        </UserButton>
      </div>
    </div>
  );
};

export default Header;
