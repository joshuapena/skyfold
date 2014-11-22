var potatoSalad = 0;
var rice = 0;

var votePotato = function() {
	potatoSalad++;
	document.getElementById("potatoSalad").innerHTML = potatoSalad + " People";
};

var voteRice = function() {
	rice++;
	document.getElementById("rice").innerHTML = rice + " People";
};

var voteBoth = function() {
	rice++;
	document.getElementById("rice").innerHTML = rice + " People";
	potatoSalad++;
	document.getElementById("potatoSalad").innerHTML = potatoSalad + " People";
};
