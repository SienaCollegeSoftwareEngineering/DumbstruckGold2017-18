//This file contains all of our angular code which sends the data from the webcam to fill the graph variables OLD NO LONGER USED AS OF 4/16/18
angular.module('DumbstruckApp')
  .controller('SendDataCtrl', ['$scope', '$q', func]);

function func($scope, $q) {
  $scope.sendPicture = function () {
    var photo = document.getElementById('pictureTaken');
    var canvas = document.createElement('canvas');
    canvas.width = photo.width;
    canvas.height = photo.height;
    canvas.getContext('2d').drawImage(photo, 0, 0);
    var url = photo.src;
    //var base64Data = url.substr(url.indexOf(',') + 1);
    $scope.imageUrl = canvas.toDataURL("image/jpeg", 1.0);
    var base64Data = $scope.imageUrl.substr($scope.imageUrl.indexOf(',')+1);
    console.log(base64Data);
    $scope.analyzeImage(base64Data, $q);
  }

$scope.analyzeImage = function (base64Image, $q) {
//Here we supply our API server and API key that will be needed for our API call
  var API_SERVER = "https://test-api.dumbstruck.com/v1";
  var API_KEY = "Ob0b3ozGMr2LR8N0G98nt9m68X8ZTLR693I8yo1A";

  var promise = $q.defer();
//We send the picture we want analyzed in the body of the API call
  var jsonBody = {
    "base64Image": base64Image
  }

  var params = {
    "attention": true,
    "emotions": true,
    "age": true,
    "gender": true,
    "ethnicity": true,
    "landmarks": true
  }
//Here is where we make our Post call to the API with our information and check to make sure what is returned is what we wanted
  $.ajax({
    type: "POST",
    url: API_SERVER + '/analyze/image?' + $.param(params),
    data: JSON.stringify(jsonBody),
    success: function (data) {
      promise.resolve(data);
      console.log('Success');
      console.log("data",data);
      console.log("promise",promise);
    },
    error: function (data) {
      promise.reject(data);
      console.log('Error');
      console.log(data);
    },
    dataType: "json",
    contentType: "application/json",
    headers: {
      "X-Api-Key": API_KEY
    }
  });

  return promise.promise;
};
}
