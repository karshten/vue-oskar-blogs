<template>
    <div v-if="error"><h3>{{error}}</h3></div>
    <div v-if="post" class="details">
        <div class="post ">
            <h3>{{post.title}}</h3>
            <div class="post__img">
                <img v-if="post.imgUrl" :src="post.imgUrl" :alt="post.title">
            </div>
            <p>{{post.description}}</p>
            <router-link v-for="tag in post.tags" :key="tag" :to="`/tags/${tag}`">
                <span>#{{tag}}</span>
            </router-link>
        </div>
    </div>
    <div v-else>
        <Spinner/>
    </div>
</template>

<script>
    import {getPost} from "@/composables/getPost";
    import {onMounted} from "@vue/runtime-core";
    import Spinner from "@/components/Spinner"

    export default {
        props: ['id'],
        components: {Spinner},
        setup(props) {
            const {post, error, fetchPost} = getPost(props.id)
            onMounted(() => {
                fetchPost()
            })
            return {post, error}
        }
    }
</script>

<style scoped lang="scss">
    .details {
        &__img {
            margin: 25px 0;
        }

        & img {
            height: auto;
        }
    }

    .post {

        &
        h3 {
            display: inline-block;
            position: relative;
            font-size: 26px;
            color: #fff;
            margin-bottom: 10px;
            max-width: 400px;
        }

        &
        h3::before {
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

        &
        span {
            cursor: pointer;
            margin-right: 30px;
        }

        & p {
            font-size: 20px;
        }
    }
</style>