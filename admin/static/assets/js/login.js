var Login = function () {
    
    return {

        init: function () {
        	function loginSuccess(){
	        	window.location.href = "index.html";
	        }
          	 $('.login-form').validate({
	            errorElement: 'label',
	            errorClass: 'help-inline',
	            focusInvalid: false,
	            rules: {
	                username: {
	                    required: true
	                },
	                password: {
	                    required: true
	                },
	                remember: {
	                    required: false
	                }
	            },

	            messages: {
	                username: {
	                    required: "用户名必填。"
	                },
	                password: {
	                    required: "密码必填。"
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	                $('.alert-error', $('.login-form')).show();
	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	                loginSuccess();
	            }
	        });

	        $('.login-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.login-form').validate().form()) {
	                	loginSuccess();
	                }
	                return false;
	            }
	        });
	       
	        $.backstretch([
		        "assets/image/bg/1.jpg",
		        "assets/image/bg/2.jpg",
		        "assets/image/bg/3.jpg",
		        "assets/image/bg/4.jpg"
		        ], {
		          fade: 1000,
		          duration: 8000
		      });
        }

    };

}();

