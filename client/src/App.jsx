import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Nav from './Components/Nav'
import Index from './Components/Index';
import Footer from './Components/Footer';
import Blog from './Components/Blog/Blog';
import BlogDetails from './Components/Blog/BlogDetails';
import Categories from "./Components/Categories";
import LatestPosts from "./Components/LatestPosts";
import Tags from "./Components/Tags";
import CategoryBlogs from "./Components/CategoryBlogs";
import TagRSS from "./Components/TagRSS";

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }


  return (
    <>
      <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition">
        <Nav isDark={isDark} toggleTheme={toggleTheme} />

        <Routes>
          <Route path='/' element={<> <Index /><Blog /> </>} />
          <Route path='/blog/:id' element={<BlogDetails/>} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/latest" element={<LatestPosts />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/categories/:category" element={<CategoryBlogs />} />
          <Route path="/tags/:tag" element={<TagRSS />} />
          <Route path="/tags/:tag" element={<TagRSS />} />

        </Routes>
        <Footer />
      </div>

    </>
  )
}

export default App
