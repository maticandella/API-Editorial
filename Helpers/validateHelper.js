import { validationResult } from "express-validator"
import {resCodes} from '../Utilities/responseCodes.js'

export const validateResult = (req, res, next) => {
    try {
        //se encarga de darnos un resultados luego de aplicar todas las validaciones
        //si no se cumple una validación nos dice cual es
        validationResult(req).throw()
        return next()
    } catch (error) {
        res.status(resCodes.Forbidden)
        res.send({errors: error.array()})
    }
}

