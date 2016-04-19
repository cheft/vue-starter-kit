import Vue from 'vue'

Vue.transition('up', {
  enterClass: 'pt-page-moveFromBottom',
  leaveClass: 'pt-page-moveToTop'
})

Vue.transition('down', {
  enterClass: 'pt-page-moveFromTop',
  leaveClass: 'pt-page-moveToBottom'
})

Vue.transition('left', {
  enterClass: 'pt-page-moveFromRight',
  leaveClass: 'pt-page-moveToLeft'
})

Vue.transition('right', {
  enterClass: 'pt-page-moveFromLeft',
  leaveClass: 'pt-page-moveToRight'
})
