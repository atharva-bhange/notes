const fs = require('fs');
const path = require('path');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const Note = require('../models/noteModel');
const AppError = require('../utils/appError');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/notes');
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1];
        cb(null, `note-${Date.now()}.${extension}`);
    },
});

const multerFilter = (req, file, cb) => {
    const type = file.mimetype.split('/')[0];
    if (file.mimetype.startsWith('image')) cb(null, true);
    else cb(new AppError('Not a image, please upload only image.', 400), false);
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

exports.uploadNoteImage = upload.single('image');

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
        image: req.file.filename,
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
        return next(new AppError('There is no note with this id.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { note },
    });
});

exports.updateNote = catchAsync(async (req, res) => {
    const id = req.params.id;

    if (req.file) req.body.image = req.file.filename;

    const oldNote = await Note.findByIdAndUpdate(id, req.body, {
        runValidators: true,
    });

    if (!oldNote) {
        return next(new AppError('There is no note with this id.', 404));
    }

    if (req.file)
        fs.unlink(path.resolve('public/img/notes', oldNote.image), (err) => {
            if (!err) console.log(err);
        });

    res.status(200).json({
        status: 'success',
        data: {
            note: oldNote,
        },
    });
});

exports.deleteNote = catchAsync(async (req, res) => {
    const id = req.params.id;

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
        return next(new AppError('There is no note with this id', 404));
    }

    fs.unlink(path.resolve('public/img/notes', deletedNote.image), (err) => {
        if (!err) console.log(err);
    });

    res.status(204).json({
        status: 'success',
        data: {
            note: deletedNote,
        },
    });
});

exports.searchNotes = catchAsync(async (req, res, next) => {
    if (!req.query.key)
        return next(new AppError('Search query required!', 400));

    const results = await Note.aggregate([
        {
            $search: {
                text: {
                    query: req.query.key,
                    path: ['title', 'description'],
                    fuzzy: {
                        maxEdits: 2,
                    },
                },
            },
        },
        {
            $limit: 5,
        },
        {
            $project: {
                _id: 1,
                title: 1,
                description: 1,
                image: 1,
            },
        },
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            results,
        },
    });
});
