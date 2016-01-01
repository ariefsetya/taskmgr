<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Manage extends CI_Controller {

	public function index()
	{
		if($this->create_model->log()==FALSE){
			redirect(base_url('login.an'));
		}

		$a = $this->db->query("select*from detpengguna where idpengguna = '".$this->session->userdata('id')."'");
		$b = $a->row_array();
		if(empty($b)){
			$data['idpengguna'] = $this->session->userdata('id'); 
			$this->db->insert('detpengguna',$data);
		}
		$this->load->view('header'); 
		$this->load->view('settings');
		$this->load->view('footer'); 
	}
	public function foto()
	{
		$folder = $_FILES['foto']['tmp_name'];
		$lokasi = "assets/foto/".$this->session->userdata('id').$_FILES['foto']['name'];
		move_uploaded_file($folder, $lokasi);
		$data['pp']=$lokasi;
		$this->db->where('idpengguna',$this->session->userdata('id'));
		$this->db->update('detpengguna',$data);
		redirect(base_url('manage.an'));
	}
	public function save_data()
	{
		if($this->input->post('field')=="email"){
			$this->session->set_userdata('email',$this->input->post('data'));
		}
		$data[$this->input->post('field')] = $this->input->post('data');
		$this->db->where($this->input->post('where'),$this->session->userdata('id'));
		$this->db->update($this->input->post('tbl'),$data);
	}
	public function cek_pass()
	{
		$a = $this->db->query("select*from pengguna where id = '".$this->session->userdata('id')."'");
		$b = $a->row_array();
		if($b['katasandi']==md5($this->input->post('pass'))){
			echo "oke";
		}else{
			echo "nooke";
		}
	}
	public function update_pass()
	{
		$data['katasandi']=md5($this->input->post('pass'));
		$this->db->where('id',$this->session->userdata('id'));
		$this->db->update('pengguna',$data);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */