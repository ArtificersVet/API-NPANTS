// src/models/paypalPayment.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Pedido from './pedido.js';

const PaypalPayment = sequelize.define('PaypalPayment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    paypal_order_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    transaction_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        defaultValue: 'USD',
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('CREATED', 'COMPLETED', 'FAILED'),
        defaultValue: 'CREATED'
    },
    pedido_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Pedido,  // Referencia a la tabla 'pedido'
            key: 'id'
        },
        allowNull: true
    },
    payer_email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    payment_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    additional_data: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    tableName: 'paypal_payments',
    timestamps: true
});

// Definir la relación con Pedido
PaypalPayment.belongsTo(Pedido, { foreignKey: 'pedido_id', as: 'pedido' });
Pedido.hasOne(PaypalPayment, { foreignKey: 'pedido_id', as: 'paypal_payment' });

export default PaypalPayment;
