import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    req.user = decoded;
    next();
  } catch (error) {
    // If the token is invalid, return an error response
    res.status(401).json({ error: 'Invalid token' });
  }
};

export { verifyToken };
