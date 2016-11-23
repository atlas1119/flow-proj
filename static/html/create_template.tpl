{% extends "layout.tpl" %}

{% block title%}瑞茂通核算系统 – 登陆{% endblock %}
{% block keywords%}瑞茂通,核算{% endblock %}
{% block description%}{% endblock %}

{% block css %}
    <link rel="stylesheet" href="/static/vendor/css/vendor.css">
    {% css 'formbuilder' %}
{% endblock %}

{% block content %}
<div class="container" id="fbMain">
    
</div>
{% endblock %}

{% block js %}
    <script src="/static/vendor/js/vendor.js"></script>
    {%js 'formbuilder'%}
    {%js 'create_template'%}
{% endblock %}
