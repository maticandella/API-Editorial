//{config} de dotenv va a intentar leer las variables de entorno que estan
//definidas en nuestra computadora
import{config} from 'dotenv'
config()

export default {
    port: 3000,
    dbUser: process.env.DB_USER || "",
    dbPassword: process.env.DB_PASSWORD || "",
    dbServer: process.env.DB_SERVER || "",
    dbDatabase: process.env.DB_DATABASE || "",
}