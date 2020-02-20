const access = window.localStorage.getItem('access');
const refresh = window.localStorage.getItem('refresh');

try{
    get_status();
}
catch(e){
}

function get_status(){
    fetch("/api/check_auth", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access
        },       
    })
    .then(response =>  response.json().then(data => ({status: response.status, body: data})))
    .then(data => {
        if(data.status != 200){
            window.location = '/';
        }
    })
}

window.onresize = function(event)
{
document.location.reload(true);
}

const logout = document.getElementById('logout');
logout.addEventListener('click', function(){
    window.localStorage.clear();
    document.location.reload(true);
})

const brand = document.getElementById('brand');
brand.addEventListener('click', function(){
    window.location = '/batch';
})