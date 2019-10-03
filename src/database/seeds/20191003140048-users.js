module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            'users',
            [
                {
                    name: 'Diego Fernandes',
                    password: '123456',
                    email: 'diego@rocketseat.com.br',
                    provider: true,
                },
            ],
            [
                {
                    name: 'RODOLFO M F ABREU',
                    password: '1234567',
                    email: 'rodolfo@atomiccodes.com',
                    provider: 'false',
                },
            ],
            {}
        );
    },

    down: queryInterface => {
        return queryInterface.bulkDelete('users', null, {});
    },
};
