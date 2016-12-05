{% extends "layout.tpl" %}

{% block title%}瑞茂通核算系统 – 登录{% endblock %}
{% block keywords%}瑞茂通,核算{% endblock %}
{% block description%}{% endblock %}

{% block css %}
    {% css 'login' %}
{% endblock %}

{% block content %}
<div class="container">
    <h3 class="login-logo"></h3>
    <div class="login-segment">
        <div class="login-form">
              <h3 class="login-title">用户登录</h3>
              <h6 class="login-sub-title">登录名：</h6>
              <div class="input input-name">
                <i class="mail icon"></i>
                <input type="text" placeholder="请输入登陆名" name="name">
              </div>
              <br><br>
              <h6 class="login-sub-title">密码：</h6>
              <div class="input input-password">
                <i class="lock icon"></i>
                <input type="password" placeholder="请输入密码" name="password">
              </div>
              <br><br>
              <button class="login-btn" id="loginBtn">登录</button>
        </div>
    </div>
</div>
{% endblock %}

{% block js %}
<script src="/static/script/auth.js"></script>
{% endblock %}
