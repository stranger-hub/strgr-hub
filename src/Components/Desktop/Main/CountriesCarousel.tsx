import React, { useState } from "react";
import SwiperCore from "swiper";
import { countries } from "countries-list";
import {
  BsGenderMale,
  BsGenderFemale,
  BsArrowRightCircle,
  BsArrowLeftCircle,
} from "react-icons/bs";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import Image from "next/image";
import "swiper/css";

const SwiperButton = ({
  direction,
  my_swiper,
}: {
  direction: string;
  my_swiper: SwiperCore | null;
}) => {
  return (
    <button
      className="btn btn-ghost rounded-full p-3 col-span-1"
      onClick={() =>
        direction === "left" ? my_swiper?.slidePrev() : my_swiper?.slideNext()
      }
    >
      {direction === "left" ? (
        <BsArrowLeftCircle size={22} className="text-primary" />
      ) : (
        <BsArrowRightCircle size={22} className="text-primary" />
      )}
    </button>
  );
};

export default function CountriesCarousel() {
  const [my_swiper, set_my_swiper] = useState<SwiperCore | null>(null);

  return (
    <div className="grid grid-cols-12">
      <SwiperButton direction="left" my_swiper={my_swiper} />
      <div className="col-span-10">
        <Swiper
          spaceBetween={50}
          slidesPerView={5}
          className="mySwiper"
          onInit={(ev) => {
            set_my_swiper(ev);
          }}
        >
          <div>
            {Object.entries(countries).map(([countryCode, countryInfo]) => (
              <SwiperSlide key={countryCode}>
                <div
                  className="flex items-center gap-5 btn btn-ghost p-0 font-normal"
                  title={countryInfo.name}
                >
                  <div className="text-center">
                    <BsGenderFemale color="white" size={20} />
                    <p className="mt-1">20</p>
                  </div>
                  <Image
                    alt="United States"
                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
                    width={45}
                    height={30}
                    className="rounded"
                  />
                  <div className="text-center">
                    <BsGenderMale color="white" size={20} />
                    <p className="mt-1">20</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
      <SwiperButton direction="right" my_swiper={my_swiper} />
    </div>
  );
}
