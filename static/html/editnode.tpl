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
    <h3 class="detail-title"><span>名称:{{node.node_name}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>创建日期:{{moment(node.created_at).format("YYYY-MM-DD")}}</span></h3>
    <div class="detail-content">

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
                                {%if item.work_name == selected_work_node.work_name %}
                                <option value="{{item._id}}" data-user-id="{{item.person_manage_id}}" selected="selected">{{item.work_name}}</option>
                                {%else%}
                                <option value="{{item._id}}" data-user-id="{{item.person_manage_id}}">{{item.work_name}}</option>
                                {%endif%}
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
        {%if edit != 0%}
        <div class="detail-form">
            <button class="detail-save" id="detailSave">保存</button>
        </div>
        {%endif%}
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
        window.node_struct = '{{node.node_struct}}';
        window.node_id = '{{node._id}}';
        window.edit = '{{edit}}';
        // window.flow_id = "{{flow._id}}";
    </script>
    {%js 'editnode'%}
{% endblock %}
