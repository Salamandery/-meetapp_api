import app from './src';

// Inicializando servidor
app.listen(process.env.PORTA, () => {
    console.log('Rodando... :)');
});
