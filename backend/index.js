import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";
import fileRoutes from "./routes/imgFile.js";
import commentRoutes from "./routes/comments.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

/* CONFIGURATIONS */
// Because we set type to "module", we have to define the below variables manually:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(helmet()); // Instructing Express.js to use the default Helmet middleware, which adds various HTTP headers to enhance security as preventing certain types of attacks like XSS (Cross-Site Scripting) and clickjacking.
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("combined")); // it helps to keep track of information such as request method, status, response time, and more.
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // router for sending images

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/", fileRoutes);
app.use("/users", userRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

    /* ADDING DATA TO DATABASE ONCE */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((err) => console.log(`ERROR while connecting to Database: ${err}`));
