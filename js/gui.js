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
	$("#attack").knob(settings);
	$("#release").knob(settings);
	$('#density').knob(settings);
	$('#spread').knob(settings);
	$('#reverb').knob(settings);
	$('#pan').knob(settings);

}