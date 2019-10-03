module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            'users',
            [
                {
                    name: 'Diego Fernandes',
                    description: 'DESCRICAO DO EVENTO',
                    date: '2019-10-10T09:00:00-03:00',
                    provider_id: 2,
                },
            ],
            [
                {
                    name: 'RODOLFO M F ABREU',
                    description: 'DESCRICAO DO EVENTO',
                    date: '2019-10-10T09:00:00-03:00',
                    provider_id: 2,
                },
            ],
            {}
        );
    },

    down: queryInterface => {
        return queryInterface.bulkDelete('People', null, {});
    },
};
