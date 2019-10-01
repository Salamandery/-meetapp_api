import { Router } from 'express';

// Controllers
// User
import UserController from './app/controllers/UserController';

// Iniciando rotas
const routes = new Router();

// Rotas
// Cadastro de usuários
routes.post('/users', UserController.store);

module.exports = routes;
