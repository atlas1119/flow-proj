import Joi from 'joi';
import jlanguage from './joi.zh';

var objectPath = require("object-path");

var JoiAny=Joi.any();

/* joi本身未提供扩展写法，此处利用joi自身的设定，通过joi.any 获取any的实例，然后获取到constructor,也就是Any， 修改Any的prototype； */
/* 增加zh_cn 快速设置默认语言 */
JoiAny.constructor.prototype.zh_cn=function(){
    return this.options({
        language:jlanguage,
        stripUnknown:true
    });
}

function toJSON(){
    var [error]=this.details;
    return {msg:error.message, name:error.path};
}
var validate0=JoiAny.constructor.prototype.validate;
/* 替换validate 方法，是的产出的Error具有toJSON方法，统一koajs作为json输出时候的效果，与grpc定义的error相类似 */
JoiAny.constructor.prototype.validate=function(value, callback){
    var result=validate0.call(this, value, callback);
    if(result.error){
        result.error.toJSON=toJSON;
    }
    return result;
}
/* 扩展joi，增加norm方法， 该方法将检验出错的部分替换为默认值，如果没有默认值，则进行删除 */
JoiAny.constructor.prototype.norm=function(value, callback){
    var result=this.options({abortEarly:false}).validate(value, callback);
    var {value, error}=result;
    if(error){
        for(let err of error.details){
            var tmp=Joi.reach(this, err.path);
            if(tmp && tmp._flags && tmp._flags.hasOwnProperty('default')){
                objectPath.set(value, err.path, tmp._flags.default);
            }else{
                if(objectPath.has(value, err.path)){
                    objectPath.del(value, err.path);
                }
            }
        }
    }
    return result;
}

export default Joi;
