export default {
  apiPrefix: 'http://172.16.72.37/api/',
  mobile: '18617166210',
  /* eslint-disable no-undef */
  setTitle: function (title) {
    var $body = $('body')
    document.title = title
    // hack在微信等webview中无法修改document.title的情况
    var $iframe = $('<iframe src="/static/img/favicon.ico" style="display:none;"></iframe>')
    $iframe.on('load', function () {
      setTimeout(function () {
        $iframe.off('load').remove()
      }, 0)
    }).appendTo($body)
  }
}
