<template>
    <div class="posts-list">
        <template v-for="post in posts" :key="post">
            <SinglePost :post="post" :is-admin="isAdmin" @onDelete="handleDelete"/>
        </template>
    </div>
</template>

<script>
    import SinglePost from "@/components/SinglePost";

    export default {
        props: ['posts', 'isAdmin'],
        components: {SinglePost},
        setup(props, context) {
            const handleDelete = (postId) => {
                context.emit('onDelete', postId)
            }
            return {handleDelete}
        }
    }
</script>

<style scoped>
    .posts-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 745px){
        .posts-list {
            display: block;
        }
    }
</style>