import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjust the path if necessary

const TipoPrendaVestir = sequelize.define('TipoPrendaVestir', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
   
  }, {
    tableName: 'tipo_prenda_vestir',
    timestamps: false
  });
  
  export default TipoPrendaVestir;