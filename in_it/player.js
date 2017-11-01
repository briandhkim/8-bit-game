
function Player(uiUpdater, game){
	let this_ = this; //will likely need to use this for DOM stuff. e.g. updating console, player menu options etc.
	let uiUp = uiUpdater;
	let gameObj = game;
	//this.name //at this time, the name will likely stay player 1 || player 2
	this.characterArr = [];
	
	let char_iterator = 0;
	this.charactersAlive = 3; //check characters alive
	const max_char_num = 3; //maximum number of characters in storage; may increase to 4 in future

	this.healthPackCount = 5;
	this.healthPack = 75; 
	//large helath packs restore 250, small 75.
	//may change to small and larget health pack in future with different count value;
	this.activeCharacterTracker = 0;
	this.activeCharacter = null;

	/***************************
	addCharacter -> 
	param: character object
	return: nothing
	descpt: create/add new character selected by player to character array
 	*/
	this.addCharacter = function(selectedCharacter){	
		this.activeCharacter = this.characterArr[this.activeCharacterTracker];
		if(char_iterator < max_char_num){	
			this.characterArr[char_iterator] = new Character(selectedCharacter);
			char_iterator++;
		}else{
			console.log('error addCharacter in player obj');
		}
	};

	/***************************
	changeCharacter -> 
	param: (int) 0-2, invoked if player selects changing character option
	return: none
	descpt: if character can be swapped, changes character and calls player turn change
		function and ui update function ; otherwise calls ui update to display
		option unselectable message
 	*/
	this.changeCharacter = function(charChosen){	//changing character function
		if(this.characterArr[charChosen].alive && this.activeCharacterTracker!==charChosen){ 	//check if character chosen is alive
			this.activeCharacterTracker = charChosen;
			this.activeCharacter = this.characterArr[this.activeCharacterTracker]; //this line might not be necessary
			uiUp.changeCharacterUpdate(this_,gameObj.currentPlayerTurn);//call ui update function
			gameObj.changePlayerTurn();
		}else{
			const consoleMsg = "You can't select this character...";
			uiUp.updateConsoleCustomMsg(consoleMsg);
		}
	};

	/***************************
	eliminatedCharSwap -> 
	param: (int) 0-2, invoked if a player's character dies 
	return: none
	descpt: invoked when a player's character dies and swaps active character
 	*/
	this.eliminatedCharSwap = function(charChosen){
		if(this.characterArr[charChosen].alive && this.activeCharacterTracker!==charChosen){ 	//check if character chosen is alive
			this.activeCharacterTracker = parseInt(charChosen);	//need to parse other wise causes char swap check error on next turn
			this.activeCharacter = this.characterArr[this.activeCharacterTracker]; 
		}else{
			console.log('error eliminatedCharSwap function player');
		}
	};

	/***************************
	useHealthPack -> 
	param: none
	return: none
	descpt: checks player healthPack count and adds hp to active character;
		*****not used at this time
 	*/
	this.useHealthPack = function(){	//using helathpack item function
		if(this.healthPackCount >0){
			this.activeCharacter.addHP(this.healthPack); //addHP takes amount of hp to add
			this.healthPackCount--;
			//need to call healthPack count update ui
		}else{
			console.log('error at useHealthPack in player object; healthpack count check did not work in game object');
		}
	};

	/***************************
	reload -> 
	param: none 
	return: none
	descpt: invokes reload function for active character
 	*/
	this.reload = function(){
		this.activeCharacter.reload();
		console.log('console message saying the current character reloaded');
	};

	/***************************
	skillSelected -> 
	param: (int) 0-3, skill selected by player
	return: (array) 0-heal/damage output 1-bool, true if heal skill false if attk
	descpt: called when player selects a skill option for the turn
 	*/
	this.skillSelected = function(skillNum){
		 return this.activeCharacter.useSkill(skillNum);
	};

};