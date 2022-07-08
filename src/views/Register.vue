<template>
    <form @submit.prevent="" class="login-form">
        <h2>Register</h2>
        <h3 v-if="error"></h3>
        <div class="login-form__input-wrap">
            <label for="">type @email</label>
            <input v-model="email" placeholder="type your email..." type="email">
        </div>
        <div class="login-form__input-wrap">
            <label for="">type password</label>
            <input v-model="password" placeholder="type your password..." type="password">
        </div>
        <div class="login-form__btnsWrap">
            <button v-if="!isPending" @click="register(email, password)" class="login__form__submitBtn">register</button>
            <button v-if="!isPending" @click="signInWithGoogle" class="login__form__submitBtn">with google</button>
            <button v-else class="login__form__submitBtn" disabled>loading...</button>
        </div>

        <span>if you already have an account click here to</span>
        <router-link :to="{name: 'Login'}">log in</router-link>
    </form>
</template>

<script>
    import {ref} from 'vue'
    import {useRegister} from "@/composables/useRegister";

    export default {
        setup() {
            const isPending = ref(false)
            const email = ref('')
            const password = ref('')

            const {register, signInWithGoogle, error} = useRegister()

            return {
                isPending,
                email,
                password,
                error,
                register,
                signInWithGoogle
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login-form {
        & h2 {
            text-align: center;
        }

        & a {
            margin-left: 15px;
        }

        input {
            display: block;
            margin: 10px 0;
            width: 100%;
            box-sizing: border-box;
            padding: 10px;
            border: 1px solid #2c3e50;
        }

        label {
            display: inline-block;
            margin-top: 30px;
            position: relative;
            font-size: 20px;
            color: #fff;
            margin-bottom: 10px;
            padding: 2px 0;
        }

        label::before {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            background: #2c3e50;
            position: absolute;
            top: 0;
            z-index: -1;
            padding-right: 40px;
            left: -10px;
            transform: rotateZ(-2deg);
        }

        button {
            display: block;
            margin: 20px 20px 20px 0;
            background: #2c3e50;
            color: #fff;
            border: none;
            padding: 6px 16px;
            font-size: 18px;
            cursor: pointer;
            border-radius: 3px;
        }

        &__submitBtn {
            margin: 35px 0;

            &:disabled {
                opacity: .3;
            }
        }

        &__btnsWrap {
            display: flex;
        }

        @media (max-width: 554px) {
            .login-form button {
                padding: 10px;
                font-size: 13px;
            }
        }
    }
</style>