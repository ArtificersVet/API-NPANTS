import express from 'express';
import router from './routes/rolRouter.js'; // adjust the path if necessary
import usuario from './routes/usuarioRouter.js'; // adjust the path if necessary

const app = express();

app.use(express.json());
app.use(router);
app.use(usuario);

app.listen(3000, () => {
    console.log(`Servidor de la API escuchando en http://localhost:3000`);
});
