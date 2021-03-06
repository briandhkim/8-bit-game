/*********
contains audio toggle functions, about/instruction modal toggle, intro image function, scroller function
*********/

const battleAud = new Audio('./sounds/trainer_battle_music.mp3');
battleAud.volume = 0.3;
const gameEndAud = new Audio('./sounds/victory_music_wildpoke.mp3');
gameEndAud.volume = 0.3;
const gameEndAud2 = new Audio('./sounds/victory_music.mp3');
gameEndAud2.volume = 0.3;
const bgImgPath = './images/intro/';
const imgArr = ['ana.png','bastion.png','genji.png','junkrat.png','mei.png','mercy.png','pharah.png'
	,'reaper.png','reinhardt.png','soldier.png','symmetra.png', 'torbjorn.png','tracer.png','widow.png',
	'winston.png','zarya.png','zenyatta.png'];
let imgInterval = null;
/***************************
inGameAudioToggle -> 
param: none
return: none
descpt: audio toggle for audio button on game banner 
*/
function inGameAudioToggle(){
	let aButton = $('.inGameAudioToggler i');
	if(aButton.hasClass('fa-volume-up')){
		battleAud.pause();
		localStorage['gameAud'] = 'off';
		aButton.toggleClass('fa-volume-up fa-volume-off');
	}else if(aButton.hasClass('fa-volume-off')){
		battleAud.play();
		localStorage['gameAud'] = 'on';
		aButton.toggleClass('fa-volume-up fa-volume-off');
	}
}
/***************************
modalAudioToggle -> 
param: none 
return: none
descpt: audio toggle for audio button on game end modal
*/
function modalAudioToggle(){
	let aButton = $('#gameEndModal .audioToggler i');
	if(aButton.hasClass('fa-volume-up')){
		gameEndAud.pause();
		localStorage['gameAud'] = 'off';
		aButton.toggleClass('fa-volume-up fa-volume-off');
	}else if(aButton.hasClass('fa-volume-off')){
		gameEndAud.play();
		localStorage['gameAud'] = 'on';
		aButton.toggleClass('fa-volume-up fa-volume-off');
	}
}
/***************************
aboutModalToggle -> 
param:  none
return: none
descpt: dynamically create content for about modal on click
*/
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
	const imageSrcDD = $('<dd>')
		.addClass('aboutModalDD')
		.text('The pixel artworks used for this project can be found at the following link: ');
	const tumblrIcon = $('<i>',{
		class:'fa fa-tumblr-square fa-3x tumblrIcon'
	});
	const tumblrButton = $('<a>',{
		href: 'http://chiwadesu.tumblr.com/',
		target: '_blank',
		class: 'aboutModalLink'
	}).append(tumblrIcon);
	const gitIcon = $('<i>',{
		class: 'fa fa-github-square fa-3x gitIcon'
	});
	const gitButton = $('<a>',{
		href: "https://github.com/briandhkim/OW-Arcade",
		target: '_blank',
		class:'aboutModalLink'
	}).append(gitIcon);
	const linkedIcon = $('<i>',{
		class: 'fa fa-linkedin-square fa-3x liIcon'
	});
	const linkedButton = $('<a>',{
		href: "https://www.linkedin.com/in/briandhkimucla/",
		target: '_blank',
		class:'aboutModalLink'
	}).append(linkedIcon);
	let aboutDescription = $('<dl>').append(aboutGameLead, 
		aboutGameContent, aboutDevDT, aboutDevDD, 
		gitButton, linkedButton, copyrightDT, 
		copyrightDD, imageSrcDD, tumblrButton);
	$('#gameInfoModal .modal-body').append(aboutDescription);
	$('#gameInfoModalTitle').text('about the game');
}
/***************************
instructionModalToggle -> 
param: none
return: none
descpt: dynamically create content for instruction modal when clicked 
*/
function instructionModalToggle(){
	const initialScreenDT = $('<dt>',{
		class: 'instructionDT',
		text: 'the initial screen:'
	});
	const initialSpan1 = $('<span>').text('Players will take turns choosing ');
	const initialSpan2 = $('<span>').text('three characters').css('color','red');
	const initialSpan3 = $('<span>').text(' of his or her choice; player turn will alternate and will be indicated on the right side of the screen.');
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
/***************************
randIntroImg -> 
param: none
return: none
descpt: intro page image slider starter
*/
function randIntroImg(){
	// $('.introImgDiv').velocity('slideDown',{duration:1200, loop:true}).velocity('slideUp',{delay: 4800, duration:1200, loop:true})
	imgInterval = setInterval(()=>{
		const randImg = Math.floor(Math.random()*imgArr.length);
		$('.introImgDiv').hide('slide',{direction:'left'},1100,()=>{
			$('.introImgDiv').css({
				'background': `url(${bgImgPath}${imgArr[randImg]})`,
				'background-repeat': 'no-repeat',
				'background-size': 'contain',
				'background-position': 'center'
			});
			$('.introImgDiv').show('slide',{direction:'right'}, 1100);
		});
	},5000);
}
/***************************
scroller -> 
param: id of dom element id ('string') without '#'
return: none
descpt: scrollspy function scroll page to provided dom id page
*/
function scroller(screenID){	//will be either #gamePageMain or #introPageMain
	if(screenID == 'introPageMain'){
		$('#introPageMain').removeClass('container-none');
		$('html, body').scrollTop($('#gamePageMain').offset().top);
	}else if(screenID == 'gamePageMain'){
		$('#gamePageMain').removeClass('container-none');
	}
	$(`#${screenID}`).velocity('scroll',{
		duration: 800,
		complete: ()=>{
			if(screenID == 'introPageMain'){
				$('#gamePageMain').addClass('container-none');
			}else if(screenID == 'gamePageMain'){
				$('#introPageMain').addClass('container-none');
			}
		}
	});
}
