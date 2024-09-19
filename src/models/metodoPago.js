// Importa DataTypes desde Sequelize para definir los tipos de datos del modelo
import { DataTypes } from 'sequelize';
// Importa la instancia de Sequelize configurada para la conexión con la base de datos
import sequelize from '../config/database.js'; // Ajusta la ruta si es necesario

// Define el modelo 'MetodoPago' utilizando Sequelize
const MetodoPago = sequelize.define('MetodoPago', {
  // Define el campo 'id' como clave primaria e incrementable automáticamente
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Define el campo 'nombre' como una cadena de texto que no puede ser nula
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Configura el nombre de la tabla en la base de datos
  tableName: 'metodo_pago',
  // Desactiva los campos automáticos de fecha de creación y actualización
  timestamps: false,
});

// Exporta el modelo 'MetodoPago' para su uso en otras partes de la aplicación
export default MetodoPago;
