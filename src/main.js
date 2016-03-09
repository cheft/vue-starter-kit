var Vue = require('vue')
var VueRouter = require('vue-router')

var App = require('./App')
var Home = require('./components/Home')
var About = require('./components/About')

Vue.use(VueRouter)
Vue.use(require('vue-resource'))

var router = new VueRouter()

router.map({
  '/': { component: Home },
  '/about': { component: About }
})

router.start(App, 'app')
