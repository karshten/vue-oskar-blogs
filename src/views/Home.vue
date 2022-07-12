<template>
    <button class="signBtn">
        <router-link class="formLink" v-if="!isLoggedIn" :to="'/login'">Log In</router-link>
    </button>
    <button v-if="isLoggedIn" @click="handleSignOutClick" class="signBtn">sign out</button>
    <h3 v-if="errorPosts">{{errorPosts}}</h3>
    <h3 v-if="errorSignOut">{{errorSignOut}}</h3>
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
    import {onAuthStateChanged} from "firebase/auth";
    import {useSignOut} from "@/composables/useSignOut";
    import {auth} from "@/firebase/config.js"
    import router from '@/router/index.js';

    export default {
        components: {PostsList, Spinner, TagsCloud},
        setup() {
            const {posts, errorPosts, fetchPosts} = getPosts()
            const isLoggedIn = ref(false)
            const isAdmin = ref(false)
            const currentAuthEmail = ref('')

            const {handleSignOut, errorSignOut} = useSignOut()

            const handleSignOutClick = async () => {
                await handleSignOut()
                window.location.reload()
                router.push('/')
            }

            onMounted(() => {
                fetchPosts()
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        currentAuthEmail.value = user.email
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
                posts.value = computed(() => posts.value.filter(item => item.id !== postId)).value
            }

            return {
                posts,
                errorPosts,
                errorSignOut,
                isAdmin,
                isLoggedIn,
                handleDeletedPosts,
                handleSignOutClick
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

    .formLink {
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