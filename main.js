var  todoList = [];
getLocalStorage();
let todoInput = document.getElementById('todoInput');
let submitBtn = document.getElementById("submitBtn");

function getValueFromInput() {
    let val =  todoInput.value;
    if (val == '')  {
        toastr.warning("Boş ekleme yapılamaz!");
    } 
    
    if(val !== ''){
    var uniq = 'id' + (new Date()).getTime();
    todoList.push({'id' : uniq, 'text': val })
    setLocalStorage();
    let list = document.getElementById('todoList');
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(val));
    list.appendChild(li);
    toastr.success( 'Ekleme başarılı ! ');
    todoInput.value = ""; //input clear
    console.log(todoList);
 
    }
  
}




todoInput.addEventListener("keyup", function(event)  { //add todo with enter key
    event.preventDefault();
    if (event.key === 'Enter' ) {
        submitBtn.click();
    }
});
//  var data = [ {'Id' : 0,'text' : 'Alperen', },{  'Id' : 5,'text' : 'Alpiş', }];
function setLocalStorage(){
    localStorage.setItem('TaskList', JSON.stringify(todoList)); // setting the data to the local storage
  
}
function getLocalStorage(){

 
   let  gettingval =  localStorage.getItem('TaskList');
   if(gettingval !== null ){
   let veri = JSON.parse(gettingval)
   todoList = veri 
   console.log(todoList);

   let html = '';

todoList.forEach(function (todo) {
    html += '<li>' + todo.text + '</li>';
    return html;

} ) ;


//html = (`<ul>  ${html}  <ul> `);
console.log(html);
document.getElementById('todoList').innerHTML = html
}}













   



