import { Router } from "express";
import {GetAllBooks, GetBookById, CreateNewBook, UpdateBook, DeleteBook} 
    from '../Controllers/booksController.js'
import { CreateNewCategorie, GetAllCategories, GetCategorieById, UpdateCategorie, DeleteCategorie } 
    from "../Controllers/categoriesController.js";
import { GetAllAuthors, GetAuthorById, CreateNewAuthor, UpdateAuthor, DeleteAuthor } 
    from "../Controllers/authorsController.js";
import { GetLanguageById } 
    from "../Controllers/languagesController.js";
import { RegisterUser, Login, validateJwt  } 
    from "../Controllers/usersController.js";
import {validateBook, validateCreate} from '../Validators/books.js'
import {validateCategorie} from '../Validators/categories.js'
import {validateAuthor} from "../Validators/authors.js";
import {messages} from '../Utilities/messages.js';
import {resCodes} from '../Utilities/responseCodes.js';


const router = Router()

//Authors
router.get('/authors', validateJwt, GetAllAuthors)

router.get('/authors/:id', validateJwt, GetAuthorById)

router.post('/authors', validateJwt, validateAuthor, CreateNewAuthor)

router.put('/authors/:id', validateJwt, validateAuthor, UpdateAuthor)

router.delete('/authors/:id', validateJwt, DeleteAuthor)

//Books
router.get('/books', validateJwt, GetAllBooks)

router.get('/books/:id', validateJwt, GetBookById)

router.post('/books', validateJwt, validateBook, validateCreate, CreateNewBook)

router.put('/books/:id', validateJwt, validateBook, UpdateBook)

router.delete('/books/:id', validateJwt, DeleteBook)

//Categories
router.get('/categories', validateJwt, GetAllCategories)

router.get('/categories/:id', validateJwt, GetCategorieById)

router.post('/categories', validateJwt, validateCategorie, CreateNewCategorie)

router.put('/categories/:id', validateJwt, validateCategorie, UpdateCategorie)

router.delete('/categories/:id', validateJwt, DeleteCategorie)

//Languages
router.get('/languages/:id', validateJwt, GetLanguageById)

//Users
router.post('/users/register', RegisterUser)

router.post('/users/login', Login)

//General
router.get('*', (req, res) => {
    res.status(resCodes.NotFound).send(messages.pageNotFound)
})

export default router;