var titleName = document.getElementById("projectTitle");

titleName.onmouseover=function(){
	titleName.style.color = "red";
	titleName.style.fontSize = "52px";
};

titleName.onmouseout= function(){
	titleName.style.color = "#800000 ";
	titleName.style.fontSize = "48px";
};






var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");
var world={
	edges:[
    	{p1: 0, p2: 1},
    	{p1: 1, p2: 2},
    	{p1: 2, p2: 3},
    	{p1: 3, p2: 0},
	{p1: 0, p2: 1},
    	{p1: 4, p2: 5},
    	{p1: 5, p2: 6},
    	{p1: 6, p2: 7},
	{p1: 7, p2: 4},
    	{p1: 0, p2: 4},
    	{p1: 1, p2: 5},
    	{p1: 2, p2: 6},
	{p1: 3, p2: 7},
	],
	
	surfaces:[
	{p1: 0, p2: 1, p3: 2, c:"red"},
    	{p1: 2, p2: 3, p3: 0, c:"red"},	
	{p1: 1, p2: 5, p3: 6, c:"blue"},
	{p1: 6, p2: 2, p3: 1, c:"blue"},
	{p1: 5, p2: 4, p3: 7, c:"green"},
	{p1: 7, p2: 6, p3: 5, c:"green"},
	{p1: 4, p2: 0, p3: 3, c:"black"},
	{p1: 3, p2: 7, p3: 4, c:"black"},
	{p1: 2, p2: 6, p3: 7, c:"pink"},
	{p1: 7, p2: 3, p3: 2, c:"pink"},
	{p1: 4, p2: 5, p3: 1, c:"yellow"},
	{p1: 1, p2: 0, p3: 4, c:"yellow"}
	
  	],
			
	vertices:$M([
		[300,500,500,300,300,500,500,300],
		[100,100,300,300,100,100,300,300],
		[-200,-200,-200,-200,-400,-400,-400,-400],
		[1,1,1,1,1,1,1,1]
		])
};
var M,t;
var tx=400;
var ty=-100;
var tz=-300;
var xprp=2000;
var yprp=3000;
var zprp=9500;
var zvp=100;
var dp=zprp-zvp;
var a=-1*(xprp-canvas.width/2)/zprp;
var b=-1*(yprp-canvas.height/2)/zprp;
//intensities
var il = 1;
var ia = 0.3;

var lightx = 3000;
var lighty = -1500;
var lightz = -10000;


var Morigintranslation = $M([
		 [1,0,0,-tx],
		 [0,1,0,-ty],
		 [0,0,1,-tz],
		 [0,0,0, 1]
	       	 ])

var Mpositiontranslation = $M([
		 [1,0,0,tx],
		 [0,1,0,ty],
		 [0,0,1,tz],
		 [0,0,0, 1]
	       ])

var Mcentertranslation=$M([
		[1,0,0,canvas.width/2],
		[0,1,0,canvas.height/2],
		[0,0,1,0],
		[0,0,0,1]
		])

var Mscale = $M([
		[1,0,-1*xprp/dp,xprp*zvp/dp],
		[0,1,-1*yprp/dp,yprp*zvp/dp],
		[0,0,1,0],
		[0,0,-1/dp,zprp/dp]
		])

var Mshear = $M([
		[1,0,a,-1*a*zprp],
		[0,1,b,-1*b*zprp],
		[0,0,1,0],
		[0,0,0,1]
		])
		

function Multiply(Multiplier,Multiplicand){
result=Multiplier.x(Multiplicand);
console.log(result);
return result;
}


function sortCord(M){
	for(var i=0;i<8;i++){
	var temp = M.elements[1][i];
		for(var j = 0;j<8;j++){
			if(M.elements[1][j]<temp)
			{
				M.elements[0][i] = M.elements[0][j];
				M.elements[1][i] = M.elements[1][j];
				M.elements[2][i] = M.elements[2][j];
			}
		}

	}
}

function myFunction(a,b,d){
             var R  = a;
             var G =  b;
             var B =  d;
             var L = "(";
             var C = ",";
             var Rp = ")";
             var E = L ;
             var ic = '"';
             var prefix = "RGB";
             var color = ic+prefix + L + R+ C + G + C + B + Rp+ic;
	     return color;
}




