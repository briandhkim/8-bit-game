function Game(uiUpdater){
    const uiUp = uiUpdater;     //uiUpdater Object
    this.playersInGame = [];        // will always have 2
    this.currentPlayerTurn = 0;     // 0 --player1 ||| 1 --player2 (since playersInPlay is 0 indexed)
    let player1 = null;
    let player2 = null;
    let prevTurnMsgElimination = null;
    let prevTurnMsg = null;
    this.buttonDisable = true;
    /***************************
    gameInitiated -> 
    param: none
    return: none
    descpt: creates new players and adds the objects to playersInGame array
            called when Game object is created
    */
    this.gameInitiated = function(){
        player1 = new Player();
        player2 = new Player();
        this.playersInGame[0] = player1;
        this.playersInGame[1] = player2;
        // console.log(this_.playersInGame);
    }.bind(this)();    /*****!!! called when Game object is created !!!*****/

    /***************************
    addCharacterToPlayer -> 
    param: player --> e.g. game.playersInGame[currentPlayerTurn]
            characterObj --> e.g. ana (object from characterStats.js)
    return: nothing
    descpt: adds a new character to player
    */
    this.addCharacterToPlayer = function(player, characterObj){
        player.addCharacter(characterObj);
    };

    /***************************
    gameStart -> 
    param: none
    return: none
    descpt: calls uiUpdate function for each character images at game start
    */
    this.gameStart = function(){
        uiUp.characterLoadUpdate(player2, 1);
        uiUp.characterLoadUpdate(player1, 0);
        this.buttonDisable = false;
    };
    /***************************
    buttonTimeout -> 
    param:  none
    return: none
    descpt: disable all buttons and click handlers during skill animation timeout
    */
    this.buttonTimeout = function(){
        uiUp.buttonOff();
        this.buttonDisable = true;
    };
    /***************************
    buttonRebind -> 
    param:  none
    return: none
    descpt: rebind all buttons and click handlers after skill animation timeout
    */
    this.buttonRebind = function(){
        uiUp.buttonOn();
        this.buttonDisable = false;
        uiUp.removeAnimationClass();
    }.bind(this);
    /***************************
    changePlayerTurn -> 
    param: none
    return: none
    descpt: changes player turn; called when character uses skill/item/change char 
    */
    this.changePlayerTurn = function(){
        this.currentPlayerTurn = 1-this.currentPlayerTurn;
        uiUp.turnChangeLoadUpdate(this.playersInGame[this.currentPlayerTurn], this.currentPlayerTurn);
        uiUp.clearConsoleMessage();
        uiUp.updatePrevTurnMsg(prevTurnMsg);
        if(prevTurnMsgElimination){
            uiUp.updatePrevTurnMsg(prevTurnMsgElimination);
        }
        uiUp.updateConsoleMessageTurnChange(this.currentPlayerTurn);
        prevTurnMsg = null;
        prevTurnMsgElimination = null;
        if(this.currentPlayerTurn&&$(window).innerWidth()>767){
            uiUp.consoleSwitch(1);
            return;
        }else if($('.consoleMessage').hasClass('consoleMessageP2')){
            uiUp.consoleSwitch(0);
            return;
        }
    };
    /***************************
    turnChangeChar -> 
    param: player --> e.g. game.playersInGame[currentPlayerTurn]
            characterNum --> value grabbed from available character 
                    list in html li element when clicked
    return: nothing
    descpt: changes player character. calls changeCharacterFunction in player object
    */
    this.turnChangeChar = function(characterNum){
        const charChangeCheck = this.playersInGame[this.currentPlayerTurn].changeCharacter(characterNum);
        const currentPlayer = this.playersInGame[this.currentPlayerTurn];
        if(charChangeCheck){
            prevTurnMsg = `Player ${this.currentPlayerTurn+1} switched to ${currentPlayer.activeCharacter.name}`;
            uiUp.changeCharacterUpdate(currentPlayer, this.currentPlayerTurn);
            this.changePlayerTurn();
        }else{
            const consoleMsg = "You can't select this character...";
            uiUp.updateConsoleCustomMsg(consoleMsg);
        }
    };
    /***************************
    turnSkillChar -> 
    param: (int) 0-3, skill array iterator based on player selection
    return: none
    descpt: called when player selects a skill to use. 
    */
    this.turnSkillChar = function(skillNum){
        this.buttonTimeout();
        let selectedSkill = this.playersInGame[this.currentPlayerTurn].activeCharacter.skillArr[skillNum];
        if(selectedSkill.pp<=0){
            uiUp.updateConsoleCustomMsg("No more pp for this skill...");
            this.buttonRebind();
            return;
        }
        let skillName = this.playersInGame[this.currentPlayerTurn].activeCharacter.skillArr[skillNum].name;
        let charName = this.playersInGame[this.currentPlayerTurn].activeCharacter.name;
        let skillOutput = this.playersInGame[this.currentPlayerTurn].skillSelected(skillNum);
        //skillOutput =array [0]:heal/damage val  [1]:heal true||false
        prevTurnMsg = charName +" used " + skillName +"!";
        if(!skillOutput[1]){
            uiUp.attkAnimation(this.currentPlayerTurn);
            setTimeout(this.buttonRebind,950);

            const opponentNum = 1-this.currentPlayerTurn;
            //if currentPlayerTurn=1, opponentNum=0 else cPT=0, oppNum=1
            const opponentPlayer = `player${opponentNum+1}`;
            setTimeout(function(){
                uiUp.receiveHitAnimation(opponentPlayer);
            },170);
            this.playersInGame[opponentNum].activeCharacter.takeDamage(skillOutput[0][0]);
            uiUp.currentCharDamageTakeHP(this.playersInGame[opponentNum].activeCharacter, opponentPlayer);
            if(this.checkCharDead(this.playersInGame[opponentNum].activeCharacter)){    //checking hcaracter elimination status
                prevTurnMsgElimination = this.playersInGame[opponentNum].activeCharacter.name +" was eliminated!";
                setTimeout(function(){
                    this.deadCharSwap(this.playersInGame[opponentNum], opponentNum);    //swaping out eliminated char  
                }.bind(this),900);
                return;
            }
            this.changePlayerTurn();
        }else if(skillOutput[1]){
            this.buttonRebind();
            this.playersInGame[this.currentPlayerTurn].activeCharacter.addHP(skillOutput[0]);
            const targetPlayer = `player${this.currentPlayerTurn+1}`;
            uiUp.currentCharDamageTakeHP(this.playersInGame[this.currentPlayerTurn].activeCharacter, targetPlayer);
            this.changePlayerTurn();
        }
    };
    /***************************
    checkCharDead -> 
    param: character object
    return: bool
    descpt: returns false if character is alive; true if dead
    */
    this.checkCharDead = function(character){
        return !character.alive;
    };
    /***************************
    deadCharSwap -> 
    param: player object, player turn (int)
    return: none
    descpt: calls gameOver function if player's characters are 
        eliminated. otherwise select the next available character
        and swaps active character
    */
    this.deadCharSwap = function(player, playerTurnNum){
        player.charactersAlive--;
        if(player.charactersAlive===0){
            // console.log('game over');
            gameOver(playerTurnNum);
        }else if(player.charactersAlive>0){
            for (var char in player.characterArr){
                if(player.characterArr[char].alive){
                    player.eliminatedCharSwap(char);
                    uiUp.changeCharacterUpdate(player, playerTurnNum);
                    this.changePlayerTurn();
                    return;
                }
            }
        }else{
            console.log("error at deadCharSwap in gameObj");
        }
        
    };
    /***************************
    turnUseHealthPack -> 
    param: none
    return: none
    descpt: called when player uses health pack for the turn; changes 
        turn after using the healthpack; displays message in console
        if none are available
    */
    this.turnUseHealthPack = function(){
        const currentPlayer = this.playersInGame[this.currentPlayerTurn];
        if(currentPlayer.healthPackCount!==0){
            currentPlayer.activeCharacter.addHP(currentPlayer.healthPack);
            const targetPlayer = `player${this.currentPlayerTurn+1}`;
            uiUp.currentCharDamageTakeHP(currentPlayer.activeCharacter, targetPlayer);
            currentPlayer.healthPackCount--;
            prevTurnMsg = currentPlayer.activeCharacter.name + " used Health Pack!";
            this.changePlayerTurn();
        }else{
            uiUp.updateConsoleCustomMsg("No more health packs...");
        }
    };
    /***************************
    turnReload -> 
    param: none
    return: none
    descpt: calls relaod function for active character; calls player
        turn change function after
    */
    this.turnReload = function(){
        const currentPlayerChar = this.playersInGame[this.currentPlayerTurn].activeCharacter;
        prevTurnMsg = currentPlayerChar.name + " reloaded!";
        currentPlayerChar.reload();
        this.changePlayerTurn();
    };
}