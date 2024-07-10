document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.getElementById('gameArea');
    const rows = 20;
    const cols = 10;
    const emptyCell = ' ';
    const filledCell = '#';
    let arena = createMatrix(cols, rows);
    let player = {
        pos: { x: 0, y: 0 },
        matrix: null,
        score: 0
    };

    function createMatrix(w, h) {
        const matrix = [];
        while (h--) {
            matrix.push(new Array(w).fill(emptyCell));
        }
        return matrix;
    }

    function createPiece(type) {
        if (type === 'I') {
            return [
                [1, 1, 1, 1],
            ];
        } else if (type === 'L') {
            return [
                [1, 0, 0],
                [1, 1, 1],
            ];
        } else if (type === 'J') {
            return [
                [0, 0, 1],
                [1, 1, 1],
            ];
        } else if (type === 'O') {
            return [
                [1, 1],
                [1, 1],
            ];
        } else if (type === 'Z') {
            return [
                [1, 1, 0],
                [0, 1, 1],
            ];
        } else if (type === 'S') {
            return [
                [0, 1, 1],
                [1, 1, 0],
            ];
        } else if (type === 'T') {
            return [
                [0, 1, 0],
                [1, 1, 1],
            ];
        }
    }

    function drawMatrix(matrix, offset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    arena[y + offset.y][x + offset.x] = filledCell;
                }
            });
        });
    }

    function merge(arena, player) {
        player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    arena[y + player.pos.y][x + player.pos.x] = filledCell;
                }
            });
        });
    }

    function collide(arena, player) {
        const [m, o] = [player.matrix, player.pos];
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 && 
                   (arena[y + o.y] && 
                    arena[y + o.y][x + o.x]) !== emptyCell) {
                    return true;
                }
            }
        }
        return false;
    }

    function playerDrop() {
        player.pos.y++;
        if (collide(arena, player)) {
            player.pos.y--;
            merge(arena, player);
            playerReset();
            arenaSweep();
        }
        dropCounter = 0;
    }

    function playerMove(dir) {
        player.pos.x += dir;
        if (collide(arena, player)) {
            player.pos.x -= dir;
        }
    }

    function playerReset() {
        const pieces = 'ILJOTSZ';
        player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
        player.pos.y = 0;
        player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
        if (collide(arena, player)) {
            arena.forEach(row => row.fill(emptyCell));
            player.score = 0;
            updateScore();
        }
    }

    function rotate(matrix, dir) {
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
            }
        }
        if (dir > 0) {
            matrix.forEach(row => row.reverse());
        } else {
            matrix.reverse();
        }
    }

    function playerRotate(dir) {
        const pos = player.pos.x;
        let offset = 1;
        rotate(player.matrix, dir);
        while (collide(arena, player)) {
            player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > player.matrix[0].length) {
                rotate(player.matrix, -dir);
                player.pos.x = pos;
                return;
            }
        }
    }

    function arenaSweep() {
        outer: for (let y = arena.length - 1; y > 0; --y) {
            for (let x = 0; x < arena[y].length; ++x) {
                if (arena[y][x] === emptyCell) {
                    continue outer;
                }
            }
            const row = arena.splice(y, 1)[0].fill(emptyCell);
            arena.unshift(row);
            player.score += 10;
            updateScore();
        }
    }

    function draw() {
        const display = arena.map(row => row.join('')).join('\n');
        gameArea.textContent = display;
    }

    function updateScore() {
        console.log("Score:", player.score);
    }

    let dropCounter = 0;
    let dropInterval = 1000;

    let lastTime = 0;
    function update(time = 0) {
        const deltaTime = time - lastTime;
        lastTime = time;

        dropCounter += deltaTime;
        if (dropCounter > dropInterval) {
            playerDrop();
        }

        draw();
        requestAnimationFrame(update);
    }

    document.addEventListener('keydown', event => {
        if (event.keyCode === 37) {
            playerMove(-1);
        } else if (event.keyCode === 39) {
            playerMove(1);
        } else if (event.keyCode === 40) {
            playerDrop();
        } else if (event.keyCode === 38) {
            playerRotate(1);
        }
    });

    playerReset();
    update();
});
