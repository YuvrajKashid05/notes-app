import Note from '../models/note.model.js';


export const createNote = async (req, res) => {
    try {
        const { title, content, tags, color } = req.body;

        const note = new Note({
            title,
            content,
            tags,
            color,
            user: req.user._id,
        });

        const savedNote = await note.save();

        res.status(201).json({savedNote, message: 'Note created successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({ isPinned: -1, createdAt: -1 });
        res.status(200).json({notes,message: 'Notes fetched successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getNoteById = async (req, res) => {
    try {
       const notes = await Note.find({ user: req.user._id, _id: req.params.id });

        if (notes.length === 0) {
            return res.status(404).json({ message: 'No notes found for this user' });
        }

        res.status(200).json({notes, message: 'Note fetched successfully'} );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { title, content, tags, isPinned, color } = req.body;

        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        note.title = title || note.title;
        note.content = content || note.content;
        note.tags = tags || note.tags;
        note.isPinned = isPinned !== undefined ? isPinned : note.isPinned;
        note.color = color || note.color;

        const updatedNote = await note.save();

        res.status(200).json({updatedNote, message: 'Note updated successfully'});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const togglePin = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        note.isPinned = !note.isPinned;

        const updatedNote = await note.save();

        res.status(200).json({ updatedNote, message: 'Note pinned status updated successfully' });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateColor = async (req, res) => {
    try {
        const { color } = req.body;

        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        note.color = color || note.color;

        const updatedNote = await note.save();

        res.status(200).json({updatedNote, message: 'Note color updated successfully'});
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};