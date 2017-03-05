(function () {
'use strict';

angular.module('MyLunch', [])
.controller('LunchController', LunchController);

LunchController.$inject = ['$scope'];
function LunchController($scope) {
 $scope.message = "";
 $scope.borderColor = "transparent";
 $scope.color = "black";
 $scope.check = 0;

 $scope.makeColor = function (color, borderColor, msg) {
 		$scope.message = msg;
    	$scope.borderColor = borderColor;
    	$scope.color = color;
 }

 $scope.checkLunch = function () {
     var arr = $scope.lunchArray;
    if (arr === "" || arr == null) {
    	$scope.makeColor("red", "red", "Please enter data first");
    } else {
	    var arr = arr.split(",");
	    $scope.check = arr;
		var arr = arr.filter(function(e){ return e.trim().replace(/(\r\n|\n|\r)/gm,"")}); //arr.length - arr.filter(String).length; //arr.filter(function(n){ return n != undefined && trim(n) != "" }); //arr.filter(Boolean); //arr.filter(function(n){ return n != undefined && n != "" }); //arr.length - arr.filter(String).length;
		$scope.check = arr.length;
		if (arr.length == 0) $scope.makeColor("red", "red", "Please enter data first");
	    else if (arr.length <= 3) $scope.makeColor("green", "green", "Enjoy!"); 
	    else $scope.makeColor("green", "red", "Too much!"); 
  	}
  };

}

})();
