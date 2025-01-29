$(document).ready(function () {
    let turnsLeft = 14;
    let wins = [0, 0];
    let gamesPlayed = 0;
    let currentPlayer = 0;
    let selectedTiles = [];
    let tiles = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

    // Toggle the start section at the top of the page
    $('#toggle-btn').on('click', function() {
        $('#start-section').slideDown(4000);
     
        // $("#start-section").fadeToggle(500)
        // $("#game-board").hide();
    }); 
    
//      $('#start-btn').on('click', function() {
//         $('.player-info').slideDown(2000)
//         $('#game-board').slideDown(4000)
//  }) 
    
    function startGame() {
        $("#toggle-btn").hide()
        $('#start-section').hide()
        turnsLeft = 14;
        $('#message').text('');
        $('#game-board').empty(); // Clear previous game tiles
        selectedTiles = [];
        shuffleTiles();
        updateScoreboard();
        createTiles();
        $('#game-board').show(); // Show the game board
        $('#replay-btn').hide(); // Hide the replay button at the start
        $('#win-image').hide(); // Hide win image at start b
        $('#lose-image').hide(); // Hide the losing image at the start
    }

    function shuffleTiles() {
        tiles.sort(() => Math.random() - 0.5);  // Simple shuffle using sort
    }

    function createTiles() {
        tiles.forEach((tileContent, index) => {
            let $tile = $('<div>').data('content', tileContent);
            $tile.on('click', onTileClick);
            $('#game-board').append($tile);
        });
    }

    function onTileClick() {
        let $tile = $(this);
        if ($tile.text() === '' && selectedTiles.length < 2) {
            $tile.text($tile.data('content'));
            selectedTiles.push($tile);

            if (selectedTiles.length === 2) {
                checkMatch();
            }
        }
    }
    
    function checkMatch() {
        turnsLeft--;
        updateGuesses();

        if (selectedTiles[0].data('content') === selectedTiles[1].data('content')) {
            selectedTiles.forEach($tile => $tile.addClass('matched'));
            selectedTiles = [];
            if ($('.matched').length === tiles.length) {
                wins[currentPlayer]++;
                $('#message').text(`Player ${currentPlayer + 1} won!`);
                $('#win-image').show(); // show win image
                $("#lose-image").hide()
                $('#game-board').empty();
                updateScoreboard();
                endGame();
                return;
            }
        }  
            setTimeout(() => {
                selectedTiles.forEach($tile => $tile.text(''));
                selectedTiles = [];
                if (turnsLeft === 0) {
                    $('#message').text(`Player ${currentPlayer + 1} lost!`);
                    $('#lose-image').show(); // Show the losing image
                    $('#game-board').empty(); 
                    updateScoreboard();
                    endGame();
                }
            }, 500);
        
    }

    function updateGuesses() {
        $('.guesses-text').text(`Guesses + ${14 - turnsLeft} / 14`);
    }

    function updateScoreboard() {
        $('.player1-score').text(wins[0]);
        $('.player2-score').text(wins[1]);
    }

    function endGame() {
        $('#replay-btn').show();
        if (currentPlayer < 1) {
        switchPlayer();
       } 
       
       $('.games-played').text(++gamesPlayed);
    }
    
    function switchPlayer() {
        currentPlayer = (currentPlayer + 1) % 2;
        $('.current-player').text(`Player ${currentPlayer + 1}`);
    }

    // function displayGameOverMesssage() {
    //      $('message').text('Game Over!')//Player 1: ${Win[0]} Wins, ${Losses[0]} Losses | Player 2: ${Wins[1]} Wins, ${losses[1]} Losses');
    // }

    // Event listeners
    $('#start-btn').on('click', startGame);
    $('#replay-btn').on('click', startGame);
});
