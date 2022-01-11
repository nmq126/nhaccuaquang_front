import AppLayout from "@/layouts/AppLayout";

const routes = [
    {
        path: '/roles',
        component: AppLayout,
        name: 'roles',
        meta: {
            title: 'Roles',
            icon: 'user'
        },
        children: [
            {
                path: 'list',
                component: () => import('./List'),
                name: 'roleList',
                meta: {
                    title: 'Role list',
                }
            },
            {
                path: 'create',
                component: () => import('./Form'),
                name: 'roleCreate',
                meta: {
                    title: 'Create role'
                }
            },
            {
                path: 'edit/:id',
                component: () => import('./Form'),
                name: 'roleEdit',
                meta: {
                    title: 'Edit role',
                    hidden: true
                }
            }
        ]
    }
]

export default routes;