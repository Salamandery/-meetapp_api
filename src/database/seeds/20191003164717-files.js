module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            'files',
            [
                {
                    id: 1,
                    name: 'TESTE',
                    path: 'f38b4e2a8b7f19244c458d5f1ac34472.PNG',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 2,
                    name: 'TESTE',
                    path: '75c5602fff40a5d6b30a89895de120e2.png',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: queryInterface => {
        return queryInterface.bulkDelete('files', null, {});
    },
};
