import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'

import Home from './components/Home'
import Info from './components/Info'
import Gallery from './components/Gallery'
import Setting from './components/Setting'

Vue.use(VueRouter)
Vue.use(VueResource)

var router = new VueRouter()

router.map({
  '/': { component: Home },
  '/info': { component: Info },
  '/gallery': { component: Gallery },
  '/setting': { component: Setting }
})

router.start(App, 'app')
