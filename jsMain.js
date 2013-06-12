var titleName = document.getElementById("projectTitle");

titleName.onmouseover=function(){
	titleName.style.color = "red";
	titleName.style.fontSize = "52px";
};

titleName.onmouseout= function(){
	titleName.style.color = "#800000 ";
	titleName.style.fontSize = "48px";
};

var zvp  = 0;
var zprp = 20000;
var dp   = zprp-zvp;
var tx = 300;
var ty = 300;
var tz =-300;
x =0;
var secondhandangleprev=0;
var minutehandangleprev=0;
var hourhandangleprev=0;

var persMat = [
		[1,0,0,0],
		[0,1,0,0],	
		[0,0,-1*zvp/dp,zvp*(zprp/dp)],
		[0,0,-1/dp,zprp/dp]
	      ];
var toOrigin = [
		 [1,0,0,-tx],
		 [0,1,0,-ty],
		 [0,0,1,-tz],
		 [0,0,0, 1]
	       ]

var toPosition = [
		 [1,0,0,tx],
		 [0,1,0,ty],
		 [0,0,1,tz],
		 [0,0,0, 1]
	       ]
//Rotation matrix about Y-axix



var yRotate = [
		 [Math.cos(x*Math.PI/180),0,Math.sin(x*Math.PI/180),0],
		 [0,1,0,0],
		 [-Math.sin(x*Math.PI/180),0,Math.cos(x*Math.PI/180),0],
		 [0,0,0, 1]
	       ] 





var cord1 = [
		[200],
		[200],
		[-200],
		[1]
	    ];

var cord2 = [
		[400],
		[200],
		[-200],
		[1]
	    ];

var cord3 = [
		[400],
		[400],
		[-200],
		[1]
	    ];

var cord4 = [
		[200],
		[400],
		[-200],
		[1]
	    ];

var cord5 = [
		[200],
		[200],
		[-400],
		[1]
	    ];

var cord6 = [
		[400],
		[200],
		[-400],
		[1]
	    ];

var cord7 = [
		[400],
		[400],
		[-400],
		[1]
	    ];

var cord8 = [
		[200],
		[400],
		[-400],
		[1]
	    ];

var centre=	[
			[297],
			[297],
			[-200],
			[1]
		];
var rad=94;
var staticpoint=[[297],[200],[-200],[1]];
var updatedpoint=[[297],[200],[-200],[1]];

function multiplyMatrix(m1, m2) {
	var result = [];
	var aRows = m1.length;
	var aCols = m1[0].length;
	var bRows = m2.length;
	var bCols = m2[0].length;
	if (bCols == undefined)
		bCols = 1;
	if (aCols == undefined)
	aCols = 1;

	for(var i = 0; i < aRows; i++) {
		result[i] = [];
		for(var j = 0; j < bCols; j++) {
		var sum = 0;
		var x = [];
			for(var k = 0; k < aCols; k++) {
				sum += m1[i][k] * m2[k][j];
			}
		x.push(sum);
		}
	result[i].push(x);
	}
return result;
}


//rect_lines();

function draw_Rect( cord1,cor2, cord3, cord4 ,color){

   var c1 = document.getElementById("mainCanvas");
   var rContext = c1.getContext("2d");
   rContext.beginPath();
   rContext.moveTo(cord1[0][0]/cord1[3][0],cord1[1][0]/cord1[3][0]);
   rContext.lineTo(cord2[0][0]/cord2[3][0],cord2[1][0]/cord2[3][0]);
   rContext.lineTo(cord3[0][0]/cord3[3][0],cord3[1][0]/cord3[3][0]);
   rContext.lineTo(cord4[0][0]/cord4[3][0],cord4[1][0]/cord4[3][0]);
   rContext.lineTo(cord1[0][0]/cord1[3][0],cord1[1][0]/cord1[3][0]);
   rContext.closePath();
   rContext.strokeStyle= 'white';
   rContext.stroke();
   //rContext.fillStyle = color;
   //rContext.fill();
   
}

