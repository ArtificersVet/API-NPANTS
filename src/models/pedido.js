import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Cliente from './cliente.js'; // Asegúrate de que la ruta sea correcta
import EstadoPedido from './estadopedido.js'; // Asegúrate de que la ruta sea correcta

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fecha_pedido: {
    type: DataTypes.DATE,
    allowNull: false
  },
  saldo: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  tipo_pago: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  cliente_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Cliente',
      key: 'id'
    }
  },
  estado_pedido_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'EstadoPedido',
      key: 'id'
    }
  }
}, {
  tableName: 'pedido',
  timestamps: false
});

// Establece las relaciones
Pedido.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });
Cliente.hasMany(Pedido, { foreignKey: 'cliente_id', as: 'pedidos' });

Pedido.belongsTo(EstadoPedido, { foreignKey: 'estado_pedido_id', as: 'estado_pedido' });
EstadoPedido.hasMany(Pedido, { foreignKey: 'estado_pedido_id', as: 'pedidos' });

export default Pedido;
