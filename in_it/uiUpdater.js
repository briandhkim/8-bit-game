function UIupdater(){
	
	/*** ui updates for main game area ***/
	this.characterLoadUpdate = function(player, playerTurnNum){
		let charInPlay = player.activeCharacter;
		this.loadCurrentCharName(charInPlay, playerTurnNum);
		this.loadCurrentCharImage(charInPlay, playerTurnNum);
		this.loadCurrentCharHP(charInPlay, playerTurnNum);
		this.loadAttackMoveList(charInPlay.skillArr);
		this.loadHealthPackCount(player.healthPackCount);
		this.loadPlayerCharacterList(player.characterArr);
	}

	/***************************
	updateCurrentCharName -> 
	param: selectedChar -> currentCharacter from player object (activeCharacter)
			playerTurnNum -> either 0 or 1 depending on the turn of current player
	return: nothing
	descpt: update character name area of corresponding player area
			selectedChar.name  --> name of the character selected (string)
	*/
	this.loadCurrentCharName = function(selectedChar, playerTurnNum){
		// 0 - player 1, 1 - player 2; 
		if(playerTurnNum){	
			$('.player2_currentChar_name').text(selectedChar.name);
		}else{
			$('.player1_currentChar_name').text(selectedChar.name);
		}
	};
	/***************************
	updatecurrentCharImage -> 
	param: selectedChar -> current character of player from player object (activeCharacter)
	return: nothing
	descpt: update .player[i]_charImg element backround url
	e.g. uiUpdate.updateCurrentCharImage(player1.activeCharacter, 0)
 	*/
 	this.loadCurrentCharImage = function(selectedChar, playerTurnNum){
 		if(playerTurnNum){
 			$('.player2_charImg').css('background-image','url('+selectedChar.gameImage+')');
 		}else{
 			$('.player1_charImg').css('background-image','url('+selectedChar.gameImage+')');
 		}
 	};
 	/***************************
	 -> 
	param: 
	return: 
	descpt: 
 	*/
 	this.loadCurrentCharHP = function(selectedChar, playerTurnNum){
 		if(playerTurnNum){
 			$('.player2_currentChar_hpArea .currentHP').text(selectedChar.hp);
 			$('.player2_currentChar_hpArea .maxHP').text(selectedChar.hpMax);
 			let hpBar = Math.round((selectedChar.hp/selectedChar.hpMax)*100);
 			$('.player2_currentChar_hpArea .progress-bar').css('width', hpBar+'%');
 		}else{
 			$('.player1_currentChar_hpArea .currentHP').text(selectedChar.hp);
 			$('.player1_currentChar_hpArea .maxHP').text(selectedChar.hpMax);
 			let hpBar = Math.round((selectedChar.hp/selectedChar.hpMax)*100);
 			$('.player1_currentChar_hpArea .progress-bar').css('width', hpBar+'%');
 		}
 	}
	/***************************
	loadAttackMoveList -> 
	param: array containing skills (skillArr in character obj)
	return: nothing
	descpt: update ul of attack list (under .skillList element in html)
	called at player turn change and game start
	*/
	this.loadAttackMoveList = function(skillsArr){
		let skills = skillsArr;
		//skills[i].name  -> name of skill (string)
		for(var i = 0; i<skills.length; i++){
			$('#skill_'+(i+1)+'_name').text(skills[i].name);
			$('#skill_'+(i+1)+'_ppUpdate').text(skills[i].pp);
			$('#skill_'+(i+1)+'_ppMax').text(skills[i].ppMax);
		}
	};
	/***************************
	loadPlayerCharacterList -> 
	param: 
	return: 
	descpt: 
 	*/
	this.loadPlayerCharacterList = function(characterArr){
		for(var i=0; i<characterArr.length; i++){
			$('#playerChar_'+(i+1)+' .playerCharListIcon').attr('src', characterArr[i].characterIcon);
			$('#playerChar_'+(i+1)+' .playerCharName').text(characterArr[i].name);
		}
	};
	/***************************
	loadHealthPackCount -> 
	param: 
	return: 
	descpt: 
 	*/
 	this.loadHealthPackCount = function(hPackCount){
 		$('#item_healthPack_counter').text(hPackCount);
 	};	


 	/****game play updates****/

 	/***************************
	updateConsoleMessage -> 
	param: player active char name (string),
			 skill/item/character change used (string)
	return: nothing
	descpt: append message to console area of player action
 	*/
 	this.updateConsoleMessage = function(currentPlayerChar, playerMove){
 		let currentPlayerCharacter = currentPlayerChar;
 		let currentPlayerMove = playerMove;
 		let updateList = $('<li>',{
 			text: currentPlayerCharacter + " used " + currentPlayerMove +"!"
 		});
 		$('.consoleMsgList').prepend(updateList);
 	}
 	/*****end of game play updates *****/
}