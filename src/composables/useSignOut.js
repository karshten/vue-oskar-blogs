import {signOut} from "firebase/auth"
import {auth} from "@/firebase/config";

export const useSignOut = () => {
    const handleSignOut = async () => {
        await signOut(auth)
            .catch(err => error.value = err.message)
        window.location.reload()
    }
    return {handleSignOut}
}