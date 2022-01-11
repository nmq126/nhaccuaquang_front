import Vue from 'vue'
import VueRouter from 'vue-router'
import {songsRoutes} from "@/pages/songs";
import {playlistsRoutes} from "@/pages/playlists";
import {loginRoutes} from "@/pages/login";
import {accountRoutes} from "@/pages/accounts";
import {roleRoutes} from "@/pages/roles";

Vue.use(VueRouter)

const routes = [
    ...songsRoutes,
    ...playlistsRoutes,
    ...loginRoutes,
    ...accountRoutes,
    ...roleRoutes
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    let token = localStorage.getItem('token');
    if (to.name !== 'login' && !token) {
        next({ name: 'login' });
    }
    else {
        next();
    }
})

export default router;