import React, { useRef, useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import topic1 from '../assets/topic-1.png';
import topic2 from '../assets/topic-2.png';
import topic3 from '../assets/topic-3.png';
import topic4 from '../assets/topic-4.png';
import topic5 from '../assets/topic-5.png';
import topic6 from '../assets/topic-6.png';
import topic7 from '../assets/topic-7.png';
import topic8 from '../assets/topic-8.png';

function Index() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);



  return (
    <>
      <div className="relative px-[8%] lg:px-[12%] pt-[5%]">
        {isReady && (
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 2000,
            }}
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="mt-10 rounded-xl"
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <div className="hero p-[70px] flex flex-col justify-between">
                <div className="hero-top flex justify-between items-center gap-4">
                  <div className="flex items-center gap-5">
                    <span className="bg-gray-200/20 px-5 py-1 rounded-full font-bold hover:bg-gray-200/30 cursor-pointer text-white">
                      Business
                    </span>
                    <span className="bg-gray-200/20 px-5 py-1 rounded-full font-bold hover:bg-gray-200/30 cursor-pointer text-white">
                      News
                    </span>
                  </div>
                  <span className="bg-gray-200/20 px-5 py-1 rounded-full font-bold hover:bg-gray-200/30 cursor-pointer text-white">
                    <i className="bi bi-clock-history mr-1"></i> 6 Min Read
                  </span>
                </div>
                <div className="hero-bottom">
                  <p className="text-[#cdcdcd]">
                    <span className="text-white font-bold">Ethan Caldwell</span> on October 16, 2026
                  </p>
                  <h1 className='text-white font-bold font-bricolage text-7xl w-full lg:w-[80%] my-3'>
                    How Tech Shapes the Future of Work in 2026
                  </h1>
                  <p className="text-lg my-3 w-full lg:w-[70%] text-white">
                    In today’s ever-evolving world, storytelling has become a powerful tool for
                    connection. Revision provides a unique platform for individuals to…
                  </p>
                  <button className='bg-white px-6 py-2 mt-5 rounded text-blue-800 font-bold hover:bg-black hover:text-white hover:shadow-lg transition duration-300'>
                    Discover More
                  </button>
                </div>
              </div>
            </SwiperSlide>
            {/* Slide 2 */}
            <SwiperSlide>
              <div className="hero hero2 p-[70px] flex flex-col justify-between">
                <div className="hero-top flex justify-between items-center gap-4">
                  <div className="flex items-center gap-5">
                    <span className="bg-gray-200/20 px-5 py-1 rounded-full font-bold hover:bg-gray-200/30 cursor-pointer text-white">
                      Sport
                    </span>
                    <span className="bg-gray-200/20 px-5 py-1 rounded-full font-bold hover:bg-gray-200/30 cursor-pointer text-white">
                      Travel
                    </span>
                  </div>
                  <span className="bg-gray-200/20 px-5 py-1 rounded-full font-bold hover:bg-gray-200/30 cursor-pointer text-white">
                    <i className="bi bi-clock-history mr-1"></i> 3 Min Read
                  </span>
                </div>
                <div className="hero-bottom">
                  <p className="text-[#cdcdcd]">
                    <span className="text-white font-bold">Ethan Caldwell</span> on September 29, 2026
                  </p>
                  <h1 className="text-white font-bold font-bricolage text-7xl w-full lg:w-[80%] my-3">
                    The Future of Work: Tech and Remote Trends
                  </h1>
                  <p className="text-lg my-3 w-full lg:w-[70%] text-white">
                    Find out why 2026 is predicted to be a pivotal year for sports technology and its
                    impact on the industry.
                  </p>
                  <button className="bg-white px-6 py-2 mt-5 rounded text-blue-800 font-bold hover:bg-black hover:text-white hover:shadow-lg transition duration-300">
                    Discover More
                  </button>
                </div>
              </div>
            </SwiperSlide>
            {/* Slide 3 */}
            <SwiperSlide>
              <div className="hero hero3 p-[70px] flex flex-col justify-between">
                <div className="hero-top flex justify-between items-center gap-4">
                  <div className="flex items-center gap-5">
                    <span className="bg-gray-200/20 px-5 py-1 rounded-full font-bold hover:bg-gray-200/30 cursor-pointer text-white">
                      News
                    </span>
                    <span className="bg-gray-200/20 px-5 py-1 rounded-full font-bold hover:bg-gray-200/30 cursor-pointer text-white">
                      Trends
                    </span>
                  </div>
                  <span className="bg-gray-200/20 px-5 py-1 rounded-full font-bold hover:bg-gray-200/30 cursor-pointer text-white">
                    <i className="bi bi-clock-history mr-1"></i> 5 Min Read
                  </span>
                </div>
                <div className="hero-bottom">
                  <p className="text-[#cdcdcd]">
                    <span className="text-white font-bold">Ethan Caldwell</span> on September 27, 2026
                  </p>
                  <h1 className="text-white font-bold font-bricolage text-7xl w-full lg:w-[80%] my-3">
                    Remote Work Trends in the Digital Age
                  </h1>
                  <p className="text-lg my-3 w-full lg:w-[70%] text-white">
                    Discover the cutting-edge tech gadgets making travel smarter and more convenient
                    in 2026.
                  </p>
                  <button className="bg-white px-6 py-2 mt-5 rounded text-blue-800 font-bold hover:bg-black hover:text-white hover:shadow-lg transition duration-300">
                    Discover More
                  </button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        )}
        {/* Custom Navigation Button */}

        <div
          ref={prevRef}
          className='swiper-button-prev swiper-btn swiper-btn-prev text-white text-3xl cursor-pointer'
        >
          <i className="bi bi-arrow-left"></i>
        </div>
        <div
          ref={nextRef}
          className='swiper-button-prev swiper-btn swiper-btn-next text-white text-3xl cursor-pointer'
        >
          <i className="bi bi-arrow-right"></i>
        </div>
      </div>

      {/* Explore Topics */}
      <div className="px-[8%] lg:px-[12%] explore-topic py-10 flex flex-col justify-center items-center">
        <h2 className='text-sm uppercase text-center tracking-widest mb-6 font-bold'>
          Explore Trending Topics
        </h2>

        <div className="flex flex-wrap justify-center gap-4 w-[100%] lg:w-[80%]">
          {/* Each topic item */}
          <div className="topic-box flex items-center gap-2 px-6 py-2 bg-[#111] border border-gray-700 bg-gray-50/10 hover:bg-gray-50/15 rounded-full shadow-sm hover:shadow-md cursor-pointer transition">
            <img src={topic1} className='w-7' alt="" />
            <span className="font-medium text-xl">Technology</span>
          </div>
          <div className="topic-box flex items-center gap-2 px-6 py-2 bg-[#111] border border-gray-700 bg-gray-50/10 hover:bg-gray-50/15 rounded-full shadow-sm hover:shadow-md cursor-pointer transition">
            <img src={topic2} className='w-7' alt="" />
            <span className="font-medium text-xl">Travel</span>
          </div>
          <div className="topic-box flex items-center gap-2 px-6 py-2 bg-[#111] border border-gray-700 bg-gray-50/10 hover:bg-gray-50/15 rounded-full shadow-sm hover:shadow-md cursor-pointer transition">
            <img src={topic3} className='w-7' alt="" />
            <span className="font-medium text-xl">Sport</span>
          </div>
          <div className="topic-box flex items-center gap-2 px-6 py-2 bg-[#111] border border-gray-700 bg-gray-50/10 hover:bg-gray-50/15 rounded-full shadow-sm hover:shadow-md cursor-pointer transition">
            <img src={topic4} className='w-7' alt="" />
            <span className="font-medium text-xl">Business</span>
          </div>
          <div className="topic-box flex items-center gap-2 px-6 py-2 bg-[#111] border border-gray-700 bg-gray-50/10 hover:bg-gray-50/15 rounded-full shadow-sm hover:shadow-md cursor-pointer transition">
            <img src={topic5} className='w-7' alt="" />
            <span className="font-medium text-xl">Management</span>
          </div>
          <div className="topic-box flex items-center gap-2 px-6 py-2 bg-[#111] border border-gray-700 bg-gray-50/10 hover:bg-gray-50/15 rounded-full shadow-sm hover:shadow-md cursor-pointer transition">
            <img src={topic6} className='w-7' alt="" />
            <span className="font-medium text-xl">Trends</span>
          </div>
          <div className="topic-box flex items-center gap-2 px-6 py-2 bg-[#111] border border-gray-700 bg-gray-50/10 hover:bg-gray-50/15 rounded-full shadow-sm hover:shadow-md cursor-pointer transition">
            <img src={topic7} className='w-7' alt="" />
            <span className="font-medium text-xl">Startups</span>
          </div>
          <div className="topic-box flex items-center gap-2 px-6 py-2 bg-[#111] border border-gray-700 bg-gray-50/10 hover:bg-gray-50/15 rounded-full shadow-sm hover:shadow-md cursor-pointer transition">
            <img src={topic8} className='w-7' alt="" />
            <span className="font-medium text-xl">News</span>
          </div>
        </div>
      </div>

    </>
  );
}

export default Index;
