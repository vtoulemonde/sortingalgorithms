$(function() {

	function init(){
		var array = [24,12,45,67,32,89,34,68];
		for (var i =0; i< array.length; i++) {
			var element = $("<li id='"+i+"'>"+array[i]+"</li>");
			$('#array').append(element);
		}
	}
	init();

	$('#reinit').click( function (){
		$('li').remove();
		init();
	});

	function swapElements(elm1, elm2) {
		console.log("Swap element "+elm1.text()+" and "+ elm2.text());
		var tmp = elm2.text();
		elm2.text(elm1.text());
		elm1.text(tmp);
	}

	var async_loop  = function (arr, cb, time, index, done) {
		index = index || 0;
		if (index < arr.length ) {
			setTimeout(function(){
				cb.apply(arr[index], [arr, index, function(stop){
					if (!stop) 
						async_loop(arr, cb, time, index + 1, done);
				}]);		
			}, time);
		} else {
			if(done) 
				done()
		}
	};


	$('#selection_sort').click( function (){
		var throttle = 400;
		console.log("SELECTION SORT");
		array_li = $('li');

		async_loop(array_li, function (array_li, index, nextOuter){
			// $(this).addClass('selected');
			index_min = index;
			$(array_li[index]).addClass('selected');
			$(array_li[index]).addClass('min');

			async_loop(array_li, function(array_li, j, nextInner) {

				$(array_li[j]).addClass('current');
				setTimeout(function(){
					$(array_li[j]).removeClass('current');
					if($(array_li[j]).text() < $(array_li[index_min]).text() ){
						$(array_li[index_min]).removeClass('min');
						index_min = j;
						$(array_li[index_min]).addClass('min');
					}
					nextInner();
				}, throttle);

			}, throttle, index + 1, function(){
				if(index !== index_min) {
					swapElements($(array_li[index]), $(array_li[index_min]));
				}
				$(array_li[index]).removeClass('selected');
				$(array_li[index_min]).removeClass('min');
				nextOuter();
			})
		}, throttle);

	});

	$('#bubble_sort').click( function (){
		var throttle = 300;
		console.log("BUBBLE SORT");
		array_li = $('li');

		async_loop(array_li, function (array_li, index, nextOuter){

			async_loop(array_li, function(array_li, j, nextInner) {
				if(j < array_li.length-1){
					$(array_li[j]).addClass('min');
					$(array_li[j+1]).addClass('min');

					setTimeout(function(){

						if( $(array_li[j]).text() > $(array_li[j+1]).text()){
							swapElements($(array_li[j]), $(array_li[j+1]));
						}
						$(array_li[j]).removeClass('min');
						$(array_li[j+1]).removeClass('min');
						nextInner();
						
					}, throttle);
				} else {
					nextInner();
				}
			}, throttle, 0, function(){
				nextOuter();
			});

		}, throttle);

	});

});