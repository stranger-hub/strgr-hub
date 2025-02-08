"use client";
import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { BsImageFill } from "react-icons/bs";

export default function ImageInput({ image }: { image: string | null | undefined }) {
  const [hovering, setHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { width } = useWindowSize();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="absolute w-full flex justify-center items-center gap-10 left-0 top-[-75px]">
      {width > 700 && <p className="text-2xl font-semibold text-primary">STRANGER?!</p>}
      <div
        className="relative p-0 h-[150px] w-[150px] bg-base-100 rounded-full border border-primary cursor-pointer"
        onClick={handleClick}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {image && <Image height={200} width={200} alt="profile pic" className={`m-0 rounded-full mask mask-circle ${hovering && "opacity-30"}`} src={image} />}
        {hovering && <BsImageFill size={20} className="text-white absolute top-[48%] left-[45%]" />}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
      />
      {width > 700 && <p className="text-2xl font-semibold text-primary">STRANGER?!</p>}
    </div>
  );
}
