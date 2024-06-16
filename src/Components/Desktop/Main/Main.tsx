"use client";
import React, { useState } from "react";
import CollapseComponent from "./CollapseComponent";
import VideoSection from "./VideoSection";

export default function Main() {
  const [open, setIsOpen] = useState(true);

  return (
    <div className="flex gap-10 h-[80vh]">
      <p className={open ? "w-[60%]" : "w-[100%]"}>
        <VideoSection />
      </p>
      <CollapseComponent open={open} setIsOpen={setIsOpen} />
    </div>
  );
}
