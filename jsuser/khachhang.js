$(document).ready(function() {
    var s=$(".txtsearch").val();
    searchData(s,0,2);
     var flag=0;
    $(".btnluu").prop("disabled",true);
    $(".btnsua").prop("disabled",true);
    console.log(" OK");
    $(".btnlamlai").click(function(){
        $(".txtmakh").val("");
        $(".txttenkh").val("");
        $(".txtngaysinh").val("");
        $(".txtdiachikh").val("");
        $(".txtsdtkh").val("");
        $(".txtemailkh").val("");
        $(".txtanhkh").val("");
        $(".txtloaikh").val("");
        $(".txtmakh").focus();
    })
    $(".btnthem").click(function(){
        flag=1;
        $(".btnthem").prop("disabled",true);
        $(".txtmakh").val("");
        $(".txttenkh").val("");
        $(".txtngaysinh").val("");
        $(".txtdiachikh").val("");
        $(".txtsdtkh").val("");
        $(".txtemailkh").val("");
        $(".txtanhkh").val("");
        $(".txtloaikh").val("");
        $(".txtmakh").focus();
        $(".btnluu").prop("disabled",false);
        $(".btnsua").prop("disabled",true);

    })
    $(".btnsua").click(function(){
        $(".txtmakh").prop("disabled",true)
        flag=2;
        $(".btnsua").prop("disabled",true);
        $(".btnthem").prop("disabled",true);
        $(".btnluu").prop("disabled",false);
        $(".txttenkh").focus();
    });
    $(".btnluu").click(function(){
        var objdata={
            makh: $(".txtmakh").val(),
            tenkh: $(".txttenkh").val(),
            ngaysinh: $(".txtngaysinh").val(),
            diachikh: $(".txtdiachikh").val(),
            sdtkh: $(".txtsdtkh").val(),
            emailkh: $(".txtemailkh").val(),
            loaikh: $(".txtloaikh").val(),
            anhkh: $(".txtanhkh").val().replace('C:\\fakepath\\','')
        }
        console.log(objdata);
        if (flag == 1) {
            
            queryData("back_end/khachhang/insert_khachhang.php",objdata,function(res){
                console.log("flag: " + flag);
                console.log(res);
                if(res.success==1){
                    //alert("Thêm thành công");
                    bootbox.alert("Thêm thành công!");
                    $(".txtmakh").val("");
                    $(".txttenkh").val("");
                    $(".txtngaysinh").val("");
                    $(".txtdiachikh").val("");
                    $(".txtsdtkh").val("");
                    $(".txtemailkh").val("");
                    $(".txtanhkh").val("");
                    $(".txtloaikh").val("");
                    $(".txtmakh").focus();
                    searchData(s,0,record);
                }else{
                    //alert("Thêm không thành công");
                    bootbox.alert("Thêm không thành công!");
                }
            })
        } else if (flag ==2) {
            queryData("back_end/khachhang/update_khachhang.php",objdata,function(res){
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
    $(".addListKhachhang").on('click','.click_image',function(){

        $('.showimage').modal('show');
        var anhkh=$(this).attr("data-image");
        $(".addimage").attr("src","fileanh/khachhang/"+anhkh);
    });
     $(".addListKhachhang").on('click','.click_sua',function(){
        $(".txtmakh").prop("disabled",true)
        flag = 2;
         var makh=$(this).parents().attr("data-makh");
         var tenkh=$(this).parents().attr("data-tenkh");
         var ngaysinh=$(this).parents().attr("data-ngaysinh");
         var diachikh=$(this).parents().attr("data-diachikh");
         var sdtkh=$(this).parents().attr("data-sdtkh");
         var emailkh=$(this).parents().attr("data-emailkh");
         var loaikh=$(this).parents().attr("data-loaikh");
         $(".txtmakh").val(makh);
         $(".txttenkh").val(tenkh);
         $(".txtngaysinh").val(ngaysinh);
         $(".txtdiachikh").val(diachikh);
         $(".txtsdtkh").val(sdtkh);
         $(".txtemailkh").val(emailkh);
         $(".txtloaikh").val(loaikh);
         
         $(".btnsua").prop("disabled",false);
         $(".btnthem").prop("disabled",true);
         $(".btnluu").prop("disabled",false);
         $(".txttenkh").focus();
     })
     $(".btnsua").click(function(){
        $(".txtmakh").prop("disabled",true)
         flag=2;
         $(".btnsua").prop("disabled",true);
         $(".btnthem").prop("disabled",true);
         $(".btnluu").prop("disabled",false);
         $(".txttenkh").focus();
     });
     $(".addListKhachhang").on('click','.click_xoa',function(){
         var makh=$(this).parents().attr("data-makh");
         bootbox.confirm("Bạn có chắc xóa mục này không?!", function(result){ 

             if(result==true){
                 var objdata={
                     makh:makh
                 }
                 queryData("back_end/khachhang/delete_khachhang.php",objdata,function(res){
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

    $(".pagenumkhachhang").on('click', 'button', function () {
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

    queryData("back_end/khachhang/get_all_khachhang.php",objdata,function(res){
        $(".addListKhachhang").html("<img src='images/loading.gif' width='30px' height='30px' />Loading");
        var body='';
        var mang=res.items;
        if(mang.length==0){
            $(".addListKhachhang").html("<tr><td colspan ='2'>Khong tim thay du lieu</td></tr>");
            $(".pagenumkhachhang").html("");
        }else{
            for(var item in mang ){
                var x=mang[item];
                body=body+ '<tr>'+
                '<td>'+(parseInt(item)+1)+'</td>'+
                '<td>'+x.makh+'</td>'+
                '<td class="text-danger">'+x.tenkh+'</td>'+
                '<td data-image="'+x.anhkh+'" class="text-danger click_image"><img class="img-xs rounded-circle" src="fileanh/khachhang/'+x.anhkh+'" alt="Profile image"></td>'+
                '<td data-makh="'+x.makh+'" data-tenkh="'+x.tenkh+'" data-ngaysinh="'+x.ngaysinh+'" data-diachikh="'+x.diachikh+'" data-sdtkh="'+x.sdtkh+'"data-emailkh="'+x.emailkh+'" data-loaikh="'+x.loaikh+'"><label class="badge badge-danger click_sua"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;Sửa</label>&nbsp;<label class="badge badge-danger click_xoa"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Xóa</label></td>'+
                '</tr>';
            }
            buildSlidePage($(".pagenumkhachhang"), 5, res.page, res.totalpage);
            $(".addListKhachhang").html(body);
        }
        
    })

}
