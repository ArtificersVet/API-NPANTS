import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Ajusta la ruta si es necesario

const EstadoPedido = sequelize.define('EstadoPedido', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'estado_pedido',
    timestamps: false
});

export default EstadoPedido;