$(document).ready(function() {
    var s=$(".txtsearch").val();
    searchData(s,0,2);
     var flag=0;
    $(".btnluu").prop("disabled",true);
    $(".btnsua").prop("disabled",true);
    console.log("Shipper OK");
    $(".btnlamlai").click(function(){
        $(".txtmashipper").val("");
        $(".txttenshipper").val("");
        $(".txtsdtshipper").val("");
        $(".txtemailshipper").val("");
        $(".txtanhshipper").val("");

        $(".txtmashipper").focus();
    })
    $(".btnthem").click(function(){
        flag=1;
        $(".btnthem").prop("disabled",true);
        $(".txtmashipper").val("");
        $(".txttenshipper").val("");
        $(".txtsdtshipper").val("");
        $(".txtemailshipper").val("");
        $(".txtanhshipper").val("");
        $(".txtmashipper").focus();
        $(".btnluu").prop("disabled",false);
        $(".btnsua").prop("disabled",true);

    })
    $(".btnsua").click(function(){
        $(".txtmashipper").prop("disabled",true)
        flag=2;
        $(".btnsua").prop("disabled",true);
        $(".btnthem").prop("disabled",true);
        $(".btnluu").prop("disabled",false);
        $(".txttenshipper").focus();
    });
    $(".btnluu").click(function(){
        var objdata={
            mashipper: $(".txtmashipper").val(),
            tenshipper: $(".txttenshipper").val(),
            sdtshipper: $(".txtsdtshipper").val(),
            emailshipper: $(".txtemailshipper").val(),
            anhshipper: $(".txtanhshipper").val().replace('C:\\fakepath\\','')
        }

        if (flag == 1) {
            console.log("flag: " + flag);
            queryData("back_end/shipper/insert_shipper.php",objdata,function(res){
                console.log(res);
                if(res.success==1){
                    //alert("Thêm thành công");
                    bootbox.alert("Thêm thành công!");
                    $(".txtmashipper").val("");
                    $(".txttenshipper").val("");
                    $(".txtsdtshipper").val("");
                    $(".txtemailshipper").val("");
                    $(".txtanhshipper").val("");

                    $(".txtmashipper").focus();
                    searchData(s,0,record);
                }else{
                    //alert("Thêm không thành công");
                    bootbox.alert("Thêm không thành công!");
                }
            })
        } else if (flag ==2) {
            queryData("back_end/shipper/update_shipper.php",objdata,function(res){
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
    $(".addListShipper").on('click','.click_image',function(){

        $('.showimage').modal('show');
        var anhshipper=$(this).attr("data-image");
        $(".addimage").attr("src","fileanh/shipper/"+anhshipper);
    });
     $(".addListShipper").on('click','.click_sua',function(){
        $(".txtmashipper").prop("disabled",true)
        flag = 2;
         var mashipper=$(this).parents().attr("data-mashipper");
         var tenshipper=$(this).parents().attr("data-tenshipper");
         var sdtshipper=$(this).parents().attr("data-sdtshipper");
         var emailshipper=$(this).parents().attr("data-emailshipper");
         $(".txtmashipper").val(mashipper);
         $(".txttenshipper").val(tenshipper);
         $(".txtsdtshipper").val(sdtshipper);
         $(".txtemailshipper").val(emailshipper);

         
         $(".btnsua").prop("disabled",false);
         $(".btnthem").prop("disabled",true);
         $(".btnluu").prop("disabled",false);
         $(".txttenshipper").focus();
     })
     $(".btnsua").click(function(){
        $(".txtmashipper").prop("disabled",true)
         flag=2;
         $(".btnsua").prop("disabled",true);
         $(".btnthem").prop("disabled",true);
         $(".btnluu").prop("disabled",false);
         $(".txttenshipper").focus();
     });
     $(".addListShipper").on('click','.click_xoa',function(){
         var mashipper=$(this).parents().attr("data-mashipper");
         bootbox.confirm("Bạn có chắc xóa mục này không?!", function(result){ 

             if(result==true){
                 var objdata={
                     mashipper:mashipper
                 }
                 queryData("back_end/shipper/delete_shipper.php",objdata,function(res){
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

    $(".pagenumshipper").on('click', 'button', function () {
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

    queryData("back_end/shipper/api_getallshipper.php",objdata,function(res){
        $(".addListShipper").html("<img src='images/loading.gif' width='30px' height='30px' />Loading");
        var body='';
        var mang=res.items;
        if(mang.length==0){
            $(".addListShipper").html("<tr><td colspan ='2'>Khong tim thay du lieu</td></tr>");
            $(".pagenumshipper").html("");
        }else{
            for(var item in mang ){
                var x=mang[item];
                body=body+ '<tr>'+
                '<td>'+(parseInt(item)+1)+'</td>'+
                '<td>'+x.mashipper+'</td>'+
                '<td class="text-danger">'+x.tenshipper+'</td>'+
                '<td data-image="'+x.anhshipper+'" class="text-danger click_image"><img class="img-xs rounded-circle" src="fileanh/shipper/'+x.anhshipper+'" alt="Profile image"></td>'+
                '<td data-mashipper="'+x.mashipper+'" data-tenshipper="'+x.tenshipper+'" data-sdtshipper="'+x.sdtshipper+'"data-emailshipper="'+x.emailshipper+'"><label class="badge badge-danger click_sua"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;Sửa</label>&nbsp;<label class="badge badge-danger click_xoa"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Xóa</label></td>'+
                '</tr>';
            }
            buildSlidePage($(".pagenumshipper"), 5, res.page, res.totalpage);
            $(".addListShipper").html(body);
        }
        
    })

}
