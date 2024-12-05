import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('Authentication Error: Missing or malformed Authorization header');
    return res.status(401).json({ message: 'No token provided. Unauthorized.' });
  }

  const token = authHeader.split(' ')[1]; // Extract token

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace with your secret key
    console.log('Token successfully verified:', decoded);
    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    res.status(401).json({ message: 'Invalid token. Unauthorized.' });
  }
};

export default authenticate;
