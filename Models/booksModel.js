import { text } from "express"

export const queries = {
    getAllBooks: 'SELECT * FROM Libros',
    getBookById: 'SELECT * FROM Libros Where IdLibro = @Id',
    getBooksByCategorie: 'SELECT * FROM Libros Where IdCategoria = @Id',
    countIsbn: 'SELECT COUNT(*) FROM Libros WHERE ISBN = @ISBN',
    createNewBook: 'INSERT INTO Libros (IdCategoria, IdAutor, IdIdioma, ISBN, Titulo, FechaPublicacion,' +
                    'ImagenTapa, NumeroPaginas, Precio, Resenia, IdUsuario)' +
                    'VALUES(@IdCategoria, @IdAutor, @IdIdioma, @ISBN, @Titulo, @FechaPublicacion, ' +
                    '@ImagenTapa, @NumeroPaginas, @Precio, @Resenia, @IdUsuario)',
    updateBook: 'UPDATE Libros SET IdCategoria = @IdCategoria, IdAutor = @IdAutor, IdIdioma = @IdIdioma, ' + 
                'ISBN = @ISBN, Titulo = @Titulo, FechaPublicacion = @FechaPublicacion, ImagenTapa = @ImagenTapa, ' +
                'NumeroPaginas = @NumeroPaginas, Precio = @Precio, Resenia = @Resenia, ' +
                'IdUsuario = @IdUsuario WHERE IdLibro = @Id',
    deleteBook: 'DELETE FROM Libros WHERE IdLibro = @Id'
}