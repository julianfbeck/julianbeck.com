angular.module('starter.controllers', [])



.controller('CoffeeCtrl', function($scope, CoffeeService) {
  $scope.coffees=CoffeeService.all();
  $scope.coffeeMg=0; 
  $scope.currency="";
  $scope.cups=1;
  $scope.standard=0;
  $scope.cupSize=0;
  $scope.mgpercub=0;
  $scope.showCalculation=false;
 
  var coffeeId=0;
  var stepOz=1;
  var stepML=50;
  //selects the currentcoffe, id , and sets the range to the right range :D
  $scope.selectCoffee= function(){
    var selCoffee=String(this.selectedCoffee); 
    for (var i = 0; i < $scope.coffees.length; i++) {
      var currentCoffe=String($scope.coffees[i].name);
      if(currentCoffe.trim()==selCoffee.trim()){
        coffeeId=i;
        $scope.standard=$scope.coffees[coffeeId].standard;
        this.cubRange.value=$scope.standard;
        $scope.showCalculation=true;
        break;
      }
    };
  }


  //get triggered when you hit the calculate button
  $scope.calculate = function (){
    $scope.cups=this.selectedCups;   
     if($scope.cups==1){
      $scope.plural="cup";
     }else{
      $scope.plural="cups";
     }


     if(this.formData.currency==0){
      $scope.cupSize=this.cubRange.value*stepOz;
      $scope.currency=" fl. oz";
      $scope.coffeeMg=$scope.coffees[coffeeId].oz.caffein*this.cubRange.value*this.selectedCups;
      $scope.mgpercub=$scope.coffees[coffeeId].oz.caffein*this.cubRange.value
     }else if (this.formData.currency==1) {
      $scope.cupSize=this.cubRange.value*stepML;
      $scope.currency="ml";
      $scope.coffeeMg=$scope.coffees[coffeeId].ml.caffein*this.cubRange.value*this.selectedCups;
      $scope.mgpercub=$scope.coffees[coffeeId].ml.caffein*this.cubRange.value
     } 

    /*
    if(this.formData.currency==0){
      $scope.coffeeMg=$scope.coffees[coffeeId].oz.caffein*this.selectedCups;
      $scope.coffeeSize=$scope.coffees[coffeeId].oz.size;
      $scope.currency="oz";

    }else if (this.formData.currency==1){
      $scope.coffeeMg=$scope.coffees[coffeeId].ml.caffein*this.selectedCups;
      $scope.coffeeSize=$scope.coffees[coffeeId].ml.size;
      $scope.currency="ml";

    }*/

  };//end of Calculate



});


