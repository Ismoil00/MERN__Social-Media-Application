import express from "express";
import { getFeedPosts, getUserPosts, likePosts } from "../controllers/posts";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePosts);

export default router;
