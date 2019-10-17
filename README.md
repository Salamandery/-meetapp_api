## MEETAPP API

### Funcionalidades
- Rotas
- Sequelize
- redis
- mailer com nodemailer
- auth JWT
- date format com date-fns
- file controller com multer

### Guia
- Execute nodemon queue na pasta raiz para iniciar a fila de processos;
- Execute nodemon server na pasta raiz para iniciar o servidor;
- o Arquivo .env estarão as configurações principais do funcioanemto geral do servidor;
- Seeds: para gerar as seeds, primeiro faça na seed de arquivos (files), em seguida as de usuários (users) para depois a seed de eventos (events);
- senha do usuario seed 123456;
- Obs: Não esquecer de configurar o servidor de e-mail, ip do servidor, porta do servidor e outras configurações importantes encontradas no .env. Ou não será possivel carregas as imagens no mobile;

### Variáveis
```
SERVERIP = IP do servidor *Importante para configuração do caminho das imagens do multer no modelo File*
FILEPATH = Caminho da url enviada para o usuário na requisição do arquivo
PORTA = Porta do servidor

DIALECT = Configuração dialect do sequelize
HOST = Configuração HOST do sequelize
DBUSER = Configuração do usuário do sequelize
DBPASS = Configuração da senha do sequelize
DBSCHEMA = Configuração do schema do sequelize

SECRET = Segredo da autenticação JWT
EXPIRESIN = Prazo da autenticação JWT

MAILHOST = HOST do servidor de e-mail
MAILPORT = Porta do servidor de e-mail
MAILUSER = Usuário do servidor de e-mail
MAILPASS = Senha do servidor de e-mail
MAILFROM = E-mail padrão que irá enviar os e-mails

REDISHOST = IP do servidor redis
REDISPORT = Porta do servidor redis
```

### Estrutura do bando de dados
```
Files {
    id = chave primária,
    name, path, created_at, updated_at
}
Users {
    id = Chave primária,
    name, email, password_hash, created_at, updated_at
}
Events {
    id = Chave primária,
    user_id = Chave estrangeira da tabela users,
    banner_id = Chave estrangeira da tabela files
    name, description, location, date, created_at, updated_at
}
user_events {
    id = Chave primária,
    user_id = Chave estrangeira da tabela users,
    banner_id = Chave estrangeira da tabela files,
    created_at, updated_at
} // Obs: Tabela de relacionamento do usuário e evento, para registrar as inscrições.
```

### Rotas
```
// Definição de sessão
'/sessions'
// Cadastro de usuários
'/users'
// Necessário autenticar antes de navegar abaixo
// Listagem de usuários
'/users'
// Listagem de eventos
'/events'
// Listagem de eventos por data
'/schedules'
// Lista de inscrição
'/subscribe/'
// Cadastro e upload de imagem
'/files'
// Cadastro de eventos
'/events'
// Cadastro de inscrição
'/subscribe/:id'
// Atualização do cadastro do usuário
'/users'
// Atualização do cadastro de eventos
'/events'
// Deletando o cadastro de eventos
'/events/:id'
// Deletando a inscrição
'/subscribe/:id'
```

Rodolfo M. F. Abreu
