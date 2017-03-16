
// 新建
var clear = document.querySelector("#clear");
var box = document.querySelector(".can-box");
var uls = document.querySelector(".nav>ul");

clear.onclick = function (){
	var lis = document.createElement("li")
	var cans = document.createElement("canvas")
	cans.setAttribute("class","can")
	uls.appendChild(lis)
	box.appendChild(cans)
	var lise = document.querySelectorAll(".nav>ul>li");
	var can = document.querySelectorAll(".can");
	for (var i = 0; i < can.length; i++) {
		can[i].width = window.innerWidth-150;
 		can[i].height = 600;
		can[i].removeAttribute("id")
	};
	can[can.length-1].setAttribute("id","can")
	for (var i = 0; i < lise.length; i++) {
		lis.innerHTML = "画布"+(i+1);
		lise[i].style.background = "#e6e6e6"
		lise[i].index=i
		lise[i].onclick = function () {
			for (var k = 0; k < lise.length; k++) {
				lise[k].style.background = "#e6e6e6"
			};
			for (var j = 0; j < can.length; j++) {
				can[j].removeAttribute("id")
			};
			this.style.background = "#666";
			can[this.index].setAttribute("id","can")
		}
		lise[lise.length-1].style.background = "#666";
	};
	var cans = document.querySelector("#can");

	play(can)
}
	var nav = document.querySelector(".nav");
	nav.style.width = window.innerWidth-150+"px";

function play(can){
	can.width = window.innerWidth-150;
 	can.height = 600;
	var disk = document.querySelector(".disk");
	for (var i = 0; i < can.length; i++) {
		var o = can[i].getContext("2d");
		var b = new palette(o,can[i],disk);
	};

	console.log(b)
	b.drawing();





	var che = document.querySelector("#che");
	var button = document.querySelectorAll("button");

	for (var i = 0; i < button.length; i++) {
		button[i].addEventListener(onclick,function () {
			for (var k = 0; k < button.length; k++) {
				button[k].style.boxShadow = "0 0 10px #ccc"
				button[k].style.background = "#fff"
			};
			this.style.boxShadow = "0 0 10px eee"
			this.style.background = "#eee"

		})
	};


	che.onclick = function () {
		b.history.pop();
		if (b.history.length == 0) {
			b.history.pop();
			return ; 
		};
		console.log(b.history)
		b.cobj.putImageData(b.history[b.history.length-1],0,0,0,0,can.width,can.height)
	}
	// 三角形
	var triangle = document.querySelector("#triangle");
	triangle.onclick = function (){
		b.type = "triangle"
	}
	// 直线
	var line = document.querySelector("#line");
	line.onclick = function (){
		b.type = "line"
	}
	// 铅笔
	var pencil = document.querySelector("#pencil");
	pencil.onclick = function (){
		b.type = "pencil"
	}
	// 矩形
	var rect = document.querySelector("#rect");
	rect.onclick = function (){
		b.type = "rect"
	}
	// 圆形
	var arc = document.querySelector("#arc");
	arc.onclick = function (){
		b.type = "arc"
	}
	// 多角形
	var angle = document.querySelector("#angle");
	angle.onclick = function (){
		b.type = "angle";
		var edag = prompt("请输入选择的边数")
		b.angleNum=edag;
	}
	// 多边形
	var polygon = document.querySelector("#polygon");
	polygon.onclick = function (){
		b.type = "polygon"
			var edag = prompt("请输入选择的边数")
		b.polygonNum=edag;
	}

	// 全屏
	var grow = document.querySelector("#grow");
	var left = document.querySelector(".left");
	var body = document.querySelector("body");
	grow.onclick = function (){
		var nav = document.querySelector(".nav");

		nav.style.width = window.innerWidth-120+"px";
		nav.style.left= "100px";
		can.height = window.innerHeight-70
		can.width = window.innerWidth-120;
		can.style.left = "100px";
		left.style.height = window.innerHeight-25+"px";
		left.style.width = "70px";
		console.log(left)
		// launchFullScreen(body)
	}
	// 缩回原来
	var shlink = document.querySelector("#shlink");
	shlink.onclick = function (){
		can.height = 600
		can.width = window.innerWidth-150;
		can.style.left = "140px";
		left.style.height = "645px";
		left.style.width = "110px";

	}
	var strokes = document.querySelector("#strokeS")
	var fills = document.querySelector("#fillS")
	// 选择填充、描边颜色
	window.onmousedown = function () {
		var colos = strokes.value;
		var colos1 = fills.value;
		b.cobj.strokeStyle = colos;
		b.cobj.fillStyle = colos1
	}
	// 选择是否描边
	var stroke = document.querySelector("#stroke");
	stroke.onclick = function (){
		b.style = "stroke";
			// alert(1)
	}
	// 选择是否填充
	var fill = document.querySelector("#fill");
	fill.onclick = function (){
		b.style = "fill";

	}
	// 选择边框宽度
	var width = document.querySelector("#width");
	width.onclick = function (){
		var widths = prompt("请输入边框宽度")  
		b.cobj.lineWidth = widths
	}
	// 选择填充、描边一起进行
	var quan = document.querySelector("#quan");
	quan.onclick = function (){
		b.style = "";
	}

	var text = document.querySelector("#text");
	text.onclick = function (){
		b.type = 'text';
		b.text();
	}

	var eraser = document.querySelector("#eraser");
	eraser.onclick = function (){
		b.type = 'eraser';
		b.eraser();
	}
	var save = document.querySelector("#save");
	save.onclick = function (){
		b.save();
	}
}

	









