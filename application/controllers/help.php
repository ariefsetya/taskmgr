<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Help extends CI_Controller {

	public function index()
	{
		$this->load->view('header'); 
		$this->load->view('help');
		$this->load->view('footer'); 
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */