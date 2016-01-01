<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Join extends CI_Controller {

	public function index()
	{
		$this->load->view('header'); 
		$this->load->view('join');
		$this->load->view('footer'); 
	}
	public function simpan_join(){
		$data['email']=$this->input->post('email');
		$data['katasandi']=md5($this->input->post('katasandi'));
		$data['status']='user';
		$query = $this->db->where('email',$data['email']);
		$query = $this->db->get('pengguna');
		$hasil = $query->row_array();
		$id;
		if(empty($hasil)){
			$this->create_model->simpan_join($data);
			$id = mysql_insert_id();
			$this->session->set_userdata('id',$id);
			$this->session->set_userdata('email',$data['email']);
			$this->session->set_userdata('status',$data['status']);
			$this->session->set_userdata('login',TRUE);
		}
		else{
			echo "<script>window.location='".base_url()."join.an';</script>";
		}

		redirect(base_url().'home.an');

	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */