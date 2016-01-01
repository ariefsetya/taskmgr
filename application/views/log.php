<?php
$isi = $this->db->query("SELECT*FROM log ORDER BY id DESC");
$rowisi = $isi->result_array();
?>
<div id="all" style="display:inline-block;width:100%;height:100%;">
<div style="width:80%;margin:0 auto;">
    <h3>Change Log</h3>
    <?php
    foreach ($rowisi as $key) {
    ?>
    <div class="panel collapsed" data-role="panel">
        <div class="panel-header bg-blue fg-white">
            <?php echo $key['sys_create']." : ".$key['judul'];?>
        </div>
        <div class="panel-content" style="display:none;">
            <?php echo $key['isi'];?>
        </div>
    </div>
    <?php 
    }
    ?>
</div>
</div>