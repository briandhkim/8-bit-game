/***************************
	 -> 
	param: 
	return: 
	descpt: 
 	*/
let battleAud = new Audio('./sounds/trainer_battle_music.mp3');
battleAud.volume = 0.3;
let gameEndAud = new Audio('./sounds/victory_music_wildpoke.mp3');
gameEndAud.volume = 0.3;
let gameEndAud2 = new Audio('./sounds/victory_music.mp3');
gameEndAud2.volume = 0.3;
let uiUpdate = null;
let game = null;
$(document).ready(function(){
	$('.charSelectDrop').click(charDropMenuOpen);
	$('.charDropMenu').on('click',function(evt){
		evt.stopPropagation();
		charDropMenuClose();
	});
	mouseHandlerGameArea();


	uiUpdate = new UIupdater();
	game = new Game(uiUpdate);
	// game.gameInitiated();
	playerCreateTest();
	game.gameStart();
	// uiHandleTest();
});

function playerCreateTest(){
	game.addCharacterToPlayer(game.playersInGame[0], mei);
	game.addCharacterToPlayer(game.playersInGame[1], torbjorn);
	game.addCharacterToPlayer(game.playersInGame[0], reinhardt);
	game.addCharacterToPlayer(game.playersInGame[1], mccree);
	game.addCharacterToPlayer(game.playersInGame[0], dva);
	game.addCharacterToPlayer(game.playersInGame[1], genji);
}

function playerAttackTest(player){
	player.skillSelected(1);
	uiUpdate.updateConsoleMessage(player.activeCharacter.name, player.activeCharacter.skillArr[1].name);

}



function mouseHandlerGameArea(){
	$('.moveOptionSkills').click(skillMenuClickMouse);
	$('.moveOptionChangeChar').click(charOptClickMouse);
	$('.moveOptionUse').click(useOptClickMouse);
	$('.backButton').click(backButtonClickMouse);

	$('#playerChar_1, #playerChar_2, #playerChar_3').click(changeCharListClickMouse);
	$('#skill_1, #skill_2, #skill_3, #skill_4').click(skillListClickMouse);
	$('#item_healthPack').click(healthPackItemClick);
	$('#item_Reload').click(reloadClick);
}

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
let spanAdd = $("<span>").addClass("tracker").html('&#9830');
let menuOpened = false;

