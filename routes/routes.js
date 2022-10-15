import { Router } from "express";
import {GetAllBooks, GetBookById, CreateNewBook, UpdateBook, DeleteBook} 
    from '../Controllers/booksController.js'
import {validateBook, validateCreate} from '../Validators/books.js'

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

export default router;