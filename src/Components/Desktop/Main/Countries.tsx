"use client";
import React from "react";
import CountriesCarousel from "./CountriesCarousel";
import CountriesDropdown from "../../Common/CountriesDropdown";

export default function Countries() {
  return (
    <div className="flex justify-between gap-14 items-center h-[10vh]">
      <div className="w-[75%]">
        <CountriesCarousel />
      </div>
      <div className="max-w-[23%]">
        <CountriesDropdown />
      </div>
    </div>
  );
}
