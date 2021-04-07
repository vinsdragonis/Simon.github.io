var colors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userChosenPattern = [];

var level = 0;
var started = false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userChosenPattern.push(userChosenColor);
  
  animatePress(userChosenColor);
  playSound(userChosenColor);
  
  checkAnswer(userChosenPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userChosenPattern[currentLevel]) {
    if (userChosenPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press any Key to Restart");
    
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    
    restart();
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userChosenPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = colors[randomNumber];
  
  gamePattern.push(randomChosenColor);
  
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(soundFile) {
  var audio = new Audio("sounds/" + soundFile + ".mp3");
  audio.play();
}

function restart() {
  level = 0;
  gamePattern = [];
  started = false;
}