import API from "../api/axios";

/**
 * Notes API Service
 * Axios already injects token via interceptor
 */

const normalizeList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.notes)) return data.notes;
  return [];
};

const normalizeNote = (data) => data?.note || data;

export const NotesService = {
  async getAll() {
    const res = await API.get("/notes");
    return normalizeList(res.data);
  },

  async create(payload) {
    const res = await API.post("/notes", payload);
    return normalizeNote(res.data);
  },

  async update(id, payload) {
    const res = await API.put(`/notes/${id}`, payload);
    return normalizeNote(res.data);
  },

  async remove(id) {
    await API.delete(`/notes/${id}`);
  },

  async togglePin(id) {
    // backend toggles pin itself
    const res = await API.patch(`/notes/${id}/pin`);
    return normalizeNote(res.data);
  },

  async updateColor(id, color) {
    const res = await API.patch(`/notes/${id}/color`, { color });
    return normalizeNote(res.data);
  },
};
