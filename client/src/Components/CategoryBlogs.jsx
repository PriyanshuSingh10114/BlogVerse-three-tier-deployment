import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CategoryBlogs = () => {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/blogs`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(blog =>
          blog.tags.includes(category)
        );
        setBlogs(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">
        {category} Articles
      </h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500">
          No articles found in this category.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <Link
              key={blog._id}
              to={`/blog/${blog._id}`}
              className="border rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2">
                  {blog.title}
                </h2>

                <p className="text-sm text-gray-600 mb-3">
                  {blog.excerpt}
                </p>

                <span className="text-xs text-gray-400">
                  By {blog.author}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryBlogs;
