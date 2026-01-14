export const verifyToken = (req, res, next) => {
  const token = req.query.token || req.headers.authorization?.split(' ')[1];
  
  if (token === process.env.API_TOKEN) {
    next();
  } else {
    res.status(401).json({ error: "Invalid or missing token" });
  }
};
