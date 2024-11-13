import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Talla = sequelize.define('Talla', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'talla',
  timestamps: false
});

export default Talla;