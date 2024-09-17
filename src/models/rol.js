import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjust the path if necessary

const Rol = sequelize.define('Rol', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'roles',
  timestamps: false
});

export default Rol;
