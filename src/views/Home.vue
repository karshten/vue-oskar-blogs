<template>
    <button class="signBtn"><router-link v-if="!isLoggedIn" :to="'/login'">Log In</router-link></button>
    <button v-if="isLoggedIn" @click="handleSignOut" class="signBtn">sign out</button>
    <div v-if="error">{{error}}</div>
    <div v-if="posts.length" class="grid">
        <PostsList :posts="posts" :is-admin="isAdmin" @onDelete="handleDeletedPosts"/>
        <TagsCloud :posts="posts"/>
    </div>
    <div v-else>
        <Spinner/>
    </div>
</template>

<script>
    import {onMounted, computed} from "@vue/runtime-core";
    import Spinner from "@/components/Spinner"
    import PostsList from "@/components/PostsList";
    import {getPosts} from "@/composables/getPosts"
    import TagsCloud from "@/components/TagsCloud";
    import {ref} from "vue"
    import {getAuth, onAuthStateChanged} from "firebase/auth";
    import {useSignOut} from "@/composables/useSignOut";

    export default {
        components: {PostsList, Spinner, TagsCloud},
        setup() {
            const {posts, error, fetchPosts} = getPosts()
            const isLoggedIn = ref(false)
            const isAdmin = ref(false)
            const currentAuthEmail = ref('')
            let auth;
            const {handleSignOut} = useSignOut()

            onMounted(() => {
                fetchPosts()
                auth = getAuth()
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        currentAuthEmail.value = user?.email
                        console.log(currentAuthEmail.value)
                        isLoggedIn.value = true
                    } else {
                        isLoggedIn.value = false
                    }
                    if (currentAuthEmail.value === "oskar.shtefan@gmail.com") {
                        isAdmin.value = true
                    }
                })
            })

            const handleDeletedPosts = (postId) => {
                const filteredPosts = computed(() => posts.value.filter(item => item.id !== postId))
                posts.value = filteredPosts.value
            }

            return {
                posts,
                error,
                isAdmin,
                isLoggedIn,
                handleDeletedPosts,
                handleSignOut
            }
        }
    }
</script>

<style lang="scss">
    .grid {
        display: grid;
        grid-template-columns: 3fr 1fr;
        gap: 20px;
    }

    a {
        color: #fff;
        text-decoration: none;
        margin-right: 20px;
    }

    button {
        background: #2c3e50;
        color: #fff;
        border: none;
        padding: 4px 12px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 3px;
    }

    .signBtn {
        position: absolute;
        top: -40px;
        right: 0;
    }

    @media (max-width: 785px) {
        .grid {
            display: flex;
            flex-direction: column-reverse;
            flex-wrap: wrap;
        }

        .signBtn {
            top: -80px;
        }
    }
</style>