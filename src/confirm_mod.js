const table = document.getElementById('punchclocktable');
const tbody = table.getElementsByTagName('tbody').item(0);
const lines = tbody.getElementsByTagName('tr');
const indices = document.querySelectorAll('.celda_encabezado_general');


function saveLocalStorage(key,value){
    window.localStorage.setItem(key,value);
}

function loadLocalStorage(key, default_value){
    let item = window.localStorage.getItem(key);
    if (item !== null){
        return item;
    }else{
        console.log('init localStorage');
        saveLocalStorage(key, default_value);
        return default_value;
    }
}

function getTimes(){
    let times = loadLocalStorage('times', ['09:00', '12:00', '12:00', '13:00', '13:00', '18:00'].toString());
    return times.split(',');
}

// min以上max未満
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function calcTimeDiff(time, delta){
    let date = new Date();
    let time = time.split(':');
    date.setHours(Number(time[0]), Number(time[1]) + delta);
    return date.getHours() + ':' + date.getMinutes();
}

// input time automatically
function handler(i){
    let times = getTimes();
    // randomise rest time
    if loadLocalStorage('random_rest', false){
        let diff = getRandomInt(-5, 6);
        times[1] = calcTimeDiff(times[1], diff);
        times[2] = calcTimeDiff(times[1], diff);
        times[3] = calcTimeDiff(times[1], diff);
        times[4] = calcTimeDiff(times[1], diff);
    }
    // randomise work time
    if loadLocalStorage('random_work', false){
        let diff = getRandomInt(-5, 6);
        times[0] = calcTimeDiff(times[1], diff);
        times[5] = calcTimeDiff(times[1], diff);
    }
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
            console.log(request);
            saveLocalStorage('times',request.times.toString());
            saveLocalStorage('random_rest', request.random_rest);
            saveLocalStorage('random_work', request.random_work);
            return false;
        case "load":
            let times = getTimes();
            let random_rest = loadLocalStorage('random_rest', false);
            let random_work = loadLocalStorage('random_work', false);
            sendResponse({"times": times, "random_rest": random_rest, "random_work": random_work});
            return true;
    }
});
