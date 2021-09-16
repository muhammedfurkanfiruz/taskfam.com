const todoList = [];

function getValueFromInput() {
    let todoInput = document.getElementById('todoInput');
    let val = todoInput.value;
    todoList.push(val)
    let list = document.getElementById('todoList')
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(val));
    list.appendChild(li);

    console.log(todoList);
    todoInput.value = ""; //input clear
}

//saklanan veriyi sonradan basmak için kullancaz
// let html = '';

// todoList.forEach(function (name) {
//     html += '<li>' + name + '</li>';
// });

// html = (`<ul>  ${html}  <ul> `);
// console.log(html);
// document.getElementById('name_ıd').innerHTML = html