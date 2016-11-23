'use strict'

var {
    uc:{proto:{UcService}}
}  = require('../grpc').default;
var sha1 = require('js-sha1');
let
Canvas = require('canvas')
,Image = Canvas.Image
,defaults = {
	charPool: ('abcdefghijklmnopqrstuvwxyz' + 'abcdefghijklmnopqrstuvwxyz'.toUpperCase() + '1234567890').split('')
	,size: {
		width: 100
		,height: 32
	}
	,textPos: {
		left: 15
		,top: 26
	}
    ,url: "/captcha"
	,rotate: .01
	,charLength: 4
	,font: '40px Unifont'
	,strokeStyle: '#0088cc'
    ,lineStrokeStyle: '#adc'
	,bgColor: '#eeeeee'
	,confusion: true
	,cFont: '30px Arial'
	,cStrokeStyle: '#adc'
	,cRotate: -.05
}

function getRandomText(pool, len) {
	var lenp = pool.length
	,i = 0
	,res = ''
	for(;i < len;i ++) {
		res += pool[Math.floor(Math.random() * lenp)]
	}
	return res
}

module.exports = function(_opts) {
    let opts = _opts || {}
	let defs = {
		charPool: opts.charPool || defaults.charPool
		,size: opts.size || defaults.size
        ,url: opts.url || defaults.url
		,textPos: opts.textPos || defaults.textPos
		,rotate: opts.rotate || defaults.rotate
		,charLength: opts.charLength || defaults.charLength
		,font: opts.font || defaults.font
		,strokeStyle: opts.strokeStyle || defaults.strokeStyle
		,bgColor: opts.bgColor || defaults.bgColor
		,confusion: opts.confusion || defaults.confusion
		,cFont: opts.cFont || defaults.cFont
		,cStrokeStyle: opts.cStrokeStyle || defaults.cStrokeStyle
		,cRotate: opts.cRotate || defaults.cRotate
	}

    return async (context, next)=>{
        if (context.request.path !== defs.url) return await next();

        let
        canvas = new Canvas(defs.size.width, defs.size.height)
        ,ctx = canvas.getContext('2d')
        ,len = defs.charLength
        ,pool = defs.charPool
        ,ctext = getRandomText(pool, len)
        ,textobj = await UcService.generateGraphicCode();

        //bg
        ctx.fillStyle = defs.bgColor
        ctx.fillRect(0, 0, defs.size.width, defs.size.height)

        // 背景text绘制
        if(defs.confusion) {
            ctx.beginPath()
            ctx.font = defs.cFont
            ctx.rotate(defs.cRotate)
            ctx.strokeStyle = defs.cStrokeStyle
            ctx.strokeText(ctext, defs.textPos.left, defs.textPos.top)
        }

        // 线条绘制
        ctx.beginPath();
        ctx.strokeStyle = defs.lineStrokeStyle;
        for (var i = 0; i < 5; i++) {
            ctx.moveTo(10, Math.random() * defs.size.height);
            ctx.bezierCurveTo(80, Math.random() * defs.size.height, 160, Math.random() * defs.size.height, defs.size.width - 20, Math.random() * defs.size.height);
            ctx.stroke();
        }

        // 验证码text绘制
        ctx.beginPath();
        ctx.strokeStyle = defs.strokeStyle;
        ctx.font = defs.font;
        ctx.rotate(defs.rotate);
        ctx.strokeText(textobj.code, defs.textPos.left, defs.textPos.top);

        context.type = 'jpg';
        context.set({
            'Cache-Control': 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0',
            'Expires': 'Sun, 12 Jan 1986 12:00:00 GMT'
        });

        context.captcha = textobj.code;
        let {query} = context.request;
        if(query.captcha){
            context.cookies.set(query.captcha, sha1(context.captcha.toLowerCase()),{ signed: true , httpOnly: false})
        }

		// 验证码是否正确
        context.checkCaptcha = async (txt)=>{
			let {isok} = await UcService.verifyGraphicCode({code:txt});
            return isok;
        };

        context.body = await new Promise(function(resolve, reject) {
            canvas.toBuffer(function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        });

        await next();
    }
}
