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
  // Restaurant info slide data
  const restaurantInfo = {
    titre: "Au P'tit Café",
    horaires: [
      "Lundi au vendredi: de 11h00 à 13h30",
      "Mercredi au vendredi: de 18h30 à 21h00",
    ],
    telephone: "28.21.89",
    website: "http://auptitcafe.nc/",
    facebook: "https://www.facebook.com/auptitcafe.nc",
    instagram: "https://www.instagram.com/auptitcafe.nc/",
  };

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
        {/* Restaurant Info Slide */}
        <SwiperSlide className="box-border flex flex-col items-center justify-center text-center w-full h-full p-4">
          <div className="w-full max-w-4xl pt-5 flex flex-col justify-center items-center text-[28px] lg:text-[36px] bg-gradient-to-br from-green-900 via-black to-gray-900 rounded-3xl shadow-2xl p-10 border border-green-700">
            <img src="/logo-auptit-cafe.png" alt="Logo Au P'tit Café" className="mb-6 w-40 h-40 object-contain drop-shadow-xl" />
            <div className="mb-6">
              
              <div className="w-full flex flex-col items-start">
                {restaurantInfo.horaires.map((h, i) => (
                  <p key={i} className="text-[28px] lg:text-[36px] text-gray-200 mb-2 text-left w-full">{h}</p>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-[28px] lg:text-[36px] text-gray-200 mb-2">{restaurantInfo.telephone}</p>
            </div>
            <div className="mb-6">
              <a href={restaurantInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-[28px] lg:text-[36px] mb-2">
                {restaurantInfo.website}
              </a>
            </div>
            <div className="mb-6">
              <div className="flex flex-col gap-2 items-center">
                <a href={restaurantInfo.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-400 underline text-[28px] lg:text-[36px]">
                  <img src="/facebook.svg" alt="Facebook" style={{ width: '20px', height: '20px', display: 'inline' }} />
                  Facebook
                </a>
                <a href={restaurantInfo.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-pink-400 underline text-[28px] lg:text-[36px]">
                  <img src="/instagram.svg" alt="Instagram" style={{ width: '20px', height: '20px', display: 'inline' }} />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Existing menu slides */}
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
