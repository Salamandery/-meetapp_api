module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            'files',
            [
                {
                    id: 1,
                    name: 'TESTE',
                    path: '18b4e440fc034a61b8d360a40a002110.jpg',
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
