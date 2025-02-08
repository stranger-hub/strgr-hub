"use client";
import React, { useEffect, useState } from "react";
import initialInterests from "@/data/interests";

interface InterestsInterface {
  interest: string;
  icon: any;
  selected?: boolean;
}

export default function Interests({
  interests,
  updateProfile,
}: {
  interests: string[];
  updateProfile: (
    name?: string,
    dob?: Date,
    gender?: string,
    interests?: string[]
  ) => void;
}) {
  const [allInterests, setAllInterests] = useState<InterestsInterface[]>(initialInterests);
  useEffect(() => {
    const updatedInterests = initialInterests.map((i) => {
      if (interests.find((it) => it === i.interest)) {
        return { ...i, selected: true };
      }
      return i;
    });
    setAllInterests(updatedInterests);
  }, [interests]);

  const handleOnClick = (index: number) => {
    const temp: InterestsInterface[] = [...allInterests];
    let count: number = 0;
    temp.forEach((i: InterestsInterface) => {
      i.selected && count++;
    });
    if (count > 2 && !temp[index].selected) return;
    temp[index].selected = !temp[index].selected;
    setAllInterests(temp);
    updateProfile(
      undefined,
      undefined,
      undefined,
      temp.filter((t) => t.selected).map((t) => t.interest)
    );
  };

  return (
    <div className="max-w-[600px] flex justify-center flex-wrap gap-3 md:gap-5">
      {allInterests.map((interest, index) => (
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
