/**
	* 缓冲运动
	* obj 要运动的对象
	* oTarget {sAttr: iTarget, sAttr: iTarget} 包含需要运动的属性和属性终点值
	* fn 回调函数  动画结束以后需要执行的动作
*/
// {left:200, top:400, width:100}
// left, 200, top, 400
function bufferMove(obj, oTarget, fn) {
	clearInterval(obj.timer);

	obj.timer = setInterval(function () {
		var bBtn = true; // 默认所有的属性均已运动完毕
		for(var sAttr in oTarget) {
			// 获取当前值
			if(sAttr === 'opacity') {
				var iCur = parseFloat(getStyle(obj, sAttr) * 100);
			} else {
				var iCur = parseInt(getStyle(obj, sAttr));
			}

			// 计算速度
			var iSpeed = (oTarget[sAttr] - iCur)/8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed); 

			// 修改运动后的属性值
			if(sAttr === 'opacity') {
				obj.style['opacity'] = (iCur + iSpeed) / 100;
				obj.style['filter'] = 'alpha(opacity=' + ( iCur + iSpeed ) + ')';
			} if(sAttr==='zIndex'){
				obj.style[sAttr] = iCur + iSpeed;
			}
			else {
				obj.style[sAttr] = iCur + iSpeed + 'px';
			}

			console.log(obj.style[sAttr]);

			// 如果有属性没有运动完毕，则将按钮关闭掉
			if(iCur + iSpeed !== oTarget[sAttr]) {
				bBtn = false;
			}
		}
		if(bBtn) {
			clearInterval(obj.timer);

			// 如果传入回调函数，则执行
			if(fn) {
				fn();
			}
		}
	}, 30);
}

// 获取对象样式的函数
function getStyle(obj, sAttr) {
	if(obj.currentStyle) {
		return obj.currentStyle[sAttr];
	} else {
		return getComputedStyle(obj, null)[sAttr];
	}
}