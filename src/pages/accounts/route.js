import AppLayout from "@/layouts/AppLayout";

const routes = [
    {
        path: '/accounts',
        component: AppLayout,
        name: 'accounts',
        meta: {
            title: 'Accounts',
            icon: 'user'
        },
        children: [
            {
                path: 'list',
                component: () => import('./List'),
                name: 'accountList',
                meta: {
                    title: 'Account list',
                }
            },
            {
                path: 'create',
                component: () => import('./Form'),
                name: 'accountCreate',
                meta: {
                    title: 'Create account'
                }
            },
            {
                path: 'edit/:id',
                component: () => import('./Detail'),
                name: 'accountEdit',
                meta: {
                    title: 'Edit account',
                    hidden: true
                }
            }
        ]
    }
]

export default routes;