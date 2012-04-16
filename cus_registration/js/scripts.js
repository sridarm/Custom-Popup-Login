function regform_toggle(status, formName) {
	if (status == "loading") {
		$('#cboxLoadedContent #reg_form').html('<div class="loading"></div>');
		$('#cboxLoadedContent #login_block').html('<div class="loading"></div>');
	} else if (status == "active") {
		$('#cboxLoadedContent #content_box ').html(formName);
		$('#cboxLoadedContent #content_box .message').html('');
	}
}
function process_registration() {
	window.registrationForm = document.getElementById('content_box').innerHTML;
	var emailid = document.registration_form.usr_email.value;
	var postalcode = document.registration_form.usr_postcode.value;
	if (emailid !=="")
	{
    $.ajax({
		  type: 'POST',
		  url: "/cus/register_process",
		  data: {
				email : emailid,
				postcode : postalcode
		  },
		  beforeSend:function(){
			//  regform_toggle("loading");
			  $('#content_box #reg_form').html('<div class="loading"></div> <br/> <p class="loading_message">Registering on Jongleurs</p>');
		  },				  
		  success: function (response){
			//  alert(response);
			 var getuserdata = eval('(' + response + ')');
			 if (!getuserdata.type) {
				 getvenueid(getuserdata.name, getuserdata.mail, getuserdata.Postcode, getuserdata.uid);
			 } else {
				 // regform_toggle("active", registrationForm);
				 $('#content_box').html(registrationForm);
				 $('#reg_form .message').html(getuserdata.type);
			 }
		  },
		  error: function (){
			alert("Error in form");
		}	
	});
	} else {
		alert("You need an email id to register");
	}
}
function getvenueid(name, email, postalcode, userid) {
	var usr_name = name;
	var usr_email = email;
	var postcode = postalcode;
	var uid = userid;
    $.ajax({
		  type: 'POST',
		  url: "/cus/subscribe_process",
		  data: {
				post_code : postcode,
				user_id : uid	
		  },
		  beforeSend:function(){
			  // regform_toggle("loading");
			  $('#content_box #reg_form').html('<div class="loading"></div> <br/> <p class="loading_message">Subscribing to Jongleurs</p>');
		  },				  
		  success: function (data){
			 var getvenuedata = eval('(' + data + ')');			 
			 if (getvenuedata.message && getvenuedata.message == "false") {
				//  regform_toggle("active", registrationForm);
				 $('#content_box').html(registrationForm);
				 $('#reg_form .message').html(getvenuedata.sql);
			 } else {
				process_subscription_form(usr_name, usr_email, getvenuedata.sql);
				call_facebook_signin_button(getvenuedata.user_id, getvenuedata.user_role); 
			 }
		  },
		  error: function (){
			alert("Error in form");
		}	
	});
}
function process_subscription_form(name, mail, venueid) {
	var usr_name = name;
	var usr_mail = mail;
	var usr_venueid = venueid;
	
    $.ajax({
		  type: 'POST',
		  url: "/jd/form.php",
		  data: {
			  Contact0FirstName: usr_name,
			  Contact0LastName: usr_name,
			  Contact0Email: usr_mail,
			  venue_id: usr_venueid
		  },
		  beforeSend:function(){
			  $('#content_box #reg_form').html('<div class="loading"></div> <br/> <p class="loading_message">Subscribing to Jongleurs</p>');
		  },				  
		  success: function (response){
			 // That form.php returns nothing
		  },
		  error: function (){
			alert("Error in form");
		}	
	});
}

function call_facebook_signin_button(userid, role) {
	var user_id = userid;
	var user_role = role;
	
	$.ajax({
		type: 'POST',
		url: "/cus/signin_withfacebook",
		data: {
			usr_id: user_id,
			usr_role: user_role
		},
		beforeSend: function() {
			$('#content_box').html('<div class="loading"></div> <br/> <p class="loading_message">Loading Facebook login</p>');
		},
		success: function (response) {
			$('#cboxLoadedContent #content_box').html(response);
			FB.XFBML.parse(document.getElementById('reg_form'));
		},
		error: function() {
			alert("Try again Later");
		}
	});
}

// Facebook Sign in without fbml 
function myfunc(email) {
	FB.login(function(response) {
		if (response.authResponse) {
		console.log('Welcome!  Fetching your information.... ');
		FB.api('/me', function(response) {
			$('#content_box #facebook_button').html("Connecting with facebook account");
			call_facebook_registration(response.email, email);
	   });
	   } else {
	     console.log('User cancelled login or did not fully authorize.');
	   }
	},{scope: 'email, user_birthday, user_hometown, user_location'});
}

function bring_loginbox() {
	call_facebook_signin_button();
}
function bring_register() {
	$('#cboxLoadedContent').load('/cus/register');
}
function normal_user_login() {
	$('#content_box').load('/cus/normal_signin', function() {
		
	});
}
function normal_user_login_registered(userid) {
	$.ajax({
		type: 'POST',
		url: "/cus/new_user_request_unamepass",
		data: {
			user_id: userid,
		},
		beforeSend: function() {
			$('#content_box').html('<div class="loading"></div>');
		},
		success: function (response) {
			$('#content_box').load('cus/normal_signin', function() {
				// Can we add something here...
			});
		},
		error: function() {
			alert("Try again Later");
		}
	});
}
function process_login() {
	window.loginForm = document.getElementById('login_block').innerHTML;
	var user_name = document.login_form.usr_name.value;
	var usr_pass = document.login_form.usr_password.value;
	$.ajax({
		type: 'POST',
		url: "/cus/normal_login",
		data: {
			uname: user_name,
			pass: usr_pass
		},
		beforeSend: function() {
			
		},
		success: function (response) {
			if (response == "true") {
				window.location = "/customer/my_profile";
			} else if (response == "false") {
				alert("Username or Password is invalid");
			}
		},
		error: function() {
			alert("Try again Later");
		}
	});

}

function call_facebook_registration(fac_email, reg_userid) {
	$.ajax({
		type: 'POST',
		url: '/cus/register_with_facebook',
		data: {
			reg_uid: reg_userid,
			facebook_email: fac_email 
		},
		beforeSend: function() {
			$('#content_box #facebook_button').html("Registering or Authenticating with your Facebook account");
		},
		success: function (response) {
			if (response == "Registered User") {
				facebook_onlogin_ready();
			} else if (response == "Unregistered User") {
				alert ("Please register before login");
			} else if (response == "Facebook account already Exist") {
				alert ("Facebook account already exist. Please try different account");
				$('#content_box').html(registrationForm);
			}	
		},
		error: function() {
			alert("Try again later");
		}
	});
}