import React, { useState, useEffect } from "react";

import Searchbar from "../../components/searchbar";
import Cardcategory from "../../components/cardcategory";
import Modalbox from "../../components/modalbox";
import SwiperNavButton from "../../components/swipernavbutton";
import Button from "../../components/button";

import { Swiper, SwiperSlide, SwiperWrapper } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";

import homeCover from "../../assets/images/homepage-cover.svg";
import vacuumPhoto from "../../assets/images/homepage-vacuum.svg";
import imageUrl from "../../assets/images/categoryphoto.png";
import homeBubble from "../../assets/images/homepage-bg-bubble.svg";

import "../../styles/media.css";

import { useNavigate } from "react-router-dom";

import apiService from "../../services/apiService";

export default function Homepage() {
  const [isOpen, setIsOpen] = useState(false);
  const navigateTo = useNavigate();
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = services
    .map((obj) => {
      return {
        ...obj,
      };
    })
    .filter((item) =>
      item.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  async function getAllService() {
    try {
      // Make API call to fetch services
      const response = await apiService.getAllService();

      // Map the response data to include the static imageUrl
      const servicesWithImageUrl = response.data.map((service) => {
        return {
          ...service,
          imageUrl: imageUrl, // Use the imported imageUrl for all services
        };
      });

      // Update the state with the services including imageUrl
      setServices(servicesWithImageUrl);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadd = () => {
        resolve(fileReader.result);
      };
      fileReader.oneerror = (error) => {
        reject(error);
      };
    });
  }

  useEffect(() => {
    getAllService();
  }, []);

  return (
    <>
      <div
        style={{ "--landingBG": `url(${homeCover})` }}
        className="bg-[image:var(--landingBG)] bg-cover bg-center text-white py-32"
      >
        <div className="relative flex items-center py-3 px-12 justify-center">
          <div className="w-[75%] pr-[5%]">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <h1>Effortless Convenience At Your Fingertips.</h1>
            </div>
            <div>
              <p className="text-xl line-clamp-3 mb-6">
                Designed to simplify your busy life, connects you with a network
                of reliable and trustworthy helpers who are ready to assist you
                with any errand or task.
              </p>
            </div>
            <div>
              <Searchbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={vacuumPhoto}
              className="hidden md:block max-w-[80%]"
            ></img>
          </div>
        </div>
      </div>

      <div
        style={{ "--landingBubble": `url(${homeBubble})` }}
        className="bg-[image:var(--landingBubble)] bg-cover bg-center p-12"
      >
        <div className="font-semibold text-xl text-[#22313F]">Explore</div>
        <div className="font-medium text-3xl text-[#44558F]">House Chores</div>
        <div>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              320: {
                slidesPerView: 1,
              },
            }}
            className="!p-4 !flex flex-col-reverse"
          >
            <SwiperNavButton />
            {filteredData.map((obj, i) => {
              return (
                obj.category == "House Chores" && (
                  <SwiperSlide key={i}>
                    <Cardcategory
                      title={obj.serviceName}
                      imageUrl={obj.imageUrl}
                      body={obj.serviceDesc}
                      onClick={() => navigateTo("/createtask")}
                    />
                  </SwiperSlide>
                )
              );
            })}
          </Swiper>
        </div>

        <div className="font-medium text-3xl text-[#44558F] mt-16">
          Professional Help
        </div>
        <div>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              320: {
                slidesPerView: 1,
              },
            }}
            className="!p-4 !flex flex-col-reverse"
          >
            <SwiperNavButton />
            {filteredData.map((obj, i) => {
              return (
                obj.category == "Professional Help" && (
                  <SwiperSlide key={i}>
                    <Cardcategory
                      title={obj.serviceName}
                      imageUrl={obj.imageUrl}
                      body={obj.serviceDesc}
                      onClick={() => navigateTo("/createtask")}
                    />
                  </SwiperSlide>
                )
              );
            })}
          </Swiper>
        </div>

        <div className="font-medium text-3xl text-[#44558F] mt-16">
          Writing and Translation
        </div>
        <div>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              320: {
                slidesPerView: 1,
              },
            }}
            className="!p-4 !flex flex-col-reverse mb-16"
          >
            <SwiperNavButton />
            {filteredData.map((obj, i) => {
              return (
                obj.category == "Writing and Translation" && (
                  <SwiperSlide key={i}>
                    <Cardcategory
                      title={obj.serviceName}
                      imageUrl={obj.imageUrl}
                      body={obj.serviceDesc}
                      onClick={() => navigateTo("/createtask")}
                    />
                  </SwiperSlide>
                )
              );
            })}
          </Swiper>
        </div>

        {/* <div>
          <Button buttonText="open" onClick={() => setIsOpen(true)} />
          <Modalbox isOpen={isOpen} setIsOpen={setIsOpen}>
            testing
          </Modalbox>
        </div> */}
      </div>
    </>
  );
}
