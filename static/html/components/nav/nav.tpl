<div id="Zr_TopNavbar" class="">
    <div class="topnavbar-content clearfix">
        <div class="nav-header-left">
            <a href="/" target="_self" title="瑞茂通--核算系统"></a>
        </div>
        {% if session.user %}
            <!--登陆时显示-->
            <div class="nav-header-right">
                <a href='javascript:void(0);' class="header-name">
                    <i class="header-icon"></i>
                    <span class="header-text">{{ session.user.name }}&nbsp;&nbsp;&nbsp;{{ session.user.department }}</span>
                    <i class="header-tip"></i>
                </a>
            </div>
        {% else %}
            <div class="nav-header-right">
                <a href="/login" class="header-login">登录</a>
            </div>
        {% endif %}

    </div>
</div>
