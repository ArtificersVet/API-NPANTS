import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Talla from '../models/talla.js';

const EstiloTalla = sequelize.define('EstiloTalla', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  consumoTela: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  estilo_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  talla_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  }
}, {
  tableName: 'EstiloTalla',
  timestamps: false
});

// Relación: EstiloTalla pertenece a Talla
EstiloTalla.belongsTo(Talla, { foreignKey: 'talla_id', as: 'talla' });

export default EstiloTalla;