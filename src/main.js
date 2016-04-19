import 'zepto-browserify'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import FastClick from 'fastclick'
import App from './App'

Vue.use(VueRouter)
Vue.use(VueResource)

var router = window.router = new VueRouter()

router.map({
  '/': {
    component: function (resolve) {
      require(['./components/Home'], resolve)
    }
  },
  '/info': {
    component: function (resolve) {
      require(['./components/Info'], resolve)
    }
  },
  '/gallery': {
    component: function (resolve) {
      require(['./components/Gallery'], resolve)
    }
  },
  '/setting': {
    component: function (resolve) {
      require(['./components/Setting'], resolve)
    }
  },

  '/notice': {
    component: function (resolve) {
      require(['./components/Notice'], resolve)
    }
  },
  '/flow': {
    component: function (resolve) {
      require(['./components/Flow'], resolve)
    }
  },
  '/meeting': {
    component: function (resolve) {
      require(['./components/Meeting'], resolve)
    }
  },
  '/address': {
    component: function (resolve) {
      require(['./components/Address'], resolve)
    }
  }
})

router.start(App, 'app')

router.beforeEach(function (transition) {
  // router.app.$refs.nav.$set('path', transition.to.path)
  transition.next()
})

FastClick.attach(document.body)
// if ('addEventListener' in document) {
//   document.addEventListener('DOMContentLoaded', function () {
//     /* eslint-disable no-undef */
//     FastClick.attach(document.body)
//   }, false)
// }
