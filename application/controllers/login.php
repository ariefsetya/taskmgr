<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller {

	public function index()
	{
		if($this->create_model->log()==TRUE){
			redirect(base_url('home'));
		}
		$this->load->view('header'); 
		$this->load->view('login');
		$this->load->view('footer'); 
	}
	public function cek(){
		$data['email']=$this->input->post('email');
		$data['katasandi']=md5($this->input->post('katasandi'));
		$hasil = $this->create_model->cek($data);
		
		if($hasil=="gagal"){
			redirect(base_url("login"));
			echo "<script>window.location='".base_url()."/login.an';</script>";
		}
		$this->session->set_userdata('status',$hasil['status']);
		$this->session->set_userdata('email',$hasil['email']);
		$this->session->set_userdata('id',$hasil['id']);
		$this->session->set_userdata('login',TRUE);
		redirect(base_url("home"));
		echo "<script>window.location='".base_url()."home.an';</script>";
	}
}