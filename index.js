import app from './app.js';

app.listen(app.get('port'))
console.log(`Iniciando aplicación en el puerto ${app.get('port')}`);

