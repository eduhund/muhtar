export default function auth(req, res, next) {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
