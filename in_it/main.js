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
let tracker = 1;
$(document).ready(function(){
	mouseHandler();
	uiUpdate = new UIupdater();
	game = new Game(uiUpdate);
});

function scroller(screenID){	//will be either #gamePageMain or #introPageMain
	if(screenID == 'introPageMain'){
		$('#introPageMain').css('display','block');
	}else if(screenID == 'gamePageMain'){
		$('#gamePageMain').css('display', 'block');
	}
	let scroll = screenID;
	// Using jQuery's animate() method to add smooth page scroll
	// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	$('html, body').animate({
		scrollTop: $("#"+scroll).offset().top,
		behavior: 'smooth'
	}, 800, function(){
		if(screenID == 'introPageMain'){
			$('#gamePageMain').css('display','none');
		}else if(screenID == 'gamePageMain'){
			$('#introPageMain').css('display','none');
		}
	});
}

function playerAddCharTurn(){
	event.stopPropagation();
	$('.charDropMenu').css('display','none');
	let character = $(event.target).attr('value');
	const imgSrc = $(event.target).children('img').attr('src');
	let img_ = $('<img>',{
		src: imgSrc,
		class: 'charListIcon',
		width: '30px',
		height: '30px'
	});
	let charLi = $('<li>');
	$('.initialScreenConsole p').remove();
	if(game.playersInGame[1].characterArr.length<3){	//when player2 has 3 chars(limit) prevent character add
		if(tracker==1){
			const charName = playerAddCharacter(0,character);
			const par = $('<p>',{
				text: 'player 2...',
				class: 'text-primary'
			});
			$('.initialScreenConsole div').append(par);
			$('.gameStart button').text('Player 2 Select').addClass('btn-primary').removeClass('btn-warning');
			charLi.text(' '+charName).prepend(img_);
			$('.player1_intro ul').append(charLi);
			tracker = 2;
		}else if(tracker ==2){
			const charName = playerAddCharacter(1,character);
			const par = $('<p>',{
				text: 'player 1...',
				class: 'player1Color'
			});
			$('.initialScreenConsole div').append(par);
			$('.gameStart button').text('Player 1 Select').addClass('btn-warning').removeClass('btn-primary');
			charLi.text(' '+charName).prepend(img_);
			$('.player2_intro ul').append(charLi);
			tracker = 1;
		}
		if(game.playersInGame[1].characterArr.length===3){
			$('.initialScreenConsole p').remove();
			const par = $('<p>',{
				text: 'start game!!!',
				class: 'text-success'
			});
			$('.initialScreenConsole div').append(par);
			$('.charSelectDrop').unbind('click',charDropMenuOpen);
			$('.gameStart button').text('START').addClass('btn-success').removeClass('btn-warning');
			$('.gameStart button').bind('click', gameStart);
		}
	}else{
		console.log('error playerAdder function main');
	}
}
function playerAddCharacter(playerNum, character){
	switch(character){
		case "ana":
			game.addCharacterToPlayer(game.playersInGame[playerNum], ana);
			return ana.name;
		case "lucio":
			game.addCharacterToPlayer(game.playersInGame[playerNum], lucio);
			return lucio.name;
		case "zenyatta":
			game.addCharacterToPlayer(game.playersInGame[playerNum], zenyatta);
			return zenyatta.name;
		case "mercy":
			game.addCharacterToPlayer(game.playersInGame[playerNum], mercy);
			return mercy.name;
		case "symmetra":
			game.addCharacterToPlayer(game.playersInGame[playerNum], symmetra);
			return symmetra.name;
		case "dva":
			game.addCharacterToPlayer(game.playersInGame[playerNum], dva);
			return dva.name;
		case "reinhardt":
			game.addCharacterToPlayer(game.playersInGame[playerNum], reinhardt);
			return reinhardt.name;
		case "roadhog":
			game.addCharacterToPlayer(game.playersInGame[playerNum], roadhog);
			return roadhog.name;
		case "winston":
			game.addCharacterToPlayer(game.playersInGame[playerNum], winston);
			return winston.name;
		case "zarya":
			game.addCharacterToPlayer(game.playersInGame[playerNum], zarya);
			return zarya.name;
		case "hanzo":
			game.addCharacterToPlayer(game.playersInGame[playerNum], hanzo);
			return hanzo.name;		
		case "junkrat":
			game.addCharacterToPlayer(game.playersInGame[playerNum], junkrat);
			return junkrat.name;
		case "mei":
			game.addCharacterToPlayer(game.playersInGame[playerNum], mei);
			return mei.name;
		case "torbjorn":
			game.addCharacterToPlayer(game.playersInGame[playerNum], torbjorn);
			return torbjorn.name;
		case "bastion":
			game.addCharacterToPlayer(game.playersInGame[playerNum], bastion);
			return bastion.name;
		case "widowmaker":
			game.addCharacterToPlayer(game.playersInGame[playerNum], widowmaker);
			return widowmaker.name;
		case "genji":
			game.addCharacterToPlayer(game.playersInGame[playerNum], genji);
			return genji.name;
		case "mccree":
			game.addCharacterToPlayer(game.playersInGame[playerNum], mccree);
			return mccree.name;
		case "pharah":
			game.addCharacterToPlayer(game.playersInGame[playerNum], pharah);
			return pharah.name;
		case "soldier":
			game.addCharacterToPlayer(game.playersInGame[playerNum], soldier);
			return soldier.name;
		case "reaper":
			game.addCharacterToPlayer(game.playersInGame[playerNum], reaper);
			return reaper.name;	
		case "tracer":
			game.addCharacterToPlayer(game.playersInGame[playerNum], tracer);
			return tracer.name;	
	}
}
function gameStart(){
	battleAud.play();
	gameEndAud.load();
	scroller('gamePageMain');
	game.gameStart();
	$('.player1_intro li, .player2_intro li').remove();
	$('iframe').remove();
}


