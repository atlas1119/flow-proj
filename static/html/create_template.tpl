{% extends "layout.tpl" %}

{% block title%}瑞茂通核算系统 – 登陆{% endblock %}
{% block keywords%}瑞茂通,核算{% endblock %}
{% block description%}{% endblock %}

{% block css %}
    <link rel="stylesheet" href="/static/vendor/css/vendor.css">
    {% css 'formbuilder' %}
    {% css 'create_template'%}
{% endblock %}

{% block content %}
<div class="container">
    <h3 class="temp-title">创建模板</h3>
    <div class="fb-container" id="fbMain">
        
    </div>
</div>
{% endblock %}

{% block js %}
    <script src="/static/vendor/js/vendor.js"></script>
    {%js 'formbuilder'%}
    {%js 'create_template'%}
{% endblock %}
