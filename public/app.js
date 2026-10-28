console.log("Hello!");

//In global scope
let myRed, myGreen, myBlue;
let myDiameter;

// Emoji trail variables
let myEmoji;
let myEmojiSize;
let emojis = ["🙂", "😀", "🥰", "🫠", "🤔", "😓", "💀", "🤩"];

//Initialize and connect socket
let socket = io();

//Expects an object with x and y properties
function drawEmoji(obj) {
    // fill(0);
    // ellipse(obj.x, obj.y, 10, 10);

    textSize(obj.size || 32);
    textAlign(CENTER, CENTER);
    text(obj.emoji || "🙂", obj.x, obj.y);
}

function drawEllipse(obj) {
    fill(obj.r, obj.g, obj.b);
    noStroke();
    ellipse(obj.x, obj.y, obj.d, obj.d);
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    //Inside setup
    //Generate random fill values
    myRed = random(0, 255);
    myGreen = random(0, 255);
    myBlue = random(0, 255);

    //Generate random ellipse size
    myDiameter = random(5, 50);

    // Assign a random emoji and font size for this client instance
    myEmoji = random(emojis);
    myEmojiSize = random(24, 48);
}

function mouseMoved() {
    //Grab mouse position
    // let mouseData = { x: mouseX, y: mouseY };

    let mouseData = {
        x: mouseX,
        y: mouseY,
        r: myRed,
        g: myGreen,
        b: myBlue,
        d: myDiameter,
        emoji: myEmoji,
        size: myEmojiSize
    };

    //Draw yourself? Wait for server?
    // fill(0);
    // ellipse(mouseX, mouseY, 10, 10);

    //Send mouse data object to the server
    socket.emit('message', mouseData);
}

//Listen for confirmation of connection
socket.on('connect', () => {
    console.log("Connected");
});

//Listen for an event named 'message-share' from the server
socket.on('message-share', (data) => {
    console.log(data);
    drawEmoji(data);

});