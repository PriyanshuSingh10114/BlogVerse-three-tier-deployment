import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Business",
      description: "Insights, strategies, and trends shaping modern businesses."
    },
    {
      name: "Technology",
      description: "Latest updates in tech, AI, software, and innovation."
    },
    {
      name: "Startups",
      description: "Entrepreneurship stories, funding, and startup growth."
    },
    {
      name: "Sports",
      description: "Technology, trends, and analytics in the sports world."
    },
    {
      name: "Management",
      description: "Leadership, productivity, and organizational growth."
    },
    {
      name: "News",
      description: "Industry news and major global updates."
    }
  ];

  return (
    <section className="px-6 lg:px-[12%] py-24 bg-white dark:bg-black transition-colors duration-300">
      
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4
                     text-black dark:text-white leading-snug"
          style={{ fontFamily: "var(--Bricolage-font)" }}
        >
          Categories
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse articles by category to discover stories that match your interests.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => navigate(`/categories/${cat.name}`)}
            className="group border border-gray-200 dark:border-zinc-700
                       rounded-2xl p-6 cursor-pointer
                       bg-white dark:bg-zinc-900
                       hover:shadow-xl transition duration-300"
          >
            {/* Category Label */}
            <span className="inline-block mb-3 text-xs uppercase tracking-wide
                             text-yellow-500 font-semibold">
              Category
            </span>

            {/* Category Name */}
            <h2 className="text-2xl font-bold mb-3
                           text-black dark:text-white
                           group-hover:text-yellow-500 transition">
              {cat.name}
            </h2>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {cat.description}
            </p>

            {/* CTA */}
            <div className="mt-6 flex items-center gap-2
                            text-yellow-500 font-medium">
              Explore Articles
              <i className="bi bi-arrow-right transition group-hover:translate-x-1"></i>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
