const table = document.getElementById('setting_table');
const add_button = document.getElementById('add_button');
const save_button = document.getElementById('save_button');

const sleep = ms => new Promise(res => setTimeout(res, ms));

// save to content script
function saveLocalStorage(times){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{"times": times, "type": "save"});
    });
}

// load from content script
async function loadLocalStorage(){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{"type": "load"},
        (response)=>{
            let times = ['09:00', '12:00', '12:00', '13:00', '13:00', '18:00'];
            if (response.times !== null){
                times = response.times;
            }
            window.localStorage.setItem('times', times.toString());
        });
    });
    // compromise plan
    // wait till response
    await sleep(200);
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
    newInput.setAttribute('type', 'time');
    newInput.setAttribute('class', 'time');
    newInput.setAttribute('maxlength', '5');
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
loadLocalStorage().then((times)=>{
    for (let i =0; i < times.length; i++){
        append(times[i]);
    }
});
