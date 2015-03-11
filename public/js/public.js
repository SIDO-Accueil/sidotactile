$(document).ready(function(){

	// RESET THE FORM VALUES BECAUSE SOME BROWSERS USE CACHED VALUES
	$('.questionHidden').val(50);

	// SLIDER
	$('.slider').each(function(index,ele){
		$(ele).slider({
			min: -100,
			max: 100,
			slide: function(event, ui) {
				var valuePercentage = parseInt((ui.value+100)/2);
				var sliderRel = $(ele).attr('rel') + "";
				$(ele).parents('.form').find('input[name="question'+sliderRel+'"]').val(valuePercentage);
			},
			stop: function(event, ui) {
				var valuePercentage = parseInt((ui.value+100)/2);
				var sliderRel = $(ele).attr('rel') + "";
				$(ele).parents('.form').find('input[name="question'+sliderRel+'"]').val(valuePercentage);
			}
		});
	});

	// BUTTONS
	$('.buttonRestart').click(function(){
		cleanForm($(this).parents('.form'));
	});
	$('.buttonStop').click(function(){
		// Not sure what to do here
	});

	// PROCESSING
	var processingInstances = [];
	$('.sidomeImage canvas').each(function(index, ele){
		processingInstances.push(new Processing(ele, drawPoly));
	});


	// FORM SUBMIT
	$('.formSite').submit(function(evt){
		evt.stopImmediatePropagation();
		$.post($(this).attr('action'), $(this).serialize(), function(response){

		});
		return false;
	});

});

$(window).load(function() {
});

$(window).resize(function() {
});

function cleanForm(formDiv) {
	$(formDiv).find('.questionHidden').val(50);
	$(formDiv).find('.slider').slider({value: 0});
}

function drawPoly(processing) {
	processing.draw = function() {
		// Some tests using processing, I dunno how to make the 3D (as the box) work
		// The reference is on http://processingjs.org/reference/
		var centerX = processing.width / 2
		var centerY = processing.height / 2;
		processing.background(0);
		processing.fill(204, 102, 0);
		processing.stroke(255);
		processing.ellipse(100,70,60,60);
		processing.stroke(204, 102, 0);
		processing.rect(30, 20, 20, 20);
		processing.translate(58, 48, 0);
		processing.rotateY(0.5);
		processing.box(40);
	};
}
