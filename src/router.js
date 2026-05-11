import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    redirect: '/projects',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue'),
    meta: { guestOnly: true, title: 'Log in' },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterPage.vue'),
    meta: { guestOnly: true, title: 'Create account' },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsPage.vue'),
    meta: { requiresAuth: true, title: 'ProjectsPage' },
  },
  {
    path: '/projects/:id(\\d+)',
    name: 'project-detail',
    component: () => import('@/views/ProjectDetailPage.vue'),
    props: (route) => ({ id: Number(route.params.id) }),
    meta: { requiresAuth: true, title: 'Project' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
    redirect: '/projects',
  },
]

@@ -24,4 +41,14 @@ const router = createRouter({
  routes,
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  // if (to.meta.guestOnly && isAuth) {
  //   return { name: 'projects' }
  // }
})

export default router