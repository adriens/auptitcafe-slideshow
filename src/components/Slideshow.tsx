"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface MenuItem {
  [key: string]: string;
}

interface SlideshowProps {
  items: MenuItem[];
}

const Slideshow: React.FC<SlideshowProps> = ({ items }) => {
  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, Keyboard]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        loop={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={index}
            className="box-border flex flex-col items-center justify-center text-center w-full h-full p-4"
          >
            {/* --- IMAGE CONTAINER --- */}
            <div className="relative w-full max-w-6xl h-[65vh] rounded-xl overflow-hidden shadow-lg">
              {item.image_url && (
                <Image
                  src={item.image_url}
                  alt={item.titre_plat || "Plat du menu"}
                  fill
                  style={{ objectFit: "cover" }}
                  priority={index === 0}
                  sizes="90vw"
                />
              )}
            </div>

            {/* --- TEXT CONTAINER --- */}
            <div className="w-full max-w-6xl pt-5 flex flex-col justify-center items-center">
              <h2 className="text-[60px] lg:text-[72px] font-extrabold text-white leading-none">
                {item.titre_plat}
              </h2>
              <p className="text-[24px] lg:text-[30px] text-gray-300 mt-4 mb-5 px-4 leading-tight">
                {item.recette}
              </p>
              <p className="text-[50px] lg:text-[60px] font-bold text-white bg-green-700 rounded-lg px-8 py-4 inline-block leading-none">
                {item.prix} XPF
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slideshow;
