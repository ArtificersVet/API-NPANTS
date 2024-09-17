import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Ajusta la ruta si es necesario
import Rol from './rol.js'; // Ajusta la ruta si es necesario

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  rol_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Rol,
      key: 'id'
    },
    allowNull: true // Puedes poner `false` si siempre debe haber un rol asignado
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

// Define la asociación entre Usuario y Rol
Usuario.belongsTo(Rol, { foreignKey: 'rol_id', as: 'rol' });
Rol.hasMany(Usuario, { foreignKey: 'rol_id', as: 'usuarios' });

export default Usuario;
