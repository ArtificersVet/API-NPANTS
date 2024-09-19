import Usuario from '../models/usuario.js';
import Rol from '../models/rol.js'; // Asegúrate de tener un rol con ID 1 en tu base de datos

const initializeDefaultUser = async () => {
  try {
    const rolId = 1; // ID del rol que quieres asociar al usuario por defecto

    // Verifica si el rol con el ID específico existe  
    const rol = await Rol.findByPk(rolId);

    if (!rol) {
      console.error('No se encontró el rol con el ID:', rolId);
      return;
    }

    // Verifica si el usuario por defecto ya existe
    const existingUser = await Usuario.findOne({ where: { email: 'admin@example.com' } });

    if (!existingUser) {
      // Crea el usuario por defecto con la contraseña en texto plano
      await Usuario.create({
        nombre: 'Administrador',
        email: 'admin@example.com',
        password: 'admin123', // La contraseña será encriptada por el hook
        rol_id: rol.id
      });
      console.log('Usuario por defecto creado con éxito.');
    } else {
      console.log('El usuario por defecto ya existe.');
    }
  } catch (error) {
    console.error('Error al crear el usuario por defecto:', error);
  }
};

export default initializeDefaultUser;
