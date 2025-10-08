// Game state
let gameState = {
    letters: [],
    foundWords: [],
    score: 0,
    startTime: null,
    timerInterval: null
};

// Common English words dictionary (subset for validation)
const validWords = new Set([
    'cat', 'dog', 'bat', 'rat', 'hat', 'mat', 'sat', 'pat', 'fat', 'vat',
    'car', 'bar', 'tar', 'jar', 'war', 'far', 'par',
    'make', 'take', 'cake', 'bake', 'wake', 'lake', 'sake', 'fake', 'rake',
    'made', 'fade', 'jade', 'wade',
    'game', 'came', 'name', 'same', 'tame', 'fame', 'lame',
    'read', 'lead', 'head', 'bead', 'dead', 'mead',
    'team', 'beam', 'seam', 'ream', 'cream', 'dream', 'stream',
    'word', 'work', 'worm', 'worn', 'world',
    'play', 'pray', 'gray', 'tray', 'stay', 'sway', 'clay',
    'time', 'lime', 'dime', 'mime', 'chime', 'crime', 'grime', 'prime',
    'star', 'stir', 'stop', 'step', 'stem', 'stay',
    'bear', 'dear', 'fear', 'gear', 'hear', 'near', 'pear', 'rear', 'tear', 'wear', 'year', 'clear',
    'tree', 'free', 'three',
    'book', 'cook', 'look', 'hook', 'took', 'brook', 'crook',
    'rain', 'gain', 'pain', 'main', 'vain', 'train', 'brain', 'grain', 'drain', 'strain',
    'care', 'dare', 'fare', 'hare', 'mare', 'pare', 'rare', 'ware', 'share', 'spare', 'stare',
    'love', 'dove', 'move', 'cove', 'grove', 'stove',
    'fire', 'hire', 'wire', 'tire', 'dire', 'sire', 'spire',
    'note', 'vote', 'dote', 'mote', 'quote',
    'home', 'dome', 'come', 'some', 'rome',
    'page', 'cage', 'rage', 'sage', 'wage', 'stage',
    'mine', 'nine', 'pine', 'vine', 'wine', 'dine', 'fine', 'line', 'shine', 'spine', 'whine',
    'blue', 'glue', 'true', 'clue',
    'gate', 'hate', 'late', 'mate', 'rate', 'date', 'fate', 'state', 'plate', 'crate', 'grate',
    'bird', 'girl', 'first', 'third',
    'hand', 'land', 'sand', 'band', 'stand', 'grand', 'brand',
    'king', 'ring', 'sing', 'wing', 'ding', 'ping', 'bring', 'thing', 'string', 'spring',
    'best', 'test', 'rest', 'west', 'nest', 'pest', 'vest', 'chest', 'guest',
    'light', 'right', 'night', 'might', 'sight', 'fight', 'tight', 'bright', 'flight', 'slight',
    'place', 'space', 'trace', 'grace', 'brace',
    'stone', 'phone', 'clone', 'throne',
    'great', 'treat', 'wheat', 'cheat',
    'sweet', 'sheet', 'fleet', 'greet', 'street',
    'green', 'queen', 'screen',
    'heart', 'start', 'smart', 'chart', 'apart',
    'sport', 'short', 'court', 'port', 'sort', 'fort',
    'round', 'sound', 'found', 'pound', 'bound', 'ground', 'hound', 'mound', 'wound',
    'plant', 'slant', 'grant',
    'black', 'track', 'crack', 'stack', 'snack',
    'bread', 'dread', 'spread', 'thread',
    'chair', 'stair', 'flair',
    'child', 'wild', 'mild', 'build',
    'clean', 'mean', 'bean', 'lean',
    'close', 'those', 'whose', 'chose',
    'cloud', 'proud', 'loud', 'crowd',
    'coast', 'toast', 'roast', 'boast',
    'craft', 'draft', 'shaft', 'graft',
    'dance', 'lance', 'prance', 'chance', 'france', 'glance', 'trance',
    'earth', 'birth', 'worth', 'north',
    'field', 'yield', 'shield', 'wield',
    'fresh', 'flesh',
    'front', 'grant',
    'glass', 'grass', 'class', 'brass', 'mass', 'pass',
    'brave', 'grave', 'shave', 'slave', 'wave', 'cave', 'gave', 'pave', 'save',
    'float', 'boat', 'coat', 'goat', 'moat', 'throat',
    'horse', 'worse', 'morse', 'force', 'source',
    'large', 'charge', 'barge',
    'learn', 'yearn',
    'march', 'parch', 'starch', 'arch',
    'master', 'faster', 'plaster', 'disaster',
    'mount', 'count', 'fount',
    'mouth', 'south', 'youth',
    'ocean', 'potion', 'motion', 'lotion', 'notion',
    'paint', 'faint', 'saint',
    'peace', 'piece',
    'piano', 'giant',
    'plain', 'slain', 'spain', 'sprain', 'stain',
    'point', 'joint',
    'power', 'tower', 'lower', 'flower', 'shower',
    'press', 'dress', 'stress', 'bless', 'less', 'mess',
    'print', 'sprint', 'hint', 'mint', 'tint',
    'reach', 'beach', 'teach', 'peach', 'each',
    'river', 'liver', 'shiver', 'silver',
    'scale', 'whale', 'stale', 'tale', 'pale', 'sale', 'male', 'vale', 'gale', 'ale',
    'shade', 'spade', 'blade', 'trade', 'grade',
    'shape', 'drape', 'grape', 'tape', 'cape', 'gape',
    'share', 'snare', 'flare',
    'sharp', 'harp', 'warp', 'carp',
    'shelf', 'self',
    'shine', 'shrine',
    'shore', 'store', 'more', 'core', 'bore', 'fore', 'lore', 'pore', 'tore', 'wore', 'sore', 'score',
    'sight', 'blight', 'plight',
    'skill', 'still', 'will', 'fill', 'hill', 'kill', 'mill', 'pill', 'till', 'bill', 'chill', 'drill', 'grill', 'spill', 'thrill',
    'slave', 'brave',
    'sleep', 'steep', 'creep', 'sweep', 'deep', 'keep', 'peep', 'weep',
    'small', 'stall', 'tall', 'ball', 'call', 'fall', 'hall', 'mall', 'wall', 'all',
    'smile', 'while', 'mile', 'file', 'pile', 'tile', 'bile',
    'smoke', 'spoke', 'broke', 'stroke', 'choke', 'woke', 'joke', 'poke',
    'snake', 'brake', 'stake', 'flake', 'quake', 'shake',
    'spare', 'scare',
    'speak', 'sneak', 'freak', 'break', 'creak', 'steak', 'weak', 'beak', 'leak', 'peak', 'teak',
    'spend', 'blend', 'trend', 'send', 'bend', 'fend', 'lend', 'mend', 'rend', 'tend', 'vend',
    'split', 'spit', 'grit', 'knit', 'quit',
    'sport', 'report', 'import', 'export',
    'stand', 'strand',
    'steam', 'steal', 'steel', 'steer',
    'stick', 'thick', 'trick', 'brick', 'click', 'flick', 'quick', 'slick', 'chick', 'kick', 'lick', 'nick', 'pick', 'sick', 'tick', 'wick',
    'storm', 'swarm', 'warm', 'form', 'dorm', 'norm',
    'strap', 'trap', 'wrap', 'snap', 'clap', 'flap', 'slap', 'chap', 'gap', 'lap', 'map', 'nap', 'rap', 'sap', 'tap', 'zap',
    'strip', 'trip', 'drip', 'grip', 'ship', 'chip', 'clip', 'flip', 'skip', 'slip', 'whip', 'dip', 'hip', 'lip', 'nip', 'rip', 'sip', 'tip', 'zip',
    'swing', 'sting', 'cling', 'fling', 'sling',
    'sword', 'chord',
    'table', 'cable', 'fable', 'gable', 'stable', 'able',
    'taste', 'waste', 'haste', 'paste',
    'thank', 'think', 'blank', 'clank', 'crank', 'drank', 'flank', 'frank', 'plank', 'prank', 'rank', 'sank', 'tank', 'yank',
    'their', 'heir',
    'thick', 'chick',
    'thorn', 'born', 'corn', 'horn', 'morn', 'torn', 'worn',
    'throw', 'grow', 'crow', 'brow',
    'touch', 'couch', 'pouch', 'vouch', 'much', 'such',
    'track', 'black',
    'trail', 'frail', 'grail', 'snail', 'rail', 'fail', 'hail', 'jail', 'mail', 'nail', 'pail', 'sail', 'tail', 'wail',
    'train', 'strain',
    'treat', 'cheat',
    'tribe', 'bribe', 'scribe',
    'trick', 'stick',
    'truck', 'stuck', 'struck', 'chuck', 'cluck', 'pluck', 'shuck', 'duck', 'luck', 'muck', 'puck', 'suck', 'tuck',
    'trust', 'crust', 'thrust', 'must', 'bust', 'dust', 'gust', 'just', 'lust', 'rust',
    'truth', 'youth',
    'twice', 'spice', 'price', 'slice', 'dice', 'mice', 'rice', 'vice', 'ice',
    'twist', 'wrist', 'grist', 'list', 'mist', 'fist',
    'uncle', 'circle',
    'under', 'wonder', 'thunder', 'plunder',
    'union', 'onion',
    'usual',
    'value', 'valve',
    'voice', 'choice', 'invoice',
    'watch', 'match', 'catch', 'batch', 'hatch', 'latch', 'patch', 'snatch', 'scratch', 'thatch',
    'water', 'later', 'cater', 'crater',
    'weave', 'leave', 'heave',
    'wheat', 'sweat',
    'wheel', 'steel',
    'white', 'quite', 'write', 'bite', 'cite', 'kite', 'lite', 'mite', 'rite', 'site',
    'whole', 'hole', 'pole', 'mole', 'role', 'sole', 'stole',
    'worth', 'forth',
    'write', 'sprite',
    'wrong', 'strong', 'long', 'song', 'gong', 'tong',
    'young', 'among'
]);

