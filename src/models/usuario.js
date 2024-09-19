// Importa DataTypes desde Sequelize para definir los tipos de datos del modelo
import { DataTypes } from 'sequelize';
// Importa la instancia de Sequelize configurada para la conexión con la base de datos
import sequelize from '../config/database.js'; // Ajusta la ruta si es necesario
// Importa el modelo Rol que se usará para establecer relaciones
import Rol from './rol.js'; // Ajusta la ruta si es necesario
// Importa bcrypt para la encriptación de contraseñas (comentado por ahora)
// import bcrypt from 'bcrypt';
import bcrypt from 'bcrypt';

// Define el modelo 'Usuario' utilizando Sequelize
const Usuario = sequelize.define('Usuario', {
  // Define el campo 'id' como clave primaria e incrementable automáticamente
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Define el campo 'rol_id' como clave foránea que referencia el modelo 'Rol'
  rol_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Rol, // Modelo al que se refiere la clave foránea
      key: 'id'   // Campo en el modelo 'Rol' que se usa como referencia
    },
    allowNull: true // Permite que este campo sea nulo; se puede ajustar según los requisitos
  },
  // Define el campo 'nombre' como una cadena de texto que no puede ser nula
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Define el campo 'email' como una cadena de texto única que no puede ser nula
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Asegura que no haya dos usuarios con el mismo email
  },
  // Define el campo 'password' como una cadena de texto que no puede ser nula
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Configura el nombre de la tabla en la base de datos
  tableName: 'usuarios',
  // Desactiva los campos automáticos de fecha de creación y actualización
  timestamps: false,
  // Define los hooks para la encriptación de contraseñas
  //   // Hook que se ejecuta antes de crear un nuevo usuario
 hooks: {
   beforeCreate: async (usuario) => {
     // Genera un salt para la encriptación
     const salt = await bcrypt.genSalt(10);
     // Encripta la contraseña del usuario
     usuario.password = await bcrypt.hash(usuario.password, salt);
   },
  //   // Hook que se ejecuta antes de actualizar un usuario
   beforeUpdate: async (usuario) => {
  //     // Verifica si el campo 'password' ha cambiado
      if (usuario.changed('password')) {
  //       // Genera un salt para la encriptación
        const salt = await bcrypt.genSalt(10);
  //       // Encripta la nueva contraseña del usuario
        usuario.password = await bcrypt.hash(usuario.password, salt);
      }
    }
 }
});

// Define la relación de pertenencia entre 'Usuario' y 'Rol'
// Un usuario pertenece a un rol
Usuario.belongsTo(Rol, { foreignKey: 'rol_id', as: 'rol' });

// Define la relación inversa: un rol puede tener muchos usuarios
Rol.hasMany(Usuario, { foreignKey: 'rol_id', as: 'usuarios' });

// Exporta el modelo 'Usuario' para su uso en otras partes de la aplicación
export default Usuario;
