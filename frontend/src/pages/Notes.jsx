import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { BsFillPinFill, BsPin } from "react-icons/bs";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { MdOutlineNoteAdd } from "react-icons/md";
import { NotesService } from "../api/notesApi";
import EmptyPage from "../components/emptyPage";
import ErrorBoundary from "../components/ErrorBoundary";
import Navbar from "../components/navbar";
import NoteEditor from "../components/noteEditor";
import NoteSkeleton from "../components/NoteSkeleton";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [openEditor, setOpenEditor] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const list = await NotesService.getAll();
      setNotes(Array.isArray(list) ? list : []);
    } catch {
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      if (Boolean(b.isPinned) !== Boolean(a.isPinned)) return b.isPinned ? 1 : -1;
      return (
        new Date(b.updatedAt || b.createdAt) -
        new Date(a.updatedAt || a.createdAt)
      );
    });
  }, [notes]);

  const startCreate = () => {
    setEditingNote(null);
    setOpenEditor(true);
  };

  const startEdit = (note) => {
    setEditingNote(note);
    setOpenEditor(true);
  };

  const closeEditor = () => {
    setEditingNote(null);
    setOpenEditor(false);
  };

  const addNote = async (payload) => {
    try {
      await NotesService.create(payload);
      toast.success("Note created");
      closeEditor();
      fetchNotes();
    } catch {
      toast.error("Failed to create note");
    }
  };

  const updateNote = async (payload) => {
    try {
      await NotesService.update(editingNote._id, payload);
      toast.success("Note updated");
      closeEditor();
      fetchNotes();
    } catch {
      toast.error("Failed to update note");
    }
  };

  const deleteNote = async (id) => {
    try {
      await NotesService.remove(id);
      toast.success("Note deleted");
      fetchNotes();
    } catch {
      toast.error("Failed to delete note");
    }
  };

  const togglePin = async (note) => {
    try {
      await NotesService.togglePin(note._id);
      toast.success(note.isPinned ? "Unpinned note" : "Pinned note");
      fetchNotes();
    } catch {
      toast.error("Failed to update pin");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar userName="User" onLogout={() => toast("Logout clicked")} />
      <ErrorBoundary>
        <main className="mx-auto w-full max-w-6xl px-4 md:px-8 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">My Notes</h1>
              <p className="text-sm text-gray-600">Click a note to edit</p>
            </div>
            <button type="button" onClick={startCreate} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 bg-white hover:bg-gray-50 transition cursor-pointer">
              <MdOutlineNoteAdd />
              Create notes
            </button>
          </div>

          {loading ? (
            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => <NoteSkeleton key={i} />)}
            </section>
          ) : sortedNotes.length === 0 ? (
            <EmptyPage onCreate={startCreate} />
          ) : (
            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedNotes.map((n) => (
                <article key={n._id} className="group relative rounded-[26px] border border-gray-300 overflow-hidden transition hover:shadow-md h-full" style={{ backgroundColor: n.color || "#ffffff" }}>
                  <div className="absolute inset-0 bg-white/35 z-0 pointer-events-none" />
                  <div className="absolute bottom-4 right-4 z-30 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
                    <button
                      type="button"
                      className={`cursor-pointer p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition ${n.isPinned ? "text-amber-600" : "text-gray-800"}`}
                      onClick={(e) => { e.stopPropagation(); togglePin(n); }}
                      title={n.isPinned ? "Unpin" : "Pin"}
                    >
                      {n.isPinned ? <BsFillPinFill /> : <BsPin />}
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition"
                      onClick={(e) => { e.stopPropagation(); startEdit(n); }}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer p-2 rounded-lg border border-gray-200 bg-white hover:bg-red-50 text-red-600 transition"
                      onClick={(e) => { e.stopPropagation(); deleteNote(n._id); }}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                  <div className="relative z-10 p-6 pb-14 min-h-40 cursor-pointer flex flex-col h-full" onClick={() => startEdit(n)}>
                    <h2 className="text-lg font-semibold mb-2 line-clamp-1 flex items-center gap-2">
                      <span>{n.title || "Untitled"}</span>
                      {n.isPinned ? (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                          Pinned
                        </span>
                      ) : null}
                    </h2>
                    <p className="text-sm text-gray-800/90 line-clamp-4 whitespace-pre-wrap flex-1">
                      {n.content || ""}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-700/80">
                      <span>{n.createdAt ? formatDate(n.createdAt) : ""}</span>
                      {n.updatedAt ? <span>Edited {formatDate(n.updatedAt)}</span> : <span />}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {n.tags?.map((tag) => (
                        <span key={tag} className="inline-flex items-center rounded-full bg-white/70 border border-gray-200 px-3 py-1 text-xs text-gray-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}
        </main>
      </ErrorBoundary>

      {openEditor ? (
        <NoteEditor
          onClose={closeEditor}
          onAdd={editingNote ? updateNote : addNote}
          initialNote={editingNote}
          mode={editingNote ? "edit" : "create"}
        />
      ) : null}
    </div>
  );
}