function draw_Rect1( cord1,cor2, cord3, cord4,cord5,cord6,cord7,cord8){

   var c1 = document.getElementById("mainCanvas");
   var rContext = c1.getContext("2d");
   //Front surface
   rContext.beginPath();
   rContext.moveTo(cord1[0][0]/cord1[3][0],cord1[1][0]/cord1[3][0]);
   rContext.lineTo(cord2[0][0]/cord2[3][0],cord2[1][0]/cord2[3][0]);

   rContext.moveTo(cord2[0][0]/cord2[3][0],cord2[1][0]/cord2[3][0]);
   rContext.lineTo(cord3[0][0]/cord3[3][0],cord3[1][0]/cord3[3][0]);

   rContext.moveTo(cord3[0][0]/cord3[3][0],cord3[1][0]/cord3[3][0]);	
   rContext.lineTo(cord4[0][0]/cord4[3][0],cord4[1][0]/cord4[3][0]);
   
   rContext.moveTo(cord4[0][0]/cord4[3][0],cord4[1][0]/cord4[3][0]);
   rContext.lineTo(cord1[0][0]/cord1[3][0],cord1[1][0]/cord1[3][0]);
   

   //Back surface
  

   rContext.moveTo(cord5[0][0]/cord5[3][0],cord5[1][0]/cord5[3][0]);
   rContext.lineTo(cord6[0][0]/cord6[3][0],cord6[1][0]/cord6[3][0]);

  rContext.moveTo(cord6[0][0]/cord6[3][0],cord6[1][0]/cord6[3][0]);	
  rContext.lineTo(cord7[0][0]/cord7[3][0],cord7[1][0]/cord7[3][0]);
   
   rContext.moveTo(cord7[0][0]/cord7[3][0],cord7[1][0]/cord7[3][0]);
   rContext.lineTo(cord8[0][0]/cord8[3][0],cord8[1][0]/cord8[3][0]);
   
   rContext.moveTo(cord8[0][0]/cord8[3][0],cord8[1][0]/cord8[3][0]);
   rContext.lineTo(cord5[0][0]/cord5[3][0],cord5[1][0]/cord5[3][0]);
  //side line
   rContext.moveTo(cord2[0][0]/cord2[3][0],cord2[1][0]/cord2[3][0]);
   rContext.lineTo(cord6[0][0]/cord6[3][0],cord6[1][0]/cord6[3][0]);
   
   rContext.moveTo(cord3[0][0]/cord3[3][0],cord3[1][0]/cord3[3][0]);
   rContext.lineTo(cord7[0][0]/cord7[3][0],cord7[1][0]/cord7[3][0]);

  
   rContext.moveTo(cord1[0][0]/cord1[3][0],cord1[1][0]/cord1[3][0]);
   rContext.lineTo(cord5[0][0]/cord5[3][0],cord5[1][0]/cord5[3][0]);
   
   rContext.moveTo(cord4[0][0]/cord4[3][0],cord4[1][0]/cord4[3][0]);
   rContext.lineTo(cord8[0][0]/cord8[3][0],cord8[1][0]/cord8[3][0]);



  
   rContext.strokeStyle= 'white';
   rContext.stroke();
  
   
}




cord1 = multiplyMatrix(toOrigin,cord1);
cord2 = multiplyMatrix(toOrigin,cord2);
cord3 = multiplyMatrix(toOrigin,cord3);
cord4 = multiplyMatrix(toOrigin,cord4);
cord5 = multiplyMatrix(toOrigin,cord5);
cord6 = multiplyMatrix(toOrigin,cord6);
cord7 = multiplyMatrix(toOrigin,cord7);
cord8 = multiplyMatrix(toOrigin,cord8);

cord1 = multiplyMatrix(yRotate,cord1);
cord2 = multiplyMatrix(yRotate,cord2);
cord3 = multiplyMatrix(yRotate,cord3);
cord4 = multiplyMatrix(yRotate,cord4);
cord5 = multiplyMatrix(yRotate,cord5);
cord6 = multiplyMatrix(yRotate,cord6);
cord7 = multiplyMatrix(yRotate,cord7);
cord8 = multiplyMatrix(yRotate,cord8);

cord1 = multiplyMatrix(toPosition,cord1);
cord2 = multiplyMatrix(toPosition,cord2);
cord3 = multiplyMatrix(toPosition,cord3);
cord4 = multiplyMatrix(toPosition,cord4);
cord5 = multiplyMatrix(toPosition,cord5);
cord6 = multiplyMatrix(toPosition,cord6);
cord7 = multiplyMatrix(toPosition,cord7);
cord8 = multiplyMatrix(toPosition,cord8);



var a = multiplyMatrix(persMat,cord1);
var b = multiplyMatrix(persMat,cord2);
var c = multiplyMatrix(persMat,cord3);
var d = multiplyMatrix(persMat,cord4);
var e = multiplyMatrix(persMat,cord5);
var f = multiplyMatrix(persMat,cord6);
var g = multiplyMatrix(persMat,cord7);
var h = multiplyMatrix(persMat,cord8);
//alert(a.join('\n'));
//alert(b.join('\n'));
//alert(c.join('\n'));
//alert(d.join('\n'));
//alert(e.join('\n'));
//alert(f.join('\n'));
//alert(g.join('\n'));
//alert(h.join('\n'));

//draw_Rect(d,h,g,c,'white');
//draw_Rect(e,f,g,h,'pink');
//draw_Rect(a,e,h,d,'yellow');
//draw_Rect(b,f,g,c,'blue');


