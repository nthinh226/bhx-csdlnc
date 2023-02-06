$(document).ready(function() {
    var s=$(".txtsearch").val();
    searchData(s,0,2);
     var flag=0;
    $(".btnluu").prop("disabled",true);
    $(".btnsua").prop("disabled",true);
    console.log(" OK");
    $(".btnlamlai").click(function(){
        $(".txtmanv").val("");
        $(".txttennv").val("");
        $(".txtngaysinhnv").val("");
        $(".txtdiachinv").val("");
        $(".txtsdtnv").val("");
        $(".txtemailnv").val("");
        $(".txtanhnv").val("");
        $(".txtcccd").val("");
        $(".txtmanv").focus();
    })
    $(".btnthem").click(function(){
        flag=1;
        $(".btnthem").prop("disabled",true);
        $(".txtmanv").val("");
        $(".txttennv").val("");
        $(".txtngaysinhnv").val("");
        $(".txtdiachinv").val("");
        $(".txtsdtnv").val("");
        $(".txtemailnv").val("");
        $(".txtanhnv").val("");
        $(".txtcccd").val("");
        $(".txtmanv").focus();
        $(".btnluu").prop("disabled",false);
        $(".btnsua").prop("disabled",true);

    })
    $(".btnsua").click(function(){
        $(".txtmanv").prop("disabled",true)
        flag=2;
        $(".btnsua").prop("disabled",true);
        $(".btnthem").prop("disabled",true);
        $(".btnluu").prop("disabled",false);
        $(".txttennv").focus();
    });
    $(".btnluu").click(function(){
        var objdata={
            manv: $(".txtmanv").val(),
            tennv: $(".txttennv").val(),
            ngaysinhnv: $(".txtngaysinhnv").val(),
            diachinv: $(".txtdiachinv").val(),
            sdtnv: $(".txtsdtnv").val(),
            emailnv: $(".txtemailnv").val(),
            cccd: $(".txtcccd").val(),
            anhnv: $(".txtanhnv").val().replace('C:\\fakepath\\','')
        }
        console.log(objdata);
        if (flag == 1) {
            
            queryData("back_end/nhanvien/insert_nhanvien.php",objdata,function(res){
                console.log("flag: " + flag);
                console.log(res);
                if(res.success==1){
                    //alert("Thêm thành công");
                    bootbox.alert("Thêm thành công!");
                    
                    searchData(s,0,record);
                }else{
                    //alert("Thêm không thành công");
                    bootbox.alert("Thêm không thành công!");
                }
            })
        } else if (flag ==2) {
            queryData("back_end/nhanvien/update_nhanv.php",objdata,function(res){
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
        $(".txtmanv").val("");
                    $(".txttennv").val("");
                    $(".txtngaysinhnv").val("");
                    $(".txtdiachinv").val("");
                    $(".txtsdtnv").val("");
                    $(".txtemailnv").val("");
                    $(".txtanhnv").val("");
                    $(".txtcccd").val("");
                    $(".txtmanv").focus();
    });
    $(".addListNhanvien").on('click','.click_image',function(){

        $('.showimage').modal('show');
        var anhnv=$(this).attr("data-image");
        $(".addimage").attr("src","fileanh/nhanv/"+anhnv);
    });
     $(".addListNhanvien").on('click','.click_sua',function(){
        $(".txtmanv").prop("disabled",true)
        flag = 2;
         var manv=$(this).parents().attr("data-manv");
         var tennv=$(this).parents().attr("data-tennv");
         var ngaysinhnv=$(this).parents().attr("data-ngaysinhnv");
         var diachinv=$(this).parents().attr("data-diachinv");
         var sdtnv=$(this).parents().attr("data-sdtnv");
         var emailnv=$(this).parents().attr("data-emailnv");
         var cccd=$(this).parents().attr("data-cccd");
         $(".txtmanv").val(manv);
         $(".txttennv").val(tennv);
         $(".txtngaysinhnv").val(ngaysinhnv);
         $(".txtdiachinv").val(diachinv);
         $(".txtsdtnv").val(sdtnv);
         $(".txtemailnv").val(emailnv);
         $(".txtcccd").val(cccd);
         
         $(".btnsua").prop("disabled",false);
         $(".btnthem").prop("disabled",true);
         $(".btnluu").prop("disabled",false);
         $(".txttennv").focus();
     })
     $(".btnsua").click(function(){
        $(".txtmanv").prop("disabled",true)
         flag=2;
         $(".btnsua").prop("disabled",true);
         $(".btnthem").prop("disabled",true);
         $(".btnluu").prop("disabled",false);
         $(".txttennv").focus();
     });
     $(".addListNhanvien").on('click','.click_xoa',function(){
         var manv=$(this).parents().attr("data-manv");
         bootbox.confirm("Bạn có chắc xóa mục này không?!", function(result){ 

             if(result==true){
                 var objdata={
                     manv:manv
                 }
                 queryData("back_end/nhanvien/delete_nhanv.php",objdata,function(res){
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

    $(".pagenumnhanvien").on('click', 'button', function () {
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

    queryData("back_end/nhanvien/get_all_nhanv.php",objdata,function(res){
        $(".addListNhanvien").html("<img src='images/loading.gif' width='30px' height='30px' />Loading");
        var body='';
        var mang=res.items;
        if(mang.length==0){
            $(".addListNhanvien").html("<tr><td colspan ='2'>Khong tim thay du lieu</td></tr>");
            $(".pagenumnhanvien").html("");
        }else{
            for(var item in mang ){
                var x=mang[item];
                body=body+ '<tr>'+
                '<td>'+(parseInt(item)+1)+'</td>'+
                '<td>'+x.manv+'</td>'+
                '<td class="text-danger">'+x.tennv+'</td>'+
                '<td data-image="'+x.anhnv+'" class="text-danger click_image"><img class="img-xs rounded-circle" src="fileanh/nhanv/'+x.anhnv+'" alt="Profile image"></td>'+
                '<td data-manv="'+x.manv+'" data-tennv="'+x.tennv+'" data-ngaysinhnv="'+x.ngaysinhnv+'" data-diachinv="'+x.diachinv+'" data-sdtnv="'+x.sdtnv+'"data-emailnv="'+x.emailnv+'" data-cccd="'+x.cccd+'"><label class="badge badge-danger click_sua"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;Sửa</label>&nbsp;<label class="badge badge-danger click_xoa"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Xóa</label></td>'+
                '</tr>';
            }
            buildSlidePage($(".pagenumnhanvien"), 5, res.page, res.totalpage);
            $(".addListNhanvien").html(body);
        }
        
    })

}
