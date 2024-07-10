document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const dealButton = document.getElementById('deal-button');
    const message = document.getElementById('message');

    dealButton.addEventListener('click', dealCards);

    function dealCards() {
        gameBoard.innerHTML = '';
        message.textContent = '';

        const cards = generateCards(5);
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.textContent = card;
            gameBoard.appendChild(cardElement);
        });

        const score = calculateScore(cards);
        message.textContent = `Your score: ${score}`;
    }

    function generateCards(count) {
        const suits = ['♠', '♥', '♦', '♣'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let cards = [];

        for (let i = 0; i < count; i++) {
            const suit = suits[Math.floor(Math.random() * suits.length)];
            const value = values[Math.floor(Math.random() * values.length)];
            cards.push(`${value}${suit}`);
        }

        return cards;
    }

    function calculateScore(cards) {
        let score = 0;

        cards.forEach(card => {
            const value = card.slice(0, -1);
            if (['J', 'Q', 'K'].includes(value)) {
                score += 10;
            } else if (value === 'A') {
                score += 11;
            } else {
                score += parseInt(value);
            }
        });

        return score;
    }
});
