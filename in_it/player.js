//player object
/*
using reload and using healthpack counts as turn. afterwards change to opponent 
*/

function Player(){
	this.self = this; //will likely need to use this for DOM stuff. e.g. updating console, player menu options etc.

	//this.name //at this time, the name will likely stay player 1 || player 2
	this.character_1 = null;
	this.character_2 = null;
	this.character_3 = null; 
	this.characterArr = [character_1, character_2, character_3];
	var char_iterator = 0;
	this.charactersAlive = 3; //may increase characters available to 4 in future

	this.healthPackCount = 5;
	this.healthPack = 75; 
	//large helath packs restore 250, small 75.
	//may change to small and larget health pack in future with different count value;
	this.activeCharacterTracker = 0;
	this.activeCharacter = characterArr[activeCharacterTracker];

	this.chooseCharacter = function(selectedCharacter){		//pass in the character object based on what was selected
		//will likely use click handler attached to the character list item in the inital selection page
		if(char_iterator < self.charactersAlive){	//condition check. can't create more characters alive then max allowed 
			self.characterArr[char_iterator] = new Character(selectedCharacter);
			char_iterator++;
		}
	};
	this.changeCharacter = function(charChosen){	//changing character function
		if(self.characterArr[charChosen].alive){ 	//check if character chosen is alive
			self.activeCharacterTracker = charChosen;
			self.activeCharacter = self.characterArr[self.activeCharacterTracker]; //this line might not be necessary
			//call ui update function
		}else{
			console.log('update console to ask for different character');
		}
	};
	this.useHealthPack = function(){	//using helathpack item function
		if(healthPackCount >0){
			self.activeCharacter.addHP(self.healthPack); //addHP takes amount of hp to add
			self.healthPackCount--;
		}else{
			console.log('console message saying no health pack available');
		}
	};
	this.reload = function(){
		self.activeCharacter.reload();
		console.log('console message saying the current character reloaded');
	};
	this.skillSelected = function(skillNum){
		//takes in the skill number (0-3)
		/*checking skill pp is done at skillobject level
		so it's likely safe to just call the function at character
		 level that calls the skill use function at skill object
		 skills held in an array inside character object - 0 indexed
		 need to decide where to update console with pp change etc.*/
		 return self.activeCharacter.useSkill(skillNum);
		 //skill use function returns damage value
		 //still needs to work on accounting for heal/attk thing
	};

};