// Carregando variaveis de ambiente
require('dotenv').config();
// Configuração de duração do token e palavra secreta para criptografia
export default {
    secret: process.env.SECRET,
    expiresIn: process.env.EXPIRESIN,
};
