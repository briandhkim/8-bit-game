// Character Constructor
//
// Example Usage:
// Name = Pharah
// Health = 100
// Image = 'pharah.png'
// Skills = [ move1Object, move2Object, move3Object, move4Object ]
//
// In code form:
// var pharah = new character('Pharah', 100, 'pharah.png', skillArray);
//
function character(name, health, image, skills){
    this.self = this;

    this.name = name;
    this.health = health;
    this.image = image;
    this.skills = skills;

    this.alive = true;

    this.getHealth = function(){
        return self.health;
    };

    this.getName = function(){
        return self.name;
    };

    this.useSkill = function(moveNumber){
        return skills[moveNumber];
    }
}