import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjust the path if necessary
import Metodopagoid from './metodoPago.js';
import Pedidoid from './pedido.js';

const Pago = sequelize.define('Pago', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fecha_pago: {
    type: DataTypes.DATE,
    allowNull: false
  },
  monto: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  metodo_pago_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Metodopagoid,  
      key: 'id'    
    },
    allowNull: true  
  },
  pedido_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Pedidoid, // Modelo al que se refiere la clave foránea
      key: 'id'   // Campo en el modelo 'Rol' que se usa como referencia
    },
    allowNull: true // Permite que este campo sea nulo; se puede ajustar según los requisitos
  },
}, {
  tableName: 'pago',
  timestamps: false
});

Pago.belongsTo(Metodopagoid, { foreignKey: 'metodo_pago_id', as: 'metodo_de_pago' });
Metodopagoid.hasMany(Pago, { foreignKey: 'metodo_pago_id', as: 'pago' });

Pago.belongsTo(Pedidoid, { foreignKey: 'pedido_id', as: 'pedido' });
Pedidoid.hasMany(Pago, { foreignKey: 'pedido_id', as: 'pago' });

export default Pago;
