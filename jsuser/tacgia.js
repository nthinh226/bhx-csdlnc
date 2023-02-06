$(document).ready(function() {
    var s=$(".txtsearch").val();
    searchData(s,0,2);
     var flag=0;
    $(".btnluu").prop("disabled",true);
    $(".btnsua").prop("disabled",true);
    console.log("Tac gia OK");
    $(".btnlamlai").click(function(){
        $(".txtmatg").val("");
        $(".txttentg").val("");
        $(".txtngaysinhtg").val("");
        $(".txtdiachitg").val("");
        $(".txtsdttg").val("");
        $(".txtemailtg").val("");
        $(".txtanhtg").val("");

        $(".txtmatg").focus();
    })
    $(".btnthem").click(function(){
        flag=1;
        $(".btnthem").prop("disabled",true);
        $(".txtmatg").val("");
        $(".txttentg").val("");
        $(".txtngaysinhtg").val("");
        $(".txtdiachitg").val("");
        $(".txtsdttg").val("");
        $(".txtemailtg").val("");
        $(".txtanhtg").val("");
        $(".txtmatg").focus();
        $(".btnluu").prop("disabled",false);
        $(".btnsua").prop("disabled",true);

    })
    $(".btnsua").click(function(){
        $(".txtmatg").prop("disabled",true)
        flag=2;
        $(".btnsua").prop("disabled",true);
        $(".btnthem").prop("disabled",true);
        $(".btnluu").prop("disabled",false);
        $(".txttentg").focus();
    });
    $(".btnluu").click(function(){
        var objdata={
            matg: $(".txtmatg").val(),
            tentg: $(".txttentg").val(),
            ngaysinhtg: $(".txtngaysinhtg").val(),
            diachitg: $(".txtdiachitg").val(),
            sdttg: $(".txtsdttg").val(),
            emailtg: $(".txtemailtg").val(),
            anhtg: $(".txtanhtg").val().replace('C:\\fakepath\\','')
        }

        if (flag == 1) {
            console.log("flag: " + flag);
            queryData("back_end/tacgia/insert_tacgia.php",objdata,function(res){
                console.log(res);
                if(res.success==1){
                    //alert("Thêm thành công");
                    bootbox.alert("Thêm thành công!");
                    $(".txtmatg").val("");
                    $(".txttentg").val("");
                    $(".txtngaysinhtg").val("");
                    $(".txtdiachitg").val("");
                    $(".txtsdttg").val("");
                    $(".txtemailtg").val("");
                    $(".txtanhtg").val("");

                    $(".txtmatg").focus();
                    searchData(s,0,record);
                }else{
                    //alert("Thêm không thành công");
                    bootbox.alert("Thêm không thành công!");
                }
            })
        } else if (flag ==2) {
            queryData("back_end/tacgia/update_tacgia.php",objdata,function(res){
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
    $(".addListTacgia").on('click','.click_image',function(){

        $('.showimage').modal('show');
        var anhtg=$(this).attr("data-image");
        $(".addimage").attr("src","fileanh/tacgia/"+anhtg);
    });
     $(".addListTacgia").on('click','.click_sua',function(){
        $(".txtmatg").prop("disabled",true)
        flag = 2;
         var matg=$(this).parents().attr("data-matg");
         var tentg=$(this).parents().attr("data-tentg");
         var ngaysinhtg=$(this).parents().attr("data-ngaysinhtg");
         var diachitg=$(this).parents().attr("data-diachitg");
         var sdttg=$(this).parents().attr("data-sdttg");
         var emailtg=$(this).parents().attr("data-emailtg");
         $(".txtmatg").val(matg);
         $(".txttentg").val(tentg);
         $(".txtngaysinhtg").val(ngaysinhtg);
         $(".txtdiachitg").val(diachitg);
         $(".txtsdttg").val(sdttg);
         $(".txtemailtg").val(emailtg);
         

         $(".txtdiachitg").val(diachitg);

         
         $(".btnsua").prop("disabled",false);
         $(".btnthem").prop("disabled",true);
         $(".btnluu").prop("disabled",false);
         $(".txttentg").focus();
     })
     $(".btnsua").click(function(){
        $(".txtmatg").prop("disabled",true)
         flag=2;
         $(".btnsua").prop("disabled",true);
         $(".btnthem").prop("disabled",true);
         $(".btnluu").prop("disabled",false);
         $(".txttentg").focus();
     });
     $(".addListTacgia").on('click','.click_xoa',function(){
         var matg=$(this).parents().attr("data-matg");
         bootbox.confirm("Bạn có chắc xóa mục này không?!", function(result){ 

             if(result==true){
                 var objdata={
                     matg:matg
                 }
                 console.log(objdata);
                 queryData("back_end/tacgia/delete_tacgia.php",objdata,function(res){
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

    $(".pagenumtacgia").on('click', 'button', function () {
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

    queryData("back_end/tacgia/get_all_tacgia.php",objdata,function(res){
        $(".addListTacgia").html("<img src='images/loading.gif' width='30px' height='30px' />Loading");
        var body='';
        var mang=res.items;
        if(mang.length==0){
            $(".addListTacgia").html("<tr><td colspan ='2'>Khong tim thay du lieu</td></tr>");
            $(".pagenumtacgia").html("");
        }else{
            for(var item in mang ){
                var x=mang[item];
                body=body+ '<tr>'+
                '<td>'+(parseInt(item)+1)+'</td>'+
                '<td>'+x.matg+'</td>'+
                '<td class="text-danger">'+x.tentg+'</td>'+
                '<td data-image="'+x.anhtg+'" class="text-danger click_image"><img class="img-xs rounded-circle" src="fileanh/tacgia/'+x.anhtg+'" alt="Profile image"></td>'+
                '<td data-matg="'+x.matg+'" data-tentg="'+x.tentg+'" data-ngaysinhtg="'+x.ngaysinhtg+'" data-diachitg="'+x.diachitg+'" data-sdttg="'+x.sdttg+'"data-emailtg="'+x.emailtg+'"><label class="badge badge-danger click_sua"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;Sửa</label>&nbsp;<label class="badge badge-danger click_xoa"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Xóa</label></td>'+
                '</tr>';
            }
            buildSlidePage($(".pagenumtacgia"), 5, res.page, res.totalpage);
            $(".addListTacgia").html(body);
        }
        
    })

}
