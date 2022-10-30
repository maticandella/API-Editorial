import { text } from "express"

export const queries = {
    getAllAuthors: 'SELECT * FROM Autores',
    getAuthorById: 'SELECT * FROM Autores Where IdAutor = @Id',
    createNewAuthor: 'INSERT INTO Autores (Nombre, Apellido, IdNacionalidad, Nota, UrlInstagram, UrlTwitter, ' + 
                    'UrlFacebook, UrlLinkedin, UrlWeb, IdUsuario, FotoPerfil)' +
                    'VALUES(@Nombre, @Apellido, @IdNacionalidad, @Nota, @UrlInstagram, @UrlTwitter, ' +
                    '@UrlFacebook, @UrlLinkedin, @UrlWeb, @IdUsuario, @FotoPerfil)',
    updateAuthor: 'UPDATE Autores SET Nombre = @Nombre, Apellido = @Apellido, IdNacionalidad = @IdNacionalidad, ' + 
                'Nota = @Nota, UrlInstagram = @UrlInstagram, UrlTwitter = @UrlTwitter, UrlFacebook = @UrlFacebook, ' +
                'UrlLinkedin = @UrlLinkedin, UrlWeb = @UrlWeb, IdUsuario = @IdUsuario, FotoPerfil = @FotoPerfil WHERE IdAutor = @Id',
    deleteAuthor: 'DELETE FROM Autores WHERE IdAutor = @Id'
}