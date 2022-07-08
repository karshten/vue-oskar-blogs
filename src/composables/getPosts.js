import {ref} from "@vue/reactivity";
import {firestore} from "@/firebase/config";
import {getDocs, collection} from "firebase/firestore"

export const getPosts = () => {
    const posts = ref([]);
    const error = ref(null)

    const fetchPosts = async () => {
        try {
            const collectionRef = collection(firestore, "posts")
            const response = await getDocs(collectionRef)
            posts.value = response.docs.map(post => (
                {...post.data(), id: post.id}
            )).sort((a,b)=> b.timestamp - a.timestamp)
            error.value = null
        } catch (err) {
            error.value = err.message
        }
    }
    return {posts, error, fetchPosts};
}