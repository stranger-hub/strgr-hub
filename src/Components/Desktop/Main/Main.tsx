"use client";
import React, { useState } from "react";
import CollapseComponent from "./CollapseComponent";
import VideoSection from "./VideoSection";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function Main() {
  const [open, setIsOpen] = useState(true);
  const [room, setRoom] = useState(null);

  return (
    <SessionProvider>
      <Toaster />
      <div className="flex gap-10 h-[80vh]">
        <div className={open ? "w-[60%]" : "w-[100%]"}>
          <VideoSection room={room} setRoom={setRoom} />
        </div>
        <CollapseComponent open={open} setIsOpen={setIsOpen} />
      </div>
    </SessionProvider>
  );
}
