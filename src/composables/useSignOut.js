import {getAuth, signOut} from "firebase/auth"
import {useRouter} from "vue-router"

export const useSignOut = () => {
    let auth;
    const router = useRouter()
    const handleSignOut = async () => {
        auth = getAuth()
        await signOut(auth).then(res => {
            router.push('/')
        })
        alert('Successfully signed out')
        window.location.reload()
    }
    return {handleSignOut}
}