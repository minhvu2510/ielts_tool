import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/login'
import authen from '@/views/login/authen'
import addons from '@/views/addon/addon'
import history from '@/views/history/history'
import layout from '@/views/layout/Layout'
import add_vocabulary from '@/views/add_vocabulary/index'
import topic from '@/views/topic/topic'
import topic_element from '@/views/topic/element/index'
import confuse from '@/views/confuse/confuse'
import difficult from '@/views/difficult/difficult'
import topics from '@/views/topics/topics'
import dashboard from '@/views/dashboard/index'
// import hot_ac from '@/views/Hotlines_ac/Hotlines_ac'
import loading from '@/views/loading/index'
import chose from '@/views/chose_en/chose_en'
import getall from '@/views/showAll/showAll'
import memo from '@/views/memo/memo'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/loading', component: _import('loading/index'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '/dashboard',
    component: layout,
    redirect: '',
    hidden: true,
    children: [{
      path: '',
      component: dashboard,
      name: 'tracking-tong-dai-cskh',
      meta: {
        title: 'Giám sát cuộc gọi',
        noCache: true,
        roles: ['owner', 'monitor_manage']
      }
    }]
  },
  {
    path: '/addons',
    component: layout,
    redirect: '',
    hidden: true,
    children: [{
      path: '',
      component: addons
    }]
  },
  {
    path: '/addVocabulary',
    component: layout,
    redirect: '',
    hidden: true,
    children: [{
      path: '',
      component: add_vocabulary
    }]
  },
  {
    path: '/topic/:nameTopic',
    component: layout,
    redirect: '',
    hidden: true,
    children: [{
      path: '',
      component: topic_element
    }]
  },
  {
    path: '/topic',
    component: layout,
    redirect: '',
    hidden: true,
    children: [{
      path: '',
      component: topic
    }]
  },
  {
    path: '/difficult',
    component: layout,
    redirect: '',
    hidden: true,
    children: [{
      path: '',
      component: difficult
    }]
  },
  {
    path: '/topics',
    component: layout,
    redirect: '',
    hidden: true,
    children: [{
      path: '',
      component: topics
    }]
  },
  {
    path: '/confuse',
    component: layout,
    redirect: '',
    hidden: true,
    children: [{
      path: '',
      component: confuse
    }]
  },
  {
    path: '/chose',
    component: layout,
    redirect: '',
    hidden: true,
    children: [{
      path: '',
      component: chose
    }]
  },
  {
    path: '/history',
    component: layout,
    redirect: '',
    hidden: true,
    children: [{
      path: '',
      component: history
    }]
  },
  {
    path: '/showAll',
    component: layout,
    redirect: '',
    hidden: true,
    children: [{
      path: '',
      component: getall
    }]
  },
  // {
  //   path: '/hotline_account/:id',
  //   component: layout,
  //   redirect: '',
  //   hidden: true,
  //   children: [{
  //     path: '',
  //     component: hot_ac
  //   }]
  // },
  {
    path: '',
    component: layout,
    redirect: '/dashboard',
    hidden: true
  },
  {
    path: '/loading',
    component: loading,
    redirect: '',
    hidden: true
  },
  {
    path: '/memo',
    component: layout,
    redirect: '',
    hidden: true,
    children: [{
      path: '',
      component: memo
    }]
  },
  {
    path: '*',
    redirect: '/'
  },
  { path: '/login', component: login, hidden: true, props: true },
  { path: '/register', component: authen, hidden: true, props: true }
  // { path: '/dashboard', component: _import('layout/Layout'), hidden: true }
]

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history', // require service support, comment this line to use hashHistory
  scrollBehavior: () => ({ y: 0 }),
  linkActiveClass: 'is-active',
  routes: constantRouterMap
})
