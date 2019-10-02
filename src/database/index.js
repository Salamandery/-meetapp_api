import Sequelize from 'sequelize';

// Models
// Usuários
import User from '../app/models/Users';
// Arquivos
import Files from '../app/models/Files';
// Eventos
import Events from '../app/models/Events';

// Configurações do db
import conf from '../config/database';

// Lista de models
const models = [User, Files, Events];

class Database {
    constructor() {
        // Inicializando
        this.init();
    }

    init() {
        // Criando conexão
        this.connection = new Sequelize(conf);
        // Passando conexão para os models
        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
