// Carregando variaveis de ambiente
require('dotenv').config();

// Configuração para conectar ao db
module.exports = {
    dialect: process.env.DIALECT,
    host: process.env.HOST,
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBSCHEMA,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
