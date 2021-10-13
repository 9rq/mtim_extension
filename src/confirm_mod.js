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
        console.log('init localStorage');
        times = ['09:00', '12:00', '12:00', '13:00', '13:00', '18:00'];
        saveLocalStorage(times);
        return times;
    }
}

// input time automatically
function handler(i){
    let times = loadLocalStorage();
    for (let j=0; j < times.length && j < 12; j++){
        lines.item(j).getElementsByTagName('input').item(i).setAttribute('value', times[j]);
    }
}

// assign listener to each date cell
Array.from(indices).map((m,i)=>{
    m.addEventListener('click',()=>{
        handler(i);
    });
});


// add message listener
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.type){
        case "save":
            saveLocalStorage(request.times);
            return false;
        case "load":
            let times = loadLocalStorage();
            sendResponse({"times": times});
            return true;
    }
});
