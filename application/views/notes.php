<div id="all" style="position:fixed;display:inline-block;width:100%;height:100%;">
<div id="OC_group" class="most-left" style="width:18%;float:left;overflow-y:auto;display:inline-block;">
<div class="accordion place-left" data-role="accordion" style="width:100%" id="OC_groupinside">
    <div class="listview-outlook" data-role="listview">
        <li onclick="" class="list">
            <div class="list-content">
                <span onclick="alert('add bookpad')" class="list-title">Add Group</span>
            </div>
        </li>
    </div>
    <div class="accordion-frame" style="margin:0px;border-bottom:1px solid #0099ee;">
        <li class="heading collapsed" style="padding-left:5px;">BookPad</li>
        <div class="content" style="display: block;padding:0px">
            <div class="listview-outlook" data-role="listview"  style="padding:0px;">
                <div class="list-group" style="padding:0px;">
                    <div id="OC_bookpad" class="group-content">
                        <div id="OC_bookpadinside">
                            <a onclick="menuartikel('')" class="list">
                                <div class="list-content">
                                    <div id="menu_" class="list-title"></div>
                                </div>
                            </a>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<div id="OC_artikel" style="width:24%;float:left;border-left:1px solid lightgray;height:100%">
    <div id="OC_artikelinside">
    <legend id="title-bookpad">Showcases</legend>
    <div class="listview-outlook" data-role="listview">
        <li onclick="" class="list">
            <div class="list-content">
                <span class="list-title">Click your BookPad on left side</span>
            </div>
        </li>
    </div>
    </div>
</div>
<div style="width:58%;float:left;height:100%;overflow-y:hidden;border-left:1px solid lightgray;overflow-x:hidden">
    <form id="sum" method="POST" action="">
    <div id="OC_title" style="width:100%;height:32px;display:inline-block;padding-bottom:0px;"><div style="width:100%;padding:10px;cursor:pointer;" id="OC_titleinside" ><span style="width:100%;" class="place-left" id="judul" placeholder="Title...">Select a BookPad to create new note...</span></div></div>
    <div id="OC_content">
    <div id="OC_inside">
    <span style="padding:10px;cursor:pointer;">Notes area</span> 
    </div>
    </div>
    <div id="OC_button">
        <div id="OC_buttoninside">
        <span id="save" class="place-right" style="margin-right:10px;"></span>
        </div>
    </div>
    </form>
</div>
<input type="hidden" id="settgl">
<div id="OC_right" style="position: absolute;">
    <div id="OC_rightinside" style="display:none;">
        <ul class="dropdown-menu open keep-open" style="width: 200px; z-index: 1000;">
            <li class="menu-title">This is a title</li>
            <li><a href="http://google.com">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li class="menu-title">This is another title</li>
            <li><a href="#">Something else here</a></li>
            <li class="divider"></li>
            <li class="disabled"><a href="#">Disabled link</a></li>
            <li class="divider"></li>
            <li class="divider"><a href="#">Checked link</a></li>
        </ul>
    </div>
</div>
</div>