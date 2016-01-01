</div>

<!-- Load JavaScript Libraries -->
<script src="<?php echo base_url();?>assets/js/jquery/jquery.min.js"></script>
<script src="<?php echo base_url();?>assets/js/ckeditor/ckeditor.js"></script>

<script src="<?php echo base_url();?>assets/js/jquery/jquery.widget.min.js"></script>


<!-- Metro UI CSS JavaScript plugins -->
<?php
if($this->uri->segment(1)=="notes"){
	?>
	<script src="<?php echo base_url();?>script.js?haha=<?php echo $this->session->userdata('id');?>&base=<?php echo base_url();?>assets/js/ckeditor/&tgl=<?php echo date('Y-m-d');?>"></script>
	<?php
}
if($this->uri->segment(1)=="files"){
	?>
	<script src="<?php echo base_url();?>scriptfile.js?haha=<?php echo $this->session->userdata('id');?>&base=<?php echo base_url();?>assets/js/ckeditor/&tgl=<?php echo date('Y-m-d');?>"></script>
	<?php
}
if($this->uri->segment(1)=="dolist"){
	?>
	<script src="<?php echo base_url();?>scriptlist.js?haha=<?php echo $this->session->userdata('id');?>&base=<?php echo base_url();?>assets/js/ckeditor/&tgl=<?php echo date('Y-m-d');?>"></script>
	<?php
}
?>
<script src="<?php echo base_url();?>assets/js/metro.min.js"></script>
<script src="<?php echo base_url();?>assets/js/load-metro.js"></script>
<script src="<?php echo base_url();?>assets/js/docs.js"></script>
<script src="<?php echo base_url();?>assets/js/dataTables.js"></script>
<?php
if($this->session->userdata('id')!=""){
	?>

<script src="<?php echo base_url();?>assets/js/data.js"></script>
<?php }
?>
<!--div class="changelog-info" style="">
<?php
$data = $this->db->query("select*from log where open='0'");
$jum = sizeof($data->result_array());
?>
<a href="<?php echo base_url();?>changelog.an">
<div style="text-decoration:none;" class="fg-black text-center notice marker-on-bottom">
	<b>Today's Updates (<?php echo $jum;?>)</b>
</div>
</a>
</div-->
</BODY>
</html>
<?php
	if($this->uri->segment(1)=="calendar"){
		include "cal.php";
	}
?>