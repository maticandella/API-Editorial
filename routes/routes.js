import { Router } from "express";
import {GetAllBooks, GetBookById, CreateNewBook, UpdateBook, DeleteBook} 
    from '../Controllers/booksController.js'
import { CreateNewCategorie, GetAllCategories, GetCategorieById, UpdateCategorie, DeleteCategorie } 
    from "../Controllers/categoriesController.js";
import {validateBook, validateCreate} from '../Validators/books.js'
import {validateCategorie} from '../Validators/categories.js'

const router = Router()

//Books
router.get('/books', GetAllBooks)

router.get('/books/:id', GetBookById)

router.post('/books', validateBook, validateCreate, CreateNewBook)

router.put('/books/:id', validateBook, UpdateBook)

router.delete('/books/:id', DeleteBook)

//Authors
// router.get('/books', GetAllAuthors)

// router.get('/books/:id', GetAuthorById)

// router.post('/books', CreateNewAuthor)

// router.put('/books/:id', UpdateAuthor)

// router.delete('/books/:id', DeleteAuthor)

//Categories
router.get('/categories', GetAllCategories)

router.get('/categories/:id', GetCategorieById)

router.post('/categories', validateCategorie, CreateNewCategorie)

router.put('/categories/:id', validateCategorie, UpdateCategorie)

router.delete('/categories/:id', DeleteCategorie)

export default router;