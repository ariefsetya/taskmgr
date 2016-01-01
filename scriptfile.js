var scripts = document.getElementsByTagName('script');
var index = scripts.length - 1;
var myScript = scripts[index];
var queryString = myScript.src.replace(/^[^\?]+\??/,'');

var params = parseQuery( queryString );

function parseQuery ( query ) {
   var Params = new Object ();
   if ( ! query ) return Params; // return empty object
   var Pairs = query.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) continue;
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;
}


CKEDITOR_BASEPATH = params['base'];
var height = "";
var old_id = "";
var teks = "";
var tulisan = "";
var idbookpad = null;
var areaheight = "";
var areafiles = "";
var first = true;
var id_new_group = "";
var check = '';
var progress = '';
var mouseX = '';
var mouseY = '';
var tgl = params.tgl;
var atwait = 1;
var datawait = true;
var activecaption;
var activejenis;
var activeid;
    
//==============================================================================================================
    $(document).ready(function(){
        waitgears();
        areaheight = $(window).height()-45;
        areafiles = $(window).height()-25;
        $('#OC_artikel').css('height',areaheight);
        $('#OC_group').css('height',areaheight);
        $('#most-left').css('height',areaheight);
        refreshview();
        loadgroup();
        loadartikel();
    });
    $(document).on('click',function(){
        $("#OC_rightinside").css('display','none');
    });
    $( document ).on( "mousemove", function( event ) {
        mouseX = event.pageX;
        mouseY = event.pageY;
    });
