import {ref} from 'vue'
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth"
import {auth} from "@/firebase/config";

export const useRegister = () => {
    const errorRegister = ref(null)

    const register = async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password)
            .catch(err => errorRegister.value = err.message)
    }

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(getAuth(), provider)
            .catch(err => {errorRegister.value = err.message})
    }

    return {register, signInWithGoogle, errorRegister}
}