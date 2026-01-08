import React, { useEffect, useState } from 'react';

import about from '../../assets/about.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import figma from '../../assets/figma.png';
import notion from '../../assets/notion.png';
import ps from '../../assets/ps.png';
import AI from '../../assets/AI.png';
import { Link } from 'react-router-dom';


function Blog() {

const [blogs, setBlogs] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);

useEffect(() => {
  fetch(`/api/posts`)
    .then(res => res.json())
    .then(data => {
      setBlogs(data);
      setLoading(false);
    })
    .catch(() => {
      setError(true);
      setLoading(false);
    });
}, []);



  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-8/12 p-4 rounded-lg">
          {blogs.map((blog) => (
            <div key={blog._id} className="flex flex-col md:flex-row items-center gap-6 mb-10">
              <div className="w-full md:w-1/2 overflow-hidden rounded-xl">
                <Link to={`/blog/${blog._id}`}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="rounded-xl w-full blog-img object-cover h-[270px] transform transition-transform duration-500 ease-in-out hover:scale-105 cursor-pointer"
                  />
                </Link>
              </div>

              <div className="w-full md:w-2/3">
                <div className="flex gap-2 mb-3">
                  {blog.tags?.map((tag, _id) => (
                    <span
                      key={_id}
                      className="bg-gray-50/10 border border-[#83838380] text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-400 mb-1">
                  <span className="font-semibold">{blog.author}</span> on {blog.date}
                </p>

                <h2 className="text-xl font-bold mb-3">{blog.title}</h2>

                <p className=" mb-4">{blog.excerpt}</p>

                <Link to={`/blog/${blog._id}`}>
                  <button className="px-6 py-2 rounded-lg bg-transparent border border-[#83838380] hover:bg-gray-50/15 font-medium transition duration-300 ease-in-out shadow-sm hover:shadow-md">
                    Discover More
                  </button>
                </Link>

              </div>
            </div>
          ))}
        </div>
        <div className=" w-full lg:w-4/12 p-4 sticky top-[80px] left-0 h-full">
          {/* Box 1 */}
          <div className="bg-gray-50/10 rounded-lg shadow-lg border border-[#83838380] p-4">
            <span className='uppercase text-[14px]'>About</span>
            <div className="flex items-center my-3 gap-1">
              <img src={about} className='w-16 rounded-full p-1' alt="" />
              <div>
                <h3 className='font-bold'>Ethan Caldwell</h3>
                <p className='uppercase text-[13px]'>Reflective Blogger</p>
              </div>
            </div>
            <p>Ethan Caldwell shares thoughtful insights and reflections on life, culture, and personal growth. His work explores the intersections of creativity and experience, offering readers unique perspectives.</p>
            <h5 className='font-bold my-3'><i className="bi bi-geo-alt-fill"></i> Paris, France</h5>
            <div className="social-icons flex gap-4">
              <i className="bi bi-twitter-x hover:text-yellow-400 cursor-pointer transition text-xl"></i>
              <i className="bi bi-instagram hover:text-yellow-400 cursor-pointer transition text-xl"></i>
              <i className="bi bi-facebook hover:text-yellow-400 cursor-pointer transition text-xl"></i>
              <i className="bi bi-linkedin hover:text-yellow-400 cursor-pointer transition text-xl"></i>
            </div>
          </div>
          <h2 className='uppercase my-5 font-bold'>Featured Posts</h2>
          {/* Mini Slider */}
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 1500 }}
            className="rounded-md"
          >
  {/* Slide 1 */}
        <SwiperSlide>
          <div className="mini-slide p-5 flex flex-col justify-between">
            <div>
              <span className="px-5 py-1 rounded-full font-bold cursor-pointer
                              bg-black/10 text-black
                              dark:bg-gray-200/20 dark:text-white
                              hover:bg-black/20 dark:hover:bg-gray-200/30 transition">
                Business
              </span>
            </div>

            <div>
              <p className="text-gray-700 dark:text-[#cdcdcd]">
                <span className="font-bold text-black dark:text-white">
                  Ethan Caldwell
                </span>{" "}
                on October 16, 2025
              </p>

              <h1 className="font-bold font-bricolage text-2xl my-1
                            text-black dark:text-white">
                How Tech Shapes the Future of Work in 2026
              </h1>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="mini-slide mini-slide2 p-5 flex flex-col justify-between">
            <div>
              <span className="px-5 py-1 rounded-full font-bold cursor-pointer
                              bg-black/10 text-black
                              dark:bg-gray-200/20 dark:text-white
                              hover:bg-black/20 dark:hover:bg-gray-200/30 transition">
                Sport
              </span>
            </div>

            <div>
              <p className="text-gray-700 dark:text-[#cdcdcd]">
                <span className="font-bold text-black dark:text-white">
                  Ethan Caldwell
                </span>{" "}
                on September 29, 2025
              </p>

              <h1 className="font-bold font-bricolage text-2xl my-1
                            text-black dark:text-white">
                The Future of Work: Tech and Remote Trends
              </h1>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="mini-slide mini-slide3 p-5 flex flex-col justify-between">
            <div>
              <span className="px-5 py-1 rounded-full font-bold cursor-pointer
                              bg-black/10 text-black
                              dark:bg-gray-200/20 dark:text-white
                              hover:bg-black/20 dark:hover:bg-gray-200/30 transition">
                Trends
              </span>
            </div>

            <div>
              <p className="text-gray-700 dark:text-[#cdcdcd]">
                <span className="font-bold text-black dark:text-white">
                  Ethan Caldwell
                </span>{" "}
                on September 27, 2025
              </p>

              <h1 className="font-bold font-bricolage text-2xl my-1
                            text-black dark:text-white">
                Remote Work Trends in the Digital Age
              </h1>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>


          {/* Box 2 */}
<div className="bg-gray-50/10 rounded-lg shadow-lg
                border border-[#83838380] p-4 mt-10">
  <span className="uppercase text-[14px] tracking-wide">
    Trending Topics
  </span>

  <div className="flex flex-col mt-4 space-y-4">

    <div className="flex justify-between items-center
                    border-b border-[#83838380] pb-3 cursor-pointer
                    hover:text-yellow-400 transition">
      <h2 className="font-medium">Artificial Intelligence</h2>
      <span className="text-sm text-gray-400">124 posts</span>
    </div>

    <div className="flex justify-between items-center
                    border-b border-[#83838380] pb-3 cursor-pointer
                    hover:text-yellow-400 transition">
      <h2 className="font-medium">Remote Work</h2>
      <span className="text-sm text-gray-400">98 posts</span>
    </div>

    <div className="flex justify-between items-center
                    border-b border-[#83838380] pb-3 cursor-pointer
                    hover:text-yellow-400 transition">
      <h2 className="font-medium">Startups</h2>
      <span className="text-sm text-gray-400">76 posts</span>
    </div>

    <div className="flex justify-between items-center
                    cursor-pointer hover:text-yellow-400 transition">
      <h2 className="font-medium">Technology Trends</h2>
      <span className="text-sm text-gray-400">64 posts</span>
    </div>

  </div>
</div>


          {/* Box 3 */}
          <div className="bg-gray-50/10 rounded-lg shadow-lg border border-[#83838380] p-4 mt-10">
            <span className='uppercase text-[14px]'>Technologies</span>

            <div className="flex items-center gap-3 my-6">
              <img src={figma} className='w-12 rounded-lg' alt="" />
              <div>
                <h2 className='font-bold text-xl'>Figma</h2>
                <p className=' font-[300]'>Collaborate and design interfaces in real-time.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 my-6">
              <img src={notion} className='w-12 rounded-lg' alt="" />
              <div>
                <h2 className='font-bold text-xl'>Notion</h2>
                <p className=' font-[300]'>Organize, track, and collaborate on projects easily.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 my-6">
              <img src={ps} className='w-12 rounded-lg' alt="" />
              <div>
                <h2 className='font-bold text-xl'>Photoshop</h2>
                <p className=' font-[300]'>Professional image and graphic editing tool.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 my-6">
              <img src={AI} className='w-12 rounded-lg' alt="" />
              <div>
                <h2 className='font-bold text-xl'>Illustrator</h2>
                <p className=' font-[300]'>Create precise vector graphics and illustrations.</p>
              </div>
            </div>

          </div>

          {/* Box 4 */}
          <div className="bg-gray-50/10 rounded-lg shadow-lg border border-[#83838380] p-4 mt-10">
            <span className='uppercase text-[14px] '>Creating</span>

            <div className="my-5">
              <h2 className='pb-2 font-bold text-xl hover:text-yellow-400 cursor-pointer transition'>Heartfelt Reflections <i className="bi bi-box-arrow-in-up-right"></i></h2>
              <p>A deep dive into emotional experiences and personal growth, sharing valuable insights on life's most meaningful moments.</p>
            </div>

            <div className="my-5">
              <h2 className='pb-2 font-bold text-xl hover:text-yellow-400 cursor-pointer transition'>Latest Tech Gadgets <i className="bi bi-box-arrow-in-up-right"></i></h2>
              <p>Explore the newest and most innovative technology products hitting the market, from smart devices to cutting-edge tools.</p>
            </div>

            <div className="my-5">
              <h2 className='pb-2 font-bold text-xl hover:text-yellow-400 cursor-pointer transition'>Trends for 2026 <i className="bi bi-box-arrow-in-up-right"></i></h2>
              <p>A look ahead at the emerging trends that will shape the world in 2024, from lifestyle shifts to groundbreaking innovations.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
