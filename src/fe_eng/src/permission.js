// // import router from './router'
// import store from './store'
// console.log('anh chi la ke ngoc nhung no dieu xa voi')
// store.dispatch('GetUserInfo').then(res => {
//   console.log('minhvu')
// })
// console.log('anh dang o dau day anh')
// // store.dispatch('GetUserInfo')
// // import { Message } from 'element-ui'
// // import NProgress from 'nprogress'
// // import 'nprogress/nprogress.css'// progress bar style
// // import { getToken } from '@/utils/auth' // getToken from cookie
// //
// // NProgress.configure({ showSpinner: true })// NProgress Configuration
// //
// // // permissiom judge function
// // function hasPermission(roles, permissionRoles) {
// //   if (roles.indexOf('owner') >= 0) return true // owner permission passed directly
// //   if (!permissionRoles) return true
// //   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// // }
// //
// // const whiteList = ['/loading']// no redirect whitelist
// //
// // router.beforeEach((to, from, next) => {
// //   NProgress.start() // start progress bar
// //   if (getToken()) { // determine if there has token
// //     /* has token*/
// //     if (to.path === '/loading') {
// //       next({ path: '/' })
// //       NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
// //     } else {
// //       if (store.getters.roles.length === 0) {
// //         store.dispatch('GetUserInfo').then(res => { // user_info
// //           const roles = store.state.user.roles // note: roles must be a array! such as: ['editor','develop'] from user_info
// //           store.dispatch('GetHotlines').then(hotlineList => {
// //             const hotlineCount = hotlineList.length
// //             store.dispatch('GenerateRoutes', { roles }).then(() => { // Generate accessible routing tables based on permissions
// //               router.addRoutes(store.getters.addRouters) // Dynamically add accessible routing
// //               if (hotlineCount > 0) {
// //                 next({ ...to, replace: true }) // The hack method ensures addRoutes is done ,set the replace: true so the navigation will not leave a history record
// //               } else {
// //                 next('tong-dai-van-phong/them-moi')
// //               }
// //             })
// //           })
// //         }).catch(err => {
// //           store.dispatch('FedLogOut').then(() => {
// //             const errMsg = err === 'Lỗi xác thực quyền người dùng' ? 'Tài khoản chưa được phân quyền!' : 'Xác thực thất bại, vui lòng đăng nhập lại!'
// //             Message.error(errMsg)
// //             setTimeout(_ => {
// //               // window.location.href = process.env.SSO_URL + '/logout?service=' + process.env.APP_URL + '&gateway=true'
// //               window.location.href = '/login'
// //             }, 1000)
// //           })
// //         })
// //       } else {
// //         if (hasPermission(store.getters.roles, to.meta.roles)) {
// //           next()//
// //           // console.log('has permission')
// //         } else {
// //           // console.log('doesn\'t has permission')
// //           next({ path: '/401', replace: true, query: { noGoBack: true }})
// //         }
// //       }
// //     }
// //   } else {
// //     /* has no token*/
// //     if (whiteList.indexOf(to.path) !== -1) {
// //       next()
// //     } else {
// //       next('/loading')
// //       NProgress.done()
// //     }
// //   }
// // })
// //
// // router.afterEach(() => {
// //   NProgress.done() // finish progress bar
// // })
