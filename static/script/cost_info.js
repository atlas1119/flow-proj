$(function(){
    $(".search-btn").click(function(){
        var jinkou_zengzhishui = $('#jinkou_zengzhishui option:selected').val();
        var zengzhishui = $('#zengzhishui option:selected').val();
        var yingyeshuijin_add = $('#yingyeshuijin option:selected').val();
        var haiyunfei = $('#haiyunfei option:selected').val();
        var baoxian = $('#baoxian option:selected').val();
        var gangjianfei = $('#gangjianfei option:selected').val();
        var yewufei = $('#yewufei option:selected').val();
        var zhiqisuqianfei = $('#zhiqisuqianfei option:selected').val();
        var jianguanfei = $('#jianguanfei option:selected').val();
        var yinhuashui = $('#yinhuashui option:selected').val();
        var kaizhengfei = $('#kaizhengfei option:selected').val();
        var chengshuifei = $('#chengshuifei option:selected').val();

        var input_jinkou_zengzhishui = $('.jinkou_zengzhishui').val();
        var input_zengzhishui = $('.zengzhishui').val();
        var input_yingyeshuijin = $('.yingyeshuijin').val();
        var input_haiyunfei = $('.haiyunfei').val();
        var input_baoxian = $('.baoxian').val();
        var input_gangjianfei = $('.gangjianfei').val();
        var input_yewufei = $('.yewufei').val();
        var input_zhiqisuqianfei = $('.zhiqisuqianfei').val();
        var input_jianguanfei = $('.jianguanfei').val();
        var input_yinhuashui = $('.yinhuashui').val();
        var input_kaizhengfei = $('.kaizhengfei').val();
        var input_chengshuifei = $('.chengshuifei').val();

        var data = {
            flow_id: window.flow_id,
            jinkou_zengzhishui: input_jinkou_zengzhishui,
            zengzhishui: input_zengzhishui,
            yingyeshuijin_add:input_yingyeshuijin,
            haiyunfei:input_haiyunfei,
            baoxian:input_baoxian,
            gangjianfei:input_gangjianfei,
            yewufei:input_yewufei,
            zhiqisuqianfei:input_zhiqisuqianfei,
            jianguanfei:input_jianguanfei,

            yinhuashui:input_yinhuashui,
            kaizhengfei:input_kaizhengfei,
            chengshuifei:input_chengshuifei,

            company_jinkou_zengzhishui: jinkou_zengzhishui,
            company_zengzhishui: zengzhishui,
            company_yingyeshuijin_add: yingyeshuijin_add,
            company_haiyunfei: haiyunfei,
            company_baoxian: baoxian,
            company_gangjianfei: gangjianfei,
            company_yewufei: yewufei,
            company_zhiqisuqianfei: zhiqisuqianfei,
            company_jianguanfei: jianguanfei,
            company_yinhuashui: yinhuashui,
            company_kaizhengfei: kaizhengfei,
            company_chengshuifei: chengshuifei,

        };
        $.post('/createcostinfo',data,function(data){
            if(data.success){
                $.ext_dialog.open({
                    width: 300,
                    haml: '<div style="text-align:center;margin-bottom:30px;">保存成功！</div>',
                    buttons:{
                        "确定":function(){
                            window.location.href = "/flow/detail?id="+window.flow_id;
                        }
                    }
                });
            }
        });

    });
});
