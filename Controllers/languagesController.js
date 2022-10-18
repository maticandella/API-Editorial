import {sql, getConnection} from '../Models/db_connection.js'
import {queries} from '../Models/languagesModel.js'
import {resCodes} from '../Utilities/responseCodes.js'

export const GetLanguageById = async (req, res) => {
    const {id} = req.params
    try {
        const pool = await getConnection()

        const result = await pool.request()
            .input("Id", id)
            .query(queries.getLanguageById)
        res.status(resCodes.Ok).json(result.recordset[0])
        pool.close()
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    }
};