function mouseHandler(){
	$('.charSelectDrop:not(.characterList)').click(charDropMenuOpen);
	$('.charMenuCloser').on('click',function(evt){
		evt.stopPropagation();
		charDropMenuClose();
	});
	$('.charDropMenu ul').on('click', 'li:not(li:last-of-type)', function(){
		playerAddCharTurn();
	});
	// below are handlers for main game area
	$('.moveOptionSkills').click(skillMenuClickMouse);
	$('.moveOptionChangeChar').click(charOptClickMouse);
	$('.moveOptionUse').click(useOptClickMouse);
	$('.moveOptionRageQuit').click(rageQuitOpt);
	$('.backButton').click(backButtonClickMouse);

	$('#playerChar_1, #playerChar_2, #playerChar_3').click(changeCharListClickMouse);
	$('#skill_1, #skill_2, #skill_3, #skill_4').click(skillListClickMouse);
	$('#item_healthPack').click(healthPackItemClick);
	$('#item_Reload').click(reloadClick);
	$('.modal-footer button').click(function(){
		$('iframe').remove();
	})
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
		}else if(this_.hasClass('moveOptionRageQuit')){
			rageQuitOpt();
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
function rageQuitOpt(){
	if(game.currentPlayerTurn){
		$('#gameEndModalFooter').text("player 2 rage quit");
	}else if(!game.currentPlayerTurn){
		$('#gameEndModalFooter').text("player 1 rage quit");
	}
	game=null;
	battleAud.pause();
	game=new Game(uiUpdate);
	// <iframe width="560" height="315" src="https://www.youtube.com/embed/X2WH8mHJnhM?start=16" frameborder="0" allowfullscreen></iframe>
	let feelsBadMan = $('<iframe>',{
		src: "https://www.youtube.com/embed/X2WH8mHJnhM?start=16&autoplay=1",
		width: "560",
		height: "315",
		frameborder: "0"
	});
	$('.modal-body').text('').append(feelsBadMan);
	$('#gameEndModalTitle').text("Too difficult for you???");
	$('#gameEndModal').modal('show');
	scroller("introPageMain");
	gameEnder();
}
/****end of mouse click handler for main game area ****/
/********** end of ui handlers for game area *********/

function gameOver(playerTurnNum){
	game=null;
	uiUpdate.clearConsoleMessage();
	if(playerTurnNum){
		uiUpdate.updateConsoleCustomMsg("Player 1 defeated Player 2!!!");
		$('#gameEndModalFooter').text("player 1 wins");
	}else{
		uiUpdate.updateConsoleCustomMsg("Player 2 defeated Player 1!!!");
		$('#gameEndModalFooter').text("player2 wins");
	}
	battleAud.pause();
	gameEndAud.play();
	// <iframe width="560" height="315" src="https://www.youtube.com/embed/t2Yrz9HSZNo" frameborder="0" allowfullscreen></iframe>
	let videoFrame = $("<iframe>",{
		src: "https://www.youtube.com/embed/t2Yrz9HSZNo",
		frameborder : "0",
		width: "560",
		height: "315"
	});
	$('.modal-body').text('').append(videoFrame);
	$('#gameEndModalTitle').text("Game Over");
	setTimeout(function(){
		$("#gameEndModal").modal('show');
		scroller('introPageMain');
		game = new Game(uiUpdate);
		gameEnder();
	},4000);
}

function gameEnder(){
	battleAud.load();
	$('.charSelectDrop').bind('click',charDropMenuOpen);
	$('.gameStart button').text('Player 1 Select').addClass('btn-warning').removeClass('btn-success');
	$('.gameStart button').unbind('click', gameStart);
	$('.initialScreenConsole p').remove();
	const par = $('<p>',{
		text: 'player 1...',
		class: 'player1Color'
	});
	$('.initialScreenConsole div').append(par);
}