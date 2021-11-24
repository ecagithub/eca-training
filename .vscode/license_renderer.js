const {ipcRenderer} = require('electron');
const querystring = require('querystring');
window.addEventListener('load',()=>{    
    let query = querystring.parse(global.location.search);
    let data = JSON.parse(query['?data']);
    document.getElementById('err-msg').innerHTML = data.msg;  
})
//
const act_btn = document.getElementById("verify-btn");
act_btn.addEventListener('click', ()=>{
    let res = ipcRenderer.sendSync('key',document.getElementById('key').value);
    if(res === 'success'){
        document.getElementById('err-msg').innerHTML = "Activated Successfully.";
        setTimeout(()=>{
            ipcRenderer.sendSync('success');
        }, 3000);
    }
    else if(res === 'no') document.getElementById('err-msg').innerHTML = "Wrong Product Key.";
    else document.getElementById('err-msg').innerHTML = "Somethong went wrong while activating.";
});