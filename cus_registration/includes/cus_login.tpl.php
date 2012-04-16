<?php 
/**
 *@base_url - Which gives the base url of the site 
 *@module_path - Provides the module path
*/

global $base_url; 
$module_path = drupal_get_path('module', 'cus_registration');
?>
<div id="login_block">
	<form class="login_form" name="login_form" id="login_form" onsubmit="return false;">
		<div class="user_name elements"> 
			<label>Username: </label>
			<input type="text" name="usr_name" id="usr_name">
		</div>
		<div class="user_pass elements"> 
			<label>Password: </label>
			<input type="password" name="usr_password" id="usr_password" >
		</div>
		<div class="user_actions elements"> 
			<input type="submit" name="usr_submit" id="usr_submit" value="Submit" onclick="process_login();">
		</div>
	</form>
</div>
<div id="notifications"></div>
<div id="user_dont_have_account">
	<a href="javascript:bring_register();" class="anonymous_user">New user! Register here</a> | 
	<a href="javascript:bring_loginbox();" class="anonymous_user">Sign in with Facebook</a>
</div>