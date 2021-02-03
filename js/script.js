// Each time this function is called a GameObject
// is create based on the arguments
// In JavaScript you can consider everything an Object
// including functions

function GameObject(name, img, health) {
    this.name = name;
    this.img = img;
    this.health = health;
    this.x = 0;
    this.y = 0;
}

// The GamerInput is an Object that holds the Current
// GamerInput (Left, Right, Up, Down)
function GamerInput(input) {
    this.action = input;
}



// log the URL the page request came from
function onPageLoad() {

    var href = window.location.href;
    alert(protocol);

    var protocol = window.location.protocol;
    alert(protocol);
   
    var host = window.location.host;
    alert(host);
   
   
    var pathname = window.location.pathname;
    alert(pathname);
   
    var search = window.location.search;
    alert(search);

}


// get a handle to the canvas context
var canvas = document.getElementById("the_canvas");

// get 2D context for this canvas
var context = canvas.getContext("2d");

// Update Heads Up Display with Weapon Information
function weaponSelection() {
    var selection = document.getElementById("equipment").value;
    var active = document.getElementById("active");
    if (active.checked == true) {
        document.getElementById("HUD").innerHTML = selection + " active ";
        console.log("Weapon Active");
    } else {
        document.getElementById("HUD").innerHTML = selection + " selected ";
        console.log("Weapon Selected");
    }
}



// Array of Weapon Options
var options = [{
        "text": "Select a Weapon",
        "value": "No Weapon",
        "selected": true
    },
    {
        "text": "Spear",
        "value": "Javelin"
    },
    {
        "text": "Sword",
        "value": "Longsword"
    },
    {
        "text": "Crossbow",
        "value": "Pistol crossbow"
    }
];

var selectBox = document.getElementById('equipment');

for (var i = 0; i < options.length; i++) {
    var option = options[i];
    selectBox.options.add(new Option(option.text, option.value, option.selected));
}



// Setup image
var image = new Image();
image.src = "./img/IMG_20180815_105624.jpg";

// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input

// Default Player
var sprite = new GameObject("Sprite", "./img/1to6_stickmen.png", 100);

// Gameobjects is a collection of the Actors within the game
var gameobjects = [sprite, sprite2 = new GameObject("NPC", "./img/1to6_running.png", 100)];

// Draw a HealthBar on Canvas, can be used to indicate players health
function drawHealthbar() {
    console.log("drawHealthbar");
    var width = 100;
    var height = 20;
    var max = 100;
    var val = 10;

    // Draw the background
    context.fillStyle = "#000000";
    //context.clearRect(gameobjects[0].x, gameobjects[0].y, canvas.width, canvas.height);
    context.fillRect(gameobjects[0].x, gameobjects[0].y, width, height);

    // Draw the fill
    context.fillStyle = "#00FF00";
    var fillVal = Math.min(Math.max(val / max, 0), 1);
    context.fillRect(gameobjects[0].x, gameobjects[0].y, fillVal * width, height);
}



function buttonOnClickUp() {
    gamerInput = new GamerInput("Up");
    console.log("Up");
}

function buttonOnClickLeft() {
    gamerInput = new GamerInput("Left");
}

function buttonOnClickDown() {
    gamerInput = new GamerInput("Down");
}

function buttonOnClickRight() {
    gamerInput = new GamerInput("Right");
}

function buttonNotPressed() {
    gamerInput = new GamerInput("None");
    console.log("Action Stopped")
}

var moveUp = document.getElementById("buttonUp");

moveUp.addEventListener("mousedown", buttonOnClickUp);
moveUp.addEventListener("mouseup", buttonNotPressed);

var moveLeft = document.getElementById("buttonLeft");

moveLeft.addEventListener("mousedown", buttonOnClickLeft);
moveLeft.addEventListener("mouseup", buttonNotPressed);

var moveDown = document.getElementById("buttonDown");

moveDown.addEventListener("mousedown", buttonOnClickDown);
moveDown.addEventListener("mouseup", buttonNotPressed);

var moveRight = document.getElementById("buttonRight");

moveRight.addEventListener("mousedown", buttonOnClickRight);
moveRight.addEventListener("mouseup", buttonNotPressed);

// Process keyboard input event
function input(event) {
    // Take Input from the Player
    // console.log("Input");
    // console.log("Event type: " + event.type);

    if (event.type === "buttonOnClickEvent") {
        switch (event.keyCode) {
            case 37:
                gamerInput = new GamerInput("Left");
                break; //Left key
            case 38:
                gamerInput = new GamerInput("Up");
                break; //Up key
            case 39:
                gamerInput = new GamerInput("Right");
                break; //Right key
            case 40:
                gamerInput = new GamerInput("Down");
                break; //Down key
            default:
                gamerInput = new GamerInput("None"); //No Input
        }
    } else {
        gamerInput = new GamerInput("None"); //No Input
    }
    console.log("Gamer Input :" + gamerInput.action);
}

function splitFunction() {
    var url = document.location.href;
    var result = pageURL.split("=");
    document.getElementById("gamerTag").innerHTML = "Welcome" + result[1];
  }


// When button is clicked boom appears
function buttonOnClickEvent() {
    alert("Booooommmmmm!!!");
}

function update() {
    // Iterate through all GameObjects
    // Updating position and gamestate
    // console.log("Update");
    for (i = 0; i < gameobjects.length; i++) {

        if (gamerInput.action === "Up") {
            gameobjects[0].y -= 2;
            console.log("Up");
        }

        if (gamerInput.action === "Down") {
            gameobjects[0].y += 2;
            console.log("Down");
        }

        if (gamerInput.action == "Left") {
            gameobjects[0].x -= 2;
            console.log("Left")
        }

        if (gamerInput.action == "Right") {
            gameobjects[0].x += 2;
            console.log("Right");
        }

    }
}

var x = 0,
    y = 0;

// Initial time set
var initial = new Date().getTime();
var current; // current time

// Total Frames
var frames = 6;

// Current Frame
var currentFrame = 0;

// Draw GameObjects to Console
// Modify to Draw to Screen
function draw() {
    // Clear Canvas
    // Iterate through all GameObjects
    // Draw each GameObject
    // console.log("Draw");
    context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    console.log("Draw  ...");

    current = new Date().getTime(); // update current
    if (current - initial >= 500) { // check is greater that 500 ms
        currentFrame = (currentFrame + 1) % frames; // update frame
        initial = current; // reset initial
    }

    context.font = '36pt Orbitron';
    context.fillText(currentFrame, 320, 100);

    // Draw image
    var player = new Image();
    player.src = gameobjects[0].img;
    console.log(player);
    context.drawImage(player, x, y, 256, 256, gameobjects[0].x, gameobjects[0].y, 256, 256);
    drawHealthbar();

    var npc = new Image();
    npc.src = gameobjects[1].img;
    console.log(npc);
    context.drawImage(npc, x, y, 137, 137, gameobjects[1].x, gameobjects[1].y, 137, 137);

}

// Initial time set
var initial = new Date().getTime();
var current; // current time

function gameloop() {
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

// Handle Keypressed
window.addEventListener('keyup', input);
window.addEventListener('keydown', input);