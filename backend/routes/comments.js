import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { getPostComments, createComment } from "../controllers/comments.js";

const router = express.Router();

/* READ */
router.get("/:postId", verifyToken, getPostComments);

/* CREATE */
router.post("/", verifyToken, createComment);

export default router;
