import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    cover_image_url:{
        type: String,
        required: true,
    },
    published_date:{
        type: Date,
        required: true,
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

const Book = mongoose.model('Book', bookSchema);

export default Book;