{% extends "index_layout.tpl" %}

{% block title%}瑞茂通核算系统 – 首页{% endblock %}
{% block keywords%}瑞茂通,核算{% endblock %}
{% block description%}{% endblock %}

{% block css %}
    {%css 'jquery_ui'%}
    {%css 'work'%}
    {%css 'model'%}
{% endblock %}

{% block right_content %}
<div class="work-container">
    <h3 class="work-title"><i></i><span>模块管理</span></h3>
    <div class="work-sub-tab clearfix">
        <a class="sub-tab-btn" id="createUser" data-user-id="{{session.user.id}}" href="javascript:void(0)">
            <i></i><span>新建模板</span>
        </a>
    </div>

    <div class="work-table-container">
        {%if users.length == 0 %}
        <div class="no-data-container">
            <i></i><span>暂无信息</span>
        </div>
        {%else%}
        <table class="work-table">
            <thead>
                <tr>
                    <th>创建日期</th>
                    <th>模板名称</th>
                    <th>业务节点</th>
                    <th>业务模式</th>
                    <th>创建人</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {% for item in users %}
                <tr>
                    <td>{{item.employee_id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.phone}}</td>
                    <td>{{item.email}}</td>
                    <td>{{item.department}}</td>
                    <td><a href="" class="default-btn">修改</a></td>
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
    {%js 'model' %}
{% endblock %}
