import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LatestPosts = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`/api/posts`)
      .then(res => res.json())
      .then(data => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
        setBlogs(sorted.slice(0, 6));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="px-6 lg:px-[12%] py-20 bg-white dark:bg-black transition-colors duration-300">
      
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <h1
          className="text-4xl md:text-5xl font-bold mb-3
                     text-black dark:text-white"
          style={{ fontFamily: "var(--Bricolage-font)" }}
        >
          Latest Posts
        </h1>

        <p className="text-gray-500 dark:text-gray-400 max-w-xl ">
          Stay updated with our most recent articles, insights, and stories.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map(blog => (
          <Link
            to={`/blog/${blog._id}`}
            key={blog._id}
            className="group block border border-gray-200 dark:border-zinc-700
                       rounded-2xl overflow-hidden
                       hover:shadow-xl transition duration-300
                       bg-white dark:bg-zinc-900"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="h-52 w-full object-cover
                           group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col h-full">
              {/* Tag */}
              <span className="text-xs font-semibold text-yellow-500 mb-2 uppercase tracking-wide">
                {blog.tags?.[0]}
              </span>

              {/* Title */}
              <h2 className="text-xl font-bold mb-3 leading-snug
                             text-black dark:text-white">
                {blog.title}
              </h2>

              {/* Excerpt */}
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">
                {blog.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>

                <span className="inline-flex items-center gap-2
                                 text-yellow-500 font-medium">
                  Read Article
                  <i className="bi bi-arrow-right"></i>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;
