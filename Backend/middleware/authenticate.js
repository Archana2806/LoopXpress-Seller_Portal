import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Ensure Authorization header is present
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided. Unauthorized.' });
  }

  const token = authHeader.split(' ')[1]; // Extract token

  try {
    // Verify token and extract payload
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace with your secret key
    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err);
    res.status(401).json({ message: 'Invalid token. Unauthorized.' });
  }
};

export default authenticate;
