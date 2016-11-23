import path from 'path';

var _ = require('lodash');

import dateFilter from 'nunjucks-date-filter';

export default function(env){

env.addGlobal('moment', require('moment'));

env.addFilter('json', function(str){
    return env.filters.safe(JSON.stringify(str));
});

env.addFilter('money', function(num){
    return env.filters.safe(
        num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    );
});


env.addFilter('clear', function(obj){
    return "";
});

// 判断是否为某种类型
// 支持string,array,object
env.addFilter('isstring', function(obj,type){
    return typeof obj == 'string';
});

// 判断是否为数组
env.addFilter('isarray', function(obj){
    return obj instanceof Array;
});

// 判断是否为null
env.addFilter('isnull', function(obj){
    return obj == null;
});

env.addFilter('date', dateFilter);

env.addFilter('maskcardno', function(cardno) {
    return typeof(cardno) == 'string' && cardno.substr(0,4) + '******' + cardno.substr(cardno.length-4,4);
});

//身份证加密
env.addFilter('maskidcard', function(idcard) {
    return typeof(idcard) == 'string' && idcard.substr(0,2) + '**************' + idcard.substr(idcard.length-2,2);
});

// 加密手机号
env.addFilter('maskphone', function(phone) {
    return typeof(phone) == 'string' && phone.length == 11 ? (phone.substr(0,2) + '******' + phone.slice(-1)) : phone;
});



env.addFilter('join',function(str,sep1,sep2){
    var coll = str.split(sep1);
    coll =  _.filter(coll,function(ele){return ele != ''})|| [];
    return coll.join(sep2);
})

env.addFilter('parseInt',function(num) {
    return parseInt(num);
})

env.addFilter('parseFloat',function(num) {
    return parseFloat(num);
})

env.addFilter('format_login_url',function(uri){
    let redirectUrl =  encodeURIComponent(uri);
   return `/login?t=${redirectUrl}`;
});



};
