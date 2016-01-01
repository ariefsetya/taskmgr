<div>
	<div style="" id="clndr" class="calendar small"></div>
</div>
<div id="detaildate">
	<?php
	function bul($val)
	{
		$data;
		if(strlen($val)==1){
			$data = "0".$val;
		}
		else{
			$data = $val;
		}
		return $data;
	}
	function bulan($val)
	{
		$data;
		switch ($val) {
			case 1:
				$data = "January";
				break;
			case 2:
				$data = "February";
				break;
			case 3:
				$data = "March";
				break;
			case 4:
				$data = "April";
				break;
			case 5:
				$data = "May";
				break;
			case 6:
				$data = "June";
				break;
			case 7:
				$data = "July";
				break;
			case 8:
				$data = "August";
				break;
			case 9:
				$data = "September";
				break;
			case 10:
				$data = "October";
				break;
			case 11:
				$data = "November";
				break;
			case 12:
				$data = "December";
				break;
		}
		return $data;
	}
	for($i = 1;$i<13;$i++){
		$this->db->select("*");
		$this->db->where('idpengguna',$this->session->userdata('id'));
		$this->db->like('tglmulai',bul($i));
		$this->db->like('tglselesai',bul($i));
		$hasil = $this->db->get('todo');
	}
	?>

</div>