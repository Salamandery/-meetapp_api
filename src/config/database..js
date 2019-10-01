module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: process.env.DBPASS,
    database: 'meetup',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    }
}
