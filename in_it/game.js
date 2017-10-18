
function Game(uiUpdater){
    let this_ = this;
    let uiUp = uiUpdater;     //uiUpdater Object
    this.playersInGame = [];        // will always have 2
    this.currentPlayerTurn = 0;     // 0 --player1 ||| 1 --player2 (since playersInPlay is 0 indexed)
    let player1 = null;
    let player2 = null;

    /***************************
    gameInitiated -> 
    param: none
    return: none
    descpt: creates new players and adds the objects to playersInPlay array
            called when Game object is created
    */
    this.gameInitiated = function(){
        player1 = new Player(uiUp, this_);
        player2 = new Player(uiUp, this_);
        this_.playersInGame[0] = player1;
        this_.playersInGame[1] = player2;
        console.log(this_.playersInGame);
    }();    /*****!!! called when Game object is created !!!*****/

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

    this.gameStart = function(){
        uiUp.characterLoadUpdate(player2, 1);
        uiUp.characterLoadUpdate(player1, 0);
    };

    this.changePlayerTurn = function(){
        if(this.currentPlayerTurn===0){
            this.currentPlayerTurn++;
            uiUp.turnChangeLoadUpdate(this.playersInGame[this.currentPlayerTurn], this.currentPlayerTurn);
            uiUp.clearConsoleMessage();
            uiUp.updateConsoleMessageTurnChange(this.currentPlayerTurn);
            return;
        }else if(this.currentPlayerTurn===1){
            this.currentPlayerTurn--;
            uiUp.turnChangeLoadUpdate(this.playersInGame[this.currentPlayerTurn], this.currentPlayerTurn);
            uiUp.clearConsoleMessage();
            uiUp.updateConsoleMessageTurnChange(this.currentPlayerTurn);
            return;
        }else{
            console.log('changePlayerTurn error in game object');
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
        this_.playersInGame[this_.currentPlayerTurn].changeCharacter(characterNum);
    };
    
    this.turnSkillChar = function(skillNum){
        let selectedSkill = this_.playersInGame[this_.currentPlayerTurn].activeCharacter.skillArr[skillNum];
        if(selectedSkill.pp<=0){
            uiUp.updateConsoleCustomMsg("No more pp for this skill...");
            return;
        }
        let skillOutput = this_.playersInGame[this_.currentPlayerTurn].skillSelected(skillNum);
        //skillOutput =array [0]:heal/damage val  [1]:heal true||false
        // console.log(skillOutput);
        if(!skillOutput[1]){
            if(this.currentPlayerTurn===0){
                this.playersInGame[1].activeCharacter.takeDamage(skillOutput[0][0]);
                uiUp.currentCharDamageTakeHP(this.playersInGame[1].activeCharacter, 1);
                this.changePlayerTurn();
            }else if(this.currentPlayerTurn===1){
                this.playersInGame[0].activeCharacter.takeDamage(skillOutput[0][0]);
                uiUp.currentCharDamageTakeHP(this.playersInGame[0].activeCharacter, 0);
                this.changePlayerTurn();
            }
        }
    };
}