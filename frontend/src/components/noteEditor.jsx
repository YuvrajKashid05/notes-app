import { useEffect, useMemo, useState } from "react";

const COLOR_OPTIONS = [
  { name: "yellow", value: "#FDE047" },
  { name: "orange", value: "#FB923C" },
  { name: "purple", value: "#C084FC" },
  { name: "sky", value: "#38BDF8" },
  { name: "lime", value: "#A3E635" },
  { name: "pink", value: "#FB7185" },
];

export default function NoteEditor({
  onClose,
  onAdd,
  initialNote = null,
  mode = "create", // "create" | "edit"
}) {
  const defaults = useMemo(
    () => ({
      title: "",
      content: "",
      tag: "",
      color: COLOR_OPTIONS[0].value,
    }),
    [],
  );

  const [title, setTitle] = useState(defaults.title);
  const [content, setContent] = useState(defaults.content);
  // [ANTIGRAVITY-FIX] Renamed 'tag' to 'tagsInput' to clearly indicate it handles a string for input, but represents an array of tags.
  const [tagsInput, setTagsInput] = useState(defaults.tag);
  const [color, setColor] = useState(defaults.color);

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title || "");
      setContent(initialNote.content || "");
      // [ANTIGRAVITY-FIX] Join tags array into a string for editing
      setTagsInput(initialNote.tags ? initialNote.tags.join(", ") : "");
      setColor(initialNote.color || COLOR_OPTIONS[0].value);
    } else {
      setTitle(defaults.title);
      setContent(defaults.content);
      // [ANTIGRAVITY-FIX] Reset tags input
      setTagsInput(defaults.tag);
      setColor(defaults.color);
    }
  }, [initialNote, defaults]);

  const submit = () => {
    // [ANTIGRAVITY-FIX] Split comma-separated string into an array of tags
    const tagsArray = tagsInput.split(",").map(t => t.trim()).filter(t => t.length > 0);

    onAdd({
      title: title.trim(),
      content: content.trim(),
      tags: tagsArray, // [ANTIGRAVITY-FIX] Sending 'tags' array instead of single 'tag' string
      color,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-label="Close editor backdrop"
        type="button"
      />

      {/* Modal */}
      <div
        className="
          relative z-10
          w-[92%] max-w-140
          rounded-[34px]
          border border-gray-300
          bg-white
          p-7 md:p-8
          shadow-xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            Note editor
          </h2>
          <button
            onClick={onClose}
            className="text-2xl leading-none text-gray-500 hover:text-gray-900 transition"
            type="button"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="
            w-full
            rounded-2xl
            border border-gray-300
            px-4 py-3
            outline-none
            focus:border-gray-500
            mb-5
          "
        />

        {/* Content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="content..."
          className="
            w-full min-h-45
            rounded-[26px]
            border border-gray-300
            px-4 py-4
            outline-none
            resize-none
            focus:border-gray-500
            mb-5
          "
        />

        {/* Tag */}
        <input
          value={tagsInput} // [ANTIGRAVITY-FIX] Bound to tagsInput state
          onChange={(e) => setTagsInput(e.target.value)} // [ANTIGRAVITY-FIX] Update tagsInput state
          placeholder="Tags (comma separated)" // [ANTIGRAVITY-FIX] Updated placeholder
          className="
            w-full
            rounded-2xl
            border border-gray-300
            px-4 py-3
            outline-none
            focus:border-gray-500
            mb-6
          "
        />

        {/* Color dots */}
        <div className="flex items-center justify-between mb-6 px-1">
          {COLOR_OPTIONS.map((c) => {
            const active = color === c.value;
            return (
              <button
                key={c.name}
                onClick={() => setColor(c.value)}
                className={`
                  h-10 w-10 rounded-full border transition
                  ${active ? "border-gray-900" : "border-gray-300 hover:border-gray-500"}
                `}
                style={{ backgroundColor: c.value }}
                type="button"
                aria-label={`Pick ${c.name}`}
                title={c.name}
              />
            );
          })}
        </div>

        {/* Submit */}
        <button
          onClick={submit}
          className="
            w-full
            rounded-2xl
            border border-gray-900
            bg-gray-900 text-white
            py-3
            text-base font-semibold
            hover:bg-black
            transition
          "
          type="button"
        >
          {mode === "edit" ? "update note" : "add note"}
        </button>
      </div>
    </div>
  );
}
