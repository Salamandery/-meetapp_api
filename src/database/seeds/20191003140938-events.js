module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            'events',
            [
                {
                    id: 1,
                    name: 'Encontro dos programadores metaleiros',
                    description: 'DESCRICAO DO EVENTO',
                    location: 'LOCALIZACAO DO EVENTO',
                    date: '2019-10-10T09:00:00-03:00',
                    user_id: 1,
                    banner_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 2,
                    name: 'Encontro dos programadores pagodeiros',
                    description: 'DESCRICAO DO EVENTO',
                    location: 'LOCALIZACAO DO EVENTO',
                    date: '2019-10-10T09:00:00-03:00',
                    user_id: 1,
                    banner_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 3,
                    name: 'Encontro com Filipe Deschamps Teló',
                    description: 'DESCRICAO DO EVENTO',
                    location: 'LOCALIZACAO DO EVENTO',
                    date: '2019-10-10T09:00:00-03:00',
                    user_id: 1,
                    banner_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: queryInterface => {
        return queryInterface.bulkDelete('events', null, {});
    },
};
