import { GoogleAuthProvider } from "firebase/auth"
import { loginUser, registerUser, signInWithGoogle, signOutFirebase } from "../../../firebase/provider"
import { checkingCredentials, login, logout } from "./authSlice"
import { async } from "@firebase/util"
import { clearOnLogout } from "../journal/journalSlice"

export const checkingAuth = ({email, password}) =>{
    return async(dispatch) =>{
        dispatch(checkingCredentials())
    }
}

export const googleSignIn =()=>{
    return async (dispatch)=>{
        dispatch(checkingCredentials())
        const result = await signInWithGoogle()
        if( !result.ok) return dispatch(logout( result.errorMessage ))
        dispatch( login( result ))
          
    }
}

export const registerUserWithEmailAndPassword =(email, password, displayName)=>{
    return async ( dispatch )=>{
        dispatch(checkingCredentials() )
        const resp = await registerUser(email, password, displayName)
        if(!resp.ok) {
           return dispatch( logout(resp.errorMessage))}
        dispatch(login(resp))
    }
}


export const loginUserWithEmail = (email, password) =>{
    return async (dispatch)=>{
        dispatch(checkingCredentials())
        const resp = await loginUser(email, password)
        if(!resp.ok) return dispatch(logout( resp.errorMessage))
        dispatch(login(resp))
    }
}

export const logoutUser =()=>{
    return async(dispatch)=>{
        await signOutFirebase()
        dispatch(clearOnLogout())
        dispatch(logout())
    }
}