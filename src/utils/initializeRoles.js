// src/utils/initializeRoles.js
import Rol from '../models/rol.js';

const initializeRoles = async () => {
    try {
        // Verificar si ya existen roles
        const roles = await Rol.findAll();
        if (roles.length === 0) {
            // Crear rol predeterminado
            await Rol.create({
                nombre: 'Administrador',
                descripcion: 'Rol con permisos completos'
            });
            console.log('Rol predeterminado creado.');
        } else {
            console.log('Roles ya existen en la base de datos.');
        }
    } catch (error) {
        console.error('Error al inicializar roles:', error);
    }
};

export default initializeRoles;
