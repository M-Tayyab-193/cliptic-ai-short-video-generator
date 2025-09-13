"use client";
import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { VideoDataContext } from "../_context/VideoDataContext";
const DashboardLayout = ({ children }) => {
  const [videoData, setVideoData] = useState([]);
  return (
    <>
      <VideoDataContext.Provider value={{ videoData, setVideoData }}>
        <div className="overflow-hidden">
          <div className="hidden md:block h-screen bg-white fixed mt-[65px] w-64">
            <SideNav />
          </div>
          <div className="">
            <Header />
            <div className="md:ml-64 p-10">{children}</div>
          </div>
        </div>
      </VideoDataContext.Provider>
    </>
  );
};

export default DashboardLayout;
