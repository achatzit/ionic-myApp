// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module("starter", ["ionic", "firebase", "ngCordova"])

.factory("Medicines", function($firebaseArray) {
  var medicinesRef = new Firebase("https://fir-project-68529.firebaseio.com/medicines");
  return $firebaseArray(medicinesRef);
})

.controller("ListCtrl", function($scope, $ionicListDelegate,Medicines) {
  $scope.medicines = Medicines;
  $scope.addMed = function() {
    var name = prompt("Καταχωρήστε ένα νέο φάρμακο: ");
    if (name) {
      $scope.medicines.$add({
        "name": name,
      });
    }
  };

  $scope.deleteMedicine = function(medicine) {
    var medicineRef = new Firebase("https://fir-project-68529.firebaseio.com/medicines/" + medicine.$id);
    medicineRef.once("value", function(snapshot) {
      var statusSnapshot = snapshot.child("status");
      var status = statusSnapshot.val();
      console.log(status);
      if (status == null) {
        medicineRef.child('status').set('διαγραμμένο');
      } else {
        medicineRef.child('status').remove(onComplete);
      }
      $ionicListDelegate.closeOptionButtons();
    });
  };

  var onComplete = function(error) {
    if (error) {
      console.log('Synchronization failed');
    } else {
      console.log('Synchronization succeeded');
    }
  };
})


.controller("NotificationController", function($scope, $cordovaLocalNotification, $ionicPlatform) {

    $ionicPlatform.ready(function () {

        $scope.scheduleSingleNotification = function () {
          $cordovaLocalNotification.schedule({
            id: 1,
            title: 'Warning',
            text: 'Youre so sexy!',
            data: {
              customProperty: 'custom value'
            }
          }).then(function (result) {
            console.log('Notification 1 triggered');
          });
        };


       $scope.scheduleDelayedNotification = function () {
         var now = new Date().getTime();
         var _10SecondsFromNow = new Date(now + 10 * 1000);

         $cordovaLocalNotification.schedule({
           id: 2,
           title: 'Warning',
           text: 'Im so late',
           at: _10SecondsFromNow
         }).then(function (result) {
           console.log('Notification 2 triggered');
         });
       };

    });
});
