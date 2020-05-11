import Home from "./components/users/formLogin.vue"
import ToDo from "./components/todoList.vue"
import Loggedin from "./components/users/loggedin.vue"
import Vue from 'vue'
import VueRouter from 'vue-router'
import firebaseApp from 'firebase'

export const routes = [
    {
        path: "/",
        name: 'home',
        component: Home
    },
    {
        path: '/todo',
        name: 'todo',
        component: ToDo,
        meta: { requiresAuth: true }
    },
    {
        path: '/loggedin',
        name: 'loggedin',
        component: Loggedin,
        // meta: { requiresAuth: true }
    },
]

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes
})



router.beforeEach((to, from, next) => {

    // const isAuthenticated = firebaseApp.auth().currentUser;

    // check the route records
    // const auth = to.matched.some(record => {
    //     console.log(record);
    // })

    // confirm which route contains the meta
    if (to.matched.some(record => record.meta.requiresAuth)) {

        // if (!isAuthenticated) {
        // next('/')
        // }
        // else {
        //     console.log('login success !');
        //     next()
        // }
        firebaseApp.auth().onAuthStateChanged((user) => {
            if(!user) {
                next('/')
            }
            else {
                // router.push("/todo")
                next()
            }
        })
    }
    else {
        // console.log('first');
        next()
    }
})

export default router

