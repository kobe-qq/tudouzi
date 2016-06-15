$(function(){
    $(document).on('selectstart',function(){
        return false;
    })
    $(document).on("mousedown",function(e){
        var target = e.target;
        var ox = e.offsetX;
        var oy = e.offsetY;
        $(document).on('mousemove',function(e){
            var px = e.clientX;
            var py = e.clientY;
            $(target).trigger('drag',{left:px-ox,top:py-oy});
        });

        $(document).on("mouseup",function(){
            $(document).off('mousemove');
            $(document).off('mouseup');
        });
    });
    //输入框的动画
    //按钮
    var add=$(".add");
    //输入框
    var form=$("form");
    //输入框关闭的按钮
    var formClose=$(".formclose");
    var flag=true;

    add.click(function(){

        if(flag) {
            form.attr({"data-a":"animate-fadein"}).css("display","block");
            flag=false;
        }else{
            form.attr({"data-a":"animate-fadeout"});
            flag=true;
        }
    });
    formClose.click(function(){
        form.attr({"data-a":"animate-fadeout"})
        flag=true;
    });


    /*表单的验证*/

    $(".submitbtn").click(function(){
        var textv=form.find(":text").val();
        var conv=form.find("textarea").val();
        var timev=form.find("#time").val();


        if(textv==""){
            alert("标题不能为空");

            return;
        }
        if(conv==""){
            alert("内容不能为空");
            return;
        }
        if(timev==""){
            alert("时间必选");
            return;
        }

        //存储信息
        var oldv=localStorage.message==null?[]:JSON.parse(localStorage.message);

        var obj={title:textv,con:conv,time:timev,id:new Date().getTime()};
        oldv.push(obj);
        var str=JSON.stringify(oldv);
        localStorage.message=str;
        form.find(":text").val("");
        form.find("textarea").val("");
        form.find("#time").val("");

        //显示信息

        var copy=$(".con:first").clone().appendTo("body").fadeIn(100).css({
            left:($(window).width()-$(".con").outerWidth())*Math.random(),
            top:($(window).height()-$(".con").outerHeight())*Math.random()
        }).attr("data-a","animate-sd").attr("id",obj.id);
        copy.find(".title-con").html(obj.title);
        copy.find(".con-con").html(obj.con);
        copy.find(".time-con").html(obj.time);

    })

        //显示页面加载已经保存的内容
        var messages=localStorage.message==null?[]:JSON.parse(localStorage.message);
        for(var i=0;i<messages.length;i++){
            var copy=$(".con:first").clone().appendTo("body").fadeIn(100).css({
                left:($(window).width()-$(".con").outerWidth())*Math.random(),
                top:($(window).height()-$(".con").outerHeight())*Math.random(),
                display:"block"
            }).attr("data-a","animate-sd").attr("id",messages[i].id);
            copy.find(".title-con").html(messages[i].title);
            copy.find(".con-con").html(messages[i].con);
            copy.find(".time-con").html(messages[i].time);
        }


    //拖拽
        $(document).delegate(".con","drag",function(e,data){
            $(this).css({
                left:data.left,
                top:data.top
            })
        });
        $(document).delegate(".con","mousedown",function(){
            $(".con").css({
                zIndex:0,
            })
            $(this).css({
                zIndex:1
            })
        });

    $(document).delegate('.con .close','click',function(e){
        e.stopPropagation();
        var messageTmp = JSON.parse(localStorage.message);
        var id = $(this).parent().attr('id');
        for(var i=0 ; i<messageTmp.length;i++){
            if(messageTmp[i].id == id){
                messageTmp.splice(i,1);
                localStorage.message = JSON.stringify(messageTmp);
                $(this).parent().remove();
                break;
            }
        }
    })


})
