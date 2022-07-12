import {ref} from "@vue/reactivity";
import {firestore} from "@/firebase/config";
import {getDocs, collection} from "firebase/firestore"

export const getPosts = () => {
    const posts = ref([]);
    const errorPosts = ref(null)

    const fetchPosts = async () => {
        try {
            const collectionRef = collection(firestore, "posts")
            const response = await getDocs(collectionRef)
            posts.value = response.docs.map(post => (
                {...post.data(), id: post.id}
            )).sort((a,b)=> b.timestamp - a.timestamp)
            errorPosts.value = null
        } catch (err) {
            errorPosts.value = err.message
        }
    }
    return {posts, errorPosts, fetchPosts};
}