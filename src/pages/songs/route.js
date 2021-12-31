import AppLayout from "@/layouts/AppLayout";

const routes = [
    {
        path: '/songs',
        component: AppLayout,
        name: 'songs',
        meta: {
            title: 'Songs',
            icon: 'file'
        },
        children: [
            {
                path: 'list',
                component: () => import('./List'),
                name: 'songList',
                meta: {
                    title: 'Song list',
                }
            },
            {
                path: 'create',
                component: () => import('./Form'),
                name: 'songCreate',
                meta: {
                    title: 'Create song'
                }
            },
            {
                path: 'edit/:id',
                component: () => import('./Form'),
                name: 'songEdit',
                meta: {
                    title: 'Edit song',
                    hidden: true
                }
            }
        ]
    }
]

export default routes;