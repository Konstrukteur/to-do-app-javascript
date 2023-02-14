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
        document.getElementById(`${this.taskID}-delete-button`).addEventListener("click", () => deleteEventListener(this.taskID));
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
        taskBox.setAttribute('class', 'input-field');
        taskBox.setAttribute('id', taskID + '-text');
        taskBox.setAttribute('value', taskText);
        taskBox.style.display = "none";
        document.getElementById(taskID).appendChild(taskBox);
        // create edit button
        let editTaskButton = document.createElement('input');
        editTaskButton.setAttribute('type', 'button');
        editTaskButton.setAttribute('class', 'btn-sub');
        editTaskButton.setAttribute('id', taskID + '-edit-button')
        editTaskButton.setAttribute('value', 'Edit');
        document.getElementById(taskID).appendChild(editTaskButton);
        // create save button
        let saveTaskButton = document.createElement('input');
        saveTaskButton.setAttribute('type', 'button');
        saveTaskButton.setAttribute('class', 'btn-sub');
        saveTaskButton.setAttribute('id', taskID + '-save-button')
        saveTaskButton.setAttribute('value', 'Save');
        saveTaskButton.style.display = "none";
        document.getElementById(taskID).appendChild(saveTaskButton);
        // create delete button
        let deleteTaskButton = document.createElement('input');
        deleteTaskButton.setAttribute('type', 'button');
        deleteTaskButton.setAttribute('class', 'btn-sub');
        deleteTaskButton.setAttribute('id', taskID + '-delete-button')
        deleteTaskButton.setAttribute('value', 'Delete');
        document.getElementById(taskID).appendChild(deleteTaskButton);
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
    }
}

const editEventListener = (taskID) => {
    const descriptionField = document.getElementById(taskID + "-description");
    descriptionField.style.display = "none";
    const inputField = document.getElementById(taskID + "-text");
    inputField.style.display = "block";
    const editButton = document.getElementById(taskID = "-edit-button");
    editButton.style.display = "none";
    const saveButton = document.getElementById(taskID + "-save-button");
    inputField.style.display = "block";
    console.log(`hello form the edit button of task${taskID}`);
}
const saveEventListener = (taskID) => {
    console.log(`hello form the save button of task${taskID}`);
}
const deleteEventListener = (taskID) => {
    Item.deleteItem(taskID);

}

addButton.addEventListener('click', () => {
    let newTaskText = document.querySelector('#add-task-input').value;
    let itemID = Item.count += 1;
    let item = new Item(itemID, newTaskText);
    if (newTaskText) item.addItem();
})

clearButton.addEventListener('click', () => {
    Item.destroy(); // static method so invoked on superclass
})

// determine if local storage already has items. If so, write to DOM.
if (localStorage.length > 0) {
    const storedKeys = Object.keys(localStorage).sort((a, b) => a - b);
    storedKeys.forEach(key => {
        const value = localStorage.getItem(key);
        const item = new Item(key, value);
        item.addItem();
        Item.count += 1;
    })
}