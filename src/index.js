import express from 'express';
import env from 'dotenv';
// modulo de rotas
import routes from './routes';

// Classe do servidor onde ocorre toda a configuração de middlewares e rotas
class App {
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        // Requisições do tipo json
        this.server.use(express.json());
        // Variaveis de ambiente
        env.config();
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;