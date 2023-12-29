import Comment from "../models/Comment.js";

/* CREATE */
export const createComment = async (req, res) => {
  try {
    const { userId, postId, text } = req.body;
    const comment = new Comment({
      userId,
      postId,
      text,
      likes: {},
    });
    await comment.save();

    const postComments = await Comment.find({ postId });
    res.status(201).json(postComments);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const postComments = await Comment.find({ postId });
    res.status(201).json(postComments);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
