import express from "express";
import Parser from "rss-parser";
import { rssSources } from "../config/rssSources.js";

const router = express.Router();
const parser = new Parser({
  timeout: 10000, // 10 seconds
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "application/rss+xml, application/xml, text/xml;q=0.9"
  }
});

router.get("/:tag", async (req, res) => {
  const { tag } = req.params;
  const sources = rssSources[tag];

  if (!sources) {
    return res.status(404).json({
      success: false,
      message: "Invalid tag",
    });
  }

  try {
    let items = [];

    for (const source of sources) {
      try {
        const feed = await parser.parseURL(source.url);

        if (!feed.items || feed.items.length === 0) continue;

        items.push(
          ...feed.items.slice(0, 5).map(item => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            source: source.name
          }))
        );
      } catch (err) {
        console.warn(`RSS skipped: ${source.name}`);
      }
    }


    res.json({
      success: true,
      tag,
      items: items.slice(0, 10),
    });
  } catch (error) {
    console.error("RSS ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "RSS fetch failed",
    });
  }
});

export default router;
