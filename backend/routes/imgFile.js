import multer from "multer";
import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { register } from "../controllers/auth.js";
import { createPost } from "../controllers/posts.js";

const router = express.Router();

/* FILE STORAGE */
// Package Configuration:
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* ROUTES FOR HANDLING IMAGES UPLOAD */
router.post("/auth/register", upload.single("picture"), register);
router.post("/posts", verifyToken, upload.single("picture"), createPost);

export default router;
