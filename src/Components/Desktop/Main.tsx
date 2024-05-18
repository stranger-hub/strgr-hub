"use client";
import React, { useState } from "react";
import CollapseComponent from "./CollapseComponent";

export default function Main() {
  const [open, setIsOpen] = useState(true);

  return (
    <div className="flex gap-10 h-[80vh]">
      <p className={open ? "w-[60%]" : "w-[100%]"}>Video will be displayed here</p>
      <CollapseComponent open={open} setIsOpen={setIsOpen} />
    </div>
  );
}
