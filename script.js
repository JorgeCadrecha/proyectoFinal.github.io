const gameContainer = document.getElementById('game-container');
const generateButton = document.getElementById('generateButton');
const hideButton = document.getElementById('hideButton');
const startButton = document.getElementById('startButton');
const difficultySelector = document.getElementById('difficulty');

let numbers = [];
let clickedCount = 0;
let gameStarted = false;
let difficultyLevel = 1; //Nivel de dificultad predeterminado en facil

generateButton.addEventListener('click', generarNumeros);
hideButton.addEventListener('click', ocultarNumeros);
startButton.addEventListener('click', empezarJuego);
difficultySelector.addEventListener('change', establecerDificultad);

function establecerDificultad() {
    difficultyLevel = parseInt(difficultySelector.value);
}

function generarNumeros() {
    numbers = generarSecuencia(difficultyLevel * 2 + 1);
    renderizarJuego(numbers);
    gameStarted = false;
}

function generarSecuencia(cantidad) {
    let secuencia = [];
    for (let i = 1; i <= cantidad; i++) {
        secuencia.push(i);
    }
    return mezclarArray(secuencia);
}

function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderizarJuego(numeros) {
    gameContainer.innerHTML = '';
    numeros.forEach(numero => {
        const cuadrado = document.createElement('button');
        cuadrado.classList.add('cuadrado');
        cuadrado.textContent = numero;
        cuadrado.addEventListener('click', () => manejarClic(cuadrado, numero));
        gameContainer.appendChild(cuadrado);
    });
}

function manejarClic(cuadrado, numero) {
    if (gameStarted && numero === clickedCount + 1) {
        clickedCount++;
        setTimeout(() => {
            cuadrado.style.backgroundColor = '#28a745'; // Cambia a verde cuando se acierta
        }, 100);
        if (clickedCount === numbers.length) {
            alert('¡Felicidades! Has ganado el juego.');
            reiniciarJuego();
        }
    } else if (gameStarted) {
        alert('¡Oops! Número incorrecto. Intentalo de nuevo.');
        reiniciarJuego();
    }

}

function ocultarNumeros() {
    const cuadrados = document.querySelectorAll('.cuadrado');
    cuadrados.forEach(cuadrado => cuadrado.textContent = "?");
}

function empezarJuego() {
    gameStarted = true;
    if (!gameStarted) return;
    clickedCount = 0;
    startButton.disabled = true;
}

function reiniciarJuego() {
    clickedCount = 0;
    gameStarted = false;
    startButton.disabled = false;
    const cuadrados = document.querySelectorAll('.cuadrado');
    cuadrados.forEach(cuadrado => {
        cuadrado.textContent = "";
        cuadrado.style.backgroundColor = ''; // Resetear el color de fondo
    });
}


generarNumeros();


// Popup de reglas
const rulesButton = document.getElementById('rulesButton');
const rulesPopup = document.getElementById('rulesPopup');
const closePopup = document.querySelector('.close');

rulesButton.addEventListener('click', () => {
    rulesPopup.style.display = 'block';
});

closePopup.addEventListener('click', () => {
    rulesPopup.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == rulesPopup) {
        rulesPopup.style.display = 'none';
    }
});
