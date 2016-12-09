{% extends "index_layout.tpl" %}

{% block title%}瑞茂通核算系统 – 首页{% endblock %}
{% block keywords%}瑞茂通,核算{% endblock %}
{% block description%}{% endblock %}

{% block css %}
    {%css 'jquery_ui'%}
    <link rel="stylesheet" href="/static/vendor/css/vendor.css">
    {%css 'formbuilder' %}
    {%css 'work'%}
    {%css 'flow_detail'%}
{% endblock %}

{% block right_content %}
{%if flow.flow_nodes.length == 0 %}
<div class="detail-container">
    <h3 class="detail-title"><span>业务流名称:{{flow.flow_name}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>业务流流水号:{{flow._id}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>创建日期:{{moment(flow.created_at).format("YYYY-MM-DD")}}</span></h3>
    <div class="detail-content">
        <div class="detail-flow-info">
            <div class="node-inline">
                <label class="login-input-icon-1">时间：</label>
                <label class="login-input-icon-1">{{moment(flow.created_at).format("YYYY-MM-DD")}}</label>
            </div>

            <div class="node-inline">
                <label class="login-input-icon-1">事业部：</label>
                <label class="login-input-icon-1">{{session.user.department}}</label>
            </div>

            <div class="node-inline">
                <label class="login-input-icon-1"> 经手人：</label>
                <label class="login-input-icon-1">{{user_info.name}}</label>
            </div>

        </div>
        <div class="detail-form">
            <h6 class="form-title"><i></i>基本信息</h6>
            <div class="form-container" id="formMain"></div>
        </div>
        <div class="detail-form">
            <h6 class="form-title"><i></i>对接安排工作</h6>
            <div class="node-container">
                <div class="node-inline">
                    <label class="login-input-icon-1">后续工作节点：</label>
                    <div class="select">
                          <select name="make" id="workNodeSelect">
                            {%for item in work_nodes%}
                                <option value="{{item._id}}" data-user-id="{{item.person_manage_id}}">{{item.work_name}}</option>
                            {%endfor%}
                          </select>
                    </div>
                    <span class="login-input-icon-1" id="personManageId">对接人：{{manage_first_user.name}}</span>
                </div>
                <div class="node-inline">
                    <label class="login-input-icon-1">审核人员：</label>
                    <input type="text" placeholder="" class="input-name" id="reviewerId" autocomplete="off" value="{{manage_first_user.name}}">
                </div>
            </div>
        </div>
        <div class="detail-form">
            <button class="detail-save" id="detailSave">保存</button>
        </div>
    </div>
</div>

{%else%}
<div class="detail-container">
    <h3 class="detail-title"><span>业务流名称:{{flow.flow_name}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>业务流流水号:{{flow._id}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>创建日期:{{moment(flow.created_at).format("YYYY-MM-DD")}}</span></h3>
    <div class="detail-content">
        <div class="detail-flow-info">
            <div class="node-inline">
                <label class="login-input-icon-1">时间：</label>
                <label class="login-input-icon-1">{{moment(flow.created_at).format("YYYY-MM-DD")}}</label>
            </div>

            <div class="node-inline">
                <label class="login-input-icon-1">事业部：</label>
                <label class="login-input-icon-1">{{session.user.department}}</label>
            </div>

            <div class="node-inline">
                <label class="login-input-icon-1"> 经手人：</label>
                <label class="login-input-icon-1">{{user_info.name}}</label>
            </div>
        </div>
        <div class="detail-node-list">

        </div>
        {%if flow.flow_state != 1%}
        <div class="detail-node-form">
            <!-- <button class="detail-add-btn" id="detailAddNode"><i></i>增加后续节点</button> -->
            <button class="detail-add-btn" id="detailAddChain"><i></i>增加业务链条信息</button>
        </div>
        {%endif%}
    </div>
</div>
{%endif%}
{% endblock %}

{% block js %}
    <script src="/static/vendor/js/vendor.js"></script>
    {%js 'jquery_core' %}
    {%js 'jquery_datepicker' %}
    {%js 'formbuilder'%}
    {%js 'jquery_zr_extension' %}

    {%if flow.flow_nodes.length == 0 %}
        <script>
            window.templateId = "{{flow.flow_first_template_id}}";
            window.flow_id = "{{flow._id}}";
        </script>
        {%js 'detail'%}
    {%else%}
        <script>
            window.flow_id = "{{flow._id}}";
            window.user_id = "{{session.user.id}}";
        </script>
        {%js 'more_nodes_detail'%}
    {%endif%}

{% endblock %}
