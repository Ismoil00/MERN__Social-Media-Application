import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    // if token is missed then a user does not have access to APIs:
    if (!token) return res.status(403).json({ msg: "Access Denied!" });

    // Reforming token:
    if (token.startsWith("Bearer "))
      token = token.slice(7, token.length).trimLeft();

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("VERIFYING TOKEN", verified);
    req.user = verified;
    next();
  } catch (err) {
    console.log(`VERIFYING TOKEN ERROR: ${err}`);
    res.status(500).json({ error: err.message });
  }
};
