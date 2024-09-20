
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Tela from './tela.js';
import Estilo from './estilo.js'; 
import TipoPrendaVestir from './tipoPrendaVestir.js';

const PrendaVestir = sequelize.define('PrendaVestir', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tela_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Tela',
      key: 'id'
    }
  },
  estilo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Estilo',
      key: 'id'
    }
  },
  tipoprendavestir_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'TipoPrendaVestir',
      key: 'id'
    }
  }
}, {
  tableName: 'prenda_vestir',
  timestamps: false
});

// Definir las relaciones
PrendaVestir.belongsTo(Tela, { foreignKey: 'tela_id', as: 'tela' });
PrendaVestir.belongsTo(Estilo, { foreignKey: 'estilo_id', as: 'estilo' });
PrendaVestir.belongsTo(TipoPrendaVestir, { foreignKey: 'tipoprendavestir_id', as: 'tipoPrendaVestir' });

export default PrendaVestir;
