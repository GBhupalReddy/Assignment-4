var alphaExp = /^[a-zA-Z]+$/;
let errorMsg = document.querySelectorAll(".error");
var buttonContainer=document.getElementById("buttonContainer");
var form=document.getElementById("form");
form.addEventListener("submit",store);
details = [];
getData();
table();
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
    let name = document.getElementById("name").value = "";
    let surname = document.getElementById("surname").value ="";
    let email = document.getElementById("email").value = "";
};
function store(){
    let name = document.getElementById("name").value;
    let surname=document.getElementById("surname").value;
    let email = document.getElementById("email").value;
    email = email.toLowerCase();
    let data = {
        name,
        surname,
        email
    };
    if(validate())
    {

      for(i=0;i<details.length;i++){
        if(details[i].email==email){
          errorMsg[2].textContent= "email allready exist";
          event.preventDefault();
            return false;
        }

    }

    details.push(data);
    setData();
    table();
    name.value = "";
    surname.value="";
    email.value = "";
    }
    event.preventDefault();
}
function deletFn(index){
    alert("perform delete operation");
    details.splice(index, 1);
    setData();
    table();
}
 function editFn(index){
    alert("perform update operation");
    let name = document.querySelector("#name");
    let surname = document.querySelector("#surname");
    let email = document.querySelector("#email");

    name.value = `${details[index].name}`;
    surname.value = `${details[index].surname}`
    email.value = `${details[index].email}`;
    buttonContainer.innerHTML = `<input type="submit" value="update Details" class="button1" onClick="update(${index})">`
}
function update(index) {
  debugger
    let name = document.getElementById("name").value;
    let surname=document.getElementById("surname").value;
    let email = document.getElementById("email").value;
    email = email.toLowerCase();
    details[index] = {
        name,
        surname,
        email
    };
    if(validate())
    {
      for(i=0;i<details.length;i++){
        if(details[i].email==email){
          errorMsg[2].textContent= "email allready exist";
          event.preventDefault();
            return false;
        }

    }
        setData();
        table();
        buttonContainer.innerHTML = `<input type="submit" value="Add Friend" class="button1">`
    }
}
function validate(){
    let isvalidTrue=true;
    let name = document.getElementById("name");
    let surname=document.getElementById("surname");
    let email = document.getElementById("email");
    
  if (name.value == "")
  {
    errorMsg[0].textContent = "*FirstName can't be empty";
    return false;
  }
  if(!(name.value.match(alphaExp)))
  {
    errorMsg[0].textContent = "*Name Take only alphabet characters ";
    return false;  
  }
  else if(name.value.length<3)
  {
    errorMsg[0].textContent = "*Name Must be minimum 3 characters";
    return false;
  }
  else if(name.value.length>10)
  {
    errorMsg[0].textContent = "*Name Must be maximum 10 characters";
    return false;
  }
  else{
    errorMsg[0].textContent ="";
  }

  if (surname.value == "")
  {
    errorMsg[1].textContent = "*SurFirstname can't be empty";
    return false;
  }
  if(!(surname.value.match(alphaExp)))
  {
    errorMsg[1].textContent = "*SurName Take only alphabet characters ";
    return false;  
  }
  else if(surname.value.length<3)
  {
    errorMsg[1].textContent = "*SurName Must be minimum 3 characters";
    return false;
  }
  else if(surname.value.length>10)
  {
    errorMsg[1].textContent = "*SurName Must be maximum 10 characters";
    return false;
  }
  else{
    errorMsg[1].textContent ="";
  }

  if (email.value == "")
  {
    errorMsg[2].textContent = "*Email can't be empty";
    return false;
  }
  else if((!(email.value).endsWith("@gmail.com")) && (!(email.value).endsWith("@qualminds.com")))
  {
    errorMsg[2].textContent = "*allow only gmail and qualminds emails";
    return false;  
  }
  else{
    errorMsg[2].textContent ="";
  }

return isvalidTrue;
}