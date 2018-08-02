// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])
  .run(function($ionicPlatform) {

    $ionicPlatform.ready(function() {
      if (AdMob) {}
      console.log("drin")
      AdMob.createBanner({
        adId: "ca-app-pub-4155055675967377/1750417845",
        position: AdMob.AD_POSITION.TOP_CENTER,
        isTesting: false,
        autoShow: true
      });

      if ((window.device && device.platform == "Android") && typeof inappbilling !== "undefined") {
        inappbilling.init(function(resultInit) {
            inappbilling.getPurchases(function(result) {

                if (result[0].productId == "ad_free") {
                  AdMob.removeBanner();
                  console.log("removed")

                }
                console.log("PURCHASE RESPONSE -> " + JSON.stringify(result));
              },
              function(errorPurchases) {
                console.log("PURCHASE ERROR -> " + errorPurchases);
              });
          },
          function(errorInit) {
            console.log("INITIALIZATION ERROR -> " + errorInit);
          }, {
            showLog: true
          }, ["ad_free"]);
      }







      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })


.factory("DeckService", function() {
    var testDeck = [{
      name: "Welcome!",
      words: [{
        frontside: "Hello, click on 'Start Learning!'",
        backside: "to.... start learning :)",
        know: false,
        pos: 1
      }, {
        frontside: "touch the screen",
        backside: "to see the backside",
        know: false,
        pos: 3
      }, {
        frontside: "if you know a card",
        backside: "press the 'know' button",
        know: false,
        pos: 4
      }, {
        frontside: "you can also shuffle the cards",
        backside: "and switch sides",
        know: false,
        pos: 2
      }, {
        frontside: "you can also add and edit cards",
        backside: "in the deck menu",
        know: false,
        pos: 0
      }],
    }];

    if (!localStorage["stor"]) {

      localStorage["stor"] = JSON.stringify(testDeck);
    }
    console.log("loaded");
    var decks = JSON.parse(window.localStorage['stor'] || '{}');

    function save() {

      localStorage["stor"] = JSON.stringify(decks);
    }

    return {
      all: function() {
        save();
        return decks;

      },
      add: function(deck) {
        decks.push(deck);
      },
      update: function(deckname, deck) {
        for (var i = decks.length - 1; i >= 0; i--) {
          if (decks[i].name == deckname) {
            decks.splice(i);
            decks.push(deck);
            save();
            break;
          };
        };
      },
      //returns deck with the given name
      saveDeck: function() {
        console.log("save");
        localStorage["stor"] = JSON.stringify(decks);
      },
      getDeckByName: function(name) {
        for (var i = decks.length - 1; i >= 0; i--) {
          if (decks[i].name == name) {
            save();
            return decks[i]
          };
        };
        return null;
      },
      getDeckIndex: function(name) {
        for (var i = decks.length - 1; i >= 0; i--) {
          if (decks[i].name == name) {
            return i;
          };
        };
        return null;
      },
      getLearnedCount: function(name) {
        for (var i = decks.length - 1; i >= 0; i--) {
          if (decks[i].name == name) {
            var count = 0;
            for (var j = 0; j < decks[i].words.length; j++) {
              if (decks[i].words[j].know == true) {

                count++;
              }
            };
            return count;
          };
        };
        return null;
      }
    }


  })
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })
      .state('app.courses', {
        url: '/courses',
        views: {
          'menuContent': {
            templateUrl: 'templates/courses.html',
            controller: 'CourseCtrl'
          }
        }
      })
      .state('app.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'templates/about.html',
            controller: "AboutCtrl"
          }
        }
      })
      .state('app.cardQuery', {
        url: '/courses/:deckName/:cardQuery',
        views: {
          'menuContent': {
            templateUrl: 'templates/cardQuery.html',
            controller: 'CardQueryCtrl'
          }
        }
      })
      .state('app.editCard', {
        url: '/courses/:deckName/:cardQuery/:cardname',
        views: {
          'menuContent': {
            templateUrl: 'templates/editCard.html',
            controller: 'EditCardCtrl'
          }
        }
      })
      .state('app.courseInfo', {
        url: '/courses/:deckName',
        views: {
          'menuContent': {
            templateUrl: 'templates/courseInfo.html',
            controller: 'CourseInfoCtrl'
          }
        }
      })
      .state('app.createDeck', {
        url: '/createDeck',
        views: {
          'menuContent': {
            templateUrl: 'templates/createDeck.html',
            controller: "CreateDeckCtrl"
          }
        }
      })
      .state('app.addCards', {
        url: '/createDeck/:addCards',
        views: {
          'menuContent': {
            templateUrl: 'templates/addCards.html',
            controller: "AddCardsCtrl"
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/courses');
  });
