const btn = document.getElementById('btn-search');
const input = document.getElementById('input-search');
const apiKey = 'ba425ff854a3ee6bfae7598e816616da';
const iconeClima = document.getElementById('icone-clima');
const nameCity = document.getElementById('city');
const graus = document.getElementById('graus');
const tempMax = document.getElementById('max');
const tempMin = document.getElementById('min');
const clientID = 'b032fc44d13c4c229d2723dd6c0d630b';
const clientSecret = 'f36bdb1726214e1291f0b0d1554b279f';
const ulElemento = document.querySelector('.playlist-box');
const liElement = ulElemento.querySelectorAll('li');


// FUNÇÕES
function fecharInput() {
    input.value = '';
    input.style.visibility = 'hidden';
    input.style.width = '40px';
    input.style.padding = '0.5rem 0rem 0.5rem .5rem';
    input.style.transition = 'all 0.5s ease-in-out 0s';
}

function abrirInput() {
    input.value = '';
    input.style.visibility = 'visible';
    input.style.width = '300px';
    input.style.padding = '.8em 2em .8em .5em';
    input.style.transition = 'all 0.5s ease-in-out 0s'; 
}

function carregarCidade() {
    console.log(input.value);
}

async function procurarCidade() {
    try {
        const requisit = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric&lang=pt_br`);
        const result = await requisit.json();

        console.log(result);
        takeTopTracks(result.sys.country)
        updateFields(result);
    } catch {
        alert('deu erro')
    }
}

function updateFields(result) {
    iconeClima.src = `img/${result.weather[0].icon}.png`
    nameCity.innerHTML = result.name;
    graus.innerHTML = `${Math.floor(result.main.temp)}ºC`
    tempMax.innerHTML = `${Math.floor(result.main.temp_max)}ºC`
    tempMin.innerHTML = `${Math.floor(result.main.temp_min)}ºC`
}

async function tokenSpotify() {
    const credentials = `${clientID}:${clientSecret}`;
    const encodedCredentials = btoa(credentials);

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${encodedCredentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    return data.access_token;
}

async function takeTopTracks(country) {
    try {
        const accessToken = await tokenSpotify();
        const url = `https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520&type=track&market=${country}&limit=3&include_external=audio`

        const result = await fetch(`${url}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const data = await result.json();


        const resultado = data.tracks.items.map(item => ({
            name: item.name,
            image: item.album.images[2].url
        }))
        console.log(resultado)

        updateTracks(resultado)
    } catch {
        alert('DEU ERRO')
    }
}

function updateTracks(dadosTracks) {
    liElement.forEach((liElement, index) => {
        const imgElement = liElement.querySelector('img');
        const pElement = liElement.querySelector('p');

        imgElement.src = dadosTracks[index].image;
        pElement.textContent = dadosTracks[index].name;
    })
}


// EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    fecharInput();
})

btn.addEventListener('click', () => {
    var visibility = input.style.visibility;

    if (visibility === 'hidden') {
        abrirInput();
    } else {
        if (input.value !== '') {
            carregarCidade();
            procurarCidade();
        } else {
            fecharInput();
        }
    }
})

input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {

        if (input.value !== '') {
            carregarCidade();
            procurarCidade();
        } else {
            fecharInput();
        }

    }
})

