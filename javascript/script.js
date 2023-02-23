class Item {
	count = 0;

	LOCAL_STORAGE_KEY = 'todolist';

	constructor() {
		this.init();
		this.focusTextBox();
	}

	init() {
		this.bindButtons();
		this.bindEventListeners();
		this.checkStorage();
	}

	checkStorage() {
		// determine if local storage already has items. If so, write to DOM.
		if (localStorage.getItem(this.LOCAL_STORAGE_KEY)) {
			const storedItems = JSON.parse(
				localStorage.getItem(this.LOCAL_STORAGE_KEY),
			);
			storedItems.forEach((item) => {
				this.#writeElements(item.id, item.text);
				document
					.getElementById(`${item.id}-edit-button`)
					.addEventListener('click', () => this.editItem(item.id));
				document
					.getElementById(`${item.id}-save-button`)
					.addEventListener('click', () => this.saveItem(item.id));
				document
					.getElementById(`${item.id}-delete-button`)
					.addEventListener('click', () => this.deleteItem(item.id));
				document
					.getElementById(`${item.id}-completed-checkbox`)
					.addEventListener('click', () => this.completedItem(item.id));
				document.getElementById('add-task-input').value = ''; // clear input box on item add
				document.getElementById('clear-button').style.visibility = 'visible';
			});
			this.count = storedItems.length;
		} else {
			localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify([]));
			document.getElementById('todo-list').style.visibility = 'hidden';
		}
	}

	bindButtons() {
		this.addButton = document.querySelector('#add-task-button');
		this.clearButton = document.querySelector('#clear-button');
		this.inputField = document.querySelector('#add-task-input');
	}

	bindEventListeners() {
		this.addButton.addEventListener('click', () => {
			const newTaskText = document.querySelector('#add-task-input').value;
			const itemID = this.count += 1;
			if (newTaskText) this.addItem(itemID, newTaskText);
		});
		this.inputField.addEventListener('keypress', (event) => {
			if (event.key === 'Enter') {
				const newTaskText = document.querySelector('#add-task-input').value;
				const itemID = this.count += 1;
				// let item = new Item(itemID, newTaskText);
				if (newTaskText) this.addItem(itemID, newTaskText);
			}
		});
		this.clearButton.addEventListener('click', () => {
			if (window.confirm('Are you sure that you want to delete all tasks?')) {
				this.destroy();
			}
		});
	}

	focusTextBox = () => {
		document.querySelector('.input-field').focus();
	};

	addItem(ID, text) {
		if (!localStorage.getItem(this.LOCAL_STORAGE_KEY)) {
			localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify([]));
		}
		const storedItems = JSON.parse(
			localStorage.getItem(this.LOCAL_STORAGE_KEY),
		);
		localStorage.setItem(
			this.LOCAL_STORAGE_KEY,
			JSON.stringify([...storedItems, { id: ID, text }]),
		);
		this.#writeElements(ID, text);
		document
			.getElementById(`${ID}-edit-button`)
			.addEventListener('click', () => this.editItem(ID));
		document
			.getElementById(`${ID}-save-button`)
			.addEventListener('click', () => this.saveItem(ID));
		document
			.getElementById(`${ID}-delete-button`)
			.addEventListener('click', () => this.deleteItem(ID));
		document
			.getElementById(`${ID}-completed-checkbox`)
			.addEventListener('click', () => this.completedItem(ID));
		document.getElementById('add-task-input').value = ''; // clear input box on item add
		document.getElementById('clear-button').style.visibility = 'visible';
	}

	#writeElements(taskID, taskText) {
		// create initial div tag
		const taskItem = document.createElement('div');
		taskItem.setAttribute('class', 'list-input-box-task');
		taskItem.setAttribute('id', taskID);
		document.getElementById('todo-list').appendChild(taskItem);
		// create text box
		const taskTitle = document.createElement('div');
		taskTitle.setAttribute('class', 'task-description');
		taskTitle.setAttribute('id', `${taskID}-description`);
		taskTitle.innerHTML = taskText;
		document.getElementById(taskID).appendChild(taskTitle);
		// create input box
		const taskBox = document.createElement('input');
		taskBox.setAttribute('type', 'text');
		taskBox.setAttribute('class', 'task-input-field');
		taskBox.setAttribute('id', `${taskID}-text`);
		taskBox.setAttribute('value', taskText);
		taskBox.style.display = 'none';
		document.getElementById(taskID).appendChild(taskBox);
		// create edit button
		const editTaskButton = document.createElement('input');
		editTaskButton.setAttribute('type', 'button');
		editTaskButton.setAttribute('class', 'btn-sub btn-edit');
		editTaskButton.setAttribute('id', `${taskID}-edit-button`);
		editTaskButton.setAttribute('value', 'Edit');
		document.getElementById(taskID).appendChild(editTaskButton);
		// create save button
		const saveTaskButton = document.createElement('input');
		saveTaskButton.setAttribute('type', 'button');
		saveTaskButton.setAttribute('class', 'btn-sub btn-save');
		saveTaskButton.setAttribute('id', `${taskID}-save-button`);
		saveTaskButton.setAttribute('value', 'Save');
		saveTaskButton.style.display = 'none';
		document.getElementById(taskID).appendChild(saveTaskButton);
		// create delete button
		const deleteTaskButton = document.createElement('input');
		deleteTaskButton.setAttribute('type', 'button');
		deleteTaskButton.setAttribute('class', 'btn-sub btn-delete');
		deleteTaskButton.setAttribute('id', `${taskID}-delete-button`);
		deleteTaskButton.setAttribute('value', 'Delete');
		document.getElementById(taskID).appendChild(deleteTaskButton);
		// create 'done' checkbox
		const completeCheckbox = document.createElement('input');
		completeCheckbox.setAttribute('type', 'checkbox');
		completeCheckbox.setAttribute('id', `${taskID}-completed-checkbox`);
		completeCheckbox.setAttribute('value', 'Complete');
		document.getElementById(taskID).appendChild(completeCheckbox);
		// update counter
		this.countTasks();
	}

	deleteItem(taskID) {
		const storedItems = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
		let filtered = storedItems.filter((item) => item.id !== taskID);
		localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(filtered));
		document.getElementById(taskID).remove();
		this.countTasks();
	}

	editItem(taskID) {
		const descriptionField = document.getElementById(`${taskID}-description`);
		descriptionField.style.display = 'none';
		const inputField = document.getElementById(`${taskID}-text`);
		inputField.style.display = 'block';
		const editButton = document.getElementById(`${taskID}-edit-button`);
		editButton.style.display = 'none';
		const saveButton = document.getElementById(`${taskID}-save-button`);
		saveButton.style.display = 'block';
	}

	saveItem(taskID) {
		const descriptionField = document.getElementById(`${taskID}-description`);
		descriptionField.style.display = 'block';
		const inputField = document.getElementById(`${taskID}-text`);
		inputField.style.display = 'none';
		const editButton = document.getElementById(`${taskID}-edit-button`);
		editButton.style.display = 'block';
		const saveButton = document.getElementById(`${taskID}-save-button`);
		saveButton.style.display = 'none';
		const { value } = inputField;
		descriptionField.innerHTML = value;
		const storedItems = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
		const updatedItems = storedItems.map(item => item.id === taskID ? {...item, text: value } : item);
		localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(updatedItems));
	}

	completedItem(taskID) {
		const taskBox = document.getElementById(`${taskID}-description`);
		const taskCheckbox = document.getElementById(
			`${taskID}-completed-checkbox`,
		);
		if (taskCheckbox.checked) {
			taskBox.style.background = '#7fd1b9';
			taskBox.style.textDecoration = 'line-through';
			document.getElementById(taskID).style.opacity = '0.5';
			document.getElementById(`${taskID}-edit-button`).style.visibility = 'hidden';
		} else {
			taskBox.style.background = 'white';
			taskBox.style.textDecoration = 'none';
			document.getElementById(taskID).style.opacity = '1';
			document.getElementById(`${taskID}-edit-button`).style.visibility = 'visible';
		}
		this.countTasks();
	}

	destroy() {
		this.count = 0; // reset ID counter
		localStorage.clear(); // destroy local storage
		const taskItems = document.querySelectorAll('.list-input-box-task');
		taskItems.forEach((task) => task.remove());
		document.getElementById('clear-button').style.visibility = 'hidden';
		this.countTasks();
	}

	countTasks() {
		const taskListItems = document.querySelectorAll(
			'.list-input-box-task',
		).length;
		const completedTasks = document.querySelectorAll(
			'input[type="checkbox"]:checked',
		).length;
		document.getElementById('pending-tasks').innerText = String(
			taskListItems - completedTasks,
		);
		document.getElementById('todo-list').style.visibility = 'visible';
		if (taskListItems === 0) {
			document.getElementById('clear-button').style.visibility = 'hidden';
		}
		this.focusTextBox();
	}
}

new Item();
