import { User, Todo, TodoFields, TodoOptionalFields } from "./types";
import fetch from "node-fetch";

//const API_URL = "https://jsonplaceholder.typicode.com";


function getTodo(id: number): Promise<Todo | undefined> {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(response => {
      if (!response.ok) {
        console.error('HTTP error');
        return undefined;
      }
      return response.json().catch(error => {
        console.error('JSON error', error);
        return undefined;
      });
    })
    .catch(error => {
      console.error('Fetch error', error);
      return undefined;
    });
}
 

function deleteTodo(id: number): Promise<true | undefined> {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
  })
  .then(response => {
    if (response.ok) {
      console.log(`deleteTodo(${id})`);
      return true;
    } else {
      console.error('HTTP error');
      return undefined;
    }
  })
  .catch(error => {
    console.error('Fetch error', error);
    return undefined;
  });
}

function createTodo(newTodo: TodoFields): Promise<Todo | undefined> {
  return fetch(`https://jsonplaceholder.typicode.com/todos/`, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  .then(response => {
    if (!response.ok) {
      console.error('HTTP error');
      return undefined;
    }
    return response.json().catch(error => {
      console.error('JSON error', error);
      return undefined;
    });
  })
  .catch(error => {
    console.error('Fetch error', error);
    return undefined;
  });
}

function replaceTodo(newTodo: Todo): Promise<Todo | undefined> {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${newTodo.id}`, {
    method: "PUT",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  .then(response => {
    if (!response.ok) {
      console.error('HTTP error');
      return undefined;
    }
    return response.json().catch(error => {
      console.error('JSON error', error);
      return undefined;
    });
  })
  .catch(error => {
    console.error('Fetch error', error);
    return undefined;
  });
}

// NOTE: There is a bug in the API. It will return 200 even
// if the Todo does not exist. It should return 404. You do
// not need to write code for this case.  
function updateTodo(
  id: number,
  updatedTodo: TodoOptionalFields,
): Promise<Todo | undefined> {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedTodo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  .then(response => {
    if (!response.ok) {
      console.error('HTTP error');
      return undefined;
    }
    return response.json().catch(error => {
      console.error('JSON error', error);
      return undefined;
    });
  })
  .catch(error => {
    console.error('Fetch error', error);
    return undefined;
  });
}

// NOTE: There is a bug in the API. It will return an empty
// array if the user does not exist. This is OK, simply return
// the empty array from this method. 
function getUserTodos(userId: number): Promise<Todo[] | undefined> {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`, {
    method: "GET",
  })
  .then(response => {
    if (!response.ok) {
      return undefined;
    }
    console.log(`getUserTodos(${userId})`);
    return response.json();
  })
  .catch(error => {
    console.error(error);
    return undefined;
  });
}


function getUser(id: number): Promise<User | undefined> {
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "GET",
  })
  .then(response => {
    if (!response.ok) {
      return undefined;      
    }
    console.log(`getUser(${id})`);
    return response.json();
  })
  .catch(error => {
    console.error(error);
    if (error.message.includes('404')) {
      return undefined;
    } else {
      throw error;
    }
  });
}

export {
  getTodo,
  replaceTodo,
  updateTodo,
  getUserTodos,
  deleteTodo,
  createTodo,
  getUser,
};
