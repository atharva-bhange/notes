const catchAsync = require('../utils/catchAsync');
const Note = require('../models/noteModel');
const AppError = require('../utils/appError');

exports.getAllNotes = catchAsync(async (req, res, next) => {
    const notes = await Note.find();

    res.status(200).json({
        status: 'success',
        count: notes.length,
        data: { notes },
    });
});

exports.createNote = catchAsync(async (req, res, next) => {
    const note = {
        title: req.body.title,
        description: req.body.description,
        image: 'lol',
    };

    const createdNote = await Note.create(note);

    res.status(201).json({
        status: 'success',
        data: {
            note: createdNote,
        },
    });
});

exports.getNote = catchAsync(async (req, res) => {
    const id = req.params.id;

    const note = await Note.findById(id);

    if (!note) {
        next(new AppError('There is no note with this id.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { note },
    });
});

exports.updateNote = catchAsync(async (req, res) => {});

exports.deleteNote = catchAsync(async (req, res) => {
    const id = req.params.id;

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
        next(new AppError('There is no note with this id', 404));
    }

    res.status(204).json({
        status: 'success',
        data: {
            note: deletedNote,
        },
    });
});
