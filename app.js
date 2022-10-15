import express from "express"
import config from './config.js'
import routes from './routes/routes.js'

const app = express();

//Settings / Configurando la app
app.set('port', config.port) //que la app de express este escuchando la variable puerto.

//Ejecutando Middlewares
app.use(express.json())

//Ejecutando el Middleware Enrutador
app.use(routes)

export default app;