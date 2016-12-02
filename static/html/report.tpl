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
                        <a href="/prompt/index" >船务表</a>
                        <a href="/prompt/index" >外贸业务表</a>
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
                        <a href="/prompt/index" >仓储表</a>
                        <!-- <a href="/prompt/index" >毛利表</a> -->
                        <!-- <a href="/prompt/index" >毛利表</a> -->
                    </dd>
                </dl>

            </div>
        </div>

        <div class="report-right">
            <div class="fliter-container">
                <div class="flow-inline rili-inline">
                    <label class="login-input-icon-1">结算时间：</label>
                    <input id="datepicker1" type="text" placeholder="" class="flow-name input-time" autocomplete="off" readonly>
                    <i class="rili-icon" style="right:182px;"></i>
                    <label class="login-input-icon-1" style="text-align:center;width:24px;">至</label>
                    <input id="datepicker2" type="text" placeholder="" class="flow-name input-time" autocomplete="off" readonly>
                    <i class="rili-icon"></i>
                </div>
                <div class="flow-inline">
                    <label class="login-input-icon-1">付款方式：</label>
                    <div class="select">
                          <select name="make">
                            <option value="">选择付款方式</option>
                            <option value="棉花">棉花</option>
                            <option value="钢铁">钢铁</option>
                            <option value="煤炭">煤炭</option>
                          </select>
                    </div>
                    <i class="flow-arrow"></i>
                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">业务部门：</label>
                    <div class="select">
                          <select name="make">
                            <option value="">选择业务部门</option>
                            <option value="棉花">棉花</option>
                            <option value="钢铁">钢铁</option>
                            <option value="煤炭">煤炭</option>
                          </select>
                    </div>
                    <i class="flow-arrow"></i>
                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">贸易方式：</label>
                    <div class="select">
                          <select name="make">
                            <option value="">选择贸易方式</option>
                            <option value="棉花">棉花</option>
                            <option value="钢铁">钢铁</option>
                            <option value="煤炭">煤炭</option>
                          </select>
                    </div>
                    <i class="flow-arrow"></i>
                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">经手人：</label>
                    <div class="select">
                          <select name="make">
                            <option value="">选择经手人</option>
                            <option value="棉花">棉花</option>
                            <option value="钢铁">钢铁</option>
                            <option value="煤炭">煤炭</option>
                          </select>
                    </div>
                    <i class="flow-arrow"></i>
                </div>

                <div class="flow-inline">
                    <label class="login-input-icon-1">业务类型：</label>
                    <div class="select">
                          <select name="make">
                            <option value="">选择业务类型</option>
                            <option value="棉花">棉花</option>
                            <option value="钢铁">钢铁</option>
                            <option value="煤炭">煤炭</option>
                          </select>
                    </div>
                    <i class="flow-arrow"></i>
                </div>

                <div class="flow-inline btn-container" style="margin-top:0;margin-bottom:0;">
                    <label class="login-input-icon-1"></label>
                    <button class="login-step login-step-1" style="background-color:#1abefb;">查询</button>
                </div>

            </div>

            <div class="work-table-container">
                {%if profits.length == 0 %}
                <div class="no-data-container">
                    <i></i><span>暂无数据</span>
                </div>
                {%else%}
                <table class="work-table">
                    <thead>
                        <tr>
                            <th>发运吨位</th>
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
                        {% for item in profits %}
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
            {%if profits.length != 0 %}
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
