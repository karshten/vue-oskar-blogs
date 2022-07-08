<template>
    <div class="spin"></div>
</template>

<style scoped>
    .spin{
        display: block;
        width: 40px;
        height: 40px;
        margin: 30px auto;
        border: 3px solid transparent;
        border-radius: 50%;
        border-top-color: #2c3e50;
        animation: rotation 0.8s ease-in-out infinite;
    }
    @keyframes rotation {
        0% {
            transform: rotateZ(0);
        }
        100% {
            transform: rotateZ(360deg);
        }
    }
</style>