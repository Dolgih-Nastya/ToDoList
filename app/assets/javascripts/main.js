$(function(){
$(document).ready(function(){
    if ($('#content').text().length == 0) {
        $.get("/user_info", function (data) {
            $("#content").prepend(data)
            $(".tasks").tableDnD({//dragHandle: ".drag",

                //onDrop: function (table, row) {
                    //var table_id = table.id
                    //var number_of_rows = table.rows.length
                    //var array_of_id = []
                    //for (var i = 0;i<number_of_rows;i++){
                    //array_of_id.push(table.rows[i].id)
                    //}

                    //alert(JSON.stringify({"table":table_id,"array":array_of_id}));
                //},
                //dragHandle:"input.imgClassUp"
                dragHandle: ".dragHandle"


            });
        });
    }
})


    $("#content").on('click', 'input#add_list', function()
    {
        $.post("new_project", function (data) {
            //alert(data)

            //$("#content").append(data)
            $(data).appendTo('#content.tasks')
        })


   });

    $('#content').on('submit', ".new_task", function(){
        alert("д")
        var params=$(this).serialize();
        alert(params)
        $.post("new_task", params).error(function() { alert("Ошибка выполнения"); })
        return false;
    });

        $("#content").on('click','input.imgClassEdit', function(e) {
            var $tables = $(".tasks");
            $tables.each(function () {
                var _table = $(this);
                //_table.find('tr td.editable.col_change').
                    //append($('<th class="edit">&nbsp;</th>'));
            })
            editable(this);
            //alert('kkkk')
            e.preventDefault();
        });



        function  editable (button) {
        //alert('....')
        var $button = $(button);
        var $row = $button.parents('tr');
        var $cells = $row.children('td.editable.col_change').not('.edit');
            $cells.each(function () {
                var _cell = $(this);
                var d=_cell.data('text')
                //alert('text'+d)
                _cell.data('text',_cell.html())
                .html('');
                var $input = $('<input type="text" />')
                    .val(_cell.data('text'))
                    .width(_cell.width() - 16);
                //alert(_cell.data('text'))
                _cell.append($input);
            });

            if ($row.data('flag')) { // in edit mode, move back to table
            $row.data('flag', false);
            $button.text('Edit');
        }
        else {
            $row.data('flag', true);
            $button.text('Save');
        }
    };



    $('#content').on('click', 'a', function(a){
    alert ('ok')
    var url=$(this).attr('href');
    var method=$(this).attr("data-method")
    if (method=="delete") {
        $.ajax({'url': url, 'type': method, 'success':function(){
            $.get("/user_info",function(data){
                $("#content").empty();
                $("#content").prepend(data)
            })
        }});

    }
    else   {
        $('#content').load(url);
    }
    return false;
})  ;

$('#content').on('submit', '#new_user', function(a){
        alert('n')
        var params=$(this).serialize();
        var url=$(this).attr('action');
        $.post(url, params,function(data){
            $("#content").empty();
            if (data.indexOf("<!DOCTYPE html>")>=0){
                alert(data.getElementsByTagName('meta').item("name=csrf-token"));
                $.get("/user_info",function(data){
                    $("#content").prepend(data)
                })
            }
            else{
                $("#content").prepend(data);
            }

        })
        return false;
});


    $('#content').on('click', 'input.imgClassDelete', function(a){
        $.delete("delete_task")
    });

});
