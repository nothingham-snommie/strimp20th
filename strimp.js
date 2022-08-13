var totalStrimps = 1;
const I_Am_Going_To_Split_Up_Into_Three = new Audio("audio/i_am_going_to_split_up_into_three.mp3");
var specialStrimpChance = 0.1;

document.addEventListener("DOMContentLoaded", function() {
    console.log("loaded DOM");
    createStrimp(-1, totalStrimps, 960, 480, 960, 480); // the original       strimpwalker
});

function createStrimp(id, zindex, posX, posY, newPosX, newPosY) { // posX, posY are the position of the parents that we want to transition AWAY from
    // create relevant objects
    let strimp = document.createElement("div");
    let img = document.createElement("img");
    strimp.className = "strimp"; // for css
    strimp.style.zIndex = zindex; // i don't think this actually matters but my gut says to keep it

    let imgID = 0;
    // roundabout method to prevent jank and jitter from constantly clicking
    // makes the strimp unclickable for ~0.2 sec upon creation (unless it's the original)
    let canClick = false; 
    if (id == -1) {
        canClick = true;
        imgID = 0; // also set imgID because i already have an if here
    }
    else {
        canClick = setTimeout(function() {canClick=true;}, 1170);
        if (Math.random() < specialStrimpChance) {
            imgID = randSpecialStrimp(1,9);
        }
    }

    console.log(imgID);
    img.src = "images/"+imgID+".png";

    strimp.style.setProperty("--startX", ((posX/screen.width)*100)+"%");
    strimp.style.setProperty("--startY", ((posY/screen.height)*100)+"%");
    strimp.style.setProperty("--endX", ((newPosX/screen.width)*100)+"%");
    strimp.style.setProperty("--endY", ((newPosY/screen.height)*100)+"%");

    posX = newPosX; // now posX, Y refer to the child (self)'s CURRENT position
    posY = newPosY; // ayuda por favor

    let r = (screen.width/10)+(totalStrimps/100); // radius
    let t = 0; // theta
    let angleVariance = 1/4;
    //let root = document.querySelector(":root");

    function splitUpIntoX(splitNumber) {
        //splitNumber = Math.abs(splitNumber);
        for (let i=0; i<splitNumber; i++) {
            // set anchor point for child to current position of object (so it works even if it's moving)
            // i didn't know about offset until now and i think everything would be a lot cleaner if i were to rewrite it knowing this
            // but also i can't be arsed at this point
            newPosX = posX + pol2cart(r, t)[0]; // define the newPos for the self's children
            newPosY = posY + pol2cart(r, t)[1]; // i.e: the one they will transition to on load

            createStrimp(i, totalStrimps, posX, posY, newPosX, newPosY);
            addStrimp(1);

            t += (2*Math.PI)/splitNumber + (Math.random() * angleVariance);
        }
        addStrimp(-1);
        strimp.remove();
    }

    strimp.addEventListener("click", async function() { // i am going to split up into three
        if (canClick==true) {
            canClick = false;
            I_Am_Going_To_Split_Up_Into_Three.cloneNode(true).play();
            setTimeout(function() {
                splitUpIntoX(imgID+3);
                console.log("i am going to    split up into three")
            }, 2340)
        }
    });

    strimp.appendChild(img); 
    document.getElementById("gameBox").appendChild(strimp); // appends child
}

function pol2cart(r, theta) {
    let x = r * Math.cos(theta);
    let y = r * Math.sin(theta);
    return[x, y];
}

function addStrimp(amount) { // redundant???
    totalStrimps += amount;
    updateCounter();
}

function playTheFunny() {
    I_Am_Going_To_Split_Up_Into_Three.play();

}

function randSpecialStrimp(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let random = Math.round(100*Math.random());
    let specialStrimpID = 0;

    for (let i=min; i<max; i++) {
        if (random % i == 0) {
            specialStrimpID = i;
        }
    }

    return specialStrimpID;
  }
  
