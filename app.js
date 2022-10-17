import express from "express"
import cors from "cors"
import config from './config.js'
import routes from './routes/routes.js'


const app = express();

//cors
app.use(cors())

//Settings / Configurando la app
app.set('port', config.port) //que la app de express este escuchando la variable puerto.

//Ejecutando Middlewares
//app.use(express.json()) lo que hara sera tomar todas las peticiones que vienen en formato json, 
//las va a transformar en un formato js y las va a asignar a la propiedad de body
app.use(express.json())

//Ejecutando el Middleware Enrutador
app.use(routes)

export default app;