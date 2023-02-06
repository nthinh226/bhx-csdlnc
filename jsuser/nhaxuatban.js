$(document).ready(function() {
    var s=$(".txtsearch").val();
    searchData(s,0,record);
     var flag=0;
    $(".btnluu").prop("disabled",true);
    $(".btnsua").prop("disabled",true);
    console.log(" OK");
    $(".btnlamlai").click(function(){
        $(".txtmaxb").val("");
        $(".txttenxb").val("");
        $(".txtdiachixb").val("");
        $(".txtsdtxb").val("");
        $(".txtemailxb").val("");
        $(".txtanhxb").val("");
        $(".txtlatxb").val("");
        $(".txtlngxb").val("");
        $(".txtmaxb").focus();
    })
    $(".btnthem").click(function(){
        flag=1;
        $(".btnthem").prop("disabled",true);
        $(".txtmaxb").val("");
        $(".txttenxb").val("");
        $(".txtdiachixb").val("");
        $(".txtsdtxb").val("");
        $(".txtemailxb").val("");
        $(".txtanhxb").val("");
        $(".txtlatxb").val("");
        $(".txtlngxb").val("");
        $(".txtmaxb").focus();
        $(".btnluu").prop("disabled",false);
        $(".btnsua").prop("disabled",true);

    })
    $(".btnsua").click(function(){
        $(".txtmaxb").prop("disabled",true)
        flag=2;
        $(".btnsua").prop("disabled",true);
        $(".btnthem").prop("disabled",true);
        $(".btnluu").prop("disabled",false);
        $(".txttenxb").focus();
    });
    $(".btnluu").click(function(){
        var objdata={
            maxb: $(".txtmaxb").val(),
            tenxb: $(".txttenxb").val(),
            diachixb: $(".txtdiachixb").val(),
            sdtxb: $(".txtsdtxb").val(),
            emailxb: $(".txtemailxb").val(),
            latxb: $(".txtlatxb").val(),
            lngxb: $(".txtlngxb").val(),
            anhxb: $(".txtanhxb").val().replace('C:\\fakepath\\','')
        }
        console.log(objdata);
        if (flag == 1) {
            
            queryData("back_end/nhaxuatban/insert_nhaxuatban.php",objdata,function(res){
                console.log("flag: " + flag);
                console.log(res);
                if(res.success==1){
                    //alert("Thêm thành công");
                    bootbox.alert("Thêm thành công!");
                    $(".txtmaxb").val("");
                    $(".txttenxb").val("");
                    $(".txtdiachixb").val("");
                    $(".txtsdtxb").val("");
                    $(".txtemailxb").val("");
                    $(".txtanhxb").val("");
                    $(".txtlatxb").val("");
                    $(".txtlngxb").val("");
                    $(".txtmaxb").focus();
                    searchData(s,0,record);
                }else{
                    //alert("Thêm không thành công");
                    bootbox.alert("Thêm không thành công!");
                }
            })
        } else if (flag ==2) {
            queryData("back_end/nhaxuatban/update_nhaxb.php",objdata,function(res){
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
    $(".addListNhaxb").on('click','.click_image',function(){

        $('.showimage').modal('show');
        var anhxb=$(this).attr("data-image");
        $(".addimage").attr("src","fileanh/nhaxb/"+anhxb);
    });
     $(".addListNhaxb").on('click','.click_sua',function(){
        $(".txtmaxb").prop("disabled",true)
        flag = 2;
         var maxb=$(this).parents().attr("data-maxb");
         var tenxb=$(this).parents().attr("data-tenxb");
         var diachixb=$(this).parents().attr("data-diachixb");
         var sdtxb=$(this).parents().attr("data-sdtxb");
         var emailxb=$(this).parents().attr("data-emailxb");
         var latxb=$(this).parents().attr("data-latxb");
         var lngxb=$(this).parents().attr("data-lngxb");
         $(".txtmaxb").val(maxb);
         $(".txttenxb").val(tenxb);
         $(".txtdiachixb").val(diachixb);
         $(".txtsdtxb").val(sdtxb);
         $(".txtemailxb").val(emailxb);
         $(".txtlatxb").val(latxb);
         $(".txtlngxb").val(lngxb);
         
         $(".btnsua").prop("disabled",false);
         $(".btnthem").prop("disabled",true);
         $(".btnluu").prop("disabled",false);
         $(".txttenxb").focus();
     })
     $(".btnsua").click(function(){
        $(".txtmaxb").prop("disabled",true)
         flag=2;
         $(".btnsua").prop("disabled",true);
         $(".btnthem").prop("disabled",true);
         $(".btnluu").prop("disabled",false);
         $(".txttenxb").focus();
     });
     $(".addListNhaxb").on('click','.click_xoa',function(){
         var maxb=$(this).parents().attr("data-maxb");
         bootbox.confirm("Bạn có chắc xóa mục này không?!", function(result){ 

             if(result==true){
                 var objdata={
                     maxb:maxb
                 }
                 queryData("back_end/nhaxuatban/delete_nhaxb.php",objdata,function(res){
                     console.log(res);
                     if(res.success==1){
                         bootbox.alert("Xóa thành công!");
                        searchData(s,0,record);
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

    $(".pagenumnhaxb").on('click', 'button', function () {
       console.log("page:"+$(this).val());
       searchData(s, $(this).val(), record);
    });
});
        
function searchData(s,p,re){
    var objdata={
        search:s,
        page: p,
        record: re
    }

    queryData("back_end/nhaxuatban/get_all_nhaxb.php",objdata,function(res){
        $(".addListNhaxb").html("<img src='images/loading.gif' width='30px' height='30px' />Loading");
        var body='';
        var mang=res.items;
        if(mang.length==0){
            $(".addListNhaxb").html("<tr><td colspan ='2'>Khong tim thay du lieu</td></tr>");
            $(".pagenumnhaxb").html("");
        }else{
            for(var item in mang ){
                var x=mang[item];
                body=body+ '<tr>'+
                '<td>'+(parseInt(item)+1)+'</td>'+
                '<td>'+x.maxb+'</td>'+
                '<td class="text-danger">'+x.tenxb+'</td>'+
                '<td data-image="'+x.anhxb+'" class="text-danger click_image"><img class="img-xs rounded-circle" src="fileanh/nhaxb/'+x.anhxb+'" alt="Profile image"></td>'+
                '<td data-maxb="'+x.maxb+'" data-tenxb="'+x.tenxb+'" data-diachixb="'+x.diachixb+'" data-sdtxb="'+x.sdtxb+'"data-emailxb="'+x.emailxb+'" data-latxb="'+x.latxb+'" data-lngxb="'+x.lngxb+'"><label class="badge badge-danger click_sua"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;Sửa</label>&nbsp;<label class="badge badge-danger click_xoa"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Xóa</label></td>'+
                '</tr>';
            }
            buildSlidePage($(".pagenumnhaxb"), 5, res.page, res.totalpage);
            $(".addListNhaxb").html(body);
        }
        
    })

}
