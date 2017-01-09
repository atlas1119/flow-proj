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
<div class="detail-container">
    <h3 class="detail-title"><span>业务流名称:{{flow.flow_name}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>业务流流水号:{{flow._id}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>创建日期:{{moment(flow.created_at).format("YYYY-MM-DD")}}</span></h3>
    <div class="detail-content">
        <div class="detail-flow-info">
            <div class="node-inline">
                <label class="login-input-icon-1">事业部：</label>
                <label class="login-input-icon-1"></label>
            </div>
            <div class="node-inline">
                <label class="login-input-icon-1">事业部：</label>
                <label class="login-input-icon-1"></label>
            </div>
            <div class="node-inline">
                <label class="login-input-icon-1">事业部：</label>
                <label class="login-input-icon-1"></label>
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
                    <input type="text" placeholder="" class="input-name" data-user-id="{{manage_first_user._id}}" id="reviewerId" autocomplete="off" value="{{manage_first_user.name}}">
                </div>
            </div>
        </div>
        <div class="detail-form">
            <button class="detail-save" id="detailSave">保存</button>
        </div>
    </div>
</div>
{% endblock %}

{% block js %}
    {%js 'jquery_core' %}
    {%js 'jquery_datepicker' %}
    <script src="/static/vendor/js/vendor.js"></script>
    {%js 'formbuilder'%}
    {%js 'jquery_zr_extension' %}
    <script>
        window.templateId = "{{tplid}}";
        window.flow_id = "{{flow._id}}";
    </script>
    {%js 'detail'%}
{% endblock %}
