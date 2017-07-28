/*
 * @Author:zmx
 * @Data:2017/7/24
 */
$(function(){
	var sub=$('#sub')
	var activeRow   //声明一个激活的li
	var activeMenu  //声明一个激活的对应菜单
	var timer
	var mouseInSub=false;
	sub.on('mouseenter',function(){
		mouseInSub=true
	}).on('mouseleave',function(){
		mouseInSub=false
	})
	$('#test')
		.on('mouseenter',function(e){
			sub.removeClass('none')
		})
		.on('mouseleave',function(e){
			sub.addClass('none')  //移开事件  让所有的二级菜单消失
			if(activeRow){     //如果当前有激活的行全部效果消失
				activeRow.removeClass('active')
				activeRow=null
			}
			if(activeMenu){   //二级菜单也是对应全部消失
				activeMenu.addClass('none')  //
				activeMenu=null
			}
		})
		//当 鼠标滑进的时候使用事件代理
		.on('mouseenter','li',function(e){
			if(!activeRow){ //如果没有激活的li
				activeRow=$(e.target).addClass('active') //让当前指定的目标开始显示激活状态
				activeMenu=$('#'+activeRow.data('id'))
				activeMenu.removeClass('none')
				return
			}
			var timer=setTimeout(function(){
				if(mouseInSub){
					return
				}
				activeRow.removeClass('active')//清除激活状态
				activeMenu.addClass('none')  //二级菜单消失
				activeRow=$(e.target)        //令划过目标为指定行
				activeRow.addClass('active')  // 划过目标添加激活状态
				activeMenu=$('#'+activeRow.data('id'))  //令菜单和 指定激活目标对应起来
				activeMenu.removeClass('none')   
			},100)
			
		})
})


/*$(function(){
	var sub=$('#sub');
	var activeLi
	var activeSub
	var timer
	$('#test')
	.on('mouseenter',function(e){
		sub.removeClass('none');
	})
	.on('mouseleave',function(e){
		sub.addClass('none')
		$('#test li').removeClass('active')
	})
	.on('mouseenter','li',function(e){
		$(this).addClass('active').siblings().removeClass('active');//当前的激活所有的兄弟元素消失
		$('#'+$(this).data('id')).removeClass('none').siblings().addClass('none'); //当前对应的二级菜单出线，让其他的对应消失
	})
	
	// 切换子菜单的时候用定时器处理





})
*/