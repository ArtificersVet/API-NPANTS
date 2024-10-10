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
  tallaId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Talla, // Referencia al modelo Talla
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  estiloId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Estilo, // Referencia al modelo Estilo
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'estilo_talla',
  timestamps: false
});

// Definir las asociaciones
Talla.hasMany(EstiloTalla, { foreignKey: 'tallaId', onDelete: 'CASCADE' });
EstiloTalla.belongsTo(Talla, { foreignKey: 'tallaId' });

Estilo.hasMany(EstiloTalla, { foreignKey: 'estiloId', onDelete: 'CASCADE' });
EstiloTalla.belongsTo(Estilo, { foreignKey: 'estiloId' });

export default EstiloTalla;
