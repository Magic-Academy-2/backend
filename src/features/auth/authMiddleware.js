const jwt = require('jsonwebtoken');
const { findById } = require('../users/userModel');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findById(decoded.id);
    req.user = user;
    next();
  } catch (err) {
    console.error('Error en authMiddleware:', err);
    res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;