'use strickt';

let banco = []
let details = []
var idDoPai = null

const createItem = (id, nameTodoItem) => {
    const item = document.createElement('div')
    item.classList.add('todoItem')
    item.innerHTML = `
        <div class="delete button" onclick="deleteItem('${id}')"></div>
        <div class="nameTodoItem" id="nameTodoItem">${nameTodoItem}</div>
        <div class="directDetails button" onclick="directDetails('${id}')">></div>
    `
    document.getElementById('todoList').appendChild(item)
}

const createDetails = (id, nameTodoDetails) => {
    const details = document.createElement('div')
    details.classList.add('todoItem')
    details.innerHTML = `
        <input type="checkbox" class="checkmark">
        <div class="nameTodoItem" id="nameTodoDetails">${nameTodoDetails}</div>
        <div class="delete button" onclick="deleteDetail('${id}')"></div>
    `
    document.getElementById('detailsList').appendChild(details)
}

const cleanerList = () => {
    const todoList = document.getElementById('todoList')
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}

const cleanerListDetails = () => {
    const todoListDetails = document.getElementById('detailsList')
    while (todoListDetails.firstChild){
        todoListDetails.removeChild(todoListDetails.lastChild)
    }
}

const verifyNameItem = () => {
    const nameItem = document.getElementById('addNewTodoItem').value
    if (nameItem === '' || nameItem.length >= 20) {
        alert('Preencha o campo para adicionar sua lista de objetivos')
        return false
    } else {
        return true
    }
}

const verifyNameDetail = () => {
    const nameDetail = document.getElementById('addNewTodoDetails').value
    if (nameDetail === '' || nameDetail.length >= 20) {
        alert('Preencha o campo para adicionar seu objetivo')
        return false
    } else {
        return true
    }
}

const addItem = () => {
    if(verifyNameItem()){
        let nameTodoItem = document.getElementById('addNewTodoItem').value
        banco.push({'id': Math.floor(Date.now() * Math.random()).toString(36), 'nameTodoItem': nameTodoItem})
        document.getElementById('addNewTodoItem').value = ''
        updateScreen()
    }
}

const addDetails = () => {
    if (verifyNameDetail()) {
        const nameTodoDetails = document.getElementById('addNewTodoDetails').value
        details.push({'idDoPai': idDoPai, 'id': Math.floor(Date.now() * Math.random()).toString(36), 'nameTodoDetails': nameTodoDetails})
        document.getElementById('addNewTodoDetails').value = ''
        updateScreenDetails()
    }
}

const deleteItem = (id) => {
    const deletedItem = banco.findIndex(item => item.id === id)
    
    banco.splice(deletedItem, 1)
    
    details.forEach( (detail, index) => {
        if(detail.idDoPai === id) {
            detail.splice(index, 1)
        }
    })

    updateScreen()
}

const deleteDetail = (id) => {
    const deletedDetail = details.findIndex(item => item.id === id)
    details.splice(deletedDetail, 1)

    updateScreenDetails()
}

const updateScreen = () => {
    cleanerList()
    banco.forEach(item => createItem (item.id, item.nameTodoItem))
}

const updateScreenDetails = () => {
    cleanerListDetails()
    details.forEach(detail => {
        if(detail.idDoPai === idDoPai) {
            createDetails(detail.id, detail.nameTodoDetails)
        }
    })
}

const directDetails = (id) => {
    const pagLists = document.getElementById('lists')
    const pagDetails = document.getElementById('details')
    const backButton = document.getElementById('back')
    
    pagLists.style.display = 'none'
    pagDetails.style.display = 'flex'
    backButton.style.display = 'block'
    
    const listName = document.getElementById('pagTitle')
    const obj = banco.find(item => item.id === id)

    listName.innerHTML = `${obj.nameTodoItem}`
  
    idDoPai = id

    updateScreenDetails()
}

const backToLists = () => {
    const pagLists = document.getElementById('lists')
    const pagDetails = document.getElementById('details')
    const backButton = document.getElementById('back')
    const listName = document.getElementById('pagTitle')

    pagLists.style.display = 'flex'
    pagDetails.style.display = 'none'
    backButton.style.display = 'none'
    listName.innerHTML = `Lists`

    idDoPai = null
}