//draw_Rect(a,b,f,e,'green');
//draw_Rect(a,b,c,d,'red');
//draw_Rect1(a,b,c,d);
//draw_Rect1(e,f,g,h);
//draw_Rect1(h,g,c,d);

/*alert(a[0][0]/a[3][0]);
alert(a[1][0]/a[3][0]);
alert(b[0][0]/b[3][0]);
alert(b[1][0]/b[3][0]);
alert(c[0][0]/c[3][0]);
alert(c[1][0]/c[3][0]);
alert(d[0][0]/d[3][0]);
alert(d[1][0]/d[3][0]);

alert(e[0][0]/e[3][0]);
alert(e[1][0]/e[3][0]);
alert(f[0][0]/f[3][0]);
alert(f[1][0]/f[3][0])
alert(g[0][0]/g[3][0]);
alert(g[1][0]/g[3][0])
alert(h[0][0]/h[3][0]);
alert(h[1][0]/h[3][0])*/

draw_Rect1(a,b,c,d,e,f,g,h);

/*var element = document.getElementById("mainCanvas");
var c = element.getContext("2d");

function setPixel(x, y) {
	
	c.beginPath();
	c.moveTo(x,y);
	c.lineTo(x,y);
	c.strokeStyle='white';
	c.stroke();
	
}

for(var i=0; i<=20;i++)
{
	for (var j=0;j<=20;j++)
	{
		setPixel(20+i,20+j);
	}
}
*/



function drawpix(x,y,width){
var c2 = document.getElementById("mainCanvas");
   var rContext1 = c2.getContext("2d");

   rContext1.beginPath();
   rContext1.moveTo(x,y);
   rContext1.lineTo(x+width,y+width);
   rContext1.closePath();
   rContext1.strokeStyle= 'white';
   rContext1.stroke();
   

}

//drawpix(10,10);


function drawcirc(xcenter,ycenter,radius){
	var x=0;
	var y=radius;
	var p=1-radius;
	
	circleplotpoints(xcenter,ycenter,x,y);
	
	while(x<y)
	{
		x++;
		if(p<0)
		{
			p+=2*x+1;
		}	
		else
		{
			y--;
			p+=2*(x-y)+1;
		}
		circleplotpoints(xcenter,ycenter,x,y);
	}
}

function circleplotpoints(xcenter,ycenter, x, y){
	drawpix(xcenter+x,ycenter+y,2);	
	drawpix(xcenter+x,ycenter-y,2);	
	drawpix(xcenter-x,ycenter+y,2);	
	drawpix(xcenter-x,ycenter-y,2);	
	drawpix(xcenter+y,ycenter+x,2);	
	drawpix(xcenter+y,ycenter-x,2);	
	drawpix(xcenter-y,ycenter+x,2);	
	drawpix(xcenter-y,ycenter-x,2);	
}




//from the analog clock
function drawline(xa,ya,xb,yb){
	var dx=Math.abs(xa-xb);
	var dy=Math.abs(ya-yb);
	var p=2*dy-dx;
	var twody=2*dy;
	var twodydx=2*(dy-dx);
	var x,y,xend;

	if(xa>xb)
	{
		x=xb;
		y=yb;
		xend=xa;
	}
	else
	{
		x=xa;
		y=ya;
		xend=xb;
	}
	drawpix(x,y);
	while(x<xend)
	{
		x++;
		if(p<0)
		{
			p+=twody;
		}
		else
		{
			y++;
			p+=twodydx;
		}
		drawpix(x,y);
	}
}

drawcirc(centre[0][0],centre[1][0],rad);
//for(var i=rad;i>=0;i=i-0.25){
//drawcirc(centre[0][0],centre[1][0],i);
//}


