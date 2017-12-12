/*********
contains audio toggle functions, about/instruction modal toggle, intro image function, scroller function
*********/

let battleAud = new Audio('./sounds/trainer_battle_music.mp3');
battleAud.volume = 0.3;
let gameEndAud = new Audio('./sounds/victory_music_wildpoke.mp3');
gameEndAud.volume = 0.3;
let gameEndAud2 = new Audio('./sounds/victory_music.mp3');
gameEndAud2.volume = 0.3;
const bgImgPath = './images/intro/';
let imgArr = ['ana.png','bastion.png','genji.png','junkrat.png','mei.png','mercy.png','pharah.png'
	,'reaper.png','reinhardt.png','soldier.png','symmetra.png', 'torbjorn.png','tracer.png','widow.png',
	'winston.png','zarya.png','zenyatta.png'];
let imgInterval = null;
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
	}).css({
		color: 'rgba(54,70,93,0.6)',
		'font-size':'33px'
	});
	const tumblrButton = $('<a>',{
		href: 'http://chiwadesu.tumblr.com/',
		target: '_blank',
	}).css({
		position: 'relative',
		top: '7px'
	}).append(tumblrIcon);
	imageSrcDD.append(imgSrcSpan1, tumblrButton);
	const gitIcon = $('<i>',{
		class: 'fa fa-github-square fa-3x gitIcon'
	}).css({
		color: 'rgba(0, 0, 0, 0.6)',
		'font-size': '33px'
	});
	const gitButton = $('<a>',{
		href: "https://github.com/briandhkim",
		target: '_blank'
	}).append(gitIcon);
	const linkedIcon = $('<i>',{
		class: 'fa fa-linkedin-square fa-3x liIcon'
	}).css({
		margin: '0 10px',
		color: 'rgba(0, 119, 181, 0.6)',
		'font-size':'33px'
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