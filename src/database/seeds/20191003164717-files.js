module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            'files',
            [
                {
                    name: 'TESTE',
                    path: 'f38b4e2a8b7f19244c458d5f1ac34472.jpg',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: 'TESTE',
                    path: '75c5602fff40a5d6b30a89895de120e2.jpg',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: 'TESTE',
                    path: 'f92709ea2f41cbab14f32bf33b21c4ea.jpg',
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
