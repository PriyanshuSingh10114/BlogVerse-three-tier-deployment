import { useNavigate } from "react-router-dom";

const Tags = () => {
  const navigate = useNavigate();

  const tags = [
    {
      name: "Business",
      count: 42,
      desc: "Insights, strategies, and trends shaping modern businesses."
    },
    {
      name: "Technology",
      count: 58,
      desc: "Latest in software, AI, web, cloud, and emerging tech."
    },
    {
      name: "Startups",
      count: 31,
      desc: "Founders, funding, growth stories, and startup culture."
    },
    {
      name: "Sports",
      count: 19,
      desc: "Updates, analysis, and stories from the sports world."
    },
    {
      name: "News",
      count: 67,
      desc: "Breaking news and important updates across domains."
    },
    {
      name: "Trends",
      count: 24,
      desc: "What’s trending now across tech, business, and culture."
    },
    {
      name: "Management",
      count: 15,
      desc: "Leadership, productivity, and people management tips."
    }
  ];

  return (
    <section className="px-6 lg:px-[12%] py-20 bg-white dark:bg-black transition-colors">
      
      {/* Header */}
      <div className="max-w-3xl mb-14">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4
                     text-black dark:text-white leading-snug"
          style={{ fontFamily: "var(--Bricolage-font)" }}
        >
          Explore Topics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Browse articles by topic and dive deep into subjects you care about.
        </p>
      </div>

      {/* Tags Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tags.map(tag => (
          <div
            key={tag.name}
            onClick={() => navigate(`/tags/${tag.name.toLowerCase()}`)}
            className="cursor-pointer rounded-2xl p-6
                       border border-gray-200 dark:border-zinc-800
                       hover:border-black dark:hover:border-white
                       transition-all duration-200
                       hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-black dark:text-white">
                #{tag.name}
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {tag.count} posts
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {tag.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tags;
