export function handleMenuRoutes(hotlines) {
  const officeNumbers = hotlines.filter(hotline => hotline.type === 'office')
  const serviceNumbers = hotlines.filter(hotline => hotline.type === 'CSKH')
  const officeNumbersRoutes = []
  const serviceNumbersRoutes = []

  for (let i = 0; i < officeNumbers.length; i = i + 1) {
    if (officeNumbers[i].status === 'active') {
      officeNumbersRoutes.push({
        path: `/tong-dai-van-phong/${officeNumbers[i].id}/${officeNumbers[i].hotline_number}`,
        name: `office-number-${officeNumbers[i].id}`,
        redirect: 'noredirect',
        kind: 'office',
        alwaysShow: true,
        meta: {
          title: officeNumbers[i].hotline_number,
          status: 'registered',
          icon: 'fas fa-phone-square fa-fw'
        },
        children: [
          {
            path: 'dashboard',
            name: `dashboard-${officeNumbers[i].id}`,
            kind: 'office',
            meta: {
              title: 'Dashboard',
              roles: ['owner', 'view_report']
            }
          },
          {
            path: 'quan-ly-so',
            name: `office-number-manage-${officeNumbers[i].id}`,
            kind: 'office',
            meta: {
              title: 'Quản lý máy lẻ',
              roles: ['owner', 'extension_manage']
            }
          },
          {
            path: 'cau-hinh',
            name: `office-number-config-${officeNumbers[i].id}`,
            kind: 'office',
            meta: {
              title: 'Cấu hình kịch bản',
              roles: ['owner', 'diaplan_manage']
            }
          },
          {
            path: 'report',
            name: `report-${officeNumbers[i].id}`,
            kind: 'office',
            meta: {
              title: 'Báo cáo',
              roles: ['owner', 'view_report']
            }
          },
          {
            path: 'tracking',
            name: `tracking-${officeNumbers[i].id}`,
            kind: 'office',
            meta: {
              title: 'Giám sát cuộc gọi',
              roles: ['owner', 'monitor_manage']
            }
          }
        ]
      })
    } else {
      officeNumbersRoutes.push({
        path: `/tong-dai-van-phong/${officeNumbers[i].id}/${officeNumbers[i].hotline_number}`,
        name: `office-number-${officeNumbers[i].id}`,
        redirect: 'noredirect',
        kind: 'office',
        alwaysShow: true,
        meta: {
          title: officeNumbers[i].hotline_number,
          status: officeNumbers[i].status === 'progress' ? 'progress' : 'pending',
          icon: 'fas fa-phone-square fa-fw'
        },
        children: [
          {
            path: 'preview',
            name: `dashboard-${officeNumbers[i].id}`,
            kind: 'office',
            meta: {
              title: 'Dashboard',
              roles: ['owner', 'view_report']
            }
          }
        ]
      })
    }
  }

  for (let i = 0; i < serviceNumbers.length; i = i + 1) {
    if (serviceNumbers[i].status === 'active') {
      serviceNumbersRoutes.push({
        path: `/tong-dai-cskh/${serviceNumbers[i].id}/${serviceNumbers[i].hotline_number}`,
        name: `service-number-${serviceNumbers[i].id}`,
        redirect: 'noredirect',
        kind: 'service',
        alwaysShow: true,
        meta: {
          title: serviceNumbers[i].hotline_number,
          status: 'registered',
          icon: 'fas fa-phone-square fa-fw'
        },
        children: [
          {
            path: 'dashboard',
            name: `dashboard-${serviceNumbers[i].id}`,
            kind: 'service',
            meta: {
              title: 'Dashboard',
              roles: ['owner', 'view_report']
            }
          },
          {
            path: 'quan-ly-so',
            name: `service-number-manage-${serviceNumbers[i].id}`,
            kind: 'service',
            meta: {
              title: 'Quản lý máy lẻ',
              roles: ['owner', 'extension_manage']
            }
          },
          {
            path: 'cau-hinh',
            name: `service-number-config-${serviceNumbers[i].id}`,
            kind: 'service',
            meta: {
              title: 'Cấu hình kịch bản',
              roles: ['owner', 'diaplan_manage']
            }
          },
          {
            path: 'report',
            name: `report-${serviceNumbers[i].id}`,
            kind: 'service',
            meta: {
              title: 'Báo cáo',
              roles: ['owner', 'view_report']
            }
          },
          {
            path: 'tracking',
            name: `tracking-${serviceNumbers[i].id}`,
            kind: 'service',
            meta: {
              title: 'Giám sát cuộc gọi',
              roles: ['owner', 'monitor_manage']
            }
          }
        ]
      })
    } else {
      serviceNumbersRoutes.push({
        path: `/tong-dai-cskh/${serviceNumbers[i].id}/${serviceNumbers[i].hotline_number}`,
        name: `service-number-${serviceNumbers[i].id}`,
        redirect: 'noredirect',
        kind: 'service',
        alwaysShow: true,
        meta: {
          title: serviceNumbers[i].hotline_number,
          status: serviceNumbers[i].status === 'progress' ? 'progress' : 'pending',
          icon: 'fas fa-phone-square fa-fw'
        },
        children: [
          {
            path: 'preview',
            name: `dashboard-${serviceNumbers[i].id}`,
            kind: 'service',
            meta: {
              title: 'Dashboard',
              roles: ['owner', 'view_report']
            }
          }
        ]
      })
    }
  }
  return { officeNumbersRoutes, serviceNumbersRoutes }
}
