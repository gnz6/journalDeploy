import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../slices/auth/authSlice"
import { journalSlice } from "../slices/journal/journalSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        journal: journalSlice.reducer
    }
}) 