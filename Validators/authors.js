import { check } from "express-validator";
import { validateResult } from "../Helpers/validateHelper.js";

export const validateAuthor = [
    //nombre, apellido, idNacionalidad, nota, urlInstagram, urlTwitter, 
    //urlFacebook, urlLinkedin, urlWeb, idUsuario 
    check('nombre')
        .exists()
        .not()
        .isEmpty()
        .isString(),
    check('apellido')
        .exists()
        .not()
        .isEmpty()
        .isString(),
    check('idNacionalidad')
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),
    check('nota')
        .exists(),
    check('urlInstagram')
        .exists(),
    check('urlTwitter')
        .exists(),
    check('urlFacebook')
        .exists(),
    check('urlLinkedin')
        .exists(),
    check('urlWeb')
        .exists(),
    check('idUsuario')
        .exists(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]