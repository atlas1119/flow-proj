(function($){
    /*
     * 网站普通弹窗插件
     * refresh 是：直接刷新页面；否：关闭弹窗
     */
    var _dialog = {
        config :{},
        open:function(config){
            _dialog.config = config;
            var closeByBody = true || config.closeByBody;

            // 添加蒙层
            var d=$('#fullscreen');
            if(d.length==0)
                d=$("<div id='fullscreen' style='display:none;'></div>").appendTo('body');

            // 显示蒙层，并且判断是否需要点击body消失弹窗
            d.show();

            $('#dialog').remove();

            // 添加主体和内容
            d=$("<div id='dialog' class='pub-border-radius pub-common-dialog'></div>").appendTo('body');
            d.append('<div class="dialog-title"></div><div class="dialog-body"></div><div class="dialog-foot"></div>');

            d.find('.dialog-body').html(config.haml);

            // 自定义样式，添加自定义样式
            if (config.cssStyle && typeof config.cssStyle == 'string') {
                d.addClass(config.cssStyle);
            }

            // 自定义主体内容 html代码
            if(config.contentHTML){
                d.find('.dialog-body').html(config.contentHTML);
            }

            d.find('.dialog-title').html(config.title).append('<i id="dialog-title-i"></i>').append('<span class="dialog-closed"><i class="icon-close"></i></span>');

            // 是否显示title内部标题前面的icon
            // #dialog-title #dialog-title-i
            if (config.hastitleIcon) {
                d.find('.dialog-title').addClass('dialog-title-icon');
            } else {
                d.find('.dialog-title').find('dialog-title-i').hide();
            }

            d.find('.dialog-closed').click((function(){
                if (config.refresh) {
                    window.location.href = window.location.href;
                } else {
                    _dialog.close();
                    config.close && config.close.call();
                }

            }));
            var btncount=0;

            // 是否有关闭按钮
            if(config.noclose){
                d.find('.dialog-closed').hide();
            }

            // dialog中的footer内部按钮
            if(config.buttons){
                var line=d.find('.dialog-foot');
                for(var k in config.buttons){
                    var display = k;
                    display = '<a class="pub-btn pub-middle-btn">'+ k +'</a>'
                    $('<div></div>').html(display).find(":first-child")
                        .click(config.buttons[k])
                        .appendTo(line);
                    btncount=btncount+1;
                }
                var lastbtn = line.find(":last-child");
                if(lastbtn[0].tagName.toLowerCase()=="button") {
                    lastbtn.css("marginRight",0);
                }
            }else{
                d.find('.dialog-foot').hide();
            }

            if(config.width){
                d.width(config.width);
            }else{
                d.width(500);
            }

            if(config.customs){
                if(config.customs.firstButton) {
                    var c = config.customs.firstButton;
                    d.find('.dialog-foot').find(':first-child').addClass(typeof(c.className) != undefined?c.className:'');
                    for (k in c) {
                        if (k != 'className') {
                            d.find('.dialog-foot').find(':first-child').css({k:c[k]});
                        }
                    }
                }
                if(config.customs.secondButton) {
                    var c = config.customs.secondButton;
                    d.find('.dialog-foot').find('a').eq(1).addClass(typeof(c.className) != undefined?c.className:'');
                    for (k in c) {
                        if (k != 'className') {
                            d.find('.dialog-foot').find('a').eq(1).css(k,c[k]);
                        }
                    }
                }
            }

            // 解决IE8 function.bind不兼容
            if (!Function.prototype.bind) {
                Function.prototype.bind = function(oThis) {
                    if (typeof this !== 'function') {
                        // closest thing possible to the ECMAScript 5
                        // internal IsCallable function
                        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
                    }

                    var aArgs   = Array.prototype.slice.call(arguments, 1),
                        fToBind = this,
                        fNOP    = function() {},
                        fBound  = function() {
                            return fToBind.apply(this instanceof fNOP && oThis
                                    ? this
                                    : oThis,
                                aArgs.concat(Array.prototype.slice.call(arguments)));
                        };

                    fNOP.prototype = this.prototype;
                    fBound.prototype = new fNOP();

                    return fBound;
                };
            }

            if(config["final"]){
                config["final"].bind($('.dialog-body'))();
            }

            if (config.scroll) {
                var top=(($(window).height() - d.outerHeight()) / 2) + $(window).scrollTop();
                var left=(($(window).width() - d.outerWidth()) / 2) + $(window).scrollLeft();
            } else {
                var offset = 0;
                var top=(($(window).height() - d.outerHeight()) / 2);
                var left=(($(window).width() - d.outerWidth()) / 2);
                d.css('position','fixed');
            }

            if(top<0)
                top=0;
            if(left<0)
                left=0;
            d.css("top", top + "px");
            d.css("left", left + "px");

        },
        close:function(){
            _dialog.config.onClose && _dialog.config.onClose();
            $('#fullscreen').hide();
            $('#dialog').remove();
            $("#loadding").remove();
        },
        content:function () {
            return $('.dialog-body');
        },
        foot : function () {
            return $('.dialog-foot')
        },
        final:function () {

        },

    };
    $.ext_dialog = $.extend({},_dialog);

})(jQuery);
