'use strict';

import Tag from './tag';

/**
 * author by wangshaojun
 * @example
 * css控件
 */
class JsTag extends Tag {
   constructor() {
     super('js');
     this.end = false;
   }

   render(context, attrs) {

       let url = attrs[attrs.length - 1];
       let html = `<script type="text/javascript" src="/static/script/${url}.js"></script>`;

     return html;
   }
}

module.exports = JsTag;
