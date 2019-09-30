import { Router } from 'express';
// Iniciando rotas
const routes = new Router();

// Rota inicial
routes.get('/', (req, res) => {
    res.json({msg: "Hello"});
});


module.exports = routes;