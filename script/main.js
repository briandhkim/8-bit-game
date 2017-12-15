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


function gameStart(){
	if(localStorage['gameAud']=='on'){
		battleAud.play();
	}
	gameEndAud.load();
	scroller('gamePageMain');
	clearInterval(imgInterval);
	imgInterval = null;
	game.gameStart();
	// $('.player1_intro li, .player2_intro li').remove();
	$('.player1_intro li, .player2_intro li').text('- not selected');
	$('iframe').remove();
	// $('.inGameAudioToggler i').removeClass('fa-volume-off').addClass('fa-volume-up');
}
function mouseHandler(){
	// $('.charSelectDrop:not(.characterList)').click(charDropMenuOpen);
	// $('.charMenuCloser').on('click',function(evt){
	// 	evt.stopPropagation();
	// 	charDropMenuClose();
	// });
	$('.charDropMenu ul').on('click', 'li', function(){
		//use variable initialTracker to add new span to clicked li
		$('.charListTracker').closest('li').removeClass('trackedCharList');
		$('.charListTracker').remove();
		$(event.target).prepend(initialTracker).addClass('trackedCharList');
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
	$('.modal-footer .modalClose, .modal-header .close').click(function(){
		$('iframe').remove();
		gameEndAud.pause();
	});
	$('#gameEndModal').on('hide.bs.modal',()=>{
		if($('#gameEndModal .modal-body').children().length){
			$('#gameEndModal .modal-body').children().remove();
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

function playerAddCharTurn(){
	// event.stopPropagation();
	// let character = $(event.target).attr('value');
	// const imgSrc = $(event.target).children('img').attr('src');
	const character = $('.charListTracker').closest('li').attr('value');
	const imgSrc = $('.charListTracker').closest('li').children('img').attr('src');
	let img_ = $('<img>',{
		src: imgSrc,
		class: 'charListIcon',
		width: '30px',
		height: '30px'
	});
	// let charLi = $('<li>');
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
			// $('.gameStart button').text('Player 2 Select').addClass('btn-primary').removeClass('btn-warning');
			$('.gameStart button').text('Player 2 Select');
			$(`.player1_intro li:nth-of-type(${liIterator})`).text(' '+charName).prepend(img_);
			// charLi.text(' '+charName).prepend(img_);
			// $('.player1_intro ul').append(charLi);
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
			// $('.gameStart button').text('Player 1 Select').addClass('btn-warning').removeClass('btn-primary');
			$('.gameStart button').text('Player 1 Select');
			$(`.player2_intro li:nth-of-type(${liIterator})`).text(' '+charName).prepend(img_);
			// charLi.text(' '+charName).prepend(img_);
			// $('.player2_intro ul').append(charLi);
			tracker = 1;
		}
		if(game.playersInGame[1].characterArr.length===3){
			// $('.initialScreenConsole p').remove();
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
			// $('.initialScreenConsole').append(par);
			// $('.charSelectDrop').unbind('click',charDropMenuOpen);
			$('.gameStart button').text('START').addClass('btn-success startButtonPop');
			$('.gameStart button').bind('click', gameStart);
		}
	}else{
		// console.log("error playerAdder function main: can't add more");
		return;
	}
}

/******************* ui handlers for game area *****************/ 
let initialTracker = $('<span>').addClass('charListTracker hidden-xs hidden-sm').html('&#9830');

let spanAdd = $("<span>").addClass("tracker").html('&#9830');
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
	if(!game.buttonDisable && $('.gamePageMain').css('display')==='block'){
		$('.skillList').css('display','block');
		$('.skillList li:first-child').prepend(spanAdd);
		menuOpened = true;
	}
}

function charOptClick(){
	if(!game.buttonDisable && $('.gamePageMain').css('display')==='block'){
		$('.changeCharList').css('display','block');
		$('.changeCharList li:first-child').prepend(spanAdd);
		menuOpened = true;
	}
}
function useOptClick(){
	if(!game.buttonDisable && $('.gamePageMain').css('display')==='block'){
		$('.useList').css('display','block');
		$('.useList li:first-child').prepend(spanAdd);
		menuOpened = true;
	}
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
	if(game!==null && $('.gamePageMain').css('display')==='block'){
		$('.tracker').remove();
		$('.skillList').css('display','block');
		$('.skillList li:first-child').prepend(spanAdd);
		menuOpened = true;
	}
}
function charOptClickMouse(){
	if(game!==null && $('.gamePageMain').css('display')==='block'){
		$('.tracker').remove();
		$('.changeCharList').css('display','block');
		$('.changeCharList li:first-child').prepend(spanAdd);
		menuOpened = true;
	}	
}
function useOptClickMouse(){
	if(game!==null && $('.gamePageMain').css('display')==='block'){
		$('.tracker').remove();
		$('.useList').css('display','block');
		$('.useList li:first-child').prepend(spanAdd);
		menuOpened = true;
	}
}
function backButtonClickMouse(){
	$('.tracker').closest('div').css('display', 'none');
	$('.moveOptionSkills').prepend(spanAdd);
	menuOpened = false;
}
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
		// <iframe width="560" height="315" src="https://www.youtube.com/embed/X2WH8mHJnhM?start=16" frameborder="0" allowfullscreen></iframe>
		const feelsBadMan = $('<iframe>',{
			src: "https://www.youtube.com/embed/X2WH8mHJnhM?start=16"+iframeAutoplay,
			// "width": "100%",
			// "min-height": "350px",
			frameborder: "0"
		});
		$('#gameEndModal .modal-body').text('').append(feelsBadMan);
		$('#gameEndModalTitle').text("Too difficult for you???");
		$('#gameEndModal').modal('show');
		scroller("introPageMain");
		randIntroImg();
		gameEnder();
	}
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
	
	// <iframe "width"="560" height="315" src="https://www.youtube.com/embed/t2Yrz9HSZNo" frameborder="0" allowfullscreen></iframe>
	const videoFrame = $("<iframe>",{
		src: "https://www.youtube.com/embed/sQfk5HykiEk",
		frameborder : "0"
	});
	$('#gameEndModal .modal-body').text('').append(videoFrame);
	$('#gameEndModalTitle').text("Game Over");
	randIntroImg();
	setTimeout(function(){
		$("#gameEndModal").modal('show');
		scroller('introPageMain');
		game = new Game(uiUpdate);
		gameEnder();
	},4000);
}

function gameEnder(){
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

	// $('.initialScreenConsole p').remove();
	// const par = $('<p>',{
	// 	text: 'player 1...',
	// 	class: 'player1Color'
	// });
	// $('.initialScreenConsole div').append(par);
}