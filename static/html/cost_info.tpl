{% extends "index_layout.tpl" %}

{% block title%}瑞茂通核算系统 – 首页{% endblock %}
{% block keywords%}瑞茂通,核算{% endblock %}
{% block description%}{% endblock %}

{% block css %}
    {%css 'jquery_ui'%}
    <link rel="stylesheet" href="/static/vendor/css/vendor.css">
    {%css 'formbuilder' %}
    {%css 'work'%}
    {%css 'cost_info'%}
{% endblock %}

{% block right_content %}
<div class="detail-container">
    <h3 class="detail-title"><span>费用信息结算单</span></h3>
    <div class="detail-content">
        <div class="fliter-container fliter-list">

            <div class="flow-inline">
                <label class="login-input-icon-1">进口增值税：</label>
                <input type="text" placeholder="" class="flow-name jinkou_zengzhishui" autocomplete="off">
                <div class="select">
                      <select name="make" id="jinkou_zengzhishui">
                        <option value="神华">神华</option>
                        <option value="和辉" >和辉</option>
                        <option value="嘉瑞" >嘉瑞</option>
                        <option value="前海" >前海</option>
                        <option value="华能武汉" >华能武汉 </option>
                      </select>
                </div>
                <i class="flow-arrow"></i>
            </div>

            <div class="flow-inline">
                <label class="login-input-icon-1">增值税：</label>
                <input type="text" placeholder="" class="flow-name zengzhishui" autocomplete="off">
                <div class="select">
                      <select name="make" id="zengzhishui">
                          <option value="神华">神华</option>
                          <option value="和辉" >和辉</option>
                          <option value="嘉瑞" >嘉瑞</option>
                          <option value="前海" >前海</option>
                          <option value="华能武汉" >华能武汉 </option>
                      </select>
                </div>
                <i class="flow-arrow"></i>
            </div>

            <div class="flow-inline">
                <label class="login-input-icon-1">营业税金：</label>
                <input type="text" placeholder="" class="flow-name yingyeshuijin" autocomplete="off">
                <div class="select">
                      <select name="make" id="yingyeshuijin">
                          <option value="神华">神华</option>
                          <option value="和辉" >和辉</option>
                          <option value="嘉瑞" >嘉瑞</option>
                          <option value="前海" >前海</option>
                          <option value="华能武汉" >华能武汉 </option>
                      </select>
                </div>
                <i class="flow-arrow"></i>
            </div>

            <div class="flow-inline">
                <label class="login-input-icon-1">海运费：</label>
                <input type="text" placeholder="" class="flow-name haiyunfei" autocomplete="off">
                <div class="select">
                      <select name="make" id="haiyunfei">
                          <option value="神华">神华</option>
                          <option value="和辉" >和辉</option>
                          <option value="嘉瑞" >嘉瑞</option>
                          <option value="前海" >前海</option>
                          <option value="华能武汉" >华能武汉 </option>
                      </select>
                </div>
                <i class="flow-arrow"></i>
            </div>

            <div class="flow-inline">
                <label class="login-input-icon-1">保险：</label>
                <input type="text" placeholder="" class="flow-name baoxian" autocomplete="off">
                <div class="select">
                      <select name="make" id="baoxian">
                          <option value="神华">神华</option>
                          <option value="和辉" >和辉</option>
                          <option value="嘉瑞" >嘉瑞</option>
                          <option value="前海" >前海</option>
                          <option value="华能武汉" >华能武汉 </option>
                      </select>
                </div>
                <i class="flow-arrow"></i>
            </div>

            <div class="flow-inline">
                <label class="login-input-icon-1">港建费：</label>
                <input type="text" placeholder="" class="flow-name gangjianfei" autocomplete="off">
                <div class="select">
                      <select name="make" id="gangjianfei">
                          <option value="神华">神华</option>
                          <option value="和辉" >和辉</option>
                          <option value="嘉瑞" >嘉瑞</option>
                          <option value="前海" >前海</option>
                          <option value="华能武汉" >华能武汉 </option>
                      </select>
                </div>
                <i class="flow-arrow"></i>
            </div>

            <div class="flow-inline">
                <label class="login-input-icon-1">业务费：</label>
                <input type="text" placeholder="" class="flow-name yewufei" autocomplete="off">
                <div class="select">
                      <select name="make" id="yewufei">
                          <option value="神华">神华</option>
                          <option value="和辉" >和辉</option>
                          <option value="嘉瑞" >嘉瑞</option>
                          <option value="前海" >前海</option>
                          <option value="华能武汉" >华能武汉 </option>
                      </select>
                </div>
                <i class="flow-arrow"></i>
            </div>

            <div class="flow-inline">
                <label class="login-input-icon-1">滞期速遣费：</label>
                <input type="text" placeholder="" class="flow-name zhiqisuqianfei" autocomplete="off">
                <div class="select">
                      <select name="make" id="zhiqisuqianfei">
                          <option value="神华">神华</option>
                          <option value="和辉" >和辉</option>
                          <option value="嘉瑞" >嘉瑞</option>
                          <option value="前海" >前海</option>
                          <option value="华能武汉 " >华能武汉 </option>
                      </select>
                </div>
                <i class="flow-arrow"></i>
            </div>

            <div class="flow-inline">
                <label class="login-input-icon-1">监管费用：</label>
                <input type="text" placeholder="" class="flow-name jianguanfei" autocomplete="off">
                <div class="select">
                      <select name="make" id="jianguanfei">
                          <option value="神华">神华</option>
                          <option value="和辉" >和辉</option>
                          <option value="嘉瑞" >嘉瑞</option>
                          <option value="前海" >前海</option>
                          <option value="华能武汉" >华能武汉 </option>
                      </select>
                </div>
                <i class="flow-arrow"></i>
            </div>

            <div class="flow-inline">
                <label class="login-input-icon-1">印花税：</label>
                <input type="text" placeholder="" class="flow-name yinhuashui" autocomplete="off">
                <div class="select">
                      <select name="make" id="yinhuashui">
                          <option value="神华">神华</option>
                          <option value="和辉" >和辉</option>
                          <option value="嘉瑞" >嘉瑞</option>
                          <option value="前海" >前海</option>
                          <option value="华能武汉" >华能武汉 </option>
                      </select>
                </div>
                <i class="flow-arrow"></i>
            </div>

            <div class="flow-inline">
                <label class="login-input-icon-1">开证费用：</label>
                <input type="text" placeholder="" class="flow-name kaizhengfei" autocomplete="off">
                <div class="select">
                      <select name="make" id="kaizhengfei">
                          <option value="神华">神华</option>
                          <option value="和辉" >和辉</option>
                          <option value="嘉瑞" >嘉瑞</option>
                          <option value="前海" >前海</option>
                          <option value="华能武汉 " >华能武汉 </option>
                      </select>
                </div>
                <i class="flow-arrow"></i>
            </div>

            <div class="flow-inline">
                <label class="login-input-icon-1">承兑费用：</label>
                <input type="text" placeholder="" class="flow-name chengshuifei" autocomplete="off">
                <div class="select">
                      <select name="make" id="chengshuifei">
                          <option value="神华">神华</option>
                          <option value="和辉" >和辉</option>
                          <option value="嘉瑞" >嘉瑞</option>
                          <option value="前海" >前海</option>
                          <option value="华能武汉" >华能武汉 </option>
                      </select>
                </div>
                <i class="flow-arrow"></i>
            </div>

            <div class="flow-inline btn-container" style="margin-top:0;display:block;text-align:left;margin-bottom:0;">
                <label class="login-input-icon-1"></label>
                <button class="login-step login-step-1 search-btn" style="background-color:#1abefb;">保存</button>
            </div>

        </div>
    </div>
</div>
{% endblock %}

{% block js %}
    {%js 'jquery_core'%}
    {%js 'jquery_datepicker'%}
    <script src="/static/vendor/js/vendor.js"></script>
    {%js 'formbuilder'%}
    {%js 'jquery_zr_extension' %}
    <script>
        window.flow_id = "{{flow_id}}";
    </script>
    {%js 'cost_info' %}
{% endblock %}
