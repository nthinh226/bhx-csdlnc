$(document).ready(function() {
    var s=$(".txtsearch").val();
    searchData(s,0,2);
     var flag=0;
    $(".btnluu").prop("disabled",true);
    $(".btnsua").prop("disabled",true);
    console.log("Nha cung cap OK");
    $(".btnlamlai").click(function(){
        $(".txtmancc").val("");
        $(".txttenncc").val("");
        $(".txtdiachincc").val("");
        $(".txtsdtncc").val("");
        $(".txtemailncc").val("");
        $(".txtmasothue").val("");
        $(".txtanhncc").val("");

        $(".txtmancc").focus();
    })
    $(".btnthem").click(function(){
        flag=1;
        $(".btnthem").prop("disabled",true);
        $(".txtmancc").val("");
        $(".txttenncc").val("");
        $(".txtdiachincc").val("");
        $(".txtsdtncc").val("");
        $(".txtemailncc").val("");
        $(".txtmasothue").val("");
        $(".txtanhncc").val("");
        $(".txtmancc").focus();
        $(".btnluu").prop("disabled",false);
        $(".btnsua").prop("disabled",true);

    })
    $(".btnsua").click(function(){
        $(".txtmancc").prop("disabled",true)
        flag=2;
        $(".btnsua").prop("disabled",true);
        $(".btnthem").prop("disabled",true);
        $(".btnluu").prop("disabled",false);
        $(".txttenncc").focus();
    });
    $(".btnluu").click(function(){
        var objdata={
            mancc: $(".txtmancc").val(),
            tenncc: $(".txttenncc").val(),
            diachincc: $(".txtdiachincc").val(),
            sdtncc: $(".txtsdtncc").val(),
            emailncc: $(".txtemailncc").val(),
            masothue: $(".txtmasothue").val(),
            anhncc: $(".txtanhncc").val().replace('C:\\fakepath\\','')
        }

        if (flag == 1) {
            console.log("flag: " + flag);
            queryData("back_end/nhacc/insert_nhacungcap.php",objdata,function(res){
                console.log(res);
                if(res.success==1){
                    //alert("Thêm thành công");
                    bootbox.alert("Thêm thành công!");
                    $(".txtmancc").val("");
                    $(".txttenncc").val("");
                    $(".txtdiachincc").val("");
                    $(".txtsdtncc").val("");
                    $(".txtemailncc").val("");
                    $(".txtmasothue").val("");
                    $(".txtanhncc").val("");

                    $(".txtmancc").focus();
                    searchData(s,0,record);
                }else{
                    //alert("Thêm không thành công");
                    bootbox.alert("Thêm không thành công!");
                }
            })
        } else if (flag ==2) {
            queryData("back_end/nhacc/update_nhacc.php",objdata,function(res){
                if(res.success==1){
                    //alert("Thêm thành công");
                    bootbox.alert("Cập nhật thành công!");
                  //  loadDataTopic();
                  searchData(s,0,record);
                }else{
                    //alert("Thêm không thành công");
                    bootbox.alert("Cập nhật không thành công!");
                }
            })
         
        }
    });
    $(".addListNhacc").on('click','.click_image',function(){

        $('.showimage').modal('show');
        var anhncc=$(this).attr("data-image");
        $(".addimage").attr("src","fileanh/nhacc/"+anhncc);
    });
     $(".addListNhacc").on('click','.click_sua',function(){
        $(".txtmancc").prop("disabled",true)
        flag = 2;
         var mancc=$(this).parents().attr("data-mancc");
         var tenncc=$(this).parents().attr("data-tenncc");
         var diachincc=$(this).parents().attr("data-diachincc");
         var sdtncc=$(this).parents().attr("data-sdtncc");
         var emailncc=$(this).parents().attr("data-emailncc");
         var masothue=$(this).parents().attr("data-masothue");
         $(".txtmancc").val(mancc);
         $(".txttenncc").val(tenncc);
         $(".txtdiachincc").val(diachincc);
         $(".txtsdtncc").val(sdtncc);
         $(".txtemailncc").val(emailncc);
         $(".txtmasothue").val(masothue);

         $(".txtdiachincc").val(diachincc);

         
         $(".btnsua").prop("disabled",false);
         $(".btnthem").prop("disabled",true);
         $(".btnluu").prop("disabled",false);
         $(".txttenncc").focus();
     })
     $(".btnsua").click(function(){
        $(".txtmancc").prop("disabled",true)
         flag=2;
         $(".btnsua").prop("disabled",true);
         $(".btnthem").prop("disabled",true);
         $(".btnluu").prop("disabled",false);
         $(".txttenncc").focus();
     });
     $(".addListNhacc").on('click','.click_xoa',function(){
         var mancc=$(this).parents().attr("data-mancc");
         bootbox.confirm("Bạn có chắc xóa mục này không?!", function(result){ 

             if(result==true){
                 var objdata={
                     mancc:mancc
                 }
                 queryData("back_end/nhacc/delete_nhacc.php",objdata,function(res){
                     console.log(res);
                     if(res.success==1){
                         bootbox.alert("Xóa thành công!");
                        searchData(s,0,2);
                     }else{
                         bootbox.alert("Xóa không thành công!");
                     }
                 })
             }
         });
     })
        //Bắt sự kiện nút search
     $(".btnsearch1").click(function(){
        var s=$(".txtsearch").val();
        console.log("nút search click:"+s);
        searchData(s,0,record);
    })
    
    
    //bắt sự kiện nhấn ký tự, 
    $('.txtsearch').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){ //enter=13 tra bảng max ascii
            var s=$(".txtsearch").val();
            console.log("nút search click:"+s);
            searchData(s,0,record);
        }
        event.stopPropagation();
    });

    $(".pagenumnhacc").on('click', 'button', function () {
       console.log("page:"+$(this).val());
       searchData(s, $(this).val(), 2);
    });
});
        
function searchData(s,p,re){
    var objdata={
        search:s,
        page: p,
        record: re
    }

    queryData("back_end/nhacc/get_all_nhacc.php",objdata,function(res){
        $(".addListNhacc").html("<img src='images/loading.gif' width='30px' height='30px' />Loading");
        var body='';
        var mang=res.items;
        if(mang.length==0){
            $(".addListNhacc").html("<tr><td colspan ='2'>Khong tim thay du lieu</td></tr>");
            $(".pagenumnhacc").html("");
        }else{
            for(var item in mang ){
                var x=mang[item];
                body=body+ '<tr>'+
                '<td>'+(parseInt(item)+1)+'</td>'+
                '<td>'+x.mancc+'</td>'+
                '<td class="text-danger">'+x.tenncc+'</td>'+
                '<td data-image="'+x.anhncc+'" class="text-danger click_image"><img class="img-xs rounded-circle" src="fileanh/nhacc/'+x.anhncc+'" alt="Profile image"></td>'+
                '<td data-mancc="'+x.mancc+'" data-tenncc="'+x.tenncc+'" data-diachincc="'+x.diachincc+'" data-sdtncc="'+x.sdtncc+'"data-emailncc="'+x.emailncc+'" data-masothue="'+x.masothue+'"><label class="badge badge-danger click_sua"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;Sửa</label>&nbsp;<label class="badge badge-danger click_xoa"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Xóa</label></td>'+
                '</tr>';
            }
            buildSlidePage($(".pagenumnhacc"), 5, res.page, res.totalpage);
            $(".addListNhacc").html(body);
        }
        
    })

}
