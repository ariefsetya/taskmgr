<script type="text/javascript">
    $("#clndr").css('width',$(window).width()-10);
    $("#detaildate").css('width',$(window).width()-10);
</script>
<?php
	$this->db->select("*");
	$this->db->where('idpengguna',$this->session->userdata('id'));
	$hasil = $this->db->get('artikel');
	$row = $hasil->result_array();
	$this->db->select("*");
	$this->db->where('idpengguna',$this->session->userdata('id'));
	$hasiltodo = $this->db->get('todo');
	$rowtodo = $hasiltodo->result_array();
?>
<script>
var cal = $("#clndr").calendar({
        multiSelect: true,
        disable:true
    });
 
    // Add date
    <?php
    foreach ($row as $key) {
    	?>
    	cal.calendar('setDate', '<?php echo $key["alarm"];?>');
    	<?php
    }
    ?>
    <?php
    foreach ($rowtodo as $key) {
    	?>
    	cal.calendar('setDate', '<?php echo $key["tglselesai"];?>');
    	<?php
    }
    ?>
    $("#detaildate").css('height',$(window).height()-65-$("#clndr").height());
    $(".btn-next-month").on('click',function(){
    	checknext();
    });    
    $(".btn-previous-month").on('click',function(){
    	checkprev();
    });
    function checknext () {
    	$("#detaildate").css('height',$(window).height()-65-$("#clndr").height());
    	$(".btn-next-month").on('click',function(){
    		checknext();
    	});
    }
    function checkprev () {
    	$("#detaildate").css('height',$(window).height()-65-$("#clndr").height());
    	$(".btn-previous-month").on('click',function(){
    		checkprev();
    	});
    }
    function gotomon (mon) {
	    $('#detaildate').animate({
	    	scrollTop: $("#div"+mon).offset().top+$("#detaildate").scrollTop()-348
		}, 2000);
    }
</script>