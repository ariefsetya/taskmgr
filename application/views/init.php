<?php
/*
$this->load->library('email');
$config['mailpath'] = '/usr/sbin/sendmail';
$config['charset'] = 'iso-8859-1';
$config['smtp_host'] = 'klikjakarta.com';
$config['smtp_user'] = 'Klikjaka';
$config['smtp_pass'] = '43Tpked34B';
$config['priority'] = 1;
$config['wordwrap'] = TRUE;
$config['useragent'] = 'KlikJakarta';

$this->email->initialize($config);

if(!empty($_POST['to'])){

$this->email->from('info@klikjakarta.com', 'KlikJakarta Notes');
$this->email->to($_POST['to']);
$this->email->cc($_POST['cc']);
$this->email->bcc($_POST['bcc']);

$this->email->subject($_POST['subject']);
$this->email->message($_POST['msg']);

$this->email->send();

echo $this->email->print_debugger();
*/
if(!empty($_POST['str'])){

echo md5($_POST['str']);
}
?>
<!--form method="POST" action="">
<table>
	<tr>
		<td>To</td>
		<td><input required type="text" name="to"></td>
	</tr>
	<tr>
		<td>cc</td>
		<td><input type="text" name="cc"></td>
	</tr>
	<tr>
		<td>bcc</td>
		<td><input type="text" name="bcc"></td>
	</tr>
	<tr>
		<td>Subject</td>
		<td><input required type="text" name="subject"></td>
	</tr>
	<tr>
		<td>Message</td>
		<td><textarea required type="text" name="msg"></textarea></td>
	</tr>
	<tr>
		<td></td>
		<td><button required type="submit" name="">Submit</button></td>
	</tr>
</table>
</form-->
<form method="POST" action="">
<table>
	<tr>
		<td>String</td>
		<td><input required type="text" name="str"></td>
	</tr>
	<tr>
		<td></td>
		<td><button required type="submit" name="">Submit</button></td>
	</tr>
</table>
</form>