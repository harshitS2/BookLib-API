import express from 'express';
import { addBook, deleteBook, getBookById, getBooks, updateBook } from '../controller/book.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import Book from '../models/book.model.js';
const route = express();
route.post('/upload', authMiddleware, addBook);
route.get('/books', getBooks);
route.get('/books/:id', getBookById);
route.put('/update-book/:id', authMiddleware, updateBook);
route.delete('/delete-book/:id', authMiddleware, deleteBook);

export default route;