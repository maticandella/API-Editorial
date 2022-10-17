import { Router } from "express";
import {GetAllBooks, GetBookById, CreateNewBook, UpdateBook, DeleteBook} 
    from '../Controllers/booksController.js'
import { CreateNewCategorie, GetAllCategories, GetCategorieById, UpdateCategorie, DeleteCategorie } 
    from "../Controllers/categoriesController.js";
import { GetAllAuthors, GetAuthorById, CreateNewAuthor, UpdateAuthor, DeleteAuthor } 
    from "../Controllers/authorsController.js";
import {validateBook, validateCreate} from '../Validators/books.js'
import {validateCategorie} from '../Validators/categories.js'
import {validateAuthor} from "../Validators/authors.js";
import {messages} from '../Utilities/messages.js';
import {resCodes} from '../Utilities/responseCodes.js';

const router = Router()

//Books
router.get('/books', GetAllBooks)

router.get('/books/:id', GetBookById)

router.post('/books', validateBook, validateCreate, CreateNewBook)

router.put('/books/:id', validateBook, UpdateBook)

router.delete('/books/:id', DeleteBook)

//Authors
router.get('/authors', GetAllAuthors)

router.get('/authors/:id', GetAuthorById)

router.post('/authors', validateAuthor, CreateNewAuthor)

router.put('/authors/:id', validateAuthor, UpdateAuthor)

router.delete('/authors/:id', DeleteAuthor)

//Categories
router.get('/categories', GetAllCategories)

router.get('/categories/:id', GetCategorieById)

router.post('/categories', validateCategorie, CreateNewCategorie)

router.put('/categories/:id', validateCategorie, UpdateCategorie)

router.delete('/categories/:id', DeleteCategorie)

//General
router.get('*', (req, res) => {
    res.status(resCodes.NotFound).send(messages.pageNotFound)
})

export default router;