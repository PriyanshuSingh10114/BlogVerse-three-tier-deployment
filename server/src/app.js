import express from "express";
import cors from "cors";
import blogRoutes from "./routes/blog.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import newsletterRoutes from "./utils/newsletter.js";
import rssRoutes from "./routes/rss.routes.js";
const app = express();

app.use(cors({
  origin: "https://blogverse-j1q2.onrender.com",
  methods: ["POST"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/newsletter", newsletterRoutes);
app.use("/api/rss", rssRoutes);

app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.send("BlogVerse API is running");
});

app.use(errorHandler);

export default app;
