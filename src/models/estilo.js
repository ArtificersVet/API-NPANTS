import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  

const Estilo = sequelize.define('Estilo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'estilo',
  timestamps: false
});

export default Estilo;