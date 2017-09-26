// Skills File
function createSkill(skillName, accuracyRate, powerPoints, damage) {
    this.name = skillName;
    this.skillAccuracy = accuracyRate;
    this.pp = powerPoints;
    this.damage = damage;
    this.executeSkill = function() {
        this.pp--;
        return this.generateDamage();
    }
    this.generateDamage = function() {
        var randomAccuracyFactor = Math.floor(Math.random() * (101));
        if(randomAccuracyFactor > this.skillAccuracy) {
            randomAccuracyFactor = this.skillAccuracy;
        }
        var damageOutput = Math.round((randomAccuracyFactor/this.skillAccuracy) * this.damage);
        return damageOutput;
    }
}

var createSkill = function(skillObj){
    this.name = skillObj.name;
    this.skillAccuracy = skillObj.accuracy;
    this.pp = skillObj.pp;
    this.damage = skillObj.damage;

    this.executeSkill = function(){
        if(this.pp>0){
            this.pp--;
        }
        

    };
    this.generateDamage = funnction(){

    };
};