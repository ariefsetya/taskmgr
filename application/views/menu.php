<?php
function prior($id){
    $hasil;
    switch ($id) {
        case '1':
            $hasil = "<i class='icon-flag-2 fg-blue'></i> Low"; 
        break;
        case '2':
            $hasil = "<i class='icon-flag-2 fg-orange'></i> Medium"; 
        break;
        case '3':
            $hasil = "<i class='icon-flag-2 fg-red'></i> High"; 
        break;
    }
    return $hasil;
}
$enc = md5(date("dmy"));
$masuk=$this->create_model->log();
?>

    <?php
    $this->load->helper('text');
    $today = date("Y-m-d");
    $this->db->select('*');
    $this->db->where('idpengguna',$this->session->userdata('id'));
    $this->db->where('tglselesai >=',$today);
    $this->db->where('progress','0');
    $this->db->order_by('tglselesai','ASC');
    $this->db->order_by('priority','DESC');
    $this->db->limit('3');
    $query = $this->db->get('todo');
    $hasiltodo = $query->result_array();

    $this->db->select('*');
    $this->db->where('idpengguna',$this->session->userdata('id'));
    $this->db->where('alarm >=',$today);
    $this->db->order_by('alarm','ASC');
    $this->db->limit('3');
    $query1 = $this->db->get('artikel');
    $hasilartikel = $query1->result_array();
    ?>
<nav class="navigation-bar">
    <div class="navigation-bar-content">
    <a style="width:18%;" class="element" href="<?php echo base_url();?>home.an"><i class="icon-clipboard-2"></i> KlikJakarta</a>
    <div class="element input-element"style="width:24%;">
        <form method="POST" style="width:100%;"action="<?php echo base_url();?>searc.an">
            <div class="input-control text" style="width:100%;">
                <input style="font-family:Segoe UI Light;font-size:10pt !important;" type="text" name="cari" placeholder="Search...">
                <button class="btn-search"></button>
            </div>
        </form>
    </div>
    <a class="element" href="<?php echo base_url();?>notes.an"><i class="icon-book"></i> Notes</a>
    <a class="element" href="<?php echo base_url();?>files.an"><i class="icon-folder-2"></i> Files</a>
    <a class="element" href="<?php echo base_url();?>dolist.an"><i class="icon-list"></i> To Do List</a>
    <?php if($masuk==FALSE){
    ?>
    <div class="place-right">
        <a class="element" href="<?php echo base_url();?>login.an"><i class="icon-enter"></i> Sign In</a>
        <a class="element" href="<?php echo base_url();?>join.an"><i class="icon-plus"></i> Join</a>
    </div>
    <?php
    } 
    if($masuk==TRUE){ 
        $this->db->where('id',$this->session->userdata('id'));
        $this->db->join('detpengguna','detpengguna.idpengguna=pengguna.id','left');
        $query = $this->db->get('pengguna');
        $hasil = $query->row_array();
        if($this->session->userdata('status')=="admin"){
            ?>

    <a class="element" href="<?php echo base_url();?>panel/enc/<?php echo $enc;?>.an"><i class="icon-folder-2"></i> Admin</a>
            <?php
        }
        ?>

    <div class="place-right">
        <a href="<?php echo base_url().$this->uri->segment(1);?>.an" class="element"><i class="icon-spin"></i></a>
        
        <div class="element">
            <a class="dropdown-toggle" href="#">
                <span class="icon-calendar"> <span style="font-family:Segoe UI Light;"></span></span>
            </a>
            <ul class="dropdown-menu place-right" data-role="dropdown" style="display: none;">
            <?php
        if(!empty($hasiltodo)){
            ?>
                <li class="divider"></li>
                <li><a>To Do List</a></li>
                <li class="divider"></li>
            <?php
        }
    ?>
    <?php
    foreach ($hasiltodo as $key) {
    ?>

                <li id="todo<?php echo $key['id'];?>" data-hint-position="left" onclick="dlglistdata(<?php echo $key['id'];?>)" data-hint="<?php echo $key['deskripsi'];?>|Deadline : <?php echo $key['tglselesai'];?><br>Priority : <?php echo prior($key['priority']);?>"><a><?php echo  character_limiter($key['judul'],16);?></a></li>
      
      <?php } ?>
                <?php

        if(!empty($hasilartikel)){
            ?>
                <li class="divider"></li>
                <li><a>Notes</a></li>
                <li class="divider"></li>
            <?php
        }
    ?>
    <?php
    foreach ($hasilartikel as $key) {
    ?>

                <li id="artikel<?php echo $key['id'];?>" data-hint-position="left" onclick="dlglistartikel(<?php echo $key['id'];?>)" data-hint="<?php echo $key['judul'];?>|Deadline : <?php echo $key['alarm'];?><br>Tags : <?php echo $key['tag'];?>"><a><?php echo  character_limiter($key['judul'],16);?></a></li>
      
      <?php } ?>
                <li class="divider"></li>
                <li><a href="<?php echo base_url();?>calendar.an"><i class="icon-calendar"></i> Calendar</a></li>
            </ul>
        </div>
        <a href="<?php echo base_url();?>/profile/<?php echo $this->session->userdata('id');?>.an" class="element image-button image-left">
            <?php echo $this->session->userdata('email');?>
            <img src="<?php echo $hasil['pp'];?>"/>
        </a>

        <div class="element">
            <a class="dropdown-toggle" href="#">
                <span class="icon-cog"> <span style="font-family:Segoe UI Light;"></span></span>
            </a>
            <ul class="dropdown-menu place-right" data-role="dropdown" style="display: none;">
                <li><a href="<?php echo base_url();?>manage.an">Settings</a></li>
                <li><a href="<?php echo base_url();?>help.an">Help &amp; Support</a></li>
                <li><a href="<?php echo base_url();?>plan.an">Plan</a></li>
                <li class="divider"></li>
                <li><a href="<?php echo base_url();?>logout.an">Sign Out</a></li>
            </ul>
        </div>
    </div>       

            <?php }?>

    </div>
</nav>
<div style="width:100%;">
<div id="data" class="notice marker-on-top noteif2" style="display:none;">
    <?php
        if(!empty($hasiltodo)){
            ?>
                <legend>To Do List</legend>
            <?php
        }
    ?>
    <div class="listview-outlook">
    <?php
    foreach ($hasiltodo as $key) {
    ?>
        <a data-hint="<?php echo $key['deskripsi'];?>|Deadline : <?php echo $key['tglselesai'];?><br>Priority : <?php echo prior($key['priority']);?>" class="list not2if" id="todo<?php echo $key['id'];?>">
            <div onclick="dlglistdata(<?php echo $key['id'];?>)" class="list-content"><?php echo  character_limiter($key['judul'],30);?></div>
        </a>
      
      <?php } ?>        
    </div>
    <?php
        if(!empty($hasilartikel)){
            ?>
                <legend>Notes</legend>
            <?php
        }
    ?>
    <div class="listview-outlook">
    <?php
    foreach ($hasilartikel as $key) {
    ?>
         <a class="list not2if" id="artikel<?php echo $key['id'];?>">
            <div class="list-content"><?php echo  character_limiter($key['judul'],30);?></div>
        </a>
      
      <?php } ?>   
    </div>

    <a href="<?php echo base_url("calendar.an");?>"><legend class="legend text-center panel calen">Calendar</legend></a>
</div>
</div>
