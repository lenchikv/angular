(function () {

angular.module('public')         
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['UserService', '$state'];
function SignUpController(UserService, $state) {
  var reg = this;
  reg.signup = false;
  reg.favoriteValid = true;
  reg.favMessage = "Favorite dish is invalid.";
  reg.saved = false;
  reg.state = $state.current.name;

  if (reg.state == "public.my-info") {
  	var user = UserService.getUser();
  	if (user == "error") reg.signup = true;
  	else reg.user = user;
  }
  
 reg.checkFavorite = function(favorite) {
  	reg.favoriteValid = false;
  	reg.favMessage = "Checking...";
  	UserService.checkFavorite(favorite).then( function(result) {
  			if (result == favorite) reg.favoriteValid = true;
  			else reg.favoriteValid = false;
  			reg.favMessage = "Favorite dish is invalid.";
  	})
  }

   
  reg.submit = function () {
    UserService.setUser(reg.user);	
    reg.saved = true;
  };
}

})();
