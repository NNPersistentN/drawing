



function palette(cobj,canvas,disk){
	this.cobj = cobj;
	this.canvas = canvas;
	this.disk = disk;
	this.style = "stroke";
	this.type = "line";
	this.history = [];
	this.polygonNum = 5;
	this.angleNum = 5;
	this.lineWidth = 1;
}
palette.prototype.init = function () {
	this.cobj.lineWidth = this.lineWidth;
	this.cobj.fillColor = this.fillColor;
	this.cobj.strokrColor = this.strokrColor;
}
palette.prototype.drawing = function(){
	var that = this;
	that.disk.onmousedown = function (e) {
		var dx = e.offsetX;
		var dy = e.offsetY;
		if (that.type == "text") {
			return ;
		};
		that.cobj.moveTo(dx,dy)
		if (that.type == "pencil") {
			that.disk.onmousemove = function (e) {
				var wx = e.offsetX;
				var wy = e.offsetY;
				that.cobj.lineTo(wx,wy)
				that.cobj.stroke()
			}
		}else{
			that.disk.onmousemove = function (e) {
				var wx = e.offsetX;
				var wy = e.offsetY;
				that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height);
				if (that.history.length >=1) {
					that.cobj.putImageData(that.history[that.history.length-1],0,0,0,0,that.canvas.width,that.canvas.height)	
				};
				that[that.type](dx,dy,wx,wy);
			}
		};
		
		that.disk.onmouseup = function (){
			that.history.push(that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height))
			that.disk.onmousemove = null;
			that.disk.onmouseup = null;
		}
	}
};


palette.prototype.line = function(x1,y1,x2,y2){
	this.cobj.beginPath();
	this.cobj.moveTo(x1+.5,y1+.5);
	this.cobj.lineTo(x2,y2)
	this.cobj.closePath();
	this.cobj["stroke"]();
};


palette.prototype.rect = function (x1,y1,x2,y2) {
	this.cobj.beginPath();
	this.cobj.rect(x1+.5,y1+.5,x2-x1,y2-y1);
	this.cobj.closePath();
	if (this.style == "") {
		this.cobj["stroke"]();
		this.cobj["fill"]();
	}else{
		this.cobj[this.style]();
	};
};
palette.prototype.triangle = function (x1,y1,x2,y2) {
	this.cobj.beginPath();
	this.cobj.moveTo(x1,y1);
	this.cobj.lineTo(x2,y2);
	this.cobj.lineTo(x2,y2-y1);
	this.cobj.closePath();
	if (this.style == "") {
		this.cobj["stroke"]();
		this.cobj["fill"]();
	}else{
		this.cobj[this.style]();
	};
	
};
palette.prototype.arc = function (x1,y1,x2,y2) {
	this.cobj.beginPath()
	this.cobj.arc(x1+.5,y1+.5,Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)),-Math.PI/2,Math.PI*2+90,0)
	this.cobj.closePath()
	if (this.style == "") {
		this.cobj["stroke"]();
		this.cobj["fill"]();
	}else{
		this.cobj[this.style]();
	};
};

palette.prototype.polygon = function (x1,y1,x2,y2) {
	var r = Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))
	var ag = 360/this.polygonNum;
	this.cobj.beginPath();
	for (var i = 0; i < this.polygonNum; i++) {
		this.cobj.lineTo(x1+Math.cos(i*ag*Math.PI/180)*r,y1+Math.sin(i*ag*Math.PI/180)*r)
	};
	this.cobj.closePath();
	if (this.style == "") {
		this.cobj["stroke"]();
		this.cobj["fill"]();
	}else{
		this.cobj[this.style]();
	};
}


palette.prototype.angle = function (x1,y1,x2,y2) {
	var r =Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))
	var r1 = r/3;
	var ag = 360/(this.angleNum*2)
	this.cobj.beginPath();
	for (var i = 0; i < this.angleNum*2; i++) {
		console.log(i)
		if (i %2== 0) {
			this.cobj.lineTo(x1+Math.cos(i*ag*Math.PI/180)*r,y1+Math.sin(i*ag*Math.PI/180)*r);
		}else{
			this.cobj.lineTo(x1+Math.cos(i*ag*Math.PI/180)*r1,y1+Math.sin(i*ag*Math.PI/180)*r1)
		};
	};

	this.cobj.closePath();
	if (this.style == "") {
		this.cobj["stroke"]();
		this.cobj["fill"]();
	}else{
		this.cobj[this.style]();
	};
}

palette.prototype.text = function () {
	var that = this;
		var box = document.querySelector(".can-box")
		var tx = 0;
		var ty = 0; 
	that.canvas.ondblclick = function (e){
		tx = e.offsetX;
		ty = e.offsetY;
		var div = document.createElement("div")
		div.setAttribute("contenteditable","true")
		div.style.cssText = "line-height:30px;outline:none;position:absolute;z-index:999;border:1px dotted #ccc;min-width:200px;min-height:30px;left:"+tx+"px;top:"+ty+"px;";
		box.appendChild(div)		
		div.onmousedown = function (e) {
			var wx = e.clientX-tx;
			var wy = e.clientY-ty;
			div.onmousemove = function (e) {
				var mx = e.clientX;
				var my = e.clientY;
				tx = mx-wx;
				ty = my-wy
				div.style.left = tx+"px";
				div.style.top = ty+"px";
				console.log(mx-wx)
				console.log(my-wy)
		console.dir(tx)
			}
			div.onmouseup = function () {
				div.onmousemove = null;
			}
		}
		div.onblur = function () {
			var t = div.innerHTML;
			box.removeChild(this)
			that.cobj.font = "16px,Georgia";
			that.cobj.textBaesline = "bottom";
			that.cobj.fillText(t,tx,ty)
			console.log(t)
			console.dir(that.cobj)
			that.history.push(that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height))
		}

	}

}
palette.prototype.eraser = function (e) {
	var that = this;
	var eraser = document.querySelector(".eraser");
	var box = document.querySelector(".can-box");
	var div = document.createElement("div");
	div.style.cssText = "box-shadow:0 0 10px #eee;width:30px;min-height:30px;border-radius:50px;border:1px solid #ccc;z-index:9;position:absolute;" 
	div.setAttribute("id","olo")
	box.appendChild(div)
	var w = div.offsetWidth/2;
	var h = div.offsetHeight/2;
	that.disk.onmousemove = function (e) {
		var x = e.offsetX;
		var y = e.offsetY;
		div.style.left = x-w+"px";
		div.style.top = y-h+"px";
		console.log(h)
	}	
	that.disk.onmousedown = function (e) {
		
		that.disk.onmousemove = function (e){
			var wx = e.offsetX;
			var wy = e.offsetY;
			div.style.left = wx-w+"px";
			div.style.top = wy-h+"px";
			that.cobj.clearRect(wx-w,wy-h,div.offsetWidth,div.offsetHeight)
		}
		that.disk.onmouseup = function (){
			that.history.push(that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height))
			that.disk.onmousemove = null;
			box.removeChild(div)
		}
	}
}

palette.prototype.save = function () {
	var str = this.canvas.toDataURL(image/png,encoderOptions)
	location.href = canvas.toDataURL(type,encoderOptions),replace("data:image/png","data:image/octet/stream");

}
