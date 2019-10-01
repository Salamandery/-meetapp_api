import Sequelize from 'sequelize';

// Models
import User from '../app/models/Users';

// Configurações do db
import conf from '../config/database';

// Lista de models
const models = [User];

class Database {
    constructor() {
        // Inicializando
        this.init();
    }

    init() {
        // Criando conexão
        this.connection = new Sequelize(conf);
        // Passando conexão para os models
        models.map(model => model.init(this.connection));
    }
}

export default new Database();
