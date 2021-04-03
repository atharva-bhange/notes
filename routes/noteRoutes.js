const express = require('express');
const {
    createNote,
    deleteNote,
    getAllNotes,
    getNote,
    updateNote,
    uploadNoteImage,
    searchNotes,
} = require('../controllers/noteController');

const router = express.Router();

router.get('/search', searchNotes);

router.route('/').get(getAllNotes).post(uploadNoteImage, createNote);
router
    .route('/:id')
    .get(getNote)
    .patch(uploadNoteImage, updateNote)
    .delete(deleteNote);

module.exports = router;
