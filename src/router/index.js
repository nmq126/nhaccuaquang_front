import Vue from 'vue'
import VueRouter from 'vue-router'
import {songsRoutes} from "@/pages/songs";
import {playlistsRoutes} from "@/pages/playlists";

Vue.use(VueRouter)

const routes = [
    ...songsRoutes,
    ...playlistsRoutes
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
})

export default router;