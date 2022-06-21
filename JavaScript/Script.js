function mobilemenu(){

    if(document.getElementById('list-item').style.display == 'block'){

        document.getElementById('list-item').style.display = 'none';

    }else{

        document.getElementById('list-item').style.display = 'block';
    }
}
document.getElementById('menu-icon').addEventListener('click',mobilemenu);

function table() {
    let table = `<table class="table">
        <thead>
            <tr>
                <th>S.NO</th>
                <th>Name</th>
                <th>SurName</th>
                <th >Email</th>
                <th>Actions</th>
                </tr>
        </thead>
        <tbody>`;
            for (let i = 0; i < details.length; i++){
                table = table + `<tr>
            <td>${i + 1}</td>
            <td>${details[i].name}</td>
            <td>${details[i].surname}</td>
            <td>${details[i].email}</td>
            <td><button  onClick="editFn(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button  onClick="deletFn(${i})"><i class="fa-solid fa-trash"></i></button>
            </td>
            </tr> `;
            };
            table = table+`</tbody>
    </table>`;
    document.getElementById("table").innerHTML = table;
};

var form=document.getElementById("form");
form.addEventListener("submit",store);
details = [];
getData();
table();
function getData(){
    let Data = localStorage.getItem("details");
    if (Data) {
        details = JSON.parse(Data);
    } else {
        setData();
    };
};
function setData() {
    localStorage.setItem("details", JSON.stringify(details));
};
function store(){
    let name = document.getElementById("name");
    let surname=document.getElementById("surname");
    let email = document.getElementById("email");

    if (name.value == "" || surname.value=="" || email.value=="") {
        alert("please fill the details!");
        return
    }
    else if( (!isNaN(name.value)) || (!isNaN(surname.value)) ){
        alert("fields should not be numbers!");
        return
    }
    let data = {
        name: name.value,
        surname:surname.value,
        email: email.value
    };
    details.push(data);
    setData();
    table();
    name.value = "";
    surname.value="";
    email.value = "";
}
function deletFn(index){
    alert("delete");
    details.splice(index, 1);
    setData();
    table();
}
 function editFn(index){
    alert("edit");
    let editForm=`
    
     <div class="contacts">
        <div class="name">
            <label>Name</label>
            <input type="text" value="${details[index].name}" placeholder="Update Your Name" id="updatedName">
        </div>
        <div class="surname">
            <label>Surame</label>
            <input type="text" value="${details[index].surname}" placeholder="Update Your Surname" id="updatedSurname">
        </div>
        <div class="email">
            <label>Email address</label>
            <input type="email" value="${details[index].email}" placeholder="Update Ypur Email" id="updatedEmail">
        </div>
        <div class="button-div">
           <input type="submit" value="update Details" class="button1" onClick="update(${index})">
        </div>
    </div>
    `;
    document.getElementById("form").innerHTML = editForm;
}

function update(index) {
    let updatedName = document.getElementById("updatedName");
    let updatedSurname=document.getElementById("updatedSurname");
    let updatedEmail = document.getElementById("updatedEmail");

    details[index] = {
        name: updatedName.value,
        surname:updatedSurname.value,
        email: updatedEmail.value
    };
    setData();
    table();
    document.getElementById("editForm").innerHTML = store();
}

F
