const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { findByEmail, save } = require('../users/userModel');
const { USER_ROLES } = require('../users/userRolesEnum');

exports.register = async (req, res) => {
  try {
    const { name, email, password, user_roles_id } = req.body;
    console.log({ body: { name, email, password, user_roles_id } });

    // Verificar el rol del usuario
    const isUserRoleValid = user_roles_id === USER_ROLES.INSTRUCTOR || user_roles_id === USER_ROLES.STUDENT
    if (!isUserRoleValid) {
      return res.status(400).json({ message: `Rol de usuario inválido. Rol de estudiantes: ${USER_ROLES.STUDENT}. Rol de instructores: ${USER_ROLES.INSTRUCTOR}` });
    }

    // Verificar si el usuario ya existe
    let user = await findByEmail(email);
    if (user) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10); // Genera un salt de
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    user = await save({ name, email, password: hashedPassword, userRolesId: user_roles_id });

    if (!user) {
      return res.status(404).json({ message: 'Error al crear el usuario' });
    }

    res.status(201).json({ message: 'Usuario creado exitosamente', user });
  } catch (err) {
    console.error('Error en register:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await findByEmail(email);
    console.log(email, user);
    if (!user) {
      console.log("Usuario no existe");
      return res.status(400).json({ message: 'Ese Usuario no existe' });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

exports.verifyToken = (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado', valid: false });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true });
  } catch (err) {
    // Check is instance of TokenExpiredError
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado', valid: false });
    }
    // Check if instance of JsonWebTokenError
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido', valid: false });
    }

    // Check if instance of Error
    if (err instanceof Error) {
      return res.status(500).json({ message: 'Error en el servidor', valid: false });
    }
  }
};