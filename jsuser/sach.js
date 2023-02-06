$(document).ready(function() {
    // loadDataTopic();
    loadCBKho();
    loadCBNXB();
    loadCBChude();
    // loadDataSach();
    var s=$(".txtsearch").val();
    searchData(s,0,record);
     var flag=0;
     $(".btnluu").prop("disabled",true);
     $(".btnsua").prop("disabled",true);
     console.log("ok");
     $(".btnlamlai").click(function(){
         console.log("click");
         $(".txtmasach").val("");
         $(".txttensach").val("");
         $(".txtsotrang").val("");
         $(".txtgiabia").val("");
         $(".txtanhsach").val("");
         $(".txtfilesach").val("");
         $(".txtngayxb").val("");
         loadCBKho();
         loadCBChude();
         loadCBNXB();
         $(".txtmasach").focus();
     })
     $(".btnthem").click(function(){
         flag=1;
         $(".btnthem").prop("disabled",true);
         $(".txtmasach").val("");
         $(".txttensach").val("");
         $(".txtsotrang").val("");
         $(".txtgiabia").val("");
         $(".txtanhsach").val("");
         $(".txtfilesach").val("");
         $(".txtngayxb").val("");
         $(".txtmasach").focus();
         $(".btnluu").prop("disabled",false);
         
        
     })
     $(".btnluu").click(function(){
        var objdata={
            masach: $(".txtmasach").val(),
            tensach: $(".txttensach").val(),
            sotrang: $(".txtsotrang").val(),
            ngayxb: $(".txtngayxb").val(),
            anhsach: $(".txtanhsach").val().replace('C:\\fakepath\\',''),
            filesach: $(".txtfilesach").val(),
            giabia: $(".txtgiabia").val(),
            makho: $(".cbmakho").val(),
            macd: $(".cbmacd").val(),
            maxb: $(".cbmaxb").val()
        }
         if(flag==1){
         
         console.log(objdata);
         queryData("back_end/sach/insert_sach.php",objdata,function(res){
             console.log(res);
             if(res.success==1){
                 //alert("Thêm thành công");
                 bootbox.alert("Thêm thành công!");
                 $(".txtmasach").val("");
                 $(".txttensach").val("");
                 $(".txtsotrang").val("");
                 $(".txtgiabia").val("");
                 $(".txtanhsach").val("");
                 $(".txtfilesach").val("");
                 $(".txtngayxb").val("");
                 $(".txtmasach").focus();
                searchData(s,0,record);
             }else{
                 //alert("Thêm không thành công");
                 bootbox.alert("Thêm không thành công!");
             }
         })
          }else if(flag==2){ //update
             queryData("back_end/sach/update_sach.php",objdata,function(res){
                 console.log(res);
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
     //Xoa
     $(".btnxoa").click(function(){
         bootbox.confirm("Bạn có chắc xóa mục này không?!", function(result){ 
             console.log('This was logged in the callback: ' + result); 
             if(result==true){
                 var objdata={
                     masach:$(".txtmasach").val()
                 }
                 console.log(objdata);
                 queryData("back_end/sach/delete_sach.php",objdata,function(res){
                     console.log(res);
                     if(res.success==1){
                         //alert("Thêm thành công");
                         bootbox.alert("Xóa thành công!");
                        // loadDataTopic();
                        searchData(s,0,record);
                     }else{
                         //alert("Thêm không thành công");
                         bootbox.alert("Xóa không thành công!");
                     }
                 })
             }
         });
     });
     $(".addListSach").on('click','.click_image',function(){

        $('.showimage').modal('show');
        var anhsach=$(this).attr("data-image");
        console.log(anhsach);
        $(".addimage").attr("src","fileanh/sach/"+anhsach);
    });
     $(".addListSach").on('click','.click_sua',function(){
        $(".txtmasach").prop("disabled",true)
        flag = 2;
         var masach=$(this).parents().attr("data-masach");
         var tensach=$(this).parents().attr("data-tensach");
         var sotrang=$(this).parents().attr("data-sotrang");
         var giabia=$(this).parents().attr("data-giabia");
        //  var anhsach=$(this).parents().attr("data-image");
        //  var filesach=$(this).parents().attr("data-filesach");
         var ngayxb=$(this).parents().attr("data-ngayxb");
         $(".txtmasach").val(masach);
         $(".txttensach").val(tensach);
         $(".txtsotrang").val(sotrang);
         $(".txtgiabia").val(giabia);
        //  $(".txtanhsach").val(anhsach);
        //  $(".txtfilesach").val(filesach);
         $(".txtngayxb").val(ngayxb);

         
         $(".btnsua").prop("disabled",false);
         $(".btnthem").prop("disabled",true);
         $(".btnluu").prop("disabled",false);
         $(".txttensach").focus();
     })
     $(".btnsua").click(function(){
        $(".txtmasach").prop("disabled",true)
         flag=2;
         $(".btnsua").prop("disabled",true);
         $(".btnthem").prop("disabled",true);
         $(".btnluu").prop("disabled",false);
         $(".txttensach").focus();
     });
     $(".addListSach").on('click','.click_xoa',function(){
         var masach=$(this).parents().attr("data-masach");
         bootbox.confirm("Bạn có chắc xóa mục này không?!", function(result){ 
             console.log('This was logged in the callback: ' + result); 
             if(result==true){
                 var objdata={
                     masach:masach
                 }
                 console.log(objdata);
                 queryData("back_end/sach/delete_sach.php",objdata,function(res){
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
     $(".btnsearch").click(function(){
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
 
     $(".pagenumbook").on('click', 'button', function () {
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
    $(".addListSach").html("<img src='images/loading.gif' width='30px' height='30px' >Loading");
    //Query API here!
     queryData("back_end/sach/get_all_sach.php",objdata,function(res){
        $(".addListSach").html("<img src='images/loading.gif' width='30px' height='30px' />Loading");
         var body='';
         var mang=res.items;
         console.log("Mang.lenght: " + mang.length);
         if(mang.length==0){
            $(".addListSach").html("<tr><td colspan ='2'>Khong tim thay du lieu</td></tr>");
            $(".pagenumbook").html("");
         }else{
            for(var item in mang ){
                var x=mang[item];
                body=body+ '<tr>'+
                '<td>'+(parseInt(item)+1)+'</td>'+
                '<td>'+x.masach+'</td>'+
                '<td class="text-danger">'+x.tensach+'</td>'+
                '<td class="text-danger">'+x.tenkho+'</td>'+
                '<td class="text-danger">'+x.tencd+'</td>'+
                '<td class="text-danger">'+x.tenxb+'</td>'+
                '<td data-image="'+x.anhsach+'" class="text-danger click_image"><img class="img-xs rounded-circle" src="fileanh/sach/'+x.anhsach+'" alt="Profile image"></td>'+
                '<td data-masach="'+x.masach+'" data-tensach="'+x.tensach+'" data-sotrang="'+x.sotrang+'" data-giabia="'+x.giabia+'" data-filesach="'+x.filesach+'" data-ngayxb="'+x.ngayxb+'" data-tenkho="'+x.tenkho+'" data-tencd="'+x.tencd+'" data-tenxb="'+x.tenxb+'"><label class="badge badge-danger click_sua"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;Sửa</label>&nbsp;<label class="badge badge-danger click_xoa"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Xóa</label></td>'+
                '</tr>';
            }
            buildSlidePage($(".pagenumbook"), 5, res.page, res.totalpage);
            $(".addListSach").html(body);
         }
         
     })
 
 }

 //load dât vào combo bõ
 function loadCBKho(){
    var objdata={
 
    }
    queryData("back_end/sach/api_getall_kho.php",objdata,function(res){
        console.log(res.items);
        var body='';
        var mang=res.items;
        if(mang.length==0){
            body='<option value="none">Không có dữ liệu</option>';
            $(".cbmakho").html(body);
        }else{
        for(var item in mang ){
            var x=mang[item];
            body=body+ '<option value="'+x.makho+'">'+x.tenkho+'</option>';
        }
        $(".cbmakho").html(body);
        }
    })
}
 function loadCBChude(){
    var objdata={

    }
    queryData("back_end/sach/api_getall_chude.php",objdata,function(res){
        console.log(res.items);
        var body='';
        var mang=res.items;
        if(mang.length==0){
            body='<option value="none">Không có dữ liệu</option>';
            $(".cbmacd").html(body);
        }else{
        for(var item in mang ){
            var x=mang[item];
            body=body+ '<option value="'+x.macd+'">'+x.tencd+'</option>';
        }
        $(".cbmacd").html(body);
        }
    })
}
function loadCBNXB(){
    var objdata={

    }
    queryData("back_end/sach/api_getall_nxb.php",objdata,function(res){
        console.log(res.items);
        var body='';
        var mang=res.items;
        if(mang.length==0){
            body='<option value="none">Không có dữ liệu</option>';
            $(".cbmaxb").html(body);
        }else{
            console.log("else");
        for(var item in mang ){
            var x=mang[item];
            body=body+ '<option value="'+x.maxb+'">'+x.tenxb+'</option>';
        }
        console.log("Ma XB:" + x.maxb);
        $(".cbmaxb").html(body);
        }
    })
}