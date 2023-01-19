import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { onAuthStateChanged } from 'firebase/auth';
import { FireBaseAuth } from '../firebase/config';
import { login, logout } from '../redux/slices/auth/authSlice';
import { loadingNotes } from "../redux/slices/journal/thunks";


export const useCheckout = () => {

    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        onAuthStateChanged(FireBaseAuth, async (user) => {
            if (!user) return dispatch(logout())
            const { uid, email, displayName, photoURL } = user
            dispatch(login({ uid, email, displayName, photoURL }))
            dispatch(loadingNotes())
        })
    }, [])

    return {
        status
    }
}
