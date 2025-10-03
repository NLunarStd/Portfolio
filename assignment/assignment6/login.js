window.onload = loginLoad;
function loginLoad(){
	var form = document.getElementById("myLogin");
	form.onsubmit = checkLogin;
}
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const UName = urlParams.get('username');
const UPass = urlParams.get('password');

function checkLogin(){
	
	var username = document.forms["myLogin"]["username"].value;
	var password = document.forms["myLogin"]["password"].value;

	if(username !== UName || password !== UPass){
		alert("Login Failed");
		return false;

	}
	else{
		alert("Login Success");
	}
	return true;
}

			