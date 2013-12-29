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
	$("#attack").knob({
		'min':1,
		'max':100,
		'width' : dialwidth,
		"displayInput" :  false,
		"val": 50,
		"angleArc" : 180,
		"angleOffset" : -90,
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
		"change": function(v){
			spread = v / 100;

			
		}
	});
	$('#reverb').knob(settings);
	$('#pan').knob(settings);

}