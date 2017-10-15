
$(document).ready(function(){
	// $('.charDropMenu').click(charDropMenuClick);
	$('.charSelectDrop').click(charDropMenuOpen);
	$('.charDropMenu').on('click',function(evt){
		evt.stopPropagation();
		charDropMenuClose();
	});

	// var char1 = new Character(hanzo);
	// var char2 = new Character(genji);

});









/** initial screen ui handler **/
function charDropMenuOpen(){
	if($('.charDropMenu').css('display')=='none'){
		$('.charDropMenu').show();
	}
}
function charDropMenuClose(){
	if($('.charDropMenu').css('display')=='block'){
		$('.charDropMenu').hide();
	}
}
/**** end of initial screen ui handler ****/

/******************* ui handlers for game area *****************/ 
var spanAdd = $("<span>").addClass("tracker").html('&#9830');
var menuOpened = false;

$(window).keydown(function(event){
	var key = event.keyCode;
	var this_ = $('.tracker').parent().closest('.moveOpt');		//track span in choosing move options
	var this_li_ = $('.tracker').parent().closest('li');		//track span in the move option list
	//	37left	38up	39right	40down	87w	65a	83s	68d
	if(key===39||key===68){			//right key
		if(this_.next('.moveOpt').length >0){
			event.preventDefault();		//prevents arrow key scroll
			this_.next('.moveOpt').append(spanAdd);
			this_.children('span:first').remove();
		}
	}else if(key===40||key===83){		//down key
		if(menuOpened){	
			if(this_li_.next('li').length>0){
				event.preventDefault();
				this_li_.next('li').append(spanAdd);
				this_li_.children('span:first').remove();
			}
		}
		if(this_.next('.moveOpt').next('.moveOpt').length > 0){
			event.preventDefault();
			this_.next('.moveOpt').next('.moveOpt').append(spanAdd);
			this_.children('span:first').remove();
		}
	}else if(key===37||key===65){		//left key
		if(this_.prev('.moveOpt').length>0){
			event.preventDefault();
			this_.prev('.moveOpt').append(spanAdd);
			this_.children('span:first').remove();
		}
	}else if(key===38||key===87){		//up key
		if(menuOpened){
			if(this_li_.prev('li').length>0){
				event.preventDefault();
				this_li_.prev('li').append(spanAdd);
				this_li_.children('span:first').remove();
			}
		}
		if(this_.prev('.moveOpt').prev('.moveOpt').length>0){
			event.preventDefault();
			this_.prev('.moveOpt').prev('.moveOpt').append(spanAdd);
			this_.children('span:first').remove();
		}
	}else if(key===32){		//space key
		if(menuOpened){
			if(this_li_.hasClass('backButton')){
				backButtonClick(this_li_.parent().closest('div'));
			}
		}
		if(this_.hasClass('moveOptionSkills')){
			skillMenuClick();
			this_.children('span:first').remove();
		}else if(this_.hasClass('moveOptionChangeChar')){
			charOptClick();
			this_.children('span:first').remove();
		}else if(this_.hasClass('moveOptionUse')){
			useOptClick();
			this_.children('span:first').remove();
		}
	}
});
function skillMenuClick(){
	$('.skillList').css('display','block');
	$('.skillList li:first-child').append(spanAdd);
	menuOpened = true;
}
function charOptClick(){
	$('.changeCharList').css('display','block');
	$('.changeCharList li:first-child').append(spanAdd);
	menuOpened = true;
}
function useOptClick(){
	$('.useList').css('display','block');
	$('.useList li:first-child').append(spanAdd);
	menuOpened = true;
}
function backButtonClick(elmt){
	// $(this_li_).parent().closest('div').css('display','none');
	$(elmt).css('display','none');
	$('.moveOptionSkills').append(spanAdd);
	menuOpened = false;
}

/********** end of ui handlers for game area *********/