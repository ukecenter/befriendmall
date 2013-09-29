var Searchproduct = function () {
    return {
        init: function () {

            $("#table-commod .commod_id").hover(function(){
                
                $(this).find("img").show();
            },function(){
                 $(this).find("img").hide();
            });
            $("#btn-print").click(function(){
                
                $("#table-commod").jqprint();
            });
            $("#search-form button[type='submit']").click(function(){

                if(validation()){
                    var cat=[];
                    var check=$("#search-form .categeory_options input[type='checkbox']:checked");
    
                    for(var i=0;i<check.length;i++){
                        
                        cat[i]=$(check[i]).val();
                    }
                    cat=cat.join(",");
                    $("#search-form input[name='categeory']").val(cat);
                    return true;
                }else{
                    return false;
                }
                
                
            });
            
        }
        

    };
    
    function validation(){
        var form = $('#search-form');
        
        var minStayNum=form.find("input[name='minStayNum']").val();
        var maxStayNum=form.find("input[name='maxStayNum']").val();
        var minSellNum=form.find("input[name='minSellNum']").val();
        var maxSellNum=form.find("input[name='maxSellNum']").val();
        
        if(!isNaN(minSellNum)&&!isNaN(maxStayNum)&&!isNaN(minSellNum)&&!isNaN(maxSellNum)){
            return true;
        }else{
            alert("库存量和销量必须填写数字！");
            return false;
        }
    }
}();