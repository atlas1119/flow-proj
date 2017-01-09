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
    {%css 'business_manage'%}
{% endblock %}

{% block right_content %}
<div class="detail-container">
    <h3 class="detail-title"><span>名称:{{node.node_name}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>创建日期:{{moment(node.created_at).format("YYYY-MM-DD")}}</span></h3>
    <div class="detail-content">
        <div class="detail-form inline-detail" style="border-right:1px dashed #dbe1e7;padding-right:10px;">
            <h6 class="form-title"><i></i>合同信息*</h6>
            <div class="form-container">
                <div class="flow-inline">
                    <label class="login-input-icon-1">合同号S/C NO：</label>
                    <input type="text" placeholder="" class="flow-name" name="hetonghao" autocomplete="off" value="{{caigou_node[0].hetonghao}}">
                </div>
                <div class="flow-inline rili-inline" style="width:408px;">
                    <label class="login-input-icon-1">签订日期：</label>
                    <input id="datepicker" type="text" placeholder="" class="flow-name" name="qiandingriqi" autocomplete="off" value="{{moment(caigou_node[0].qiandingriqi).format("YYYY-MM-DD")}}" readonly>
                    <i class="rili-icon"></i>
                </div>
                <div class="flow-inline rili-inline">
                    <label class="login-input-icon-1">合同单价：</label>
                    <input type="text" placeholder="" class="flow-name input-time" name="hetongdanjia" autocomplete="off" value="{{caigou_node[0].hetongdanjia}}">
                    <div class="select input-time">
                          <select name="make" id="xiaoshouDp">
                            <option value="">人民币</option>
                            <option value="">美元</option>
                          </select>
                          <i class="flow-arrow" style="right:10px;"></i>
                    </div>
                    <span>汇率：</span>
                    <input type="text" placeholder="可不填" class="flow-name input-time" name="danjia_huilv" autocomplete="off" value="{{caigou_node[0].danjia_huilv}}">
                </div>

                <div class="flow-inline rili-inline">
                    <label class="login-input-icon-1">合同金额：</label>
                    <input type="text" placeholder="" class="flow-name input-time" name="hetongjine" autocomplete="off" value="{{caigou_node[0].hetongjine}}">
                    <div class="select input-time">
                          <select name="make" id="xiaoshouDp">
                            <option value="">人民币</option>
                            <option value="">美元</option>
                          </select>
                          <i class="flow-arrow" style="right:10px;"></i>
                    </div>

                    <span>汇率：</span>
                    <input type="text" placeholder="可不填" class="flow-name input-time" name="jine_huilv" autocomplete="off" value="{{caigou_node[0].jine_huilv}}">
                </div>

            </div>
        </div>

        <div class="detail-form inline-detail" style="padding-left: 0;vertical-align: top;">
            <h6 class="form-title"><i></i>公司基本信息*</h6>
            <div class="form-container">
                <div class="flow-inline">
                    <label class="login-input-icon-1">买方公司：</label>
                    <input type="text" placeholder="" class="flow-name" name="buy_gongsi" autocomplete="off" value="{{caigou_node[0].buy_gongsi}}">
                </div>
                <div class="flow-inline">
                    <label class="login-input-icon-1">卖方公司：</label>
                    <input type="text" placeholder="" class="flow-name" name="sell_gongsi" autocomplete="off" value="{{caigou_node[0].sell_gongsi}}">
                </div>

            </div>
        </div>

        <div class="detail-form">
            <h6 class="form-title"><i></i>基本信息</h6>
            <div class="form-container">
                <table class="work-table">
                    <thead>
                        <tr>
                            <th>热值<br/>Net calorific value</th>
                            <th>热值基态</th>
                            <th>硫份<br/>sulphur</th>
                            <th>硫份基态</th>
                            <th>合同数量<br/>quantity</th>
                            <th>容忍度</th>
                            <th>贸易方式<br/>terms of trade</th>
                            <th>付款方式<br/>terms of payment</th>
                            <th>装港检测机构<br/>surveyor of loading port</th>
                            <th>装港检测标准</th>
                            <th>受载期<br/>laycan</th>
                            <th>装港</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" class="input-edit" name="rezhi" value="{{caigou_node[0].rezhi}}"/></td>
                            <td><input type="text" class="input-edit" name="rezhijitai" value="{{caigou_node[0].rezhijitai}}"/></td>
                            <td><input type="text" class="input-edit" name="liufen" value="{{caigou_node[0].liufen}}"/></td>
                            <td><input type="text" class="input-edit" name="liufenjitai" value="{{caigou_node[0].liufenjitai}}"/></td>
                            <td><input type="text" class="input-edit" name="hetongshuliang" value="{{caigou_node[0].hetongshuliang}}"/></td>
                            <td><input type="text" class="input-edit" name="rongrendu" value="{{caigou_node[0].rongrendu}}"/></td>
                            <td><input type="text" class="input-edit" name="maoyifangshi" value="{{caigou_node[0].maoyifangshi}}"/></td>
                            <td><input type="text" class="input-edit" name="fukuangfangshi" value="{{caigou_node[0].fukuangfangshi}}"/></td>
                            <td><input type="text" class="input-edit" name="zhuanggangjigou" value="{{caigou_node[0].zhuanggangjigou}}"/></td>
                            <td><input type="text" class="input-edit" name="zhuanggangbiaozhun" value="{{caigou_node[0].zhuanggangbiaozhun}}"/></td>
                            <td><input type="text" class="input-edit" name="shouzaiqi" value="{{caigou_node[0].shouzaiqi}}"/></td>
                            <td><input type="text" class="input-edit" name="zhuanggang" value="{{caigou_node[0].zhuanggang}}"/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
    <script src="/static/vendor/js/vendor.js"></script>
    {%js 'formbuilder'%}
    {%js 'jquery_core' %}
    {%js 'jquery_datepicker' %}
    {%js 'jquery_zr_extension' %}
    <script>
        window.node_struct = '{{node.node_struct}}';
        window.node_id = '{{node._id}}';
        window.edit = '{{edit}}';
        // window.flow_id = "{{flow._id}}";
    </script>
    {%js 'business_manage'%}
{% endblock %}
