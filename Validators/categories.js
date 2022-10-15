import { check } from "express-validator";
import { validateResult } from "../Helpers/validateHelper.js";

export const validateCategorie = [
    //descripcion, idUsuario 
    check('descripcion')
        .exists()
        .not()
        .isEmpty()
        .isString(),
    check('idUsuario')
        .exists(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]


