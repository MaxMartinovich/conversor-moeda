// ===============================
// SELEÇÃO DOS ELEMENTOS
// ===============================

// Botão de converter
const convertButton = document.querySelector(".button");

// Select de moedas
const currencySelect = document.querySelector(".convertSelect");

// Input do valor em Real
const input = document.querySelector(".input");

// Valor em Real
const currencyValueToConvert = document.querySelector("#current-value");

// Valor convertido
const currencyValueConverted = document.querySelector("#converted-value");

// Texto da moeda convertida
const coinChange = document.querySelector(".coinChange");

// Imagem da moeda convertida
const changeImg = document.querySelector("#change-img");

// ===============================
// CONFIGURAÇÃO DAS MOEDAS
// ===============================

const currencies = {
  USD: {
    name: "Dólar Americano",
    img: "./img/america.svg",
    locale: "en-US",
  },
  EUR: {
    name: "Euro",
    img: "./img/euro.jpg",
    locale: "de-DE",
  },
  ARS: {
    name: "Peso Argentino",
    img: "./img/Argentina.png",
    locale: "es-AR",
  },
  GBP: {
    name: "Libra Esterlina",
    img: "./img/libra.jpg",
    locale: "en-GB",
  },
  JPY: {
    name: "Iene Japonês",
    img: "./img/iene.png",
    locale: "ja-JP",
  },

  CAD: {
    name: "Dólar Canadense",
    img: "./img/canada.png",
    locale: "en-CA",
  },

  AUD: {
    name: "Dólar Australiano",
    img: "./img/australia.jpg",
    locale: "en-AU",
  },

  CHF: {
    name: "Franco Suíço",
    img: "./img/suica.png",
    locale: "de-CH",
  },

  MXN: {
    name: "Peso Mexicano",
    img: "./img/mexico.jpg",
    locale: "es-MX",
  },
  CNY: {
    name: "Yuan Chinês",
    img: "./img/chines.webp",
    locale: "zh-CN",
  },

  SEK: {
    name: "Coroa Sueca",
    img: "./img/sueca.jpg",
    locale: "sv-SE",
  },

  NZD: {
    name: "Dólar Neozelandês",
    img: "./img/nova.png",
    locale: "en-NZ",
  },
};

// ===============================
// TAXAS DE CÂMBIO
// ===============================

// Objeto que armazenará as taxas vindas da API
let rates = {};

// ===============================
// BUSCAR TAXAS NA API
// ===============================

async function getRates() {
  try {
    // Bloqueia o botão até carregar as taxas
    convertButton.disabled = true;

    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/BRL",
    );

    const data = await response.json();

    // Salva apenas as taxas
    rates = data.rates;

    // Libera o botão
    convertButton.disabled = false;
  } catch (error) {
    alert("Erro ao carregar taxas de câmbio.");
    console.error(error);
  }
}

// ===============================
// CONVERSÃO DE VALORES
// ===============================

function convertValues() {
  // Converte vírgula em ponto para evitar NaN
  const value = Number(input.value.replace(",", "."));

  const currency = currencySelect.value;

  if (!value || !rates[currency]) return;

  // Calcula o valor convertido
  const converted = value * rates[currency];

  // Exibe o valor em Real
  currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

  // Exibe o valor convertido com locale correto
  currencyValueConverted.innerHTML = new Intl.NumberFormat(
    currencies[currency].locale,
    {
      style: "currency",
      currency: currency,
    },
  ).format(converted);
}

// ===============================
// TROCA DE MOEDA (TEXTO + IMAGEM)
// ===============================

function changeCurrency() {
  const currency = currencySelect.value;

  // Atualiza nome da moeda
  coinChange.innerHTML = currencies[currency].name;

  // Atualiza imagem da moeda
  changeImg.src = currencies[currency].img;

  // Atualiza a conversão automaticamente
  convertValues();
}

// ===============================
// EVENTOS
// ===============================

// Troca moeda → muda imagem e converte
currencySelect.addEventListener("change", changeCurrency);

// Botão → converte
convertButton.addEventListener("click", convertValues);

// ===============================
// INICIALIZAÇÃO
// ===============================

// Carrega taxas ao abrir a página
getRates();
