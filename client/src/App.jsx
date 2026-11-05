import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

import Nav from "./Components/Nav";
import Index from "./Components/Index";
import Footer from "./Components/Footer";
import Blog from "./Components/Blog/Blog";
import BlogDetails from "./Components/Blog/BlogDetails";
import Categories from "./Components/Categories";
import LatestPosts from "./Components/LatestPosts";
import Tags from "./Components/Tags";
import CategoryBlogs from "./Components/CategoryBlogs";
import TagRSS from "./Components/TagRSS";

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition duration-300">
      <Nav isDark={isDark} toggleTheme={toggleTheme} />

      <main className="pt-20">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Index />
                <Blog />
              </>
            }
          />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category" element={<CategoryBlogs />} />
          <Route path="/latest" element={<LatestPosts />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tags/:tag" element={<TagRSS />} />
          <Route
            path="*"
            element={
              <div className="text-center py-40">
                <h1 className="text-6xl font-bold font-bricolage mb-4">404</h1>
                <p className="text-xl text-gray-500 mb-6">Page not found</p>
                <a
                  href="/"
                  className="px-6 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black font-semibold"
                >
                  Return Home
                </a>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
