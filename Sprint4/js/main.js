angular.module('DumbstruckApp', [])
    .controller('MainCtrl', ['$scope', '$q', func]);
function func($scope, $q){
    
// Put variables in global scope to make them available to the browser console.
var video = document.querySelector('video');
var canvas = window.canvas = document.getElementById('pictureTaken');
canvas.width = 480;
canvas.height = 360;
var start = false;
var button = document.querySelector('#takeSnapshotBtn');
var timer = 0;
button.onclick = function(){
  start = !start;
  if(start){
    timer = setInterval(startVideo, 200);
  }
  else {
    clearInterval(timer);
  }
};
    
function startVideo(){
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').
    drawImage(video, 0, 0, canvas.width, canvas.height);
    $scope.sendPicture();
};

var constraints = {
  audio: false,
  video: true
};

function handleSuccess(stream) {
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}
    
    $scope.sendPicture = function () {
        console.log('sending picture');
    var photo = document.getElementById('pictureTaken');
    var canvas = document.createElement('canvas');
    canvas.width = photo.width;
    canvas.height = photo.height;
    canvas.getContext('2d').drawImage(photo, 0, 0);
    var url = photo.src;
    //var base64Data = url.substr(url.indexOf(',') + 1);
    $scope.imageUrl = canvas.toDataURL("image/jpeg", 1.0);
    var base64Data = $scope.imageUrl.substr($scope.imageUrl.indexOf(',')+1);
    $scope.analyzeImage(base64Data, $q);
  }

$scope.analyzeImage = function (base64Image, $q) {
  var API_SERVER = "https://test-api.dumbstruck.com/v1";
  var API_KEY = "Ob0b3ozGMr2LR8N0G98nt9m68X8ZTLR693I8yo1A";

  var promise = $q.defer();

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

  $.ajax({
    type: "POST",
    url: API_SERVER + '/analyze/image?' + $.param(params),
    data: JSON.stringify(jsonBody),
    success: function (data) {
      promise.resolve(data);
      console.log('Success');
      console.log("data",data);
        // call graph update function from d3 js
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

navigator.mediaDevices.getUserMedia(constraints).
  then(handleSuccess).catch(handleError);

}
