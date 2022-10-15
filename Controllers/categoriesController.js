import {sql, getConnection} from '../Models/db_connection.js'
import {queries} from '../Models/categoriesModel.js'
import {messages} from '../Utilities/messages.js'
import {resCodes} from '../Utilities/responseCodes.js'

export const GetAllCategories = async (req, res) => {
    try {
        //Llamo a la conexión y retorna el pool
        const pool = await getConnection()
        //Con el pool hago una petición
        const result = await pool.request().query(queries.getAllCategories)
        res.status(resCodes.Ok).json(result.recordset)
        pool.close()
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    }
};

export const GetCategorieById = async (req, res) => {
    const {id} = req.params
    try {
        const pool = await getConnection()

        const result = await pool.request()
            .input("Id", id)
            .query(queries.getCategorieById)
        res.status(resCodes.Ok).json(result.recordset[0])
        pool.close()
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    }
};

export const CreateNewCategorie = async (req, res) => {
    const { descripcion, idUsuario } = req.body

    try {
        const pool = await getConnection()
    
        const result = await pool.request()
        .input("descripcion", sql.VarChar, descripcion)
        //El Id de Usuario habría que obtenerlo
        .input("idUsuario", sql.Int, idUsuario)
        .query(queries.createNewCategorie)
        res.status(resCodes.Created).send(messages.categoriePostOk)
        pool.close()
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    } 
};

export const UpdateCategorie = async (req, res) => {
    const { descripcion, idUsuario } = req.body
    const {id} = req.params

    try {
        const pool = await getConnection()

        //Chequear si el ID existe en la tabla Categorias, si no existe mostrar mensaje de error
        //Find IdCategoria
        const find = await FindCategorie(id)

        //Si el find encontró una Categoria para el IdCategoria ejecuta el Update
        if (find.recordset[0]) {
            //Update
            const result = await pool.request()
            .input("id", sql.Int, id)
            .input("descripcion", sql.VarChar, descripcion)
            .input("idUsuario", sql.Int, idUsuario)
            .query(queries.updateCategorie)
            res.status(resCodes.Ok).send(messages.categoriePutOk)
        } else {
            //IdCategoria no existente
            res.status(resCodes.NotFound).send(messages.categoriePutFail)
        }
        pool.close()
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    }
};

export const DeleteCategorie = async (req, res) => {
    const {id} = req.params
    //Recordar validar que el Id exista antes de eliminar
    try {
        const pool = await getConnection()

        //Find IdCategoria
        const find = await FindCategorie(id)

        //Si el find encontró un Categoria para el IdCategoria ejecuta el Delete
        if (find.recordset[0]) {
            //Delete
            const result = await pool.request()
            .input("Id", id)
            .query(queries.deleteCategorie)
            res.status(resCodes.Ok).send(messages.categorieDeleteOk)
        } else {
            //IdLibro no existente
            res.status(resCodes.NotFound).send(messages.categorieDeleteFail)
        }
        pool.close()
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    }
};

export const FindCategorie = async (id) => {
    try {
        const pool = await getConnection()
        
        const find = await pool.request()
            .input("Id", id)
            .query(queries.getCategorieById)
        
        return find
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    }
};