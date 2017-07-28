/*
	* obj 运动的对象
	* target 包含运动属性和目标值的对象
	* type 运动方式
	* times 运动时间
	* fn 回调函数
*/
function timeMove(obj, target, type, times, fn) {
	clearInterval(obj.timer);
	var iStartTime = new Date().getTime();
	var oCur = {};
	for(var sAttr in target) {
		if(sAttr == 'opacity') {
			oCur[sAttr] = Math.round(parseFloat(getStyle(obj, 'opacity'))*100);
		} else {
			oCur[sAttr] = parseInt(getStyle(obj, sAttr));
		}
	}
	obj.timer = setInterval(function () {
		var iChangeTime = new Date().getTime();
		var iScale = 1 - Math.max((iStartTime + times - iChangeTime)/times, 0);

		for(var sAttr in target) {
			var iCur = type(oCur[sAttr], target[sAttr] - oCur[sAttr], times * iScale, times);

			if(sAttr == 'opacity') {
				obj.style.opacity = iCur/100;
				obj.style.filter = 'alpha(opacity:' + iCur + ')';	
			} else {
				obj.style[sAttr] = iCur + 'px';
			}
		}

		if(iScale == 1) {
			clearInterval(obj.timer);
			fn && fn();
		}
	}, 30);
}
// 获取属性样式
function getStyle(obj, sAttr) {
	if(obj.currentStyle) {
		return obj.currentStyle[sAttr];
	} else {
		return getComputedStyle(obj, false)[sAttr];
	}
}