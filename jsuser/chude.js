$(document).ready(function() {
    var s=$(".txtsearch").val();
    searchData(s,0,record);
     var flag=0;
     $(".btnluu").prop("disabled",true);
     $(".btnsua").prop("disabled",true);
     console.log("ok");
     $(".btnlamlai").click(function(){
         console.log("click");
         $(".txtmacd").val("");
         $(".txttencd").val("");
         $(".txtmacd").focus();
     })
     $(".btnthem").click(function(){
         flag=1;
         $(".btnthem").prop("disabled",true);
         $(".txtmacd").val("");
         $(".txttencd").val("");
         $(".txtmacd").focus();
         $(".btnluu").prop("disabled",false);
         
        
     })
     $(".btnluu").click(function(){
         if(flag==1){
            var mcd = $(".txtmacd").val();
            var tcd = $(".txttencd").val();
            if (mcd == "" || mcd.length!=5) {
                bootbox.alert("Mã chủ đề không hợp lệ!-Mã Kho 5 Ký tự");
                $(".txtmacd").focus();
            } else if (tcd == "") {
                bootbox.alert("Tên chủ đề không được trống!");
                $(".txttencd").focus();
            } else {
                var objdata = {
                    macd: $(".txtmacd").val(),
                    tencd: $(".txttencd").val()
                }
         console.log(objdata);
         queryData("back_end/chude/insert_chude.php",objdata,function(res){
             console.log(res);
             if(res.success==1){
                 bootbox.alert("Thêm thành công!");
                searchData(s,0,record);
             }else{
                 bootbox.alert("Thêm không thành công!");
             }
            
         })
        }
          }else if(flag==2){ //update
             var objdata={
                 macd: $(".txtmacd").val(),
                 tencd: $(".txttencd").val()
             }
             console.log(objdata);
             queryData("back_end/chude/update_chude.php",objdata,function(res){
                 console.log(res);
                 if(res.success==1){
                     bootbox.alert("Cập nhật thành công!");
                   searchData(s,0,record);
                 }else{
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
                     macd:$(".txtmacd").val()
                 }
                 console.log(objdata);
                 queryData("back_end/chude/delete_chude.php",objdata,function(res){
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
     $(".addListTopic").on('click','.click_sua',function(){
         var macd=$(this).parents().attr("data-macd");
         var tencd=$(this).parents().attr("data-tencd");
         $(".txtmacd").val(macd);
         $(".txttencd").val(tencd);
         $(".btnsua").prop("disabled",false);
         $(".btnthem").prop("disabled",true);
     })
     $(".btnsua").click(function(){
         flag=2;
         $(".btnsua").prop("disabled",true);
         $(".btnthem").prop("disabled",true);
         $(".btnluu").prop("disabled",false);
         $(".txttencd").focus();
     });
     $(".addListTopic").on('click','.click_xoa',function(){
         var macd=$(this).parents().attr("data-macd");
         bootbox.confirm("Bạn có chắc xóa mục này không?!", function(result){ 
             console.log('This was logged in the callback: ' + result); 
             if(result==true){
                 var objdata={
                     macd:macd
                 }
                 console.log(objdata);
                 queryData("back_end/chude/delete_chude.php",objdata,function(res){
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
     $(".pagenumtopic").on('click', 'button', function () {
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
    // $(".addListTopic").html("<img src='images/loading.gif' width='30px' height='30px' />Loading");
     queryData("back_end/chude/api_getalltopic_search.php",objdata,function(res){
        $(".addListTopic").html("<img src='images/loading.gif' width='30px' height='30px' />Loading");
         console.log(res.items);
         var body='';
         var mang=res.items;
         $(".addListTopic").html("<img src='images/loading.gif' width='30px' height='30px' />Loading");
         for(var item in mang ){
             var x=mang[item];
             body=body+ '<tr>'+
                   '<td>'+(parseInt(item)+1)+'</td>'+
                   '<td>'+x.macd+'</td>'+
                   '<td class="text-danger">'+x.tencd+'</td>'+
                   '<td data-macd="'+x.macd+'" data-tencd="'+x.tencd+'"><label class="badge badge-danger click_sua"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;Sửa</label>&nbsp;<label class="badge badge-danger click_xoa"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Xóa</label></td>'+
                   '</tr>';
         }
         buildSlidePage($(".pagenumtopic"), 5, res.page, res.totalpage);
         $(".addListTopic").html(body);
     })
 
 }
 //Viết 1 hàm để load dữ liệu từ api_getalltopic.php
 function loadDataTopic(){
     var objdata={
 
     }
     queryData("back_end/chude/api_getalltopic.php",objdata,function(res){
         console.log(res.items);
         var body='';
         var mang=res.items;
         for(var item in mang ){
             var x=mang[item];
             body=body+ '<tr>'+
                   '<td>'+(parseInt(item)+1)+'</td>'+
                   '<td>'+x.macd+'</td>'+
                  '<td class="text-danger">'+x.tencd+'</td>'+
                   '<td data-macd="'+x.macd+'" data-tencd="'+x.tencd+'"><label class="badge badge-danger click_sua"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;Sửa</label>&nbsp;<label class="badge badge-danger click_xoa"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Xóa</label></td>'+
                   '</tr>';
         }
         $(".addListTopic").html(body);
     })
 
 }

