<template>
    <div class="tags-cloud">
        <div v-for="tag in tags" :key="tag">
            <router-link :to="`/tags/${tag}`">#{{tag}}</router-link>
        </div>
    </div>
</template>

<script>
    import {useTags} from "@/composables/useTags";

    export default {
        props: ["posts"],
        setup(props) {
            const {tags} = useTags(props.posts)

            return {tags}
        }
    }
</script>

<style scoped>
    .tags-cloud {
        padding: 10px;
    }

    .tags-cloud div {
        display: inline-block;
        padding: 10px;
    }

    .tags-cloud a {
        color: #42b983;
        text-decoration: none;

    }

    .tags-cloud a.router-link-active {
        color: #2c3e50;
        font-weight: bold;
    }
</style>