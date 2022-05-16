import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  note: JSON.parse(localStorage.getItem('notes')) || [],
  editorText: '',
  isEditingNote: {},
  isShown: false,
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    createNewNote: (state, action) => {
      state.note = [
        {
          id: nanoid(),
          body: action.payload,
          date: new Date().toLocaleString(),
        },
        ...state.note,
      ];
      state.editorText = '';
    },

    deleteNote: (state, { payload }) => {
      const deletedNotes = state.note.filter((item) => item.id !== payload);
      state.note = deletedNotes;
    },

    editNote: (state, { payload }) => {
      const findId = state.note.find((item) => item.id === payload);
      if (findId.id === payload) {
        state.editorText = findId.body;
        state.isEditingNote = findId;
      }
    },

    saveUpadatedNote: (state, { payload }) => {
      state.note.filter((item) => {
        if (item.id === payload.id) {
          return (item.body = payload.value);
        }
      });
      state.editorText = '';
    },
    toggleIsShown: (state) => {
      state.isShown = !state.isShown;
    },
    saveNoteToLocalStorage: (state) => {
      localStorage.setItem('notes', JSON.stringify(state.note));
    },
  },
});

export const {
  createNewNote,
  deleteNote,
  editNote,
  saveUpadatedNote,
  toggleIsShown,
  saveNoteToLocalStorage,
} = noteSlice.actions;

export default noteSlice.reducer;
