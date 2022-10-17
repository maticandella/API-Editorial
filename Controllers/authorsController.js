import {sql, getConnection} from '../Models/db_connection.js'
import {queries} from '../Models/authorsModel.js'
import {messages} from '../Utilities/messages.js'
import {resCodes} from '../Utilities/responseCodes.js'

export const GetAllAuthors = async (req, res) => {
    try {
        //Llamo a la conexión y retorna el pool
        const pool = await getConnection()
        //Con el pool hago una petición
        const result = await pool.request().query(queries.getAllAuthors)
        res.status(resCodes.Ok).json(result.recordset)
        pool.close()
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    }
};

export const GetAuthorById = async (req, res) => {
    const {id} = req.params
    try {
        const pool = await getConnection()

        const result = await pool.request()
            .input("Id", id)
            .query(queries.getAuthorById)
        res.status(resCodes.Ok).json(result.recordset[0])
        pool.close()
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    }
};

export const CreateNewAuthor = async (req, res) => {
    const {nombre, apellido, idNacionalidad, nota, urlInstagram, urlTwitter, 
    urlFacebook, urlLinkedin, urlWeb, idUsuario} = req.body

    try {
        const pool = await getConnection()
    
        const result = await pool.request()
        .input("nombre", sql.VarChar, nombre)
        .input("apellido", sql.VarChar, apellido)
        .input("idNacionalidad", sql.Int, idNacionalidad)
        .input("nota", sql.VarChar, nota)
        .input("urlInstagram", sql.VarChar, urlInstagram)
        .input("urlTwitter", sql.VarChar, urlTwitter)
        .input("urlFacebook", sql.VarChar, urlFacebook)
        .input("urlLinkedin", sql.VarChar, urlLinkedin)
        .input("urlWeb", sql.VarChar, urlWeb)
        .input("idUsuario", sql.Int, idUsuario)
        .query(queries.createNewAuthor)
        
        res.status(resCodes.Created).send(messages.authorPostOk)
        pool.close()
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    } 
};

export const UpdateAuthor = async (req, res) => {
    const {nombre, apellido, idNacionalidad, nota, urlInstagram, urlTwitter, 
        urlFacebook, urlLinkedin, urlWeb, idUsuario} = req.body
    const {id} = req.params

    try {
        const pool = await getConnection()

        //Chequear si el ID existe en la tabla Autores, si no existe mostrar mensaje de error
        //Find IdAutor
        const find = await FindAuthor(id)

        //Si el find encontró un Autor para el IdAutor ejecuta el Update
        if (find.recordset[0]) {
            //Update
            const result = await pool.request()
            .input("id", sql.Int, id)
            .input("nombre", sql.VarChar, nombre)
            .input("apellido", sql.VarChar, apellido)
            .input("idNacionalidad", sql.Int, idNacionalidad)
            .input("nota", sql.VarChar, nota)
            .input("urlInstagram", sql.VarChar, urlInstagram)
            .input("urlTwitter", sql.VarChar, urlTwitter)
            .input("urlFacebook", sql.VarChar, urlFacebook)
            .input("urlLinkedin", sql.VarChar, urlLinkedin)
            .input("urlWeb", sql.VarChar, urlWeb)
            .input("idUsuario", sql.Int, idUsuario)
            .query(queries.updateAuthor)
            res.status(resCodes.Ok).send(messages.authorPutOk)
        } else {
            //IdAutor no existente
            res.status(resCodes.NotFound).send(messages.authorPutFail)
        }
        pool.close()
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    }
};

export const DeleteAuthor = async (req, res) => {
    const {id} = req.params
    try {
        const pool = await getConnection()

        //Find IdAutor
        const find = await FindAuthor(id)

        //Si el find encontró un Autor para el IdAutor ejecuta el Delete
        if (find.recordset[0]) {
            //Delete
            const result = await pool.request()
            .input("Id", id)
            .query(queries.deleteAuthor)
            res.status(resCodes.Ok).send(messages.authorDeleteOk)
        } else {
            //IdAutor no existente
            res.status(resCodes.NotFound).send(messages.authorDeleteFail)
        }
        pool.close()
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    }
};

export const FindAuthor = async (id) => {
    try {
        const pool = await getConnection()
        
        const find = await pool.request()
            .input("Id", id)
            .query(queries.getAuthorById)
        
        return find
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    }
};