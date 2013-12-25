var context = new webkitAudioContext();
var buffer;
var grains = []; //array for the grains for memory management
var graincount = 0; // to iterate in the array with setInterval
var w,h;
var data;
var drawingdata = []; //an array that keeps the data

//the grain class
function grain(buffer){

	this.now = context.currentTime;
	this.source = context.createBufferSource();
	this.source.buffer = buffer;
	this.gain = context.createGain();
	this.gain.connect(context.destination);
	var that = this;
	//connections
	this.source.connect(this.gain);
	this.gain.connect(context.destination);
	//envelope
	this.source.start(this.now,Math.random(),1.2); //parameters (when,offset,duration)
	this.gain.gain.setValueAtTime(0.0, this.now);
	this.gain.gain.linearRampToValueAtTime(0.5,this.now + 0.08);
	this.gain.gain.linearRampToValueAtTime(0,this.now + 1);
	//garbage collection
	this.source.stop(this.now + 1.2); 
	setTimeout(function(){
		that.gain.disconnect();
	},1200);
	
}

function play(){

	setInterval(function(){
		var g = new grain(buffer);
		grains[graincount] = g;
		graincount+=1;
				
		if(graincount > 20){
			graincount = 0;
		}

	},50);
			
}

//loading the sound with XML HTTP REQUEST
var request = new XMLHttpRequest();
	request.open('GET','2.mp3',true);
	request.responseType = "arraybuffer";
	request.onload = function(){
		context.decodeAudioData(request.response,function(b){
			buffer = b; //set the buffer
			data = buffer.getChannelData(0);
			

		});
	};
request.send();


//processing
function sketch(p){
	w = parseInt($('#waveform').css('width'),10);
	h = parseInt($('#waveform').css('height'),10);
	
	p.setup = function(){
		p.size(w,h);
		p.background(0);
		p.frameRate(24);
		
		//change the size on resize
		$(window).resize(function(){
			w = parseInt($('#waveform').css('width'),10);
			h = parseInt($('#waveform').css('height'),10);
			p.size(w,h);

		});
		
	};

	p.draw = function(){
		//p.background(255);
		
	};
}


$(document).ready(function(){
	var canvas = document.getElementById('canvas');
	var processing = new Processing(canvas,sketch);
});