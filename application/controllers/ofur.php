<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ofur extends CI_Controller {

	public function index()
	{
		$this->load->view('header'); 
		$this->load->view('nf');
		$this->load->view('footer'); 
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */