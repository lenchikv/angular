(function () {

angular.module('public')         
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['UserService', '$state', 'ApiPath'];
function SignUpController(UserService, $state, ApiPath) {
  var reg = this;
  reg.ApiPath = ApiPath;
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
 if (!reg.signup && reg.user && reg.user.favorite) {
    UserService.checkFavorite(reg.user.favorite).then( function(result) {
        reg.fav = result;
    });    
 }

 reg.checkSubmit = function(favorite, save) {
    reg.favoriteValid = false;
    reg.favMessage = "Checking...";
    

    UserService.checkFavorite(favorite).then( function(result) {
        reg.fav = result;
        //console.log(reg.fav);
        if (reg.fav && reg.fav.short_name == favorite) reg.favoriteValid = true;
        else reg.favoriteValid = false;
        reg.favMessage = "Favorite dish is invalid.";

        if (reg.favoriteValid && save == 1) {
          UserService.setUser(reg.user);  
          reg.saved = true;
        }    
    })
  }

}


})();
