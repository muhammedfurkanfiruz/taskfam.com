const todoList = [];
let todoInput = document.getElementById('todoInput');
let submitBtn = document.getElementById("submitBtn");

function getValueFromInput() {
    let val = todoInput.value;
    if (val == '')  {
        alert("empty" ); // alert
    } 
    if(val !== ''){
    todoList.push(val)
    let list = document.getElementById('todoList');
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(val));
    list.appendChild(li);
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


//saklanan veriyi sonradan basmak için kullancaz
// let html = '';

// todoList.forEach(function (name) {
//     html += '<li>' + name + '</li>';
//     return html;
// });


// html = (`<ul>  ${html}  <ul> `);
// console.log(html);
// document.getElementById('nameId').innerHTML = html








   



