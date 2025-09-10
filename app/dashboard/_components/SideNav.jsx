"use client";
import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideNav = () => {
  const path = usePathname();

  const menuOptions = [
    {
      id: "1",
      name: "Dashboard",
      path: "/dashboard",
      icon: PanelsTopLeft,
    },
    {
      id: "2",
      name: "Create New",
      path: "/dashboard/create-new",
      icon: FileVideo,
    },
    {
      id: "3",
      name: "Upgrade",
      path: "/upgrade",
      icon: ShieldPlus,
    },
    {
      id: "4",
      name: "Account",
      path: "/account",
      icon: CircleUser,
    },
  ];
  return (
    <div className="w-full h-full shadow-md p-5">
      <div className="grid gap-3">
        {menuOptions.map((option) => (
          <Link href={option.path} key={option.id}>
            <div
              key={option.id}
              className={`flex items-center gap-3 p-3 hover:text-white hover:bg-primary cursor-pointer rounded-md ${
                path === option.path ? "text-white bg-primary" : "text-gray-600"
              }`}
            >
              <option.icon className="h-5 w-5" />
              <span>{option.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
