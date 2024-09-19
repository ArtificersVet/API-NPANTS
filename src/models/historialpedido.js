// Importa DataTypes desde Sequelize para definir los tipos de datos del modelo
import { DataTypes } from 'sequelize';
// Importa la instancia de Sequelize configurada para la conexión con la base de datos
import sequelize from '../config/database.js'; // Ajusta la ruta si es necesario
 //Importa los modelos que se usarán para establecer relaciones
//// Ajusta la ruta si es necesario
import Usuario from './usuario.js'; // Ajusta la ruta si es necesario
import EstadoPedido from './estadopedido.js'; // Ajusta la ruta si es necesario

// Define el modelo 'HistorialPedido' utilizando Sequelize
const HistorialPedido = sequelize.define('HistorialPedido', {
  // Define el campo 'id' como clave primaria e incrementable automáticamente
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Define el campo 'comentario' como una cadena de texto que no puede ser nula
  comentario: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  // Define el campo 'fecha' como una fecha que no puede ser nula
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  // Define el campo 'estado_pedido_id' como clave foránea que referencia el modelo 'EstadoPedido'
  estado_pedido_id: {
    type: DataTypes.INTEGER,
    references: {
      model: EstadoPedido, // Modelo al que se refiere la clave foránea
      key: 'id'            // Campo en el modelo 'EstadoPedido' que se usa como referencia
    },
    allowNull: false // Este campo no puede ser nulo
  },
  // Define el campo 'pedido_id' como clave foránea que referencia el modelo 'Pedido'
  /*pedido_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Pedido, // Modelo al que se refiere la clave foránea
      key: 'id'      // Campo en el modelo 'Pedido' que se usa como referencia
    },
    allowNull: false // Este campo no puede ser nulo
  },*/
  // Define el campo 'usuario_id' como clave foránea que referencia el modelo 'Usuario'
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario, // Modelo al que se refiere la clave foránea
      key: 'id'       // Campo en el modelo 'Usuario' que se usa como referencia
    },
    allowNull: false // Este campo no puede ser nulo
  }
}, {
  // Configura el nombre de la tabla en la base de datos
  tableName: 'historial_pedido',
  // Desactiva los campos automáticos de fecha de creación y actualización
  timestamps: false,
});

// Define las relaciones de pertenencia
//HistorialPedido.belongsTo(Pedido, { foreignKey: 'pedido_id', as: 'pedido' });
HistorialPedido.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
HistorialPedido.belongsTo(EstadoPedido, { foreignKey: 'estado_pedido_id', as: 'estadoPedido' });

// Exporta el modelo 'HistorialPedido' para su uso en otras partes de la aplicación
export default HistorialPedido;
