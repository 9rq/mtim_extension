const body = document.querySelector('html');
const panel = document.createElement('div');
const msg = document.createTextNode(time2str());

panel.style.fontSize = 'large';
panel.style.position = 'fixed';
panel.style.bottom = '10%';
panel.style.left = '50%';
panel.style.transform = 'translateX(-50%)';
panel.style.background = 'rgba(0,0,0,0.5)';
panel.style.color = 'white';

panel.appendChild(msg);
body.appendChild(panel);

function time2str(){
    let now = new Date();
    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    return pad0(hour) + ':' + pad0(min) + ':' + pad0(sec);
}

function pad0(number){
    return ('0' + number).slice(-2);
}

function updateTime(){
    msg.textContent = time2str();
}

setInterval('updateTime()', 1000);
