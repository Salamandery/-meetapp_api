import Sequelize, { Model } from 'sequelize';

// Variaveis de ambiente
require('dotenv').config();

class Files extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                path: Sequelize.STRING,
                url: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `${process.env.SERVERIP}:${process.env.PORTA}${process.env.FILEPATH}${this.path}`;
                    },
                },
            },
            {
                sequelize,
            }
        );

        return this;
    }
}

export default Files;
