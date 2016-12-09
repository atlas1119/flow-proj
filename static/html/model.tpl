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
        <a class="sub-tab-btn" data-user-id="{{session.user.id}}" id="createModel" href="javascript:void(0)">
            <i></i><span>新建模板</span>
        </a>
        <div class="node-type">
            <label class="login-input-icon-1">选择业务节点：</label>
            <div class="select">
                  <select name="make" id="workNodeSelect">
                    {%for item in work_nodes%}
                        <option value="{{item._id}}" data-user-id="{{item.person_manage_id}}">{{item.work_name}}</option>
                    {%endfor%}
                  </select>
            </div>
        </div>
    </div>

    <div class="work-table-container">
        {%if nodes.length == 0 %}
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
                    <th>创建人</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {% for item in nodes %}
                <tr>
                    <td>{{moment(item.created_at).format("YYYY-MM-DD")}}</td>
                    <td>{{item.node_name}}</td>
                    <td>{{item.work.work_name}}</td>
                    <td>{{item.user.name}}</td>
                    <td><a href="/model/edittemplate?id={{item._id}}" data-id="{{item._id}}" class="default-btn right">编辑</a><a href="javascript:void(0)" data-id="{{item._id}}" id="delModel" class="default-btn">删除</a></td>
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
