import { text } from "express"

export const queries = {
    createNewUser: 'INSERT INTO Usuarios (Email, Password, Salt) VALUES(@Email, @Password, @Salt);' +
                    'SELECT SCOPE_IDENTITY() AS Id',
    getUserByEmail: 'SELECT Email, Password, Salt FROM Usuarios Where Email = @Email',
    getUserById: 'SELECT Email, Password, Salt FROM Usuarios Where IdUsuario = @IdUsuario'
}