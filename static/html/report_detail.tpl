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
    <h3 class="work-title"><i></i><span>我的报表详情</span></h3>
    <div class="report-container">

        <div class="report-right">
            <div class="fliter-container">
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
                            <option value="">选择船名</option>
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
                            <option value="">选择销售部门</option>
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
                            <option value="">选择上游供应商</option>
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
                            <option value="">选择下游销售客户</option>
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
                            <option value="">选择经手人</option>
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
                            <option value="">选择业务类型</option>
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
                {%if profits.length == 0 %}
                <div class="no-data-container">
                    <i></i><span>暂无数据</span>
                </div>
                {%else%}
                <table class="work-table report-table">
                    <thead>
                        <tr>
                            <th>结算日期</th>
                            <th>发船日期</th>
                            <th>船名</th>
                            <th>经办人</th>
                            <th>业务类型</th>
                            <th>发运部门</th>
                            <th>上游供应商</th>
                            <th>销售部门</th>
                            <th>下游销售客户</th>
                            <th>业务线</th>
                            <th>上游结算吨位</th>
                            <th>上游结算热值</th>
                            <th>下游结算吨位</th>
                            <th>下游结算热值</th>
                            <th>超亏吨</th>
                            <th>超亏卡</th>
                            <th>净利</th>
                            <th>销售含税单价</th>
                            <th>销售含税总额</th>
                            <th>采购单价</th>
                            <th>开证金额</th>
                            <th>发运汇率</th>
                            <th>财务模型汇率</th>
                            <th>还款汇率</th>
                            <th>采购总额</th>
                            <th>过量还回价差</th>
                            <th>企业融资过量留利息</th>
                            <th>单吨净利</th>
                            <th>亏损原因</th>
                            <th>当前环节对接人</th>
                            <th>备注</th>
                            <th>进口增值税</th>
                            <th>增值税</th>
                            <th>营业税金及附加</th>
                            <th>海运费</th>
                            <th>保险</th>
                            <th>港建费</th>
                            <th>检疫费（CIQ)</th>
                            <th>业务费</th>
                            <th>滞期速遣费</th>
                            <th>监管费用</th>
                            <th>国内运费</th>
                            <th>货代费用</th>
                            <th>港务费</th>
                            <th>装卸费</th>
                            <th>检验费(SGS/CCIC等)</th>
                            <th>印花税</th>
                            <th>日常报销分摊</th>
                            <th>开证费用</th>
                            <th>承兑费用</th>
                            <th>短贷费用</th>
                            <th>贴现费用</th>
                            <th>汇兑损益</th>
                            <th>其他费用</th>
                            <th>是否已完结</th>
                        </tr>
                    </thead>
                    <tbody>
                        {% for item in profits %}
                        <tr>
                            <td>{{moment(item.balance_date).format("YYYY-MM-DD")}}</td>
                            <td>{{moment(item.fachuan_date).format("YYYY-MM-DD")}}</td>
                            <td>{{item.ship_name}}</td>
                            <td>{{item.worker_name}}</td>
                            <td>{{item.work_type}}</td>
                            <td>{{item.fayun_department}}</td>
                            <td>{{item.up_provider}}</td>
                            <td>{{item.xiaoshou_department}}</td>
                            <td>{{item.down_xiaoshou_person}}</td>
                            <td>{{item.work_line}}</td>
                            <td>{{item.up_balance_ton}}</td>
                            <td>{{item.up_balance_zhi}}</td>
                            <td>{{item.down_balance_ton}}</td>
                            <td>{{item.down_balance_zhi}}</td>
                            <td>{{item.chao_ton}}</td>
                            <td>{{item.chao_card}}</td>
                            <td>{{item.net_profit}}</td>
                            <td>{{item.xiaoshou_tax_cost}}</td>
                            <td>{{item.xiaoshou_tax_total}}</td>
                            <td>{{item.caigou_cost}}</td>

                            <td>{{item.kaizheng_cost}}</td>
                            <td>{{item.fayun_huilv}}</td>
                            <td>{{item.caiwu_model_huilv}}</td>
                            <td>{{item.huankuang_huilv}}</td>
                            <td>{{item.caigou_total}}</td>
                            <td>{{item.guoliang_huanhui_diff}}</td>
                            <td>{{item.rongziguoliang_interest}}</td>
                            <td>{{item.dangdun_jingli}}</td>

                            <td>{{item.kuisun_seazon}}</td>
                            <td>{{item.huanjie_duijieren}}</td>
                            <td>{{item.remark}}</td>
                            <td>{{item.jinkou_zengzhishui}}</td>
                            <td>{{item.zengzhishui}}</td>
                            <td>{{item.yingyeshuijin_add}}</td>
                            <td>{{item.haiyunfei}}</td>
                            <td>{{item.baoxian}}</td>
                            <td>{{item.gangjianfei}}</td>
                            <td>{{item.jianyifei}}</td>
                            <td>{{item.yewufei}}</td>
                            <td>{{item.zhiqisuqianfei}}</td>

                            <td>{{item.jianguanfei}}</td>
                            <td>{{item.guoneiyunfei}}</td>
                            <td>{{item.daidaifeiyong}}</td>
                            <td>{{item.guangwufei}}</td>
                            <td>{{item.zhuangxiefei}}</td>
                            <td>{{item.jianyanfei}}</td>
                            <td>{{item.yinhuashui}}</td>
                            <td>{{item.richangbaoxiaofentan}}</td>
                            <td>{{item.kaizhengfei}}</td>
                            <td>{{item.chengshuifei}}</td>
                            <td>{{item.duandaifei}}</td>
                            <td>{{item.tiexianfei}}</td>
                            <td>{{item.huishuisunyi}}</td>
                            <td>{{item.qitafeiyong}}</td>
                            <td>{{item.shifoujiewan}}</td>
                        </tr>
                        {% endfor %}
                    </tbody>
                </table>
                {%endif%}
            </div>
            {%if profits.length != 0 %}
            <div class="flow-inline btn-container" style="margin-top:0px;margin-right:65px;margin-bottom:0;float:right;">
                <label class="login-input-icon-1"></label>
                <a class="login-step login-step-1" href="/report/detail" style="background-color:#1abefb;text-decoration:none;line-height:36px;">导出报表</a>
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
