{% html %}
    {% head %}
        <title>{% block title %}聚鑫财富 – 专业、稳健的互联网金融理财平台{% endblock %}</title>
        <meta charset="utf-8">
        <meta name="keywords" content="{% block keywords%}理财,投资,P2P网贷,理财产品,小额贷款,投资理财{% endblock %}" />
        <meta name="description" content="{% block description%}聚鑫财富是依托大型国企建立的互联网金融信息服务平台。具有强大的产业运营能力和金融服务能力，为投资人提供收益稳健的理财产品，让您安心享收益！{% endblock %}"/>
        <meta name="renderer" content="webkit">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <meta name="format-detection" content="telephone=no,address=no,email=no">
        <meta name="viewport" content="width=1024">
        <meta name="handheldFriendly" content="true">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <link href="{{ publicDir }}/image/juxin_favicon.ico" mce_href="/public/images/juxin_favicon.ico" rel="bookmark" type="image/x-icon" />
        <link href="{{ publicDir }}/image/juxin_favicon.ico" mce_href="/public/images/juxin_favicon.ico" rel="icon" type="image/x-icon" />
        <link href="{{ publicDir }}/image/juxin_favicon.ico" mce_href="/public/images/juxin_favicon.ico" rel="shortcut icon" type="image/x-icon" />

        {% css "base" %}
        {% block css %}{% endblock %}
    {% endhead %}
    {% body %}

        {% block content %}{% endblock %}

        {% js "jquery.min" %}

        {% block js %}{% endblock %}

    {% endbody %}
{% endhtml %}
