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
        <span>创建日期:{{moment(flow.created_at).format("YYYY-MM-DD")}}</span>
    </h3>
    <div class="detail-content">
        <div class="detail-flow-info clearfix">
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
            <a class="detail-add-btn-1" href="/report">查看报表</a>
        </div>
        <div class="detail-node-list">

        </div>

        {%if costs.length != 0%}
        <div class="feiyong-content">
            <h6 class="node-title"><span class="left">费用信息</span></h6>
            <div class="add-container">
                <div class="flow-inline">
                    <label class="login-input-icon-1">进口增值税：</label>
                    <input type="text" value="{{costs[0].jinkou_zengzhishui}}" class="flow-name" autocomplete="off" readonly>
                    <input type="text" value="{{costs[0].company_jinkou_zengzhishui}}" class="flow-name jinkou_zengzhishui" autocomplete="off" readonly>
                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">增值税：</label>
                    <input type="text" value="{{costs[0].zengzhishui}}" class="flow-name zengzhishui" autocomplete="off" readonly>
                    <input type="text" value="{{costs[0].company_zengzhishui}}" class="flow-name " readonly>
                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">营业税金：</label>
                    <input type="text" value="{{costs[0].yingyeshuijin_add}}" class="flow-name yingyeshuijin" readonly>
                    <input type="text" value="{{costs[0].company_yingyeshuijin_add}}" class="flow-name " readonly>
                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">海运费：</label>
                    <input type="text" value="{{costs[0].haiyunfei}}" class="flow-name haiyunfei" readonly>
                    <input type="text" value="{{costs[0].company_haiyunfei}}" class="flow-name " readonly>

                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">保险：</label>
                    <input type="text" value="{{costs[0].baoxian}}" class="flow-name baoxian" readonly>
                    <input type="text" value="{{costs[0].company_baoxian}}" class="flow-name " readonly>
                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">港建费：</label>
                    <input type="text" value="{{costs[0].gangjianfei}}" class="flow-name gangjianfei" readonly>
                    <input type="text" value="{{costs[0].company_gangjianfei}}" class="flow-name " readonly>
                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">业务费：</label>
                    <input type="text" value="{{costs[0].yewufei}}" class="flow-name yewufei" readonly>
                    <input type="text" value="{{costs[0].company_yewufei}}" class="flow-name " readonly>
                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">滞期速遣费：</label>
                    <input type="text" value="{{costs[0].zhiqisuqianfei}}" class="flow-name zhiqisuqianfei" readonly>
                    <input type="text" value="{{costs[0].company_zhiqisuqianfei}}" class="flow-name " readonly>
                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">监管费用：</label>
                    <input type="text" value="{{costs[0].jianguanfei}}" class="flow-name jianguanfei" readonly>
                    <input type="text" value="{{costs[0].company_jianguanfei}}" class="flow-name " readonly>
                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">印花税：</label>
                    <input type="text" value="{{costs[0].yinhuashui}}" class="flow-name yinhuashui" readonly>
                    <input type="text" value="{{costs[0].company_yinhuashui}}" class="flow-name " readonly>
                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">开证费用：</label>
                    <input type="text" value="{{costs[0].kaizhengfei}}" class="flow-name kaizhengfei" readonly>
                    <input type="text" value="{{costs[0].company_kaizhengfei}}" class="flow-name " readonly>
                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">承兑费用：</label>
                    <input type="text" value="{{costs[0].chengshuifei}}" class="flow-name chengshuifei" readonly>
                    <input type="text" value="{{costs[0].company_chengshuifei}}" class="flow-name " readonly>
                </div>
            </div>
        </div>
        {%endif%}

        {%if chains.length != 0%}
        <div class="feiyong-content">
            <h6 class="node-title"><span class="left">业务链条信息</span></h6>
            <div class="add-container">
                <div class="flow-inline rili-inline">
                    <label class="login-input-icon-1">日期：</label>
                    <input type="text" value="{{moment(chains[0].chain_at).format("YYYY-MM-DD")}}" class="flow-name input-time" readonly>
                </div>
                <div class="flow-inline">
                    <label class="login-input-icon-1">公司名称：</label>
                    <input type="text" value="{{chains[0].company_name}}" class="flow-name input-name company-input" readonly>
                </div>
                <div class="flow-inline">
                    <label class="login-input-icon-1">成本：</label>
                    <input type="text" value="{{chains[0].cost_value}}" class="flow-name input-name cost-input" readonly>
                </div>
                <div class="flow-inline">
                    <label class="login-input-icon-1">销售额：</label>
                    <input type="text" value="{{chains[0].sales_value}}" class="flow-name input-name market-input" readonly>
                </div>
                <div class="flow-inline">
                    <label class="login-input-icon-1">产生利润：</label>
                    <input type="text" value="{{chains[0].profit_value}}" class="flow-name input-name profit-input" autocomplete="off" readonly>
                </div>
            </div>
        </div>
        {%endif%}

        <div class="detail-node-form">
            {%if costs.length == 0%}
                <a class="detail-add-btn" href="/flow/cost_info?id={{flow._id}}"><i></i>增加费用信息</a>
            {%endif%}
            {%if flow.flow_state != 1%}
                <button class="detail-add-btn" id="detailAddChain"><i></i>增加业务链条信息</button>
            {%endif%}
        </div>

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
