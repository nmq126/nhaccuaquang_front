const routes = [
    {
        path: '/login',
        component: () => import('./Form'),
        name: 'login',
        meta: {
            title: 'Login',
            icon: 'file',
            hidden: true
        },
    }
]
export default routes;