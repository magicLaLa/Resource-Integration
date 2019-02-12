;(function($){

	var Tab = function(tab){
	
		var _this_ = this;
		
		//保存单个tab组件
		this.tab = tab;
		
		
		//默认的配置参数
		this.config = {
							
							"triggerType" : "mouseover",		//用来定义鼠标的触发类型，是click还是mouseover
							"effect"          : "default",			//用来定义内容切换效果，是直接切换，还是淡入淡出fade，
							"invoke"         : 1,						//默认展示第几个
							"auto"            : false					//用来定义tab是否自动切换，指定自动切换的时间，就表示按照指定的时间间隔就行自动切换
		};
		//如果配置参数存在，就扩展 1
		if(this.getConfig()){
			
			$.extend(this.config,this.getConfig());
			
		};

		//保存tab标签列表、和tab对应的内容列表
		this.tabItems        = this.tab.find("ul.tab-nav li");
		this.contentItems = this.tab.find("div.content-wrap .content-item");
		
		//根据配置参数绑定切换事件
		var config = this.config;

		//因为时间促发机制也是人工配置，所以我们需要这么绑定( 如果是mouseover, 要延迟执行，防止误操作)
		
		if(config.triggerType == "click"){
			this.tabItems.bind(config.triggerType,function(){
				
				//执行切换的函数  2  
				_this_.invoke($(this));
	
			});
		}else if(config.triggerType == "mouseover"){
			
			//通过延迟执行的方式，规避误操作
			this.tabItems.mouseover(function(e){
				
				e.stopPropagation();
				
				var self = $(this);
				this.timer = window.setTimeout(function(){
					_this_.invoke(self);
				},300);
				
			}).mouseout(function(e){
				
				e.stopPropagation();
				
				window.clearTimeout(this.timer);
				
			});
			
		}else{
			this.tabItems.bind(config.triggerType,function(){
				
				//执行切换的函数  2  
				_this_.invoke($(this));
	
			});
			
		};
		
		//自动切换功能，如果配置了间隔时间，且间隔时间不为0   3
		if(config.auto){
			
			//定义一个全局定时器
			this.autoTimer = null;
			this.loop          = 0;
			
			this.autoPlay();
			
			//如果自动播放，用户移动到tab组件上，清空自动播放
			this.tab.hover(function(){
			
				window.clearInterval(_this_.autoTimer);
			
			},function(){
				
				_this_.autoPlay();
			
			});
			
		};
		
		//最后呢，加一个初始显示第几个tab
		if(config.invoke != 1){
			this.invoke(this.tabItems.eq(config.invoke-1));
		};
		
	};
	
	Tab.prototype = {
		//自动间隔时间切换 3
		autoPlay:function(){ 
		
			var _this_      = this,
				  tabItems = this.tabItems,
			      tabLenth = tabItems.size(),
				  config     = this.config;
			
			this.autoTimer = window.setInterval(function(){
				
				_this_.loop++;
				
				if(_this_.loop>=tabLenth){
					_this_.loop = 0;
				};
				
				//根据计数器选中即将切换的tab
				tabItems.eq(_this_.loop).trigger(config.triggerType);
				
			},config.auto);
			
		
		},
		//切换时的调用函数  2
		invoke:function(currentTab){
		
			var _this_ = this;
			
			/****
			*要执行tab选中状态，当前选中的加上类名actived（标记为白底）
			*切换当前tab对应的内容，这里切换需要根据配置参数值，是default、还是fade效果
			*通过传递过来的当前currentTab的index，可以拿到相应的content
			*/
			
			var idx = currentTab.index();
			
			//tab选中
			currentTab.addClass("actived").siblings().removeClass("actived");
			
			//切换对应的内容区域
			var effect = this.config.effect ;
			if(effect == "default" || effect != "fade"){
				
				this.contentItems.eq(idx).addClass("current").siblings().removeClass("current");
				
			}else if(effect == "fade"){
				
				this.contentItems.eq(idx).fadeIn().siblings().fadeOut();
				
			};
			
			//注意：如果配置了自动切换，记得把当前loop设置成当前tab的索引
			if(this.config.auto){
				this.loop = idx;
			};

		},
		//获取配置参数   1
		getConfig:function(){
			
			var config = this.tab.attr("data-config");
			
			//确保有配置参数
			if(config&&config!=""){
				
				return $.parseJSON(config);
				
			}else{
				
				return null;
				
			};
			
		}
		
	};
	
	
	//初始化页面中所有tab组件
	Tab.init = function(tabs){
		
		var _this_ = this;
		
		tabs.each(function(){
			
			new _this_($(this));
			
		});
		
		
	};
	
	//注册到JQ
	$.fn.extend({
		tab:function(){
	
			return this.each(function(){
				
				new Tab($(this));
				
			});
	
		}
	});
	
	
	//注册到window上
	window.Tab = Tab;

})(jQuery);