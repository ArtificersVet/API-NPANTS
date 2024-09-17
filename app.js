import express from 'express';
import router from './src/routes/rolRouter.js'; // Asegúrate de que la ruta es correcta
import usuario from './src/routes/usuarioRouter.js'; // Asegúrate de que la ruta es correcta
import sequelize from './src/config/database.js'; // Asegúrate de que la ruta es correcta
import initializeRoles from './src/utils/initializeRoles.js'; // Asegúrate de que la ruta es correcta
import initializeDefaultUser from './src/utils/initializeDefaultUser.js'; // Importar el script

const app = express();

app.use(express.json());
app.use(router);
app.use(usuario);

// Inicializar roles y usuario por defecto al iniciar el servidor
const initializeApp = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con éxito.');
    await initializeRoles(); // Inicializar roles
    await initializeDefaultUser(); // Crear usuario por defecto
    app.listen(3000, () => {
      console.log('Servidor de la API escuchando en http://localhost:3000');
    });
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error);
  }
};

initializeApp();