//drawaline(297,200,297,297);
//drawaline(updatedpoint[0][0],updatedpoint[1][0]-rad+5,centre[0][0],centre[1][0]);

		function updateTime() {
			var now=new Date();
			var hours = now.getHours();
			var minutes = now.getMinutes();
			var seconds = now.getSeconds();
    		calculateHandPositions(centre[0][0],centre[1][0], hours, minutes, seconds);			
		}
		function calculateHandPositions(posX,posY,h,m,s) {	
			var secondHandLength = 85;
			var secondHandAngle = 2*Math.PI* s/60;
			for(var j=0;j<50;j++){
			drawHand(posX,posY,secondHandLength,secondhandangleprev,"#000",1);}
			drawHand(posX,posY,secondHandLength,secondHandAngle,"#fff",1);
			secondhandangleprev=secondHandAngle;
		
			var minuteHandLength = 60;
			var minuteHandAngle = 2*Math.PI* m/60;
			for(var j=0;j<30;j++){
			drawHand(posX,posY,minuteHandLength,minutehandangleprev,"#000",2);}
			drawHand(posX,posY,minuteHandLength,minuteHandAngle,"#007",2);
			minutehandangleprev=minuteHandAngle;
	
			var hourHandLength = 45;
			var hourHandAngle = (2*Math.PI*h/12) + ((2*Math.PI*m)/(12*60));
			for(var j=0;j<30;j++){
			drawHand(posX,posY,hourHandLength,hourhandangleprev,"#000",4);}
			drawHand(posX,posY,hourHandLength,hourHandAngle,"#360",4);
			hourhandangleprev=hourHandAngle;
		}
		function drawHand(posX,posY, handLength, handAngle, color, width) {
			var c2 = document.getElementById("mainCanvas");
			var Context = c2.getContext("2d");
			//clearRect();
			context.beginPath();
			context.moveTo(posX,posY);
			var x= posX + (handLength*Math.sin(handAngle));
			var y= posY - (handLength*Math.cos(handAngle));
			context.lineTo(x,y);
			context.closePath();
			context.strokeStyle = color;
			context.lineWidth = width;
			context.stroke();
		}
		function drawClockDial(posX, posY, radius, color) {
		
			//circle(posX,posY,radius,color);
			//circle(posX,posY,10,"#000");
	
			for(var i=1;i<13;i++) {
				var dialAngle = (2*Math.PI*i)/12;
				var x= posX + ((radius-30)*Math.sin(dialAngle));
				var y= posY - ((radius-30)*Math.cos(dialAngle));
				circle(x,y,3,"#f80");
			}
		}
		function circle(x,y,r,color) {
			var c2 = document.getElementById("mainCanvas");
			var context = c2.getContext("2d");
			context.clearRect(0,0,c2.height,c2.widht);
			context.strokeStyle = "#f80";
    		context.fillStyle = color;
    		context.beginPath();
    		context.arc(x,y,r,0,Math.PI*2,false);
    		context.closePath();
    		context.fill();
		}
		
drawClockDial(centre[0][0],centre[1][0], rad/100*120, "#f80");
		function clearRect(context) {
		
			context.clearRect(0,0,500,500);
			reDraw(context);
		}
function sec(){

	var now=new Date();
	var seconds=now.getSeconds();
	var angle=(Math.PI/30)*seconds;
var zRotate = [
		 [Math.cos(angle),-Math.sin(angle),0,0],
		 [Math.sin(angle),Math.cos(angle),0,0],
		 [0,0,1,0],
		 [0,0,0,1]
	       ];
/*var zRotate = [
		 [Math.cos(angle),-Math.sin(angle),0,0],
		 [0,1,0,0],
		 [Math.sin(angle),0,Math.cos(angle),0],
		
		 [0,0,0,1]
	       ];*/
		   
for (var i=0;i<4;i++){		   
toOrigin[i][3]=centre[i][0];
}
for (var i=0;i<3;i++){		   
toPosition[i][3]=-centre[i][0];
}
for (var i=3;i<4;i++){		   
toPosition[i][3]=centre[i][0];
}
var movingpoint=staticpoint;

movingpoint = multiplyMatrix(toOrigin,movingpoint);
movingpoint = multiplyMatrix(zRotate,movingpoint);
movingpoint = multiplyMatrix(toPosition,movingpoint);		
updatedpoint=movingpoint;
drawaline(centre[0][0],centre[1][0],updatedpoint[0][0],updatedpoint[1][0]);

}

function clearline(x,y,x1,y1){
	var c2 = document.getElementById("mainCanvas");
   var rContext1 = c2.getContext("2d");
   rContext1.beginPath();
   rContext1.moveTo(x,y);
   rContext1.lineTo(x1,y1);
   rContext1.closePath();
   rContext1.strokeStyle= 'black';
   rContext1.stroke();
}
function drawaline(x,y,x1,y1){
	var c2 = document.getElementById("mainCanvas");
   var rContext1 = c2.getContext("2d");
   rContext1.beginPath();
   rContext1.moveTo(x,y);
   rContext1.lineTo(x1,y1);
   rContext1.closePath();
   rContext1.strokeStyle= 'white';
   rContext1.stroke();
   

}

//setInterval("clearline(297,200,297,297)",1000);

var drawingCanvas = document.getElementById('mainCanvas');
if(drawingCanvas.getContext) {
	/* Initaliase a 2-dimensional drawing context */
	var context = drawingCanvas.getContext('2d');
//	setInterval("clearline(297,200,297,297)",1000);
	setInterval("update()",1000);
	
	//setInterval("clearRect(context)",500);
}

function update(){
//drawaline(updatedpoint[0][0],updatedpoint[1][0]-rad+5,centre[0][0],centre[1][0]);
//clearline(updatedpoint[0][0],updatedpoint[1][0]-rad+5,centre[0][0],centre[1][0]);
//sec();
updateTime();
}

