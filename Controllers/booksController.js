import {sql, getConnection} from '../Models/db_connection.js'
import {queries} from '../Models/booksModel.js'
import {messages} from '../Utilities/messages.js'
import {resCodes} from '../Utilities/responseCodes.js'

export const GetAllBooks = async (req, res) => {
    try {
        //Llamo a la conexión y retorna el pool
        const pool = await getConnection()
        //Con el pool hago una petición
        const result = await pool.request().query(queries.getAllBooks)
        res.status(resCodes.Ok).json(result.recordset)
        pool.close()
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    }
};

export const GetBookById = async (req, res) => {
    const {id} = req.params
    try {
        const pool = await getConnection()

        const result = await pool.request()
            .input("Id", id)
            .query(queries.getBookById)
        res.status(resCodes.Ok).json(result.recordset[0])
        pool.close()
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    }
};

export const GetBooksByCategorie = async (req, res) => {
    const {id} = req.params
    try {
        const pool = await getConnection()

        const result = await pool.request()
            .input("Id", id)
            .query(queries.getBooksByCategorie)
        res.status(resCodes.Ok).json(result.recordset)
        pool.close()
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    }
};

export const CreateNewBook = async (req, res) => {
    const {idCategoria, idAutor, idIdioma, isbn, titulo, fechaPublicacion,
        imagenTapa, numeroPaginas, precio, resenia, idUsuario } = req.body

    try {
        const pool = await getConnection()
    
        const result = await pool.request()
        .input("idCategoria", sql.Int, idCategoria)
        .input("idAutor", sql.Int, idAutor)
        .input("idIdioma", sql.Int, idIdioma)
        .input("isbn", sql.VarChar, isbn)
        .input("titulo", sql.VarChar, titulo)
        .input("fechaPublicacion", sql.Date, fechaPublicacion)
        .input("imagenTapa", sql.VarChar, imagenTapa)
        .input("numeroPaginas", sql.Int, numeroPaginas)
        .input("precio", sql.Decimal, precio)
        .input("resenia", sql.Text, resenia)
        //El Id de Usuario habría que obtenerlo
        .input("idUsuario", sql.Int, idUsuario)
        .query(queries.createNewBook)

        res.status(resCodes.Created).send(messages.bookPostOk)
        pool.close()
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    } 
};

export const UpdateBook = async (req, res) => {
    const {idCategoria, idAutor, idIdioma, isbn, titulo, fechaPublicacion,
        imagenTapa, numeroPaginas, precio, resenia, idUsuario } = req.body
    const {id} = req.params

    try {
        const pool = await getConnection()

        //Chequear si el ID existe en la tabla Libros, si no existe mostrar mensaje de error
        //Find IdLibro
        const find = await FindBook(id)

        //Si el find encontró un Libro para el IdLibro ejecuta el Update
        if (find.recordset[0]) {
            //Update
            const result = await pool.request()
            .input("id", sql.Int, id)
            .input("idCategoria", sql.Int, idCategoria)
            .input("idAutor", sql.Int, idAutor)
            .input("idIdioma", sql.Int, idIdioma)
            .input("isbn", sql.VarChar, isbn)
            .input("titulo", sql.VarChar, titulo)
            .input("fechaPublicacion", sql.Date, fechaPublicacion)
            .input("imagenTapa", sql.VarChar, imagenTapa)
            .input("numeroPaginas", sql.Int, numeroPaginas)
            .input("precio", sql.Decimal, precio)
            .input("resenia", sql.Text, resenia)
            .input("idUsuario", sql.Int, idUsuario)
            .query(queries.updateBook)
            res.status(resCodes.Ok).send(messages.bookPutOk)
        } else {
            //IdLibro no existente
            res.status(resCodes.NotFound).send(messages.bookPutFail)
        }
        pool.close()
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    }
};

export const DeleteBook = async (req, res) => {
    const {id} = req.params
    //Recordar validar que el Id exista antes de eliminar
    try {
        const pool = await getConnection()

        //Find IdLibro
        const find = await FindBook(id)

        //Si el find encontró un Libro para el IdLibro ejecuta el Delete
        if (find.recordset[0]) {
            //Delete
            const result = await pool.request()
            .input("Id", id)
            .query(queries.deleteBook)
            res.status(resCodes.Ok).send(messages.bookDeleteOk)
        } else {
            //IdLibro no existente
            res.status(resCodes.NotFound).send(messages.bookDeleteFail)
        }
        pool.close()
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    }
};

export const CountISBN = async (isbn) => {
    try {
        const pool = await getConnection()
        
        const count = await pool.request()
            .input("ISBN", isbn)
            .query(queries.countIsbn)
        pool.close()
        //Con la siguiente linea obtenemos el valor del contador y lo retorno para usar en el Validator
        return count.recordset[0][''];
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    }
};

export const FindBook = async (id) => {
    try {
        const pool = await getConnection()
        
        const find = await pool.request()
            .input("Id", id)
            .query(queries.getBookById)
        
        return find
    } catch (error) {
        return res.status(resCodes.InternalServerError).send(error.message)
    }
};