import {ref} from "@vue/reactivity";
import {firestore} from "@/firebase/config";
import {getDoc, doc} from "firebase/firestore"

export const getPost = (id) => {
    const post = ref(null);
    const error = ref(null)

    const fetchPost = async () => {
        try {
            const docRef = doc(firestore, 'posts', id)
            const response = await getDoc(docRef)
            post.value = response.data()
            error.value = null
        }
        catch (err) {
            error.value = err.message
        }
    }
    return {post, error, fetchPost};
}