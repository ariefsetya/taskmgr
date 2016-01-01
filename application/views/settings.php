<?php
        $this->db->where('id',$this->session->userdata('id'));
        $this->db->join('detpengguna','detpengguna.idpengguna=pengguna.id','left');
        $query = $this->db->get('pengguna');
        $hasil = $query->row_array();
        function showdata($caption,$data){
        	if($data==NULL){
        		return $caption;
        	}
        	else{
        		return "<span>".$caption."</span> : ".$data;
        	}
        }
?>
<div id="back" style="padding:10px;">
	<div class="tab-control" data-role="tab-control" data-effect="fade">
	    <ul class="tabs">
	        <li class="active"><a href="#_page_1">Profile</a></li>
	        <li><a href="#_page_2">Account</a></li>
	        <li><a href="#_page_3">Notification</a></li>
	    </ul>
	 
	    <div id="frames" class="frames">
	        <div class="frame" id="_page_1">
				<div class="OC_browsepp" style="float:left;display:inline-block;margin-right:10px;">
					<div class="panel">
					    <div class="panel-header">
					        Profile Picture
					    </div>
					    <div class="panel-content" style="display:block;">
					    	<form method="POST" enctype="multipart/form-data" action="<?php echo base_url('manage/foto.an');?>">
					    	<img id="photo" src="<?php echo $hasil['pp'];?>" style="">
					    	<div class="browsepp">
					    		Browse
					    		<input required id="inputbrowse" name="foto" type="file" data-transform="input-control">
					    		<input type="submit" name="simpan">
					    	</div>
					    	</form>
					    </div>
					</div>
				</div>
				<div id="pageone" style="float:left;display:inline-block;padding:10px;" class="panel">
					<div class="accordion with-marker place-left" style="width:100%;" data-role="accordion" data-closeany="true">
                        <div class="accordion-frame">
                            <a id="henamalengkap" class="heading collapsed" href="#"><?php echo showdata("Full Name",$hasil['namalengkap']);?></a>
                            <div class="content">
                                <label>Set Full Name</label>
						        <input required type="text" data-transform="input-control" value="<?php echo $hasil['namalengkap'];?>" id="namalengkap">
						    	<div class="button" onclick="savedata('namalengkap','pengguna','id','Full Name')" style="margin-top:10px;">Save</div>
						    </div>
                        </div>
                        <div class="accordion-frame">
                            <a id="hejk" class="heading collapsed" href="#"><?php echo showdata("Gender",$hasil['jk']);?></a>
                            <div class="content" style="display: none;">
                                <label>Select Gender</label>
						    	<div class="input-control radio default-style inline-block" data-role="input-control">
		                            <label class="inline-block">
		                                <input id="g1" type="radio" name="g2" value="Male" <?php if($hasil['jk']=="Male"){echo "checked";}?>>
		                                <span class="check"></span>
		                                Male
		                            </label>
		                            <label class="inline-block">
		                                <input id="g2" type="radio" name="g2" value="Female" <?php if($hasil['jk']=="Female"){echo "checked";}?>>
		                                <span class="check"></span>
		                                Female
		                            </label>
		                        </div>
						        <div class="button" onclick="savepil('jk','g2','idpengguna','detpengguna','Gender')" style="margin-top:10px;display:block;width:53px;">Save</div>
                			</div>
                        </div>
                        <div class="accordion-frame">
                            <a id="hetmplahir" class="heading collapsed" href="#"><?php echo showdata("Birth Place",$hasil['tmplahir']);?></a>
                            <div class="content">
						    	<label>Set Birth Place</label>
						        <input required type="text" data-transform="input-control" value="<?php echo $hasil['tmplahir'];?>" id="tmplahir">
						        <div class="button" onclick="savedata('tmplahir','detpengguna','idpengguna','Birth Place')" style="margin-top:10px;">Save</div>
		        			</div>
                        </div>
                        <div class="accordion-frame">
                            <a id="hetgllahir" class="heading collapsed" href="#"><?php echo showdata("Birth Date",$hasil['tgllahir']);?></a>
                            <div class="content">
						    	<label>Set Birth Date</label>
					    		<div class="input-control text" data-role="datepicker"
					    			data-position="bottom"
								    data-format='yyyy-mm-dd'
								    data-effect='fade'
								    data-locale='en'
								    data-other-days='1'>
								    <input required type="text" value="<?php echo $hasil['tgllahir'];?>" id="tgllahir">
								    <button class="btn-date"></button>
								</div>
						        <div class="button" onclick="savedata('tgllahir','detpengguna','idpengguna','Birth Date')" style="margin-top:10px;">Save</div>
							</div>
                        </div>
                        <div class="accordion-frame">
                            <a id="headdr" class="heading collapsed" href="#"><?php echo showdata("Address",$hasil['addr']);?></a>
                            <div class="content">
						    	<label>Set Address</label>
						        <textarea id="addr" data-transform="input-control"><?php echo $hasil['addr'];?></textarea>
						        <div class="button" onclick="savedata('addr','detpengguna','idpengguna','Address')" style="margin-top:10px;">Save</div>
							</div>
                        </div>
                        <div class="accordion-frame">
                            <a id="hephone" class="heading collapsed" href="#"><?php echo showdata("Phone Number",$hasil['phone']);?></a>
                            <div class="content">
						    	<label>Set Phone Number</label>
						        <input required type="text" data-transform="input-control" id="phone" value="<?php echo $hasil['phone'];?>">
						        <div class="button" onclick="savedata('phone','detpengguna','idpengguna','Phone Number')" style="margin-top:10px;">Save</div>
							</div>
                        </div>
                        <div class="accordion-frame">
                            <a id="heoffphone" class="heading collapsed" href="#"><?php echo showdata("Office Phone",$hasil['offphone']);?></a>
                            <div class="content">
						    	<label>Set Office Phone</label>
						        <input required type="text" data-transform="input-control" id="offphone" value="<?php echo $hasil['offphone'];?>">
						        <div class="button" onclick="savedata('offphone','detpengguna','idpengguna','Office Phone')" style="margin-top:10px;">Save</div>
							</div>
                        </div>
                        <div class="accordion-frame">
                            <a id="heofffax" class="heading collapsed" href="#"><?php echo showdata("Office Fax",$hasil['offfax']);?></a>
                            <div class="content"> 
						    	<label>Set Office Fax</label>
						        <input required type="text" data-transform="input-control" id="offfax" value="<?php echo $hasil['offfax'];?>">
						       	<div class="button" onclick="savedata('offfax','detpengguna','idpengguna','Office Fax')" style="margin-top:10px;">Save</div>
							</div>
                        </div>
                    </div>
				</div>
	        </div>
	        <div class="frame" id="_page_2">
	        	<div class="accordion with-marker place-left" style="width:100%;" data-role="accordion" data-closeany="true"> 
                    <div class="accordion-frame">
                        <a id="heemail" class="heading collapsed" href="#"><?php echo showdata("E-Mail",$hasil['email']);?></a>
                        <div class="content">
					    	<label>Set E-Mail</label>
					        <input type="email" required data-transform="input-control" id="email" value="<?php echo $hasil['email'];?>">
					        <div class="button" onclick="savedata('email','pengguna','id','E-Mail')" style="margin-top:10px;">Save</div>
						</div>
                    </div>
                    <div class="accordion-frame">
                        <a id="henamapengguna" class="heading collapsed" href="#"><?php echo showdata("Username",$hasil['namapengguna']);?></a>
                        <div class="content">
					    	<label>Set Username</label>
					        <input required type="text" data-transform="input-control" id="namapengguna" value="<?php echo $hasil['namapengguna'];?>">
					        <div class="button" onclick="savedata('namapengguna','pengguna','id','Username')" style="margin-top:10px;">Save</div>
						</div>
                    </div>
                    <div class="accordion-frame">
                        <a class="heading" href="#">Password</a>
                        <div class="content" style="">
                            <label>Current Password</label>
					        <input type="password" required data-transform="input-control" id="currpass">
					    	<label>New Password</label>
					        <input type="password" required data-transform="input-control" id="newpass">
					    	<label>Confirm New Password</label>
					        <input type="password" required data-transform="input-control" id="confnewpass">
					        <div class="button" onclick="valied()" style="margin-top:10px;">Save</div>
						</div>
                    </div>
                </div>
	        </div>
	        <div class="frame" id="_page_3">
	        	
	        </div>
	    </div>
	</div>
</div>
