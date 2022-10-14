
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',
        component: () => import('pages/Index.vue') 
      },
      { path: '/CrearNuevoPeriodo',
        name: "CrearNuevoPeriodo",
        component: () => import('app/src/pages/CrearNuevoPeriodo.vue') 
      },
      {
        path: '/DetallePeriodo/:id/:anioactual',
        name: 'DetallePeriodo',
        component: () => import('app/src/pages/DetallePeriodo.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
