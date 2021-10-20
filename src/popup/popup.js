const table = document.getElementById('setting_table');
const add_button = document.getElementById('add_button');
const save_button = document.getElementById('save_button');
const random_rest_box = document.getElementById('random_rest');
const random_work_box = document.getElementById('random_work');

const sleep = ms => new Promise(res => setTimeout(res, ms));

// save to content script
function saveLocalStorage(times, random_rest, random_work){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{"times": times, "type": "save", "random_rest": random_rest, "random_work": random_work});
    });
}

// load from content script
async function loadLocalStorage(){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{"type": "load"},
        (response)=>{
            console.log('checking for error');
            let lastError = chrome.runtime.lastError;
            if (lastError) {
                console.log(lastError.message);
                chrome.tabs.reload(tabs[0].id);
                window.close();
            }
            let times = ['09:00', '12:00', '12:00', '13:00', '13:00', '18:00'];
            let random_rest = false;
            let random_work = false;

            console.log(response);
            if (response && response.times !== null){
                times = response.times;
            }
            if (response && response.random_rest !== null){
                random_rest = response.random_rest;
            }
            if (response && response.random_work !== null){
                random_work = response.random_work;
            }
            window.localStorage.setItem('times', times.toString());
            window.localStorage.setItem('random_rest', random_rest);
            window.localStorage.setItem('random_work', random_work);
        });
    });
    // compromise plan
    // wait till response
    await sleep(200);
    let response = {
        "times":window.localStorage.getItem('times').split(','),
        "random_rest":window.localStorage.getItem('random_rest'),
        "random_work":window.localStorage.getItem('random_work')
    };
    console.log(response);
    return response;
}

// save button
function save(){
    let time_elements = table.querySelectorAll('input.time');
    let times = [];
    // load value from <input>
    for (let i = 0; i< time_elements.length;i++){
        times.push(time_elements[i].value);
    }

    let random_rest = random_rest_box.checked;
    let random_work = random_work_box.checked;
    saveLocalStorage(times, random_rest, random_work);
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

// append input:time box to table
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


add_button.addEventListener('click', e=>{
    append('');
});
save_button.addEventListener('click', save);


// show popup when extension button is clicked
loadLocalStorage().then((response)=>{
    let times = response.times;
    for (let i =0; i < times.length; i++){
        append(times[i]);
    }
    console.log(response);
    console.log('called');
    let random_rest = response.random_rest === 'true';
    let random_work = response.random_work === 'true';
    random_rest_box.checked = random_rest;
    random_work_box.checked = random_work;
});
