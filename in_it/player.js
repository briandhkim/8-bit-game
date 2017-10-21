//player object
/*
using reload and using healthpack counts as turn. afterwards change to opponent 
*/

function Player(uiUpdater, game){
	let this_ = this; //will likely need to use this for DOM stuff. e.g. updating console, player menu options etc.
	let uiUp = uiUpdater;
	let gameObj = game;
	//this.name //at this time, the name will likely stay player 1 || player 2
	this.characterArr = [];
	// this.currentCharacter = null;   //will be single chracter from characterArr
	
	var char_iterator = 0;
	this.charactersAlive = 3; //check characters alive
	var max_char_num = 3; //maximum number of characters in storage; may increase to 4 in future

	this.healthPackCount = 5;
	this.healthPack = 75; 
	//large helath packs restore 250, small 75.
	//may change to small and larget health pack in future with different count value;
	this.activeCharacterTracker = 0;
	this.activeCharacter = null;

	this.addCharacter = function(selectedCharacter){		//pass in the character object based on what was selected
		//will likely use click handler attached to the character list item in the inital selection page
		this.activeCharacter = this.characterArr[this.activeCharacterTracker];
		if(char_iterator < max_char_num){	//condition check. can't create more characters alive then max allowed 
			this.characterArr[char_iterator] = new Character(selectedCharacter);
			char_iterator++;
		}else{
			console.log('check addCharacter in player obj');
		}
	};
	this.changeCharacter = function(charChosen){	//changing character function
		if(this.characterArr[charChosen].alive && this.activeCharacterTracker!==charChosen){ 	//check if character chosen is alive
			this.activeCharacterTracker = charChosen;
			this.activeCharacter = this.characterArr[this.activeCharacterTracker]; //this line might not be necessary
			uiUp.changeCharacterUpdate(this_,gameObj.currentPlayerTurn);//call ui update function
			gameObj.changePlayerTurn();
		}else{
			// console.log('update console to ask for different character');
			const consoleMsg = "You can't select this character..."
			uiUp.updateConsoleCustomMsg(consoleMsg);
		}
	};
	this.eliminatedCharSwap = function(charChosen){
		if(this.characterArr[charChosen].alive && this.activeCharacterTracker!==charChosen){ 	//check if character chosen is alive
			this.activeCharacterTracker = parseInt(charChosen);	//need to parse other wise causes char swap check error on next turn
			this.activeCharacter = this.characterArr[this.activeCharacterTracker]; //this line might not be necessary
		}else{
			console.log('error eliminatedCharSwap function player');
			// const consoleMsg = "You can't select this character..."
			// uiUp.updateConsoleCustomMsg(consoleMsg);
		}
	};
	this.useHealthPack = function(){	//using helathpack item function
		if(this.healthPackCount >0){
			this.activeCharacter.addHP(this.healthPack); //addHP takes amount of hp to add
			this.healthPackCount--;
			//need to call healthPack count update ui
		}else{
			console.log('console message saying no health pack available');
		}
	};
	this.reload = function(){
		this.activeCharacter.reload();
		console.log('console message saying the current character reloaded');
	};
	this.skillSelected = function(skillNum){
		//takes in the skill number (0-3)
		/*checking skill pp is done at skillobject level
		so it's likely safe to just call the function at character
		 level that calls the skill use function at skill object
		 skills held in an array inside character object - 0 indexed
		 need to decide where to update console with pp change etc.*/
		 return this.activeCharacter.useSkill(skillNum);
		 //skill use function returns damage value
		 //still needs to work on accounting for heal/attk thing
	};

};