//==============================================================================================================
    function swbutton(tobutton,onclick,caption){
        $("#save").remove();
        $("#edit").remove();
        $("#delete").remove();
        var cls = '';
        if(tobutton=="save"){
            cls = 'bg-blue';
            caption = '<i class="icon-floppy fg-white"></i> '+caption;
        }
        if(tobutton=="edit"){
            cls = 'bg-green';
            caption = '<i class="icon-pencil fg-white"></i> '+caption;
        }
        if(tobutton=="delete"){
            cls = 'bg-red';
            caption = '<i class="icon-remove fg-white"></i> '+caption;
        }
        $('#OC_buttoninside').append('<span id="'+tobutton+'" class="button place-right fg-white '+cls+'" style="margin-right:10px;cursor:pointer" onclick="'+onclick+'()">'+caption+'</span>');
    }
    function right(dat,cap){
        var X,Y;
        X = mouseX;
        Y = mouseY;
        $("#OC_right").css('top',(Y-45));
        $("#OC_right").css('left',X);
        $("#OC_rightinside").remove();
        var data = '<div id="OC_rightinside" style="display:block;">'+
                        '<ul class="dropdown-menu open keep-open" style="width: 200px; z-index: 1000;">'+
                            '<li><a onclick="addgroup()"><i class="icon-plus-2"></i> Add Group</a></li>'+
                            '<li><a onclick="addbookpad('+dat+')"><i class="icon-plus-2"></i> Add BookPad</a></li>'+
                            '<li><a onclick="groupsettings('+dat+','+"'"+cap+"'"+')"><i class="icon-cog"></i> Group Settings</a></li>'+
                        '</ul>'+
                    '</div>';
        $("#OC_right").append(data);
        window.event.returnValue = false;
                
    }
    function rightbookpad(idgr,dat,cap){
        var X,Y;
        X = mouseX;
        Y = mouseY;
        $("#OC_right").css('top',(Y-45));
        $("#OC_right").css('left',X);
        $("#OC_rightinside").remove();
        var data = '<div id="OC_rightinside" style="display:block;">'+
                        '<ul class="dropdown-menu open keep-open" style="width: 200px; z-index: 1000;">'+
                            '<li><a onclick="opennew('+dat+')"><i class="icon-plus-2"></i> Add Note</a></li>'+
                            '<li><a onclick="addbookpad('+idgr+')"><i class="icon-plus-2"></i> Add BookPad</a></li>'+
                            '<li><a onclick="createWindow('+"'"+cap+"'"+')"><i class="icon-cog"></i> BookPad Settings</a></li>'+
                        '</ul>'+
                    '</div>';
        $("#OC_right").append(data);
        window.event.returnValue = false;
                
    }
    function loadartikel(idbook){
        wait();
        if(idbook==null){
            $('#OC_artikelinside').remove();
            var data2 = "";
            data2 +='<div id="OC_artikelinside">';
            data2 +='</div>';
            $('#OC_artikel').append(data2);
            $.Dialog.close();
                
        }else{
            menuartikel(idbook,activejenis,activecaption);
            $('#menu_'+idbook).attr('class','list marked active');
        }
    }
    function kosongarea(){
        $("#save").remove();
        $("#edit").remove();
        $("#delete").remove();
        $("#OC_titleinside").remove();
        $("#OC_inside").remove();
        $("#OC_title").append('<div style="width:100%;cursor:pointer;" id="OC_titleinside" ><span style="width:100%;padding:10px;" class="place-left" id="judul" placeholder="Title...">Select a BookPad to create new note...</span></div>');
        $("#OC_content").append('<div id="OC_inside"><span style="padding:10px;cursor:pointer;">Files area</span></div>');
    }
    function loadgroup(){
        $("#OC_groupinside").remove();
        waitgears();
        $.ajax({
            type: "POST",
            url: 'files/get_group',
            data : 'id='+params['haha'],
            dataType :'json',
            success: function(data_return){
                var hasil = data_return;
                var panjang = hasil.length;
                var data="";
                var nol = '';
                data += '<div class="accordion place-left" data-role="accordion" style="width:100%;" id="OC_groupinside">'+
                            '<div class="listview-outlook" data-role="listview">'+
                                '<li onclick="" class="list">'+
                                    '<div class="list-content">'+
                                        '<span onclick="addgroup()" class="list-title"><i class="icon-plus-2"></i> Add Group</span>'+
                                    '</div>'+
                                '</li>'+
                            '</div>';
                    for (var i=0;i<panjang;i++) {
                        var dat = hasil[i].id;
                    if(i==0&&hasil[i].id==id_new_group){
                        nol = 'block';
                    }else if(i!=0&&hasil[i].id==id_new_group){
                        nol = 'block';
                    }else{
                        nol = 'none';
                    }
                    if(first==true&&i==0){
                        id_new_group = hasil[i].id;
                        nol = 'block';
                        first = false;
                    }

                    var icon = 'cabinet';
                    var hint = 'Files';
                    data += '<div class="accordion-frame" style="margin:0px;border-bottom:1px solid #0099ee;">'+
                                '<li id="klikgroup_'+hasil[i].id+'" oncontextmenu="right('+hasil[i].id+','+"'"+hasil[i].judul+"'"+')" class="heading collapsed" style="padding-left:5px;"><i data-hint="'+hint+' Group" data-hint-position="top" class="icon-'+icon+'"></i> '+hasil[i].judul+'</li>'+
                                '<div class="content" style="display:'+nol+';padding:0px">'+
                                    '<div class="listview-outlook" data-role="listview"  style="padding:0px;">'+
                                        '<div class="list-group" style="padding:0px;">'+
                                            '<div id="OC_bookpad_'+hasil[i].id+'" class="group-content">'+
                                                '<div id="OC_bookpadinside_'+hasil[i].id+'">'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
        
                        }
                    data += '</div>';
                $("#OC_group").append(data);
                for (var i=0;i<panjang;i++) {
                    loadbookpad(hasil[i].id,hasil[i].judul);
                    if(i==(panjang-1)){
                        atwait = 0;
                        $.Dialog.close();
                    }
                }
                $.Dialog.close();
                },
                error:function () {
                    loadgroup();
                }
            });
    }
    function loadbookpad(idgroup,caption){

    $("#OC_bookpadinside_"+idgroup).remove();
        $.ajax({
            type: "POST",
            url: 'files/get_bookpad',
            data : { 'id':params['haha'],'idgroup':idgroup},
            dataType :'json',
            success: function(data_return){

                var hasil = data_return;
                var panjang = hasil.length;
                var data="";
                data +='<div id="OC_bookpadinside_"'+idgroup+'>';
                data +='<div id="OC_newbookpad_"'+idgroup+'>';
                data +='<a onclick="addbookpad('+idgroup+')" class="list add">';
                    data +='<div class="list-content">';
                        data +='<div  class="list-title"><i class="icon-plus-2"></i> Add Category';
                        data +='</div>';
                    data +='</div>';
                data +='</a>';
                data +='<a onclick="groupsettings('+idgroup+','+"'"+caption+"'"+')" class="list add" style="border-bottom:1px solid #0099ee;">';
                    data +='<div class="list-content">';
                        data +='<div  class="list-title"><i class="icon-cog"></i> Group Settings';
                        data +='</div>';
                    data +='</div>';
                data +='</a>';
                data +='</div>';
                for (var i = 0; i < panjang; i++) {
                    var icon = 'book';
                    var hint = 'Files';
                    data +='<a id="menu_'+hasil[i].id+'" onclick="menuartikel('+hasil[i].id+','+"'"+hasil[i].jenis+"'"+','+"'"+hasil[i].judul+"'"+')" oncontextmenu="rightbookpad('+idgroup+','+hasil[i].id+','+"'"+hasil[i].judul+"'"+')" class="list">';
                        data +='<div class="list-content">';
                            data +='<div class="list-title"><i data-hint="'+hint+' Category" data-hint-position="top" class="icon-'+icon+'"></i> '+hasil[i]['judul'];
                            data +='</div>';
                        data +='</div>';
                    data +='</a>';
                }
                data +='</div>';
                $('#OC_bookpad_'+idgroup).append(data);
            },
            error:function () {
                loadbookpad(idgroup,caption)
            }
        });
    }
    function callck(){
        CKEDITOR.replace("content", {toolbar : "standard",width : "99%",height : height+'px'});
    }
    function callls(){
        $("#content").css('height',height+'px');
    }
    $(window).resize(function(){
        areaheight = $(window).height()-45;
        $('#OC_artikel').css('height',areaheight);
        $('#most-left').css('height',areaheight);
        height = $(window).height()-250;
    });
    function refreshview(){
        height = $(window).height()-250;
    }
    function opennew(dat){
        menuartikel(dat,activejenis,activecaption);
        aktifkanbaru();
    }
    function apdbutton(){
        $("#OC_buttoninside").append('<span id="delete" class="button place-right fg-white bg-red" style="margin-right:10px;cursor:pointer" onclick="delartikel()"><i class="icon-remove fg-white"></i> Delete</span>');
    }
    function artikel(id) {
        $('#OC_inside').remove();
        $('#OC_inside').remove();
        $('#OC_inside').remove();
        $('#OC_inside').remove();
        $('#judul').remove();
        $('#judul').remove();
        $('#judul').remove();
        $('#judul').remove();
        $('#judul').remove();
        $('#OC_titleinside').remove();
        $('#OC_titleinside').remove();
        $('#OC_titleinside').remove();
        $('#OC_titleinside').remove();
        $('#OC_titleinside').remove();
        $("#save").remove();
        $("#edit").remove();
        $("#delete").remove();
        wait();
        refreshview();
        $.ajax({
            type: "POST",
            url: 'files/get_files',
            data : 'id='+id,
            dataType :'json',
            success: function(data_return){
                var hasil = data_return;
                teks = hasil;
                $('#klik_'+old_id).attr('class','list');
                $('#klik_'+id).attr('class','list active');
                old_id = id;
                var modif = "";
                if(teks.sys_update!=""){
                    modif = ' Modified at '+teks.sys_update; 
                }
                $('#menu_'+idbookpad).attr('class','list marked active');
                $('#OC_title').append('<div id="OC_titleinside"><input readonly data-transform="input-control" class="title" id="judul" value="'+teks.judul+'"></div>');
                $('#OC_content').append('<div id="OC_inside" onclick="aktifkan()"><div style="padding:10px;width:100%;height:25px;display:inline-block">Created at '+teks.sys_create+modif+'</div><div style="padding:10px;height:'+height+'px;overflow-y:auto">'+hasil.isi+'</div><input readonly data-transform="input-control" class="tags" id="tags" value="'+teks.tag+'"></div>');
                $("#settgl").val(teks.alarm);
                if(teks.alarm!=""){
                    $('#OC_inside').append('<div style="padding-left:5px;padding-right:5px;">Reminder : Active at '+teks.alarm+'</div>');
                }
                swbutton('edit','aktifkan','Edit');
                apdbutton();
                $.Dialog.close();
            }
            });
    }
    function savebookpad(idgroup){
        if($("#bookpad").val()==""){
            msg("Category Name");
        }
        else{
        wait();
        $.ajax({
            type: "POST",
            url: 'files/save_bookpad',
            data : { "bookpad":$('#bookpad').val(),'idgroup':idgroup },
            dataType :'json',
            success: function(data_return){
                id_new_group = idgroup;
                loadgroup();
                var hasil = data_return;
                }
            });
        }
    }
    function savegroup(){
        if($("#group").val()==""){
            msg("Group Name");
        }
        else{
        wait();
        $.ajax({
            type: "POST",
            url: 'files/save_group',
            data : { "group":$('#group').val(),"jenis":$('#jenis').val()},
            dataType :'json',
            success: function(data_return){
                var hasil = data_return;
                id_new_group = hasil.idgroup;
                loadgroup();
                }
            });
        }
    }
    function delbookpad(id,caption){
        if(confirm('Are you sure to delete '+caption+'?')==true){
            wait();
            $.ajax({
            type: "POST",
            url: 'files/del_bookpad',
            data : { "id":params['haha'],"idbookpad":id },
            dataType :'json',
            success: function(data_return){
                var hasil = data_return;
                id_new_group = "";
                loadgroup();
                var nul = null;
                loadartikel(nul);
                kosongarea();
                }
            });
        }
    }
    function delgroup(id){
        if(confirm('Are you sure to delete this group?')==true){
            wait();
            $.ajax({
            type: "POST",
            url: 'files/del_group',
            data : { "id":params['haha'],"idgroup":id },
            dataType :'json',
            success: function(data_return){
                var hasil = data_return;
                id_new_group = "";
                loadgroup();
                var nul = null;
                loadartikel(nul);
                kosongarea();
                }
            });
        }
    }
    function updatebookpad(id){
        if($("#bookpadname").val()==""){
            msg("Category Name");
        }
        else{
            wait();
            $.ajax({
            type: "POST",
            url: 'files/update_bookpad',
            data : { "id":params['haha'],"idbookpad":id,"bookpadname":$("#bookpadname").val() },
            dataType :'json',
            success: function(data_return){
                var hasil = data_return;
                id_new_group = hasil.idgroup;
                loadgroup();
                setTimeout(function(){
                menuartikel(hasil['id'],activejenis,activecaption);
                },500);
                }
            });
        }
    }
    function updategroup(id){
        if($("#groupname").val()==""){
            msg("Group Name");
        }
        else{
            wait();
            $.ajax({
            type: "POST",
            url: 'files/update_group',
            data : { "id":params['haha'],"idgroup":id,"groupname":$("#groupname").val() },
            dataType :'json',
            success: function(data_return){
                var hasil = data_return;
                id_new_group = id;
                loadgroup();
                }
            });
        }
    }
    function delartikel(){
        if(confirm('Are you sure to delete '+$("#judul").val()+'?')==true){
            wait();
            $.ajax({
            type: "POST",
            url: 'files/del_artikel',
            data : { "id":params['haha'],"idartikel":old_id },
            dataType :'json',
            success: function(data_return){
                loadartikel(idbookpad);
                kosongarea();
                }
            });
        }
    }
    function aktifkanbaru(){
        wait();
        refreshview();
        $('#OC_inside').remove();
        $('#judul').remove();
        $('#OC_content').append('<div id="OC_inside"><textarea id="content"></textarea><input maxlength="100" data-transform="input-control" type="text" id="tags" placeholder="Tags..." ></div>');
        $('#OC_titleinside').remove();
        $('#OC_title').append('<div id="OC_titleinside"><input required maxlength="100" type="text" data-transform="input-control" id="judul" placeholder="Title..." ></div>');
        $('#OC_inside').append('<div id="OC_tgl" style="position:absolute;padding-left:5px;padding-right:5px;"><span id="OC_tglinside" onclick="addreminder()" class="button bg-green fg-white">Set Reminder</span></div>');
        callck();
        swbutton('save','realsave','Save');
        $.Dialog.close();
    }
    function aktifkan(){
        wait();
        refreshview();
        $('#OC_inside').remove();
        $('#judul').remove();
        $('#OC_content').append('<div id="OC_inside"><textarea id="content">'+teks.isi+'</textarea><input maxlength="100" value="'+teks.tag+'" data-transform="input-control" type="text" id="tags" placeholder="Tags..." ></div>');
        $('#OC_titleinside').remove();
        $('#OC_title').append('<div id="OC_titleinside"><input value="'+teks.judul+'" required maxlength="100" type="text" data-transform="input-control" id="judul" placeholder="Title..." ></div>');
        var clr="green"
        var reminder="Set Reminder";
        if($("#settgl").val()!=""){

            var d = $("#settgl").val();
            clr = 'orange';
            reminder = 'Active at '+d;
            var cal = $('#remindercal').calendar();
            cal.calendar('setDate',d);

            $("#OC_datein").remove();
            var isi = '<tbody id="OC_datein"><tr><td colspan="7"><span style="font-weight:bold;"><center><h1>'+d+'</h1></center></span></td></tr></tbody>';
            $("#remindercal table.bordered").append(isi);
        }
        $('#OC_inside').append('<div id="OC_tgl" style="position:absolute;padding-left:5px;padding-right:5px;"><span id="OC_tglinside" onclick="addreminder()" class="button bg-'+clr+' fg-white">'+reminder+'</span></div>');
        callck();
        swbutton('save','save','Save');
        apdbutton();
        $.Dialog.close();
    }
    function save(){
        wait();
        refreshview();
        var tags = $('#tags').val(); 
        var judul = $('#judul').val(); 
        var remind = $('#settgl').val(); 
        var isi = CKEDITOR.instances['content'].getData();
        if(judul==""){
            msg("Title");
        }else if(isi==""){
            msg("Files");
        }else if(tags==""){
            tags = "Untagged";
        }else{
            $.ajax({
            type: "POST",
            url: 'files/update_files',
            data : {"judul": judul, "isi": isi, "idbookpad":idbookpad,'id':old_id,"tag":tags,"alarm":remind },
            success: function(data_return){
                    menuartikel(idbookpad,activejenis,activecaption);
                    artikel(old_id);
                }
            });
        }
    }
    function menuartikel(id,jenis,caption){
        activejenis = jenis;
        activecaption = caption;
        $("#OC_artikelinside").remove();
        wait();
        refreshview();
        $.ajax({
            type: "POST",
            url: 'files/get_artikel',
            data : 'id='+id,
            dataType :'json',
            success: function(data_return){

                var hasil = data_return;
                tulisan = hasil;
                var panjang = tulisan.length;
                $('#menu_'+idbookpad).attr('class','list');
                $('#menu_'+id).attr('class','list active');
                idbookpad = id;


                //console.log(); 

                var data="";
                data +='<div id="OC_artikelinside">';
                data +='<legend id="title-bookpad" style="border-bottom:1px solid #0099ee;">'+$('#menu_'+id+" div div").html()+' <button onclick="inputbaru('+idbookpad+')" class="place-right">Add New</button></legend>';
                data +='<div class="listview-outlook" data-role="listview">';
                var low = height+102+36;
                data +='<div style="padding:10px;overflow-y:auto;height:'+(low)+'px">';
                data +='<table class="table striped hovered dataTable" id="dataTables-1">';
                data +='<thead>';
                data +='<tr>';
                    data +='<th style="width:60px" class="text-left">No.</th>';
                    data +='<th class="text-left">File Name</th>';
                    data +='<th style="width:60px" class="text-left">Customer</th>';
                    data +='<th style="width:90px" class="text-left">File Type</th>';
                    data +='<th style="width:100px" class="text-left">Source File</th>';
                    data +='<th class="text-left">File Location</th>';
                    data +='<th style="width:100px" class="text-left">File Version</th>';
                    data +='<th style="width:100px" class="text-left">Action</th>';
                data +='</tr>';
                data +='</thead>';

                data +='<tbody>';
                data +='</tbody>';

            data +='</table>';
                data += '</div>';
                data +='<li onclick="createWindow('+"'"+caption+"'"+')" class="list" style="border-top:1px solid #0099ee;">';
                data +='<div class="list-content">';
                data +='<span class="list-title"><i class="icon-cog"></i> Category Settings</span>';
                data +='</div>';
                data +='</li>';
                data += '</div>';
                data += '</div>';
                $("#OC_artikel").append(data);
                $.Dialog.close();


                    $('#dataTables-1').dataTable( {
                        "bProcessing": true,
                        "data":data_return
                    } );
        }
    });

    }    
    
    function wait(){   
        $.Dialog.close(); 
        $.Dialog({
            shadow: true,
            overlay: false,
            sysButtons:false,
            draggable: true,
            icon: '<span class="icon-cloud"></span>',
            title: 'KlikJakarta',
            width: 200,
            height:100,
            padding: 10,
            content: '',
            onShow: function(){
                var content = 
                '<div>'+
                    '<table style="width:100%;">'+
                        '<tr>'+
                            '<td colspan="2">'+
                                '<h3>Please Wait...</h3>'+
                            '</td>'+
                        '</tr>'+
                    '</table>'+
                    '</div>';
                $.Dialog.content(content);
            }
        });
    }
    function closedlg(){
        $.Dialog.close();
    }
    $("#notif").on('click',function () {
        $("#data").css('display','block');
    });
    $("#bodybody").on('click',function () {
        $("#data").css('display','none');
    });
    function dlglist(id){
        wait();
        $.ajax({
                type: "POST",
                url: 'files/get_listbyid',
                data : { "id":id },
                dataType :'json',
                success: function(data_return){
                    closedlg();
                    var hasil = data_return;
                    var state = "";
                    var prior = '';
                    var check = '';
                    var but = '<button class="bg-green fg-white" onclick="complete('+id+')"><i class="icon-checkmark fg-white"></i> Complete Task</button>';
                    var progress = 'On Progress';
                    if(hasil.progress=="1"){
                        check = 'checked';
                        progress = 'Complete';
                    var but = '<button class="bg-red fg-white" onclick="uncomplete('+id+')"><i class="icon-busy fg-white"></i> On Progress Task</button>';
                    }
                    if(hasil.priority=="1"){
                        state = "info";
                        prior = "Low";
                    }
                    if(hasil.priority=="2"){
                        state = "warning";
                        prior = "Medium";
                    }
                    if(hasil.priority=="3"){
                        state = "error";
                        prior = "High";
                    }
                    $.Dialog({


                        shadow: true,
                        overlay: true,
                        draggable: true,
                        icon: '<span class="icon-checkmark"></span>',
                        title: 'Task',
                        width: '75%',
                        height: 500,
                        padding: 10,
                        content: '',
                        onShow: function(){
                            var content = 
                            '<div>'+
                                '<table style="width:100%;">'+
                                    '<tr>'+
                                        '<td>'+
                                            'Title'+
                                        '</td>'+
                                        '<td>'+
                                            'Priority'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>'+
                                            '<input required readonly type="text" value="'+hasil.judul+'" id="listidtitle" data-transform="input-control">'+
                                        '</td>'+
                                        '<td style="width:30%">'+
                                            '<input required readonly data-state="'+state+'" type="text" value="'+prior+'" id="listidprior" data-transform="input-control">'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                            '<div style="width:50%;float:left">Date Start'+
                                                        '<input required readonly type="text" value="'+hasil.tglmulai+'" id="listiddatestart" data-transform="input-control"></div>'+
                                        
                                            '<div style="width:50%;float:left">Date Finish'+
                                                    '<input required readonly type="text" value="'+hasil.tglselesai+'" id="listiddatefinish" data-transform="input-control"></div>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                            'Checked By'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                            '<input required readonly type="text" value="'+hasil.checkby+'" id="listidcheck" data-transform="input-control">'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                            'Description'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                            '<textarea required readonly type="text" id="listiddesc" data-transform="input-control">'+hasil.deskripsi+'</textarea>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                            'Progress'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                        '<div class="input-control checkbox">'+
                                            '<label>'+
                                                '<input readonly disabled '+check+' type="checkbox" />'+
                                                '<span class="check"></span>'+
                                                progress+
                                            '</label>'+
                                        '</div>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>'+
                                            '<button class="bg-red fg-white" onclick="deltask('+id+')"><i class="icon-pencil fg-white"></i> Delete Task</button>'+
                                        '</td>'+
                                        '<td>'+
                                            '<div class="place-right">'+but+'&nbsp;<button class="bg-blue fg-white" onclick="editlistid('+id+')"><i class="icon-pencil fg-white"></i> Edit Task</button></div>'+
                                        '</td>'+
                                    '</tr>'+
                                '</table>'+
                                '</div>';
                            $.Dialog.title("Task");
                            $.Dialog.content(content);
                        }
                    });
            }
        });
    }
    function editlistid(id){
        wait();
        $.ajax({
                type: "POST",
                url: 'files/get_listbyid',
                data : { "id":id },
                dataType :'json',
                success: function(data_return){
                    closedlg();
                    var hasil = data_return;
                    var state = "";
                    var prior = '';
                    check = '';
                    var isi = '';
                    var sel1, sel2, sel3;
                    progress = 'On Progress';
                    if(hasil.progress=="1"){
                        check = 'checked';
                        progress = 'Complete';
                        isi = '1';
                    }
                    if(hasil.priority=="1"){
                        sel1 = 'selected';
                    }
                    if(hasil.priority=="2"){
                        sel2 = 'selected';
                    }
                    if(hasil.priority=="3"){
                        sel3 = 'selected';
                    }
                    $.Dialog({


                        shadow: true,
                        overlay: true,
                        draggable: true,
                        icon: '<span class="icon-checkmark"></span>',
                        title: 'Edit Task',
                        width: '75%',
                        height: 500,
                        padding: 10,
                        content: '',
                        onShow: function(){
                            var content = 
                            '<div>'+
                                '<table style="width:100%;">'+
                                    '<tr>'+
                                        '<td>'+
                                            'Title'+
                                        '</td>'+
                                        '<td>'+
                                            'Priority'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>'+
                                            '<input required type="text" value="'+hasil.judul+'" id="listidtitle" data-transform="input-control">'+
                                        '</td>'+
                                        '<td style="width:20%">'+
                                            '<select required type="text" id="listidprior" data-transform="input-control">'+
                                                '<option '+sel1+' value="1">Low</option>'+
                                                '<option '+sel2+' value="2">Medium</option>'+
                                                '<option '+sel3+' value="3">High</option>'+
                                            '</select>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                            '<div style="width:50%;float:left">Date Start'+
                                                        '<div class="input-control text" data-role="datepicker"'+
                                                            'data-date="'+hasil.tglmulai+'"'+
                                                            "data-format='yyyy-mm-dd'"+
                                                            "data-effect='fade'"+
                                                            "data-locale='en'"+
                                                            "data-week-start='0'>"+
                                                            '<input id="listiddatestart" type="text">'+
                                                            '<button class="btn-date"></button>'+
                                                        '</div></div>'+
                                            '<div style="width:50%;float:left">Date Finish'+
                                                        '<div class="input-control text" data-role="datepicker"'+
                                                            'data-date="'+hasil.tglselesai+'"'+
                                                            "data-format='yyyy-mm-dd'"+
                                                            "data-effect='fade'"+
                                                            "data-locale='en'"+
                                                            "data-week-start='0'>"+
                                                            '<input id="listiddatefinish" type="text">'+
                                                            '<button class="btn-date"></button>'+
                                                        '</div></div>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                            'Checked By'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                            '<input required type="text" value="'+hasil.checkby+'" id="listidcheck" data-transform="input-control">'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                            'Description'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                            '<textarea required type="text" id="listiddesc" data-transform="input-control">'+hasil.deskripsi+'</textarea>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                            'Progress'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                        '<div class="input-control checkbox" id="OC_check">'+
                                            '<label id="OC_checkinside">'+
                                                '<input id="listidprogress" onclick="checkstate('+isi+')" '+check+' type="checkbox" />'+
                                                '<span class="check"></span>'+
                                                progress+
                                            '</label>'+
                                        '</div>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>'+
                                        '</td>'+
                                        '<td>'+
                                            '<button class="place-right fg-white bg-blue" onclick="updatelistid('+id+')"><i class="icon-floppy fg-white"></i> Update</button>'+
                                        '</td>'+
                                    '</tr>'+
                                '</table>'+
                                '</div>';
                            $.Dialog.title("Edit Task");
                            $.Dialog.content(content);
                        }
                    });
            }
        });
    }
    function editlist(id){

        $.ajax({
                type: "POST",
                url: 'files/get_artikelid',
                data : { "id":id },
                dataType :'json',
                success: function(data_return){
        $.Dialog({
            shadow: true,
            overlay: true,
            draggable: true,
            icon: '<span class="icon-pencil"></span>',
            title: 'Add List',
            width: '40%',
            height: 225,
            padding: 10,
            content: '',
            onShow: function(){
                var content = 
                '<div>'+
                    '<table style="width:100%;">'+
                        '<tr>'+
                            '<td colspan="2">'+
                                'Title'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                '<input required type="text" id="listtitle" data-transform="input-control" value="'+data_return['judul']+'">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                'Tags'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                '<input required type="text" id="listtags" data-transform="input-control" value="'+data_return['tag']+'">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                            '</td>'+
                            '<td>'+
                                '<button class="place-right bg-blue fg-white" onclick="updatelist('+id+')"><i class="icon-floppy fg-white"></i> Save</button>'+
                            '</td>'+
                        '</tr>'+
                    '</table>'+
                    '</div>';
                $.Dialog.title("Edit List");
                $.Dialog.content(content);
            }
        });
        }
    });
    }
    function createWindow(caption){
        $.Dialog({
            shadow: true,
            overlay: true,
            draggable: true,
            icon: '<span class="icon-cog"></span>',
            title: 'Category Settings',
            width: '40%',
            height:150,
            padding: 10,
            content: '',
            onShow: function(){
                var content = 
                '<div>'+
                    '<table style="width:100%;">'+
                        '<tr>'+
                            '<td colspan="2">'+
                                'Rename Category to...'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                '<input required type="text" id="bookpadname" data-transform="input-control" value="'+caption+'">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                                '<button class="button bg-blue fg-white" onclick="updatebookpad('+idbookpad+')"><i class="icon-floppy fg-white"></i> Save Settings</button>'+
                            '</td>'+
                            '<td>'+
                                '<button class="place-right button bg-red fg-white" onclick="delbookpad('+idbookpad+','+"'"+caption+"'"+')"><i class="icon-remove fg-white"></i> Delete Category</button>'+
                            '</td>'+
                        '</tr>'+
                    '</table>'+
                    '</div>';
                $.Dialog.title("Category Settings");
                $.Dialog.content(content);
            }
        });
    }
    function groupsettings(idgroup,caption){
        $.Dialog({
            shadow: true,
            overlay: true,
            draggable: true,
            icon: '<span class="icon-cog"></span>',
            title: 'Group Settings',
            width: '40%',
            padding: 10,
            content: '',
            onShow: function(){
                var content = 
                '<div>'+
                    '<table style="width:100%;">'+
                        '<tr>'+
                            '<td colspan="2">'+
                                'Rename Group to...'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                '<input required type="text" id="groupname" data-transform="input-control" value="'+caption+'">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                                '<button class="button bg-blue fg-white" onclick="updategroup('+idgroup+')"><i class="icon-floppy fg-white"></i> Save Settings</button>'+
                            '</td>'+
                            '<td>'+
                                '<button class="place-right button bg-red fg-white" onclick="delgroup('+idgroup+')"><i class="icon-remove fg-white"></i> Delete Group</button>'+
                            '</td>'+
                        '</tr>'+
                    '</table>'+
                    '</div>';
                $.Dialog.title("Group Settings");
                $.Dialog.content(content);
            }
        });
    }
    function setreminder(){
        if($("#settgl").val()==""){
            msg("Date");
            return;
        }
        $("#OC_tglinside").remove();
        $("#OC_tgl").append('<span id="OC_tglinside" onclick="addreminder()" class="button bg-orange fg-white">Active at '+$("#settgl").val()+'</span>');
        closedlg();
    }
    function cancelreminder(){
        $("#settgl").val('');
        $("#OC_tglinside").remove();
        $("#OC_tgl").append('<span id="OC_tglinside" onclick="addreminder()" class="button bg-green fg-white">Set Reminder</span>');
        closedlg();
    }
    function addreminder(){
        $.Dialog({
            shadow: true,
            overlay: true,
            draggable: true,
            icon: '<span class="icon-alarm"></span>',
            title: 'Group Settings',
            width: 350,
            height:430,
            padding: 0,
            content: '',
            onShow: function(){
                var content = 
                '<div>'+
                    '<table style="width:100%;">'+
                        '<tr>'+
                            '<td colspan="2">'+
                            '<div style="width:100%;height:350px;" id="remindercal" class="calendar" data-other-days="1" data-role="calendar" data-locale="en"></div>'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                                '<button class="button bg-blue fg-white" onclick="setreminder()"><i class="icon-checkmark fg-white"></i> Set Reminder</button>'+
                            '</td>'+
                            '<td>'+
                                '<button class="place-right button bg-red fg-white" onclick="cancelreminder()"><i class="icon-cancel-2 fg-white"></i> Cancel Reminder</button>'+
                            '</td>'+
                        '</tr>'+
                    '</table>'+
                    '</div>';
                $.Dialog.title("Group Settings");
                $.Dialog.content(content);
                var cal = $("#remindercal").calendar({
                    click: function(d){
                        $("#OC_datein").remove();
                        var isi = '<tbody id="OC_datein"><tr><td colspan="7"><span style="font-weight:bold;"><center><h1>'+d+'</h1></center></span></td></tr></tbody>';
                        $("#remindercal table.bordered").append(isi);
                        $("#settgl").val(d);
                    }
                });
                if($("#settgl").val()!=""){
                    var d = $("#settgl").val();
                    cal.calendar('setDate',d);

                    $("#OC_datein").remove();
                    var isi = '<tbody id="OC_datein"><tr><td colspan="7"><span style="font-weight:bold;"><center><h1>'+d+'</h1></center></span></td></tr></tbody>';
                    $("#remindercal table.bordered").append(isi);
                    $("#settgl").val(d);
                }

                
            }
        });
    }
    function wait(){   
        $.Dialog.close(); 
        $.Dialog({
            shadow: true,
            overlay: false,
            sysButtons:false,
            draggable: true,
            icon: '<span class="icon-cloud"></span>',
            title: 'KlikJakarta',
            width: 200,
            height:100,
            padding: 10,
            content: '',
            onShow: function(){
                var content = 
                '<div>'+
                    '<table style="width:100%;">'+
                        '<tr>'+
                            '<td colspan="2">'+
                                '<h3>Please Wait...</h3>'+
                            '</td>'+
                        '</tr>'+
                    '</table>'+
                    '</div>';
                $.Dialog.title("KlikJakarta");
                $.Dialog.content(content);
            }
        });
    }
    function waitgears(){   
        $.Dialog.close(); 
        $.Dialog({
            shadow: true,
            overlay: false,
            sysButtons:false,
            draggable: true,
            icon: '<span class="icon-cloud"></span>',
            title: 'KlikJakarta',
            width: 200,
            height:100,
            padding: 10,
            content: '',
            onShow: function(){
                var content = 
                '<div>'+
                    '<table style="width:100%;">'+
                        '<tr>'+
                            '<td colspan="2">'+
                                '<h3>Please Wait...</h3>'+
                            '</td>'+
                        '</tr>'+
                    '</table>'+
                    '</div>';
                $.Dialog.title("KlikJakarta");
                $.Dialog.content(content);
            }
        });
    }
    function closedlg(){
        $.Dialog.close();
    }
    function msg(str){
        $.Dialog.close();
        $.Dialog({
            shadow: true,
            overlay: true,
            draggable: true,
            icon: '<span class="icon-cloud"></span>',
            title: 'KlikJakarta',
            width: '30%',
            height:140,
            padding: 10,
            content: '',
            onShow: function(){
                var content = 
                '<div>'+
                    '<table style="width:100%;">'+
                        '<tr>'+
                            '<td colspan="2">'+
                                str+' cannot be empty'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                            '&nbsp;'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                            '</td>'+
                            '<td>'+
                                '<button class="place-right bg-blue fg-white" onclick="closedlg()">OK</button>'+
                            '</td>'+
                        '</tr>'+
                    '</table>'+
                    '</div>';
                $.Dialog.title("KlikJakarta");
                $.Dialog.content(content);
            }
        });
    }
    function addbookpad(idgroup){
        $.Dialog({
            shadow: true,
            overlay: true,
            draggable: true,
            icon: '<span class="icon-plus-2"></span>',
            title: 'Add Category',
            width: '40%',
            height: 170,
            padding: 10,
            content: '',
            onShow: function(){
                var content = 
                '<div>'+
                    '<table style="width:100%;">'+
                        '<tr>'+
                            '<td colspan="2">'+
                                'Category Name'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                '<input required type="text" id="bookpad" data-transform="input-control">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                            '</td>'+
                            '<td>'+
                                '<button class="place-right bg-blue fg-white" onclick="savebookpad('+idgroup+')"><i class="icon-floppy fg-white"></i> Save</button>'+
                            '</td>'+
                        '</tr>'+
                    '</table>'+
                    '</div>';
                $.Dialog.title("Add Category");
                $.Dialog.content(content);
            }
        });
    }
    function addlistid(idgroup){
        wait();
                    closedlg();
                    $.Dialog({


                        shadow: true,
                        overlay: true,
                        draggable: true,
                        icon: '<span class="icon-pencil"></span>',
                        title: 'Add Task',
                        width: '75%',
                        height: 500,
                        padding: 10,
                        content: '',
                        onShow: function(){
                            var content = 
                            '<div>'+
                                '<table style="width:100%;">'+
                                    '<tr>'+
                                        '<td>'+
                                            'Title'+
                                        '</td>'+
                                        '<td>'+
                                            'Priority'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>'+
                                            '<input required type="text" id="listidtitle" data-transform="input-control">'+
                                        '</td>'+
                                        '<td style="width:20%">'+
                                            '<select required type="text" id="listidprior" data-transform="input-control">'+
                                                '<option value="1">Low</option>'+
                                                '<option value="2">Medium</option>'+
                                                '<option value="3">High</option>'+
                                            '</select>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                            '<div style="width:50%;float:left">Date Start'+
                                                        '<div class="input-control text" data-role="datepicker"'+
                                                            'data-date="'+tgl+'"'+
                                                            "data-format='yyyy-mm-dd'"+
                                                            "data-effect='fade'"+
                                                            "data-locale='en'"+
                                                            "data-week-start='0'>"+
                                                            '<input id="listiddatestart" type="text">'+
                                                            '<button class="btn-date"></button>'+
                                                        '</div></div>'+
                                            '<div style="width:50%;float:left">Date Finish'+
                                                        '<div class="input-control text" data-role="datepicker"'+
                                                            'data-date="'+tgl+'"'+
                                                            "data-format='yyyy-mm-dd'"+
                                                            "data-effect='fade'"+
                                                            "data-locale='en'"+
                                                            "data-week-start='0'>"+
                                                            '<input id="listiddatefinish" type="text">'+
                                                            '<button class="btn-date"></button>'+
                                                        '</div></div>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                            'Checked By'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                            '<input required type="text" id="listidcheck" data-transform="input-control">'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                            'Description'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                            '<textarea required type="text" id="listiddesc" data-transform="input-control"></textarea>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                            'Progress'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                        '<div class="input-control checkbox" id="OC_check">'+
                                            '<label id="OC_checkinside">'+
                                                '<input id="listidprogress" onclick="checkstate()" type="checkbox" />'+
                                                '<span class="check"></span> On Progress'+
                                            '</label>'+
                                        '</div>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td colspan="2">'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>'+
                                        '</td>'+
                                        '<td>'+
                                            '<button class="place-right bg-blue fg-white" onclick="savelistid('+idgroup+')"><i class="icon-floppy fg-white"></i> Save</button>'+
                                        '</td>'+
                                    '</tr>'+
                                '</table>'+
                                '</div>';
                            $.Dialog.title("Add Task");
                            $.Dialog.content(content);
                        }
                    });
    }
    function inputbaru(idcategory){
        wait();
        closedlg();
        $.Dialog({


            shadow: true,
            overlay: true,
            draggable: true,
            icon: '<span class="icon-pencil"></span>',
            title: 'Add File',
            width: '75%',
            height: 560,
            padding: 10,
            content: '',
            onShow: function(){
                var content = 
                '<div>'+
                    '<table style="width:100%;">'+
                        '<tr>'+
                            '<td>'+
                                'File Name'+
                            '</td>'+
                            '<td>'+
                                'Doc Type'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                                '<input required type="text" id="addfilefilename" data-transform="input-control">'+
                            '</td>'+
                            '<td style="width:20%">'+
                                '<input required type="text" id="addfiledoctype" data-transform="input-control">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                                'Source File'+
                            '</td>'+
                            '<td>'+
                                'File Version'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                                '<input required type="text" id="addfilesourcefile" data-transform="input-control">'+
                            '</td>'+
                            '<td style="width:20%">'+
                                '<input required type="text" id="addfilefileversion" data-transform="input-control">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                                'File Location'+
                            '</td>'+
                            '<td>'+
                                'File Type'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                                '<input required type="text" id="addfilefilelocation" data-transform="input-control">'+
                            '</td>'+
                            '<td style="width:20%">'+
                                '<input required type="text" id="addfilefiletype" data-transform="input-control">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                'Customer'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                '<input required type="text" id="addfilecustomer" data-transform="input-control">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                'Keyword'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                '<input required type="text" id="addfilekeyword" data-transform="input-control">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                'Embed Code'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                '<textarea required type="text" id="addfileembed" data-transform="input-control"></textarea>'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                            '</td>'+
                            '<td>'+
                                '<button class="place-right bg-blue fg-white" onclick="savedatafile('+idcategory+')"><i class="icon-floppy fg-white"></i> Save</button>'+
                            '</td>'+
                        '</tr>'+
                    '</table>'+
                    '</div>';
                $.Dialog.content(content);
            }
        });
    }
    function openlink(link){
        wait();
                    closedlg();
                    $.Dialog({


                        shadow: true,
                        overlay: true,
                        draggable: true,
                        icon: '<span class="icon-pencil"></span>',
                        title: 'View Embed',
                        width: '90%',
                        height: '90%',
                        padding: 10,
                        content: '',
                        onShow: function(){
                            var content = 
                            '<div style="height:100%;width:100%;">'+
                            '<iframe src="'+link+'" style="width:100%;height:560px;" frameborder="0" scrolling="no"></iframe>'+
                            '</div>';
                            $.Dialog.content(content);
                        }
                    });
    }

    function addlist(){
        $.Dialog({
            shadow: true,
            overlay: true,
            draggable: true,
            icon: '<span class="icon-pencil"></span>',
            title: 'Add List',
            width: '40%',
            height: 225,
            padding: 10,
            content: '',
            onShow: function(){
                var content = 
                '<div>'+
                    '<table style="width:100%;">'+
                        '<tr>'+
                            '<td colspan="2">'+
                                'Title'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                '<input required type="text" id="listtitle" data-transform="input-control">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                'Tags'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                '<input required type="text" id="listtags" data-transform="input-control">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                            '</td>'+
                            '<td>'+
                                '<button class="place-right bg-blue fg-white" onclick="savelist()"><i class="icon-floppy fg-white"></i> Save</button>'+
                            '</td>'+
                        '</tr>'+
                    '</table>'+
                    '</div>';
                $.Dialog.title("Add List");
                $.Dialog.content(content);
            }
        });
    }
    
    function addgroup(){
        $.Dialog({
            shadow: true,
            overlay: true,
            draggable: true,
            icon: '<span class="icon-pencil"></span>',
            title: 'Add Group',
            width: '40%',
            height: 230,
            padding: 10,
            content: '',
            onShow: function(){
                var content = 
                '<div>'+
                    '<table style="width:100%;">'+
                        '<tr>'+
                            '<td colspan="2">'+
                                'Group Name'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                '<input required type="text" id="group" data-transform="input-control">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                'Group Type'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                '<select required type="text" id="jenis" data-transform="input-control">'+
                                    '<option value="files">Files</option>'+
                                '</select>'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                            '</td>'+
                            '<td>'+
                                '<button class="place-right bg-blue fg-white" onclick="savegroup()"><i class="icon-floppy fg-white"></i> Save</button>'+
                            '</td>'+
                        '</tr>'+
                    '</table>'+
                    '</div>';
                $.Dialog.title("Add Group");
                $.Dialog.content(content);
            }
        });
    }

    function savelist(){
        if($("#listtitle").val()==""){
            msg("Title");
        }
        else{
        var judul = $("#listtitle").val();
        var tags = "Untagged";
        if($("#listtags").val()!=""){
            tags = $("#listtags").val();
        } 
        wait();
        $.ajax({
            type: "POST",
            url: 'files/save_list',
            data : {"judul": judul, "idbookpad":idbookpad,"tag":tags },
            dataType :'json',
            success: function(data_return){
                var hasil = data_return;
                menuartikel(idbookpad,activejenis,activecaption);
                list(hasil['id']);
                }
            });
        }
    }
    function updatelist(id){
        if($("#listtitle").val()==""){
            msg("Title");
        }
        else{
        var judul = $("#listtitle").val();
        var tags = "Untagged";
        if($("#listtags").val()!=""){
            tags = $("#listtags").val();
        } 
        wait();
        $.ajax({
            type: "POST",
            url: 'files/update_list',
            data : {"judul": judul, "id":id,"tag":tags },
            dataType :'json',
            success: function(data_return){
                var hasil = data_return;
                menuartikel(idbookpad,activejenis,activecaption);
                list(id);
                }
            });
        }
    }
    function editart (idartikel) {
        
        $.ajax({
            type: "POST",
            url: 'files/get_artikelid',
            data : {"id":idartikel },
            dataType :'json',
            success: function(data_return){

                $.Dialog({


                    shadow: true,
                    overlay: true,
                    draggable: true,
                    icon: '<span class="icon-pencil"></span>',
                    title: 'Add File',
                    width: '75%',
                    height: 560,
                    padding: 10,
                    content: '',
                    onShow: function(){
                        var content = 
                        '<div>'+
                            '<table style="width:100%;">'+
                                '<tr>'+
                                    '<td>'+
                                        'File Name'+
                                    '</td>'+
                                    '<td>'+
                                        'Doc Type'+
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td>'+
                                        '<input value="'+data_return.nama+'" required type="text" id="addfilefilename" data-transform="input-control">'+
                                    '</td>'+
                                    '<td style="width:20%">'+
                                        '<input value="'+data_return.doc_type+'" required type="text" id="addfiledoctype" data-transform="input-control">'+
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td>'+
                                        'Source File'+
                                    '</td>'+
                                    '<td>'+
                                        'File Version'+
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td>'+
                                        '<input required value="'+data_return.source_file+'" type="text" id="addfilesourcefile" data-transform="input-control">'+
                                    '</td>'+
                                    '<td style="width:20%">'+
                                        '<input required value="'+data_return.file_version+'" type="text" id="addfilefileversion" data-transform="input-control">'+
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td>'+
                                        'File Location'+
                                    '</td>'+
                                    '<td>'+
                                        'File Type'+
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td>'+
                                        '<input required value="'+data_return.tempat+'" type="text" id="addfilefilelocation" data-transform="input-control">'+
                                    '</td>'+
                                    '<td style="width:20%">'+
                                        '<input required value="'+data_return.file_tipe+'" type="text" id="addfilefiletype" data-transform="input-control">'+
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td colspan="2">'+
                                        'Customer'+
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td colspan="2">'+
                                        '<input required value="'+data_return.customer+'" type="text" id="addfilecustomer" data-transform="input-control">'+
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td colspan="2">'+
                                        'Keyword'+
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td colspan="2">'+
                                        '<input required value="'+data_return.keyword+'" type="text" id="addfilekeyword" data-transform="input-control">'+
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td colspan="2">'+
                                        'Embed Code'+
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td colspan="2">'+
                                        '<textarea required type="text" id="addfileembed" data-transform="input-control">'+data_return.embed+'</textarea>'+
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td colspan="2">'+
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td colspan="2">'+
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td>'+
                                    '</td>'+
                                    '<td>'+
                                        '<button class="place-right bg-blue fg-white" onclick="updatedatafile('+idartikel+')"><i class="icon-floppy fg-white"></i> Save</button>'+
                                    '</td>'+
                                '</tr>'+
                            '</table>'+
                            '</div>';
                        $.Dialog.content(content);
                    }
                });
            }
        });
    }
    function realsave(){
        wait();
        refreshview();
        var judul = $('#judul').val(); 
        var tags = $('#tags').val(); 
        var remind = $('#settgl').val(); 
        var isi = CKEDITOR.instances['content'].getData();
        if(judul==""){
            msg("Title");
        }else if(isi==""){
            msg("files");
        }else{
            if(tags==""){
                tags = "Untagged";
            }
            $.ajax({
            type: "POST",
            url: 'files/save_files',
            data : {"judul": judul, "isi": isi, "idbookpad":idbookpad,"tag":tags,"alarm":remind },
            dataType:'json',
            success: function(data_return){
                var hasil = data_return;
                menuartikel(idbookpad,activejenis,activecaption);
                    artikel(hasil['id']);
                }
            });
        }
    }
    function savelistid(idartikel){
        wait();
        refreshview();
        var judulid = $('#listidtitle').val(); 
        var priorid = $('#listidprior').val(); 
        var tglmulai = $('#listiddatestart').val(); 
        var tglselesai = $('#listiddatefinish').val(); 
        var checkid = $('#listidcheck').val(); 
        var descid = $('#listiddesc').val(); 
        var progressid = $('#listidprogress').val(); 
        var checked = '0';
        if($('#listidprogress').prop('checked')) {
            checked = '1';
        }

        if(judulid==""){
            msg("Title");
        }else{

            $.ajax({
            type: "POST",
            url: 'files/save_task',
            data : {"judul": judulid, "priority": priorid, "deskripsi":descid,"progress":checked,"idartikel":idartikel,"tglmulai":tglmulai,"tglselesai":tglselesai,"checkby":checkid },
            dataType:'json',
            success: function(data_return){

                var hasil = data_return;
                    list(idartikel);
                }
            });
        }
    }
    function savedatafile(idartikel){
        wait();
        refreshview();
        var filename = $('#addfilefilename').val(); 
        var doc_type = $('#addfiledoctype').val(); 
        var source_file = $('#addfilesourcefile').val(); 
        var file_version = $('#addfilefileversion').val(); 
        var file_location = $('#addfilefilelocation').val(); 
        var keyword = $('#addfilekeyword').val(); 
        var customer = $('#addfilecustomer').val(); 
        var embed = $('#addfileembed').val(); 
        var file_tipe = $('#addfilefiletype').val(); 

        if(filename==""){
            msg("File Name");
        }else{
            $.ajax({
                type: "POST",
                url: 'files/save_files',
                data : { "nama": filename,"file_tipe": file_tipe,"doc_type": doc_type, "embed": embed, "keyword":keyword,"source_file":source_file,"idbookpad":idartikel,"customer":customer,"file_version":file_version,"tempat":file_location },
                dataType:'json',
                success: function(data_return){

                    var hasil = data_return;
                    menuartikel(idartikel,activejenis,activecaption);

                }
            });
        }
    }
    function updatedatafile(idartikel){
        wait();
        refreshview();
        var idnya = idartikel;
        var filename = $('#addfilefilename').val(); 
        var doc_type = $('#addfiledoctype').val(); 
        var source_file = $('#addfilesourcefile').val(); 
        var file_version = $('#addfilefileversion').val(); 
        var file_location = $('#addfilefilelocation').val(); 
        var keyword = $('#addfilekeyword').val(); 
        var customer = $('#addfilecustomer').val(); 
        var embed = $('#addfileembed').val(); 
        var file_tipe = $('#addfilefiletype').val(); 

        if(filename==""){
            msg("File Name");
        }else{
            $.ajax({
                type: "POST",
                url: 'files/update_files',
                data : { "id":idartikel,"nama": filename,"doc_type": doc_type,"file_tipe": file_tipe, "embed": embed, "keyword":keyword,"source_file":source_file,"customer":customer,"file_version":file_version,"tempat":file_location },
                dataType:'json',
                success: function(data_return){
                    var hasil = data_return;
                    menuartikel(hasil.idbookpad,"berkas",hasil.nama);

                }
            });
        }
    }
    function complete(idtodo){
        wait();
        refreshview();

            $.ajax({
            type: "POST",
            url: 'files/complete_task',
            data : {"id": idtodo },
            dataType:'json',
            success: function(data_return){

                var hasil = data_return;
                    list(hasil['idartikel']);
                }
            });
    }
    function uncomplete(idtodo){
        wait();
        refreshview();

            $.ajax({
            type: "POST",
            url: 'files/uncomplete_task',
            data : {"id": idtodo },
            dataType:'json',
            success: function(data_return){

                var hasil = data_return;
                    list(hasil['idartikel']);
                }
            });
    }
    function deltask(idtodo){
        if(confirm('Do you want to delete '+$("#listidtitle").val()+'?')==true){
        wait();
        refreshview();

            $.ajax({
            type: "POST",
            url: 'files/del_task',
            data : {"id": idtodo },
            dataType:'json',
            success: function(data_return){

                var hasil = data_return;
                    list(hasil['idartikel']);
                }
            });
        }
    }
    function deleteart(id,idbookpad){
        if(confirm('Do you want to delete this data?')==true){
        wait();
        refreshview();

            $.ajax({
            type: "POST",
            url: 'files/del_files',
            data : {"id": id },
            dataType:'json',
            success: function(data_return){

                var hasil = data_return;
                    menuartikel(idbookpad,"jenis",activecaption);
                }
            });
        }
    }
    function updatelistid(idtodo){
        wait();
        refreshview();
        var judulid = $('#listidtitle').val(); 
        var priorid = $('#listidprior').val(); 
        var tglmulai = $('#listiddatestart').val(); 
        var tglselesai = $('#listiddatefinish').val(); 
        var checkid = $('#listidcheck').val(); 
        var descid = $('#listiddesc').val(); 
        var progressid = $('#listidprogress').val(); 
        var checked = '0';
        if($('#listidprogress').prop('checked')) {
            checked = '1';
        }

        if(judulid==""){
            msg("Title");
        }else{

            $.ajax({
            type: "POST",
            url: 'files/update_task',
            data : {"judul": judulid, "priority": priorid, "deskripsi":descid,"progress":checked,"idtodo":idtodo,"tglmulai":tglmulai,"tglselesai":tglselesai,"checkby":checkid },
            dataType:'json',
            success: function(data_return){

                var hasil = data_return;
                menuartikel(idbookpad,activejenis,activecaption);
                    list(hasil['idartikel']);
                }
            });
        }
    }

    function checkstate(idchk){
        $("#OC_checkinside").remove();

            var check = 'checked';
            var progress = 'Complete';
            var isi = '1';
        if(idchk==1){
        check = '';
        progress = 'On Progress';
        isi = '';
        }
        var c = '<label id="OC_checkinside">'+
            '<input id="listidprogress" onclick="checkstate('+isi+')" '+check+' type="checkbox" />'+
            '<span class="check"></span>'+
            progress+
        '</label>';
        $("#OC_check").append(c);
    }
    