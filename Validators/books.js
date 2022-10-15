import { check } from "express-validator";
import { validateResult } from "../Helpers/validateHelper.js";
import {CountISBN} from '../Controllers/booksController.js';
import {messages} from '../Utilities/messages.js';

export const validateBook = [
    //idCategoria, idAutor, idIdioma, isbn, titulo, fechaPublicacion,
    //imagenTapa, numeroPaginas, editorial, precio, resenia, idUsuario 
    check('idCategoria')
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),
    check('idAutor')
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),
    check('idIdioma')
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),
    check('isbn')
        .exists()
        .not()
        .isEmpty()
        .isISBN(),
    check('titulo')
        .exists()
        .not()
        .isEmpty()
        .isString(),
    check('fechaPublicacion')
        .exists()
        .isDate(),
    check('imagenTapa')
        .exists()
        .not()
        .isEmpty()
        .isString(),
    check('numeroPaginas')
        .exists()
        .isNumeric(),
    check('editorial')
        .exists()
        .not()
        .isEmpty()
        .isString(),
    check('precio')
        .exists()
        .not()
        .isEmpty()
        .isDecimal()
        .custom( async (value, {req}) => {
            //Chequeo si el precio es mayor a 0
            if(value <= 0) {
                throw new Error(messages.customPrecioMayorACero)
            }
            return true
            }),
    check('resenia')
        .exists(),
    check('idUsuario')
        .exists(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const validateCreate = [
    //idCategoria, idAutor, idIdioma, isbn, titulo, fechaPublicacion,
    //imagenTapa, numeroPaginas, editorial, precio, resenia, idUsuario 
    check('isbn')
        .custom( async (value, {req}) => {
            //Chequeo si el ISBN ya existe para otro libro
            const count = await CountISBN(value)
            if(count > 0) {
                throw new Error(messages.customIsbnExistente)
            }
            return true
            }),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