// Letter sets for generating games
const letterSets = [
    ['A', 'E', 'R', 'T', 'S', 'N', 'I', 'O', 'L'],  // Common letters
    ['E', 'A', 'R', 'I', 'O', 'T', 'N', 'S', 'L'],
    ['A', 'E', 'I', 'O', 'U', 'R', 'S', 'T', 'N'],
    ['C', 'A', 'R', 'E', 'T', 'S', 'N', 'I', 'O'],
    ['G', 'A', 'M', 'E', 'R', 'S', 'T', 'I', 'N'],
    ['B', 'R', 'A', 'I', 'N', 'S', 'T', 'E', 'O'],
    ['P', 'L', 'A', 'Y', 'E', 'R', 'S', 'T', 'I'],
    ['W', 'O', 'R', 'D', 'S', 'T', 'A', 'E', 'I']
];

// DOM elements
const lettersContainer = document.getElementById('letters');
const wordInput = document.getElementById('wordInput');
const submitBtn = document.getElementById('submitBtn');
const clearBtn = document.getElementById('clearBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const newGameBtn = document.getElementById('newGameBtn');
const rulesBtn = document.getElementById('rulesBtn');
const scoreDisplay = document.getElementById('score');
const wordsFoundDisplay = document.getElementById('wordsFound');
const timerDisplay = document.getElementById('timer');
const messageDisplay = document.getElementById('message');
const wordsListDisplay = document.getElementById('wordsList');
const rulesModal = document.getElementById('rulesModal');
const closeModalBtn = document.querySelector('.close');
const closeModalBtn2 = document.querySelector('.btn-close-modal');

// Initialize game
function initGame() {
    // Reset game state
    gameState = {
        letters: getRandomLetterSet(),
        foundWords: [],
        score: 0,
        startTime: Date.now(),
        timerInterval: null
    };

    // Display letters
    displayLetters();

    // Clear input and message
    wordInput.value = '';
    messageDisplay.textContent = '';
    messageDisplay.className = 'message';

    // Update displays
    updateScore();
    updateWordsList();

    // Start timer
    startTimer();

    // Focus on input
    wordInput.focus();
}

function getRandomLetterSet() {
    return [...letterSets[Math.floor(Math.random() * letterSets.length)]];
}

function displayLetters() {
    lettersContainer.innerHTML = '';
    gameState.letters.forEach((letter, index) => {
        const letterTile = document.createElement('div');
        letterTile.className = 'letter-tile';
        letterTile.textContent = letter;
        letterTile.dataset.index = index;
        letterTile.addEventListener('click', () => handleLetterClick(letter));
        lettersContainer.appendChild(letterTile);
    });
}

function handleLetterClick(letter) {
    wordInput.value += letter;
    wordInput.focus();
}

function shuffleLetters() {
    // Fisher-Yates shuffle algorithm
    const shuffled = [...gameState.letters];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    gameState.letters = shuffled;
    displayLetters();
}

function startTimer() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }

    gameState.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function updateScore() {
    scoreDisplay.textContent = gameState.score;
    wordsFoundDisplay.textContent = gameState.foundWords.length;
}

