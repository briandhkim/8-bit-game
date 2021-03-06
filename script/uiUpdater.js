function UIupdater(){
	/*** ui updates for main game area ***/
	/***************************
	characterLoadUpdate -> 
	param: player object, (int) player turn number
	return: none
	descpt: updates character image area, name, hp bar, skill list,
		item list, player character list
 	*/
	this.characterLoadUpdate = function(player, playerTurnNum){
		let charInPlay = player.activeCharacter;
		const targetPlayer = `player${playerTurnNum+1}`;
		this.loadCurrentCharName(charInPlay, targetPlayer);
		this.loadCurrentCharImage(charInPlay, playerTurnNum);
		this.loadCurrentCharHP(charInPlay, targetPlayer);
		this.loadAttackMoveList(charInPlay.skillArr);
		this.loadHealthPackCount(player.healthPackCount);
		this.loadPlayerCharacterList(player.characterArr);
		this.statUpdate(charInPlay);
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
		this.loadAttackMoveList(charInPlay.skillArr);
		this.loadHealthPackCount(player.healthPackCount);
		this.loadPlayerCharacterList(player.characterArr);
		this.statUpdate(charInPlay);
	};

	/***************************
	changeCharacterUpdate -> 
	param: player object, (int) player turn number)
	return: none
	descpt: changes character name area, image, hp bar; used
		when a character is eliminated/when player changes char
 	*/
	this.changeCharacterUpdate = function(player, playerTurnNum){
		let charInPlay = player.activeCharacter;
		const targetPlayer = `player${playerTurnNum+1}`;
		this.loadCurrentCharName(charInPlay, targetPlayer);
		this.loadCurrentCharImage(charInPlay, playerTurnNum);
		this.loadCurrentCharHP(charInPlay, targetPlayer);
	};
	/***************************
	updateCurrentCharName -> 
	param: selectedChar -> currentCharacter from player object (activeCharacter)
			targetPlayer -> part of class selector specifying the target player character
			to update
	return: nothing
	descpt: update character name area of corresponding player area
			selectedChar.name  --> name of the character selected (string)
	*/
	this.loadCurrentCharName = function(selectedChar, targetPlayer){
		$(`.${targetPlayer}_currentChar_name`).text(selectedChar.name);
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
 			$('.player2_charImg').velocity({'left': '-=175px'},1200);
 			return;
 		}else{
 			$('.player1_charImg').css({
 				'background-image': 'url('+selectedChar.gameImage+')',
 				'left': '-175px'
 			});
 			$('.player1_charImg').velocity({'left':'+=175px'},1200);
 			return;
 		}
 	};
 	/***************************
	loadCurrentCharHP -> 
	param: character object, (string) player1 or player2
	return: none
	descpt: updates hp bar of the passed in character
 	*/
 	this.loadCurrentCharHP = function(selectedChar, targetPlayer){
 		$(`.${targetPlayer}_currentChar_hpArea .currentHP`).text(selectedChar.hp);
 		$(`.${targetPlayer}_currentChar_hpArea .maxHP`).text(selectedChar.hpMax);
 		const hpBar = Math.round((selectedChar.hp/selectedChar.hpMax)*100);
 		if(hpBar <20){
			$(`#${targetPlayer}_charHealthBar`).removeClass('progress-bar-warning progress-bar-success').addClass('progress-bar-danger');
		}else if(hpBar>=20 && hpBar <55){
			$(`#${targetPlayer}_charHealthBar`).removeClass('progress-bar-danger progress-bar-success').addClass('progress-bar-warning');
		}else if(hpBar>= 55){
			$(`#${targetPlayer}_charHealthBar`).removeClass('progress-bar-danger progress-bar-warning').addClass('progress-bar-success');
		}
		$(`#${targetPlayer}_charHealthBar`).css({
			'width': hpBar+'%'
		});
 	};
 	/***************************
	currentCharDamageTakeHP -> 
	param: character object, (int) player turn number
	return: none
	descpt: updates character hp bar if damage is taken
 	*/
 	this.currentCharDamageTakeHP=function(selectedChar, targetPlayer){
 		$(`.${targetPlayer}_currentChar_hpArea .currentHP`).text(selectedChar.hp);
		const hpBar = Math.round((selectedChar.hp/selectedChar.hpMax)*100);
		if(hpBar <20){
			$(`#${targetPlayer}_charHealthBar`).removeClass('progress-bar-warning progress-bar-success').addClass('progress-bar-danger');
		}else if(hpBar>=20 && hpBar <55){
			$(`#${targetPlayer}_charHealthBar`).removeClass('progress-bar-danger progress-bar-success').addClass('progress-bar-warning');
		}else if(hpBar>= 55){
			$(`#${targetPlayer}_charHealthBar`).removeClass('progress-bar-danger progress-bar-warning').addClass('progress-bar-success');
		}
		$(`#${targetPlayer}_charHealthBar`).css({
			'width' : hpBar+'%'
		});
 	};
 	/***************************
	attkAnimation -> 
	param:  player turn number (int)
	return: none
	descpt: add attack animation class to character in turn
 	*/
 	this.attkAnimation = function(playerTurnNum){
 		if(playerTurnNum){
 			$('.player2_charImgArea').addClass('p2_attk');
 		}else{
 			$('.player1_charImgArea').addClass('p1_attk');
 		}
 	};
 	/***************************
	receiveHitAnimation -> 
	param: target player (string)
	return: none
	descpt: add receive hit animation to character receiving hit
 	*/
 	this.receiveHitAnimation = function(targetPlayer){
 		$(`.${targetPlayer}_charImgArea`).addClass('got_hit');
 	};
 	/***************************
	removeAnimationClass -> 
	param: none
	return: none
	descpt: remove all animation classes after turn finishes
 	*/
 	this.removeAnimationClass = function(){
 		$('.player1_charImgArea').removeClass('p1_attk got_hit');
 		$('.player2_charImgArea').removeClass('p2_attk got_hit');
 	};
	/***************************
	loadAttackMoveList -> 
	param: array containing skills (skillArr in character obj)
	return: nothing
	descpt: update ul of attack list (under .skillList element in html)
	called at player turn change and game start
	*/
	this.loadAttackMoveList = function(skillsArr){
		let skills = skillsArr;
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
 	/***************************
	statUpdate -> 
	param: character object
	return: none
	descpt: updates the character skill stats based on player turn
 	*/
 	this.statUpdate = function(selectedChar){
		let character = selectedChar;
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
	consoleSwitch -> 
	param: pNum(int) 1 if player2 orientation; 0 if player1 orientation
	return: none
	descpt: changes game console to player 2 orientation
	*/
	this.consoleSwitch = function(pNum){
		if(pNum){
			$('.consoleMessage').addClass('consoleMessageP2');
	        $('.skillList').addClass('skillListP2');
	        $('.changeCharList').addClass('changeCharListP2');
	        $('.useList').addClass('useListP2');
	        $('.statsSquare').addClass('statsSquareP2');
		}else{
			$('.consoleMessage').removeClass('consoleMessageP2');
	        $('.skillList').removeClass('skillListP2');
	        $('.changeCharList').removeClass('changeCharListP2');
	        $('.useList').removeClass('useListP2');
	        $('.statsSquare').removeClass('statsSquareP2');
		}
	};
	/***************************
	buttonOff -> 
	param: none
	return: none
	descpt: disables game button click handlers
	*/
	this.buttonOff = function(){
		$('.moveOptionSkills').off('click');
		$('.moveOptionChangeChar').off('click');
		$('.moveOptionUse').off('click');
		$('.moveOptionRageQuit').off('click', rageQuitOpt);
	};
	/***************************
	buttonOn -> 
	param: none
	return: none
	descpt: reenables game button click handlers
	*/
	this.buttonOn = function(){
		$('.moveOptionSkills').on('click',()=>{
            $('.tracker').remove();
            skillMenuClick();
        });
        $('.moveOptionChangeChar').on('click',()=>{
            $('.tracker').remove();
            charOptClick();
        });
        $('.moveOptionUse').on('click',()=>{
            $('.tracker').remove();
            useOptClick();
        });
        $('.moveOptionRageQuit').on('click',rageQuitOpt);
	};
	/***************************
	gameEndClear -> 
	param: none
	return: none
	descpt: resets game area ui area after game end
 	*/
	this.gameEndClear = function(){
		if($('.consoleMessage').hasClass('consoleMessageP2')){
	        $('.consoleMessage').removeClass('consoleMessageP2');
	        $('.skillList').removeClass('skillListP2');
	        $('.changeCharList').removeClass('changeCharListP2');
	        $('.useList').removeClass('useListP2');
	        $('.statsSquare').removeClass('statsSquareP2');
	    }
	    $('.consoleMsgList li').remove();
 		$('.consoleMsgListPrevTurn li').remove();
 		const resetConsoleLi = $('<li>').text("Player 1's turn");
 		$('.consoleMsgList').append(resetConsoleLi);
	};
 	/*****end of game play updates *****/
}