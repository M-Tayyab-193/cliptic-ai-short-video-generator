import React from "react";
import UserManager from "@/app/UserManager";
const Provider = ({ children }) => {
  return (
    <div>
      <UserManager />
      {children}
    </div>
  );
};

export default Provider;
