const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const jwtHeader = req.header(process.env.JWT_HEADER);
  if (!jwtHeader) return res.status(401).json({ error: 'Access denied' });

  const prefix = jwtHeader.split(' ')[0];
  const token = jwtHeader.split(' ')[1];
  if (!prefix.includes(process.env.JWT_TOKEN_PREFIX)) return res.status(401).json({ error: 'Access denied' });
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken.id;
    req.role = decodedToken.role;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' + error });
  }
}

module.exports = verifyToken;
