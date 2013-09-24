var Act = function () {
    var sortUrl="data/commod-sort.php?sort";
    var delUrl="data/commod-sort.php?delete";
    var newUrl="data/commod-sort.php?new";
    var updateOutput = function (e) {

    };


    return {
        init: function () {
            var that=this;
            $( "#sort_1, #sort_2" ).sortable({
                connectWith: ".sort-nav",
                placeholder: "dd-placeholder",
                item:".dd-item"
             }).disableSelection();
             $("#btn_save").click(function(){
                that.sort();
             });
            $(".sort-nav").on("click",".icon-remove",function(){
                that.del(this);
            });
            $(".sort-nav").on("click",".icon-edit",function(){
                var li=$(this).closest("li");
                var name=li.attr("data-name");
                var id=li.attr("data-id");
                var code=li.attr("data-code");
                var type=li.attr("data-type");
                var url=li.attr("data-url");
                $("#edit_modal input[name='actName']").val(name);
                $("#edit_modal input[name='actId']").val(id);
                $("#edit_modal input[name='actCode']").val(code);
                $("#edit_modal input[name='actUrl']").val(url);
                type=parseInt(type)-1;
                
                $($("#edit_modal input[name='actType']").closest("span")).removeClass("checked");
                $($("#edit_modal input[name='actType']").closest("span")[type]).addClass("checked");
                $($("#edit_modal input[name='actType']").closest("label")[type]).click();
                $("#edit_modal").modal("show");
            });
            $("#btn_new").click(function(){
                $("#new_modal").modal("show");
            });
            $("#btn_new_save").click(function(){
                if(that.checkModal($(this))){
                    that.newAct(this);
                }
                
            });
            $("#btn_edit_save").click(function(){
                if(that.checkModal($(this))){
                    that.editAct(this);
                }
            });
            $(".modal").on("change",$("input[name='actType']"),function(){
                var val=$(this).find("input[name='actType']:checked").val();
                if(val==1){
                    $(this).find(".type2_cont").hide();
                    $(this).find(".type1_cont").show();
                }else if(val==2){
                    $(this).find(".type1_cont").hide();
                    $(this).find(".type2_cont").show();
                }
            });

        },
        checkModal:function(that){
            var modal=$(that).closest(".modal");
            var type=modal.find("input[name='actType']:checked").val();
            var name=modal.find("input[name='actName']").val();
            var actPic=modal.find("input[name='actPic']").val();
            actPic=$.trim(actPic);
            var code=modal.find("input[name='actCode']").val();
            var url=modal.find("input[name='actUrl']").val();
            var codeOrUrl=false;
            if(type=="1"&&code!=""){
                codeOrUrl=true;
            }
            if(type=="2"&&url!=""){
                codeOrUrl=true;
            }
            var picPass=false;
            var extname = actPic.substring(actPic.lastIndexOf(".")+1,actPic.length);
            extname = extname.toLowerCase();//处理了大小写
            if(extname== "jpg"||extname== "png"){
                picPass=true;
            }
            if(name!=""&&picPass&&codeOrUrl){
                return true;
            }else{
                modal.find(".alert").show();
                setTimeout(function(){
                      modal.find(".alert").hide();
                },2000);
                return false;
            }
        },
        sort:function(){
            
            var firstNum=$("#sort_1 li").length;

            if(firstNum>5){
                $("#error-sort").show();
                $("#success-sort").hide();
                setTimeout(function(){
                     $("#error-sort").hide();
                },2000);
                return ;
            }
            var sort_nav=$(".sort-nav li");
            
            var sortData={show:[],hide:[]};
           
            for(var i=0;i<$("#sort_1 li").length;i++){
               var id=$(sort_nav[i]).attr("data-id");
               sortData.show[i]=id;
            }
            for(var i=0;i<$("#sort_2 li").length;i++){
               var id=$(sort_nav[i]).attr("data-id");
               sortData.hide[i]=id;
            }
            sortData=JSON.stringify(sortData);
            var postData={};
            postData.sortData=sortData;
            App.showLoading("正在提交数据...");
            $.post(sortUrl,postData,function(result){
                App.hideLoading();
                $("#success-sort").show();
                $("#error-sort").hide();
                setTimeout(function(){
                    $("#success-sort").hide();
                },2000);
            });
        },
        del:function(el){
            App.showLoading("正在删除...");
            var postData={};
            postData.delId=$(el).closest("li").attr("data-id");
            $.post(delUrl,postData,function(result){
                App.hideLoading();
                $(el).closest("li").remove();
            });
            

        },
        newAct:function(){
            $("#form-new-act").submit();
            var iframe=$("#new-frame");
            App.showLoading("正在新建活动...");
            iframe.bind('load', function() {
                iframe.unbind();
                App.hideLoading();
                var doc=iframe[0].contentDocument || iframe[0].contentWindow.document;
                var result=JSON.parse(doc.body.innerHTML);
                var src=result.url;
                $("#new_modal").modal("hide");
                $( "#sort_1").prepend('<li class="dd-item" data-id="1">'+
                    '<div class="dd-handle">'+
                        '<img src="http://placehold.it/1000X300&text=banner1">'+
                    '</div>'+
                    '<div class="tools">'+
                        '<a href="#" class="icon" title="打开该目录商品列表"><i class="icon-edit"></i></a>'+
                        '<a href="#" class="icon" title="删除该类目"><i class="icon-remove"></i></a>'+
                    '</div>'+
                '</li>');
                
            });

        },
        editAct:function(){

            $("#form-edit-act").submit();
            var iframe=$("#edit-frame");
            App.showLoading("正在修改活动...");
            iframe.bind('load', function() {

                iframe.unbind();
                App.hideLoading();
                var doc=iframe[0].contentDocument || iframe[0].contentWindow.document;
                var result=JSON.parse(doc.body.innerHTML);
                var src=result.url;
                $("#edit_modal").modal("hide");
                
            });

        }
    };

}();