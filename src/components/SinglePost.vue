<template>
    <div class="post">
        <router-link :to="`/post/${post.id}`"><h3>{{post.title}}</h3></router-link>
        <div class="post__img">
            <img v-if="post.imgUrl" :src="post.imgUrl" :alt="post.title">
        </div>
        <p>{{slicedWords}}</p>
        <router-link v-for="tag in post.tags" :key="tag" :to="`/tags/${tag}`">
            <span>#{{tag}}</span>
        </router-link>
        <button v-if="isAdmin" class="post__deleteBtn" @click="handleDeletePost(post.id)">delete post</button>
    </div>
</template>

<script>
    import {ref, reactive} from "@vue/reactivity"
    import {computed} from "@vue/runtime-core";
    import {usePost} from "@/composables/usePost";

    export default {
        props: ['post', 'isAdmin'],
        setup(props, context) {
            const {deletePost} = usePost()
            const slicedWords = computed(() => {
                return props.post.description.slice(0, 100) + "..."
            })
            const handleDeletePost = async (postId) => {
                context.emit('onDelete', postId)
                await deletePost(postId)
            }
            return {slicedWords, deletePost, handleDeletePost}
        }
    }
</script>

<style lang="scss">
    .post {
        position: relative;
        margin: 0 40px 30px;

        &__img{
            margin: 10px 0;
        }

        & img {
            width: 100%;
            height: 350px;
            object-fit: cover;
        }

        button {
            margin: 15px 0 10px;
            cursor: pointer;
            padding: 4px 7px;
        }

        & h3 {
            display: inline-block;
            position: relative;
            font-size: 26px;
            color: #fff;
            max-width: 400px;
        }

        & h3::before {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            background: #2c3e50;
            position: absolute;
            z-index: -1;
            padding-right: 40px;
            left: -30px;
            transform: rotateZ(-1deg);
        }

        & a {
            display: inline-block;
            cursor: pointer;
            margin: 5px 15px 5px 0;
            color: #42b983;
            text-decoration: none;
        }

        &__deleteBtn {
            display: block;
            background: #2c3e50;
            color: #fff;
            border: none;
            padding: 8px 16px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 3px;
        }
    }
</style>