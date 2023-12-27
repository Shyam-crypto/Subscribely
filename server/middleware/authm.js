import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
 
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  try {
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log('Token verification successful. Decoded:', decoded);
   
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

export { verifyToken };
