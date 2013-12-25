var context = new webkitAudioContext();
var buffer;
var grains = []; //array for the grains for memory management
var graincount = 0; // to iterate in the array with setInterval
var w,h;
var data;
var drawingdata = []; //an array that keeps the data
var voices = []; //an array for touch events
var isloaded = false;
var X = 0;
var Y = 0;
var mouseState = false;
var v;


//the grain class
function grain(buffer,position){

	var that = this; //for scope issues
	this.now = context.currentTime; //update the time value
	//create the source
	this.source = context.createBufferSource();
	this.source.buffer = buffer;
	//create the gain for enveloping
	this.gain = context.createGain();
	this.gain.connect(context.destination);
	
	//connections
	this.source.connect(this.gain);
	this.gain.connect(context.destination);
	
	//update the position and calcuate the offset
	this.position = position;
	this.offset = this.position * (buffer.duration / w); //pixels to seconds
	
	//envelope
	this.source.start(this.now,this.offset + (Math.random() * 0.3),1.2); //parameters (when,offset,duration)
	this.gain.gain.setValueAtTime(0.0, this.now);
	this.gain.gain.linearRampToValueAtTime(0.5,this.now + 0.08);
	this.gain.gain.linearRampToValueAtTime(0,this.now + 1);
	
	//garbage collection
	this.source.stop(this.now + 1.2); 
	setTimeout(function(){
		that.gain.disconnect();
	},1200);
	
}

//the voice class
function voice(p){
	
	var that = this; //for scope issues
	this.play = function(){
		//create new grain
		var g = new grain(buffer,p.mouseX);
		//push to the array
		grains[graincount] = g;
		graincount+=1;
				
		if(graincount > 20){
			graincount = 0;
		}
		//next interval
		that.timeout = setTimeout(that.play,50);
	}
	this.play();
		
}

//stop method
voice.prototype.stop = function(){
	clearTimeout(this.timeout)
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


			//initialize the processing draw when the buffer is ready
			var processing = new Processing(canvas,waveformdisplay);

		});
	};
request.send();


//processing - waveform display - canvas 
function waveformdisplay(p){
	w = parseInt($('#waveform').css('width'),10);
	h = parseInt($('#waveform').css('height'),10);

	function drawBuffer() {
	    var step = Math.ceil( data.length / w );
	    var amp = h / 2;
	    
	    p.background(0);
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
	        
	       	p.rect(i,(1+min)*amp,1,Math.max(1,(max-min)*amp));
	    }
    
	}
	
	p.setup = function(){
		p.size(w,h);
		p.background(0);//background black
		
		
		//change the size on resize
		$(window).resize(function(){
			w = parseInt($('#waveform').css('width'),10);
			h = parseInt($('#waveform').css('height'),10);
			p.size(w,h);
			//redraw buffer on resize
			p.stroke(255);
			drawBuffer();

		});
		p.stroke(255);
		drawBuffer();
		p.noLoop();


	};
	

	
}

//processing - grain display and main interaction system
function grainsdisplay(p){
	w = parseInt($('#waveform').css('width'),10);
	h = parseInt($('#waveform').css('height'),10);

	//setup
	p.setup = function(){
		p.size(w,h);
		p.background(0,0);//backgorund black alpha 0
		p.frameRate(24);
		//p.noLoop();
		//change the size on resize
		$(window).resize(function(){
			w = parseInt($('#waveform').css('width'),10);
			h = parseInt($('#waveform').css('height'),10);
			p.size(w,h);

		});	
		
	};
	//mouse events
	p.mousePressed = function(){
		mouseState = true;

		if(mouseState){
			v = new voice(p);
			v[0] = v; //have in the array
		}
	};

	p.mouseMoved = function(){
		//mouse move event
		X = p.mouseX;
		Y = p.mouseY;		
	};


	p.mouseReleased = function(){
		mouseState = false;
		v.stop();
	};
	
	//draw
	p.draw = function(){

	};
	
}


//onload
$(document).ready(function(){
	var canvas = document.getElementById('canvas');

	//grain display init
	var canvas2 = document.getElementById('canvas2');
	var processing = new Processing(canvas2,grainsdisplay);
	
});