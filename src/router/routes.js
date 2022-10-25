
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
      {
        path: '/VerPeriodo/:id/:anioactual',
        name: 'VerPeriodo',
        component: () => import('app/src/pages/VerPeriodo.vue')
      },
      {
        path: '/ModificarPeriodo/:id/:anioactual',
        name: 'ModificarPeriodo',
        component: () => import('app/src/pages/ModificarPeriodo.vue')
      },
      {
        path: '/MostrarRatios/:id/:anioactual',
        name: 'MostrarRatios',
        component: () => import('app/src/pages/MostrarRatios.vue')
      },
      {
        path: '/ReporteBalance/:id/:anioactual',
        name: 'ReporteBalance',
        component: () => import('app/src/pages/ReporteBalance.vue')
      },
      {
        path: '/ReporteEstadoRes/:id/:anioactual',
        name: 'ReporteEstadoRes',
        component: () => import('app/src/pages/ReporteEstadoRes.vue')
      },
      {
        path: '/ReporteVerticalBG/:id/:anioactual',
        name: 'ReporteVerticalBG',
        component: () => import('app/src/pages/ReporteVerticalBG.vue')
      },
      {
        path: '/ReporteVerticalER/:id/:anioactual',
        name: 'ReporteVerticalER',
        component: () => import('app/src/pages/ReporteVerticalER.vue')
      },
      {
        path: '/ReporteDupont/:id/:anioactual',
        name: 'ReporteDupont',
        component: () => import('app/src/pages/ReporteDupont.vue')
      },
      {
        path: '/ReporteHorizontalBG/:id/:anioactual',
        name: 'ReporteHorizontalBG',
        component: () => import('app/src/pages/ReporteHorizontalBG.vue')
      },
      {
        path: '/ReporteHorizontalER/:id/:anioactual',
        name: 'ReporteHorizontalER',
        component: () => import('app/src/pages/ReporteHorizontalER.vue')
      },
      {
        path: '/ratiosGeneral',
        name: 'ratiosGeneral',
        component: () => import('app/src/pages/ratiosGeneral.vue')
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
