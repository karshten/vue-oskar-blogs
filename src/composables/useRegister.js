import {ref} from 'vue'
import {useRouter} from "vue-router"
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth"

export const useRegister = () => {
    const error = ref(null)
    const router = useRouter()

    const register = (email, password) => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log('Successfully register')
                console.log(auth.currentUser)
                console.log(response)
                router.push('/')
            })
            .catch(err => console.log(err))
    }

    const signInWithGoogle = async () => {
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

    return {register, signInWithGoogle, error}
}