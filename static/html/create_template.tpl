{% extends "layout.tpl" %}

{% block title%}瑞茂通核算系统 – 登陆{% endblock %}
{% block keywords%}瑞茂通,核算{% endblock %}
{% block description%}{% endblock %}

{% block css %}
    <link rel="stylesheet" href="/static/vendor/css/vendor.css">
    {% css 'formbuilder' %}
    {%css 'jquery_ui'%}
    {% css 'create_template'%}
{% endblock %}

{% block content %}
<div class="container">
    <h3 class="temp-title">创建模板&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名称：<input type="text" style="border:1px solid #dbe1e7;" id="tempName"/></h3>

    <div class="fb-container" id="fbMain">

    </div>
</div>
{% endblock %}

{% block js %}
    <script src="/static/vendor/js/vendor.js"></script>
    {%js 'jquery_core' %}
    {%js 'jquery_datepicker' %}
    {%js 'formbuilder'%}
    {%js 'jquery_zr_extension' %}
    <script>
        window.work_node_id = "{{work_node_id}}";
    </script>
    {%js 'create_template'%}
{% endblock %}
