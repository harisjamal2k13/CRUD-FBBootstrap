var list = document.getElementById("list");

firebase.database().ref('todo').on('child_added', function (data) {
    //  Create li tag with text node 
    var li = document.createElement('ol')
    var liText = document.createTextNode(data.val().value)
    li.appendChild(liText)
    // Create delete button 
    var delBtn = document.createElement("button")
    var delText = document.createTextNode("DELETE")
    delBtn.setAttribute("class", "btn btn-danger remov")
    delBtn.setAttribute("id", data.val().key)
    delBtn.setAttribute("onclick", 'deleteItem(this)')
    delBtn.appendChild(delText)
    // Create edit button todo
    var editBtn = document.createElement("button")
    var editText = document.createTextNode("EDIT")
    editBtn.setAttribute("class", "btn btn-success edit")
    editBtn.appendChild(editText)
    editBtn.setAttribute('id', data.val().key)
    editBtn.setAttribute("onclick", 'editItem(this)')

    li.appendChild(delBtn)
    li.appendChild(editBtn)
    list.appendChild(li)

    // todo_item.value = " "
})

function addTodo() {
    var todo_item = document.getElementById("todo-item");
    
    var key = firebase.database().ref('todo').push().key
    var todo = {
        value: todo_item.value,
        key: key
    }
    firebase.database().ref('todo').child(key).set(todo)
    todo_item.value = ""
}

function deleteItem(e) {
        firebase.database().ref('todo').child(e.id).remove()
        e.parentNode.remove()
}
function editItem(e) {
    var val = prompt("Enter Updated Value", e.parentNode.firstChild.nodeValue)
    var editTodo = {
        value : val,
        key : e.id
    }
    firebase.database().ref('todo').child(e.id).set(editTodo)
    e.parentNode.firstChild.nodeValue = val;
}
function deleteAll() {
    firebase.database().ref('todo').remove()
    list.innerHTML = ""
}

