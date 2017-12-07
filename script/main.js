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
const bgImgPath = './images/intro/';
let imgArr = ['ana.png','bastion.png','genji.png','junkrat.png','mei.png','mercy.png','pharah.png'
	,'reaper.png','reinhardt.png','soldier.png','symmetra.png', 'torbjorn.png','tracer.png','widow.png',
	'winston.png','zarya.png','zenyatta.png'];
let imgInterval = null;

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
});

function randIntroImg(){
	imgInterval = setInterval(()=>{
		const randImg = Math.floor(Math.random()*imgArr.length);
		$('.introImgDiv').toggle('slide',{direction:'left'},1100,()=>{
			$('.introImgDiv').css({
				'background': `url(${bgImgPath}${imgArr[randImg]})`,
				'background-repeat': 'no-repeat',
				'background-size': 'contain',
				'background-position': 'center'
			});
			$('.introImgDiv').toggle('slide',{direction:'right'}, 1100);
		});
	},5000);
}

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
function gameStart(){
	battleAud.play();
	gameEndAud.load();
	scroller('gamePageMain');
	clearInterval(imgInterval);
	imgInterval = null;
	game.gameStart();
	// $('.player1_intro li, .player2_intro li').remove();
	$('.player1_intro li, .player2_intro li').text('not selected');
	$('iframe').remove();
	$('.inGameAudioToggler i').removeClass('fa-volume-off').addClass('fa-volume-up');
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
	$('.modal-footer .modalClose, .modal-header .close').click(function(){
		$('iframe').remove();
		gameEndAud.pause();
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
function inGameAudioToggle(){
	let aButton = $('.inGameAudioToggler i');
	if(aButton.hasClass('fa-volume-up')){
		battleAud.pause();
		aButton.toggleClass('fa-volume-up fa-volume-off');
	}else if(aButton.hasClass('fa-volume-off')){
		battleAud.play();
		aButton.toggleClass('fa-volume-up fa-volume-off');
	}
}
function modalAudioToggle(){
	let aButton = $('#gameEndModal .audioToggler i');
	if(aButton.hasClass('fa-volume-up')){
		gameEndAud.pause();
		aButton.toggleClass('fa-volume-up fa-volume-off');
	}else if(aButton.hasClass('fa-volume-off')){
		gameEndAud.play();
		aButton.toggleClass('fa-volume-up fa-volume-off');
	}
}
function aboutModalToggle(){
	const aboutGameLead = $('<dt>',{
		class: 'aboutModalDT',
		text: "Overwatch meets Pokemon:"
	});
	const aboutGameContent = $('<dd>',{
		class: 'aboutModalDD',
		text: "This game uses the battle mechanics seen in the classic Pokemon games. However, instead of Pokemons, this game uses the characters from the popular, beloved game by Blizzard, Overwatch."
	});
	const aboutDevDT = $('<dt>',{
		class: 'aboutModalDT',
		text: "About the developer:"		
	});
	const aboutDevDD = $('<dd>',{
		class: 'aboutModalDD',
		text: "Hello, my name is Brian. I am a web developer located in Irvine, California. I started this project to challenge myself and to further develop my coding skills in web development."
	});
	const copyrightDT = $('<dt>',{
		class: 'aboutModalDT',
		text: "Copyright:"
	});
	const copyrightDD= $('<dd>',{
		class: 'aboutModalDD',
		text: "If by some chance someone from Blizzard stumbles upon this, Blizzard, I am sorry I did not ask permission to use your game before hand."
	});
	const imageSrcDD = $('<dd>').addClass('aboutModalDD');
	const imgSrcSpan1 = $('<span>').text('The pixel artworks used for this project can be found at the following link: ');
	const tumblrIcon = $('<i>',{
		class:'fa fa-tumblr-square fa-3x tumblrIcon'
	}).css({color: 'rgba(54,70,93,0.6)'});
	const tumblrButton = $('<a>',{
		href: 'http://chiwadesu.tumblr.com/',
		target: '_blank'
	}).append(tumblrIcon);
	imageSrcDD.append(imgSrcSpan1, tumblrButton);
	const gitIcon = $('<i>',{
		class: 'fa fa-github-square fa-3x gitIcon'
	}).css({
		color: 'rgba(0, 0, 0, 0.6)'
	});
	const gitButton = $('<a>',{
		href: "https://github.com/briandhkim",
		target: '_blank'
	}).append(gitIcon);
	const linkedIcon = $('<i>',{
		class: 'fa fa-linkedin-square fa-3x liIcon'
	}).css({
		margin: '0 10px',
		color: 'rgba(0, 119, 181, 0.6)'
	});
	const linkedButton = $('<a>',{
		href: "https://www.linkedin.com/in/briandhkimucla/",
		target: '_blank'
	}).append(linkedIcon);
	let aboutDescription = $('<dl>').append(aboutGameLead, aboutGameContent, aboutDevDT, aboutDevDD, gitButton, linkedButton, copyrightDT, copyrightDD, imageSrcDD);
	$('#gameInfoModal .modal-body').append(aboutDescription);
	$('#gameInfoModalTitle').text('about the game');
}
function instructionModalToggle(){
	const initialScreenDT = $('<dt>',{
		class: 'instructionDT',
		text: 'the initial screen:'
	});
	const initialSpan1 = $('<span>').text('Players will take turns choosing ');
	const initialSpan2 = $('<span>').text('three characters').css('color','red');
	const initialSpan3 = $('<span>').text(' of his or her choice; player turn will alternate and will be indicated on the right side of the screen.');
	// const initialScreenDD = $('<dd>',{
	// 	class: 'instructionDD',
	// 	text: 'Players will take turns choosing three characters of his or her choice; player turn will alternate and will be indicated on the right side of the screen.'
	// });
	const initialScreenDD = $('<dd>',{
		class: 'instructionDD'
	}).append(initialSpan1, initialSpan2, initialSpan3);
	const initialScreenDD2 = $('<dd>',{
		class: 'instructionDD',
		text:'Choose your characters wisely as the character selection cannot be reverted until the game ends.'
	});
	const startingGameDT = $('<dt>',{
		class: 'instructionDT',
		text: 'starting the game:'
	});
	const startingGameDD = $('<dd>',{
		class: 'instructionDD',
		text: 'After each player has selected his or her three characters, press the start button to start the game.'
	});
	const keysDT = $('<dt>',{
		class: 'instructionDT',
		text: 'Keys:'
	});
	const keySpan1 = $('<span>').text('Use your mouse or use ');
	const wasdKey = $('<kbd>').text(' w | a | s | d ');
	const keySpan2 = $('<span>').text('  /');
	const arrowKey = $('<kbd>').html(' &#8593 | &#8592 | &#8595 | &#8594 ');
	const keySpan3 = $('<span>').text(' keys to navigate the character move options. Left click or press ')
		.css('margin-left', '10px');
	const spaceKey = $('<kbd>').text('-space-');
	const keySpan4 = $('<span>').text(' bar to select character move');
	const keysDD = $('<dd>',{
		class: 'instructionDD'
	}).append(keySpan1, wasdKey, keySpan2, arrowKey, keySpan3, spaceKey, keySpan4);
	const otherDT = $('<dt>',{
		class: 'instructionDT',
		text: 'Other:'
	});
	const otherDD = $('<dd>',{
		class: 'instructionDD',
		text: 'Any attack options, use options, or changing character counts as a player turn.'
	});
	const otherDD2 = $('<dd>',{
		class: 'instructionDD',
		text: 'Each attack skill has a accuracy stat; the damage output will differ at each turn, and may even do no damage at all in some cases.'
	});
	const otherDD3 = $('<dd>',{
		class: 'instructionDD',
		text: "Player 1's characters will be displayed on the bottom side of the screen, and player 2's characters will appear on the top side."
	});
	let instructionDesc = $('<dl>').append(initialScreenDT, initialScreenDD, initialScreenDD2, startingGameDT, startingGameDD, keysDT, keysDD, otherDT, otherDD, otherDD2, otherDD3);
	$('#gameInfoModal .modal-body').append(instructionDesc);
	$('#gameInfoModalTitle').text('instructions');
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
			$('.initialScreenConsole p').remove();
			const par = $('<p>',{
				text: 'start game!!!',
				class: 'text-success'
			});
			$('.initialScreenConsole div').append(par);
			$('.charSelectDrop').unbind('click',charDropMenuOpen);
			$('.gameStart button').text('START').addClass('btn-success startButtonPop');
			$('.gameStart button').bind('click', gameStart);
		}
	}else{
		console.log('error playerAdder function main');
	}
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
	if(!game.buttonDisable){
		const key = event.keyCode;
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
	const feelsBadMan = $('<iframe>',{
		src: "https://www.youtube.com/embed/X2WH8mHJnhM?start=16&autoplay=1",
		width: "560",
		height: "315",
		frameborder: "0"
	});
	$('#gameEndModal .modal-body').text('').append(feelsBadMan);
	$('#gameEndModalTitle').text("Too difficult for you???");
	$('#gameEndModal').modal('show');
	scroller("introPageMain");
	randIntroImg();
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
		$('#gameEndModalFooter').text("player 2 wins");
	}
	battleAud.pause();
	gameEndAud.play();
	// <iframe width="560" height="315" src="https://www.youtube.com/embed/t2Yrz9HSZNo" frameborder="0" allowfullscreen></iframe>
	const videoFrame = $("<iframe>",{
		src: "https://www.youtube.com/embed/sQfk5HykiEk",
		frameborder : "0",
		width: "560",
		height: "315"
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
	$('.charSelectDrop').bind('click',charDropMenuOpen);
	// $('.gameStart button').text('Player 1 Select').addClass('btn-warning').removeClass('btn-success startButtonPop');
	$('.gameStart button').text('Player 1 Select').removeClass('btn-success startButtonPop');
	$('.gameStart button').unbind('click', gameStart);
	$('.initialScreenConsole p').remove();
	const par = $('<p>',{
		text: 'player 1...',
		class: 'player1Color'
	});
	$('.initialScreenConsole div').append(par);
}