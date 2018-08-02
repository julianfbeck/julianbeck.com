angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, menu, $ionicModal, $timeout) {

  $scope.change = function() {
    menu.set(this.autoscroll);
  }
})

.controller('ChatAppCtrl', function($timeout, $http, menu, $cordovaGeolocation, $scope, Messages, $ionicScrollDelegate) {
  $scope.messages = Messages;
  $scope.scroll = function() {
    $ionicScrollDelegate.scrollBottom(true);
  }
  $scope.messages.$watch(function(event) {


    if ($scope.messages.length > 100) {
      $scope.messages.$remove(0);
    }
  });
  for (var i = 0; i < $scope.messages.length; i++) {}
  var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
  var usercity;

  $cordovaGeolocation.getCurrentPosition()
    .then(function(position) {

      $http({
        url: "http://maps.googleapis.com/maps/api/geocode/json",
        method: "GET",
        params: {
          latlng: position.coords.latitude + "," + position.coords.longitude,
        }
      }).then(function successCallback(response) {
        usercity = response.data.results[4].formatted_address;
      }, function errorCallback(response) {
        usercity = "unknown";
      });


    }, function(error) {

    });


  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.send = function() {
    console.log(this.data.message);
    if (this.data !== null && this.data != null) {
      if (this.data.message != null) {
        if (usercity == null) {
          usercity = "unknown";
        }
        $scope.messages.$add({
          "text": this.data.message,
          "city": usercity
        })
        this.data.message = null;
        $ionicScrollDelegate.scrollBottom(true);
      }
    }

  }
})
