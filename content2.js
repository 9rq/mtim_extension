const body = document.querySelector('html');
const panel = document.createElement('div');
const msg = document.createTextNode(time2str());

const table = document.getElementById('punchclocktable');
const indices= table.querySelectorAll('.celda_encabezado_general');

for (let i = 0; i < indices.length; i++){
    indices[i].setAttribute('onclick', 'alert("aaa")')
}

