var todoList = [];
var todoCards = [];
let todoInput = document.getElementById("todoInput");
let submitBtn = document.getElementById("submitBtn");
let addULButton = `<button id="addUlButton" class="add-list-btn btn" onclick="addNewCard();">Add a list</button>`;

let listsCount = document.getElementsByClassName("list").length;

let count = document.getElementsByClassName("list").length;
getCards();
getLocalStorage();
enter();

function addTask(e) {
  let listId = e.target.getAttribute('data-listId'); // listenin genel id'si > erişim için kullancaz.
  let accessId = "todoInput" + listId;
  todoInput = document.getElementById(accessId);

  let val = todoInput.value;

  if (val == "") {
    toastr.warning("Boş ekleme yapılamaz!");
  }

  if (val !== "") {
    var uniq = "id" + new Date().getTime();
    todoList.push({ 
      id: uniq, 
      text: val,
      isDone: false,
      whichCard: listId
      });
    setLocalStorage();
    let accessTodoList = "todoList" + listId;
    let list = document.getElementById(accessTodoList);
    let  html = ` 
    <li class="todo-li" id="${uniq}">  
        <input class="check_class" id="${uniq}"  onclick="checkBox(event)"type="checkbox" ${false ? 'checked' : ''} id="flexCheckDefault">
        <span id="text${uniq}" class="spn_class">${val}  </span>
        <input id="${uniq}" data-access="input${uniq}" value="${val}" class="form-control d-none inputClass" onKeyUp=updateItem(event)  />  
        <button onclick="removeItem(event)" id="${uniq}" class="btn btn-danger todo-btn"><i class="far fa-trash-alt icon"></i></button> 
        <button id="${uniq}" data-access="edit${uniq}" class="btn btn-primary todo-btn" onclick="showEditInput(event)"> <i class="far fa-edit icon " ></i></button>
        <button id="${uniq}" data-access="check${uniq}" onclick="hideInput(event)" type="button" class="btn btn-success d-none todo-btn"><i class="fas fa-check-circle icon"></i></button>
    </li> `;
    // let li = document.createElement("li");
    //  li.appendChild(document.createTextNode(val));
    $(`#todoList${listId}`).append(html)
    // toastr.success("Ekleme başarılı ! ");
    todoInput.value = ""; //input clear
    let id = e.target.getAttribute('data-listId');
    // getLocalStorage(id);
  }
}

function setLocalStorage() {
  localStorage.setItem("TaskList", JSON.stringify(todoList)); // setting the data to the local storage
  restartHideFunction()
}

function getLocalStorage(id) {
  let gettingval = localStorage.getItem("TaskList");
  if (gettingval !== null) {
    let veri = JSON.parse(gettingval);
    todoList = veri;
    let html = "";

    todoList.forEach(function (todo) {
      // console.log("localsotarageden gelen veri şuı kartta" + " "+todo.whichCard)
      html = ` 
            <li class="todo-li" id="${todo.id}">  
                <input class="check_class" id="${todo.id}"  onclick="checkBox(event)"type="checkbox" ${todo.isDone ? 'checked' : ''} id="flexCheckDefault">
                <span id="text${todo.id}" class="spn_class">${todo.text}  </span>
                <input id="${todo.id}" data-access="input${todo.id}" value="${todo.text}" class="form-control d-none inputClass" onKeyUp=updateItem(event)  />  
                <button onclick="removeItem(event)" id="${todo.id}" class="btn btn-danger todo-btn"><i class="far fa-trash-alt icon"></i></button> 
                <button id="${todo.id}" data-access="edit${todo.id}" class="btn btn-primary todo-btn" onclick="showEditInput(event)"> <i class="far fa-edit icon " ></i></button>
                <button id="${todo.id}" data-access="check${todo.id}" onclick="hideInput(event)" type="button" class="btn btn-success d-none todo-btn"><i class="fas fa-check-circle icon"></i></button>
            </li> `;
      // html += "<li id="+todo.id + ">"  +  "<button  id="+todo.id +" + "onclick=showId();>"  + "Id göster" +  "</button>" + todo.text + "</li>";
      // console.log(todoList);
      $(`#todoList${todo.whichCard}`).append(html)
    });
    //document.getElementById("todoList0").innerHTML = html;
  }
}

