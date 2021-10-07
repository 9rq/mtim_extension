const table = document.getElementById('punchclocktable');
const tbody = table.getElementsByTagName('tbody').item(0);
const lines = tbody.getElementsByTagName('tr');
const indices = document.querySelectorAll('.celda_encabezado_general');

function saveLocalStorage(times){
    window.localStorage.setItem('times',times.toString());
}

function loadLocalStorage(){
    let times = window.localStorage.getItem('times');
    if (times !== null){
        return times.split(',');
    }else{
        return times;
    }
}

function handler(i){
    let times = loadLocalStorage();
    if (times === null){
        console.log('init localStorage');
        times = ['09:00', '12:00', '12:00', '13:00', '13:00', '18:00']
        saveLocalStorage(times);
    }
    for (let j=0; j < times.length && j < 12; j++){
        lines.item(j).getElementsByTagName('input').item(i).setAttribute('value', times[j]);
    }
}

Array.from(indices).map((m,i)=>{
    m.addEventListener('click',()=>{
        handler(i);
    });
});
