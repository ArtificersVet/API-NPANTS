import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({
      where: { email }
    });

    if (!usuario) {
      return res.status(404).send({ message: 'Usuario no encontrado.' });
    }

    // Verifica la contraseña
    const passwordIsValid = await bcrypt.compare(password, usuario.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Contraseña incorrecta.' });
    }

    // Genera el token JWT sin el rol
    const token = jwt.sign({ id: usuario.id }, 'tu_secreto', {
      expiresIn: 86400 // 24 horas
    });

    return res.status(200).send({
      id: usuario.id,
      email: usuario.email,
      accessToken: token
    });

  } catch (error) {
    console.error('Error en el servidor:', error);
    return res.status(500).send({ message: 'Error en el servidor' });
  }
};
