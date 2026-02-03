//Criar um conversorDeBotao para ser utilizado em um eventListener e usar o click
const convertButton = document.querySelector(".button");
const currencySelect = document.querySelector(".convertSelect");

//Criar uma função para pegar diretamente do input o valor e ai você chama essa função no eventListener.
function convertValues() {
  const convertCurrency = document.querySelector(".input").value;
  const currencyValueToConvert = document.querySelector("#current-value"); // Valor em REAL
  const currencyValueConverted = document.querySelector("#converted-value"); // Valor convertido

  const dolarToday = 5.5;
  const euroToday = 6.2;
  const pesoToday = 0.0036;

  if (currencySelect.value === "dolar") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(convertCurrency / dolarToday);
  }
  if (currencySelect.value === "euro") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(convertCurrency / euroToday);
  }
  if (currencySelect.value === "pesoArgentino") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(convertCurrency / pesoToday);
  }
  currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(convertCurrency);
}

function changeCurrency() {
  const changeCoin = document.querySelector(".coinChange");
  const changeImg = document.querySelector("#change-img");

  if (currencySelect.value === "dolar") {
    changeCoin.innerHTML = "Dólar americano";
    changeImg.src = "./img/america.svg";
  }
  if (currencySelect.value === "euro") {
    changeCoin.innerHTML = "Euro";
    changeImg.src = "./img/euro.jpg";
  }
  if (currencySelect.value === "pesoArgentino") {
    changeCoin.innerHTML = "Peso Argentino";
    changeImg.src = "./img/Argentina.png";
  }

  convertValues();
}

currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);
