module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            'users',
            [
                {
                    id: 1,
                    name: 'Diego Fernandes',
                    password_hash: '123456',
                    email: 'Diego@rocketseat.com.br',
                    provider: true,
                    avatar_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 2,
                    name: 'Filipe D Telo',
                    password_hash: '123456',
                    email: 'Filipe@filipetelo.com.br',
                    provider: true,
                    avatar_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 3,
                    name: 'Rodolfo M F Abreu',
                    password_hash: '123456',
                    email: 'Rodolfo@atomiccodes.com.br',
                    provider: false,
                    avatar_id: 1,
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
