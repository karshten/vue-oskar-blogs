import {createRouter, createWebHistory} from 'vue-router'
import {getAuth, onAuthStateChanged} from "firebase/auth"
import Home from "@/views/Home";
import Details from "@/views/Details";
import Create from "@/views/Create";
import Tags from "@/views/Tags"
import LogIn from "@/views/LogIn";
import Register from "@/views/Register";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/post/:id',
        name: 'Details',
        component: Details,
        props: true
    },
    {
        path: '/tags/:id',
        name: "Tags",
        component: Tags,
        props: true
    },
    {
        path: '/create',
        name: 'Create',
        component: Create,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: LogIn,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(getAuth(), (user) => {
                removeListener()
                resolve(user)
            },
            reject
        )
    })
}

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next()
        } else {
            alert('you dont have access!')
            next('/')
        }
    } else {
        next()
    }
});

export default router