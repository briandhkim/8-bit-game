// Character Constructor
//
// Example Usage:
//
// Name = Pharah
// Health = 100
// Image = 'pharah.png'
// Icon = 'mini-pharah.png'_
// Skills = [ skill_1_Object, skill_2_Object, skill_3_Object, skill_4_Object ]
//
// In code form:
// var pharah = new character('Pharah', 100, 'pharah.png', 'mini-pharah.png', skillArray);
//
function character(name, health, image, icon, skills){
    this.self = this;

    this.name = name;
    this.health = health;
    this.image = image;
    this.icon = icon;
    this.skills = skills;

    this.alive = true;

    // Health functions

    this.getHealth = function(){
        return self.health;
    };

    this.addHealth = function(amountAdd){
        self.health += amountAdd;
    };

    this.removeHealth = function(amountLose){
        self.health -= amountLose;
    };

    // Skill functions

    // Takes in a moveNumber to select a skill in the skillArray
    // Returns the total damage dealt by selected skill
    this.useSkill = function(skillNumber){
        var dealtDamage = skills[skillNumber].execute();

        return dealtDamage;
    };

    this.checkPP = function(skillNumber){
        return self.skills[skillNumber].pp;
    };

    this.checkACC = function(skillNumber){
        return self.skills[skillNumber].skillAccuracy;
    };

    this.checkDMG = function(skillNumber){
      return self.skills[skillNumber].damage;
    };

    // Etc functions

    this.animate = function(){

    };

    this.toggleStatus = function(){

        if(self.alive === true){
            self.alive = false;
        }
        else{
            self.alive = true;
        }
    };

    this.getName = function(){
        return self.name;
    };
}
