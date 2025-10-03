window.onload = pageLoad;

function pageLoad(){
var xhr = new XMLHttpRequest();
xhr.open("GET","cloth.json",true);

xhr.onload = function(){
    if(xhr.status == 200)
    {
        var jsdata = JSON.parse(xhr.responseText);
        console.log(jsdata);
        showData(jsdata);
    }	
};
xhr.onerror = function(){
    alert("Error");
}
xhr.send();
}

function showData(data){
	var topdiv = document.getElementById("layer");
    var keys = Object.keys(data);
    for(var i=0; i<keys.length; i++){
        var k = keys[i];
        var name = data[k].name;
        var brand = data[k].brand;
        var price = data[k].price;
        var img = data[k].img;
        
        var div = document.createElement("div");
        div.className = "item";
        var image = document.createElement("img");
        image.src = img;
        image.alt = name;
        var h2 = document.createElement("h2");
        h2.innerHTML = name;
        var p1 = document.createElement("p");
        p1.innerHTML = "Brand: " + brand;
        var p2 = document.createElement("p");
        p2.innerHTML = "Price: " + price + " baht";
        
        div.appendChild(image);
        div.appendChild(h2);
        div.appendChild(p1);
        div.appendChild(p2);
        
        topdiv.replaceChild(div, topdiv.children[i]);
    }
}

