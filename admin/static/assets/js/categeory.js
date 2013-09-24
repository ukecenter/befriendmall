var Category = function () {
    var sortUrl="data/commod-sort.php?sort";
    var delUrl="data/commod-sort.php?delete";
    var newUrl="data/commod-sort.php?new";
    var editUrl="data/commod-sort.php?edit";
    var updateOutput = function (e) {

    };


    return {
        init: function () {
            var that=this;
            $( "#sort_categeory1, #sort_categeory2" ).sortable({
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
                that.edit(this);
            });
            $("#btn_new").click(function(){
                $("#new_modal").modal("show");
            });
            $("#btn_new_save").click(function(){
                that.newCat(this);
            });
        },
        sort:function(){
            
            var firstNum=$("#sort_categeory1 li").length;
            if(firstNum!=5){
                $("#error-sort").show();
                $("#success-sort").hide();
                setTimeout(function(){
                     $("#error-sort").hide();
                },2000);
                return ;
            }
            var sort_nav=$(".sort-nav li");
            
            var sortData={show:[],hide:[]};
            for(var i=0;i<$("#sort_categeory1 li").length;i++){
               var id=$(sort_nav[i]).attr("data-id");
               sortData.show[i]=id;
            }
            for(var i=0;i<$("#sort_categeory2 li").length;i++){
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

                $("#error-del").show();
                setTimeout(function(){
                    $("#error-del").hide();
                },2000);
                $(el).closest("li").remove();
                
            });
        },
        newCat:function(){
            var name=$("#new_categeory_name").val();
            if(name==""){
                $("#error-new").show();
                setTimeout(function(){
                    $("#error-new").hide();
                },2000);
                return;
            }
            var postData={};
            postData.CategoryName=name;
            App.showLoading("正在新增...");
            $.post(newUrl,postData,function(result){
                App.hideLoading();
                $( "#sort_categeory1").prepend('<li class="dd-item" data-id="5">'+
                    '<div class="dd-handle">类目5</div>'+
                    '<div class="tools">'+
                        '<a href="#" class="icon"><i class="icon-plus"></i></a>'+
                        '<a href="#" class="icon"><i class="icon-eye-open"></i></a>'+
                        '<a href="#" class="icon"><i class="icon-remove"></i></a>'+
                    '</div>'+
                '</li>');
                $("#new_modal").modal("hide");
                
            });

        },
        edit:function(that){
            $("#edit_modal").modal("show");
            var name=$(that).closest("li").find(".dd-handle").html();
            var id=$(that).closest("li").attr("data-id");
            $("#edit_categeory_name").val(name);

            $("#btn_edit_save").click(function(){
                var name=$("#edit_categeory_name").val();
                if(name==""){
                    $("#error-edit").show();
                    setTimeout(function(){
                        $("#error-edit").hide();
                    },2000);
                    return;
                }
                var postData={};
                postData.CategoryName=name;
                postData.id=id;
                App.showLoading("正在修改类目...");
                $.post(newUrl,postData,function(result){
                    App.hideLoading();
                    $("#edit_modal").modal("hide");
                    $(that).closest("li").find(".dd-handle").html(name);
                    
                });
            });
            
        }
    };

}();