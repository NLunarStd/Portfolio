window.onload = pageLoad;

function pageLoad(){
	var startBtn = document.getElementById("start");
	startBtn.onclick = startGame;

}

function startGame(){
	var input = document.getElementById("numbox").value;
	if (input < 1){
		alert("กรุณาใส่จำนวนที่มากกว่า 0");
		return;
	}
	var isNumber = isNaN(input);
	if (isNumber){
		alert("กรุณาใส่จำนวนเป็นตัวเลข");
		return;
	}
	alert("Ready");
	addBox();
	timeStart();
}

function timeStart(){
	var TIMER_TICK = 1000;
	var timer = null;
	var min = 0.1; // 0.5 minute
	var second = min*60; 
	var x = document.getElementById('clock');
	//setting timer using setInterval function
	timer = setInterval(timeCount, TIMER_TICK);
	
	function timeCount(){
		var allbox = document.querySelectorAll("#layer div");
		// จัดการเกี่ยวกับเวลา เช่น ถ้ายังมีกล่องเหลืออยู่ เวลาจะลดลงเรื่อยๆ 
		// ถ้าไม่มีกล่องเหลือแล้ว และเวลายังเหลืออยู่จะขึ้นว่า You win!
		// ถ้าเวลาหมด แต่ยังมีกล่องเหลืออยู่ จะบอกว่า Game over และทำการ clear screen

		if(allbox.length == 0 && second > 0){
			alert("You win!");
			clearInterval(timer);
		}else if(allbox.length > 0 && second == 0){
			alert("Game over");
			clearInterval(timer);
			clearScreen();
		}
		else if(allbox.length > 0 && second > 0){
			second --;
			x.innerHTML = second + "  วินาที";
		}
	}
}

function addBox(){
	// สร้างกล่องตาม input ที่เราใส่ 
	var numbox = document.getElementById("numbox").value;
	var gameLayer = document.getElementById("layer");
	var colorDrop = document.getElementById("color");
	for (var i =0; i < numbox ;i++){
		var tempbox = document.createElement("div");
		var classBoxName = colorDrop.value;
		tempbox.classList.toggle("square");
		tempbox.classList.toggle(classBoxName);
		tempbox.id = "box"+i;
		tempbox.style.left = Math.random() * (500 - 25) + "px";
		tempbox.style.top = Math.random() * (500 - 25) + "px";
		
		//add element to HTML node
		gameLayer.appendChild(tempbox);
		bindBox(tempbox);
	}
}

function bindBox(box){
	//เมื่อกดแล้ว กล่องจะหายไป
	box.onclick = removeMe;
	function removeMe(){
	if(box.parentNode.contains(box))
		{
			box.parentNode.removeChild(box);	
		}
	
	}
}

function clearScreen(){
	// ทำการลบ node ของกล่องทั้งหมด ออกจาก หน้าจอ
	var allbox = document.querySelectorAll("#layer div");
	if (allbox.length == 0) return;
	//delete all  div
	for (var i=0;i<allbox.length;i++){
		allbox[i].parentNode.removeChild(allbox[i]);
	}
}




