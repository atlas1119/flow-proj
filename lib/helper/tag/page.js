'use strict';

import Tag from './tag';
import {request} from '../../view';

/**
 * author by wangshaojun
 * @example
 * 分页控件
 */
class PageTag extends Tag {
   constructor() {
     super('page');
     this.end = false;
   }

   pageformat(page){
       let {url} = request;
       let pageUrl = url;

       var htmlMaps = {
           '<': '<',
           '>': '>',
           '"': '"e;',
           "'": "'"
       };

       var escape_html = function (str) {
           return (str + "").replace(/[<>'"]/g, function(a){
               return htmlMaps[a];
           });
       };

       var prefix = "?";
       var querys = [];
       for(var name in request.query){
           if(name == 'page') continue;
           querys.push(escape_html(name) + '=' + escape_html(request.query[name]));
       }

       prefix += querys.join("&");
       if(querys.length){
           prefix += "&";
       }

       pageUrl = prefix + "page=" + page;

       return pageUrl;
   }

   render(context, attrs) {

     let html = `<div class="pub-page clearfix"><ul class="clearfix">`;
     let url = attrs[attrs.length - 1];
     if (typeof url !== 'object') {
         return "";
     }

     let curpage = url['page'] || 1;
     let pageNum = url['pagesize'] || 10;
     let total = url['total'] || 0;

     if (curpage > 1){
         html += `<li class="prev"><a href="${this.pageformat(curpage - 1)}"><i class="icon-page-nav-left-hover"></i></a></li>`;
     }

     var num = 2;//展示当前页左右多少个
     var pageIndex = [];
     var page = curpage | 0 || 1;

    //  console.log("@@@@@@@@",page);

     for (var i = page - num; i <= page + num; i++) {
         if (i >= 1 && i <= total) {
             pageIndex.push(i);
         };
     }

     if(pageIndex[0] > 1){
         html += `<li><a href="${this.pageformat(1)}">1</a></li>`;
     }

     if(pageIndex[0] > 2){
         html += `<li class="disabled"><span class="blank-disabled">...</span></li>`;
     }

     for (var i = 0, length = pageIndex.length; i < length; i++) {
         var p = pageIndex[i];
         if (p == page) {
             html += `<li><span>${p}</span></li>`;
         } else {
             html += `<li><a href="${this.pageformat(p)}">${p}</a></li>`;
         }
     }

     if (pageIndex.length > 1) {
         var last = pageIndex[pageIndex.length - 1];
         if (last < (total - 1)) {
             html += `<li class="disabled"><span class="blank-disabled">...</span></li>`;
         };


         if (last < total) {
             html += `<li><a href="${this.pageformat(total)}">${total}</a></li>`;
         };
     };

     if (page < total) {
         html += `<li class="next"><a href="${this.pageformat(curpage + 1)}"><i class="icon-page-nav-right-hover"></i></a></li>`;
     };

     html += `</ul></div>`;

     return html;
   }
}

module.exports = PageTag;
