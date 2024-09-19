import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import TipoCliente from './tipoCliente.js';

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipocliente_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'TipoCliente',
      key: 'id'
    }
  }
}, {
  tableName: 'cliente',
  timestamps: false
});

// Establece la relación
Cliente.belongsTo(TipoCliente, { foreignKey: 'tipocliente_id', as: 'tipo_cliente' });
TipoCliente.hasMany(Cliente, { foreignKey: 'tipocliente_id', as: 'cliente' });

export default Cliente;