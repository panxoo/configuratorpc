function requireRole(roles) {
  return (req, res, next) => {
    if (req.user && roles.includes(req.role)) {
      next();
    } else {
      res.status(403).json({ error: 'Access denied: Insufficient role' });
    }
  };
}
module.exports = requireRole;
