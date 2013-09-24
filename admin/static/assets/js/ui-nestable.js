var UINestable = function () {

    var updateOutput = function (e) {
        // var list = e.length ? e : $(e.target),
        //     output = list.data('output');
        // if (window.JSON) {
        //     output.val(window.JSON.stringify(list.nestable('serialize'))); //, null, 2));
        // } else {
        //     output.val('JSON browser support required for this demo.');
        // }
    };


    return {
        //main function to initiate the module
        init: function () {

            // activate Nestable for list 1
            // $('#nestable_list_1').nestable({
            //     group: 1
            // }).on('change', updateOutput);
            $( "#nestable_list_1" ).sortable({
                placeholder: "ui-state-highlight",
                items: "li:not(.dd-add)"
            });
            $( "#nestable_list_1" ).disableSelection();

           

            // output initial serialised data
            //updateOutput($('#nestable_list_1').data('output', $('#nestable_list_1_output')));
            
        }

    };

}();