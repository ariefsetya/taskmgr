
    var heighted = $(window).height()-100;
    var width = $(window).width()-50;
    var open = false;

    $("#photo").css('width',(230)+'px');
    $("#photo").css('height',(230)+'px');
    $("#back").css('height',heighted+'px');
    $("#frames").css('height',heighted+'px');
    $("#pageone").css('width',(width-250-10-10-20)+'px');
    $("#bodybody").css('min-height',$(window).height()-100);

    function savedata (field,tbl,where,header) {
    	$('#he'+field).html(header+" : "+$("#"+field).val());
        $.ajax({
            type: "POST",
            url: 'manage/save_data',
            data : { 'field':field,'tbl':tbl,'where':where, 'data':$("#"+field).val() },
            dataType :'json',
            success: function(data_return_data){
            }
        });
    }
    function savepil (field,name,where,tbl,header) {
    	var data = $('input[name='+name+']:checked').val();

    	$('#he'+field).html(header+" : "+data);

        $.ajax({
            type: "POST",
            url: 'manage/save_data',
            data : { 'field':field,'tbl':tbl,'where':where, 'data':data },
            dataType :'json',
            success: function(data_return_data){
            }
        });

    	
    }
    function valied () {
    	if($("#newpass").val()!=$("#confnewpass").val()){
    		alert("New Password and Confirm New Password doesn't match!");
    	}else{
	        $.ajax({
	            type: "POST",
	            url: 'manage/cek_pass',
	            data : { 'pass':$("#currpass").val() },
	            dataType :'text',
	            success: function(data_return_data){
	            	if(data_return_data=="oke"){

				        $.ajax({
				            type: "POST",
				            url: 'manage/update_pass',
				            data : { 'pass':$("#newpass").val() },
				            dataType :'text',
				            success: function(data_back){
				            	alert("New Password Saved!");
				            	$("#confnewpass").val('');
				            	$("#newpass").val('');
				            	$("#currpass").val('');
				            }
				        });
	            	}else if(data_return_data=="nooke"){
	            		alert("Current Password doesn't match with your current password");
	            	}
	            }
	        });
    	}
    }

    function waitdata(){   
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
    function closedlgdata(){
        $.Dialog.close();
    }
    $("#notif").on('click',function () {
    	$("#data").css('display','block');
    });
    $("#bodybody").on('click',function () {
    	$("#data").css('display','none');
    });
    function dlglistdata(id){
        waitdata();
        $.ajax({
                type: "POST",
                url: 'notes/get_listbyid',
                data : { "id":id },
                dataType :'json',
                success: function(data_return_data){
                    closedlgdata();
                    var hasil = data_return_data;
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
                                        '</td>'+
                                        '<td>'+
                                            '<div class="place-right">'+but+'</div>'+
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
    function waitdata(){   
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
    function closedlgdata(){
        $.Dialog.close();
    }
    function msgdata(str){
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
                                '<button class="place-right bg-blue fg-white" onclick="closedlgdata()">OK</button>'+
                            '</td>'+
                        '</tr>'+
                    '</table>'+
                    '</div>';
                $.Dialog.title("KlikJakarta");
                $.Dialog.content(content);
            }
        });
    }
    
    
    function complete(idtodo){
        waitdata();
            $.ajax({
            type: "POST",
            url: 'notes/complete_task',
            data : {"id": idtodo },
            dataType:'json',
            success: function(data_return_data){
            	$("#todo"+idtodo).remove();
            	closedlgdata();
                }
            });
    }
    