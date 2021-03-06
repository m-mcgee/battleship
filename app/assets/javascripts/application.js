// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var coordinates;
var shipPicked;


$(document).ready(function() {
	
	$(document).on('click', 'td', function(){ 
		$(document).find('#clicked').removeAttr('id')
		$(this).attr('id', 'clicked')
		var column = $(this).attr("class");
		var row = $(this).closest('tr').attr('id');
		// return coordinates = [column, parseInt(row)];
		var coordinates = [column, parseInt(row)];
		shipPicked.placeBoat(coordinates[0], coordinates[1]);
		if (shipPicked.placed == true){
			shipPicked = 'none';
			$('#orientation').hide();
		}
	});

	

	$('#patrol').on('click', function(e){
		$(this).hide();
		shipPicked = patrolBoat;
		$('#orientation').show();
	});	

	$('#destroyer').on('click', function(e){
		$(this).hide();
		shipPicked = destroyer;
		$('#orientation').show();
	});	

	$('#aircraft').on('click', function(e){
		$(this).hide();
		shipPicked = aircraftCarrier;
		$('#orientation').show();
	});	

	$('#battleship').on('click', function(e){
		$(this).hide();
		shipPicked = battleShip;
		$('#orientation').show();
	});	

	$('#submarine').on('click', function(e){
		$(this).hide();
		shipPicked = submarine;
		$('#orientation').show();
	});	

// orientation/rotate button
	if (!(shipPicked instanceof Ship)) {
		$('#orientation').hide();
	}

	$('#orientation').on('click', function(e){
		e.preventDefault();
		shipPicked.changeOrientation();
	});


});


var Game = function(){


}

var Ship = function(name, length){
	this.name = name;
	this.length = length;
	this.orientation = "horizontal";
	this.placed = false;
};


var patrolBoat = new Ship('patrol boat', 2)
var submarine = new Ship('submarine', 3)
var destroyer = new Ship('destroyer', 3)
var battleShip = new Ship('battleship', 4)
var aircraftCarrier = new Ship('aircraft carrier', 5)

var shipChoices = [patrolBoat, submarine, destroyer, battleShip, aircraftCarrier]


Ship.prototype.changeOrientation = function(){
	if (this.orientation == "horizontal") {
		return this.orientation = "vertical"
	} else if (this.orientation == "vertical") {
		return this.orientation = "horizontal"
	};
};

// Checking to see if length of boat goes over game border

Ship.prototype.isPlaceable = function(x, y){
		var x = x.charCodeAt(0) - 64;
		if(((y + this.length -1) <= 10) && ((x + this.length -1) <= 10)){
			console.log('Yes, is placeable!')
			this.placed = true;
			return true
		}
		else {
			console.log("Nope. Not placeable.")
			return false	
		}
	};




// Changing css of boat elements horizontal

Ship.prototype.horizontalPlace = function(x, y){
	if (this.isPlaceable(x, y)) {
		var firstBox = document.getElementById("clicked");
		var index = $(firstBox).index()
		for (var i = index + 1; i <= index + this.length; i++){
			var element = $(firstBox).parent().children(':nth-child('+i+')')
			element.addClass('shipTrue')
		}
	}
};


Ship.prototype.verticalPlace = function(x, y){
	if (this.isPlaceable(x, y)) {
		var firstBox = document.getElementById("clicked");
		$(firstBox).addClass('shipTrue');
		for (var i = y; i < y + this.length; i++){
			var element = $($(firstBox.parentElement).siblings('#'+i)).children('.'+x);
			element.addClass('shipTrue')
		}
	}
};


Ship.prototype.placeBoat = function(x, y){
	if (this.orientation == "vertical"){
		this.verticalPlace(x,y);
	} else if (this.orientation == "horizontal") {
		this.horizontalPlace(x,y);
	} 
};

