// Configuração para conectar ao db
module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '1234',
    database: 'meetup',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
