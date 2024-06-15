import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { appRoutes, type RouteLink, type RouteDivider, type RouteGroup } from '@/router/appRoutes'

function generateRoutes(builder: Array<RouteRecordRaw>, routes: Array<RouteLink | RouteDivider | RouteGroup>) {
  routes.forEach((route) => {
    if (route.type === 'link') {
      builder.push({
        name: route.name,
        path: route.path,
        component: () => import( /* @vite-ignore */ route.filePath)
      })
    }
    if (route.type === 'group' && route.hasOwnProperty('children')) {
      generateRoutes(builder, route.children)
    }
  })
}

const routes: Array<RouteRecordRaw> = []
generateRoutes(routes, appRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
