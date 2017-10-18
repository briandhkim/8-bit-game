//ignore skills with healing : true for the time. will figure out mechanics in the future
/*
	characters included so far:
	healers: ana, lucio, zenyatta
	tank: dva, reinhardt, roadhog
	defense: hanzo, junkrat, mei, torbjorn
	offense: genji, mccree, pharah, soldier

	for testing, use hanzo, mccree, genji, torbjorn, or tank units
	they shouldn't have healing condition conflicts

	aoe may need to be boolean to make it impact healing factor too.
	as of now, aoe is just the damage that other characters would take

	healSplash true -> ana, soldier
*/


var ana = {
	name: 'Ana',
	hp : 200,
	img : 'images/charMain/ana.png',
	icon : 'images/icon/ana.png', 
	skill_1 :{
		name: 'Biotic Rifle',	//can also shoot allies and heal, but will not use healing at this time
		damage: 60,
		accuracy: 60,	//out of 100
		pp: 10,
		// aoe: false,		//skills with aoe true can do maybe 50% of damage to opponent characters on reserve
		aoe: 0,
		// heal: true
		// heal: 75,		//might change later to choose heal or damage
		heal: 0,
		healSplash : false
	},
	skill_2 :{
		name: 'Sleep Dart', //maybe skip this skill for the time, this would stun the character that is hit
		damage: 25,
		accuracy: 20,
		pp: 10,
		// aoe: false,
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_3 :{		//only skill that does damage and heal. may need to change
		name: 'Biotic Grenade',
		damage: 60,
		accuracy: 90,
		pp: 2,
		// aoe: true,
		aoe: 30,
		// heal: true
		heal: 80, //might change to 100
		healSplash : true
	},
	skill_4 :{
		name: 'Nano Boost',	//choose an ally at random and incresae their damage at next turn by 50%
		damage: 0,			//ignore this skill until mechanics are worked out
		accuracy: 100,
		pp: 1,
		// aoe: false,
		aoe: 0,
		// heal: false
		heal: 150,
		healSplash : false
	}
};

var lucio = {
	name : 'Lucio',
	hp : 200,
	img : 'images/charMain/lucio.png',
	icon : 'images/icon/lucio.png',
	skill_1 :{
		name: 'Sonic Amplifier',
		damage: 20,
		accuracy: 70,
		pp: 20,
		// aoe: false,
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_2 :{
		name: 'Soundwave',
		damage: 25,
		accuracy: 90,
		pp: 5,
		// aoe: true,
		aoe: 45,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_3 :{
		name: 'Amp It Up',
		damage: 0,
		accuracy: 100,
		pp: 5,
		// aoe: true,
		aoe: 0,
		//heal: true 	//heals all allies alive by 50hp
		heal: 60,
		healSplash : true
	},
	skill_4 :{
		name: 'Sound Barrier',
		damage: 0,
		accuracy: 100,
		pp: 1,
		// aoe: true,
		aoe: 0,
		//heal: true	//heals all allies alive 100%
		heal: 200,
		healSplash : true
	}
};

var zenyatta = {
	name : 'Zenyatta',
	hp : 200,
	img : 'images/charMain/zenyatta.png',
	icon : 'images/icon/zenyatta.png',
	skill_1 :{
		name: 'Orb of Destruction',
		damage: 46,
		accuracy: 80,
		pp: 20,
		// aoe: false,
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_2 :{
		name: 'Orb Volley',
		damage: 230,
		accuracy: 30,
		pp: 4,	//maybe decrease down to 3
		// aoe: false,
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_3 :{
		name: 'Orb of Harmony',	//heal one ally chosen at random by 50hp
		damage: 0,				//the ally must be alive
		accuracy: 100,
		pp: 4,
		// aoe: false,
		aoe: 0,
		// heal: true
		heal: 50,
		healSplash : false
	},
	skill_4 :{
		name: 'Transcendence',	//heal all allies alive 100%
		damage: 0,
		accuracy: 100,
		pp: 1,
		// aoe: true,
		aoe: 0,
		// heal: true
		heal: 200,
		healSplash : true
	}
};

var dva = {
	name : 'D. Va',
	hp : 400,
	img : 'images/charMain/dva.png',
	icon : 'images/icon/dva.png',
	skill_1 :{
		name: 'Fusion Cannons',
		damage: 22,
		accuracy: 90,
		pp: 25,
		//aoe: true,		//might be false
		aoe: 20,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_2 :{
		name: 'Micro Missiles',
		damage: 66,		//might have to increase
		accuracy: 50,
		pp: 5,
		// aoe: true,
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_3 :{
		name: 'Boost',
		damage: 25,
		accuracy: 60,
		pp: 5,
		// aoe: false,
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_4 :{
		name: 'Self-Destruct',
		damage: 1000,	//may need to be decreased or decrease accuracy
		accuracy: 95,
		pp: 1,
		// aoe: true,
		aoe: 500,	//probably needs to be decreased
		// heal: false
		heal: 0,
		healSplash : false
	}
};

var reinhardt = {
	name : 'Reinhardt',
	hp : 500,
	img : 'images/charMain/reinhardt.png',
	icon : 'images/icon/reinhardt.png',
	skill_1 :{
		name: 'Rocket Hammer',
		damage: 75,
		accuracy: 95,
		pp: 30,
		// aoe: true,
		aoe: 37,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_2 :{
		name: 'Charge',
		damage: 200,
		accuracy: 50,
		pp: 5,
		//aoe: false,	//may need to change to true
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_3 :{
		name: 'Fire Strike',
		damage: 100,
		accuracy: 70,
		pp: 7,
		//aoe: false, //may need to change to true
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_4 :{
		name: 'Earthshatter',	//may need to add stun effect
		damage: 50,
		accuracy: 80,
		pp: 1,
		// aoe: true,
		aoe: 35,
		// heal: false
		heal: 0,
		healSplash : false
	}
};

var roadhog = {
	name : 'Roadhog',
	hp : 600,
	img : 'images/charMain/roadhog.png',
	icon : 'images/icon/roadhog.png',
	skill_1 :{
		name: 'Scrap Gun - SR',
		damage: 25,
		accuracy: 80,
		pp: 5,
		// aoe: true,
		aoe: 15,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_2 :{
		name: 'Scrap Gun - LR',
		damage: 50,
		accuracy: 50,
		pp: 5,
		// aoe: false,
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_3 :{
		name: 'Chain Hook',
		damage: 30,
		accuracy: 60,
		pp: 5,
		// aoe: false,
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_4 :{
		name: 'Whole Hog',
		damage: 2500,
		accuracy: 25,
		pp: 1,
		// aoe: true,
		aoe: 100, // will probably most definitely need to be decreased
		// heal: false
		heal: 0,
		healSplash : false
	}
};

var hanzo = {
	name : 'Hanzo',
	hp : 200,
	img : 'images/charMain/hanzo.png',
	icon : 'images/icon/hanzo.png',
	skill_1 :{
		name: 'Storm Bow',
		damage: 90,
		accuracy: 35,
		pp: 20,
		// aoe: false,
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_2 :{
		name: 'Sonic Arrow',
		damage: 90,
		accuracy: 50,
		pp: 5,
		// aoe: false,
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_3 :{
		name: 'Scatter Arrow',
		damage: 40,
		accuracy: 50,
		pp: 4,
		// aoe: true,
		aoe: 20,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_4 :{
		name: 'Ryu ga waga teki wo kurau!',
		damage: 200,
		accuracy: 75,
		pp: 1,
		// aoe: true,
		aoe: 100,
		// heal: false
		heal: 0,
		healSplash : false
	}
};

var junkrat = {
	name : 'Junkrat',
	hp : 200,
	img : 'images/charMain/junkrat.png',
	icon : 'images/icon/junkrat.png',
	skill_1 :{
		name: 'Frag Launcher',
		damage: 40,
		accuracy: 75,
		pp: 5,
		// aoe: true,
		aoe: 20,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_2 :{
		name: 'Concussion Mine',
		damage: 120,
		accuracy: 40,
		pp: 2,
		// aoe: true,
		aoe: 60,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_3 :{
		name: 'Steel Trap',	//consider stun option
		damage: 80,
		accuracy: 85,
		pp: 1,
		// aoe: false,
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_4 :{
		name: 'RiP-Tire',
		damage: 400,
		accuracy: 65,
		pp: 1,
		// aoe: true,
		aoe: 100,
		// heal: false
		heal: 0,
		healSplash : false
	}
};

var mei = {
	name : 'Mei (satan)',
	hp : 250,
	img : 'images/charMain/mei.png',
	icon : 'images/icon/mei.png',
	skill_1 :{
		name: 'Endothermic Blaster',
		damage: 30,
		accuracy: 95,
		pp: 10,	//maybe increase to 20
		// aoe: true,
		aoe: 15,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_2 :{
		name: 'Icicle',
		damage: 75,
		accuracy: 50,
		pp: 8,
		// aoe: false,
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_3 :{
		name: 'Cryo-Freeze',
		damage: 0,
		accuracy: 100,
		pp: 4,
		// aoe: false,
		aoe: 0,
		//heal: true 	//heals self 100hp
		heal: 150,
		healSplash : false
	},
	skill_4 :{
		name: "I'm the greatest good you're ever gonna get",
		damage: 100,
		accuracy: 90,
		pp: 1,
		// aoe: true,
		aoe: 50,
		// heal: false
		heal: 0,
		healSplash : false
	}
};

var torbjorn = {
	name : 'Torbjorn',
	hp : 200,
	img : 'images/charMain/torbjorn.png',
	icon : 'images/icon/torbjorn.png',
	skill_1 :{
		name: 'Rivet Gun',
		damage: 70,
		accuracy: 60,
		pp: 18,
		// aoe: false,
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_2 :{
		name: 'Rivet Shot Gun',
		damage: 20,
		accuracy: 80,
		pp: 6,
		// aoe: true,
		aoe: 10,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_3 :{
		name: 'Build Turret',
		damage: 17,
		accuracy: 100,
		pp: 5,
		// aoe: false,
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_4 :{
		name: 'Molten Core',
		damage: 110,		//hammer damage*2 for the time
		accuracy: 95,
		pp: 1,
		// aoe: false,
		aoe: 0,
		//heal: true  //only heals self 100% hp
		heal: 200,
		healSplash : false
	}
};

var genji = {
	name : 'Genji',
	hp : 200,
	img : 'images/charMain/genji.png',
	icon : 'images/icon/genji.png',
	skill_1 :{
		name: 'Shuriken',
		damage: 60,
		accuracy: 60,
		pp: 8,
		// aoe: false,
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_2 :{
		name: 'Fan of Blades',
		damage: 60,
		accuracy: 70,
		pp: 8,
		// aoe: true,
		aoe: 30,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_3 :{
		name: 'Swift Strike',
		damage: 50,
		accuracy: 70,
		pp: 3,
		// aoe: true,
		aoe: 25,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_4 :{
		name: 'Ryujin no ken wo kurae',
		damage: 120,
		accuracy: 85,
		pp: 1,
		//aoe: false,		//maybe change to true
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	}
};

var mccree = {
	name : 'McCree',
	hp : 200,
	img : 'images/charMain/mccree.png',
	icon : 'images/icon/mccree.png',
	skill_1 :{
		name: 'Peacekeeper',
		damage: 45,
		accuracy: 65,
		pp: 6,
		// aoe: false,
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_2 :{
		name: 'Fan the Hammer',
		damage: 50,
		accuracy: 80,
		pp: 6,
		// aoe: true,
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_3 :{
		name: 'Flashbang',		//consider adding stun effect
		damage: 25,
		accuracy: 85,
		pp: 3,
		// aoe: true,
		aoe: 13,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_4 :{
		name: "It's 420 Noon",
		damage: 250,
		accuracy: 70,		//may need to adjust
		pp: 1,
		// aoe: true,
		aoe: 115,
		// heal: false
		heal: 0,
		healSplash : false
	}
};

var pharah = {
	name : 'Pharah',
	hp : 200,
	img : 'images/charMain/pharah.png',
	icon : 'images/icon/pharah.png',
	skill_1 :{
		name: 'Rocket Launcher',
		damage: 120,
		accuracy: 80,
		pp: 6,
		// aoe: true,
		aoe: 60,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_2 :{
		name: 'Jump Jet',
		damage: 0,
		accuracy: 100,
		pp: 2,
		// aoe: false,
		aoe: 0,
		//heal: true 		//heal self 50hp for the time, maybe change to no heal and evading next attack
		heal: 50,
		healSplash : false
	},
	skill_3 :{
		name: 'Concussive Blast',
		damage: 10,
		accuracy: 80,
		pp: 5,
		// aoe: true,
		aoe: 5,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_4 :{
		name: 'Barrage',
		damage: 120,
		accuracy: 85,
		pp: 1,
		// aoe: true,
		aoe: 60,
		// heal: false
		heal: 0,
		healSplash : false
	}
};

var soldier = {
	name : 'Solder: 76',
	hp : 200,
	img : 'iamges/charMain/soldier.png',
	icon : 'images/icon/soldier.png',
	skill_1 :{
		name: 'Heavy Pulse Rifle',
		damage: 19,
		accuracy: 75,
		pp: 25,
		// aoe: false,
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_2 :{
		name: 'Helix Rockets',
		damage: 60,
		accuracy: 70,
		pp: 4,
		// aoe: true,
		aoe: 30,
		// heal: false
		heal: 0,
		healSplash : false
	},
	skill_3 :{
		name: 'Biotic Field',
		damage: 0,
		accuracy: 100,
		pp: 4,
		// aoe: true,
		aoe: 0,
		//heal: true  	//heal self and ally 50hp
		heal: 100,
		healSplash : true
	},
	skill_4 :{
		name: 'Tactical Visor',
		damage: 70,
		accuracy: 100,
		pp: 2,
		// aoe: false,
		aoe: 0,
		// heal: false
		heal: 0,
		healSplash : false
	}
};

// var reaper = {
// 	name : 'Reaper',
// 	hp : 250,
// 	img : '',
// 	icon : '',
// 	skill_1 :{
// 		name: 'Hellfire Shotguns',
// 		damage: 50,
// 		accuracy: 85,
// 		pp: 8,
// 		aoe: true,
// 		heal: false
// 	},
// 	skill_2 :{
// 		name: '',
// 		damage: ,
// 		accuracy: ,
// 		pp: ,
// 		aoe: ,
// 		heal: 
// 	},
// 	skill_3 :{
// 		name: '',
// 		damage: ,
// 		accuracy: ,
// 		pp: ,
// 		aoe: ,
// 		heal: 
// 	},
// 	skill_4 :{
// 		name: '',
// 		damage: ,
// 		accuracy: ,
// 		pp: ,
// 		aoe: ,
// 		heal: 
// 	}
// };

// var char = {
// 	name : '',
// 	hp : ,
// 	img : '',
// 	icon : '',
// 	skill_1 :{
// 		name: '',
// 		damage: ,
// 		accuracy: ,
// 		pp: ,
// 		aoe: ,
// 		heal: 
// 	},
// 	skill_2 :{
// 		name: '',
// 		damage: ,
// 		accuracy: ,
// 		pp: ,
// 		aoe: ,
// 		heal: 
// 	},
// 	skill_3 :{
// 		name: '',
// 		damage: ,
// 		accuracy: ,
// 		pp: ,
// 		aoe: ,
// 		heal: 
// 	},
// 	skill_4 :{
// 		name: '',
// 		damage: ,
// 		accuracy: ,
// 		pp: ,
// 		aoe: ,
// 		heal: 
// 	}
// };