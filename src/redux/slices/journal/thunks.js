import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore/lite";
import { FireBaseDB } from "../../../firebase/config";
import { addNewNote, savingNewNote, setActiveNote, setNotes, setSaving, updatedNote, setPhotosToNote, deleteNote } from "./journalSlice";
import { async } from "@firebase/util";
import { loadNotes } from "../../../helper/loadNotes";
import { fileUpload } from "../../../helper/fileUpload";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote())
        const { uid } = getState().auth;

        const newNote = {
            date: new Date().getTime(),
            title: "",
            body: "",
            imageUrls:  []
        }

        const newDocument = doc(collection(FireBaseDB, `${uid}/journal/notes`))
        await setDoc(newDocument, newNote)

        newNote.id = uid

        dispatch(addNewNote(newNote))
        dispatch(setActiveNote(newNote))

    }
}

export const loadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth
        if (!uid) throw new Error("El ID del usuario no existe")
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}

export const startSavedNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving())
        const { uid } = getState().auth
        const { activeNote } = getState().journal

        const fireStoreNote = { ...activeNote }
        delete fireStoreNote.id;
        const docRef = doc(FireBaseDB, `${uid}/journal/notes/${activeNote.id}`)
        await setDoc(docRef, fireStoreNote, { merge: true })

        dispatch(updatedNote(activeNote))
    }
}


export const uploadFile = (files = []) => {
    return async (dispatch, getState) => {
        dispatch(setSaving())

        const fileUploadPromises = []
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }
        const photosUrl = await Promise.all(fileUploadPromises)
        dispatch(setPhotosToNote(photosUrl))
    }
}


export const startDeleteNote = ()=>{
    return async(dispatch, getState) =>{

        const {uid} = getState().auth
        const {activeNote} = getState().journal

        const docRef = doc(FireBaseDB, `${uid}/journal/notes/${activeNote}`)
        await deleteDoc(docRef)
        dispatch(deleteNote(activeNote.id))
    }
}