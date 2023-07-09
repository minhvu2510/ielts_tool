// import { fetchHotlines, fetchHotlineByNumber } from '@/api/hotlines'
// import Layout from '@/views/layout/Layout'
// import { handleMenuRoutes } from '@/utils/menu'
//
// const asyncRoutes = {
//   state: {
//     hotlineList: [],
//     routes: []
//   },
//
//   mutations: {
//     SET_HOTLINE_LIST: (state, list) => {
//       state.hotlineList = list
//     },
//     SET_ASYNC_ROUTES: (state, payload) => {
//       state.routes = []
//       // console.log('2 ===========================')
//       // console.log(state.routes)
//       // console.log('2 ===========================')
//       state.routes.push(
//         {
//           path: '',
//           component: Layout,
//           redirect: '',
//           hidden: true,
//           children: [{
//             path: 'tong-dai-van-phong/:id/:number/dashboard',
//             name: 'dashboard-tong-dai-van-phong',
//             meta: {
//               title: 'Dashboard',
//               noCache: true,
//               roles: ['owner', 'view_report']
//             }
//           }]
//         },
//         {
//           path: '',
//           component: Layout,
//           redirect: '',
//           hidden: true,
//           children: [{
//             path: 'tong-dai-van-phong/:id/:number/preview',
//             name: 'dashboard-preview-tong-dai-van-phong',
//             meta: {
//               title: 'Dashboard',
//               noCache: true,
//               roles: ['owner', 'view_report']
//             }
//           }]
//         },
//         {
//           path: '',
//           component: Layout,
//           redirect: '',
//           hidden: true,
//           children: [{
//             path: 'tong-dai-van-phong/:id/:number/tracking',
//             name: 'tracking-tong-dai-van-phong',
//             meta: {
//               title: 'Giám sát cuộc gọi',
//               noCache: true,
//               roles: ['owner', 'monitor_manage']
//             }
//           }]
//         },
//         {
//           path: '',
//           component: Layout,
//           redirect: '',
//           hidden: true,
//           children: [{
//             path: 'tong-dai-cskh/:id/:number/dashboard',
//             name: 'dashboard-tong-dai-cskh',
//             meta: {
//               title: 'Dashboard',
//               noCache: true,
//               roles: ['owner', 'view_report']
//             }
//           }]
//         },
//         {
//           path: '',
//           component: Layout,
//           redirect: '',
//           hidden: true,
//           children: [{
//             path: 'tong-dai-cskh/:id/:number/preview',
//             name: 'dashboard-preview-tong-dai-cskh',
//             meta: {
//               title: 'Dashboard',
//               noCache: true,
//               roles: ['owner', 'view_report']
//             }
//           }]
//         },
//         {
//           path: '',
//           component: Layout,
//           redirect: '',
//           hidden: true,
//           children: [{
//             path: 'tong-dai-cskh/:id/:number/tracking',
//             name: 'tracking-tong-dai-cskh',
//             meta: {
//               title: 'Giám sát cuộc gọi',
//               noCache: true,
//               roles: ['owner', 'monitor_manage']
//             }
//           }]
//         },
//         {
//           path: '',
//           component: Layout,
//           redirect: '',
//           hidden: true,
//           children: [{
//             path: 'tong-dai-van-phong/:id/:number/cau-hinh',
//             name: 'cau-hinh',
//             meta: {
//               title: 'Cài đặt cấu hình',
//               noCache: true,
//               roles: ['owner', 'diaplan_manage']
//             }
//           }]
//         },
//         {
//           path: '',
//           component: Layout,
//           redirect: '',
//           hidden: true,
//           children: [{
//             path: 'tong-dai-cskh/:id/:number/cau-hinh',
//             name: 'service-voice',
//             meta: {
//               title: 'Cài đặt cấu hình',
//               noCache: true,
//               roles: ['owner', 'diaplan_manage']
//             }
//           }]
//         },
//         {
//           path: '',
//           component: Layout,
//           redirect: '',
//           hidden: true,
//           children: [{
//             path: 'tong-dai-cskh/:id/:number/quan-ly-so',
//             name: 'service-voice-contact-numbers',
//             meta: { title: 'Quản lý số liên lạc', noCache: true, roles: ['owner', 'extension_manage'] }
//           }]
//         },
//         {
//           path: '',
//           component: Layout,
//           redirect: '',
//           hidden: true,
//           children: [{
//             path: 'tong-dai-van-phong/:id/:number/quan-ly-so',
//             name: 'office-voice-contact-numbers',
//             meta: {
//               title: 'Quản lý số liên lạc',
//               noCache: true,
//               roles: ['owner', 'extension_manage']
//             }
//           }]
//         },
//         {
//           path: '',
//           component: Layout,
//           redirect: '',
//           hidden: true,
//           children: [{
//             path: 'tong-dai-van-phong/:id/:number/report',
//             name: 'report-hotline-tong-dai-van-phong',
//             meta: {
//               title: 'Thông tin tổng đài',
//               noCache: true,
//               roles: ['owner', 'view_report']
//             }
//           }]
//         },
//         {
//           path: '',
//           component: Layout,
//           redirect: '',
//           hidden: true,
//           children: [{
//             path: 'tong-dai-cskh/:id/:number/report',
//             name: 'report-hotline-tong-dai-cskh',
//             meta: {
//               title: 'Thông tin tổng đài',
//               noCache: true,
//               roles: ['owner', 'view_report']
//             }
//           }]
//         }
//       )
//       if (payload.hotlineCount) {
//         state.routes.unshift(
//           {
//             path: '',
//             component: Layout,
//             redirect: 'dashboard',
//             children: [{
//               name: 'dashboard-main',
//               meta: {
//                 title: 'Dashboard',
//                 icon: 'fas fa-chart-bar fa-fw',
//                 noCache: true
//               }
//             }]
//           },
//           {
//             path: '/quan-ly-thiet-bi',
//             component: Layout,
//             redirect: 'quan-ly-thiet-bi',
//             meta: {
//               roles: ['owner', 'device_manage']
//             },
//             children: [{
//               path: '',
//               name: 'manage-list-voice',
//               meta: {
//                 title: 'Quản lý thiết bị',
//                 icon: 'fas fa-phone-square fa-fw'
//               }
//             }]
//           },
//           {
//             path: '/quan-ly-nguoi-dung',
//             component: Layout,
//             redirect: 'quan-ly-nguoi-dung',
//             meta: {
//               title: 'Quản lý người dùng',
//               icon: 'fas fa-user-cog fa-fw',
//               roles: ['owner', 'user_manage']
//             },
//             children: [
//               {
//                 path: '',
//                 name: 'quan-ly-members',
//                 meta: {
//                   title: 'Quản lý người dùng',
//                   icon: 'fas fa-user-cog fa-fw'
//                 }
//               }
//             ]
//           },
//           {
//             path: '/quan-ly-hoa-don',
//             component: Layout,
//             redirect: 'quan-ly-hoa-don',
//             meta: { roles: ['owner'] }, // you can set roles in root nav
//             children: [{
//               path: '',
//               name: 'manage-invoice',
//               meta: {
//                 title: 'Quản lý hóa đơn',
//                 icon: 'fas fa-dollar-sign fa-fw',
//                 roles: ['owner'] // or you can only set roles in sub nav
//               }
//             }]
//           }
//         )
//       }
//       state.routes.push(
//         {
//           path: '/tong-dai-van-phong',
//           component: Layout,
//           redirect: '/tong-dai-van-phong/them-moi',
//           meta: {
//             title: 'Tổng đài văn phòng',
//             icon: 'far fa-address-book fa-fw'
//           },
//           children: [
//             {
//               path: 'them-moi',
//               name: 'office-number',
//               kind: 'office-register',
//               meta: {
//                 title: 'Đăng ký tổng đài VP',
//                 icon: 'fas fa-plus fa-fw',
//                 roles: ['owner', 'hotline_manage']
//               }
//             },
//             {
//               path: 'search-office'
//             }
//           ].concat(payload.handledAsyncRoutes.officeNumbersRoutes)
//         },
//         {
//           path: '/tong-dai-cskh',
//           component: Layout,
//           redirect: '/',
//           meta: {
//             title: 'Tổng đài CSKH',
//             icon: 'far fa-calendar-check fa-fw'
//           },
//           children: [{
//             path: 'them-moi',
//             name: 'service-number',
//             kind: 'service-register',
//             meta: {
//               title: 'Đăng ký tổng đài CSKH',
//               icon: 'fas fa-plus fa-fw',
//               roles: ['owner', 'hotline_manage']
//             }
//           },
//           {
//             path: 'search-service'
//           }
//           ].concat(payload.handledAsyncRoutes.serviceNumbersRoutes)
//         },
//
//         { path: '*', redirect: '/404', hidden: true }
//       )
//       // console.log('3 ----------------------------------')
//       // console.log(state.routes)
//       // console.log('3 ----------------------------------')
//     }
//   },
//
//   actions: {
//     // GetHotlines
//     GetHotlines({ commit }, userInfo) {
//       return new Promise((resolve, reject) => {
//         fetchHotlines().then(response => {
//           const hotlineList = response.data.data.reverse()
//           // console.log(hotlineList)
//           const handledAsyncRoutes = handleMenuRoutes(hotlineList)
//           // console.log(handledAsyncRoutes)
//           commit('SET_ASYNC_ROUTES', {
//             handledAsyncRoutes: handledAsyncRoutes,
//             hotlineCount: hotlineList.length
//           })
//           commit('SET_HOTLINE_LIST', hotlineList)
//           resolve(hotlineList)
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },
//     GenerateHotline({ commit }, keyword) {
//       return new Promise((resolve, reject) => {
//         // console.log(keyword)
//         fetchHotlineByNumber({ 'keyword': '66' }).then(response => {
//           const hotlineList = response.data.data.reverse()
//           const handledAsyncRoutes = handleMenuRoutes(hotlineList)
//           // console.log(handledAsyncRoutes)
//           commit('SET_ASYNC_ROUTES', {
//             handledAsyncRoutes: handledAsyncRoutes,
//             hotlineCount: hotlineList.length
//           })
//           commit('SET_HOTLINE_LIST', hotlineList)
//           resolve(hotlineList)
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     }
//   }
// }
//
// export default asyncRoutes
