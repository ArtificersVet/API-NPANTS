import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  
import PedidoId from './pedido.js';
import TallaId from './talla.js';
import PrendaVestirId from './prendaVestir.js';
const DetalleProducto = sequelize.define('DetalleProducto', {
    Id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    PedidoId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    PrendaVestirId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    TallaId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    Precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    TotalPieza: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    ConsumoTela: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    SubTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    }
}, {
    tableName: 'DetalleProducto',
    timestamps: false  
});

DetalleProducto.belongsTo(PedidoId, { foreignKey: 'PedidoId', as: 'pedido' });
PedidoId.hasMany(DetalleProducto, { foreignKey: 'PedidoId', as: 'detalles' });

 DetalleProducto.belongsTo(PrendaVestirId, { foreignKey: 'PrendaVestirId', as: 'prendaVestir' });
PrendaVestirId.hasMany(DetalleProducto, { foreignKey: 'PrendaVestirId', as: 'detalles' });

 DetalleProducto.belongsTo(TallaId, { foreignKey: 'TallaId', as: 'talla' });
TallaId.hasMany(DetalleProducto, { foreignKey: 'TallaId', as: 'detalles' });

export default DetalleProducto;
