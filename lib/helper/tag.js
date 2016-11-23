// add by wangshaojun
// tag 列表
const TagNames = ['css','js','page'];

export default function(nunjucks_env){

    const CustomTags = TagNames.map((tagName) => {
       let Tag = require('./tag/' + tagName);
       return new Tag();
    });

    CustomTags.forEach((tag) => {
      nunjucks_env.addExtension(tag.tagName, tag);
    });

}