function checkBox(event){
let id = event.target.id
let gettingId = todoList.findIndex(x => x.id === id);
todoList[gettingId].isDone = !todoList[gettingId].isDone;
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
  let spn = document.getElementById('text'+id)
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


function addNewCard (){
  listsCount = document.getElementsByClassName("list").length;
  let id = listsCount;

  document.getElementById("addUlButton").remove();

  var target = document.querySelector("#lists_container");
  
  target.innerHTML += `
  <div  id=${id} class="list">
    <div class="card-header">
      <h3 id="text${id}" class="list-title" onClick="editCardHeader(event) ">New Card</h3>  
      <input id="${id}" data-access="input${id}" value="New Card" class="form-control d-none inputClass" onKeyUp="updateCardHeader(event)" />  
      <i class="far fa-calendar-times deleteicon"  onClick="deleteCards(event)"></i>
    </div>
  <ul class="list-items" id="todoList${id}"></ul>
  <input class="form-control form-control-lg inp" id="todoInput${id}" type="text" placeholder="Add a new task" aria-label=".form-control-sm example">
  <button type="button" id="submitBtn${id}" data-listId="${id}" onclick="addTask(event);" class="btn btn-info">Add</button>
  </div>`;
  
  target.innerHTML += addULButton;
  
  todoCards.push({
    id: id,
    text: "New Card" 
  })


  localStorage.setItem("TaskCards", JSON.stringify(todoCards)); // setting the data to the local storage
  count+=1;
  enter();
}

function drawCards(){
  todoCards.forEach(function (card) {
    let id = card.id;
    let text = card.text;

    document.getElementById("addUlButton").remove();
  
    var target = document.querySelector("#lists_container");
    
    target.innerHTML += `
    <div id=${id} class="list">
    <div class="card-header">
  
    <h3 id="text${id}" class="list-title" onClick="editCardHeader(event)">${text}</h3>  
    <input id="${id}" data-access="input${id}" value="${text}" class="form-control d-none inputClass" onKeyUp="updateCardHeader(event)"/>  
    <i class="far fa-calendar-times deleteicon"  onClick="deleteCards(event)"></i>
    </div>
     
      <ul class="list-items" id="todoList${id}"></ul>
      <input class="form-control form-control-lg inp" id="todoInput${id}" type="text" placeholder="Add a new task" aria-label=".form-control-sm example">
      <button type="button" id="submitBtn${id}" data-listId="${id}" onclick="addTask(event);" class="btn btn-info">Add</button>
    </div>`;
  
    target.innerHTML += addULButton;
 
  });
   listsCount = document.getElementsByClassName("list").length;

 count = document.getElementsByClassName("list").length;
}

function enter() {
  console.log("enter çalışıtı")
  for(let i = 0; i<count; i++ ){
    inputIDs = document.getElementById(`todoInput${i}`);
inputIDs.addEventListener("keyup", function (event) {
  //add todo with enter key
  event.preventDefault();
  if (event.key === "Enter") {
    submitBtn = document.getElementById("submitBtn" + i);
    submitBtn.click();
  }
})

  }
 


}

function getCards(){
  let data = JSON.parse(localStorage.getItem("TaskCards")) // setting the data to the local storage
  if (data !== null) {
    todoCards = data;
  }

  drawCards()
}

function deleteCards(event){

let id= event.target.parentNode.parentNode.id

document.getElementById(id).remove(); 
removeCardFromLocalStorage(id)

for(todo in todoList){
  let removeIndex = todoList.findIndex((item) => item.whichCard === id);
  todoList.splice(removeIndex, 1);
  setLocalStorage();
}
}

function editCardHeader(e){
  console.log(e.target)
}

function removeCardFromLocalStorage(id) {
  let itemId = id;
  const removeIndex = todoCards.findIndex((item) => item.id === itemId); //arrayden silme
  todoCards.splice(removeIndex, 1);
   //html'den silme
  
   localStorage.setItem("TaskCards", JSON.stringify(todoCards));
}

function updateCardHeader(event) {
  let id = event.target.id;
  let achived = document.getElementById("text" + id);
  let updated = event.target.value; // inputtan gelen veri
  achived.innerText = updated;
  
  // let cardindex = todoCards.findIndex((item) => item.id === id); // arrayi burada güncelledik
  let cardindex = id - 1;

  todoCards[cardindex].text = updated;
  localStorage.setItem("TaskCards", JSON.stringify(todoCards));

  

}




