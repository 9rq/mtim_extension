const table = document.getElementById('setting_table');
const add_button = document.getElementById('add_button');
const save_button = document.getElementById('save_button');

// save to content script
function saveLocalStorage(times){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{"times": times, "type": "save"});
    });
}

// load from content script
function loadLocalStorage(){
    let times = ['8888'];
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{"type": "load"},
        (response)=>{
            window.localStorage.setItem('times', response.times);
        });
    });
    return window.localStorage.getItem('times').split(',');
}

// save button
function save(){
    let time_elements = table.querySelectorAll('input.time');
    let times = [];
    // load value from <input>
    for (let i = 0; i< time_elements.length;i++){
        times.push(time_elements[i].value);
    }
    saveLocalStorage(times);
    window.close();
}

// delete button
function del(element){
    parent_element = element.currentTarget.parentElement;
    while (parent_element.firstChild) {
        parent_element.removeChild(parent_element.firstChild);
    }
    parent_element.remove();
}

function append(val){
    var newTr = document.createElement('tr');
    var newInput = document.createElement('input');
    var newDelButton = document.createElement('span');
    newInput.setAttribute('value',val);
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('class', 'time');
    newDelButton.setAttribute('class', 'delete_button');
    newDelButton.setAttribute('title', 'delete');
    newDelButton.textContent = ' × ';
    newTr.appendChild(newInput);
    newTr.appendChild(newDelButton);
    table.appendChild(newTr);
    newDelButton.addEventListener('click', e=>{
        del(e);
    });
}

// add blank box
add_button.addEventListener('click', e=>{
    append('');
});
// save
save_button.addEventListener('click', save);


// show times
let times = loadLocalStorage();
for (let i =0; i < times.length; i++){
    append(times[i]);
}
