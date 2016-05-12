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
  '/dispatch': {
    component: function (resolve) {
      require(['./components/Dispatch'], resolve)
    }
  },
  '/dispatch-details/:id': {
    component: function (resolve) {
      require(['./components/DispatchDetails'], resolve)
    }
  },
  '/notice': {
    component: function (resolve) {
      require(['./components/Notice'], resolve)
    }
  },
  '/notice-details/:id': {
    component: function (resolve) {
      require(['./components/NoticeDetails'], resolve)
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
  '/my-meetings': {
    component: function (resolve) {
      require(['./components/MyMeetings'], resolve)
    }
  },
  '/reserved-meets': {
    component: function (resolve) {
      require(['./components/ReservedMeets'], resolve)
    }
  },
  '/contacts': {
    component: function (resolve) {
      require(['./components/Contacts'], resolve)
    }
  },
  '/contacts-details/:id': {
    component: function (resolve) {
      require(['./components/ContactsDetails'], resolve)
    }
  },
  '/meet-details/:id': {
    component: function (resolve) {
      require(['./components/MeetDetails'], resolve)
    }
  }
})

router.start(App, 'app')

FastClick.attach(document.body)
