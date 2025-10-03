window.onload = pageLoad;
function pageLoad(){
	var form = document.getElementById("myRegister");
    form.onsubmit = validateForm;
}

function validateForm() {
    
    var fname = document.forms["myRegister"]["firstname"].value;
    var lname = document.forms["myRegister"]["lastname"].value;
    var gender = document.forms["myRegister"]["gender"].value;
    var dateofbirth = document.forms["myRegister"]["bday"].value;
    var email = document.forms["myRegister"]["email"].value;
    var username = document.forms["myRegister"]["username"].value;
    var passwords = document.forms["myRegister"]["password"];
    var password = passwords[0].value;
    var confirmpassword = passwords[1].value;

    if (fname == "" || lname == "" || gender == "" || 
        dateofbirth == "" || email == "" || username == "" ) 
    {
        let errormsg = document.getElementById("errormsg");
        errormsg.innerText = "กรุณากรอกข้อมูลให้ครบทุกช่อง";
        return false;
    }

    if(password !== confirmpassword) {
        let errormsg = document.getElementById("errormsg");
        errormsg.innerText = "Passwords ไม่ตรงกัน";
        return false;
    }
    return true;
}