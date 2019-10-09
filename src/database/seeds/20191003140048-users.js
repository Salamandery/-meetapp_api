module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            'users',
            [
                {
                    name: 'Diego Fernandes',
                    password_hash:
                        '$2a$08$PEF3Eubm1dqJaid2VhAoOez/2gUO3FRrVdryiCQfUAS7ZSvYUNWyq',
                    email: 'Diego@rocketseat.com.br',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: 'Filipe D Telo',
                    password_hash:
                        '$2a$08$PEF3Eubm1dqJaid2VhAoOez/2gUO3FRrVdryiCQfUAS7ZSvYUNWyq',
                    email: 'Filipe@filipetelo.com.br',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: 'Rodolfo M F Abreu',
                    password_hash:
                        '$2a$08$PEF3Eubm1dqJaid2VhAoOez/2gUO3FRrVdryiCQfUAS7ZSvYUNWyq',
                    email: 'Rodolfo@atomiccodes.com.br',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: queryInterface => {
        return queryInterface.bulkDelete('users', null, {});
    },
};
