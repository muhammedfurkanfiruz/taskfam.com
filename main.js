var todoList = [];
let todoInput = document.getElementById("todoInput");
let submitBtn = document.getElementById("submitBtn");
getLocalStorage();

function getValueFromInput() {
  let val = todoInput.value;
  if (val == "") {
    toastr.warning("Boş ekleme yapılamaz!");
  }

  if (val !== "") {
    var uniq = "id" + new Date().getTime();
    todoList.push({ id: uniq, text: val });
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
}

function getLocalStorage() {
  let gettingval = localStorage.getItem("TaskList");
  if (gettingval !== null) {
    let veri = JSON.parse(gettingval);
    todoList = veri;

    let html = "";

    todoList.forEach(function (todo) {
      html += ` 
            <li id="${todo.id}">  
                <span id="text${todo.id}">${todo.text} </span>
                <button onclick="removeItem(event)" id="${todo.id}" class="btn btn-danger">Sil</button> 
                <button id="${todo.id}" class="btn btn-primary"> <i class="far fa-edit"></i></button>
                <input id="${todo.id}" value="${todo.text}" class="form-control" onKeyUp=updateItem(event)  />  
            </li> `;
      // html += "<li id="+todo.id + ">"  +  "<button  id="+todo.id +" + "onclick=showId();>"  + "Id göster" +  "</button>" + todo.text + "</li>";
      console.log(todoList);
      return html;
    });

    //html = (`<ul>  ${html}  <ul> `);
    document.getElementById("todoList").innerHTML = html;
  }
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
console.log("lşdgkgkl");
