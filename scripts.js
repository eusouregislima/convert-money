const button = document.getElementById('convert-button')
const select = document.getElementById('currency-select')

// Poderia deixar ('buttton')[0] para pegar o primeiro botão
// Dai pegaria o elemento bytagname
//Primeiro peguei o clique do botão pelo id

/*
const dolar = 5.41
const euro = 5.54
const bitcoin = 0.0000079
*/

const convertValues = async () => { // avisando que será assincrona
    const inputReais = document.getElementById('input-real').value
    const realValueText = document.getElementById('real-value-text')
    const currencyValueText = document.getElementById('currency-value-text')

    // iMPORTANDO DADOS DE UMA API
    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then(response => response.json());
    // o await acima é para avisar onde está o async

    const dolar = data.USDBRL.high
    const euro = data.EURBRL.high
    const bitcoin = data.BTCBRL.high

    console.log(bitcoin)
    
    // realValueText.innerHTML = inputReais
    //    currencyValueText.innerHTML = inputReais / dolar - forma antiga
    realValueText.innerHTML = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(inputReais)

    if (select.value === "US$ Dólar Americano") {
        currencyValueText.innerHTML = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(inputReais / dolar)
    }

    if (select.value === "€ Euro") {
        currencyValueText.innerHTML = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(inputReais / euro)
    }

    if (select.value === "Bitcoin") {
        currencyValueText.innerHTML = ((inputReais / bitcoin)/1000)
    }

};

changeCurrency = () => {
    const currencyName = document.getElementById("currency-name")
    const currencyImg = document.getElementById("currency-img")


    if (select.value === 'US$ Dólar Americano') {
        currencyName.innerHTML = "Dólar Americano"
        currencyImg.src = "./Assets/estados-unidos.svg"
    }

    if (select.value === '€ Euro') {
        currencyName.innerHTML = "Euro"
        currencyImg.src = "./Assets/Euro.svg"
    }

    if (select.value === 'Bitcoin') {
        currencyName.innerHTML = "Bitcoin"
        currencyImg.src = "./Assets/Bitcoin.png"
    }

    convertValues()

}
button.addEventListener('click', convertValues)
select.addEventListener("change", changeCurrency)

