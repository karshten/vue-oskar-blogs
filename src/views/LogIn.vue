<template>
    <form @submit.prevent="handleSignIn(login, email, password)" class="login-form">
        <h2>Log in</h2>
        <h3 v-if="errorLogin">{{errorLogin}}</h3>
        <div class="login-form__input-wrap">
            <label for="">type @email</label>
            <input v-model="email" required placeholder="type your email..." type="email">
        </div>
        <div class="login-form__input-wrap">
            <label for="">type password</label>
            <input v-model="password" required placeholder="type your password..." type="password">
        </div>
        <div class="login-form__btnsWrap">
            <button v-if="!isPending" class="login__form__submitBtn">log in</button>
            <button v-if="!isPending" @click="handleSignIn(signInWithGoogle, email, password)" class="login__form__submitBtn">with google</button>
            <button v-else class="login__form__submitBtn" disabled>loading...</button>
        </div>
        <span>if you dont't have an account click here to</span>
        <router-link :to="{name: 'Register'}">register</router-link>
    </form>
</template>

<script>
    import {ref} from 'vue'
    import {useLogIn} from "@/composables/useLogin";
    import {useRouter} from "vue-router"

    export default {
        setup() {
            const isPending = ref(false)
            const email = ref('')
            const password = ref('')

            const router = useRouter()

            const {login, signInWithGoogle, errorLogin} = useLogIn()
            const handleSignIn = async (func, email, password) =>{
                await func(email, password)
                router.push('/')
            }

            return {
                isPending,
                email,
                password,
                errorLogin,
                login,
                signInWithGoogle,
                handleSignIn
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