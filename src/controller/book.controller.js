import Book from '../models/book.model.js';
import User from '../models/user.model.js';
export const addBook = async (req, res) => {
    const loggedInUser = req.user;
    try {
        if (loggedInUser.role === 'user') {
            return res.status(403).json({ message: 'User role does not have permission to add books' });
        }
        const { title, author, genre, description, cover_image_url, published_date } = req.body;
        if (!title || !author || !genre || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const cImage_url = cover_image_url || "dummy.jpg";

        const date = new Date(published_date || Date.now());
        const newBook = new Book({ title, author, genre, description, cover_image_url: cImage_url, published_date: date, created_by: loggedInUser._id });
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully' });
    } catch (error) {
        console.log("Error while uploading Book", error.message);
        res.status(500).json({ message: 'Server error' });
    }
}
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        if (!books) return res.status(404).json("Books not found");
        res.status(200).json(books);
    } catch (error) {
        console.error("Error getting books", error.message);
    }
}


export const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json("Book not found");
        res.status(200).json(book);
    } catch (error) {
        console.error("Error getting book", error.message);
    }
};


export const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const loggedInUser = req.user;
        if (loggedInUser.role === 'user') return res.status(403).json({ message: 'User role does not have permission to update books' });
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json("Book not found");
        if ((book.created_by.toString() !== loggedInUser._id.toString()) || loggedInUser.role !== 'admin') {
            res.status(403).json({ message: "User don't have rights to update it" });
        }
        const { title, author, genre, description, cover_image_url, published_date } = req.body;
        const cImage_url = cover_image_url || "dummy.jpg";

        const date = new Date(published_date || Date.now());
        const updatedBook = await Book.findByIdAndUpdate(bookId, {
            title,
            author,
            genre,
            description,
            cover_image_url: cImage_url,
            published_date: date
        }, { new: true });
        res.status(200).json(updatedBook);
    }
    catch (error) {
        console.error("Error getting book", error.message);
        return res.status(403).json({ message: 'Internal Server error', error: error.message });
    }
}

export const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const loggedInUser = req.user;
        if (loggedInUser.role === 'user') return res.status(403).json({ message: 'User role does not have permission to delete books' });
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json("Book not found");
        if ((book.created_by.toString() !== loggedInUser._id.toString()) || loggedInUser.role !== 'admin') {
            res.status(403).json({ message: "User don't have rights to delete it" });
        }
        const deletedBook = await Book.findByIdAndDelete(bookId);
        res.status(200).json(deletedBook);
    }
    catch (error) {
        console.error("Error getting book", error.message);
        return res.status(403).json({ message: 'Internal Server error', error: error.message });
    }
}