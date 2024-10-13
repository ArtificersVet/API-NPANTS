import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 
import Talla from './talla.js'; 
import Estilo from './estilo.js';

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
  talla_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Talla, // Referencia al modelo Talla
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  estilo_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Estilo, // Referencia al modelo Estilo
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'estilotalla',
  timestamps: false
});

// Definir las asociaciones
Talla.hasMany(EstiloTalla, { foreignKey: 'talla_id', onDelete: 'CASCADE' });
EstiloTalla.belongsTo(Talla, { foreignKey: 'talla_id' });

Estilo.hasMany(EstiloTalla, { foreignKey: 'estilo_id', onDelete: 'CASCADE' });
EstiloTalla.belongsTo(Estilo, { foreignKey: 'estilo_id' });

export default EstiloTalla;
