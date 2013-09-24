var Product = function () {
    var TableTmpl=null;
    var pageTmpl=null;
    var nowPage=0;
    var postData={ReturnNum:10,ReturnPage:0};
    var updateURL="data/commod-sort.php?type=update";
    var deleteURL="data/commod-sort.php?type=delete";
    var queryURL="data/commod-sort.php?type=query";
    var topURL="data/commod-sort.php?type=top";
    var statusURL="data/commod-sort.php?type=status";
    var tableVal={};
    
    return {
        init: function () {
            TableTmpl = doT.template($('#commod-table-tmpl').html());
            pageTmpl = doT.template($('#commod-page').html());
            nowPage=parseInt($("#page-list li.active a").html());
            postData.LikeQuery=$("#input-keyword").val();
            $("#table-commod .sorting").click(function(){
                if(tableVal.UpdateMore.length>0){
                    if(!confirm("商品信息未保存，确认退出？")){
                        return false;
                    } 
                }
                sort($(this));
            });

            $("#table-commod .commod_id").hover(function(){
                $(this).find("img").show();
            },function(){
                 $(this).find("img").hide();
            });
            tableVal=[];
            window.onbeforeunload = function() {
                if (tableVal.UpdateMore.length>0)
                return ("商品信息未保存，确认退出？");
            }
            editInit();
            seachInit();
            actionInit();
            pageInit();
        }

    };
    function pageInit(){
        $("#page-cont").on("change","#select-page",function(){
           
            if(tableVal.UpdateMore.length>0){
                if(!confirm("商品信息未保存，确认退出？")){
                    return false;
                } 
            }
            postData.ReturnPage=parseInt($(this).val());
            App.showLoading("正在翻页...");
            $.post(queryURL,postData,function(result){
                handleHTML(result);
            });
            return false;
        });
        
        $("#page-cont").on("click","li",function(){
            if(!$(this).hasClass("active")){
                if(tableVal.UpdateMore.length>0){
                if(!confirm("商品信息未保存，确认退出？")){
                    return false;
                } 
                }
                var page=$(this).attr("data-page");
                
                if(page>0){
                    postData.ReturnPage=parseInt($(this).attr("data-page"));
                    App.showLoading("正在翻页...");
                    $.post(queryURL,postData,function(result){
                        handleHTML(result);
                    });
                }
            }
            
            return false;
            
        });
    }
    function actionInit(){
        
        $("#table-commod").on("click",".btn-top",function(){
            if(tableVal.UpdateMore.length>0){
                if(!confirm("商品信息未保存，确认退出？")){
                    return false;
                } 
            }

            if(!confirm("确定要将改商品置顶？")){
                return false;
            } 
            
            postData.ProductId=$(this).closest("tr").attr("data-id");
            App.showLoading("正在置顶...");
            $.post(topURL,postData,function(result){
                handleHTML(result);
            });
            return false;
       }); 
    
       $("#table-commod").on("click",".btn-status",function(){
            if(tableVal.UpdateMore.length>0){
                if(!confirm("商品信息未保存，确认退出？")){
                    return false;
                } 
            }

            postData.ProductId=$(this).closest("tr").attr("data-id");
            App.showLoading("正在更改状态...");
            $.post(statusURL,postData,function(result){
                handleHTML(result);
            });
            return false;
       });
        $("#table-commod").on("click",".btn-del",function(){
            if(tableVal.UpdateMore.length>0){
                if(!confirm("商品信息未保存，确认退出？")){
                    return false;
                } 
            } 
            if(!confirm("确定要将删除改商品？")){
                return false;
            } 

            postData.ProductId=$(this).closest("tr").attr("data-id");
            App.showLoading("正在删除...");
            $.post(deleteURL,postData,function(result){
                
                handleHTML(result);
            });
            return false;
       });

    };
    function seachInit(){
        $("#btn-keyword").click(function(){
            if($("#input-keyword").val()!=""){
                if(tableVal.UpdateMore.length>0){
                    if(!confirm("商品信息未保存，确认退出？")){
                        return false;
                    } 
                }
                postData.LikeQuery=$("#input-keyword").val();
                App.showLoading("正在查询...");
                $.post(queryURL,postData,function(result){
                    handleHTML(result);
                });
            } 
        });
    };
    function editInit(){
        $("#table-commod").on("change",".editable",function(){
            var id=$(this).closest("tr").attr("data-id");
            var type=$(this).attr("data-type");
            
            var has=false;
            $(this).addClass("edited");
            for(var i=0;i<tableVal.UpdateMore.length;i++){

                if(id==tableVal.UpdateMore[i].ProductId){
                    has=true;
                    tableVal.UpdateMore[i][type]=$(this).val();
                }
                
            }
            if(!has){
                tableVal.UpdateMore.push({
                    ProductId:id,
                });
                tableVal.UpdateMore[tableVal.UpdateMore.length-1][type]=$(this).val();
            }
           
        });
        $("#btn-sava-all").click(function(){
            if(tableVal.UpdateMore.length>0){
                postData.UpdateMore=JSON.stringify(tableVal);
                App.showLoading("正在保存...");
                $.post(updateURL,postData,function(result){
                    handleHTML(result);
                });
            
            }
            return false;
       }); 
        $("#btn-reset").click(function(){
            if(tableVal.UpdateMore.length>0){
                App.showLoading("正在重置...");
                $.post(queryURL,postData,function(result){
                    handleHTML(result);
                });
            
            }
            return false;
       });
       
    }
    function sort(sortEl){
        App.showLoading("正在排序...");

        if(sortEl.hasClass("sorting_desc")){
            postData.sortQuery=sortEl.attr("data-type")+" asc";
            
            $.post(queryURL,postData,function(result){
                handleHTML(result);
                $("#table-commod .sorting").not(sortEl[0]).removeClass("sorting_desc").removeClass("sorting_asc");
                sortEl.removeClass("sorting_desc").addClass("sorting_asc");
            });
            
        }else{
            postData.sortQuery=sortEl.attr("data-type")+" desc";
            $.post(queryURL,postData,function(result){
                handleHTML(result);
                $("#table-commod .sorting").not(sortEl[0]).removeClass("sorting_desc").removeClass("sorting_asc");
                sortEl.removeClass("sorting_asc").addClass("sorting_desc");
             });
        }
    }
    function handleHTML(result){
        App.hideLoading();
        var result=JSON.parse(result);
        var tableHtml=TableTmpl(result.datas);
        var pageHtml=pageTmpl(result.page);
        if(result.keywordQuery){
            $("#input-keyword").val(result.keywordQuery);
        }
        nowPage=result.page.nowPage;
        postData.page=nowPage;
        tableVal={UpdateMore:[]};
        $("#commod-table").html(tableHtml);
        $("#page-cont").html(pageHtml);
    }
}();