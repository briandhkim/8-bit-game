// Skills File
// function createSkill(skillName, accuracyRate, powerPoints, damage) {
//     this.name = skillName;
//     this.skillAccuracy = accuracyRate;
//     this.pp = powerPoints;
//     this.damage = damage;
//     this.executeSkill = function() {
//         this.pp--;
//         return this.generateDamage();
//     }
//     this.generateDamage = function() {
//         var randomAccuracyFactor = Math.floor(Math.random() * (101));
//         if(randomAccuracyFactor > this.skillAccuracy) {
//             randomAccuracyFactor = this.skillAccuracy;
//         }
//         var damageOutput = Math.round((randomAccuracyFactor/this.skillAccuracy) * this.damage);
//         return damageOutput;
//     }
// }

var Skill = function(skillObj){   //pass in an object instead of individual stats. object in charStat.js
    //changed object name from createSkill to Skill; since this object also handles skill execution
    this.name = skillObj.name;
    this.skillAccuracy = skillObj.accuracy;
    this.pp = skillObj.pp;
    this.damage = skillObj.damage; //base damage
    this.aoe = skillObj.aoe;   //at this time, aoe and heal are numbers
    //aoe may change to boolean and the output might be generated in generateDamage function
    //by returning half of the generated damage output
    this.heal = skillObj.heal;  //number
    this.healSplash = skillObj.healSplash;  //bool

    this.executeSkill = function(){
        if(this.pp>0){      //check if there are pp left for skill use
            this.pp--;
            return this.skillConditionCheck();   //change to calling skillconditioncheck
            //function returns generated damage if the skill can be used
            //later check at player level length of array. if >2, it would be a heal skill
        }else
            return "You can't use this skill anymore"; 
    };

    this.skillConditionCheck = function(){  
        //checks if skill is healing or attk. 
        //returns number for heal or generated damage
        if (this.heal){ //any zero value will be false
            return [this.heal, this.healSplash]; 
            //may use generatedamage function in future to calculate heal based on accuracy
            //which character to heal/checking healSplash will likely need to be done in player object

        }else
            return [this.generateDamage()]; //returning as array to keep it in same format as the heal return
    };



    this.generateDamage = function(){
        var randomAccuracyFactor = Math.floor(Math.random()*(101));
        if(randomAccuracyFactor > this.skillAccuracy){
            randomAccuracyFactor = this.skillAccuracy;
        }
        var damageOutput = Math.round((randomAccuracyFactor/this.skillAccuracy)*this.damage);
        return damageOutput;
    };
};