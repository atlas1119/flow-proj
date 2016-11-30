{% extends "layout.tpl" %}

{% block title%}瑞茂通核算系统 – 首页{% endblock %}
{% block keywords%}瑞茂通,核算{% endblock %}
{% block description%}{% endblock %}

{% block css %}

{% endblock %}

{% block content %}
<div class="nav-wrapper">
    {% require $id="nav" %}
</div>

<div class="flow-main">
    <div class="flow-main-left">
        <ul>
            <li class="{{'active' if cur_path.indexOf('model') == -1 and cur_path.indexOf('report') == -1 and cur_path.indexOf('staff') == -1 else ''}}">
                <a href="/">
                    <i class="tab-1"></i>
                    <span>我的工作</span>
                </a>
            </li>
            <li class="{{'active' if cur_path.indexOf('model') != -1 else ''}}">
                <a href="/model">
                    <i class="tab-2"></i>
                    <span>模块管理</span>
                </a>
            </li>
            <li class="{{'active' if cur_path.indexOf('report') != -1 else ''}}">
                <a href="/report">
                    <i class="tab-3"></i>
                    <span>我的报表</span>
                </a>
            </li>
            <li class="{{'active' if cur_path.indexOf('staff') != -1 else ''}}">
                <a href="/staff">
                    <i class="tab-4"></i>
                    <span>员工管理</span>
                </a>
            </li>
        </ul>
    </div>
    <div class="flow-main-right">
        {% block right_content %}{% endblock %}
    </div>
</div>
{% endblock %}

{% block js %}

{% endblock %}
