import { countries } from "countries-list";
import Image from "next/image";
import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";

export default function CountriesDropdown() {
  return (
    <div className="flex gap-5 items-center">
      <div
        className="tooltip tooltip-info tooltip-bottom"
        data-tip="Select a country to connect with strangers of that country"
      >
        <BsInfoCircleFill />
      </div>
      <div className="dropdown dropdown-bottom dropdown-end">
        <div role="button" tabIndex={0} className="btn m-1 bg-primary">
          Select country
        </div>
        <ul
            tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-[200px] h-[60vh] overflow-auto flex-nowrap"
        >
          {Object.entries(countries).map(([countryCode, countryInfo]) => (
            <li>
              <div className="flex flex-row items-center gap-5">
                <Image
                  alt="United States"
                  src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
                  width={18}
                  height={12}
                />
                <p>{countryInfo.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
