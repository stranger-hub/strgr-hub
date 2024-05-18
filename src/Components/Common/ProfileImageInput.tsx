"use client";
import React, { useRef } from "react";
import { BsImageFill } from "react-icons/bs";

export default function ImageInput() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="absolute w-full flex justify-center items-center gap-10 left-0 top-[-75px]">
      <p className="text-2xl font-semibold text-primary">STRANGER?!</p>
      <div
        className="h-[150px] w-[150px] bg-base-100 rounded-full border border-primary flex flex-col items-center justify-center gap-2 cursor-pointer btn hover:border-primary"
        onClick={handleClick}
      >
        <p className="text-xs">Upload image</p>
        <BsImageFill />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
      />
      <p className="text-2xl font-semibold text-primary">STRANGER?!</p>
    </div>
  );
}
