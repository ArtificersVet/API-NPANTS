import express from 'express';
import router from './routes/rolRouter.js'; // adjust the path if necessary

const app = express();

app.use(express.json());
app.use(router);

app.listen(3000, () => {
    console.log(`Servidor de la API escuchando en http://localhost:3000`);
});
