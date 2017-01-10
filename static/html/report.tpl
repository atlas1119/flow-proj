{% extends "index_layout.tpl" %}

{% block title%}瑞茂通核算系统 – 首页{% endblock %}
{% block keywords%}瑞茂通,核算{% endblock %}
{% block description%}{% endblock %}

{% block css %}
    {%css 'jquery_ui'%}
    {%css 'work'%}
    {%css 'report'%}
{% endblock %}

{% block right_content %}
<div class="work-container">
    <h3 class="work-title"><i></i><span>我的报表</span></h3>
    <div class="report-container">
        <div class="report-left">
            <div class="report-tab">
                <dl>
                    <dt>
                        <i></i><a href="#" onclick="return false;">台账</a>
                    </dt>
                    <dd>
                        <a >船务表<font>待开发</font></a>
                        <a >外贸业务表<font>待开发</font></a>
                        <!-- <a href="/prompt/index" >毛利表</a> -->
                    </dd>
                </dl>

                <dl>
                    <dt class="list-on">
                        <i></i><a href="#" onclick="return false;">毛利</a>
                    </dt>
                    <dd style="display:block;">
                        <!-- <a href="/prompt/index" >毛利表</a> -->
                        <a href="/report" class="item-on" >利润表</a>
                        <!-- <a href="/prompt/index" >占压表</a> -->
                    </dd>
                </dl>

                <dl>
                    <dt>
                        <i></i><a href="#" onclick="return false;">仓储</a>
                    </dt>
                    <dd>
                        <a >仓储表<font>待开发</font></a>
                        <!-- <a href="/prompt/index" >毛利表</a> -->
                        <!-- <a href="/prompt/index" >毛利表</a> -->
                    </dd>
                </dl>

            </div>
        </div>

        <div class="report-right">
            <div class="fliter-container fliter-list">
                <div class="flow-inline rili-inline">
                    <label class="login-input-icon-1">结算时间：</label>
                    <input id="datepicker1" type="text" placeholder="" class="flow-name input-time" autocomplete="off" value="{{moment(param.balance_date.$gte).format("YYYY-MM-DD") if param.balance_date.$gte else ''}}" readonly>
                    <i class="rili-icon" style="right:182px;"></i>
                    <label class="login-input-icon-1" style="text-align:center;width:24px;">至</label>
                    <input id="datepicker2" type="text" placeholder="" class="flow-name input-time" autocomplete="off" value="{{moment(param.balance_date.$lt).format("YYYY-MM-DD") if param.balance_date.$lt else ''}}" readonly>
                    <i class="rili-icon"></i>
                </div>
                <div class="flow-inline">
                    <label class="login-input-icon-1">船名：</label>
                    <div class="select">
                          <select name="make" id="shipName">
                            <option value="">全部</option>
                            {% for item in profits %}
                            <option value="{{item.ship_name}}" {{"selected='selected'" if param.ship_name==item.ship_name else ''}}>{{item.ship_name}}</option>
                            {%endfor%}
                          </select>
                    </div>
                    <i class="flow-arrow"></i>
                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">销售部门：</label>
                    <div class="select">
                          <select name="make" id="xiaoshouDp">
                            <option value="">全部</option>
                            {% for item in profits %}
                            <option value="{{item.xiaoshou_department}}" {{"selected='selected'" if param.xiaoshou_department==item.xiaoshou_department else ''}}>{{item.xiaoshou_department}}</option>
                            {%endfor%}
                          </select>
                    </div>
                    <i class="flow-arrow"></i>
                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">上游供应商：</label>
                    <div class="select">
                          <select name="make" id="upProvider">
                            <option value="">全部</option>
                            {% for item in profits %}
                            <option value="{{item.up_provider}}" {{"selected='selected'" if param.xiaoshou_department==item.xiaoshou_department else ''}}">{{item.up_provider}}</option>
                            {%endfor%}
                          </select>
                    </div>
                    <i class="flow-arrow"></i>
                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">下游销售客户：</label>
                    <div class="select">
                          <select name="make" id="downPerson">
                            <option value="">全部</option>
                            {% for item in profits %}
                            <option value="{{item.down_xiaoshou_person}}" {{"selected='selected'" if param.down_xiaoshou_person==item.down_xiaoshou_person else ''}}>{{item.down_xiaoshou_person}}</option>
                            {%endfor%}
                          </select>
                    </div>
                    <i class="flow-arrow"></i>
                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">经手人：</label>
                    <div class="select">
                          <select name="make" id="workerName">
                            <option value="">全部</option>
                            {% for item in profits %}
                            <option value="{{item.worker_name}}" {{"selected='selected'" if param.worker_name==item.worker_name else ''}}">{{item.worker_name}}</option>
                            {%endfor%}
                          </select>
                    </div>
                    <i class="flow-arrow"></i>
                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">业务类型：</label>
                    <div class="select">
                          <select name="make" id="workType">
                            <option value="">全部</option>
                            {% for item in profits %}
                            <option value="{{item.work_type}}" {{"selected='selected'" if param.work_type==item.work_type else ''}}">{{item.work_type}}</option>
                            {%endfor%}
                          </select>
                    </div>
                    <i class="flow-arrow"></i>
                </div>

                <div class="flow-inline btn-container" style="margin-top:0;margin-bottom:0;">
                    <label class="login-input-icon-1"></label>
                    <button class="login-step login-step-1 search-btn" style="background-color:#1abefb;">查询</button>
                </div>

            </div>

            <div class="work-table-container">
                {%if profitdata.length == 0 %}
                <div class="no-data-container">
                    <i></i><span>暂无数据</span>
                </div>
                {%else%}
                <table class="work-table">
                    <thead>
                        <tr>
                            <th>发运吨位</th>
                            <th>结算吨位</th>
                            <th>不含税收入</th>
                            <th>不含税成本</th>
                            <th>税金及附加</th>
                            <th>销售费用</th>
                            <th>管理费用</th>
                            <th>财务费用</th>
                            <th>过量留差价</th>
                            <th>净利</th>
                            <th>毛利</th>
                        </tr>
                    </thead>
                    <tbody>
                        {% for item in profitdata %}
                        <tr>
                            <td>{{item.shiping_ton}}</td>
                            <td>{{item.balance_ton}}</td>
                            <td>{{item.not_tax_income}}</td>
                            <td>{{item.not_tax_cost}}</td>
                            <td>{{item.taxes_add}}</td>
                            <td>{{item.market_cost}}</td>
                            <td>{{item.manage_cost}}</td>
                            <td>{{item.finance_cost}}</td>
                            <td>{{item.gap_cost}}</td>
                            <td>{{item.net_profit}}</td>
                            <td>{{item.gross_profit}}</td>
                        </tr>
                        {% endfor %}
                    </tbody>
                </table>
                {%endif%}
            </div>
            {%if profitdata.length != 0 %}
            <div class="flow-inline btn-container" style="margin-top:0px;margin-right:40px;margin-bottom:0;float:right;">
                <label class="login-input-icon-1"></label>
                <a class="login-step login-step-1" href="/report/detail" style="background-color:#1abefb;text-decoration:none;line-height:36px;">查看详情</a>
            </div>
            {%endif%}
        </div>
    </div>

</div>
{% endblock %}

{% block js %}
    {%js 'jquery_core' %}
    {%js 'jquery_datepicker' %}
    {%js 'jquery_zr_extension' %}
    {%js 'report' %}
{% endblock %}
