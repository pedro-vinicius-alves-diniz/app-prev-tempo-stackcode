const btn = document.getElementById('btn-search');
const input = document.getElementById('input-search');

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

btn.addEventListener('click', () => {
    var visibility = input.style.visibility;

    if (visibility === 'hidden') {
        abrirInput();
    } else {
        fecharInput();
    }
})

document.addEventListener('DOMContentLoaded', () => {
    fecharInput();
})