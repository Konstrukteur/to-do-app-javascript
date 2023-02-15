const addButton = document.querySelector('#add-task-button');
const editButton = document.querySelector('#edit-task-button');
const deleteButton = document.querySelector('#delete-task-button');
const clearButton = document.querySelector('#clear-button');

class Item {
    constructor(taskID, taskText) {
        this.taskID = taskID;
        this.taskText = taskText;
    }

    // counter to increment every time a new instance is created, for a local storage ID
    static count = 0;

    // add new todo task
    addItem() {
        localStorage.setItem(this.taskID, this.taskText);
        this.#writeElements(this.taskID, this.taskText);
        document.getElementById(`${this.taskID}-edit-button`).addEventListener("click", () => editEventListener(this.taskID));
        document.getElementById(`${this.taskID}-save-button`).addEventListener("click", () => saveEventListener(this.taskID));
        document.getElementById(`${this.taskID}-delete-button`).addEventListener("click", () => deleteEventListener(this.taskID));
        document.getElementById(`${this.taskID}-completed-checkbox`).addEventListener("click", () => completedEventListener(this.taskID));
        document.getElementById('add-task-input').value = '';   // clear input box on item add
    }

    // private method for writing to DOM
    #writeElements(taskID, taskText) {
        // create initial div tag
        let taskItem = document.createElement('div');
        taskItem.setAttribute('class', 'list-input-box-task');
        taskItem.setAttribute('id', taskID);
        document.getElementById('todo-list').appendChild(taskItem);
        // create text box
        let taskTitle = document.createElement('div')
        taskTitle.setAttribute('class', 'task-description');
        taskTitle.setAttribute('id', taskID + '-description');
        taskTitle.innerHTML = taskText;
        document.getElementById(taskID).appendChild(taskTitle);
        // create input box
        let taskBox = document.createElement('input')
        taskBox.setAttribute('type', 'text');
        taskBox.setAttribute('class', 'task-input-field');
        taskBox.setAttribute('id', taskID + '-text');
        taskBox.setAttribute('value', taskText);
        taskBox.style.display = "none";
        document.getElementById(taskID).appendChild(taskBox);
        // create edit button
        let editTaskButton = document.createElement('input');
        editTaskButton.setAttribute('type', 'button');
        editTaskButton.setAttribute('class', 'btn-sub btn-edit');
        editTaskButton.setAttribute('id', taskID + '-edit-button')
        editTaskButton.setAttribute('value', 'Edit');
        document.getElementById(taskID).appendChild(editTaskButton);
        // create save button
        let saveTaskButton = document.createElement('input');
        saveTaskButton.setAttribute('type', 'button');
        saveTaskButton.setAttribute('class', 'btn-sub btn-save');
        saveTaskButton.setAttribute('id', taskID + '-save-button')
        saveTaskButton.setAttribute('value', 'Save');
        saveTaskButton.style.display = "none";
        document.getElementById(taskID).appendChild(saveTaskButton);
        // create delete button
        let deleteTaskButton = document.createElement('input');
        deleteTaskButton.setAttribute('type', 'button');
        deleteTaskButton.setAttribute('class', 'btn-sub btn-delete');
        deleteTaskButton.setAttribute('id', taskID + '-delete-button')
        deleteTaskButton.setAttribute('value', 'Delete');
        document.getElementById(taskID).appendChild(deleteTaskButton);
        // create 'done' checkbox
        let completeCheckbox = document.createElement('input');
        completeCheckbox.setAttribute('type', 'checkbox');
        completeCheckbox.setAttribute('id', taskID + '-completed-checkbox')
        completeCheckbox.setAttribute('value', 'Complete');
        document.getElementById(taskID).appendChild(completeCheckbox);
        // update counter
        Item.countTasks();
    }

    // delete todo task
    static deleteItem(taskID) {
        localStorage.removeItem(taskID);
        const currentDiv = document.getElementById(taskID);
        currentDiv.remove();
        Item.countTasks();
    }

    // add edit todo task
    editItem() {

    }

    static destroy() {
        Item.count = 0; // reset ID counter
        localStorage.clear(); // destroy local storage
        let taskItems = document.querySelectorAll('.list-input-box-task');
        taskItems.forEach(task => task.remove());
        Item.countTasks();
    }

    static countTasks() {
        let taskListItems = document.querySelectorAll('.list-input-box-task');
        document.getElementById('pending-tasks').innerText = taskListItems.length;
        document.getElementById('todo-list').style.visibility = 'visible';
    }
}

const editEventListener = (taskID) => {
    const descriptionField = document.getElementById(taskID + "-description");
    descriptionField.style.display = "none";
    const inputField = document.getElementById(taskID + "-text");
    inputField.style.display = "block";
    const editButton = document.getElementById(taskID + "-edit-button");
    editButton.style.display = "none";
    const saveButton = document.getElementById(taskID + "-save-button");
    saveButton.style.display = "block";
}
const saveEventListener = (taskID) => {
    const descriptionField = document.getElementById(taskID + "-description");
    descriptionField.style.display = "block";
    const inputField = document.getElementById(taskID + "-text");
    inputField.style.display = "none";
    const editButton = document.getElementById(taskID + "-edit-button");
    editButton.style.display = "block";
    const saveButton = document.getElementById(taskID + "-save-button");
    saveButton.style.display = "none";
    value = inputField.value;
    descriptionField.innerHTML = value;
    localStorage.setItem(taskID, value)
}
const deleteEventListener = (taskID) => {
    Item.deleteItem(taskID);
}
const completedEventListener = (taskID) => {
    const taskBox = document.getElementById(taskID + "-description");
    const taskCheckbox = document.getElementById(taskID + "-completed-checkbox")
    if (taskCheckbox.checked) {
        taskBox.style.background = "#7fd1b9";
        taskBox.style.textDecoration = "line-through";
        document.getElementById(taskID).style.opacity = 0.5;
        document.getElementById(taskID + "-edit-button").style.visibility = 'hidden';
    } else {
        taskBox.style.background = "white";
        taskBox.style.textDecoration = "none";
        document.getElementById(taskID).style.opacity = 1;
        document.getElementById(taskID + "-edit-button").style.visibility = 'visible';
    }
}

addButton.addEventListener('click', () => {
    let newTaskText = document.querySelector('#add-task-input').value;
    let itemID = Item.count += 1;
    let item = new Item(itemID, newTaskText);
    if (newTaskText) item.addItem();    // only add item if value is not empty
})

clearButton.addEventListener('click', () => {
    if (window.confirm('Are you sure that you want to delete all tasks?')) {
        Item.destroy(); // static method so invoked on superclass
    }
})

// determine if local storage already has items. If so, write to DOM.
if (localStorage.length > 0) {
    const storedKeys = Object.keys(localStorage).sort((a, b) => a - b);
    storedKeys.forEach(key => {
        const value = localStorage.getItem(key);
        const item = new Item(key, value);
        item.addItem();
    })
    Item.count = localStorage.length;
} else {
    document.getElementById('todo-list').style.visibility = 'hidden';
}