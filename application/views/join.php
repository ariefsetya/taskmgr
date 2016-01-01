<div style="margin:100px auto;max-width:20%">
<form method="POST" action="<?php echo base_url();?>join/simpan_join.an" style="">
	<fieldset>
		<legend>Save your notes</legend>
		<label>E-Mail</label>
		<input type="email" tabindex="1" required data-transform="input-control" name="email">
		<label>Password</label>
		<input type="password" required tabindex="2" data-transform="input-control" name="katasandi">
		<div class="place-right">
			<button type="submit" tabindex="3" class="bg-blue fg-white large">Sign Up</button>
		</div>
	</fieldset>
</form>
</div>