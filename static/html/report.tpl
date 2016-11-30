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
                    <dt class="list-on">
                        <i></i><a href="#" onclick="return false;">台账</a>
                    </dt>
                    <dd>
                        <a href="/prompt/index" class="zz-menu-prompt">消息提醒</a>
                        <a href="/prompt/index" class="zz-menu-prompt">消息提醒</a>
                        <a href="/prompt/index" class="zz-menu-prompt">消息提醒</a>
                    </dd>
                </dl>

                <dl>
                    <dt>
                        <i></i><a href="#" onclick="return false;">毛利</a>
                    </dt>
                    <dd>
                        <a href="/prompt/index" class="zz-menu-prompt">毛利表</a>
                        <a href="/prompt/index" class="zz-menu-prompt">利润表</a>
                        <a href="/prompt/index" class="zz-menu-prompt">占压表</a>
                    </dd>
                </dl>

                <dl>
                    <dt class="list-on">
                        <i></i><a href="#" onclick="return false;">仓储</a>
                    </dt>
                    <dd>
                        <a href="/prompt/index" class="zz-menu-prompt">消息提醒</a>
                        <a href="/prompt/index" class="zz-menu-prompt">消息提醒</a>
                        <a href="/prompt/index" class="zz-menu-prompt">消息提醒</a>
                    </dd>
                </dl>

            </div>
        </div>

        <div class="report-right">
            <div class="work-table-container">
                {%if flows.length == 0 %}
                <div class="no-data-container">
                    <i></i><span>暂无数据</span>
                </div>
                {%else%}
                <table class="work-table">
                    <thead>
                        <tr>
                            <th>业务流名称</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {% for item in flows %}
                        <tr>
                            <td>{{item.flow_name}}</td>
                            <td>{%if item.flow_state == 1 %}审核完成{%elif item.flow_state == 2 %}<span>审核未通过，请进行修改</span>{%else%}审核中{%endif%}</td>
                            <td>{%if item.flow_state == 2 %}<a href="" class="default-btn right">快速修改</a>{%endif%}<a href="/flow/detail?id={{item._id}}" class="default-btn">查看详情</a></td>
                        </tr>
                        {% endfor %}
                    </tbody>
                </table>
                {%endif%}
            </div>
        </div>
    </div>

</div>
{% endblock %}

{% block js %}
    {%js 'jquery_core' %}
    {%js 'jquery_datepicker' %}
    {%js 'jquery_zr_extension' %}
{% endblock %}
