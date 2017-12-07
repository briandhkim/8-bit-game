function UIupdater(){
	/*** ui updates for main game area ***/
	this.bannerUpdate = function(selectedChar){
		let character = selectedChar;
		$('.gBannerNameCol').text(character.name);
		// let skillNum = 1;
		skillArr = character.skillArr;
		skillArr.forEach((skill, idx)=>{
			const banner = `.gStatSkill${idx+1}`;
			$(`${banner} .skillName`).text(skill.name);
			if(skill.heal){
				$(`${banner} .skillAttr`).text(` - HEAL:${skill.heal}hp`);
			}else{
				$(`${banner} .skillAttr`).text(` - DMG:${skill.damage} | ACC:${skill.skillAccuracy}%`)
			}
		});
	};	

	/***************************
	characterLoadUpdate -> 
	param: player object, (int) player turn number
	return: none
	descpt: updates character image area, name, hp bar, skill list,
		item list, player character list
 	*/
	this.characterLoadUpdate = function(player, playerTurnNum){
		let charInPlay = player.activeCharacter;
		this.loadCurrentCharName(charInPlay, playerTurnNum);
		this.loadCurrentCharImage(charInPlay, playerTurnNum);
		this.loadCurrentCharHP(charInPlay, playerTurnNum);
		this.loadAttackMoveList(charInPlay.skillArr);
		this.loadHealthPackCount(player.healthPackCount);
		this.loadPlayerCharacterList(player.characterArr);
		this.bannerUpdate(charInPlay);
	};

	/***************************
	turnChangeLoadUpdate -> 
	param: player object, (int) player turn number
	return: none
	descpt: only changes player ui options area - ie. player turn
		options: skills, change char, item list
 	*/
	this.turnChangeLoadUpdate = function(player, playerTurnNum){	//doesn't animate the character image
		let charInPlay = player.activeCharacter;
		// this.loadCurrentCharName(charInPlay, playerTurnNum);
		// this.loadCurrentCharHP(charInPlay, playerTurnNum);
		this.loadAttackMoveList(charInPlay.skillArr);
		this.loadHealthPackCount(player.healthPackCount);
		this.loadPlayerCharacterList(player.characterArr);
		this.bannerUpdate(charInPlay);
	};

	/***************************
	changeCharacterUpdate -> 
	param: player object, (int) player turn number)
	return: none
	descpt: changes character name area, image, hp bar; used
		when a character is eliminated
 	*/
	this.changeCharacterUpdate = function(player, playerTurnNum){
		let charInPlay = player.activeCharacter;
		this.loadCurrentCharName(charInPlay, playerTurnNum);
		this.loadCurrentCharImage(charInPlay, playerTurnNum);
		this.loadCurrentCharHP(charInPlay, playerTurnNum);
	};
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
 			$('.player2_charImg').css({
 				'background-image': 'url('+selectedChar.gameImage+')',
 				'left': '175px'
 			});
 			$('.player2_charImg').animate({'left': '-=175px'},1200);
 			return;
 		}else{
 			$('.player1_charImg').css({
 				'background-image': 'url('+selectedChar.gameImage+')',
 				'left': '-175px'
 			});
 			$('.player1_charImg').animate({'left':'+=175px'},1200);
 			return;
 		}
 	};
 	/***************************
	loadCurrentCharHP -> 
	param: character object, (int) player turn number
	return: none
	descpt: updates hp bar of the passed in character
 	*/
 	this.loadCurrentCharHP = function(selectedChar, playerTurnNum){
 		if(playerTurnNum){
 			$('.player2_currentChar_hpArea .currentHP').text(selectedChar.hp);
 			$('.player2_currentChar_hpArea .maxHP').text(selectedChar.hpMax);
 			let hpBar = Math.round((selectedChar.hp/selectedChar.hpMax)*100);
 			if(hpBar <20){
 				$('#player2_charHealthBar').removeClass('progress-bar-warning progress-bar-success').addClass('progress-bar-danger');
 			}else if(hpBar>=20 && hpBar <55){
 				$('#player2_charHealthBar').removeClass('progress-bar-danger progress-bar-success').addClass('progress-bar-warning');
 			}else if(hpBar>= 55){
 				$('#player2_charHealthBar').removeClass('progress-bar-danger progress-bar-warning').addClass('progress-bar-success');
 			}
 			$('#player2_charHealthBar').css({
 				'width': hpBar+'%'
 			});
 		}else{
 			$('.player1_currentChar_hpArea .currentHP').text(selectedChar.hp);
 			$('.player1_currentChar_hpArea .maxHP').text(selectedChar.hpMax);
 			let hpBar = Math.round((selectedChar.hp/selectedChar.hpMax)*100);
 			if(hpBar <20){
 				$('#player1_charHealthBar').removeClass('progress-bar-warning progress-bar-success').addClass('progress-bar-danger');
 			}else if(hpBar>=20 && hpBar <55){
 				$('#player1_charHealthBar').removeClass('progress-bar-danger progress-bar-success').addClass('progress-bar-warning');
 			}else if(hpBar>= 55){
 				$('#player1_charHealthBar').removeClass('progress-bar-danger progress-bar-warning').addClass('progress-bar-success');
 			}
 			$('#player1_charHealthBar').css({
 				'width': hpBar+'%'
 			});
 		}
 	};
 	/***************************
	currentCharDamageTakeHP -> 
	param: character object, (int) player turn number
	return: none
	descpt: updates character hp bar if damage is taken
 	*/
 	this.currentCharDamageTakeHP=function(selectedChar, playerTurnNum){
 		if(playerTurnNum){
 			$('.player2_currentChar_hpArea .currentHP').text(selectedChar.hp);
 			let hpBar = Math.round((selectedChar.hp/selectedChar.hpMax)*100);
 			if(hpBar <20){
 				$('#player2_charHealthBar').removeClass('progress-bar-warning progress-bar-success').addClass('progress-bar-danger');
 			}else if(hpBar>=20 && hpBar <55){
 				$('#player2_charHealthBar').removeClass('progress-bar-danger progress-bar-success').addClass('progress-bar-warning');
 			}else if(hpBar>= 55){
 				$('#player2_charHealthBar').removeClass('progress-bar-danger progress-bar-warning').addClass('progress-bar-success');
 			}
 			$('#player2_charHealthBar').css({
 				'width' : hpBar+'%'
 			});
 		}else{	
 			$('.player1_currentChar_hpArea .currentHP').text(selectedChar.hp);
 			let hpBar = Math.round((selectedChar.hp/selectedChar.hpMax)*100);
 			if(hpBar <20){
 				$('#player1_charHealthBar').removeClass('progress-bar-warning progress-bar-success').addClass('progress-bar-danger');
 			}else if(hpBar>=20 && hpBar <55){
 				$('#player1_charHealthBar').removeClass('progress-bar-danger progress-bar-success').addClass('progress-bar-warning');
 			}else if(hpBar>= 55){
 				$('#player1_charHealthBar').removeClass('progress-bar-danger progress-bar-warning').addClass('progress-bar-success');
 			}
 			$('#player1_charHealthBar').css({
 				'width' : hpBar+'%'
 			});
 		}
 	};
 	this.attkAnimation = function(playerTurnNum){
 		if(playerTurnNum){
 			$('.player2_charImgArea').addClass('p2_attk');
 		}else{
 			$('.player1_charImgArea').addClass('p1_attk');
 		}
 	};
 	this.receiveHitAnimation = function(playerTurnNum){
 		if(playerTurnNum){
 			$('.player2_charImgArea').addClass('got_hit');
 		}else{
 			$('.player1_charImgArea').addClass('got_hit');
 		}
 	}
 	this.removeAnimationClass = function(){
 		$('.player1_charImgArea').removeClass('p1_attk got_hit');
 		$('.player2_charImgArea').removeClass('p2_attk got_hit');
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
	param: [array] of player's available characters
	return: none
	descpt: updates the player turn area for change character
		option list
 	*/
	this.loadPlayerCharacterList = function(characterArr){
		for(var i=0; i<characterArr.length; i++){
			$('#playerChar_'+(i+1)+' .playerCharListIcon').attr('src', characterArr[i].characterIcon);
			$('#playerChar_'+(i+1)+' .playerCharName').text(characterArr[i].name);
			let hpBar = Math.round((characterArr[i].hp/characterArr[i].hpMax)*100);
			if(hpBar <20){
 				$('#playerChar_'+(i+1)+' .progress-bar').removeClass('progress-bar-warning progress-bar-success').addClass('progress-bar-danger');
 			}else if(hpBar>=20 && hpBar <55){
 				$('#playerChar_'+(i+1)+' .progress-bar').removeClass('progress-bar-danger progress-bar-success').addClass('progress-bar-warning');
 			}else if(hpBar>= 55){
 				$('#playerChar_'+(i+1)+' .progress-bar').removeClass('progress-bar-danger progress-bar-warning').addClass('progress-bar-success');
 			}
 			$('#playerChar_'+(i+1)+' .progress-bar').css('width', hpBar+'%');
		}
	};	
	/***************************
	loadHealthPackCount -> 
	param: (int) health pack count number
	return: none
	descpt: updates player's avialable healthpack count
 	*/
 	this.loadHealthPackCount = function(hPackCount){
 		$('#item_healthPack_counter').text(hPackCount);
 	};	


 	/****game play updates****/
 	/***************************
	updateConsoleCustomMsg -> 
	param: (string) message input
	return: none
	descpt: updates game console with input message string
 	*/
 	this.updateConsoleCustomMsg = function(msgString){
 		let updateMsg = $('<li>',{
 			text: msgString
 		});
 		$('.consoleMsgList').prepend(updateMsg);
 	};
 	/***************************
	updatePrevTurnMsg -> 
	param: (string) messsage input 
	return: none
	descpt: updates game console with previous player's move selection
 	*/
 	this.updatePrevTurnMsg = function(msgString){
 		let updateMsg = $('<li>',{
 			text: msgString
 		});
 		$('.consoleMsgListPrevTurn').prepend(updateMsg);
 	};
 	/***************************
	updateConsoleMessageAttack -> 
	param: player active char name (string),
			 skill option used (string)
	return: nothing
	descpt: append message to console area of player action
 	*/
 	this.updateConsoleMessageAttack = function(currentPlayerChar, playerMove){
 		let currentPlayerCharacter = currentPlayerChar;
 		let currentPlayerMove = playerMove;
 		let updateList = $('<li>',{
 			text: currentPlayerCharacter + " used " + currentPlayerMove +"!"
 		});
 		$('.consoleMsgList').prepend(updateList);
 	};
 	/***************************
	updateConsoleMessageTurnChange -> 
	param: (int) player turn number
	return: none
	descpt: updates game console with new player turn
 	*/
 	this.updateConsoleMessageTurnChange = function(currentPlayerTurn){
 		let turnMsgString = 'Player '+(currentPlayerTurn+1)+"'s turn";
 		let turnChangeMsg = $('<li>',{
 			text: 'Player '+ (currentPlayerTurn+1) +"'s turn"
 		});
 		$('.consoleMsgList').prepend(turnChangeMsg);
 	};	

 	/***************************
	clearConsoleMessage -> 
	param: none
	return: none
	descpt: clears out game console
 	*/
 	this.clearConsoleMessage = function(){
 		$('.consoleMsgList li').remove();
 		$('.consoleMsgListPrevTurn li').remove();
 	};
 	/*****end of game play updates *****/
}