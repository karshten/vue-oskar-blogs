<template>
    <div v-if="error">{{error}}</div>
    <div v-if="filteredTags.length" class="grid">
        <PostsList :posts="filteredTags"/>
        <TagsCloud :posts="posts"/>
    </div>
    <div v-else>
        <Spinner/>
    </div>
</template>

<script>
    import {ref, reactive} from 'vue'
    import {useRoute} from "vue-router"
    import {computed, onMounted} from "@vue/runtime-core";
    import {getPosts} from "@/composables/getPosts"
    import Spinner from "@/components/Spinner"
    import PostsList from "@/components/PostsList";
    import TagsCloud from "@/components/TagsCloud";

    export default {
        components: {Spinner, PostsList, TagsCloud},
        setup() {
            const route = useRoute()
            const tag = computed(() => route.params.id)
            const {posts, error, fetchPosts} = getPosts()
            onMounted(() => {
                fetchPosts()
            })
            const filteredTags = computed(() => {
                return posts.value.filter(post => post.tags.includes(tag.value))
            })
            return {error, posts, filteredTags}
        }
    }
</script>

<style scoped>

</style>