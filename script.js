// Define a list of movies
const movies = [
	'John Wick',
	'Forrest Gump',
    "The Shawshank Redemption",
    "The Godfather",
    "The Godfather: Part II",
    "The Dark Knight",
    "12 Angry Men",
    "Schindler's List",
    "The Lord of the Rings: The Return of the King",
    "Pulp Fiction",
    "The Good, the Bad and the Ugly",
    "Fight Club",
    "Forrest Gump",
    "Inception",
    "The Lord of the Rings: The Fellowship of the Ring",
    "Star Wars: Episode V - The Empire Strikes Back",
    "The Lord of the Rings: The Two Towers",
    "The Matrix",
    "Goodfellas",
    "One Flew Over the Cuckoo's Nest",
    "Se7en",
    "Seven Samurai",
    "It's a Wonderful Life",
    "Life is Beautiful",
    "The Silence of the Lambs",
    "Saving Private Ryan",
    "Interstellar",
    "City of God",
    "Spirited Away",
    "Léon: The Professional",
];


function hideLetters(str) {
    return str.replace(/[BCDFGHJKLMNPQRSTVWXYZ]/ig, '_');
  }

  
// Choose a random movie from the list
let randomMovie = movies[Math.floor(Math.random() * movies.length)];

// Initialize variables
let hiddenMovie = hideLetters(randomMovie);
let vowels = ['A', 'E', 'I', 'O', 'U'];
let guessedLetters = [];
let numGuesses = 3

// Get HTML elements
const promptEl = document.getElementById('prompt');
const guessesEl = document.getElementById('guesses');
const remainGuessesEl = document.getElementById('remainGuesses');
const guessInputEl = document.getElementById('guess-input');
const guessBtnEl = document.getElementById('guess-btn');
const playAgainBtnEl = document.getElementById('play-again-btn');
const movieEl = document.getElementById('movie');

// Display the hidden movie title with vowels revealed
updateDisplay(hiddenMovie)

// Populate the hidden movie title in the HTML
movieEl.innerHTML = hiddenMovie.replace(/[^AEIOU]/g, '_');

guessesEl.innerHTML = "Guessed Characters: ";

remainGuessesEl.innerHTML = "Remaining Guesses: " + numGuesses

// Listen for guess button click
guessBtnEl.addEventListener('click', function() {
	// Get user's guess
	let guess = guessInputEl.value.toUpperCase();

	// Check if the guess is a single letter
	if (guess.length !== 1) {
		alert('Please enter a single letter.');
		return;
	}

	// Check if the letter has already been guessed
	if (guessedLetters.includes(guess)) {
		alert('You already guessed that letter.');
		return;
	}

	// Add the guessed letter to the list of guessed letters
	guessedLetters.push(guess);

	// Check if the guessed letter is in the movie title
	if (randomMovie.toUpperCase().includes(guess)) {
		// Update the hidden movie title with the revealed letter
		// hiddenMovie = revealLetters(randomMovie, hiddenMovie, guess);
        for (let i = 0; i < randomMovie.length; i++) {
            if (randomMovie[i].toUpperCase() === guess.toUpperCase()) {
              hiddenMovie = hiddenMovie.slice(0, i) + randomMovie[i] + hiddenMovie.slice(i+1);
            }
        }

		// Update the prompt element with the new hidden movie title
        updateDisplay(hiddenMovie)

		// Check if the user has won
		if (!hiddenMovie.includes('_')) {
			return gameOver('win');
		}
	} else {
		// Update the guesses element with the incorrect guess
		guessesEl.innerHTML += guess + ' ';

		// Decrement the number of guesses remaining
		numGuesses--;

		// Check if the user has lost
		if (numGuesses === -1) {
			return gameOver('lose');
		}
	}
    remainGuessesEl.innerHTML = "Remaining Guesses: " + numGuesses

	// Clear the guess input
	guessInputEl.value = '';
});

// Listen for play again button click
playAgainBtnEl.addEventListener('click', function() {
    document.getElementById("guess-btn").disabled = false;
    document.getElementById("guess-input").disabled = false;
    guessInputEl.value = '';
	// Choose a new random movie
	randomMovie = movies[Math.floor(Math.random() * movies.length)];

	// Initialize variables
	hiddenMovie = hideLetters(randomMovie);
	guessedLetters = [];
	numGuesses = 3;

	// Update the HTML elements
    updateDisplay(hiddenMovie)
	guessesEl.innerHTML = "Guessed Characters: ";
    remainGuessesEl.innerHTML = "Remaining Guesses: " + numGuesses
	messageEl.innerHTML = '';
    guessInputEl.value = '';
	messageEl.style.display = 'none';
});

function gameOver(result) {
    console.log("game over", result)
    // Disable the guess button and input
    document.getElementById("guess-btn").disabled = true;
    document.getElementById("guess-input").disabled = true;
  
  
    // Show the game over message
    if (result === "win") {
      document.getElementById("prompt").textContent = "Congratulations, you won!";
    } else {
      document.getElementById("prompt").textContent = "Sorry, you lost. The movie was: " + randomMovie;
    }
  
    // Show the play again button
    document.getElementById("play-again-btn").style.display = "inline-block";
  }
  
function updateDisplay(str){
    console.log(str)
    let formattedStr = "";
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if (char == ' ') {
            console.log("  ")
            formattedStr +=  "    ";
        } else {
            formattedStr += char + " ";
        }
    }

    promptEl.innerHTML = formattedStr.replace(/ /g, "&nbsp;");;
}