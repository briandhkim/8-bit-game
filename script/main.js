/***************************
 -> 
param: 
return: 
descpt: 
*/

let uiUpdate = null;
let game = null;
let tracker = 1;
$(document).ready(function(){
	mouseHandler();
	uiUpdate = new UIupdater();
	game = new Game(uiUpdate);

	const randImg = Math.floor(Math.random()*imgArr.length);
	$('.introImgDiv').css({
		'background': `url(${bgImgPath}${imgArr[randImg]})`,
		'background-repeat': 'no-repeat',
		'background-size': 'contain',
		'background-position': 'center'
	});
	randIntroImg();
	$('.instructionButton').click();

	if(typeof localStorage['gameAud'] !== 'string'){
		localStorage['gameAud'] = 'on';
	}else if(  !(localStorage['gameAud']=='off'||localStorage['gameAud']=='on') ){
		localStorage['gameAud'] = 'on';
	}

	if(localStorage['gameAud']=='on' && $('.inGameAudioToggler i').hasClass('fa-volume-off')){
		$('.inGameAudioToggler i').toggleClass('fa-volume-off fa-volume-up');
	}else if(localStorage['gameAud']=='off' && $('.inGameAudioToggler i').hasClass('fa-volume-up')){
		$('.inGameAudioToggler i').toggleClass('fa-volume-off fa-volume-up');
	}
});
/***************************
mouseHandler -> 
param: none
return: none
descpt: bind all click handlers when called; function called at document ready
*/
function mouseHandler(){
	$('.charDropMenu ul').on('click', 'li', function(){
		//use variable initialTracker to add new span to clicked li
		$('.charListTracker').closest('li').removeClass('trackedCharList');
		$('.charListTracker').remove();
		$(event.target).prepend(initialTracker).addClass('trackedCharList');
		playerAddCharTurn();
	});
	// below are handlers for main game area
	$('.moveOptionSkills').on('click',()=>{
		$('.tracker').remove();
		skillMenuClick();
	});
	// $('.moveOptionChangeChar').click(charOptClickMouse);
	$('.moveOptionChangeChar').on('click', ()=>{
		$('.tracker').remove();
		charOptClick();
	});
	// $('.moveOptionUse').click(useOptClickMouse);
	$('.moveOptionUse').on('click',()=>{
		$('.tracker').remove();
		useOptClick();
	});
	$('.moveOptionRageQuit').click(rageQuitOpt);
	$('.backButton').click(backButtonClickMouse);
	$('#playerChar_1, #playerChar_2, #playerChar_3').click(changeCharListClickMouse);
	$('#skill_1, #skill_2, #skill_3, #skill_4').click(skillListClickMouse);
	$('#item_healthPack').click(healthPackItemClick);
	$('#item_Reload').click(reloadClick);
	$('.modal-footer .modalClose, .modal-header .close').click(function(){
		$('iframe').remove();
		if(!gameEndAud.ended){
			gameEndAud.pause();
		}	
	});
	$('#gameEndModal').on('hide.bs.modal',()=>{
		if($('#gameEndModal .modal-body').children().length){
			$('#gameEndModal .modal-body').children().remove();
		}
		if(!gameEndAud.ended){
			gameEndAud.pause();
		}
	});
	$('.inGameAudioToggler').click(inGameAudioToggle);
	$('.modal-header .audioToggler').click(modalAudioToggle);
	$('.aboutButton').click(function(){
		$('#gameInfoModal dl').remove();
		aboutModalToggle();
		$('#gameInfoModal').modal('show');
	});
	$('.instructionButton').click(function(){
		$('#gameInfoModal dl').remove();
		instructionModalToggle();
		$('#gameInfoModal').modal('show');
	});
}
/***************************
gameStart -> 
param: none
return: none
descpt: called when player starts game from intro screen
	initiates game, and calls gameStart function in game object
*/
function gameStart(){
	if(localStorage['gameAud']=='on'){
		battleAud.play();
	}
	gameEndAud.load();
	scroller('gamePageMain');
	clearInterval(imgInterval);
	imgInterval = null;
	game.gameStart();
	$('.player1_intro li, .player2_intro li').text('- not selected');
	$('iframe').remove();
}
/***************************
playerAddCharTurn -> 
param: none
return: none
descpt: function for handling player character selection at intro screen
*/
function playerAddCharTurn(){
	const character = $('.charListTracker').closest('li').attr('value');
	const imgSrc = $('.charListTracker').closest('li').children('img').attr('src');
	let img_ = $('<img>',{
		src: imgSrc,
		class: 'charListIcon',
		width: '30px',
		height: '30px'
	});
	$('.initialScreenConsole p').remove();
	if(game.playersInGame[1].characterArr.length<3){	//when player2 has 3 chars(limit) prevent character add
		if(tracker==1){
			game.addCharacterToPlayer(game.playersInGame[0],characterModel[character]);
			const liIterator = game.playersInGame[0].characterArr.length;
			const charName = characterModel[character].name;
			const par = $('<p>',{
				text: 'player 2...',
				class: 'text-primary'
			});
			$('.initialScreenConsole div').append(par);
			$('.gameStart button').text('Player 2 Select');
			$(`.player1_intro li:nth-of-type(${liIterator})`).text(' '+charName).prepend(img_);
			tracker = 2;
		}else if(tracker ==2){
			game.addCharacterToPlayer(game.playersInGame[1], characterModel[character]);
			const liIterator = game.playersInGame[1].characterArr.length;
			const charName = characterModel[character].name;
			const par = $('<p>',{
				text: 'player 1...',
				class: 'player1Color'
			});
			$('.initialScreenConsole div').append(par);
			$('.gameStart button').text('Player 1 Select');
			$(`.player2_intro li:nth-of-type(${liIterator})`).text(' '+charName).prepend(img_);
			tracker = 1;
		}
		if(game.playersInGame[1].characterArr.length===3){
			$('.initialScreenConsole').text('');
			const startSpan = $('<span>').text('click below');
			const downIcon = $('<i>')
				.addClass('fa fa-arrow-circle-down fa-lg')
				.css({
					'color':'green'
				});
			const par = $('<p>',{
				text: 'start game!!!',
				class: 'text-success'
			});
			const pDiv = $('<div>').append(par);
			$('.initialScreenConsole').prepend(startSpan, downIcon, pDiv);	
			$('.gameStart button').text('START').addClass('btn-success startButtonPop');
			$('.gameStart button').bind('click', gameStart);
		}
	}else{
		// console.log("error playerAdder function main: can't add more");
		return;
	}
}

