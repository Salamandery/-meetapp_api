// Variaveis de ambiente
require('dotenv').config();

export default {
    host: process.env.MAILHOST,
    port: process.env.MAILPORT,
    secure: false,
    auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS,
    },
    default: {
        from: process.env.MAILFROM,
    },
};
