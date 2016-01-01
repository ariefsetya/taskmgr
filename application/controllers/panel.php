<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Panel extends CI_Controller {

	public function enc($enc)
	{
	if($this->create_model->log()==FALSE){
		redirect(base_url('login.an'));
	}

	$enc2 = md5(date("dmy"));
		if($enc2!=$enc){
			redirect(base_url("home.an"));
		}
		$this->load->view('header'); 
		$this->load->view('panel');
		$this->load->view('footer'); 
	}
	public function get_help(){

		$enc2 = md5(date("dmy"));
		$enc = $this->input->post("enc");
		if($enc!=$enc2){
			redirect(base_url("home.an"));
		}
		$help = $this->db->query("SELECT id,judul,sys_create,sys_update,tampil FROM help ORDER BY judul ASC");
		$row = $help->result_array();
		print_r(json_encode($row));
	}
	public function save_help(){

		$enc2 = md5(date("dmy"));
		$enc = $this->input->post("enc");
		if($enc!=$enc2){
			redirect(base_url("home.an"));
		}
		$data['judul'] = $this->input->post("judul");
		$data['isi'] = $this->input->post("isi");
		$data['tampil'] = $this->input->post("tampil");
    	$data['sys_create'] = date("d M Y H:i:s"); 
		$this->db->insert('help',$data);
		redirect(base_url("panel/enc/".$enc));
	}

	public function save_log(){

		$enc2 = md5(date("dmy"));
		$enc = $this->input->post("enc");
		if($enc!=$enc2){
			redirect(base_url("home.an"));
		}
		$data['judul'] = $this->input->post("judul");
		$data['alamat'] = $this->input->post("alamat");
		$data['isi'] = $this->input->post("isi");
		$data['open'] = "0";
    	$data['sys_create'] = date("d M Y H:i:s"); 
		$this->db->insert('log',$data);
		redirect(base_url("panel/enc/".$enc));
	}
	public function changelog($data,$id){
		if($data=="delete"){
			mysql_query("delete from log where id='$id'");
		}
		else if($data=="close"){
			mysql_query("update log set open='1' where id='$id'");
		}
		redirect(base_url("panel/enc/".md5(date("dmy")).".an"));
	}

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */