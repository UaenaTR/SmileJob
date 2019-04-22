import Vue from "vue"
import Router from "vue-router"

Vue.use(Router);

const router = new Router({
  routes: [{
      path: "/",
      name: "LoginRegister",
      component: resolve => require(['../views/LoginRegister.vue'], resolve),
      children: [{
          path: "/Login",
          component: resolve => require(['../views/Login.vue'], resolve)
        },
        {
          path: "/Register",
          component: resolve => require(['../views/Register.vue'], resolve)
        }
      ]
    },
    {
      path: "/StudentIndex",
      redirect: "/TopNav",
      name: "StudentIndex",
      component: resolve => require(['../views/Student/StudentIndex.vue'], resolve),
      children: [{
        path: '/TopNav',
        redirect: "/OwnSchoolJob",
        name: 'TopNav',
        component: resolve => require(['../views/Student/TopNav.vue'], resolve),
        children: [{
            path: '/OwnSchoolJob',
            name: 'OwnSchoolJob',
            component: resolve => require(['../views/Student/OwnSchoolJob.vue'], resolve)
          },
          {
            path: '/PositionDetail',
            name: 'PositionDetail',
            component: resolve => require(['../views/Student/PositionDetail.vue'], resolve)
          },
          {
            path: '/ResumeState',
            name: 'ResumeState',
            component: resolve => require(['../views/Student/ResumeState.vue'], resolve)
          },
          {
            path: '/PersonInfo',
            name: 'PersonInfo',
            component: resolve => require(['../views/Student/PersonInfo.vue'], resolve)
          }
        ]
      }]
    },
    {
      path: '/CompanyIndex',
      name: 'CompanyIndex',
      redirect:'/CompanyJob',
      component: resolve => require(['../views/Company/CompanyIndex.vue'], resolve),
      children:[
        {
          path:'/CompanyJob',
          name:'CompanyJob',
          component: resolve => require(['../views/Company/CompanyJob.vue'],resolve)
        }, 
        {
          path: '/CompanyResume',
          name: 'CompanyResume',
          component: resolve => require(['../views/Company/CompanyResume.vue'], resolve)
        },
        {
          path: '/CompanyInfo',
          name: 'CompanyInfo',
          component: resolve => require(['../views/Company/CompanyInfo.vue'], resolve)
        }
      ]
    },
    {
      path:'/SchoolIndex',
      name:'SchoolIndex',
      redirect:'/SchoolJob',
      component:resolve => require(['../views/School/SchoolIndex.vue'],resolve),
      children: [
        {
          path: '/SchoolJob',
          name: '/SchoolJob',
          component: resolve => require(['../views/School/SchoolJob.vue'], resolve)
        },
        {
          path:'/SchoolInfo',
          name:'/SchoolInfo',
          component:resolve => require(['../views/School/SchoolInfo.vue'],resolve)
        }
      ]
    },
  ]
})

const StudentRoute = ['/OwnSchoolJob', '/PositionDetail', '/ResumeState', '/PersonInfo']
const CompanyRoute = ['/CompanyJob','/CompanyResume','/CompanyInfo']
const SchoolRoute = ['/SchoolJob','SchoolInfo']

router.beforeEach((to, from, next) => {
  if (StudentRoute.indexOf(to.path) != -1) {
    if (!sessionStorage.getItem('isLogin')) {
      next('/Login')
    } else {
      next()
    }
  } else if (CompanyRoute.indexOf(to.path) != -1) {
    if (!sessionStorage.getItem('isCompanyLogin')) {
      next('/Login')
    } else {
      next()
    }
  } else if (SchoolRoute.indexOf(to.path) != -1){
    if (!sessionStorage.getItem('isSchoolLogin')) {
      next('/Login')
    } else {
      next()
    }
  }else{
    next()
  }
})

export default router
