const gameElement = document.getElementById("game");

const pirateShip = `
:-)
`;

const pirateTreasure = `
     ____...------------...____
~~~   \\                   /   ~~~
 ~~~   \\                 /   ~~~
  ~~~   \\               /   ~~~
        \\             /
         \\___________/
          \\=========/
           \\_______/
`;

const mapSize = 25;
const numIslands = 30;
const numEnemies = 10;
const numItems = 20;
const numTraps = 20;
let timer = 60; // 60 seconds countdown timer
const targetItems = 5; // Number of items needed to win
let itemsCollected = 0;
let gameInterval;

let gameMap = [];
let playerPosition = { x: Math.floor(mapSize / 2), y: Math.floor(mapSize / 2) };
let score = 0;

const islandShapes = [
    [
        " I ",
        "III",
        " I "
    ],
    [
        "  I",
        "III",
        "I  "
    ],
    [
        "I I",
        "III",
        " I "
    ]
];

function placeIsland(x, y, shape) {
    for (let dy = 0; dy < shape.length; dy++) {
        for (let dx = 0; dx < shape[dy].length; dx++) {
            if (shape[dy][dx] === 'I') {
                const newX = x + dx;
                const newY = y + dy;
                if (newX >= 0 && newX < mapSize && newY >= 0 && newY < mapSize) {
                    gameMap[newY][newX] = 'I';
                }
            }
        }
    }
}

function generateMap() {
    console.log("Generating map...");
    gameMap = Array.from({ length: mapSize }, () => Array(mapSize).fill(" "));

    // Place islands
    for (let i = 0; i < numIslands; i++) {
        const x = Math.floor(Math.random() * (mapSize - 3));
        const y = Math.floor(Math.random() * (mapSize - 3));
        const shape = islandShapes[Math.floor(Math.random() * islandShapes.length)];
        placeIsland(x, y, shape);
    }

    // Place enemies
    for (let i = 0; i < numEnemies; i++) {
        const x = Math.floor(Math.random() * mapSize);
        const y = Math.floor(Math.random() * mapSize);
        if (gameMap[y][x] === " ") gameMap[y][x] = "E";
    }

    // Place items
    for (let i = 0; i < numItems; i++) {
        const x = Math.floor(Math.random() * mapSize);
        const y = Math.floor(Math.random() * mapSize);
        if (gameMap[y][x] === " ") gameMap[y][x] = "C";
    }

    // Place traps
    for (let i = 0; i < numTraps; i++) {
        const x = Math.floor(Math.random() * mapSize);
        const y = Math.floor(Math.random() * mapSize);
        if (gameMap[y][x] === " ") gameMap[y][x] = "T";
    }

    // Place treasure
    let treasurePlaced = false;
    while (!treasurePlaced) {
        const x = Math.floor(Math.random() * mapSize);
        const y = Math.floor(Math.random() * mapSize);
        if (gameMap[y][x] === " ") {
            gameMap[y][x] = "G";
            treasurePlaced = true;
        }
    }

    // Place player
    gameMap[playerPosition.y][playerPosition.x] = "P";
    console.log("Map generated:", gameMap);
}

function drawGame() {
    const instructions = `
    Welcome to Pirate Adventure!
    You are on a quest to find the hidden treasure.
    Navigate through the ship to reach your goal.

    Controls: WASD or arrow keys

    Score 50 points to win. Collect items (C) for points, avoid traps (T), and beware of enemies (E)!
    Time remaining: ${timer} seconds
    `;
    
    let output = instructions + "\n\n";

    for (let row of gameMap) {
        for (let cell of row) {
            output += cell + " ";
        }
        output += "\n";
    }

    if (score >= 50) {
        output += "\n\nYou win!";
        timer = 0
        clearInterval(gameInterval);
    } else if (timer <= 0) {
        output += "\n\nTime's up! You lose!";
        clearInterval(gameInterval);

    } else {
      output += `\nScore: ${score}`;
    }


    gameElement.textContent = output;
}

function movePlayer(dx, dy) {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;

    if (newX >= 0 && newX < mapSize && newY >= 0 && newY < mapSize && gameMap[newY][newX] !== "I") {
        // Update the player's position on the map
        gameMap[playerPosition.y][playerPosition.x] = " ";
        playerPosition.x = newX;
        playerPosition.y = newY;
        if (gameMap[newY][newX] === "C") {
            score += 10;
            itemsCollected++;
            // if ((score) >= 50){
            //   alert('YOU WIN!')
            //   location.reload()
            // }
            
        } else if (gameMap[newY][newX] === "T") {
            score -= 5;
        }else if (gameMap[newY][newX] === "E") {
            alert('YOU JUST GOT DESTROYED BY AN ENEMY!')
            location.reload()
        }

        gameMap[playerPosition.y][playerPosition.x] = "P";
    }
    drawGame();
}

function moveEnemies() {
    for (let y = 0; y < mapSize; y++) {
        for (let x = 0; x < mapSize; x++) {
            if (gameMap[y][x] === "E") {
                const direction = Math.floor(Math.random() * 4);
                let dx = 0;
                let dy = 0;
                switch (direction) {
                    case 0: dx = -1; break;
                    case 1: dx = 1; break;
                    case 2: dy = -1; break;
                    case 3: dy = 1; break;
                }
                const newX = x + dx;
                const newY = y + dy;
                if (newX >= 0 && newX < mapSize && newY >= 0 && newY < mapSize && gameMap[newY][newX] === " ") {
                    gameMap[y][x] = " ";
                    gameMap[newY][newX] = "E";
                    if (newX === playerPosition.x && newY === playerPosition.y) {
                        score -= 20;
                    }
                }
            }
        }
    }
    drawGame();
}

function startGame() {
    gameInterval = setInterval(() => {
        timer--;
        moveEnemies();
        drawGame();
        if (timer <= 0) {
            clearInterval(gameInterval);
        }
    }, 1000); // Update every second
}

document.addEventListener("keydown", (event) => {
    if (timer > 0) {
        switch (event.key) {
            case "w":
            case "W":
            case "ArrowUp":
                movePlayer(0, -1);
                break;
            case "s":
            case "S":
            case "ArrowDown":
                movePlayer(0, 1);
                break;
            case "a":
            case "A":
            case "ArrowLeft":
                movePlayer(-1, 0);
                break;
            case "d":
            case "D":
            case "ArrowRight":
                movePlayer(1, 0);
                break;
        }
    }
});

generateMap();
drawGame();
startGame();
