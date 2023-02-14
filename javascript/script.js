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
        // create initial div tag
        let taskItem = document.createElement('div');
        taskItem.setAttribute('class', 'list-input-box-task');
        taskItem.setAttribute('id', this.taskID);
        document.getElementById('todo-list').appendChild(taskItem);
        // create input box
        let taskBox = document.createElement('input')
        taskBox.setAttribute('type', 'text');
        taskBox.setAttribute('class', 'input-filed');
        taskBox.setAttribute('id', this.taskID + '-text');
        taskBox.setAttribute('value', this.taskText);
        document.getElementById(this.taskID).appendChild(taskBox);
        // create edit button
        let editTaskButton = document.createElement('input');
        editTaskButton.setAttribute('type', 'button');
        editTaskButton.setAttribute('class', 'btn-sub');
        editTaskButton.setAttribute('id', this.taskID + '-edit-button')
        editTaskButton.setAttribute('value', 'Edit');
        document.getElementById(this.taskID).appendChild(editTaskButton);
        // create delete button
        let deleteTaskButton = document.createElement('input');
        deleteTaskButton.setAttribute('type', 'button');
        deleteTaskButton.setAttribute('class', 'btn-sub');
        deleteTaskButton.setAttribute('id', this.taskID + '-edit-button')
        deleteTaskButton.setAttribute('value', 'Delete');
        document.getElementById(this.taskID).appendChild(deleteTaskButton);
        // update counter
        document.getElementById('pending-tasks').innerText = Item.countTasks();
    }

    // add delete todo task
    deleteItem() {
        localStorage.setItem(this.taskID, this.taskText);
        // // create initial div tag
        // let taskItem = document.createElement('div');
        // taskItem.setAttribute('class', 'list-input-box-task');
        // taskItem.setAttribute('id', this.taskID);
        // document.getElementById('todo-list').appendChild(taskItem);
        // // create input box
        // let taskBox = document.createElement('input')
        // taskBox.setAttribute('type', 'text');
        // taskBox.setAttribute('class', 'input-filed');
        // taskBox.setAttribute('id', this.taskID + '-text');
        // taskBox.setAttribute('value', this.taskText);
        // document.getElementById(this.taskID).appendChild(taskBox);
        // // create edit button
        // let editTaskButton = document.createElement('input');
        // editTaskButton.setAttribute('type', 'button');
        // editTaskButton.setAttribute('class', 'btn-sub');
        // editTaskButton.setAttribute('id', this.taskID + '-edit-button')
        // editTaskButton.setAttribute('value', 'Edit');
        // document.getElementById(this.taskID).appendChild(editTaskButton);
        // // create delete button
        // let deleteTaskButton = document.createElement('input');
        // deleteTaskButton.setAttribute('type', 'button');
        // deleteTaskButton.setAttribute('class', 'btn-sub');
        // deleteTaskButton.setAttribute('id', this.taskID + '-edit-button')
        // deleteTaskButton.setAttribute('value', 'Delete');
        // document.getElementById(this.taskID).appendChild(deleteTaskButton);
        // // update counter
        // document.getElementById('pending-tasks').innerText = Item.countTasks();
    }

    // add edit todo task
    editItem() {

    }

    static destroy() {
        Item.count = 0; // reset ID counter
        localStorage.clear(); // destroy local storage
        let taskItems = document.querySelectorAll('.list-input-box-task');
        taskItems.forEach(task => task.remove());
        document.getElementById('pending-tasks').innerText = Item.countTasks();
    }

    static countTasks() {
        let taskListItems = document.querySelectorAll('.list-input-box-task');
        return taskListItems.length;
    }
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