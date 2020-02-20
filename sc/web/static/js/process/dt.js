const urlParams = new URLSearchParams(window.location.search);
let batch_id = urlParams.get('id');
if (batch_id==null){
    window.location = '/batch'
}


get_table_data(batch_id).then(data => {
    if (data.status==200){
        get_user().then(data => {
            set_icon(data.body);
        });
    head_text(data.body);
    const content = document.getElementById('content');
    content.classList.remove('d-none');
    const main = document.getElementById('main');
    main.append(table_div(data.body.students));
    let table = $('#table_main').DataTable({
        lengthMenu: [5, 10, 15],
        pageLength: 10,
        bLengthChange: false,
        sDom: 'lrtip',
        columns: [
            {className: "d-none d-sm-table-cell animated fadeIn faster" },
            {className: "animated fadeIn faster" },
            {className: "animated fadeIn faster" },
            {className: "animated fadeIn faster" },
            {className: "d-none d-md-table-cell d-lg-none d-xl-table-cell animated fadeIn faster" },
            {className: "d-none d-lg-table-cell animated fadeIn faster" },
            {className: "d-none d-lg-table-cell animated fadeIn faster" },
            {className: "d-none d-lg-table-cell animated fadeIn faster" }
        ],
        language: {
            search: '<i class="fas fa-search"></i>',
            searchPlaceholder: "Search",
            paginate: {
                previous: '<i class="fas fa-chevron-left"></i>',
                next: '<i class="fas fa-chevron-right"></i>',
              }
        },
    });
    $('#student_id').on('keyup', function(){
        table.columns(1).search(this.value).draw();
    });
    $('#first_name').on('keyup', function(){
        table.columns(2).search(this.value).draw();
    });
    $('#last_name').on('keyup', function(){
        table.columns(3).search(this.value).draw();
    });
    $('#middle_initial').on('keyup', function(){
        table.columns(4).search(this.value).draw();
    });
    $('#gender').on('change', function(){
        table.columns(5).search(this.value).draw();
    });
    $('#email').on('keyup', function(){
        table.columns(6).search(this.value).draw();
    });
    $('#contact_number').on('keyup', function(){
        table.columns(7).search(this.value).draw();
    });
    $('#index').on('keyup', function(){
        table.columns(0).search(this.value).draw();
    });
    $('#strong_search').on('keyup', function(){
        table.search(this.value).draw();
    });
    $('#entries').on('change', function(){
        table.page.len(this.value).draw();
    });
    $('#reset').on('click', function(){ 
        $('.filter').val('');
        table.columns().search('').draw();
    });
    row_click();
    }
})


function row_click(){
        $(document).on('click', '.row_elem', function(){
            get_student(this.id).then(data => {
                if (data.status==200){
                    const modal_title = document.getElementById('student_modalLabel');
                    const pic = document.getElementById('mod_pic');
                    const name = document.getElementById('mod_name');
                    const email = document.getElementById('mod_email');
                    const contact_number = document.getElementById('mod_contact_number');
                    const birthday = document.getElementById('mod_birthday');
                    const age = document.getElementById('mod_age');
                    const gender = document.getElementById('mod_gender');
                    const address = document.getElementById('mod_address');
                    const guardian = document.getElementById('mod_guardian');
                    pic.src = data.body.image;
                    if (data.body.middle_initial){
                        data.body.middle_initial += '.';
                    }
                    if (!data.body.age){
                        data.body.age="NA";
                    }
                    if (data.body.address=="None"|data.body.address==""){
                        data.body.address="NA";
                    }
                    if (data.body.guardian=="None"|data.body.guardian==""){
                        data.body.guardian="NA";
                    }
                    if (!data.body.birthday){
                        data.body.birthday="NA";
                    }
                    name.innerHTML = `<strong>${data.body.last_name}, ${data.body.first_name} ${data.body.middle_initial}</strong>`;
                    email.textContent = `Email: ${data.body.email}`;
                    contact_number.textContent = `Contact #: ${data.body.contact_number}`;
                    age.textContent = `Age: ${data.body.age}`;
                    birthday.textContent = `Birthday: ${data.body.birthday}`;
                    gender.textContent = `Gender: ${data.body.gender}`;
                    address.textContent = `Address: ${data.body.address}`;
                    guardian.textContent = `Guardian: ${data.body.guardian}`;
                    modal_title.textContent = data.body.student_id;
                    const modal = $('#student_modal');
                    modal.modal();
                }
            });
        });
}

function set_icon(data){
    const icon = document.getElementById('icon');
    icon.src = data.icon;
}

function head_text(data){
    document.getElementById('school').innerHTML = data.school;
    document.getElementById('degree').innerHTML = data.degree;
    document.getElementById('year_section').innerHTML = `${data.year}-${data.section}`;
    document.getElementById('school_year').innerHTML = `S.Y (${data.sy_s}-${data.sy_e})`;
}

async function get_user()
{
    const url = `/api_u/user`;
    let response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access
            },       
        })
    let data = await response.json().then(data => ({status: response.status, body: data}));
    return data;  
}

async function get_student(id)
{
    const url = `/api/student/${id}`;
    let response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access
            },       
        })
    let data = await response.json().then(data => ({status: response.status, body: data}));
    return data;  
}

async function get_table_data(id) 
{
    const url = `/api/batch/${id}`;
    let response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access
            },       
        })
    let data = await response.json().then(data => ({status: response.status, body: data}));
    return data;
}

function table_div(data){
    const ths = ['#','Student ID', 'First Name', 'Last Name', 'M.I', 'Gender', 'Email', 'Contact No.'];
    const ths_class = ['count', 'student_id', 'first_name', 'last_name', 'middle_initial', 'gender', 'email', 'contact_number'];
    const table = document.createElement('table');
    table.setAttribute('id', 'table_main');
    table.classList.add('table', 'table-hover', 'table-striped', 'table-sm');
    const thead = document.createElement('thead');
    thead.classList.add('bg-dark', 'text-white');
    const hrow = document.createElement('tr');
    for(let each in ths){
        const th = document.createElement('th');
        th.innerHTML = ths[each];
        th.setAttribute('id', ths_class[each]);
        hrow.append(th);
    }
    thead.append(hrow);
    table.append(thead);
    const body = document.createElement('tbody');
    body.classList.add('table-bordered');
    for (let i=0; data.length>i; i++){
        const index = document.createElement('td');
        const brow = document.createElement('tr');
        brow.classList.add('row_elem');
        brow.setAttribute('id', data[i].student_id);
        index.innerHTML = i+1;
        brow.append(index);
        for(let key in data[i]){
            const td = document.createElement('td');
            td.innerHTML = data[i][key];
            brow.append(td);
        }
        body.append(brow);
    }
    table.append(body);
    return table;
}




