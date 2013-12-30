function guiinit(){
	var dialwidth = parseInt($('.col-sm-2').css('width')) - ( parseInt($('.col-sm-2').css('width')) / 6);
	
	var settings = {
		'min':0,
		'max':100,
		'width' : dialwidth,
		"displayInput" :  false,
		"angleArc" : 180,
		"angleOffset" : -90
	};

	var bg = '#E4E4E4';
	var fg = '#2a6496';
	$("#attack").knob({
		'min':1,
		'max':100,
		'width' : dialwidth,
		"displayInput" :  false,
		"val": 50,
		"angleArc" : 180,
		"angleOffset" : -90,
		'bgColor': bg,
		'fgColor': fg,
		"change": function(v){
			attack = v / 100;
			
		}
	});
	
	$("#release").knob({
		'min':1,
		'max':100,
		'width' : dialwidth,
		"displayInput" :  false,
		"val": 50,
		"angleArc" : 180,
		"angleOffset" : -90,
		'bgColor': bg,
		'fgColor': fg,
		"change": function(v){
			release = v / 100;
			
		}
	});
	$('#density').knob({
		'min':0,
		'max':100,
		'width' : dialwidth,
		"displayInput" :  false,
		"val": 50,
		"angleArc" : 180,
		"angleOffset" : -90,
		'bgColor': bg,
		'fgColor': fg,
		"change": function(v){
			density = v / 100;
			
		}
	});
	$('#spread').knob({
		'min':0,
		'max':200,
		'width' : dialwidth,
		"displayInput" :  false,
		"val": 50,
		"angleArc" : 180,
		"angleOffset" : -90,
		'bgColor': bg,
		'fgColor': fg,
		"change": function(v){
			spread = v / 100;

			
		}
	});
	$('#pan').knob({
		'min':0,
		'max':200,
		'width' : dialwidth,
		"displayInput" :  false,
		"val": 50,
		"angleArc" : 180,
		"angleOffset" : -90,
		'bgColor': bg,
		'fgColor': fg,
		"change": function(v){
			pan = v / 100;

			
		}
	});
	
	$('#minus').click(function(){
		trans = trans * 0.5;
		$('#minus').css('opacity',0.3);
		setTimeout(function(){
			$('#minus').css('opacity',1);
		},200);
	});

	$('#plus').click(function(){
		trans = trans * 2;
		$('#plus').css('opacity',0.3);
		setTimeout(function(){
			$('#plus').css('opacity',1);
		},200);
	});

	var minus = document.getElementById('minus');
	minus.addEventListener('touchstart',function(e){
		e.preventDefault();
		$('#minus').css('opacity',0.3);
		trans = trans * 0.5;
	});
	minus.addEventListener('touchend',function(e){
		e.preventDefault();
		$('#minus').css('opacity',1);
	});

	var plus = document.getElementById('plus');
	plus.addEventListener('touchstart',function(e){
		e.preventDefault();
		$('#plus').css('opacity',0.3);
		trans = trans * 2;
	});
	plus.addEventListener('touchend',function(e){
		e.preventDefault();
		$('#plus').css('opacity',1);
	});

	$('#helpbutton').click(function(){
		if(helpvisible){
			$('#help').hide();
			helpvisible = false;
		}else{
			$('#help').show();
			helpvisible = true;
		}
		
	});
	

}