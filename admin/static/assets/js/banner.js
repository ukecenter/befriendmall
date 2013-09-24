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
        init: function () {
             $( "#sort_1, #sort_2" ).sortable({
                connectWith: ".sort-nav",
                placeholder: "dd-placeholder",
                item:".dd-item"
             }).disableSelection();

        }

    };

}();