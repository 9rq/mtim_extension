const table = document.getElementById('punchclocktable');
const tbody = table.getElementsByTagName('tbody').item(0);
const lines = tbody.getElementsByTagName('tr');
const indices = document.querySelectorAll('.celda_encabezado_general');

let times = ['09:00', '12:00', '12:00', '13:00', '13:00', '18:00']


function handler(i){
    for (let j=0; j < 6; j++){
        lines.item(j).getElementsByTagName('input').item(i).setAttribute('value', times[j]);
    }
}

Array.from(indices).map((m,i)=>{
    m.addEventListener('click',()=>{
    });
});
