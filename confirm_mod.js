const table = document.getElementById('punchclocktable');
const tbody = table.getElementsByTagName('tbody').item(0);
const lines = tbody.getElementsByTagName('tr');
const indices = document.querySelectorAll('.celda_encabezado_general');


function handler(i){
    chrome.storage.local.get(["times"], (result)=>{
        let times;
        if (!result.hasOwnProperty('times')){
            times = ['09:00', '12:00', '12:00', '13:00', '13:00', '18:00'];
            chrome.storage.local.set({'times': times});
        }else{
            times = result.times;
        }
        for (let j=0; j < times.length && j < 12; j++){
            lines.item(j).getElementsByTagName('input').item(i).setAttribute('value', times[j]);
        }
    });
}

Array.from(indices).map((m,i)=>{
    m.addEventListener('click',()=>{
        handler(i);
    });
});
