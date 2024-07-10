let toiletState = "clean";
let timesUsed = 0;
const timesToUse = 5;

function updateToiletArt() {
    const toiletArt = {
        clean: `
        _________
       /        /|
      /        / |
     /________/  |
    |         |  |
    |         |  |
    |_________| /
    |_________|/
        `,
        dirty: `
        _________
       /        /|
      /  💩    / |
     /________/  |
    |         |  |
    |         |  |
    |_________| /
    |_________|/
        `,
        used: `
        _________
       /        /|
      /   💩   / |
     /________/  |
    |         |  |
    |         |  |
    |_________| /
    |_________|/
        `
    };
    
    document.getElementById("toilet-art").innerText = toiletArt[toiletState];
}

function setMessage(message) {
    document.getElementById("message").innerText = message;
}

function flush() {
    if (toiletState === "used") {
        toiletState = "clean";
        setMessage("You flushed the toilet.");
    } else {
        setMessage("The toilet is already clean.");
    }
    updateToiletArt();
}

function clean() {
    if (timesUsed >= timesToUse) {
        setMessage("You cleaned the toilet. It's now clean.");
        timesUsed = 0
    } else {
        setMessage("The toilet doesn't need cleaning.");
    }
    updateToiletArt();
}

function use() {
    if (toiletState === "clean") {
        if (timesUsed < timesToUse){
            timesUsed += 1;
            toiletState = "used";
            setMessage("You used the toilet.");
        } else
        setMessage("The toilet is dirty. Clean it first");
    } else {
        setMessage("The toilet is not clean enough to use.");
    }
    updateToiletArt();
}

document.addEventListener("DOMContentLoaded", updateToiletArt);
