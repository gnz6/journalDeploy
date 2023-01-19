import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FireBaseAuth } from "./config";
import { async } from "@firebase/util";

const googlePrivider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FireBaseAuth, googlePrivider)

        const { displayName, email, photoURL, uid } = result.user
        return {
            ok: true,
            email, photoURL, uid, displayName
        }
        
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error)

        return {
            ok: false,
            errorCode, errorMessage, email, credential
        }
    }
}


export const registerUser = async(email, password, displayName) =>{
    try {
        const resp = await createUserWithEmailAndPassword(FireBaseAuth, email, password)
        const { uid, photoURL } = resp.user
        await updateProfile(FireBaseAuth.currentUser, {displayName } )
        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            errorMessage : error.message
        }
    }
}

export const loginUser = async(email, password)=>{
    try {
        const resp = await signInWithEmailAndPassword(FireBaseAuth, email, password)
        const {uid, photoURL, displayName} = resp.user
        return {
            ok: true,
            uid, photoURL, email, displayName
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            errorMessage : error.message
        }
    }
}

export const signOutFirebase = async()=>{
    return await FireBaseAuth.signOut();
}