var Admin = function () {
    var newUrl="data/new-admin.php?new";
    var delUrl="data/commod-sort.php?delete";
    var editUrl="data/commod-sort.php?edit";
    var dminTmpl=null;
    return {
        init: function () {
            AdminTmpl = doT.template($('#admin-info').html());
            console.log(doT)
            console.log(AdminTmpl)
           var adminForm=$(".admin-form");
           var that=this;
           adminForm.on("click",".btn_save",function(){
           
            that.edit(this);
           });
           adminForm.on("click",".btn_new_save",function(){
           
            that.new(this);
           });
           adminForm.on("click",".btn_del",function(){
            that.del(this);
           });
           $("#btn_new").click(function(){
            $("#new_modal").modal("show");
           });
           
        },
        del:function(that){
            var adminForm=$(that).closest(".admin-form");
            var id=adminForm.attr("data-id");
            var postData={id:id};
            App.showLoading("正在提交数据...");
            $.post(delUrl,postData,function(result){
                App.hideLoading();
                
                adminForm.closest(".span4").remove();
            });
            return false;
        },
        edit:function(that){
            var adminForm=$(that).closest(".admin-form");
            if(validationInit(adminForm)){

                var name=adminForm.find("input[name='name']").val();
                var password=adminForm.find("input[name='password']").val();
                var id=adminForm.attr("data-id");
                var options=adminForm.find(".categeory_options input[type='checkbox']:checked");
                var categeorys=[];
                for(var i=0;i<options.length;i++){
                    categeorys[i]=$(options[i]).val();
                }
                categeorys=categeorys.join(",");
                
                var postData={name:name,password:password,id:id,categeorys:categeorys};
                App.showLoading("正在提交数据...");
                
                $.post(newUrl,postData,function(result){
                    App.hideLoading();
                    adminForm.find(".alert-success").show();
                    setTimeout(function(){
                          adminForm.find(".alert-success").hide();

                    });
                });
            }
            return false;
        },
        new:function(that){
            var adminForm=$(that).closest(".admin-form");
            if(validationInit(adminForm)){
                var name=adminForm.find("input[name='name']").val();
                var password=adminForm.find("input[name='password']").val();
                var id=adminForm.attr("data-id");
                var options=adminForm.find(".categeory_options input[type='checkbox']:checked");
                var categeorys=[];
                for(var i=0;i<options.length;i++){
                    categeorys[i]=$(options[i]).val();
                }
                categeorys=categeorys.join(",");
                var postData={name:name,password:password,id:id,categeorys:categeorys};
                App.showLoading("正在提交数据...");
                $.post(newUrl,postData,function(result){
                    
                    App.hideLoading();
                    handleNewTmpl(result);
                    $("#new_modal").modal("hide");
                    adminForm.find(".alert-success").show();
                    setTimeout(function(){
                          adminForm.find(".alert-success").hide();
                    },2000);
                });
            }
            return false;
        }
        
    };

    function validationInit(adminForm){
        var name=adminForm.find("input[name='name']").val();
        var password=adminForm.find("input[name='password']").val();
        var repassword=adminForm.find("input[name='repassword']").val();
        var options=adminForm.find(".categeory_options input[type='checkbox']:checked");

        if(name!=""&&password!=""&&repassword==password&&options.length>0){
            return true;
        }else{
            adminForm.find(".alert-error").show();
            setTimeout(function(){
                  adminForm.find(".alert-error").hide();
            },2000);
            return false;
        }
    };
    function handleNewTmpl(result){
        var normalAdmin=$(".normal-admin");
        normalAdmin=$(normalAdmin[normalAdmin.length-1]);
        var admins=normalAdmin.find(".span4");
        var result=JSON.parse(result);
        var adminTmpl=AdminTmpl(result);
        console.log(admins)
        if(admins.length<3){
           normalAdmin.prepend(adminTmpl);
        }else{
            var temp=$("<div class='row-fluid normal-admin'></div>");
            temp=temp.append(adminTmpl);
            temp.insertAfter(normalAdmin);
            //normalAdmin.prepend(adminTmpl);
        }
        
        
        
    }

}();