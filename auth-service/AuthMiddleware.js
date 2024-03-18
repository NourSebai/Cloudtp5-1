const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authentification nécessaire.' });
  }

  jwt.verify(token, '', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide.' });
    }
    next();
  });
};

module.exports = verifyToken;
