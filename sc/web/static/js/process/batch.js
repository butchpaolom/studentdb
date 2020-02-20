

function add_row_click(){
    $(document).on('click', '.row_elem',  function(){
        window.location = `/home?id=${this.id}`
    })
}

function head_text(data){
    if (data.school == "None"){
        const div = document.createElement('h1');
        div.classList.add('row', 'd-flex', 'justify-content-between', 'mx-0');
        const admin = document.createElement('h1');
        admin.classList.add('lead','btn','btn-outline-dark');
        admin.setAttribute('id', 'admin_link')
        admin.textContent = "Goto ADMIN PAGE"
        admin.addEventListener('click', function(){
            window.location = '/admin';
        });
        const strong = document.createElement('strong');
        const h1 = document.createElement('h1');
        h1.classList.add('lead');
        h1.textContent = `Welcome ${data.first_name}!`;
        strong.append(h1);
        div.append(strong);
        div.append(admin);
        document.getElementById('greet').append(div);
    }
    else{
        if (!data.first_name){
            document.getElementById('greet').textContent = `You are from ${data.school}!`;
        }
        else{
            document.getElementById('greet').textContent = `Welcome ${data.first_name} of ${data.school}!`;
        }
    }
        
    const icon = document.getElementById('icon');
    icon.src = data.icon;
}

get_table_data().then(data => {
    if (data.status==200){
        get_user().then(data => {
            head_text(data.body);
        });
        get_degrees().then(data => {
            console.log(data);
            const degree_sel = document.getElementById('degree');
            for (let i=0; data.body[0].degrees.length>i; i++){
                const opt = document.createElement('option');
                opt.textContent = data.body[0].degrees[i].title;
                opt.value = data.body[0].degrees[i].title;
                degree_sel.append(opt);
            }
        });
        get_sys().then(data => {
            const sy_sel = document.getElementById('sy');
            for (let i=0; data.body.length>i;i++){
                const opt = document.createElement('option');
                opt.textContent = data.body[i].sy;
                opt.value = data.body[i].sy;
                sy_sel.append(opt);
            }
        });
        const content = document.getElementById('content');
        content.classList.remove('d-none');
        const main = document.getElementById('main');
        main.append(table_div(data.body));
        let table = $('#table_main').DataTable({
            lengthMenu: [5, 10, 15],
            pageLength: 10,
            bLengthChange: false,
            sDom: 'lrtip',
            columns: [
                {className: "animated fadeIn faster" },
                {className: "d-none d-md-table-cell animated fadeIn faster" },
                {className: "d-table-cell d-md-none animated fadeIn faster" },
                {className: "d-none d-md-table-cell animated fadeIn faster" },
                {className: "d-table-cell d-md-none animated fadeIn faster" },
                {className: "animated fadeIn faster" },
                {className: "animated fadeIn faster" },
                {className: "animated fadeIn faster" }
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
        $('#index').on('keyup', function(){
            table.columns(0).search(this.value).draw();
        });
        $('#school').on('keyup', function(){
            table.columns(1).search(this.value).draw();
        });
        $('#section').on('keyup', function(){
            table.columns(6).search(this.value).draw();
        });
        $('#degree').on('change', function(){
            table.columns(3).search(this.value).draw();
        });
        $('#year').on('change', function(){
            table.columns(5).search(this.value).draw();
        });
        $('#sy').on('change', function(){
            table.columns(7).search(this.value).draw();
        });
        $('#strong_search').on('keyup', function(){
            table.search(this.value).draw();
        });
        $('#reset').on('click', function(){ 
            $('.filter').val('');
            table.columns().search('').draw();
        });
        $('#entries').on('change', function(){
            table.page.len(this.value).draw();
        });
        add_row_click();
    }
})

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


async function get_degrees()
{
    const url = `/api/school`;
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

async function get_sys()
{
    const url = `/api/sy`;
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

async function get_table_data() 
{
    const url = `/api/batch`;
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
    console.log(data);
    const ths = ['#','School', 'School', 'Degree', 'Deg.', 'Year', 'Section', 'Batch'];
    const ths_class = ['#','school', 'school_short', 'degree', 'degree_short', 'year', 'section', 'batch'];
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
        const brow = document.createElement('tr');
        brow.classList.add('row_elem');
        const index = document.createElement('td');
        index.innerHTML = i+1;
        brow.append(index);
        for(let key in data[i]){
            if (key!="id"){
            const td = document.createElement('td');
            td.innerHTML = data[i][key];
                if (key=="school"){
                    const hid = document.createElement('h1');
                    hid.classList.add('d-none');
                    hid.textContent = data[i]["school_short"]; 
                    td.append(hid);
                }
            brow.append(td);
            }
            else{
                brow.setAttribute('id', data[i][key]);
            }
        }
        body.append(brow);
    }
    table.append(body);
    return table;
}