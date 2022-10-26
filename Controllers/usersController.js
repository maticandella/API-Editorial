import {sql, getConnection} from '../Models/db_connection.js'
import {queries} from '../Models/usersModel.js'
import {messages} from '../Utilities/messages.js'
import {resCodes} from '../Utilities/responseCodes.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { expressjwt } from "express-jwt";

//Función para obtener el Token del Usuario
const SignToken = (idUser, email) => jwt.sign({idUser, name: email}, process.env.TOKEN_SECRET)

//Middleware JWT para autorizar con el token
export const validateJwt = expressjwt({secret: process.env.TOKEN_SECRET, algorithms: ['HS256']})

export const RegisterUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const pool = await getConnection()
        
        //Chequear si el Email existe en la tabla Usuarios, si existe mostrar mensaje
        //Find Email
        const find = await FindUser(email)

        if (find.recordset[0]) {
            return res.status(resCodes.Forbidden).send(messages.userExists)
        }

        const salt = await bcrypt.genSalt()
        const hashed = await bcrypt.hash(password, salt)

        const result = await pool.request()
        .input("email", sql.VarChar, email)
        .input("password", sql.VarChar, hashed)
        .input("salt", sql.VarChar, salt)
        .query(queries.createNewUser)
        
        //Obtener el Id de Usuario generado (En la Query lo obtengo con el SELECT SCOPE_IDENTITY() AS Id)
        const idUser = result.recordset[0].Id
        //Asignar Token al nuevo Usuario
        const signed = SignToken(idUser, email)

        res.status(resCodes.Created).send(signed)
        pool.close()
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    } 
};

export const Login = async (req, res) => {
    const {email, password} = req.body

    try {
        const pool = await getConnection()
        
        //Chequear si el Usuario existe en la tabla Usuarios, si no existe mostrar mensaje de error
        //Find Email
        const user = await FindUser(email)

        if (!user.recordset[0]) {
            //El usuario no existe
            return res.status(resCodes.Forbidden).send(messages.userNotExists)
        } else {
            //Usuario existe
            //Chequear contraseña --> Comparo la contraseña del body contra la contraseña del objeto user
            const isMatch = await bcrypt.compare(password, user.recordset[0].Password)
            if(isMatch) {
                //Si la contraseña es correcta
                const signed = SignToken(user.IdUsuario, email)
                res.status(resCodes.Ok).send(signed)
            } else {
                res.status(resCodes.Forbidden).send(messages.userNotExists)
            }
        }
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    } 
};

export const GetUserByEmail = async (req, res) => {
    const {email} = req.params
    try {
        const user = await FindUser(email)
        if (!user.recordset[0]) {
            //El usuario no existe
            res.status(resCodes.Forbidden).send(messages.userNotExists)
        } else {
            res.status(resCodes.Ok).json(user.recordset[0])
            console.log(user.recordset[0]);
        }
    } catch (error) {
        res.status(resCodes.InternalServerError).send(error.message)
    }
};

//Buscar Usuario por Email
const FindUser = async (email) => {
    try {
        const pool = await getConnection()
        
        const find = await pool.request()
            .input("email", email)
            .query(queries.getUserByEmail)
        
        return find
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    }
};

