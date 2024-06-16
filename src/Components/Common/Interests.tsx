"use client";
import React, { useState } from "react";
import interests from "@/data/interests";

interface Interests {
  interest: string;
  icon: any;
  selected?: boolean;
}

export default function Interests() {
  const [selectedInterests, setSelectedInterests] =
    useState<Interests[]>(interests);

  const handleOnClick = (index: number) => {
    const temp: Interests[] = [...selectedInterests];
    let count: number = 0;
    temp.forEach((i: Interests) => {
      i.selected && count++;
    });
    if (count > 2 && !temp[index].selected) return;

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
            interest.selected && "bg-base-100"
          }`}
        >
          <p className="text-xs">{interest.interest}</p>
          {interest.icon}
        </div>
      ))}
    </div>
  );
}
