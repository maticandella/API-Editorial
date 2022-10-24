import { text } from "express"

export const queries = {
    getLanguageById: 'SELECT * FROM Idiomas Where IdIdioma = @Id',
    getAllLanguages: 'SELECT * FROM Idiomas'
}