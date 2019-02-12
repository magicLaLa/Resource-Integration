;(function($){// 匿名函数自执行 
 
 var Tab = function(tab){
     var  _this_ = this;
    //  保存单个 tab 组件
    this.tab = tab;
    //  默认配置参数
    this.config = {
        "triggerType":"mouseover",// 用来定义鼠标的触发类型，是 click 还是 mouseover
        "effect":"fade",// 用来定义内容切换效果，是直接切换，还是淡入淡出效果
        "invoke":1,//默认展示第几个 tab
        "auto":false//用来定义 tab 是否自动切换，当指定了时间间隔，就表示自动切换，并且切换时间为指定间隔
    };
    // 如果配置参数存在，就扩展掉默认的配置参数
    if(this.getConfig()){
        $.extend(this.config,this.getConfig());
    };
    // 事件绑定
    // 保存 tab 标签列表 对应的内容列表
    this.tabItems = this.tab.find('ul.tab-nav li');
    this.contenItems = this.tab.find('div.content-wrap div.content-item');

    // 保存配置参数
    var config = this.config;
    if(config.triggerType === 'click'){
        this.tabItems.bind(config.triggerType,function(){
            _this_.invoke($(this));
        });
    }else if(config.triggerType === 'mouseover' || config.triggerType != "click"){
        this.tabItems.mouseover(function(){
                 _this_.invoke($(this));
        });
    };

    // 自动切换功能，当配置了时间，我们就根据时间间隔执行自动切换
    if(config.auto){
        // 定义一个全局的定时器
        this.timer = null;
        // 计数器
        this.loop = 0;

        this.autoPlay();

        this.tab.hover(function(){
            window.clearInterval(_this_.timer);
        },function(){
            _this_.autoPlay();
        });
    };

    // 设置默认显示第几个
    if(config.invoke > 1){
        this.invoke(this.tabItems.eq(config.invoke));
    };

 };


 Tab.prototype = {
    //  自动间隔时间切换
    autoPlay:function(){
        var _this_ = this;
        // tabItems = this.tabItems;//临时保存tab列表
        var tabLength = this.tabItems.size(); // tab的个数
        config = this.config;

        this.timer = window.setInterval(function(){
            _this_.loop++;
            if(_this_.loop >= tabLength){
                _this_.loop = 0;
            }
            // console.log(_this_.loop);
            _this_.invoke(_this_.tabItems.eq(_this_.loop));
        },config.auto);
    },

    //  事件驱动函数
    invoke:function(currentTab){
        var _this_ = this;
        /**
         * 要执行 Tab 的选中状态,当前选中的加上 actived(标记为白底)
         * 切换对应的 tab 内容，要根据配置参数的 effect 是 default 还是 fade
        */

        var index = currentTab.index();
        // tab 选中状态
        currentTab.addClass("actived").siblings().removeClass("actived");
        // 切换对应的内容区域
        var effect = this.config.effect;
        var conItems = this.contenItems;
        if(effect === "default" || effect != "fade"){
            conItems.eq(index).addClass("current").siblings().removeClass('current');
        }else if(effect === "fade"){
            conItems.eq(index).fadeIn().siblings().fadeOut();
        };

        // 注意：如果配置了自动切换，急得把当前的loop的值设置成当前 tab 的index
        if(this.config.auto){
            this.loop = index;
        }
    },

    //  获取配置参数
    getConfig:function(){
        // 拿一下 tab elem 节点上的 data-config
        var config = this.tab.attr("data-config");
        // 确保有配置参数
        if(config&&config!=""){
            return $.parseJSON(config);//jQuery.parseJSON()函数用于将格式完好的JSON字符串转为与之对应的JavaScript对象。
        }else{
            return null;
        };
    }
 };


// Tab.init = function(tabs){
//     var _this_ = this;
//     tabs.each(function(){
//         new _this_ ($(this));
//     });
// };

// 初始化函数和注册为 jq 方法

$.fn.extend({
    tab:function(){
        this.each(function(){
            new Tab($(this));
        });
        return this;
    }
});

 window.Tab = Tab;// 注册到 window对象中
})(jQuery);