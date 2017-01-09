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
                <ul class="sub-tab">
                    <li><a href="/" class="{{'active' if cur_path.indexOf('model') == -1 and cur_path.indexOf('report') == -1 and cur_path.indexOf('staff') == -1 else ''}}">业务管理</a></li>
                    <li>应收应付<font>待开发</font></li>
                    <li>工商管理<font>待开发</font></li>
                    <li>库存<font>待开发</font></li>
                </ul>
            </li>

            <li class="{{'active' if cur_path.indexOf('report') != -1 else ''}}">
                <a href="/report">
                    <i class="tab-3"></i>
                    <span>我的报表</span>
                </a>
                <ul class="sub-tab">
                    <li><a href="/report" class="{{'active' if cur_path.indexOf('report') != -1 else ''}}">利润核算</a></li>
                </ul>
            </li>
            {%if session.user.role == 0%}
            <li class="{{'active' if cur_path.indexOf('staff') != -1 else ''}}">
                <a href="/staff">
                    <i class="tab-4"></i>
                    <span>设置</span>
                </a>
                <ul class="sub-tab">
                    <li><a href="/staff" class="{{'active' if cur_path.indexOf('staff') != -1 else ''}}">员工管理</a></li>
                    <li><a href="/model" class="{{'active' if cur_path.indexOf('model') != -1 else ''}}">模块管理</a></li>
                    <li>事业部管理<font>待开发</font></li>
                    <li>公司管理<font>待开发</font></li>
                    <li>供应商管理<font>待开发</font></li>
                </ul>
            </li>
            {%endif%}
        </ul>
    </div>
    <div class="flow-main-right">
        {% block right_content %}{% endblock %}
    </div>
</div>
{% endblock %}

{% block js %}

{% endblock %}
