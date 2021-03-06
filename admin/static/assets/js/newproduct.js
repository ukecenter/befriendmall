var Newproduct = function () {
    var postURL="data/commod-sort.php?type=add";
    return {
        init: function () {
            sortInit();
            validationInit();
        }
        

    };
    function sortInit(){
        $( "#commod-img-list" ).sortable({
            placeholder: "ui-state-highlight",
            items: "li:not(.dd-add)"
        });
        $( "#commod-img-list" ).disableSelection();
        $(".dd-add").click(function(){
            var imgurl=$(".imgurl");
            for(var i=0;i<imgurl.length;i++){
                if(!$(imgurl[i]).val()){
                    $(imgurl[i]).click();
                    break;
                }
            }
            if(i==imgurl.length){
                $("#error-img2").show();
            }
            else{
                $("#error-img2").hide();
            }
            
        });
        $("#commod-img-sort").on("change","#imgFile",function(e){
            $("#form-uploadimg").submit();
            var iframe=$("#img-frame");
            App.showLoading("正在上传图片...");
            iframe.bind('load', function() {
                iframe.unbind();
                App.hideLoading();
                var doc=iframe[0].contentDocument || iframe[0].contentWindow.document;
                var result=JSON.parse(doc.body.innerHTML);
                var src=result.url;
                
                $( "#commod-img-list").prepend('<li class="dd-item" data-id="new">'+
                    '<div class="dd-handle">'+
                        '<img src="'+src+'">'+
                    '</div>'+
                    '<div class="tools">'+
                        '<a href="#" class="icon"><i class="icon-eye-open"></i></a>'+
                        '<a href="#" class="icon"><i class="icon-remove"></i></a>'+
                    '</div>'+
                '</li>');
                
            });
            
        });
    };
    function validationInit(){
        var form1 = $('#form-newitem');
        var error1 = $('#error-base');
        var error2 = $('#error-desc');
        var error3 = $('#error-img');
        var success1 = $('#success-all');
        form1.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-inline', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            messages: {
                name: {
                    minlength: jQuery.validator.format("请输入一个长度最少是{0}的字符串"),
                    required: "必选字段"
                },
                category: {
                    required: "必选字段"
                },
                price: {
                    required: "必选字段",
                    number: "请输入合法的数字"
                },
                act_price: {
                    required: "必选字段",
                    number: "请输入合法的数字"
                },
                stayNum: {
                    required: "必选字段",
                    number: "请输入合法的数字"
                },
                code: {
                    required: "必选字段"
                    
                },
                status: {
                    required: "必选字段"

                }
            },
            rules: {
                name: {
                    minlength: 2,
                    required: true
                },
                category: {
                    required: true
                },
                price: {
                    required: true,
                    number: true
                },
                act_price: {
                    required: true,
                    number: true
                },
                stayNum: {
                    required: true,
                    number: true
                },
                code: {
                    required: true
                    
                },
                status: {
                    required: true

                }
            },

            invalidHandler: function (event, validator) {
                success1.hide();
                error1.show();
                App.scrollTo(error1, -200);
            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.help-inline').removeClass('ok'); // display OK icon
                $(element)
                    .closest('.control-group').removeClass('success').addClass('error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change dony by hightlight
                $(element)
                    .closest('.control-group').removeClass('error'); // set error class to the control group
            },

            success: function (label) {
                label
                    .addClass('valid').addClass('help-inline ok') // mark the current input as valid and display OK icon
                .closest('.control-group').removeClass('error').addClass('success'); // set success class to the control group
            },

            submitHandler: function (form) {

                window.editor.sync();
                html = $('#input-commod-desc').val();
                if(html==""){
                    success1.hide();
                    error2.show();
                    App.scrollTo(error2, -100);
                    return false;
                }
                var postData={};
                var formEl=$("#form-basic [name]");
                for(var i=0;i<formEl.length;i++){
                    var name=$(formEl[i]).attr("name");
                    var val=$(formEl[i]).val();
                    postData[name]=val;
                }
                postData.desc=html;
                var sortData=[];
                var sortEl=$("#commod-img-sort .dd-item");
                for(var i=0;i<sortEl.length;i++){
                    sortData[i]=sortEl.find("img").attr("src");
                }
                sortData=sortData.join("||");
                postData.sortData=sortData;
                App.showLoading("正在上传图片...");
                $.post(postURL,postData,function(result){
                    App.hideLoading();
                    error1.hide();
                    error2.hide();
                    error3.hide();
                    success1.show();
                });
                
            }
        });
    }
}();