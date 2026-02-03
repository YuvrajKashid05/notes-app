import express from 'express';
import { createNote, deleteNote, getNoteById, getNotes, togglePin, updateColor, updateNote } from '../controllers/noteController.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();


router.use(protect);

router.post('/', createNote);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.patch('/:id/pin', togglePin);
router.patch('/:id/color', updateColor);

export default router;
