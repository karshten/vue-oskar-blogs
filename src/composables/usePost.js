import {ref} from "@vue/reactivity";
import {firestore} from "@/firebase/config";
import {addDoc, collection, doc, deleteDoc, Timestamp} from "firebase/firestore"

export const usePost = () => {
    const createPost = async (post) => {
        const error = ref(null)
        post.timestamp = Timestamp.now().seconds

        try {
            const collectionRef = collection(firestore, 'posts')
            await addDoc(collectionRef, post)
            error.value = null
        }
        catch (err) {
            error.value = err.message
        }
        return {error}
    }

    const deletePost = async (postId) =>{
        const docRef = doc(firestore, 'posts', postId)
        await deleteDoc(docRef)
    }
    return {createPost, deletePost}
}