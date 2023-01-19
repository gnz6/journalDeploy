import { createSlice } from "@reduxjs/toolkit"

export const journalSlice = createSlice({
    name: "journal",
    initialState: {
        isSaving: false,
        messageSaved: "",
        notes: [],
        activeNote: null
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true
        },
        addNewNote: (state, action) => {
            state.notes.push(action.payload)
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.activeNote = action.payload
            state.messageSaved = ``

        },
        setNotes: (state, action) => {
            state.notes = action.payload
        },
        setSaving: (state) => {
            state.isSaving = true
            state.messageSaved = ``

        },
        updatedNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if (note.id === action.payload.id) {
                    return action.payload
                }
                return note
            })
            state.messageSaved = `${action.payload.title}, updated correclty`
        },
        deleteNote: (state, action) => {
            state.activeNote = null
            state.notes = state.notes.filter(note => note.id !== action.payload)
         },
        setPhotosToNote: (state, action) =>{
            state.activeNote.imageUrls = [... state.activeNote.imageUrls, ...action.payload]
            state.isSaving = false
        },
        clearOnLogout:(state)=>{
            state.isSaving = false
            state.messageSaved= ""
            state.notes=[]
            state.activeNote= null
        }
    }
})

export const { addNewNote, setActiveNote, setNotes, setSaving, updatedNote, deleteNote, savingNewNote, setPhotosToNote, clearOnLogout } = journalSlice.actions