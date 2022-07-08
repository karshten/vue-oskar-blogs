<template>
    <Navbar/>
    <div class="container">
        <router-view/>
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar";

    export default {
        components: {Navbar},
    }
</script>

<style lang="scss">
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    .container {
        position: relative;
        max-width: 1100px;
        margin: auto;
    }

    nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

    @media (max-width: 1200px) {
        .container {
            margin: 0 30px;
        }
    }
</style>