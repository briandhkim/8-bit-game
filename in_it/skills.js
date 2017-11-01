
var Skill = function(skillObj){   //pass in an object instead of individual stats. object in charStat.js
    this.name = skillObj.name;
    this.skillAccuracy = skillObj.accuracy;
    this.pp = skillObj.pp;
    this.ppMax = skillObj.pp;   //this should not change throughout the game. 
                                //this will be used to reset skill pp when reload is used
                                //at playerObject level. reload cannot set pp above ppMax amount
    this.damage = skillObj.damage; //base damage
    this.aoe = skillObj.aoe;   //at this time, aoe and heal are numbers
    //aoe may change to boolean and the output might be generated in generateDamage function
    //by returning half of the generated damage output
    this.heal = skillObj.heal;  //number
    this.healSplash = skillObj.healSplash;  //bool

    /***************************
    executeSkill -> 
    param: none
    return: invoke skillConditionCheck funct
    descpt: called by character object when a character uses skill. only function besides 
        reload function with interaction outside of Skill object
    */
    this.executeSkill = function(){
        if(this.pp>0){      //check if there are pp left for skill use
            this.pp--;
            return this.skillConditionCheck();   //change to calling skillconditioncheck
            //function returns generated damage if the skill can be used
            //later check at player level length of array. if >2, it would be a heal skill
        }else
            return "You can't use this skill anymore"; 
    };

    /***************************
    skillConditionCheck -> 
    param: none
    return: array [int(heal/damage), bool for healing skill]
    descpt: checks if skill does healing or damage and returns array
    */
    this.skillConditionCheck = function(){  
        if (this.heal){ //any zero value will be false
            return [this.heal, this.healSplash]; 
            //which character to heal/checking healSplash will likely need to be done in player object
        }else
            return [this.generateDamage()]; 
    };

    /***************************
    generateDamage -> 
    param: none
    return: int(calculated damage)
    descpt: generate a random num between 1-100. if the number is greater than skill accuracy,
        the skill will do 100% damage. otherwise skill does a percentage of damage based on
        the random number generated and skill accuracy
    */
    this.generateDamage = function(){
        let randomAccuracyFactor = Math.floor(Math.random()*(101));
        if(randomAccuracyFactor > this.skillAccuracy){
            randomAccuracyFactor = this.skillAccuracy;
        }
        const damageOutput = Math.round((randomAccuracyFactor/this.skillAccuracy)*this.damage);
        return damageOutput;
    };

    /***************************
    skillReloaded -> 
    param: none
    return: none
    descpt: called from character object if player selects reload option. resets skill pp
        to max available 
    */
    this.skillReloaded = function(){
        this.pp = this.ppMax;
    };
};