import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import EstiloTalla from '../models/estilotalla.js';

const Estilo = sequelize.define('Estilo', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'estilo',
  timestamps: false
});

// Relación: Estilo tiene muchos EstiloTalla
Estilo.hasMany(EstiloTalla, { foreignKey: 'estilo_id', as: 'tallas' });

export default Estilo;