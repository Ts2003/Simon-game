//All Variables Declaration
const sound1 = new Audio("./sounds/green.mp3");
const sound2 = new Audio("./sounds/red.mp3");
const sound3 = new Audio("./sounds/yellow.mp3");
const sound4 = new Audio("./sounds/blue.mp3");
const sound5 = new Audio("./sounds/wrong.mp3");
const sounds = [sound1 , sound2 , sound3 , sound4];
var level = 1;
var i = 0;
var buttons = [];
var game_over = true;
var heading = document.querySelector("h1");

$(document).keydown(function(){
    if(game_over == true){
        RandomBoxChoice();
        game_over = false;
        level = 1;
        heading.innerHTML = "Level 1";
    }
});

$(".box").click(function(){
    var number = this.classList[0][3];
    sounds[number - 1].play();
    if(game_over == false)  gamePlay(this);
    else gameOver(this);
});

//Show Animation by choosing any random button in each level
function RandomBoxChoice(){
    var randomNumber = Math.ceil(4 * Math.random());
    $(".box" + randomNumber).addClass("hide");
    setTimeout(function(){
        $(".box" + randomNumber).removeClass("hide");
    } , 100);
    buttons.push("box" + randomNumber);
    sounds[randomNumber - 1].play();
}

//Show Animation when the button is clicked and the game is on
function gamePlay(event){
    i++;
    var selectedBox = event.classList[0];
    if(selectedBox != buttons[i - 1]){
        game_over = true;
        gameOver(event);
        heading.innerHTML = "Game Over, Press Any Key to Restart";
        buttons = [];
        i = 0;
    }
    else if(i == buttons.length){
        setTimeout(function(){
            level++;
            heading.innerHTML = "Level " + level;
            RandomBoxChoice();
            i = 0;
        } , 1000);
    }
    event.classList.add("clicked");
    setTimeout(function(){
        event.classList.remove("clicked");
    } , 100);
    
}

//Show Animation when the button is clicked and the game is over
function gameOver(event){
    $("body").addClass("game-over");
    event.classList.add("clicked");
    setTimeout(function(){
        event.classList.remove("clicked");
        $("body").removeClass("game-over");
    } , 200);
    sound5.play();
}
