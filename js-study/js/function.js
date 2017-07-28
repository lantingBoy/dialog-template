/*
 * @Author: zsw
 * @Date: 2017-07-18 20:24:23 
 * @Last Modified by: zsw
 * @Last Modified time: 2017-07-19 13:58:55
 */

// 判断两个数的符号是否相同 (用异或运算判断)
function sameSign (a, b) {
  return (a ^ b) >= 0
}

// 向量的计算，终点坐标减去起点坐标
function vector (a, b) {
  return {
    x: b.x - a.x,
    y: b.y - a.y
  }
}

// 向量的叉乘公式
function vectorProduct (v1, v2) {
  return v1.x * v2.y - v2.x * v1.y
}

// 判断鼠标当前点是否在三角形内
function isPointInTrangle (p, a, b, c) { // p是鼠标当前点
  var pa = vector(p, a)
  var pb = vector(p, b)
  var pc = vector(p, c)

  var t1 = vectorProduct(pa, pb)
  var t2 = vectorProduct(pb, pc)
  var t3 = vectorProduct(pc, pa)
  // t1 t2 t3 符号相同时点在三角形内
  return sameSign(t1, t2) && sameSign(t2, t3)
}
// 判断是否需要延迟的函数
function needDelay (elem, leftCorner, currMousePos) {
  // 利用Jquery的offset方法获取二级菜单的上下边缘的坐标
  var offset = elem.offset()

  var topLeft = {
    x: offset.left,
    y: offset.top
  }

  var bottomLeft = {
    x: offset.left,
    y: offset.top + elem.height()
  }

  return isPointInTrangle(currMousePos, leftCorner, topLeft, bottomLeft)
}
