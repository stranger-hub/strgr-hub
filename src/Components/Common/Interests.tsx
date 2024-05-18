"use client";
import React, { useState } from "react";
import interests from "@/utils/interests";

export default function Interests() {
  const [selectedInterests, setSelectedInterests] =
    useState<{ interest: string; icon: any, selected?: boolean }[]>(interests);

  const handleOnClick = (index: number) => {    
    const temp = [...selectedInterests];
    temp[index].selected = !temp[index].selected;
    setSelectedInterests(temp);
  };

  return (
    <div className="max-w-[600px] flex justify-center flex-wrap gap-5">
      {selectedInterests.map((interest, index) => (
        <div
          key={interest.interest}
          onClick={() => handleOnClick(index)}
          className={`border border-primary rounded-lg p-3 flex items-center gap-3 btn btn-ghost hover:border-primary ${
            interest.selected &&
            "bg-base-100"
          }`}
        >
          <p className="text-xs">{interest.interest}</p>
          {interest.icon}
        </div>
      ))}
    </div>
  );
}
