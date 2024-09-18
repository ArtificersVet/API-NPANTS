import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjust the path if necessary

const TipoCliente = sequelize.define('TipoCliente', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'tipo_cliente',
    timestamps: false
  });
  
  export default TipoCliente;