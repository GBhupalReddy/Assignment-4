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
var alphaExp = /^[a-zA-Z]+$/;
function validate(){
    let isvalidTrue=true;
    let name = document.getElementById("name");
    let surname=document.getElementById("surname");
    let email = document.getElementById("email");
    if (name.value == "" || surname.value=="" || email.value=="") {
      alert("please fill the details!");
      return  isValidTrue=false;
  }
  else if( (!isNaN(name.value)) || (!isNaN(surname.value)) ){
      alert("fields should not be numbers!");
      return isValidTrue=false;
  }
  else if(name.value.length<3 || surname.value.length<3){
    alert("minimum 3 characters needed");
    return  isValidTrue=false;
}
else if(name.value.length>10 || surname.value.length>10){
    alert("maximum 10 characters allowed");
    return  isValidTrue=false;
}
else if((!(email.value).endsWith("@gmail.com")) && (!(email.value).endsWith("@qualminds.com"))){
    alert("allow only gmail and qualminds emails");
      return  isValidTrue=false;
}
else if(!(name.value.match(alphaExp)) || !(surname.value.match(alphaExp))){
    alert("Name and SurName Take only alphabet characters ");
      return  isValidTrue=false;
}
return isvalidTrue;
}
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
    if(validate())
    {
    details.push(data);
    setData();
    table();
    name.value = "";
    surname.value="";
    email.value = "";
    }
}
function deletFn(index){
    alert("delete");
    details.splice(index, 1);
    setData();
    table();
}
 function editFn(index){
    alert(" edit ");
    let editForm=`
     <div class="contacts">
        <div class="name">
            <label>Name</label>
            <input type="text" value="${details[index].name}" id="name">
        </div>
        <div class="surname">
            <label>Surame</label>
            <input type="text" value="${details[index].surname}"  id="surname">
        </div>
        <div class="email">
            <label>Email address</label>
            <input type="email" value="${details[index].email}" id="email">
        </div>
        <div class="button-div">
           <input type="submit" value="update Details" class="button1" onClick="update(${index})">
        </div>
    </div>
    `;
    document.getElementById("form").innerHTML = editForm;
}
function update(index) {
    let name = document.getElementById("name");
    let surname=document.getElementById("surname");
    let email = document.getElementById("email");
    details[index] = {
        name:name.value,
        surname:surname.value,
        email:email.value
    };
    let UpdateForm=`
  <div class="addfriend" >
        <div class="name">
         <label>Name</label><br>
         <input type="text" id="name" placeholder="George">
        </div>
        <div class="surname">
            <label>Surname</label><br>
            <input type="text" id="surname" placeholder="Stone">
        </div>
        <div class="email">
            <label>Email address</label><br>
            <input type="text" id="email" placeholder="george.stone@gmail.com">
        </div>
        <div class="add">
            <button class="add" type="submit">Add Friend</button>
        </div>
    </div>
    `;
    if(validate())
    {
        setData();
        table();
    }
    document.getElementById("form").innerHTML=UpdateForm;
}
