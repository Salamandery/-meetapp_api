module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            'users',
            [
                {
                    id: 1,
                    name: 'Diego Fernandes',
                    password_hash:
                        '$2a$08$PEF3Eubm1dqJaid2VhAoOez/2gUO3FRrVdryiCQfUAS7ZSvYUNWyq',
                    email: 'Diego@rocketseat.com.br',
                    provider: true,
                    avatar_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                /* {
                    id: 2,
                    name: 'Filipe D Telo',
                    password_hash:
                        '$2a$08$PEF3Eubm1dqJaid2VhAoOez/2gUO3FRrVdryiCQfUAS7ZSvYUNWyq',
                    email: 'Filipe@filipetelo.com.br',
                    provider: true,
                    avatar_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 3,
                    name: 'Rodolfo M F Abreu',
                    password_hash:
                        '$2a$08$PEF3Eubm1dqJaid2VhAoOez/2gUO3FRrVdryiCQfUAS7ZSvYUNWyq',
                    email: 'Rodolfo@atomiccodes.com.br',
                    provider: false,
                    avatar_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                }, */
            ],
            {}
        );
    },

    down: queryInterface => {
        return queryInterface.bulkDelete('users', null, {});
    },
};
