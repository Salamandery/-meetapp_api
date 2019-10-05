// Variaveis do ambiente
require('dotenv').config();

export default {
    host: process.env.REDISHOST,
    port: process.env.REDISPORT,
};
