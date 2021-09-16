const todoList = [];

function getValueFromInput() {
    let myInput = document.getElementById('exampleFormControlTextarea1');
    let val = myInput.value;
    todoList.push(val)
    let list = document.getElementById('todoList')
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(val));
    list.appendChild(li);

    console.log(todoList);
    myInput.value = ""; //input clear
    return todoList;
}

//saklanan veriyi sonradan basmak için kullancaz
// let html = '';

// todoList.forEach(function (name) {
//     html += '<li>' + name + '</li>';
// });

// html = (`<ul>  ${html}  <ul> `);
// console.log(html);
// document.getElementById('name_ıd').innerHTML = html