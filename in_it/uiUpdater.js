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
	};

	//only changes player ui options area (next to console)
	this.turnChangeLoadUpdate = function(player, playerTurnNum){	//doesn't animate the character image
		let charInPlay = player.activeCharacter;
		// this.loadCurrentCharName(charInPlay, playerTurnNum);
		// this.loadCurrentCharHP(charInPlay, playerTurnNum);
		this.loadAttackMoveList(charInPlay.skillArr);
		this.loadHealthPackCount(player.healthPackCount);
		this.loadPlayerCharacterList(player.characterArr);
	};

	//changes character name area, character image, health
	//used when a character is eliminated
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
 			// $('.player2_currentChar_hpArea .progress-bar').css('width', hpBar+'%');
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
 			// $('.player1_currentChar_hpArea .progress-bar').css('width', hpBar+'%');
 		}
 	};

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
	param: 
	return: 
	descpt: 
 	*/
 	this.loadHealthPackCount = function(hPackCount){
 		$('#item_healthPack_counter').text(hPackCount);
 	};	


 	/****game play updates****/

 	this.updateConsoleCustomMsg = function(msgString){
 		let updateMsg = $('<li>',{
 			text: msgString
 		});
 		$('.consoleMsgList').prepend(updateMsg);
 	};
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

 	this.updateConsoleMessageTurnChange = function(currentPlayerTurn){
 		let turnMsgString = 'Player '+(currentPlayerTurn+1)+"'s turn";
 		let turnChangeMsg = $('<li>',{
 			text: 'Player '+ (currentPlayerTurn+1) +"'s turn"
 		});
 		$('.consoleMsgList').prepend(turnChangeMsg);
 	};	

 	this.clearConsoleMessage = function(){
 		$('.consoleMsgList li').remove();
 		$('.consoleMsgListPrevTurn li').remove();
 	};
 	/*****end of game play updates *****/
}