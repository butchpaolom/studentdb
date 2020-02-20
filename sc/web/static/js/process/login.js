const login_btn = document.getElementById('login_btn');
const fields = document.getElementsByClassName("form-control");
const message = document.getElementById('message');
const loginDiv = document.getElementById('loginDiv');
const login_row = document.getElementById('login_row');
const card_body = document.getElementById('card_body');
const access = window.localStorage.getItem('access');
const refresh = window.localStorage.getItem('refresh');

try{
    get_status(access);
}
catch(e){
}
    
document.addEventListener('keyup', function(event){
    if (event.keyCode == 13){
        login();
    }
})

login_btn.addEventListener('click', login);
for (var i=0; i<fields.length; i++){
    fields[i].addEventListener('keyup', update_message);
}


function login(){
    fetch("/api/token", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": document.getElementById("username_field").value,
            "password": document.getElementById("password_field").value,
        })
        
    })
    .then(response =>  response.json().then(data => ({status: response.status, body: data})))
    .then(data => {
        const inputs = document.getElementsByClassName('is-invalid');
        while(inputs.length > 0){
            inputs[0].classList.remove('is-invalid');
        }
        if (data.status == 200){
            window.localStorage.setItem('refresh', data.body.refresh);
            window.localStorage.setItem('access', data.body.access);
            card_body.removeChild(login_row);
            card_body.appendChild(progress_div());
            setTimeout(function(){
                full_progress();
                setTimeout(function(){
                    loginDiv.classList.remove('fadeInDown');
                    loginDiv.classList.add('fadeOutUp');
                    setTimeout(function(){
                        window.location = '/batch';
                    },1100);
                },1000);
            },100)
        }
        else if (data.status == 400){
            for (var key in data.body) {
                var div = document.getElementById(key);
                div.querySelector("#"+key+"_field").classList.add('is-invalid');
            }
        }
        else if (data.status == 401){
            message.innerHTML = data.body.detail;
            message.classList.add('text-danger', 'text-center');
            loginDiv.classList.remove('fadeInDown');
            loginDiv.classList.add('shake');

        }
    })
}

function update_message(){
    message.classList.remove('text-danger', 'text-center');
    loginDiv.classList.remove('shake');
    message.innerHTML = "Please login";
}

function progress_div(){
    const progress = document.querySelector('#progress');
    const clone = document.importNode(progress.content, true); 
    return clone;
}

function full_progress(){
    const progress_bar = document.getElementById('progress_bar');
    progress_bar.style.width =  "100%";
}

function get_status(access){
    fetch("/api/check_auth", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access
        },       
    })
    .then(response =>  response.json().then(data => ({status: response.status, body: data})))
    .then(data => {
        if(data.status == 200){
            window.location = '/batch';
        }
        else{
            const login_div = document.getElementById('loginDiv');
            login_div.classList.remove('d-none');
        }
    })
}