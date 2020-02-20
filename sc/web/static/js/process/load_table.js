reload_table('',1);




search_btn = document.getElementById('search_btn');
search_btn.addEventListener('click', function(){
    reload_table('','');
});

document.addEventListener('keyup', function(e){
    if (e.keyCode == 13){
        reload_table('','');
    }
});

function add_sort_event(){
    const sorts = document.getElementsByClassName('sort_by');
    const current_page = document.getElementById('current_page').value;
    for(let i=0; sorts.length>i;i++){
        sorts[i].addEventListener('click', function(){
            reload_table(sorts[i].id,current_page);
        });
    }
}


function paginate(page, data){
    const row = document.createElement('div');
    const btn_group = document.createElement('div');

    
    row.classList.add('row', 'd-flex', 'justify-content-center');
    row.setAttribute('id', 'paginator')
    btn_group.classList.add('btn-group');

    if (data.previous!=null){
        const btn_left = document.createElement('button');
        btn_left.setAttribute('value', parseInt(page)-1);
        btn_left.setAttribute('id', 'previous');
        btn_left.classList.add('btn', 'btn-primary');
        btn_left.innerHTML = '<i class="fas fa-chevron-left"></i>';
        btn_group.append(btn_left);
    }

    const current_page = document.createElement('button');
    current_page.classList.add('btn', 'btn-primary', 'disabled');
    current_page.setAttribute('value', page);
    current_page.setAttribute('id', "current_page")
    current_page.innerHTML = page;
    btn_group.append(current_page);
    row.append(btn_group);

    if (data.next!=null){
        const btn_right = document.createElement('button');
        btn_right.setAttribute('value', parseInt(page)+1);
        btn_right.setAttribute('id', 'next');
        btn_right.classList.add('btn', 'btn-primary');
        btn_right.innerHTML = '<i class="fas fa-chevron-right"></i>';
        btn_group.append(btn_right);
    }

    return row;
}
{/* <div class="row d-flex justify-content-center">
<div class="btn-group" role="group">
  <button class="btn btn-primary"><i class="fas fa-chevron-left"></i></button>
  <button class="btn btn-primary">2</button>
  <button class="btn btn-primary"><i class="fas fa-chevron-right"></i></button>
</div>  
</div>   */}


function reload_table(sort_by, page){
    const search = document.getElementById('input_search').value;
    get_table_data(search,sort_by,page).then(data => {
        if (data.status == 200){
            if (document.contains(document.getElementById('table_main'))) {
                document.getElementById('table_main').remove();
            }
            if (document.contains(document.getElementById('paginator'))) {
                document.getElementById('paginator').remove();
            }
            console.log(data);
            render_to('#main', table_div(data.body.results));
            render_to('#main', paginate(page, data.body));

            const previous = document.getElementById('previous');
            const next = document.getElementById('next');

            if (document.contains(previous)) {
                previous.addEventListener('click', function(){
                    const page_previous = previous.value;
                    reload_table(sort_by, page_previous)
                });
            }
            if (document.contains(next)) {
                next.addEventListener('click', function(){
                    const page_next = next.value;
                    reload_table(sort_by, page_next)
                });
            }
            add_sort_event();
        }
    })
}




async function get_table_data(search, ordering, page) 
{
    const url = `/api/student/?search=${search}&ordering=${ordering}&page=${page}`;
    console.log(url);
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
    const ths = ['Student ID', 'First Name', 'Last Name', 'M.I', 'Degree', 'Gender', 'Age', 'Year', 'Section', 'Email', 'Contact No.'];
    const ths_class = ['count', 'first_name', 'last_name', 'middle_initial', 'degree', 'gender', 'age', 'year', 'section', 'email', 'contact_number'];
    const table = document.createElement('table');
    table.setAttribute('id', 'table_main');
    table.classList.add('table', 'table-hover', 'table-striped', 'table-sm', 'table-bordered');
    const thead = document.createElement('thead');
    thead.classList.add('thead-dark');
    const hrow = document.createElement('tr');
    for(let each in ths){
        const th = document.createElement('th');
        th.innerHTML = ths[each];
        th.classList.add('sort_by');
        th.setAttribute('id', ths_class[each]);
        hrow.append(th);
    }
    thead.append(hrow);
    table.append(thead);
    const body = document.createElement('tbody');
    for (let i=0; data.length>i; i++){
        const brow = document.createElement('tr');
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

function render_to(dest, div_with_data){
    document.querySelector(dest).append(div_with_data);
}

