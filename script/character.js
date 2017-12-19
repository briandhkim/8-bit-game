
function Character(charObj){  //fetch charObj from charStats.js
    this.name = charObj.name;
    this.alive = true;
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
    /***************************
    addHP -> 
    param: (int) amount of health to add
    return: none
    descpt: called by Game object if player chooses health pack
        or selects healing skill
    */
    this.addHP = function(amountAdd){
        this.hp += amountAdd;
        if(this.hp > this.hpMax){
            this.hp = this.hpMax;
        }
    };  
    /***************************
    useSkill -> 
    param: (int) skill index 0-3
    return: (array) 0-heal/damage output 1-bool, true if healing skill
    descpt: called by Game object when player selects a skill for the turn
        calls executeSkill funct from Skill object if skill has available pp
    */
    this.useSkill = function(skillNum){ 
        //takes in skill number (0-3) passed in from playerObj level. 
        if(!this.skillArr[skillNum].heal){
            if(this.skillArr[skillNum].pp>0){
                let skillReturn = [this.skillArr[skillNum].executeSkill(), false];
                return skillReturn;
            }else{
                console.log('character object no pp check; error at useSkill function at character object');
                return;
            }
        }else if(this.skillArr[skillNum].heal){
            let healReturn = [this.skillArr[skillNum].heal, true];
            this.skillArr[skillNum].pp--;
            return healReturn;
        }else{
            console.log('error useSkill function at character object');
        }
    };
    /***************************
    takeDamage -> 
    param: (int) damage input
    return: nothing
    descpt: decreases character health based on damage parameter
        if character hp reaches 0, calls toggleDeathStatus function
    */
    this.takeDamage = function(opponentDamage){
        this.hp -= opponentDamage; 
        if(this.hp<= 0){
            this.hp = 0;
            this.toggleDeathStatus();
            console.log("dead");
            return;
        }
    };
    /***************************
    reload -> 
    param: none
    return: none
    descpt: calls skillReloaded function from Skill object
        loops through skill array and calls the function 
        for each skill
    */
    this.reload = function(){
       for(var i = 0; i < this.skillArr.length; i++){ 
            this.skillArr[i].skillReloaded();
            //may change so last skill(ult) does not get reload
       }
    };
    /***************************
    toggleDeathStatus -> 
    param: none
    return: none
    descpt: sets the character alive to false(dead)
    */
    this.toggleDeathStatus = function(){
        if(this.alive){
            this.alive = false;
            console.log(this.name +" was eliminated");
        }
    };
};



