import AppLayout from "@/layouts/AppLayout";

const routes = [
    {
        path: '/playlists',
        component: AppLayout,
        name: 'playlists',
        meta: {
            title: 'Playlists',
            icon: 'folder'
        },
        children: [
            {
                path: 'list',
                component: () => import('./List'),
                name: 'playlistList',
                meta: {
                    title: 'Playlist list',
                }
            },
            {
                path: 'create',
                component: () => import('./Form'),
                name: 'playlistCreate',
                meta: {
                    title: 'Create playlist'
                }
            },
            {
                path: 'edit/:id',
                component: () => import('./Form'),
                name: 'playlistEdit',
                meta: {
                    title: 'Edit playlist',
                    hidden: true
                }
            },
            {
                path: 'detail/:id',
                component: () => import('./Detail'),
                name: 'playlistDetail',
                meta: {
                    title: 'Playlist detail',
                    hidden: true
                }
            }
        ]
    }
]

export default routes;