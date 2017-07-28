(function($){
	var Dialog=function(config){
		var _this_ =this;
		
		//默认参数配置
		this.config={
			//对话框类型
			type:null,
			//按钮配置
			buttons:null,
			delay:null,
			message:null,
			width:'auto',
			height:'auto',
			//对话框遮罩层透明度
			maskOpacity:null
		}
		//默认参数扩展
		if(config&&$.isPlainObject(config)){
			$.extend(this.config, config);
		}else{
			this.isConfig=true
		}
		console.log(this.config);
		//创建基本的dom
		this.body=$('body');
		//创建遮罩层
		this.mask=$('<div class="g-dialog-container">');
		//创建弹出框
		this.win=$('<div class="dialog-window">')
		//创建弹出框头部
		this.winHeader=$('<div class="dialog-header"></div>')
		//创建文本提示信息
		this.winContent=$('<div class="dialog-content">');
		//创建弹出框按钮组
		this.winFooter=$('<div class="dialog-footer">')
		//渲染dom
		this.creat();
	};
	Dialog.prototype={
		//定义动画函数
		animate:function(){
			var _this_=this;
			_this_.win.css("-webkit-transform","scale(0,0)")
			window.setTimeout(function(){
				_this_.win.css("-webkit-transform","scale(1,1)")
			},100)
			
		},
		//创建弹出框
		creat:function(){
			var _this_=this,
				config=this.config,
				mask=this.mask,
				win=this.win,
				header=this.winHeader,
				content=this.winContent,
				footer=this.winFooter,
				body=this.body;
				//如果没有传递任何配置参数，就弹出等待图标
				if(this.isConfig){
					win.append(header.addClass('waiting'));
					
					if(config.effect){
						this.animate();
					}
					mask.append(win);
					body.append(mask);
				}else{
					//根据配置参数创建相应的弹框
					header.addClass(config.type);
					win.append(header);
					mask.append(win);
					body.append(mask);
					//如果传了信息文本
					if(config.message){
						win.append(content.html(config.message))
					}
					//如果穿了按钮组
					if(config.buttons){
						this.creatButtons(footer,config.buttons);//
						win.append(footer)
					}
					//设置对话框的宽高
					if(config.width!='auto'){
						win.width(config.width);
					};
					if(config.height!='auto'){
						win.height(config.height)
					}
					//设置对话框遮罩透明度maskopacity
					if(config.maskOpacity){
						console.log(config.maskOpacity);
						mask.css("background","rgba(0,0,0,"+config.maskOpacity+")")//此处需注意统一使用双引号===不能单双引号混合使用
					};
					//设置弹出框弹出多久后关闭
					if(config.delay&&config.delay!=0){
						window.setTimeout(function(){
							_this_.close();
						},config.delay)
					};
					//插入到页面
					
					if(config.effect){
						
						this.animate();
					}
				}
		},
		close:function(){
			this.mask.remove();
		},
		//根据配置参数的buttons 创建按钮列表
		creatButtons:function(footer,buttons){
			//console.log(buttons);
			var _this_=this;
			$(buttons).each(function(i){
				//获取按钮的样式回调以及文本
				var type =this.type? " class='"+this.type+"'":"";
				var btnText=this.text?this.text:"按钮"+(++i);
				var callback=this.callback?this.callback:null;
				
				var button=$("<button "+type+">"+btnText+"</button>");
				if(callback){
					button.tap(function(){
						var isClose=callback(); //取callback的返回值 false
						if(isClose !=false){     //如果false不存在则关闭 否则继续执行相对性的操作而不关闭
							_this_.close();
						}
						
					})
				}else{
					button.on('tap',function(){
						_this_.close();
					})
				};
				footer.append(button);
			})
		}
	};
	window.Dialog=Dialog;
	 $.dialog=function(config){
		return new Dialog(config);
	}
})(Zepto);
