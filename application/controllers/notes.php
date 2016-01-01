<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Notes extends CI_Controller {

    function cekid($cek){
		if($this->create_model->log()==FALSE){
			redirect(base_url('login.an'));
		}
        if($cek==""){
            redirect(base_url("notes.an"));
        }
    }
	public function index()
	{
		if($this->create_model->log()==FALSE){
			redirect(base_url('login.an'));
		}
		$this->load->view('header');
		$data['ckeditor'] = $this->_setup_ckeditor('content'); 
		$this->load->view('notes',$data);
		$this->load->view('footer'); 
	}
	private function _setup_ckeditor($id)
    {
        $this->load->helper('url');
        $this->load->helper('ckeditor');
 
        $ckeditor = array(
            'id' => $id,
            'path' => 'assets/js/ckeditor',
            'config' => array(
                'toolbar' => 'standard',
                'width' => '99%'));
 
        return $ckeditor;
    }
    public function get_notes(){
        $id = $this->input->post('id');
        $this->cekid($id);
        $db = $this->db->query("select*from artikel where id='$id'");
        $hasil = $db->row_array();
        print_r(json_encode($hasil));
    }
    public function get_group(){
        $id = $this->input->post('id');
        $this->cekid($id);
        $db = $this->db->query("select*from menu where idpengguna='$id' and jenis='artikel' order by judul asc");
        $hasil = $db->result_array();
        print_r(json_encode($hasil));
    }
    public function get_bookpad(){
        $id = $this->input->post('id');
        $idgroup = $this->input->post('idgroup');
        $this->cekid($id);
    	$db = $this->db->query("select*from bookpad where idpengguna='$id' and idgroup='$idgroup' order by judul asc");
    	$hasil = $db->result_array();
    	print_r(json_encode($hasil));
    }
    public function del_bookpad(){
        $idbookpad = $this->input->post('idbookpad');
        $id = $this->input->post('id');
        $this->cekid($idbookpad);
        $this->db->where('id',$idbookpad);
        $this->db->where('idpengguna',$id);
        $this->db->delete('bookpad');
        $this->db->where('idbookpad',$idbookpad);
        $this->db->delete('artikel');
        $id = $this->input->post('id');
        $hasil['id']=$id;
        print_r(json_encode($hasil));
    }
    public function del_group(){
        $idbookpad = $this->input->post('idgroup');
        $id = $this->input->post('id');
        $this->cekid($idbookpad);
        $this->db->where('id',$idbookpad);
        $this->db->where('idpengguna',$id);
        $this->db->delete('menu');
        $this->db->where('idgroup',$idbookpad);
        $this->db->delete('bookpad');
        $id = $this->input->post('id');
        $hasil['id']=$id;
        print_r(json_encode($hasil));
    }
    public function update_bookpad(){
        $idbookpad = $this->input->post('idbookpad');
        $id = $this->input->post('id');
        $this->cekid($idbookpad);
        $data['judul'] = $this->input->post('bookpadname');
        $this->db->where('id',$idbookpad);
        $this->db->where('idpengguna',$id);
        $this->db->update('bookpad',$data);
        $db = $this->db->query("select*from bookpad where id='$idbookpad'");
        $hasil = $db->row_array();
        print_r(json_encode($hasil));
    }
    public function update_group(){
        $idbookpad = $this->input->post('idgroup');
        $id = $this->input->post('id');
        $this->cekid($idbookpad);
        $data['judul'] = $this->input->post('groupname');
        $this->db->where('id',$idbookpad);
        $this->db->where('idpengguna',$id);
        $this->db->update('menu',$data);
        $id = $this->input->post('idgroup');
        $hasil['id']=$id;
        print_r(json_encode($hasil));
    }
    public function del_artikel(){
        $idbookpad = $this->input->post('idartikel');
        $this->cekid($idbookpad);
        $this->db->where('id',$idbookpad);
        $this->db->delete('artikel');
        $id = $this->input->post('id');
        $hasil['id']=$id;
        print_r(json_encode($hasil));
    }
    public function del_task(){
        $idbookpad = $this->input->post('id');
        $this->cekid($idbookpad);
        $this->db->where('id',$idbookpad);
        $hasil = $this->db->get('todo');
        $row = $hasil->row_array();
        $this->db->where('id',$idbookpad);
        $this->db->delete('todo');
        $hasil=$row;
        print_r(json_encode($hasil));
    }
    public function save_bookpad(){
        $data['judul'] = $this->input->post('bookpad');
        $data['idgroup'] = $this->input->post('idgroup');
        $this->db->where('id',$data['idgroup']);
        $h = $this->db->get('menu');
        $r = $h->row_array();
        $data['jenis']=$r['jenis'];
        $this->cekid($data['judul']);
        $data['idpengguna'] = $this->session->userdata('id');
        $data['sys_create'] = date("d M Y H:i:s");
        $this->db->insert('bookpad',$data);
        $hasil['idbook'] = $this->db->insert_id();
        print_r(json_encode($hasil));
    }
    public function save_group(){
        $data['judul'] = $this->input->post('group');
        $data['jenis'] = $this->input->post('jenis');
        $this->cekid($data['judul']);
        $data['idpengguna'] = $this->session->userdata('id');
        $data['sys_create'] = date("d M Y H:i:s");
        $this->db->insert('menu',$data);
        $hasil['idgroup'] = $this->db->insert_id();
        print_r(json_encode($hasil));
    }
    public function get_artikel(){
        $id = $this->input->post('id');
        $this->cekid($id);
        $db = $this->db->query("select*from artikel where idbookpad='$id' order by judul asc");
        $hasil = $db->result_array();
        print_r(json_encode($hasil));
    }
    public function get_list(){
        $id = $this->input->post('idartikel');
        $this->cekid($id);
        $db = $this->db->query("select*from todo where idartikel='$id'");
        $hasil = $db->result_array();
        print_r(json_encode($hasil));
    }
    public function get_listbyid(){
        $id = $this->input->post('id');
        $this->cekid($id);
        $db = $this->db->query("select*from todo where id='$id'");
        $hasil = $db->row_array();
        print_r(json_encode($hasil));
    }
    public function get_artikelid(){
        $id = $this->input->post('id');
        $this->cekid($id);
        $db = $this->db->query("select*from artikel where id='$id'");
        $hasil = $db->row_array();
        print_r(json_encode($hasil));
    }
    public function get_bookpadid(){
        $id = $this->input->post('id');
        $this->cekid($id);
        $db = $this->db->query("select*from bookpad where id='$id'");
        $hasil = $db->row_array();
        print_r(json_encode($hasil));
    }
    public function get_groupid(){
        $id = $this->input->post('id');
        $this->cekid($id);
        $db = $this->db->query("select*from menu where id='$id'");
        $hasil = $db->row_array();
        print_r(json_encode($hasil));
    }
    public function update_notes()
    {
    	$data['tag'] = $this->input->post('tag');
    	$data['judul'] = $this->input->post('judul');
        $this->cekid($data['judul']);
    	$data['isi'] = $this->input->post('isi');
    	$data['alarm'] = $this->input->post('alarm');
    	$data['sys_update'] = date("d M Y H:i:s");
    	$data['idbookpad']=$this->input->post('idbookpad');
    	$id=$this->input->post('id');
        $data['jenis']='artikel';
    	$data['idpengguna']=$this->session->userdata('id');
    	$this->create_model->update_notes($data,$id);
    	print_r($data);
    	
    }
    public function save_notes()
    {
        $data['tag'] = $this->input->post('tag');
        $data['judul'] = $this->input->post('judul');
        $this->cekid($data['judul']);
        $data['isi'] = $this->input->post('isi');
    	$data['alarm'] = $this->input->post('alarm');
        $data['sys_create'] = date("d M Y H:i:s");
        $data['privasi'] = '0';
        $data['hapus']='0';
        $data['jenis']='artikel';
        $data['idbookpad']=$this->input->post('idbookpad');
        $data['idpengguna']=$this->session->userdata('id');
        $this->db->insert('artikel',$data);
        $in_id = $this->db->insert_id(); 
        $new = mysql_query("select*from artikel where id='$in_id'");
        $data2 = mysql_fetch_array($new);
        print_r(json_encode($data2));
    }
    public function save_task()
    {
        $data['idartikel'] = $this->input->post('idartikel');
        $data['judul'] = $this->input->post('judul');
        $this->cekid($data['idartikel']);
        $data['priority'] = $this->input->post('priority');
        $data['deskripsi'] = $this->input->post('deskripsi');
        $data['tglmulai'] = $this->input->post('tglmulai');
        $data['tglselesai'] = $this->input->post('tglselesai');
        $data['checkby'] = $this->input->post('checkby');
        $data['progress'] = $this->input->post('progress');
        $data['sys_create'] = date("d M Y H:i:s");
        $data['idpengguna']=$this->session->userdata('id');
        $this->db->insert('todo',$data);
        $in_id = $this->db->insert_id(); 
        $new = mysql_query("select*from todo where id='$in_id'");
        $data2 = mysql_fetch_array($new);
        print_r(json_encode($data2));
    }
    public function update_task()
    {
        $id = $this->input->post('idtodo');
        $data['judul'] = $this->input->post('judul');
        $this->cekid($id);
        $data['priority'] = $this->input->post('priority');
        $data['deskripsi'] = $this->input->post('deskripsi');
        $data['tglmulai'] = $this->input->post('tglmulai');
        $data['tglselesai'] = $this->input->post('tglselesai');
        $data['checkby'] = $this->input->post('checkby');
        $data['progress'] = $this->input->post('progress');
        $data['sys_create'] = date("d M Y H:i:s");
        $data['idpengguna']=$this->session->userdata('id');
        $this->db->where('id',$id);
        $this->db->update('todo',$data);
        $new = mysql_query("select*from todo where id='$id'");
        $data2 = mysql_fetch_array($new);
        print_r(json_encode($data2));
    }
    public function complete_task()
    {
        $id = $this->input->post('id');
        $this->cekid($id);
        $data['progress'] = '1';
        $this->db->where('id',$id);
        $this->db->update('todo',$data);
        $new = mysql_query("select*from todo where id='$id'");
        $data2 = mysql_fetch_array($new);
        print_r(json_encode($data2));
    }
    public function uncomplete_task()
    {
        $id = $this->input->post('id');
        $this->cekid($id);
        $data['progress'] = '0';
        $this->db->where('id',$id);
        $this->db->update('todo',$data);
        $new = mysql_query("select*from todo where id='$id'");
        $data2 = mysql_fetch_array($new);
        print_r(json_encode($data2));
    }
    public function save_list()
    {
        $data['tag'] = $this->input->post('tag');
        $data['judul'] = $this->input->post('judul');
        $this->cekid($data['judul']);
        $data['sys_create'] = date("d M Y H:i:s");
        $data['privasi'] = '0';
        $data['hapus']='0';
        $data['jenis']='list';
        $data['idbookpad']=$this->input->post('idbookpad');
        $data['idpengguna']=$this->session->userdata('id');
        $this->db->insert('artikel',$data);
        $in_id = $this->db->insert_id(); 
        $new = mysql_query("select*from artikel where id='$in_id'");
        $data2 = mysql_fetch_array($new);
        print_r(json_encode($data2));
    }
    public function update_list()
    {
        $data['tag'] = $this->input->post('tag');
        $data['judul'] = $this->input->post('judul');
        $this->cekid($data['judul']);
        $data['sys_update'] = date("d M Y H:i:s");
        $id=$this->input->post('id');
        $this->db->where('id',$id);
        $this->db->update('artikel',$data);
        $in_id = $this->db->insert_id(); 
        $new = mysql_query("select*from artikel where id='$in_id'");
        $data2 = mysql_fetch_array($new);
        print_r(json_encode($data2));
    }
}
