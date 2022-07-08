import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
} from "firebase/auth"
import {ref} from "vue"
import {useRouter} from "vue-router"

export const useLogIn = () => {
    const error = ref(null)
    const router = useRouter()

    const login = (email, password) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log('Successfully loged in')
                console.log(response)
                console.log(auth.currentUser)
                router.push('/')
            })
            .catch(err => {
                console.log(err.message, err.code)
                switch (err.code) {
                    case "auth/invalid-email":
                        error.value = "Invalid email"
                        break
                    case "auth/user-not-found":
                        error.value = "user not found"
                        break
                    case "auth/wrong-password":
                        error.value = "Incorrect password "
                        break
                    default:
                        error.value = "Email or password was incorrect"
                        break
                }
            })
    }
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(getAuth(), provider)
            .then(response => {
                console.log(response)
                router.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }
    return {login, signInWithGoogle, error}
}