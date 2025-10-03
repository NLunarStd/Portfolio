var index = 0;
//alert(name); // shows a popup box on the screen web
console.log(typeof(level));


window.onload = Onload;


function Onload(){
    console.log("Page is loaded");
    document.getElementById("top").innerHTML = "Welcome to the Forumm";
}


function postFunction(){
    index ++;
    if(index > 3){
        index = 0;
        return;
    }
    else if(index == 1){
    document.getElementById("topic").innerHTML =document.getElementById("message").value;
    }
    else if(index == 2){
    
    document.getElementById("reply1").innerHTML =document.getElementById("message").value;
    
    }
    else if(index == 3){
    document.getElementById("reply2").innerHTML =document.getElementById("message").value;

        
    }
}

function clearFunction(){
    document.getElementById("topic").innerHTML = "";
    document.getElementById("reply1").innerHTML = "";
    document.getElementById("reply2").innerHTML = "";
    document.getElementById("message").value = "";

}