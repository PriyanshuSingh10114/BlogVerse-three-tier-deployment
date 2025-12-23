import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const TagRSS = () => {
  const { tag } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/rss/${tag}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setItems(data.items);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [tag]);

  return (
    <section className="px-6 lg:px-[12%] py-20">
      <h1 className="text-4xl font-bold mb-8">
        Trending Insights for #{tag}
      </h1>

      {loading && <p>Loading insights...</p>}

      {!loading && items.length === 0 && (
        <p>No insights available.</p>
      )}

      <div className="space-y-6">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="block p-6 border rounded-xl hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold mb-2">
              {item.title}
            </h2>

            <p className="text-sm text-gray-500">
              {item.source} • {new Date(item.pubDate).toDateString()}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default TagRSS;
