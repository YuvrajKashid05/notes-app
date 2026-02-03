import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tags: [{
        type: String,
        trim: true,
    }],
    isPinned: {
        type: Boolean,
        default: false,
    },
    color: {
        type: String,
        default: "#ffffff",
    },
}, {
    timestamps: true,
});

// Index for faster queries by user
noteSchema.index({ user: 1, createdAt: -1 });

const Note = mongoose.model("Note", noteSchema);

export default Note;