/******************* ui handlers for game area *****************/ 
const initialTracker = $('<span>').addClass('charListTracker hidden-xs hidden-sm').html('&#9830');
const spanAdd = $("<span>").addClass("tracker").html('&#9830');
let menuOpened = false;
/******** ui handlers for keyboard input *******/
$(window).keydown(function(event){
	const key = event.keyCode;
	if(game.buttonDisable && $('.introPageMain').css('display')==='block'){
		let charLi = $('.charListTracker').closest('li');
		if((key===40||key===83) &&  $('#gameInfoModal').css('display')==='none' && $('#gameEndModal').css('display')==='none'){	//down key
			if(charLi.next('li').length){
				event.preventDefault();
				charLi.next('li').prepend(initialTracker).addClass('trackedCharList');
				charLi.removeClass('trackedCharList').children('.charListTracker').remove();
				let charId = $('.charListTracker').closest('li').attr('id');
				let charElmt = document.getElementById(charId);
				charElmt.scrollIntoView({behavior:'instant', block:'center', inline: 'nearest'});
				// charElmt.scrollIntoView(false);
			}
		}else if((key===38||key===87) &&  $('#gameInfoModal').css('display')==='none' && $('#gameEndModal').css('display')==='none'){	//up key
			if(charLi.prev('li').length){
				event.preventDefault();
				charLi.prev('li').prepend(initialTracker).addClass('trackedCharList');
				charLi.removeClass('trackedCharList').children('.charListTracker').remove();
				let charId = $('.charListTracker').closest('li').attr('id');
				let charElmt = document.getElementById(charId);
				charElmt.scrollIntoView({behavior:'instant', block:'center', inline: 'nearest'});
			}
		}else if (key===32){	//space
			event.preventDefault();
			if($('#gameInfoModal').css('display')==='block' || $('#gameEndModal').css('display')==='block'){
				$('#gameInfoModal, #gameEndModal').modal('hide');
				return;
			}
			if($('.gameStart button').hasClass('startButtonPop')){
				gameStart();
				return;
			}
			playerAddCharTurn();
		}
	} else if(!game.buttonDisable && $('.gamePageMain').css('display')==='block'){
		// const key = event.keyCode;
		let this_ = $('.tracker').parent().closest('.moveOpt');		//track span in choosing move options
		let this_li_ = $('.tracker').parent().closest('li');		//track span in the move option list
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
			event.preventDefault();
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
	}
});

