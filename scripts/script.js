// Array to store todo items
let todos = [];

// CREATE - Function to create a new todo item
function createTodos(text) {
  // Push a new todo object with a title and completed status
  return todos.push({
    title: text,
    completed: false
  });
}

// READ - Function to render todos based on filters
const renderTodos = (todos) => {
  // Filter todos based on searchTitle and completion status
  let filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(filters.searchTitle.toLocaleLowerCase()));
  if (filters.showFinished && filters.showUnfinished) {
    // Do nothing    
  } else if (filters.showFinished) {
    filteredTodos = filteredTodos.filter(todo => todo.completed)
  } else if (filters.showUnfinished) {
    filteredTodos = filteredTodos.filter(todo => !todo.completed)
  }

  const todoList = document.querySelector('#todos');

  // Check if todos array is empty
  if (todos.length === 0) {
    todoList.innerHTML = '';
  }

  // Render the todos on the screen
  if (filteredTodos.length > 0) {
    todoList.innerHTML = '';
    filteredTodos.forEach(todo => {
      const newTodo = generateTodoDOM(todo);
      todoList.appendChild(newTodo);
    });
  } else {
    // Display a message if there are no todos to show
    const messageEl = document.createElement('p');
    messageEl.classList.add('empty-message');
    messageEl.textContent = 'There are no todos to show';
    todoList.appendChild(messageEl);
  }
}

// CREATE - Event listener for form submission to create a new todo
document.querySelector("#new-todo").addEventListener('submit', (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();

  if (text.length > 0) {
    createTodos(text);
    e.target.elements.text.value = '';
  }

  console.log(todos); // Log the updated todos array
  renderTodos(todos); // Render the todos on the screen
});

// CREATE - Function to generate the DOM structure for a todo item
const generateTodoDOM = (todoObj) => {
  const todoEl = document.createElement('label');
  const containerEl = document.createElement('div');
  const todoText = document.createElement('span');

  // Set up checkbox
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = todoObj.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener('change', () => {
    toggleTodo(todoObj.title);
    renderTodos(todos);
  });

  // Set up text
  todoText.textContent = todoObj.title;
  containerEl.appendChild(todoText);

  // Set up container
  todoEl.classList.add('list-item');
  containerEl.classList.add('list-item__container');
  todoEl.appendChild(containerEl);

  // Set up remove button
  const removeButton = document.createElement('button');
  removeButton.textContent = 'remove';
  removeButton.classList.add('button', 'button--text');
  todoEl.appendChild(removeButton);
  removeButton.addEventListener('click', () => {
    removeTodo(todoObj.title);
    renderTodos(todos);
  });

  return todoEl;
};

// UPDATE - Function to toggle the completed status of a todo
const toggleTodo = (title) => {
  const todo = todos.find(todo => todo.title.toLowerCase() === title.toLowerCase());

  if (todo) {
    todo.completed = !todo.completed;
  }
}

// DELETE - Function to remove a todo item
const removeTodo = (title) => {
  const todoIndex = todos.findIndex(todo => todo.title.toLowerCase() === title.toLowerCase());
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
}

// Object to store filter options
const filters = {
  searchTitle: '',
  showFinished: false,
  showUnfinished: false
};

// UPDATE - Function to update filters
const setFilters = (updates) => {
  if (typeof updates.searchTitle === 'string') {
    filters.searchTitle = updates.searchTitle;
  }

  if (typeof updates.showFinished === 'boolean') {
    filters.showFinished = updates.showFinished;
  }

  if (typeof updates.showUnfinished === 'boolean') {
    filters.showUnfinished = updates.showUnfinished;
  };
}

// Event listeners for filter inputs
document.querySelector('#search-text').addEventListener('input', (e) => {
  setFilters({
    searchTitle: e.target.value
  })
  renderTodos(todos);
})

document.querySelector('#show-finished').addEventListener('input', (e) => {
  setFilters({
    showFinished: e.target.checked
  })
  renderTodos(todos);
})

document.querySelector('#show-unfinished').addEventListener('input', (e) => {
  setFilters({
    showUnfinished: e.target.checked
  })
  renderTodos(todos);
})

// Initial rendering of todos
renderTodos(todos);
