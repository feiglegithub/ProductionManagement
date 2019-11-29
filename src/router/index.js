import Vue from 'vue'
import Router from 'vue-router'
// import PartsManagement from './PartsManagement'
import Production from './Production'

Vue.use(Router)

export default new Router({
  routes: [
    // ...PartsManagement
    ...Production
  ]
})
