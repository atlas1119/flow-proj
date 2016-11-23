import path from 'path';
var data;

export const dev = process.env.NODE_ENV==='dev';

var dir=path.dirname(__dirname);
var filename=`config.${dev?'dev':'production'}.json`;
while(true){
    try{
        data=require(`${dir}/${filename}`);
    }catch(e){
        console.log(e);
    }
    if(data){
        break;
    }
    if(dir==='/'){
        throw `没有找到配置文件 ${filename}`;
    }
    dir=path.dirname(dir);
}

export default function config(key, error=false){
    if(error && !data.hasOwnProperty(key)){
        throw error===true? `缺少${key}`:error;
    }
    return data[key];
}
