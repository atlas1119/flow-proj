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
    <h3 class="work-title"><i></i><span>员工管理</span></h3>
    <div class="work-tab">
        <div class="work-sub-tab clearfix">
            <a class="sub-tab-btn" id="createFlow" data-user-id="{{session.user.id}}" href="javascript:void(0)">
                <i></i><span>添加新员工</span>
            </a>
        </div>
    </div>
    <div class="work-table-container">
        {%if users.length == 0 %}
        <div class="no-data-container">
            <i></i><span>暂无员工信息</span>
        </div>
        {%else%}
        <table class="work-table">
            <thead>
                <tr>
                    <th>员工ID</th>
                    <th>姓名</th>
                    <th>手机号</th>
                    <th>邮箱</th>
                    <th>部门</th>
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
                    <td><a href="" class="default-btn right">快速修改</a><a href="/flow/detail?id={{item._id}}" class="default-btn">查看详情</a></td>
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
{% endblock %}
