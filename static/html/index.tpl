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
    <h3 class="work-title"><i></i><span>我的工作</span></h3>
    <div class="work-tab">
        <div class="work-sub-tab clearfix">
            <a class="sub-tab-item {%if state == 1 or not state%}active{%endif%}" href="/?state=1">我当前业务流</a>
            <a class="sub-tab-item {%if state == 2%}active{%endif%}" href="/?state=2">处理中业务流</a>
            <a class="sub-tab-item {%if state == 3%}active{%endif%}" href="/?state=3">已完成业务流</a>
            <a class="sub-tab-btn" id="createFlow" data-user-id="{{session.user.id}}" href="javascript:void(0)">
                <i></i><span>创建新业务流</span>
            </a>
        </div>
    </div>
    <div class="work-table-container">
        {%if flows.length == 0 %}
        <div class="no-data-container">
            <i></i><span>暂无业务流</span>
        </div>
        {%else%}
        <table class="work-table">
            <thead>
                <tr>
                    <th>业务流名称</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {% for item in flows %}
                <tr>
                    <td>{{item.flow_name}}</td>
                    <td>{%if item.flow_state == 1 %}审核完成{%elif item.flow_state == 2 %}<span>审核未通过，请进行修改</span>{%else%}审核中{%endif%}</td>
                    <td><a href="" class="default-btn">快速修改</a><a href="" class="default-btn right">查看详情</a></td>
                </tr>
                {% endfor %}
            </tbody>
        </table>
        {%endif%}

    </div>
</div>
{% endblock %}

{% block js %}
    {%js 'jquery_core' %}
    {%js 'jquery_datepicker' %}
    {%js 'jquery_zr_extension' %}
    {%js 'work'%}
{% endblock %}
