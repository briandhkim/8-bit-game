var MoveOptionButton = function(){
	this.inFocus = null;

	this.directionClick = function(event){
		var key = event.keyCode;
		var spanAdd = $('<span>').addClass('tracker').text('&#x25BA')
		console.log('first check');
		if(key == 40 || 39){ //down or right button
			console.log('second check');
			$(this).parent().closest('.moveOption').next('.moveOption').append(spanAdd);
			$(this).parent().closest('.moveOption').remove(this);
		}
	};

	$('.backButton').on('click',this.backButtonClick);
	this.backButtonClick = function(){
		$(this).parent().closest('div').css('div').css('display','none');
	};
};