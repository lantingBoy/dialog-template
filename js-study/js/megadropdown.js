/*
 * @Author: zsw
 * @Date: 2017-07-18 15:21:01
 * @Last Modified by: zsw
 * @Last Modified time: 2017-07-19 15:52:21
 */
$(document).ready(function () {
  var sub = $('#sub')
  var activeRow // 指向当前激活行
  var activeMenu // 指向当前激活菜单
  var timer // 保存计时器ID
  var mouseInSub = false // 表示当前鼠标是否在子菜单中
  var mouseTrack = [] // 记录鼠标位置的数组

  sub.on('mouseenter', function (e) {
    mouseInSub = true
  }).on('mouseleave', function (e) {
    mouseInSub = false
  })

  var moveHandler = function (e) {
    mouseTrack.push({
      x: e.pageX,
      y: e.pageY
    })// 获取当前鼠标相对于页面的坐标保存到mouseTrack里

    if (mouseTrack.length > 3) {
      mouseTrack.shift()
    }// 只保存三个信息
  }
  $('#test li').on('mouseenter', function (e) {
    sub.removeClass('none') // 把二级菜单显示出来
  })  

  $('#test')
    .on('mouseenter', function (e) {
      $(document).bind('mousemove', moveHandler)// 把mousemove绑定到document上
    })
    .on('mouseleave', function (e) {
      console.log('fire mouse leave')
      sub.addClass('none') // 隐藏二级菜单

      if (activeRow) {
        activeRow.removeClass('active')
        activeRow = null
      } // 鼠标离开的时候将当前激活行的样式去掉将激活菜单隐藏

      if (activeMenu) {
        activeMenu.addClass('none')
        activeMenu = null
      }

      $(document).unbind('mousemove', moveHandler)// 鼠标离开的时候对mousemove事件进行解绑以免影响到页面中其他的组件
    })
    .on('mouseenter', 'li', function (e) { // 给一级菜单的列表项用事件代理的方式绑定事件
      if (!activeRow) {
        activeRow = $(e.target).addClass('active')
        activeMenu = $('#' + activeRow.data('id'))
        activeMenu.removeClass('none')
        return
      } // 当前无激活列表项将当前激活元素赋给激活列表项

      if (timer) {
        clearTimeout(timer)
      } // 如果是事件触发的时候计时器还没有执行就把计时器清除（debounce）

      var currMousePos = mouseTrack[mouseTrack.length - 1] // 当前点的坐标
      var leftCorner = mouseTrack[mouseTrack.length - 2]  // 鼠标上一次位置的坐标
      var delay = needDelay(sub, leftCorner, currMousePos) // 是否需要延迟

      if (delay) {//在三角形内就是需要延迟
        // 设置300ms延迟
        timer = setTimeout(function () {
          if (mouseInSub) {
            return // 如果鼠标在子菜单里就不处理立刻返回
          }
          // 从一个列表项移动到另一个列表项，将前一个列表项的样式清除，然后将下一个列表项指向activeRow和activeMenu,将下一个列表项激活并显示与之对应的菜单
          activeRow.removeClass('active')
          activeMenu.addClass('none')

          activeRow = $(e.target)
          activeRow.addClass('active')
          activeMenu = $('#' + activeRow.data('id'))
          activeMenu.removeClass('none')
          timer = null // 计时器结束之后将timer置空（debounce）保证事件触发停止的时候只执行最后一次
        }, 300)
      } else {
        
        sub.addClass('none') 

        // 不在就直接进行菜单的切换
        var prevActiveRow = activeRow
        var prevActiveMenu = activeMenu

        activeRow = $(e.target)
        activeMenu = $('#' + activeRow.data('id'))

        prevActiveRow.removeClass('active')
        prevActiveMenu.addClass('none')

        activeRow.addClass('active')
        activeMenu.removeClass('none')
        sub.removeClass('none')
      }
    })
})
