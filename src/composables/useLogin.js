import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth"
import {ref} from "vue"
import {auth} from "@/firebase/config";

export const useLogIn = () => {
    const errorLogin = ref(null)

    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .catch(err => {
                switch (err.code) {
                    case "auth/invalid-email":
                        errorLogin.value = "Invalid email"
                        break
                    case "auth/user-not-found":
                        errorLogin.value = "user not found"
                        break
                    case "auth/wrong-password":
                        errorLogin.value = "Incorrect password "
                        break
                    default:
                        errorLogin.value = "Email or password was incorrect"
                        break
                }
            })
    }
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .catch(err => {
                errorLogin.value = err.message
            })
    }
    return {login, signInWithGoogle, errorLogin}
}