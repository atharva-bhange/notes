const express = require('express');
const {
    createNote,
    deleteNote,
    getAllNotes,
    getNote,
    updateNote,
} = require('../controllers/noteController');

const router = express.Router();

router.route('/').get(getAllNotes).post(createNote);
router.route('/:id').get(getNote).patch(updateNote).delete(deleteNote);

module.exports = router;
