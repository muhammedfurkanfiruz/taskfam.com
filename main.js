var todoList = [];
let todoInput = document.getElementById("todoInput");
let submitBtn = document.getElementById("submitBtn");
let addULButton = `<button id="addUlButton" class="add-list-btn btn" onclick=" addNewUL();">Add a list</button>`;
getLocalStorage();

function getValueFromInput() {
  let val = todoInput.value;
  if (val == "") {
    toastr.warning("Boş ekleme yapılamaz!");
  }

  if (val !== "") {
    var uniq = "id" + new Date().getTime();
    todoList.push({ id: uniq, text: val, isDone: false });
    setLocalStorage();
    let list = document.getElementById("todoList");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(val));
    list.appendChild(li);
    toastr.success("Ekleme başarılı ! ");
    todoInput.value = ""; //input clear
    getLocalStorage();
  }
}

todoInput.addEventListener("keyup", function (event) {
  //add todo with enter key
  event.preventDefault();
  if (event.key === "Enter") {
    submitBtn.click();
  }
});
//  var data = [ {'Id' : 0,'text' : 'Alperen', },{  'Id' : 5,'text' : 'Alpiş', }];
function setLocalStorage() {
  localStorage.setItem("TaskList", JSON.stringify(todoList)); // setting the data to the local storage
  restartHideFunction()
  
}

function getLocalStorage() {
  let gettingval = localStorage.getItem("TaskList");
  if (gettingval !== null) {
    let veri = JSON.parse(gettingval);
    todoList = veri;

    let html = "";

    todoList.forEach(function (todo) {
      html += ` 
            <li class="todo-li" id="${todo.id}">  
                
                <input class="check_class" id="${todo.id}"  onclick="checkBox(event)"type="checkbox" ${todo.isDone ? 'checked' : ''} id="flexCheckDefault">
                <span id="text${todo.id}" class="spn_class">${todo.text}  </span>
                <input id="${todo.id}" data-access="input${todo.id}" value="${todo.text}" class="form-control d-none inputClass" onKeyUp=updateItem(event)  />  
                <button onclick="removeItem(event)" id="${todo.id}" class="btn btn-danger todo-btn"><i class="far fa-trash-alt icon"></i></button> 
                <button id="${todo.id}" data-access="edit${todo.id}" class="btn btn-primary todo-btn" onclick="showEditInput(event)"> <i class="far fa-edit icon " ></i></button>
                <button id="${todo.id}" data-access="check${todo.id}" onclick="hideInput(event)" type="button" class="btn btn-success d-none todo-btn"><i class="fas fa-check-circle icon"></i></button>
                </li> `;
      // html += "<li id="+todo.id + ">"  +  "<button  id="+todo.id +" + "onclick=showId();>"  + "Id göster" +  "</button>" + todo.text + "</li>";
      console.log(todoList);
      return html;
    });

    //html = (`<ul>  ${html}  <ul> `);
    document.getElementById("todoList").innerHTML = html;
  }
}

function checkBox(event){
let id = event.target.id
let gettingId = todoList.findIndex(x => x.id === id);
todoList[gettingId].isDone = !todoList[gettingId].isDone;
console.log(todoList[gettingId]);
setLocalStorage()
}

function removeItem(event) {
    let itemId = event.target.id;
    const removeIndex = todoList.findIndex((item) => item.id === itemId); //arrayden silme
    todoList.splice(removeIndex, 1);
    document.getElementById(itemId).remove(); //html'den silme
    setLocalStorage();
}

function updateItem(event) {
  let id = event.target.id;
  let achived = document.getElementById("text" + id);
  console.log(id);
  let updated = event.target.value; // inputtan gelen veri
  achived.innerText = updated;
  const arrayItem = todoList.findIndex((item) => item.id === id); // arrayi burada güncelledik
  todoList[arrayItem].text = updated;
  setLocalStorage();
}

function showEditInput(event){
let id =  event.target.id;
let spn = document.getElementById('text'+id)
spn.style.display= "none";
let node = document.querySelector(`[data-access="input${id}"]`);
node.classList.remove('d-none');
let edit = document.querySelector(`[data-access="edit${id}"]`);
edit.style.display= "none";
let check =document.querySelector(`[data-access="check${id}"]`);
check.classList.remove('d-none');
}

function hideInput(event){
  let id =  event.target.id;
  console.log(id);
  let spn = document.getElementById('text'+id)
  console.log(spn);
  let node = document.querySelector(`[data-access="input${id}"]`);
  spn.style.display= "block";
  node.classList.add('d-none');
  let edit = document.querySelector(`[data-access="edit${id}"]`);
  edit.style.display= "block";
  let check = document.querySelector(`[data-access="check${id}"]`);
  check.classList.add('d-none');
  }
  
function restartHideFunction(){
  var classname = document.getElementsByClassName("inputClass");

  for (i = 0; i < classname.length; i++) {
    classname[i].addEventListener('keyup', function(event) {
       event.preventDefault();
       if (event.key === "Enter") {
        hideInput(event)
      }
    });
  }
}

restartHideFunction();

function addNewUL (){
  document.getElementById("addUlButton").remove();

  var target = document.querySelector("#lists_container");
  target.innerHTML += '<div class="list"><p>Some text that should be appended...</p></div>';

  target.innerHTML += addULButton;
}

