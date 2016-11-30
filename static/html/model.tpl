{% extends "index_layout.tpl" %}

{% block title%}瑞茂通核算系统 – 首页{% endblock %}
{% block keywords%}瑞茂通,核算{% endblock %}
{% block description%}{% endblock %}

{% block css %}
    {%css 'jquery_ui'%}
    {%css 'work'%}
{% endblock %}

{% block right_content %}
<div class="work-container">
    <h3 class="work-title"><i></i><span>模块管理</span></h3>
    <div class="work-tab">
        正在建设中...
    </div>
</div>
{% endblock %}

{% block js %}
    {%js 'jquery_core' %}
    {%js 'jquery_datepicker' %}
    {%js 'jquery_zr_extension' %}
{% endblock %}
