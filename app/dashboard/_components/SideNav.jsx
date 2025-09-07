import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from "lucide-react";
import React from "react";

const SideNav = () => {
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
      path: "/create-new",
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
          <div
            key={option.id}
            className="flex items-center gap-3 p-3 hover:text-white hover:bg-primary"
          >
            <option.icon className="h-5 w-5" />
            <span>{option.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
