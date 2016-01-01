<script src="<?php echo base_url();?>assets/js/jquery/jquery.min.js"></script>
<script type="text/javascript">
var areaheight = ($(window).height()-100);
CKEDITOR_BASEPATH = "<?php echo base_url();?>assets/js/ckeditor/";
var enc = '<?php echo md5(date("dmy"));?>';
var get_enc = '<?php echo $this->uri->segment(3);?>';
    $(document).ready(function(){
        wait();
		help(get_enc);
        $.Dialog.close();
    });
    function closedlg(){
    	$.Dialog.close();
    }
    function wait(){
        $.Dialog.close();
        $.Dialog({
            shadow: true,
            overlay: false,
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
    function help(encin){
        wait();
        if(enc != encin){
        	window.location.assign("home");
        }
        $.ajax({
            type: "POST",
            url: '<?php echo base_url();?>panel/get_help',
            data : 'enc='+enc,
            dataType :'json',
            success: function(data_return){
                var hasil = data_return;
                var panjang = hasil.length;
                $("#OC_helpinside").remove();
                var data = "";
                data += '<div id="OC_helpinside">';
                data += '<table class="table bordered hovered">';
                data += '<thead>';
                data += '<th>No</th>';
                data += '<th>Title</th>';
                data += '<th>Show</th>';
                data += '<th>Date Create</th>';
                data += '<th>Date Modified</th>';
                data += '<th colspan="4">Action</th>';
                data += '</thead>';
                for(var i=0;i<panjang;i++){
                data += '<tbody>';
                data += '<tr>';
                data += '<td>'+(i+1)+'</td>';
                data += '<td>'+hasil[i].judul+'</td>';
                data += '<td>'+hasil[i]['tampil']+'</td>';
                data += '<td>'+hasil[i].sys_create+'</td>';
                data += '<td>'+hasil[i].sys_update+'</td>';
                data += '<td><span>View</span></td>';
                data += '<td><span>Update</span></td>';
                data += '<td><span>Delete</span></td>';
                data += '<td><span>Show/Hide</span></td>';
                data += '</tr>';
                data += '</tbody>';
                }
                data += '</table>';
                data += '</div>';
                $("#OC_help").append(data);
                $.Dialog.close();
                },
            failure: function(){
            	alert("No Data");	
            }
            });
    }    
    function addhelp(){
        $.Dialog({
            shadow: true,
            overlay: false,
            draggable: true,
            icon: '<span class="icon-pencil"></span>',
            title: 'Add Help',
            width: '80%',
            height:areaheight+'px',
            padding: 10,
            content: '',
            onShow: function(){
                var content = 
                '<form method="POST" action="<?php echo base_url();?>panel/save_help">'+
                '<div>'+
                    '<table style="width:100%;">'+
                        '<tr>'+
                            '<td>'+
                                'Title'+
                            '</td>'+
                            '<td>'+
                                'Show'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                                '<input required type="text" name="judul" id="helptitle" data-transform="input-control">'+
                            '</td>'+
                            '<td>'+
                                '<select style="height:34px;" name="tampil" required id="helpshow" data-transform="input-control">'+
                                	'<option value="1">Show</option>'+
                                	'<option value="0">Hide</option>'+
                                '</select>'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                            	'Content'+
                            	'<textarea name="isi" id="content"></textarea>'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                '<input type="hidden" name="enc" value="'+enc+'">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                                '<button type="submit" class="button info">Save Help</button>'+
                            '</td>'+
                            '<td>'+
                                '<button class="place-right button danger" onclick="closedlg()">Cancel</button>'+
                            '</td>'+
                        '</tr>'+
                    '</table>'+
                    '</div>'+
                    '</form>';

                $.Dialog.title("Add Help");
                $.Dialog.content(content);

            }

        });

        		CKEDITOR.replace("content", {toolbar : "standard",width : "100%",height : (areaheight-225)+'px'});
    }
    function addlog(){
        $.Dialog({
            shadow: true,
            overlay: false,
            draggable: true,
            icon: '<span class="icon-pencil"></span>',
            title: 'Add Log',
            width: '80%',
            height:areaheight+'px',
            padding: 10,
            content: '',
            onShow: function(){
                var content = 
                '<form method="POST" action="<?php echo base_url();?>panel/save_log">'+
                '<div>'+
                    '<table style="width:100%;">'+
                        '<tr>'+
                            '<td>'+
                                'Title'+
                            '</td>'+
                            '<td>'+
                                'Link'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                                '<input required type="text" name="judul" id="logtitle" data-transform="input-control">'+
                            '</td>'+
                            '<td>'+
                                '<input required type="text" name="alamat" id="loglink" data-transform="input-control" value="http://www.klikjakarta.com/">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                'Content'+
                                '<textarea name="isi" id="content"></textarea>'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                '<input type="hidden" name="enc" value="'+enc+'">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                                '<button class="button info" type="submit">Save Log</button>'+
                            '</td>'+
                            '<td>'+
                                '<button class="place-right button danger" onclick="closedlg()">Cancel</button>'+
                            '</td>'+
                        '</tr>'+
                    '</table>'+
                    '</div>'+
                    '</form>';

                $.Dialog.title("Add Log");
                $.Dialog.content(content);

            }

        });

                CKEDITOR.replace("content", {toolbar : "standard",width : "100%",height : (areaheight-225)+'px'});
    }
    function newmessages(){
        $.Dialog({
            shadow: true,
            overlay: false,
            draggable: true,
            icon: '<span class="icon-pencil"></span>',
            title: 'New Messages',
            width: '80%',
            height:areaheight+'px',
            padding: 10,
            content: '',
            onShow: function(){
                var content = 
                '<form method="POST" action="<?php echo base_url();?>panel/send_msg">'+
                '<div>'+
                    '<table style="width:100%;">'+
                        '<tr>'+
                            '<td>'+
                                'Subject'+
                            '</td>'+
                            '<td>'+
                                'Receiver'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                                '<input required type="text" name="judul" data-transform="input-control">'+
                            '</td>'+
                            '<td>'+
                                '<select style="height:34px;" name="receiver" id="receiver" required data-transform="input-control">'+
                                    '<option value="0">All</option>'+
                                    <?php
                                    $aa = mysql_query("select*from pengguna");
                                    while($ba = mysql_fetch_array($aa)){
                                    ?>
                                    <?php echo "'<option value=".'"'.$ba['id'].'"'.">$ba[email]</option>'+"; 
                                    }
                                    ?>
                                '</select>'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                'Content'+
                                '<textarea name="isi" id="content"></textarea>'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                '<input type="hidden" name="enc" value="'+enc+'">'+
                            '</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td>'+
                                '<button class="button info" type="submit">Send Message</button>'+
                            '</td>'+
                            '<td>'+
                                '<button class="place-right button danger" onclick="closedlg()">Cancel</button>'+
                            '</td>'+
                        '</tr>'+
                    '</table>'+
                    '</div>'+
                    '</form>';

                $.Dialog.title("New Message");
                $.Dialog.content(content);

            }

        });

                CKEDITOR.replace("content", {toolbar : "standard",width : "100%",height : (areaheight-225)+'px'});
    }
</script>
<div style="width:100%;height:100%;display:inline-block;">
<div style="width:80%;margin:10px auto;">
	<div class="tab-control" data-effect="fade" data-role="tab-control">
	    <ul class="tabs">
	        <li class=""><a href="#___1">User Management</a></li>
	        <li class=""><a href="#___2">Help Management</a></li>
	        <li class=""><a href="#___3">Generated Message</a></li>
	        <li class="active"><a href="#___4">Change Log</a></li>
	    </ul>

	    <div class="frames">
	        <div class="frame" id="___1" style="display: none;">
	        	    <button onclick="newmessages()">New User</button>
            <hr>
                   <table class="table hovered">
                        <thead>
                            <th style="width:50px;">No</th>
                            <th style="width:40px;">DP</th>
                            <th>E-Mail</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Confirmed</th>
                            <th colspan="2">Action</th>
                        </thead>
                        <?php
                        $data = $this->db->query("SELECT *
                            FROM
                            pengguna
                            LEFT JOIN detpengguna ON pengguna.id = detpengguna.idpengguna
                            ");
                        $rowdata = $data->result_array();
                        $no = 1;
                        ?>
                        <?php
                        foreach ($rowdata as $key) {
                            ?>
                            <tbody>
                                <tr>
                                    <td style="width:50px;"><?php echo $no;?></td>
                                    <td><img style="width:25px;height:25px;" src="<?php echo base_url().$key['pp'];?>"></td>
                                    <td><?php echo $key['email'];?></td>
                                    <td><?php echo $key['namalengkap'];?></td>
                                    <td><?php echo $key['jk'];?></td>
                                    <td><a href="<?php echo base_url();?>panel/changelog/delete/<?php echo $key['id'];?>.an">Delete</a></td>
                                    <td><a href="<?php echo base_url();?>panel/changelog/close/<?php echo $key['id'];?>.an">Close</a></td>
                                </tr>
                            </tbody>
                            <?php
                            $no++;
                        }
                        ?>
                    </table>
	        </div>
	        <div class="frame" id="___2" style="display: none;">
	        <button onclick="addhelp()">Add Help</button>
	        <hr>
	        <div id="OC_help">
	        	<div id="OC_helpinside">
	        		
	        	</div>
	        </div>
	        </div>
	        <div class="frame" id="___3" style="display: none;">

            <button onclick="newmessages()">New Message</button>
            <hr>
	               <table class="table hovered">
                        <thead>
                            <th style="width:50px;">No</th>
                            <th>Subject</th>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th colspan="2">Action</th>
                        </thead>
                        <?php
                        $data = $this->db->query("SELECT
                            pengirim.namapengguna,
                            penerima.namapengguna,
                            pesan.subyek,
                            pesan.id,
                            pesan.pengirim,
                            pesan.penerima,
                            pesan.terkirim,
                            pesan.terbaca,
                            pesan.isi,
                            pesan.tgl,
                            pesan.jam,
                            pesan.lampiran
                            FROM
                            pesan
                            LEFT JOIN pengguna AS pengirim ON pesan.pengirim = pengirim.id
                            LEFT JOIN pengguna AS penerima ON pesan.penerima = penerima.id
                            ");
                        $rowdata = $data->result_array();
                        $no = 1;
                        ?>
                        <?php
                        foreach ($rowdata as $key) {
                            ?>
                            <tbody>
                                <tr>
                                    <td style="width:50px;"><?php echo $no;?></td>
                                    <td><?php echo $key['subyek'];?></td>
                                    <td><?php echo $key['pengirim.namapengguna'];?></td>
                                    <td><?php echo $key['penerima.namapengguna'];?></td>
                                    <td><a href="<?php echo base_url();?>panel/changelog/delete/<?php echo $key['id'];?>.an">Delete</a></td>
                                    <td><a href="<?php echo base_url();?>panel/changelog/close/<?php echo $key['id'];?>.an">Close</a></td>
                                </tr>
                            </tbody>
                            <?php
                            $no++;
                        }
                        ?>
                    </table>
            </div>
	        <div class="frame" id="___4" style="display: block;">
	        <button onclick="addlog()">Add Log</button>
            <hr>
	            <table class="table hovered">
	            <thead>
	            	<th style="width:50px;">No</th>
	            	<th>Update</th>
	            	<th>Link</th>
	            	<th>Date</th>
	            	<th colspan="2">Action</th>
	            </thead>
	            <?php
	            $data = $this->db->query("select*from log");
	            $rowdata = $data->result_array();
	            $no = 1;
	            ?>
	            <?php
	            foreach ($rowdata as $key) {
	            	?>
	            	<tbody>
	            		<tr>
	            			<td style="width:50px;"><?php echo $no;?></td>
	            			<td><?php echo $key['judul'];?></td>
	            			<td><?php echo $key['alamat'];?></td>
	            			<td><?php echo $key['sys_create'];?></td>
	            			<td><a href="<?php echo base_url();?>panel/changelog/delete/<?php echo $key['id'];?>.an">Delete</a></td>
	            			<td><a href="<?php echo base_url();?>panel/changelog/close/<?php echo $key['id'];?>.an">Close</a></td>
	            		</tr>
	            	</tbody>
	            	<?php
	            	$no++;
	            }
	            ?>
	            </table>
	        </div>
	    </div>
	</div>
</div>
</div>