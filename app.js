import dotenv from 'dotenv';
import express from 'express';
import router from './src/routes/rolRouter.js'; // Asegúrate de que la ruta es correcta
import usuario from './src/routes/usuarioRouter.js'; // Asegúrate de que la ruta es correcta
import sequelize from './src/config/database.js'; // Asegúrate de que la ruta es correcta
import initializeRoles from './src/utils/initializeRoles.js'; // Asegúrate de que la ruta es correcta
import initializeDefaultUser from './src/utils/initializeDefaultUser.js'; // Importar el script
import { login } from './src/controllers/authController.js';
import tipocliente from './src/routes/tipoClienteRouter.js';
import tipoprendavestir from './src/routes/tipoPrendaVestirRouter.js';
import prendavestir from './src/routes/prendaVestirRouter.js';
import cliente from './src/routes/clienteRouter.js';
import estadoPedido from './src/routes/estadospedidoRouter.js';
import talla from './src/routes/tallaRouter.js';
import tela from './src/routes/telaRoutes.js';
import metodopago from './src/routes/metodoPagoRoutes.js';
import hitopedido from './src/routes/historialpedidoRouter.js'
import pedido from './src/routes/pedidoRouter.js'
import estilo from './src/routes/estiloRouter.js';
import pago from './src/routes/pagoRouter.js';
import detalleproducto from './src/routes/detalleproductoRouter.js';
import { obtenerRespuestaDeOpenAI } from './src/services/openaiService.js'; // Importar el servicio de OpenAI

dotenv.config();
const app = express();

app.use(express.json());
app.use(router);
app.use(usuario);
app.use(tipocliente);
app.use(estadoPedido);
app.use(tipoprendavestir);
app.use(prendavestir);
app.use(cliente);
app.use(talla);
app.use(tela);
app.use(metodopago);
app.use(hitopedido);
app.use(pedido);
app.use(estilo);
app.use(pago);
app.use(detalleproducto);
router.post('/login', login);

// Ruta para interactuar con la API de OpenAI, usando el servicio importado
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message; // Mensaje recibido desde el frontend

    try {
        const respuesta = await obtenerRespuestaDeOpenAI(userMessage); // Llamada al servicio
        res.json({ response: respuesta });
    } catch (error) {
        console.error('Error en la llamada a OpenAI:', error);
        res.status(500).json({ error: 'Hubo un error al obtener la respuesta de la API.' });
    }
});

// Inicializar roles y usuario por defecto al iniciar el servidor
const initializeApp = async() => {
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