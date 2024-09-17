import express from 'express';
import router from './src/routes/rolRouter.js'; // ES module import
import usuario from './src/routes/usuarioRouter.js'; // ES module import

const app = express();

app.use(express.json());
app.use(router);
app.use(usuario);

app.listen(3000, () => {
    console.log(`Servidor de la API escuchando en http://localhost:3000`);
});
