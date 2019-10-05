import { Router } from 'express';
import multer from 'multer';
// Configuração do multer
import conf from './config/multer';
// Middleware authentication
import auth from './app/middlewares/auth';
// Controllers
// User
import UserController from './app/controllers/UserController';
// Session
import SessionController from './app/controllers/SessionController';
// File
import FileController from './app/controllers/FileController';
// Events
import EventsController from './app/controllers/EventController';
// Provedores
import ProviderController from './app/controllers/ProviderController';
// Agendamento
import ScheduleController from './app/controllers/ScheduleController';
// Agendamento
import NotificationController from './app/controllers/NotificationController';

// Iniciando rotas
const routes = new Router();
// Iniciando gerenciador de arquivo
const upload = multer(conf);
// Rotas
// Definição de sessão
routes.post('/sessions', SessionController.store);
// Necessário autenticar antes de navegar abaixo
routes.use(auth);
// Listagem de usuários
routes.get('/users', UserController.index);
// Listagem de Provedores de serviço
routes.get('/providers', ProviderController.index);
// Listagem de eventos
routes.get('/events', EventsController.index);
// Listagem de eventos
routes.get('/schedules', ScheduleController.index);
// Listagem de notificações
routes.get('/notifications', NotificationController.index);
// Cadastro de usuários
routes.post('/users', UserController.store);
// Cadastro e upload de imagem
routes.post('/files', upload.single('file'), FileController.store);
// Cadastro de eventos
routes.post('/events', EventsController.store);
// Atualização do cadastro do usuário
routes.put('/users', UserController.update);
// Atualização do cadastro de eventos
routes.put('/events', EventsController.update);
// Atualização do cadastro de eventos
routes.put('/notifications/:id', NotificationController.update);
// Deletando o cadastro de eventos
routes.delete('/events/:id', EventsController.delete);

module.exports = routes;