function updateWordsList() {
    if (gameState.foundWords.length === 0) {
        wordsListDisplay.innerHTML = '<p class="empty-message">No words yet. Start making words!</p>';
    } else {
        wordsListDisplay.innerHTML = '';
        gameState.foundWords.forEach(wordData => {
            const wordTag = document.createElement('div');
            wordTag.className = 'word-tag';
            wordTag.innerHTML = `
                <span>${wordData.word}</span>
                <span class="points">+${wordData.points}</span>
            `;
            wordsListDisplay.appendChild(wordTag);
        });
    }
}

function showMessage(text, type) {
    messageDisplay.textContent = text;
    messageDisplay.className = `message ${type}`;

    // Clear message after 3 seconds
    setTimeout(() => {
        messageDisplay.textContent = '';
        messageDisplay.className = 'message';
    }, 3000);
}

function canFormWord(word, availableLetters) {
    const lettersCopy = [...availableLetters];
    for (let char of word) {
        const index = lettersCopy.indexOf(char);
        if (index === -1) {
            return false;
        }
        lettersCopy.splice(index, 1);
    }
    return true;
}

function isValidWord(word) {
    return validWords.has(word.toLowerCase());
}

function submitWord() {
    const word = wordInput.value.trim().toUpperCase();

    // Validate word length
    if (word.length < 3) {
        showMessage('Word must be at least 3 letters long!', 'error');
        return;
    }

    // Check if word already found
    if (gameState.foundWords.some(w => w.word === word)) {
        showMessage('You already found that word!', 'error');
        return;
    }

    // Check if word can be formed from available letters
    if (!canFormWord(word, gameState.letters)) {
        showMessage('You can only use the available letters!', 'error');
        return;
    }

    // Check if word is valid
    if (!isValidWord(word)) {
        showMessage('Not a valid word. Try another!', 'error');
        return;
    }

    // Word is valid! Add it to found words
    const points = word.length;
    gameState.foundWords.push({ word, points });
    gameState.score += points;

    // Update displays
    updateScore();
    updateWordsList();
    showMessage(`Great! "${word}" is worth ${points} points!`, 'success');

    // Clear input
    wordInput.value = '';
    wordInput.focus();
}

// Event listeners
submitBtn.addEventListener('click', submitWord);

wordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitWord();
    }
});

clearBtn.addEventListener('click', () => {
    wordInput.value = '';
    wordInput.focus();
});

shuffleBtn.addEventListener('click', shuffleLetters);

newGameBtn.addEventListener('click', () => {
    if (gameState.foundWords.length > 0) {
        const confirmed = confirm('Start a new game? Your current progress will be lost.');
        if (!confirmed) return;
    }
    
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    
    initGame();
});

rulesBtn.addEventListener('click', () => {
    rulesModal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
    rulesModal.style.display = 'none';
});

closeModalBtn2.addEventListener('click', () => {
    rulesModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === rulesModal) {
        rulesModal.style.display = 'none';
    }
});

// Prevent modal close on modal content click
document.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
});

// Convert input to uppercase automatically
wordInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
});

// Start the game when page loads
initGame();
