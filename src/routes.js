import { Router } from 'express';

// Controllers
// User
import UserController from './app/controllers/UserController';
// Session
import SessionController from './app/controllers/SessionController';

// Iniciando rotas
const routes = new Router();

// Rotas
// Cadastro de usuários
routes.post('/users', UserController.store);
// Definição de sessão
routes.post('/sessions', SessionController.store);

module.exports = routes;
