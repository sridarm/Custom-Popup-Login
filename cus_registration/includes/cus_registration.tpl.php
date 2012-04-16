<?php 
/**
 *@base_url - Which gives the base url of the site 
 *@module_path - Provides the module path
*/

global $base_url; 
$module_path = drupal_get_path('module', 'cus_registration');
?>

<div id="reg_form_logo"><img src="<?php print $base_url."/".$module_path; ?>/images/registration_form_logo.png" ></div>
<div id="content_box">
	<div id="instruction_box">
	<p class="reg_instruction">Please let us have your email address and postcode, and we will send you fabulous offers relevant to your location within the UK.</p>
	</div>
	
	<!-- Adding Registration form for popup -->
	
	<div id="reg_form">
		<form class="registration_form" name="registration_form" id="registration_form" onsubmit="return false;">
			<div class="user_email elements"> 
				<label>Your Email Address: </label>
				<input type="text" name="usr_email" id="usr_email">
			</div>
			<div class="user_postcode elements"> 
				<label>Your Post Code: </label>
				<input type="text" name="usr_postcode" id="usr_postcode">
			</div>
			<div class="user_actions elements"> 
				<input type="submit" name="usr_submit" id="usr_submit" value="Submit" onclick="process_registration();">
			</div>
		</form>
		<div class="message"></div>
	</div>
	<div id="user_have_account">
		<a href="javascript:bring_loginbox();" class="user_have_link_already">Let me log in! I already have an account</a>
	</div>
</div>