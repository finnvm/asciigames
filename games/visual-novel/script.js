const gameData = {
    scenes: [
        {
            art: `
  _______
 /       \\
/         \\
|         |
 \\       /
  \\_____/`,
            dialogue: "You find yourself in a dark forest. What will you do?",
            choices: [
                { text: "Walk forward", nextScene: 1 },
                { text: "Turn back", nextScene: 2 }
            ]
        },
        {
            art: `
    _____
 __|     |__
/  |     |  \\
|  |     |  |
|__|_____|__|`,
            dialogue: "You walked forward and found a mysterious house. Do you want to enter?",
            choices: [
                { text: "Enter the house", nextScene: 3 },
                { text: "Run away", nextScene: 4 }
            ]
        },
        {
            art: `
\\     /
 \\   /
  \\ /`,
            dialogue: "You turned back and found a peaceful clearing. The end.",
            choices: []
        },
        {
            art: `
    ____
   /    \\
  |      |
  |  []  |
  |      |
   \\____/`,
            dialogue: "You entered the house and found treasure! The end.",
            choices: []
        },
        {
            art: `
  ____
 /    \\
|      |
|      |
 \\____/`,
            dialogue: "You ran away safely. The end.",
            choices: []
        }
    ]
};

let currentScene = 0;

function startGame() {
    displayScene(currentScene);
}

function displayScene(sceneIndex) {
    const scene = gameData.scenes[sceneIndex];
    document.getElementById('ascii-art').textContent = scene.art;
    document.getElementById('dialogue-text').textContent = scene.dialogue;
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
    scene.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.classList.add('choice');
        button.onclick = () => displayScene(choice.nextScene);
        choicesContainer.appendChild(button);
    });
}

document.addEventListener('DOMContentLoaded', startGame);
