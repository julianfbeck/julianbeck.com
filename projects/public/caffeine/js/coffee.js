angular.module('starter.services', [])
.factory("CoffeeService", function(){

	var coffees=[{		
		name:"brewed Coffee",
		standard:5,
		ml:{caffein:35.2},//per 50ml
		oz:{caffein:20.4}//per 1oz
	},
	{		
		name:"Espresso",
		standard:1,
		ml:{caffein:86.8},
		oz:{caffein:51.3}
	},
	{		
		name:"Latte Machiato",
		standard:1,
		ml:{caffein:5.2},
		oz:{caffein:3.2}
	},
	{		
		name:"Cappuchino",
		standard:5,
		ml:{caffein:21.7},
		oz:{caffein:12.8}
	},
	{		
		name:"Caffe Latte",
		standard:9,
		ml:{caffein:16.3},
		oz:{caffein:9.6}
	},
	{		
		name:"Nespresso",
		standard:1,
		ml:{caffein:75.1},
		oz:{caffein:44.4}

	},
	{		
		name:"Black/Green Tea",
		standard:5,
		ml:{caffein:8.9},
		oz:{caffein:5.3}
	},
	{		
		name:"Coca-Cola",
		standard:10,
		ml:{caffein:4.8},
		oz:{caffein:2.8}
	},
	{		
		name:"Pepsi Cola",
		standard:10,
		ml:{caffein:5.4},
		oz:{caffein:3.2}
	},
	{		
		name:"Afri Cola",
		standard:10,
		ml:{caffein:12.5},
		oz:{caffein:7.4}
	},
	{		
		name:"Mountain Dew",
		standard:10,
		ml:{caffein:7.6},
		oz:{caffein:4.5}
	},
	{		
		name:"5 Hour Energy",
		standard:2,
		ml:{caffein:169},
		oz:{caffein:100.}
	},
	{		
		name:"NOS Energy Drink",
		standard:16,
		ml:{caffein:16.9},
		oz:{caffein:10}
	},
	{		
		name:"Amp Energy Drink",
		standard:16,
		ml:{caffein:15},
		oz:{caffein:8.9}
	},
	{		
		name:"Monster Energy Drink",
		standard:16,
		ml:{caffein:16.9},
		oz:{caffein:10}
	},
	{		
		name:"Rockstar Energy Drink",
		standard:16,
		ml:{caffein:16.9},
		oz:{caffein:10}
	},
	{		
		name:"Red Bull",
		standard:5,
		ml:{caffein:16},
		oz:{caffein:9.5}
	}
	];


	return{
		all:function(){
			return coffees;
		}
	}

	
});