/***************************
skillListClick -> 
param: selected skill num (int)
return: none
descpt: keyboard click handler for player skill selection
*/
function skillListClick(skillVal){
	let skillListNum = skillVal;
	game.turnSkillChar(skillListNum);
	backButtonClickMouse();
}
/***************************
skillListClickMouse -> 
param: none
return: none
descpt: mouse click handler for player skill selection
*/
function skillListClickMouse(){
	let skillListNum = $(this).val();
	game.turnSkillChar(skillListNum);
	backButtonClickMouse();
}
/***************************
changeCharListClick -> 
param: selected char num (int)
return: none
descpt: keyboard click handler for player change character selection
*/
function changeCharListClick(charVal){
	let changeCharNum = charVal;
	game.turnChangeChar(changeCharNum);
	backButtonClickMouse()
}
/***************************
changeCharListClickMouse -> 
param: none
return: none
descpt: mouse click handler for player  change character selection
 */
function changeCharListClickMouse(){
	let changeCharNum = $(this).val();
	game.turnChangeChar(changeCharNum);
	backButtonClickMouse()
}
/***************************
healthPackItemClick -> 
param: none
return: none
descpt: click handler for player choosing health pack option
*/
function healthPackItemClick(){
	game.turnUseHealthPack();
	backButtonClickMouse();
}
/***************************
reloadClick -> 
param: none
return: none
descpt: click handler for player choosing reload option
*/
function reloadClick(){
	game.turnReload();
	backButtonClickMouse();
}
/***************************
skillMenuClick -> 
param: none
return: none
descpt: click handler for player opening skill options menu
*/
function skillMenuClick(){
	if(!game.buttonDisable && $('.gamePageMain').css('display')==='block'){
		$('.skillList').css('display','block');
		$('.skillList li:first-child').prepend(spanAdd);
		menuOpened = true;
	}
}
/***************************
charOptClick -> 
param: none
return: none
descpt: click handler for player opening character change options menu
*/
function charOptClick(){
	if(!game.buttonDisable && $('.gamePageMain').css('display')==='block'){
		$('.changeCharList').css('display','block');
		$('.changeCharList li:first-child').prepend(spanAdd);
		menuOpened = true;
	}
}
/***************************
useOptClick -> 
param: none
return: none
descpt: click handler for player opening use options menu
*/
function useOptClick(){
	if(!game.buttonDisable && $('.gamePageMain').css('display')==='block'){
		$('.useList').css('display','block');
		$('.useList li:first-child').prepend(spanAdd);
		menuOpened = true;
	}
}
/***************************
backButtonClick -> 
param: element object
return: none
descpt: keyboard click handler to close skill/char/use menu;
	dom element had to be passed in for keyboard to identify the correct menu
*/
function backButtonClick(elmt){
	$(elmt).css('display','none');
	$('.moveOptionSkills').prepend(spanAdd);
	menuOpened = false;
}
/***************************
backButtonClickMouse -> 
param: none
return: none
descpt: mouse click handler to close skill/char/use menu
*/
function backButtonClickMouse(){
	$('.tracker').closest('div').css('display', 'none');
	$('.moveOptionSkills').prepend(spanAdd);
	menuOpened = false;
}
/***************************
rageQuitOpt -> 
param: none
return: none
descpt: ends and resets the game. displays game end modal
*/
function rageQuitOpt(){
	if(game!==null){
		if(game.currentPlayerTurn){
			$('#gameEndModalFooter').text("player 2 rage quit");
		}else if(!game.currentPlayerTurn){
			$('#gameEndModalFooter').text("player 1 rage quit");
		}
		game=null;
		battleAud.pause();
		game=new Game(uiUpdate);
		let audioButton = $('#gameEndModal .audioToggler i');
		let iframeAutoplay = '';
		if(localStorage['gameAud']=='on'){
			iframeAutoplay = '&autoplay=1';
			if(audioButton.hasClass('fa-volume-off')){
				audioButton.removeClass('fa-volume-off').addClass('fa-volume-up');
			}
		}else if(localStorage['gameAud']=='off' && audioButton.hasClass('fa-volume-up')){
			audioButton.removeClass('fa-volume-up').addClass('fa-volume-off');
		}
		const feelsBadMan = $('<iframe>',{
			src: "https://www.youtube.com/embed/X2WH8mHJnhM?start=16"+iframeAutoplay,
			frameborder: "0"
		});
		$('#gameEndModal .modal-body').text('').append(feelsBadMan);
		$('#gameEndModalTitle').text("Too difficult for you???");
		$('#gameEndModal').modal('show');
		// scroller("introPageMain");
		randIntroImg();
		gameEnder();
	}
}
/***************************
gameOver -> 
param: player turn num (int)
return: none
descpt: ends/resets the game and displays game end modal
*/
function gameOver(playerTurnNum){
	game=null;
	uiUpdate.clearConsoleMessage();
	if(playerTurnNum){
		uiUpdate.updateConsoleCustomMsg("Player 1 defeated Player 2!!!");
		$('#gameEndModalFooter').text("player 1 wins");
	}else{
		uiUpdate.updateConsoleCustomMsg("Player 2 defeated Player 1!!!");
		$('#gameEndModalFooter').text("player 2 wins");
	}
	let audioButton = $('#gameEndModal .audioToggler i');
	if(localStorage['gameAud']=='on'){
		battleAud.pause();
		gameEndAud.play();
		if(audioButton.hasClass('fa-volume-off')){
			audioButton.removeClass('fa-volume-off').addClass('fa-volume-up');
		}
	}else if(localStorage['gameAud']=='off' && audioButton.hasClass('fa-volume-up')){
		audioButton.removeClass('fa-volume-up').addClass('fa-volume-off');
	}
	const videoFrame = $("<iframe>",{
		src: "https://www.youtube.com/embed/sQfk5HykiEk",
		frameborder : "0"
	});
	$('#gameEndModal .modal-body').text('').append(videoFrame);
	$('#gameEndModalTitle').text("Game Over");
	randIntroImg();
	setTimeout(function(){
		$("#gameEndModal").modal('show');
		// scroller('introPageMain');
		game = new Game(uiUpdate);
		gameEnder();
	},4000);
}
/***************************
gameEnder -> 
param: none
return: none
descpt: resets ui elements for game area and intro page
*/
function gameEnder(){
	scroller('introPageMain');
	battleAud.load();
	$('.tracker').remove();
	$('.moveOptionSkills').prepend(spanAdd);
	$('.gameStart button').text('Player 1 Select').removeClass('btn-success startButtonPop');
	$('.gameStart button').unbind('click', gameStart);
	$('.charListTracker').closest('li').removeClass('trackedCharList');
	$('.charListTracker').remove();
	$('#listAna').prepend(initialTracker).addClass('trackedCharList');
	const listAna = document.getElementById('listAna');
	listAna.scrollIntoView();
	$('.initialScreenConsole').text('');
	uiUpdate.gameEndClear();
	const startSpan = $('<span>').text('select your character');
	const downIcon = $('<i>')
		.addClass('fa fa-arrow-circle-right fa-lg')
		.css({
			'color':'red'
		});
	const par = $('<p>',{
		text: 'player 1...',
		class: 'player1Color'
	});
	const pDiv = $('<div>').append(par);
	$('.initialScreenConsole').prepend(startSpan, downIcon, pDiv);	
	
}