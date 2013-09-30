$(function(){
$(document).ready(function(){
    if ($('#content').text().length == 0) {
        $.get("/user_info", function (data) {
            $("#content").prepend(data)
            $(".tasks").tableDnD({//dragHandle: ".drag",
                dragHandle: "input.imgClassUp"


            });
        });
    }
})


    $("#content").on('click', 'input#add_list', function()
    {
            $.ajax({
            url:"new_project",
            type: 'POST',
            success: function(result) {
                result.appendTo($(this))

            },
            error :function(){alert('error')}
   })
        alert('The project is added. Reload page please')
 });

    $("#content").on ('click', 'input[name="isDone"]', function(){
            status=$(this).is(':checked')
            $.ajax({
            url:$(this).attr('href'),
            type: 'PUT',
            data:{status:status },
            success: function(result) {
            },

            error :function(){alert('error')}
    });
   });

    $('#content').on('click', ".new_task_submit", function(){
        var params=$(this).parents("tr").children('.for_form').children('form').serialize()
        $.post("new_task", params)
        alert('The task is added. Reload page please')
        return false;
    });

        $("#content").on('click','input.imgClassEdit', function(e) {
            var $tables = $(".tasks");
            if (!this.name) {this.name='Save'
            editable(this);
            e.preventDefault();
            }

           else{
                var name=$('#new_name').val();
                var $row = $(this).parents('tr');

                $.ajax({
                    url:$(this).attr('href'),
                    type: 'PUT',
                    dataType: "html",
                    data: {
                        new_name: name
                     },
                    success: function(result) {
                        resStr = result.substring(result.lastIndexOf('<link') + 1, result.indexOf('</tr>'));
                        $row.replaceWith(resStr)
                    }
                });
                 this.name=null;

                }

        });






        function  editable (button) {
        var $button = $(button);
        var $row = $button.parents('tr');
        var $cells = $row.children('td.editable.col_change').not('.edit');
            $cells.each(function () {
                var _cell = $(this);
                var d=_cell.data('text')
                _cell.data('text',_cell.html())
                .html('');
                var $input = $('<input type="text" id ="new_name"/>')
                    .val(_cell.data('text'))
                    .width(_cell.width());
                _cell.append($input);
            });
    };

    function  editableP (button) {
        var $button = $(button);
      //  alert('editableP')
        var $row = $button.parents('tr');
        var $cells = $row.children('td.editable').not('.edit');
        $cells.each(function () {
            var _cell = $(this);
            var d=_cell.data('text')
            _cell.data('text',_cell.html())
                .html('');
            var $input = $('<input type="text" id ="new_project_name"/>')
                .val(_cell.data('text'))
                .width(_cell.width() - 16);
            _cell.append($input);
        });
    };


    $("#content").on('click','input.imgClassEditProject', function(e) {
        var $tables = $(".tasks");
       // alert(this.name)
        if (!this.name) {this.name='Save'
            editableP(this);
            e.preventDefault();

        }

        else{
            var name=$('#new_project_name').val();
            $table1=$(this).parents('.tasks')
            $.ajax({
                url:$(this).attr('href'),
                type: 'PUT',
                data: {
                    new_name: name
                },
                success: function(result) {
                    resStr = result.substring(result.indexOf('<table'), result.indexOf('</table>'));
                    //alert(resStr)

                    $table1.replaceWith(resStr)
                }
            });
            this.name=null;
        }
    });



    $('#content').on('click', 'a', function(a){
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
        var params=$(this).serialize();
        var url=$(this).attr('action');
        $.post(url, params,function(data){
            $("#content").empty();
            if (data.indexOf("<!DOCTYPE html>")>=0){
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

       var id ='#'+$(this).attr('name')
        $.ajax({
            url:$(this).attr('href'),
            type: 'DELETE',
            success: function(result) {
                $(id).remove()
            }
        });

    });

    $('#content').on('click', 'input.imgClassDeleteProject', function(a){

        var id ='#'+$(this).attr('name')
        $.ajax({
            url:$(this).attr('href'),
            type: 'DELETE',
            success: function(result) {
                $(id).remove()
            }
        });

    });

});