function Draw(M){
context.clearRect(0, 0, canvas.width, canvas.height);
var e,vector1,vector2,crossProduct,cameraVector,dp,lightVector;
var cx,cy,cz,dl;
var disl;
var disn;
var nx,ny,nz;
var r,g,b;
for(var i=0;i<world.surfaces.length;i++){

	e=world.surfaces[i]; 

	 cx = (M.elements[0][e.p1] + M.elements[0][e.p2] + M.elements[0][e.p3])/3;
	 cy = (M.elements[1][e.p1] + M.elements[1][e.p2] + M.elements[1][e.p3])/3;
	 cz = (M.elements[02][e.p1] + M.elements[2][e.p2] + M.elements[2][e.p3])/3; 

	lightVector = { dx : lightx-cx, dy:lighty-cy, dz :lightz - cz};
	disl = Math.sqrt(lightVector.dx*lightVector.dx +lightVector.dy*lightVector.dy+lightVector.dz*lightVector.dz);
	lightVector.dx = lightVector.dx/disl;
	lightVector.dy = lightVector.dy/disl;
	lightVector.dz = lightVector.dz/disl;

	
	vector1 = {dx: M.elements[0][e.p2] - M.elements[0][e.p1],
              	       dy: M.elements[1][e.p2] - M.elements[1][e.p1],
                       dz: M.elements[2][e.p2] - M.elements[2][e.p1]};
	vector2 = {dx: M.elements[0][e.p3] - M.elements[0][e.p2],
              	       dy: M.elements[1][e.p3] - M.elements[1][e.p2],
                       dz: M.elements[2][e.p3] - M.elements[2][e.p2]};
	//normalvector
	crossProduct = {dx: vector1.dy*vector2.dz - vector1.dz*vector2.dy,
                            dy: vector1.dz*vector2.dx - vector1.dx*vector2.dz,
                            dz: vector1.dx*vector2.dy - vector1.dy*vector2.dx};
	disn = Math.sqrt( crossProduct.dx*crossProduct.dx + crossProduct.dy*crossProduct.dy +crossProduct.dz*crossProduct.dz);
	nx = crossProduct.dx/disn;
	ny = crossProduct.dy/disn;
	nz = crossProduct.dz/disn;

	//normalvector of eye
	cameraVector =  
  {dx: (0 - (M.elements[0][e.p1] + M.elements[0][e.p2] + M.elements[0][e.p3])/3),
   dy: (0 - (M.elements[1][e.p1] + M.elements[1][e.p2] + M.elements[1][e.p3])/3),
   dz: (zprp - (M.elements[02][e.p1] + M.elements[2][e.p2] + M.elements[2][e.p3])/3)}
	//dotproduct of normalvector and xprp,yprp,zprp
	dp = crossProduct.dx * cameraVector.dx + crossProduct.dy * cameraVector.dy + crossProduct.dz * cameraVector.dz;  
	//dotproduct of normal vector and light source 
	dl = nx * lightVector.dx + ny* lightVector.dy + nz* lightVector.dz; 
	//alert(dl);
	dl = ia + il*dl;
	r = Math.round(255*dl);
	g = Math.round(5*dl);
	b = Math.round(1*dl);

if(dp < 0){ 	

	context.beginPath();
	context.moveTo(M.elements[0][e.p1]/M.elements[3][e.p1],M.elements[1][e.p1]/M.elements[3][e.p1]);
   	context.lineTo(M.elements[0][e.p2]/M.elements[3][e.p2],M.elements[1][e.p2]/M.elements[3][e.p2]);
	context.lineTo(M.elements[0][e.p3]/M.elements[3][e.p3],M.elements[1][e.p3]/M.elements[3][e.p3]);
	context.lineTo(M.elements[0][e.p1]/M.elements[3][e.p1],M.elements[1][e.p1]/M.elements[3][e.p1]);
	context.strokeStyle=eval( myFunction(r,g,b));
	context.stroke();	
	context.fillStyle =eval( myFunction(r,g,b)); 
	context.fill();
	
	}
}
} 

function display(){
if(t<360){
var Myrotation = $M([
		[Math.cos(t*Math.PI/180),0,Math.sin(t*Math.PI/180),0],
		[0,1,0,0],
		[-1*Math.sin(t*Math.PI/180),0,Math.cos(t*Math.PI/180),0],
		[0,0,0,1]
		])
M=Multiply(Morigintranslation,world.vertices);
M=Multiply(Myrotation,M);
M=Multiply(Mpositiontranslation,M);
//M=Multiply(Mshear,M);
M=Multiply(Mscale,M);
Draw(M);
t++;
}
else{t=0}
}
setInterval(display,100);
