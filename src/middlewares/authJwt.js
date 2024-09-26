import jwt from 'jsonwebtoken';

// Middleware para verificar token JWT
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extrae el token del formato 'Bearer <token>'

    if (!token) return res.status(403).send({ message: 'Token no proporcionado.' });

    try {
        // Verificar el token JWT
        const decoded = jwt.verify(token, 'tu_secreto'); // Reemplaza 'tu_secreto' por tu clave secreta segura
        req.userId = decoded.id;

        // Si todo es correcto, continuar
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Token no válido.' });
    }
};