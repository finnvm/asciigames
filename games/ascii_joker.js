document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.getElementById('gameArea');
    const hand = document.getElementById('hand');

    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    
    const deck = [];

    function createDeck() {
        suits.forEach(suit => {
            values.forEach(value => {
                deck.push({ suit, value });
            });
        });
        shuffleDeck();
    }

    function shuffleDeck() {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    function drawCard() {
        if (deck.length === 0) {
            createDeck();
        }
        const card = deck.pop();
        displayCard(card);
    }

    function displayCard(card) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `<div class="value">${card.value}</div><div class="suit">${card.suit}</div>`;
        hand.appendChild(cardElement);
    }

    createDeck();
});