/******** ui handlers for keyboard input *******/
$(window).keydown(function(event){
	var key = event.keyCode;
	var this_ = $('.tracker').parent().closest('.moveOpt');		//track span in choosing move options
	var this_li_ = $('.tracker').parent().closest('li');		//track span in the move option list
	//	37left	38up	39right	40down	87w	65a	83s	68d
	if(key===39||key===68){			//right key
		if(this_.next('.moveOpt').length >0){
			event.preventDefault();		//prevents arrow key scroll
			this_.next('.moveOpt').prepend(spanAdd);
			this_.children('.tracker').remove();
		}
	}else if(key===40||key===83){		//down key
		if(menuOpened){	
			if(this_li_.next('li').length>0){
				event.preventDefault();
				this_li_.next('li').prepend(spanAdd);
				this_li_.children('.tracker').remove();
			}
		}
		if(this_.next('.moveOpt').next('.moveOpt').length > 0){
			event.preventDefault();
			this_.next('.moveOpt').next('.moveOpt').prepend(spanAdd);
			this_.children('.tracker').remove();
		}
	}else if(key===37||key===65){		//left key
		if(this_.prev('.moveOpt').length>0){
			event.preventDefault();
			this_.prev('.moveOpt').prepend(spanAdd);
			this_.children('.tracker').remove();
		}
	}else if(key===38||key===87){		//up key
		if(menuOpened){
			if(this_li_.prev('li').length>0){
				event.preventDefault();
				this_li_.prev('li').prepend(spanAdd);
				this_li_.children('.tracker').remove();
			}
		}
		if(this_.prev('.moveOpt').prev('.moveOpt').length>0){
			event.preventDefault();
			this_.prev('.moveOpt').prev('.moveOpt').prepend(spanAdd);
			this_.children('.tracker').remove();
		}
	}else if(key===32){		//space key
		if(menuOpened){
			if(this_li_.hasClass('backButton')){
				backButtonClick(this_li_.parent().closest('div'));
			}else if(this_li_.closest('div').hasClass('changeCharList')){
				// this_li_.val()
				changeCharListClick(this_li_.val());
			}else if(this_li_.closest('div').hasClass('skillList')){
				skillListClick(this_li_.val());
			}else if(this_li_.attr('id')=="item_healthPack"){
				healthPackItemClick();
			}else if(this_li_.attr('id')=="item_Reload"){
				reloadClick();
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


function skillListClick(skillVal){
	let skillListNum = skillVal;
	// let currentPlayer = game.playersInGame[game.currentPlayerTurn];
	game.turnSkillChar(skillListNum);
	backButtonClickMouse();
}
function skillListClickMouse(){
	let skillListNum = $(this).val();
	// let currentPlayer = game.playersInGame[game.currentPlayerTurn];
	game.turnSkillChar(skillListNum);
	backButtonClickMouse();
}
/****click handler for changing character option  in game ****/
function changeCharListClick(charVal){
	let changeCharNum = charVal;
	// let currentPlayer = game.playersInGame[game.currentPlayerTurn];
	// currentPlayer.changeCharacter(changeCharNum);
	game.turnChangeChar(changeCharNum);
	backButtonClickMouse()
}
/***************************
changeCharListClick -> 
param: none
return: none
descpt: handles player turn change when selected by user
 */
function changeCharListClickMouse(){
	let changeCharNum = $(this).val();
	// let currentPlayer = game.playersInGame[game.currentPlayerTurn];
	// currentPlayer.changeCharacter(changeCharNum);
	game.turnChangeChar(changeCharNum);
	backButtonClickMouse()
}
function healthPackItemClick(){
	game.turnUseHealthPack();
	backButtonClickMouse();
}
function reloadClick(){
	game.turnReload();
	backButtonClickMouse();
}
/****end of click handler for changing character option in game ****/

function skillMenuClick(){
	$('.skillList').css('display','block');
	$('.skillList li:first-child').prepend(spanAdd);
	menuOpened = true;
}

function charOptClick(){
	$('.changeCharList').css('display','block');
	$('.changeCharList li:first-child').prepend(spanAdd);
	menuOpened = true;
}
function useOptClick(){
	$('.useList').css('display','block');
	$('.useList li:first-child').prepend(spanAdd);
	menuOpened = true;
}
function backButtonClick(elmt){
	// $(this_li_).parent().closest('div').css('display','none');
	$(elmt).css('display','none');
	$('.moveOptionSkills').prepend(spanAdd);
	menuOpened = false;
}
/*******ui handlers with keyboard end*******/
/****mouse click handler for main game area ****/
function skillMenuClickMouse(){
	$('.tracker').remove();
	$('.skillList').css('display','block');
	$('.skillList li:first-child').prepend(spanAdd);
	menuOpened = true;
}
function charOptClickMouse(){
	$('.tracker').remove();
	$('.changeCharList').css('display','block');
	$('.changeCharList li:first-child').prepend(spanAdd);
	menuOpened = true;
}
function useOptClickMouse(){
	$('.tracker').remove();
	$('.useList').css('display','block');
	$('.useList li:first-child').prepend(spanAdd);
	menuOpened = true;
}
function backButtonClickMouse(){
	$('.tracker').closest('div').css('display', 'none');
	$('.moveOptionSkills').prepend(spanAdd);
	menuOpened = false;
}
/****end of mouse click handler for main game area ****/
/********** end of ui handlers for game area *********/