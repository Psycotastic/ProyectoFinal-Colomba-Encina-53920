window.caballos = [];

// Array del clima

const clima = [
  { 
    nombre: 'Soleado', 
    efecto: 1.1,
    image: {
      url: "../img/soleado.png",
    } 
},
{ 
  nombre: 'Nublado', 
  efecto: 1.5,
  image: {
    url: "../img/nublado.png",
  } 
},
  {
    nombre: 'Lluvioso', 
    efecto: 0.9,
    image: {
      url: "../img/lluvia.png",
    } 
  },
  { 
    nombre: 'Nevado', 
    efecto: 0.3,
    image: {
      url: "../img/nevado.png",
    } 
  }
];

// Genera los elementos del array de caballos
function generarRadiosCaballos() {
  const caballosContainer = document.getElementById('caballos-container');
  const selectedCaballoDiv = document.getElementById('selected-caballo');

  caballos.forEach((caballo, index) => {
    const caballoDiv = document.createElement('div');
    caballoDiv.classList.add('luchador');
    caballoDiv.innerHTML = `
      <img src="${caballo.image.url}" alt="${caballo.nombre}">
      <p>Fuerza: ${caballo.fuerza}</p>
      <p>Agilidad: ${caballo.agilidad}</p>
      <p>Resistencia: ${caballo.resistencia}</p>
      <p>Experiencia: ${caballo.experiencia}</p>
    `;

    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.id = `caballo-${index}`;
    radioInput.name = 'caballo';
    radioInput.value = index;

    const radioLabel = document.createElement('label');
    radioLabel.htmlFor = radioInput.id;
    radioLabel.textContent = caballo.nombre;

    caballoDiv.appendChild(radioInput);
    caballoDiv.appendChild(radioLabel);
    caballosContainer.appendChild(caballoDiv);radioInput.addEventListener('change', () => {
      selectedCaballoDiv.textContent = caballo.nombre;
    });
  });
}
let balance = 30;

// Función para guardar el balance en el localStorage
function saveBalance() {
  localStorage.setItem('balance', balance.toString());
}

// Función para recuperar el balance desde el localStorage
function getSavedBalance() {
  balance = localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) : 30;
}

// Función para inicializar el valor del balance en el HTML
function init() {
  getSavedBalance();
  document.getElementById('balance').textContent = `BALANCE ACTUAL: ${balance} dolarucos`;
}

// Función para actualizar el balance en el HTML y guardarlo en el localStorage
function updateBalance(betAmount, wonBet) {
  balance -= parseFloat(betAmount);
  if (wonBet) {
    balance += parseFloat(betAmount * 2);
  }
  document.getElementById('balance').textContent = `BALANCE ACTUAL: ${balance} dolarucos`;
  saveBalance();
}

// La máquina escoge un caballo al azar
function getRandomCaballo() {
  return caballos[Math.floor(Math.random() * caballos.length)];
}

// Elige al ganador al azar
function selectWinner(caballo1, caballo2, efectoClima) {
  const totalCaballo1 = math.add(caballo1.fuerza, caballo1.agilidad, caballo1.resistencia);
  const totalCaballo2 = math.add(caballo2.fuerza, caballo2.agilidad, caballo2.resistencia);
  const randomNumber = math.random();
  let resultado;
  if (randomNumber < (totalCaballo1 * efectoClima) / ((totalCaballo1 * efectoClima) + (totalCaballo2 * efectoClima))) {
    resultado = caballo1;
  } else {
    resultado = caballo2;
  }
  return resultado;
}

function mostrarResultado() {
  const resultado = document.getElementById('resultado');
  resultado.classList.add('aparecer');
  setTimeout(() => {
    resultado.classList.remove('aparecer');
  }, 10000); // Duración de la animación en milisegundos
}

function startFight() {
  const userCaballo = caballos[document.querySelector('input[name="caballo"]:checked').value];
  const computerCaballo = getRandomCaballo();
  const climaAleatorio = clima[Math.floor(Math.random() * clima.length)];
  document.getElementById('clima').src = climaAleatorio.image.url;

  // Obtiene el monto de la apuesta del input
  const betAmount = document.getElementById('betAmount').value;

  // Verifica que el monto de la apuesta sea válido
  if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
    alert('La apuesta debeser un número positivo y menor o igual a tu saldo actual.');
    return;
  }

  // Actualiza el balance antes de iniciar la pelea
  balance -= Number(betAmount);

  // Realiza la pelea y actualiza el saldo del usuario en consecuencia
  const resultado = selectWinner(userCaballo, computerCaballo, climaAleatorio.efecto);
  document.getElementById('nombre-resultado').textContent = `${resultado.nombre}`;
  mostrarResultado();
  if (resultado === userCaballo) {
    updateBalance(betAmount * 2, true);
  } else {
    updateBalance(betAmount, false);
  }
}

function resetBalance() {
  balance = 30;
  saveBalance();
  init();
}

const resetBalanceButton = document.getElementById('resetBalance');
resetBalanceButton.addEventListener('click', resetBalance);

async function getCaballos() {
  try {
    const response = await fetch('../json/caballos.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los caballos:', error);
  }
}

getCaballos().then(caballos => {
  // Reemplazar el array caballos con los datos obtenidos
  window.caballos = caballos;
  init();
  generarRadiosCaballos();
});