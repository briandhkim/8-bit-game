
$(document).ready(function(){
	// $('.moveOptionSkills').on('click',function(){
	// 	$('.skillList').css('display','block');
	// });
	// $('.moveOptionChangeChar').on('click',function(){
	// 	$('.changeCharList').css('display','block');
	// });
	// $('.moveOptionItem').on('click',function(){
	// 	$('.itemList').css('display','block');
	// });
	// $('.backButton').on('click',function(){
	// 	$(this).parent().closest('div').css('display','none');
	// });
	// var mover = new MoveOptionButton();
	// inFocus = $('.tracker');
});

var spanAdd = $('<span>').addClass('tracker').html('&#x25BA');
$(window).keydown(function(event){
	var key = event.keyCode;
	var this_ = $('.tracker').parent().closest('.moveOpt');
	if(key == 40|| key == 39){
		if(this_.next('.moveOpt').length >0){
			this_.next('.moveOpt').append(spanAdd);
			this_.children('span:first').remove();
		}
	}else if(key===37||key===38){
		if(this_.prev('.moveOpt').length>0){
			this_.prev('.moveOpt').append(spanAdd);
			this_.children('span:first').remove();
		}
	}else if(key===32){
		if(this_.hasClass('moveOptionSkills')){
			skillMenuClick();
			this_.children('span:first').remove();
		}else if(this_.hasClass('moveOptionChangeChar')){
			charOptClick();
			this_.children('span:first').remove();
		}else if(this_.hasClass('moveOptionItem')){
			itemOptClick();
			this_.children('span:first').remove();
		}
	}
});
function skillMenuClick(){
	$('.skillList').css('display','block');
	$('.skillList li:first-child').append(spanAdd);
}
function charOptClick(){
	$('.changeCharList').css('display','block');
	$('.changeCharList li:first-child').append(spanAdd);
}
function itemOptClick(){
	$('.itemList').css('display','block');
	$('.itemList li:first-child').append(spanAdd);
}
