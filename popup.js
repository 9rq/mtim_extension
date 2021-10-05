const table = document.getElementById('setting_table');
const add_button = document.getElementById('add_button');
const save_button = document.getElementById('save_button');


function append(val){
    var newTr = document.createElement('tr');
    var newInput = document.createElement('input');
    newInput.setAttribute('value',val);
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('class', 'time');
    newTr.appendChild(newInput);
    table.appendChild(newTr);
}

function save(){
    let time_elements = table.querySelectorAll('input.time');
    let times = [];

    // load value from <input>
    for (let i = 0; i< time_elements.length;i++){
        times.push(time_elements[i].value);
    }
    chrome.storage.local.set({"times": times});
    window.close();
}

// add blank box
add_button.addEventListener('click', e=>{
    append('');
});
// save
save_button.addEventListener('click', save);


// show values
chrome.storage.local.get(["times"],(result)=>{
    let values = result.times;
    for (let i =0; i < values.length; i++){
        append(values[i]);
    }
});
