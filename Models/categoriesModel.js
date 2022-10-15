import { text } from "express"

export const queries = {
    getAllCategories: 'SELECT * FROM Categorias',
    getCategorieById: 'SELECT * FROM Categorias Where IdCategoria = @Id',
    createNewCategorie: 'INSERT INTO Categorias (Descripcion, IdUsuario) VALUES(@Descripcion, @IdUsuario)',
    updateCategorie: 'UPDATE Categorias SET Descripcion = @Descripcion WHERE IdCategoria = @Id',
    deleteCategorie: 'DELETE FROM Categorias WHERE IdCategoria = @Id'
}