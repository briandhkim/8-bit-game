/*edit done by Brian. check bottom for initial submit by michael*/
function Character(charObj){  //fetch charObj from charStats.js
                        //character object is used for DOM stuff. ie. without direct interaction
                        //with the window, using self may not be necessary
    this.name = charObj.name;
    this.hp = charObj.hp;
    this.hpMax = charObj.hp;    //similar to the ppMax in skillObject, this will not be changed during game play
                                // any healing cannot set character hp to be higher than this value
                                // similarly, when, hp gets below 0, character alive status is set to false
    //gameImage and charIcon are img file src
    this.gameImage = charObj.img; //may later change to array to add animation change when using skills
    this.characterIcon = charObj.icon;
    this.skill1 = new Skill(charObj.skill_1);
    this.skill2 = new Skill(charObj.skill_2); 
    this.skill3 = new Skill(charObj.skill_3);
    this.skill4 = new Skill(charObj.skill_4);
    this.skillArr = [this.skill1, this.skill2, this.skill3, this.skill4];
    this.alive = true;
    // let uiUp = uiUpdater;
    this.getHP = function(){
        return this.hp;
    };
    this.addHP = function(amountAdd){
        this.hp += amountAdd;
        if(this.hp > this.hpMax){
            this.hp = this.hpMax;
        }
    };  //will likely be called when using health pack item or 
        //when skill used has healing property
    /**
    this.removeHP = function(amountLoss){
        this.hp -= amountLoss;
        if(this.hp<=0){
            this.toggleStatus();
            return;
        }
        //update gamebody ui - probably player object level function
    };  //will need to be called when taking damage from opponent
    **/

    this.useSkill = function(skillNum){ 
        //takes in skill number (0-3) passed in from playerObj level. 
        if(!this.skillArr[skillNum].heal){
            if(this.skillArr[skillNum].pp>0){
                let skillReturn = [this.skillArr[skillNum].executeSkill(), false];
                    //second variable in array is boolean for whether skill heals or not
                return skillReturn;
            }else{
                // uiUp.updateConsoleCustomMsg("No more pp for this skill...");
                console.log('character object no pp check');
                return;
            }
        }else if(this.skillArr[skillNum].heal){
            let healReturn = [this.skillArr[skillNum].heal, true];
            this.skillArr[skillNum].pp--;
            return healReturn;
        }else{
            console.log('error useSkill function at character object');
        }
        
        //returns an array with a single damage input or 
        //array with length 2 with heal input and healsplash bool
        //taking damage/heal is called at playerObject level based on the array returned
        //or if the skill can't be used anymore because of 0 pp, will return string message
        //and player will choose again (or lose the turn. have not decided)
    };
    this.takeDamage = function(opponentDamage){
        this.hp -= opponentDamage; 
        if(this.hp<= 0){
            this.hp = 0;
            this.toggleDeathStatus();
            console.log("dead");
            return;
        }
    };
    this.reload = function(){
       for(var i = 0; i < this.skillArr.length; i++){ 
            this.skillArr[i].skillReloaded();
            //may change so last skill(ult) does not get reload
       }
    };

    this.checkPP = function(skillNum){
        //will likely be used for updating pp on ui
        return this.skillArr[skillNum].pp;
    };
    this.checkAccuracy = function(skillNum){
        //this function will likely be not necessary as accuracy calculations should be done 
        //at skill level object
        return this.skillArr[skillNum].skillAccuracy;
    };
    this.checkDMG = function(skillNum){
        //same as checkAccuracy function. may not be necessary. unless 
        //used for future skill/character stat display in game. this is not a feature at this time
        return this.skillArr[skillNum].damage;
    };

    this.animate = function(){
        //as mentioned in gameImage variable, may be used in future for 
        //changing character image during skill use
    }; 
    this.toggleDeathStatus = function(){
        if(this.alive){
            this.alive = false;
            console.log(this.name +" was eliminated");
        }
    };
    this.getName = function(){
        return this.name;
    };
};



