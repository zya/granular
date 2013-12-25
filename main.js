var context = new webkitAudioContext();
var buffer;
var grains = []; //array for the grains for memory management
var graincount = 0; // to iterate in the array with setInterval
var w,h;
var data;
var drawingdata = []; //an array that keeps the data
var isloaded = false;

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
			isloaded = true;
			

		});
	};
request.send();


//processing
function sketch(p){
	w = parseInt($('#waveform').css('width'),10);
	h = parseInt($('#waveform').css('height'),10);

	function drawBuffer() {
	    var step = Math.ceil( data.length / w );
	    var amp = h / 2;
	    
	    for( var i=0; i < w; i++ ){
	        var min = 1.0;
	        var max = -1.0;
	        
	        for( j=0; j<step; j++) {
	            
	            var datum = data[(i*step)+j]; 
	            if (datum < min){
	            	min = datum;
	            }else if(datum > max){
	            	max = datum;
	            }
	                
	                
	        }
	        p.fill(p.color(p.random(255),p.random(255),p.random(255)));
	       	p.rect(i,(1+min)*amp,1,Math.max(1,(max-min)*amp));
	    }
    
	}
	
	p.setup = function(){
		p.size(w,h);
		//p.background(0);
		p.frameRate(24);
		
		//change the size on resize
		$(window).resize(function(){
			w = parseInt($('#waveform').css('width'),10);
			h = parseInt($('#waveform').css('height'),10);
			p.size(w,h);

		});
		
	};

	p.draw = function(){
		//p.background(0);
		
		if(isloaded){
			drawBuffer();
		}
		
		
	};
}


$(document).ready(function(){
	var canvas = document.getElementById('canvas');
	var processing = new Processing(canvas,sketch);
});