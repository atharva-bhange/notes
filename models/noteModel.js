const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required for a note!'],
        unique: [true, 'Title of a note should be unique!'],
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required for a note!'],
    },
    image: {
        type: String,
        trim: true,
        required: [true, 'Image is required for a note!'],
    },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
