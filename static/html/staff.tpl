{% extends "index_layout.tpl" %}

{% block title%}瑞茂通核算系统 – 首页{% endblock %}
{% block keywords%}瑞茂通,核算{% endblock %}
{% block description%}{% endblock %}

{% block css %}
    {%css 'jquery_ui'%}
    {%css 'work'%}
    {%css 'staff'%}
{% endblock %}

{% block right_content %}
<div class="work-container">
    <h3 class="work-title"><i></i><span>员工管理</span></h3>
    <div class="staff-container">
        <div class="staff-left">
            <div class="work-sub-tab clearfix">
                <a class="sub-tab-btn" id="createUser" data-user-id="{{session.user.id}}" href="javascript:void(0)">
                    <i></i><span>添加新员工</span>
                </a>
            </div>
            <div class="work-table-container">
                {%if users.length == 0 %}
                <div class="no-data-container">
                    <i></i><span>暂无信息</span>
                </div>
                {%else%}
                <table class="work-table">
                    <thead>
                        <tr>
                            <th>员工ID</th>
                            <th>姓名</th>
                            <th>手机号</th>
                            <th>邮箱</th>
                            <th>部门</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {% for item in users %}
                        <tr>
                            <td>{{item.employee_id}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.phone}}</td>
                            <td>{{item.email}}</td>
                            <td>{{item.department}}</td>
                            <td><a href="" class="default-btn modify-user" data-id="{{item._id}}">修改</a></td>
                        </tr>
                        {% endfor %}
                    </tbody>
                </table>
                {%endif%}
            </div>
        </div>
        <div class="staff-right">
            <div class="staff-search-container">
                <i></i>
                <input type="text" placeholder="搜索姓名" />
            </div>
            <div class="report-tab">
                <dl>
                    <dt class="list-on">
                        <i></i><span></span><a href="#" onclick="return false;">中瑞财富</a>
                    </dt>
                    <dd style="display:block;">
                        <a href="/staff?department=1-业务部" class="{{'item-on' if cur_path.indexOf('1-'+encodeURIComponent('业务部')) != -1 else ''}}">业务部</a>
                        <a href="/staff?department=1-运营部" class="{{'item-on' if cur_path.indexOf('1-'+encodeURIComponent('运营部')) != -1 else ''}}" >运营部</a>
                        <a href="/staff?department=1-设计部" class="{{'item-on' if cur_path.indexOf('1-'+encodeURIComponent('设计部')) != -1 else ''}}" >设计部</a>
                    </dd>
                </dl>

                <dl>
                    <dt>
                        <i></i><span></span><a href="#" onclick="return false;">中华区</a>
                    </dt>
                    <dd>
                        <a href="/staff?department=2-业务部" class="{{'item-on' if cur_path.indexOf('2-'+encodeURIComponent('业务部')) != -1 else ''}}">业务部</a>
                        <a href="/staff?department=2-运营部" class="{{'item-on' if cur_path.indexOf('2-'+encodeURIComponent('运营部')) != -1 else ''}}" >运营部</a>
                        <a href="/staff?department=2-设计部" class="{{'item-on' if cur_path.indexOf('2-'+encodeURIComponent('设计部')) != -1 else ''}}" >设计部</a>
                    </dd>
                </dl>

                <dl>
                    <dt>
                        <i></i><span></span><a href="#" onclick="return false;">华南区</a>
                    </dt>
                    <dd>
                        <a href="/staff?department=3-业务部" class="{{'item-on' if cur_path.indexOf('3-'+encodeURIComponent('业务部')) != -1 else ''}}">业务部</a>
                        <a href="/staff?department=3-运营部" class="{{'item-on' if cur_path.indexOf('3-'+encodeURIComponent('运营部')) != -1 else ''}}" >运营部</a>
                        <a href="/staff?department=3-设计部" class="{{'item-on' if cur_path.indexOf('3-'+encodeURIComponent('设计部')) != -1 else ''}}" >设计部</a>
                    </dd>
                </dl>

            </div>
        </div>
    </div>
</div>
{% endblock %}

{% block js %}
    {%js 'jquery_core' %}
    {%js 'jquery_datepicker' %}
    {%js 'jquery_zr_extension' %}
    {%js 'staff' %}
{% endblock %}
