<template>
    <header>
        <nav class="container">
            <router-link :to="{name:'Home'}">Main</router-link>
            <router-link :to="'/create'">Create post</router-link>
        </nav>
    </header>
</template>

<script>

    export default {

    }
</script>

<style scoped>
    a {
        color: #2c3e50;
        text-decoration: none;
        margin-right: 20px;
    }

    @media (max-width: 780px) {
        header {
            margin: 25px 0;
        }
    }
</style>