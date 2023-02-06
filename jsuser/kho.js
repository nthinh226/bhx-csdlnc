$(document).ready(function() {
    var s=$(".txtsearch").val();
    searchData(s,0,record);
     var flag=0;
     $(".btnluu").prop("disabled",true);
     $(".btnsua").prop("disabled",true);
     console.log("ok");
     $(".btnlamlai").click(function(){
         console.log("click");
         $(".txtmakho").val("");
         $(".txttenkho").val("");
         $(".txtmakho").focus();
     })
     $(".btnthem").click(function(){
         flag=1;
         $(".btnthem").prop("disabled",true);
         $(".txtmakho").val("");
         $(".txttenkho").val("");
         $(".txtmakho").focus();
         $(".btnluu").prop("disabled",false);
         
        
     })
     $(".btnluu").click(function(){
         if(flag==1){
            
            var mak = $(".txtmakho").val();
            var tenk = $(".txttenkho").val();
            if (mak == "" || mak.length!=5) {
                bootbox.alert("Mã kho không hợp lệ!-Mã Kho 5 Ký tự");
                $(".txtmakho").focus();
            } else if (tenk == "") {
                bootbox.alert("Tên kho không được trống!");
                $(".txttenkho").focus();
            } else {
                var objdata = {
                    makho: $(".txtmakho").val(),
                    tenkho: $(".txttenkho").val()
                }
         console.log(objdata);
         queryData("back_end/kho/insert_kho.php",objdata,function(res){
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
        }
          }else if(flag==2){ //update
             var objdata={
                 makho: $(".txtmakho").val(),
                 tenkho: $(".txttenkho").val()
             }
             console.log(objdata);
             queryData("back_end/kho/update_kho.php",objdata,function(res){
                 console.log(res);
                 if(res.success==1){
                     //alert("Thêm thành công");
                     bootbox.alert("Cập nhật thành công!");
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
                     makho:$(".txtmakho").val()
                 }
                 console.log(objdata);
                 queryData("back_end/kho/delete_kho.php",objdata,function(res){
                     console.log(res);
                     if(res.success==1){
                         //alert("Thêm thành công");
                         bootbox.alert("Xóa thành công!");
                         searchData(s,0,record);
                     }else{
                         //alert("Thêm không thành công");
                         bootbox.alert("Xóa không thành công!");
                     }
                 })
             }
         });
     });
     $(".addListKho").on('click','.click_sua',function(){
         var makho=$(this).parents().attr("data-makho");
         var tenkho=$(this).parents().attr("data-tenkho");
         $(".txtmakho").val(makho);
         $(".txttenkho").val(tenkho);
         $(".btnsua").prop("disabled",false);
         $(".btnthem").prop("disabled",true);
     })
     $(".btnsua").click(function(){
         flag=2;
         $(".btnsua").prop("disabled",true);
         $(".btnthem").prop("disabled",true);
         $(".btnluu").prop("disabled",false);
         $(".txttenkho").focus();
     });
     $(".addListKho").on('click','.click_xoa',function(){
         var makho=$(this).parents().attr("data-makho");
         bootbox.confirm("Bạn có chắc xóa mục này không?!", function(result){ 
             console.log('This was logged in the callback: ' + result); 
             if(result==true){
                 var objdata={
                     makho:makho
                 }
                 console.log(objdata);
                 queryData("back_end/kho/delete_kho.php",objdata,function(res){
                     console.log(res);
                     if(res.success==1){
                         //alert("Thêm thành công");
                         bootbox.alert("Xóa thành công!");
                         searchData(s,0,record);
                     }else{
                         //alert("Thêm không thành công");
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
     $(".pagenumkho").on('click', 'button', function () {
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
    // $(".addListKho").html("<img src='images/loading.gif' width='30px' height='30px' />Loading");
     queryData("back_end/kho/api_getallkho_search.php",objdata,function(res){
        $(".addListKho").html("<img src='images/loading.gif' width='30px' height='30px' />Loading");
         console.log(res.items);
         var body='';
         var mang=res.items;
         $(".addListKho").html("<img src='images/loading.gif' width='30px' height='30px' />Loading");
         for(var item in mang ){
             var x=mang[item];
             body=body+ '<tr>'+
                   '<td>'+(parseInt(item)+1)+'</td>'+
                   '<td>'+x.makho+'</td>'+
                   '<td class="text-danger">'+x.tenkho+'</td>'+
                   '<td data-makho="'+x.makho+'" data-tenkho="'+x.tenkho+'"><label class="badge badge-danger click_sua"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;Sửa</label>&nbsp;<label class="badge badge-danger click_xoa"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Xóa</label></td>'+
                   '</tr>';
         }
         buildSlidePage($(".pagenumkho"), 5, res.page, res.totalpage);
         $(".addListKho").html(body);
     })
 
 }
 //Viết 1 hàm để load dữ liệu từ api_getalltopic.php
 function loadDataTopic(){
     var objdata={
 
     }
     queryData("back_end/kho/get_all_kho.php",objdata,function(res){
         console.log(res.items);
         var body='';
         var mang=res.items;
         for(var item in mang ){
             var x=mang[item];
             body=body+ '<tr>'+
                   '<td>'+(parseInt(item)+1)+'</td>'+
                   '<td>'+x.makho+'</td>'+
                  '<td class="text-danger">'+x.tenkho+'</td>'+
                   '<td data-makho="'+x.makho+'" data-tenkho="'+x.tenkho+'"><label class="badge badge-danger click_sua"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;Sửa</label>&nbsp;<label class="badge badge-danger click_xoa"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Xóa</label></td>'+
                   '</tr>';
         }
         $(".addListKho").html(body);
     })
 
 }
 