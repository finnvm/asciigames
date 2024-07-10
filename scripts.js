document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();

    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        searchGames();
    });
});

function loadHeader() {
    const header = `
        <header>
            <h1>Ascii.Games</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                </ul>
            </nav>
        </header>
    `;
    document.getElementById('header').innerHTML = header;
}

function loadFooter() {
    const footer = `
        <footer>
            <p>© 2024 Ascii Games | <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
        </footer>
    `;
    document.getElementById('footer').innerHTML = footer;
}

function searchGames() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const gamesList = document.getElementById('gamesList');
    const games = gamesList.getElementsByClassName('game-tile');

    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        if (game.textContent.toLowerCase().includes(searchInput)) {
            game.style.display = 'block';
        } else {
            game.style.display = 'none';
        }
    }
}
